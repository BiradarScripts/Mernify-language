import os
import time
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.output_parsers import StrOutputParser
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_core.chains import LLMChain
from langserve import add_routes

# Load environment variables
load_dotenv()

# Initialize the Google Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

# Parser for output
parser = StrOutputParser()

# Create FastAPI app
app = FastAPI(title="Langchain Language Learning and Quiz Server", version="1.0")

# Input model for lesson generation
class LessonInput(BaseModel):
    language: str
    difficulty: str
    num_questions: int  # Number of questions to generate for the lesson type

class AnswerInput(BaseModel):
    question: str
    user_answer: str

# Question generation prompt template
question_template = ChatPromptTemplate.from_template('''Generate {num_questions} {lesson_type} questions in {language} at {difficulty} difficulty level.
The questions should vary in format (e.g., multiple-choice, true/false, open-ended) to match the lesson type.
''')

# Generate a chain for question generation
question_chain = LLMChain(
    llm=llm,
    prompt=question_template,
    output_parser=parser
)

# Store active lessons and questions
active_lessons = {}

# Generate lesson question API
@app.post("/generate-question")
async def generate_question(input: LessonInput):
    """Generate questions based on lesson type, language, and difficulty."""
    try:
        language = input.language
        difficulty = input.difficulty
        num_questions = input.num_questions

        # Generate questions based on lesson type and parameters
        lesson_prompt = question_template.from_template(f"Generate {num_questions} {input.language} {input.difficulty} questions for {input.language} lessons.")
        question_chain = LLMChain(llm=llm, prompt=lesson_prompt, output_parser=parser)

        questions = question_chain.run({})
        questions_list = questions.split("\n")  # Assuming each question is on a new line
        
        # Track active lesson
        lesson_id = len(active_lessons) + 1
        active_lessons[lesson_id] = {
            "questions": questions_list,
            "current_question": 0,
            "score": 0
        }

        return {"lesson_id": lesson_id, "questions": questions_list, "message": "Questions generated successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Answer evaluation API
@app.post("/get-answer/{lesson_id}")
async def get_answer(lesson_id: int, input: AnswerInput):
    """Evaluate the answer to a question and provide feedback."""
    try:
        lesson = active_lessons.get(lesson_id)
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found.")

        # Get the current question
        question = lesson["questions"][lesson["current_question"]]
        
        # For simplicity, the correct answer is assumed to be a placeholder
        correct_answer = "correct answer"  # Placeholder logic; you can replace this with dynamic checks

        # Evaluate answer
        user_answer = input.user_answer.lower()
        feedback = ""
        xp_earned = 0

        if user_answer == correct_answer.lower():
            xp_earned = 10
            feedback = "Correct answer! You've earned 10 XP."
            lesson["score"] += xp_earned
        else:
            xp_earned = 0
            feedback = "Incorrect answer. Try again!"

        # Move to the next question
        lesson["current_question"] += 1

        # Check if all questions have been answered
        if lesson["current_question"] >= len(lesson["questions"]):
            return {
                "message": "Lesson completed!",
                "final_score": lesson["score"],
                "feedback": feedback
            }
        
        # Provide the next question
        next_question = lesson["questions"][lesson["current_question"]]
        return {
            "question": next_question,
            "feedback": feedback,
            "xp_earned": xp_earned,
            "score": lesson["score"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Get points for the lesson
@app.get("/get-points/{lesson_id}")
async def get_points(lesson_id: int):
    """Get the current points for a specific lesson."""
    try:
        lesson = active_lessons.get(lesson_id)
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found.")

        return {
            "lesson_id": lesson_id,
            "current_score": lesson["score"],
            "message": "Points fetched successfully."
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
