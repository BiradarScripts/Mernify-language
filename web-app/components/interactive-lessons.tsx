'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Mic, Headphones, BookOpen, Pencil } from 'lucide-react'
import Link from 'next/link'

export function InteractiveLessonsComponent() {
  const [speakingProgress, setSpeakingProgress] = useState(0);
  const [listeningProgress, setListeningProgress] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [writingProgress, setWritingProgress] = useState(0);

  // Dummy questions for each lesson type
  const [speakingQuestion, setSpeakingQuestion] = useState("What is your favorite movie?");
  const [listeningQuestion, setListeningQuestion] = useState("What did you hear in the audio?");
  const [readingQuestion, setReadingQuestion] = useState("What is the main idea of the passage?");
  const [writingQuestion, setWritingQuestion] = useState("Write a short paragraph about your day.");

  const [speakingOptions, setSpeakingOptions] = useState(["A movie about space", "A romantic comedy", "A superhero movie"]);
  const [listeningOptions, setListeningOptions] = useState(["A dog barking", "Someone talking on the phone", "Music playing"]);
  const [readingOptions, setReadingOptions] = useState(["It talks about global warming", "It's about a love story", "A history of technology"]);
  const [writingOptions, setWritingOptions] = useState(["Talk about your morning", "Write about a trip you took", "Describe your favorite food"]);

  const [currentQuestion, setCurrentQuestion] = useState("");

  // Function to handle lesson button clicks
  const handleLessonClick = (lessonType) => {
    switch (lessonType) {
      case 'speaking':
        setCurrentQuestion(speakingQuestion);
        break;
      case 'listening':
        setCurrentQuestion(listeningQuestion);
        break;
      case 'reading':
        setCurrentQuestion(readingQuestion);
        break;
      case 'writing':
        setCurrentQuestion(writingQuestion);
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
      <style jsx global>{`
        @font-face {
          font-family: 'PixelFont';
          src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        }

        .font-pixel {
          font-family: 'PixelFont', monospace;
        }

        .pixel-text {
          image-rendering: pixelated;
          -webkit-font-smoothing: none;
        }

        .pixel-border {
          box-shadow: 
            0 4px 0 0 #000,
            0 -4px 0 0 #000,
            4px 0 0 0 #000,
            -4px 0 0 0 #000,
            4px 4px 0 0 #000,
            4px -4px 0 0 #000,
            -4px 4px 0 0 #000,
            -4px -4px 0 0 #000;
        }
      `}</style>

      <header className="container mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-yellow-400 drop-shadow-[2px_2px_0_#000] pixel-text">
          Interactive Lessons
        </h1>
        <p className="text-center text-xl mt-2 text-white pixel-text">
          Level up your language skills with fun, engaging lessons!
        </p>
      </header>

      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <LessonCard
            icon={<Mic className="w-12 h-12 text-red-500" />}
            title="Speaking Practice"
            description="Improve your pronunciation and fluency with interactive speaking exercises."
            progress={speakingProgress}
            onClick={() => handleLessonClick('speaking')}
          />
          <LessonCard
            icon={<Headphones className="w-12 h-12 text-blue-500" />}
            title="Listening Comprehension"
            description="Sharpen your ears with diverse audio clips and challenging listening tasks."
            progress={listeningProgress}
            onClick={() => handleLessonClick('listening')}
          />
          <LessonCard
            icon={<BookOpen className="w-12 h-12 text-green-500" />}
            title="Reading Adventures"
            description="Enhance your reading skills by understanding complex texts."
            progress={readingProgress}
            onClick={() => handleLessonClick('reading')}
          />
          <LessonCard
            icon={<Pencil className="w-12 h-12 text-yellow-500" />}
            title="Writing Challenges"
            description="Refine your writing with engaging challenges."
            progress={writingProgress}
            onClick={() => handleLessonClick('writing')}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center text-white mb-4 pixel-text">Current Lesson Question</h2>
          <div className="text-center text-lg text-white pixel-text">
            <p>{currentQuestion}</p>
          </div>

          {currentQuestion && (
            <div className="mt-4 text-center">
              {lessonOptions()}
            </div>
          )}
        </div>
      </main>
    </div>
  );

  function lessonOptions() {
    if (currentQuestion === speakingQuestion) {
      return speakingOptions.map((option, index) => (
        <div key={index} className="mt-2">
          <Button className="bg-blue-500 text-white hover:bg-blue-700 pixel-border">{option}</Button>
        </div>
      ));
    } else if (currentQuestion === listeningQuestion) {
      return listeningOptions.map((option, index) => (
        <div key={index} className="mt-2">
          <Button className="bg-green-500 text-white hover:bg-green-700 pixel-border">{option}</Button>
        </div>
      ));
    } else if (currentQuestion === readingQuestion) {
      return readingOptions.map((option, index) => (
        <div key={index} className="mt-2">
          <Button className="bg-red-500 text-white hover:bg-red-700 pixel-border">{option}</Button>
        </div>
      ));
    } else if (currentQuestion === writingQuestion) {
      return writingOptions.map((option, index) => (
        <div key={index} className="mt-2">
          <Button className="bg-yellow-500 text-white hover:bg-yellow-700 pixel-border">{option}</Button>
        </div>
      ));
    }
  }
}

const LessonCard = ({ icon, title, description, progress, onClick }) => (
  <Card className="bg-white rounded-lg shadow-lg p-4 pixel-border">
    <CardHeader className="flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <CardTitle className="text-xl font-bold pixel-text">{title}</CardTitle>
        <p className="text-sm text-gray-500 pixel-text">{description}</p>
      </div>
    </CardHeader>
    <CardContent>
      <Progress value={progress} max={100} className="mb-4" />
      <Button onClick={onClick} className="bg-blue-500 text-white hover:bg-blue-700 pixel-border">
        Start Lesson
      </Button>
    </CardContent>
  </Card>
);







































// 'use client'

// import React, { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Mic, Headphones, BookOpen, Pencil, ChevronLeft, ChevronRight } from 'lucide-react'
// import Link from 'next/link'

// export function InteractiveLessonsComponent() {
//   const [speakingProgress, setSpeakingProgress] = useState(0);
//   const [listeningProgress, setListeningProgress] = useState(0);
//   const [readingProgress, setReadingProgress] = useState(0);
//   const [writingProgress, setWritingProgress] = useState(0);
  
//   // State to hold the current reading question
//   const [currentReadingQuestion, setCurrentReadingQuestion] = useState(null);

//   // Fetch progress data from backend API
//   const fetchLessonProgress = async () => {
//     try {
//       // Fetching all lesson progress data initially
//       const speakingRes = await fetch('/generate-speaking-practice');
//       const listeningRes = await fetch('/generate-listening-comprehension');
//       const readingRes = await fetch('/generate-reading-adventures');
//       const writingRes = await fetch('/generate-writing-challenges');
      
//       const speakingData = await speakingRes.json();
//       const listeningData = await listeningRes.json();
//       const readingData = await readingRes.json();
//       const writingData = await writingRes.json();

//       // Set progress based on the API response
//       setSpeakingProgress(speakingData?.progress || 0);
//       setListeningProgress(listeningData?.progress || 0);
//       setReadingProgress(readingData?.progress || 0);
//       setWritingProgress(writingData?.progress || 0);

//       // Set the first reading question by default
//       setCurrentReadingQuestion(readingData?.question || "What is your favorite book?");
//     } catch (error) {
//       console.error('Error fetching lesson progress:', error);
//     }
//   };

//   useEffect(() => {
//     fetchLessonProgress();
//   }, []);

//   // Function to handle lesson button clicks
//   const handleLessonClick = async (lessonType) => {
//     try {
//       let progress = 0;
//       let lessonEndpoint = '';
//       let question = '';

//       // Determine API endpoint based on the lesson clicked
//       switch (lessonType) {
//         case 'speaking':
//           lessonEndpoint = '/generate-speaking-practice';
//           break;
//         case 'listening':
//           lessonEndpoint = '/generate-listening-comprehension';
//           break;
//         case 'reading':
//           lessonEndpoint = '/generate-reading-adventures';
//           break;
//         case 'writing':
//           lessonEndpoint = '/generate-writing-challenges';
//           break;
//         default:
//           break;
//       }

//       const res = await fetch(lessonEndpoint);
//       const data = await res.json();

//       // Update the progress
//       progress = data?.progress || 0;

//       // Set the question if it's the reading lesson
//       if (lessonType === 'reading') {
//         question = data?.question || "What is your favorite book?";
//       }

//       // Update state based on the lesson type
//       switch (lessonType) {
//         case 'speaking':
//           setSpeakingProgress(progress);
//           break;
//         case 'listening':
//           setListeningProgress(progress);
//           break;
//         case 'reading':
//           setReadingProgress(progress);
//           setCurrentReadingQuestion(question); // Set reading question on click
//           break;
//         case 'writing':
//           setWritingProgress(progress);
//           break;
//         default:
//           break;
//       }
//     } catch (error) {
//       console.error(`Error fetching ${lessonType} lesson progress:`, error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
//       <header className="container mx-auto mb-8">
//         <h1 className="text-4xl font-bold text-center pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
//           Interactive Lessons
//         </h1>
//         <p className="text-center text-xl mt-2 pixel-text">
//           Level up your language skills with fun, engaging lessons!
//         </p>
//       </header>

//       <main className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <LessonCard
//             icon={<Mic className="w-12 h-12 text-red-500" />}
//             title="Speaking Practice"
//             description="Improve your pronunciation and fluency with interactive speaking exercises."
//             progress={speakingProgress}
//             onClick={() => handleLessonClick('speaking')}
//           />
//           <LessonCard
//             icon={<Headphones className="w-12 h-12 text-blue-500" />}
//             title="Listening Comprehension"
//             description="Sharpen your ears with diverse audio clips and challenging questions."
//             progress={listeningProgress}
//             onClick={() => handleLessonClick('listening')}
//           />
//           <LessonCard
//             icon={<BookOpen className="w-12 h-12 text-green-500" />}
//             title="Reading Adventures"
//             description="Explore exciting stories and articles to boost your reading skills."
//             progress={readingProgress}
//             onClick={() => handleLessonClick('reading')}
//           />
//           <LessonCard
//             icon={<Pencil className="w-12 h-12 text-purple-500" />}
//             title="Writing Challenges"
//             description="Express yourself clearly with guided writing exercises and prompts."
//             progress={writingProgress}
//             onClick={() => handleLessonClick('writing')}
//           />
//         </div>

//         {/* Display the current reading question */}
//         {currentReadingQuestion && (
//           <section className="bg-white pixel-border p-6 mb-8">
//             <h2 className="text-2xl font-bold mb-4 pixel-text">Current Lesson: Reading Adventures</h2>
//             <p className="text-xl mb-4 pixel-text">{currentReadingQuestion}</p>
//             <Button variant="outline" className="pixel-border">Answer</Button>
//           </section>
//         )}

//         <div className="flex justify-between items-center">
//           <Button variant="outline" className="pixel-border">
//             <ChevronLeft className="mr-2 h-4 w-4" /> Previous Lesson
//           </Button>
//           <Button className="pixel-border bg-green-500 hover:bg-green-600 text-white">
//             Next Lesson <ChevronRight className="ml-2 h-4 w-4" />
//           </Button>
//         </div>
//       </main>

//       <footer className="mt-12 text-center">
//         <Link href="/" className="text-blue-800 hover:text-blue-600 pixel-text">
//           Back to Home
//         </Link>
//       </footer>

//       <style jsx global>{`
//         @font-face {
//           font-family: 'PixelFont';
//           src: url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
//         }

//         .font-pixel {
//           font-family: 'PixelFont', monospace;
//         }

//         .pixel-text {
//           image-rendering: pixelated;
//           -webkit-font-smoothing: none;
//         }

//         .pixel-border {
//           box-shadow: 
//             0 4px 0 0 #000,
//             0 -4px 0 0 #000,
//             4px 0 0 0 #000,
//             -4px 0 0 0 #000,
//             4px 4px 0 0 #000,
//             4px -4px 0 0 #000,
//             -4px 4px 0 0 #000,
//             -4px -4px 0 0 #000;
//         }
//       `}</style>
//     </div>
//   )
// }

// function LessonCard({ icon, title, description, progress, onClick }) {
//   return (
//     <Card className="pixel-border bg-white">
//       <CardHeader className="flex flex-row items-center space-x-4 pb-2">
//         {icon}
//         <CardTitle className="pixel-text">{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <p className="pixel-text mb-4">{description}</p>
//         <div className="space-y-2">
//           <div className="flex justify-between pixel-text">
//             <span>Progress</span>
//             <span>{progress}%</span>
//           </div>
//           <Progress value={progress} className="pixel-border" />
//           <Button className="mt-4 pixel-border" onClick={onClick}>Start Lesson</Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
