import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langserve import add_routes
from langchain_core.chains import LLMChain

load_dotenv()

# Initialize the Google Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

# Initialize the chat message history
history = ChatMessageHistory()

# Parser for output
parser = StrOutputParser()

# Create FastAPI app
app = FastAPI(title="Langchain Language Learning Server", version="1.0")

# Lesson generation prompt
lesson_template = ChatPromptTemplate.from_template('''Generate {lesson_type} lessons in {language}.
Include the following lesson types:
1. Speaking Practice
2. Listening Comprehension
3. Reading Adventures
4. Writing Challenges
''')

lesson_chain = LLMChain(
    llm=llm,
    prompt=lesson_template,
    output_parser=parser
)

# Input model for lesson generation
class LanguageInput(BaseModel):
    language: str

class AnswerInput(BaseModel):
    lesson_type: str
    answer: str

@app.post("/generate-lessons")
async def generate_lessons(input: LanguageInput):
    """Generate lesson content based on the provided language."""
    try:
        language = input.language
        lesson_types = ["Speaking Practice", "Listening Comprehension", "Reading Adventures", "Writing Challenges"]
        
        # Generate lessons for each type
        lessons = {}
        for lesson_type in lesson_types:
            lesson_prompt = lesson_chain.run({"lesson_type": lesson_type, "language": language})
            lessons[lesson_type] = lesson_prompt

        return {"language": language, "lessons": lessons}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Evaluation logic for each lesson type
def evaluate_answer(lesson_type, answer):
    """Evaluate answers based on lesson type and return XP earned and feedback."""
    xp_earned = 0
    feedback = ""

    if lesson_type == "Speaking Practice":
        # Basic XP based on length, bonus for specific keywords
        xp_earned = len(answer) * 2
        if "hello" in answer.lower() or "greetings" in answer.lower():
            xp_earned += 10
        feedback = "Great job on pronunciation and greeting phrases!"

    elif lesson_type == "Listening Comprehension":
        # XP based on accuracy of response to questions
        if "correct" in answer.lower():
            xp_earned = 20
            feedback = "You understood the key details well!"
        else:
            xp_earned = 10
            feedback = "Keep practicing to improve comprehension."

    elif lesson_type == "Reading Adventures":
        # XP based on comprehension, checking length as an indicator of detailed response
        xp_earned = len(answer) * 3
        feedback = "Excellent reading comprehension! Your responses covered the main points."

    elif lesson_type == "Writing Challenges":
        # XP based on creativity and complexity of the writing
        xp_earned = len(answer) * 4
        if len(answer.split()) > 20:
            xp_earned += 15
            feedback = "Great detail and creativity in your writing!"

    else:
        feedback = "Unknown lesson type. No XP awarded."

    return xp_earned, feedback

# Evaluation for each lesson type
@app.post("/evaluate/{lesson_type}")
async def evaluate_lesson(lesson_type: str, input: AnswerInput):
    """Evaluate answers and calculate XP for each lesson."""
    try:
        xp_earned, feedback = evaluate_answer(lesson_type, input.answer)
        return {"lesson_type": lesson_type, "xp_earned": xp_earned, "feedback": feedback}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Adding routes for lesson types
add_routes(app, lesson_chain, path="/generate-speaking-practice")
add_routes(app, lesson_chain, path="/generate-listening-comprehension")
add_routes(app, lesson_chain, path="/generate-reading-adventures")
add_routes(app, lesson_chain, path="/generate-writing-challenges")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
