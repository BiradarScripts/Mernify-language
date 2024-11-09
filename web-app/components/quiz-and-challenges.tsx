'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Trophy, Clock, Zap, Star, Flag } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

export function QuizAndChallengesComponent() {
  const [dailyChallenge, setDailyChallenge] = useState({
    name: "Phrase Master",
    description: "Default_description!",
    progress: 0, // Default progress 0
  });
  const [leaderboard, setLeaderboard] = useState([
    { name: "JOIN_COMMUNITY_TO_SEE_OTHERS_RATING", score: 0 },
    // { name: "JOIN_COMMUNITY_TO_SEE_OTHERS_RATING", score: 0 },
    // { name: "JOIN_COMMUNITY_TO_SEE_OTHERS_RATING", score: 0 },
  ]);

  // Fetch quiz progress and leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quiz progress
        const quizProgressResponse = await axios.get('/api/quiz-progress/USER_ID');
        const quizProgressData = quizProgressResponse.data || {}; // Fallback to empty object if no data
        setDailyChallenge({
          name: quizProgressData.name , // Fallback to default name
          description: quizProgressData.description || "Default_description!", // Fallback to default description
          progress: quizProgressData.progress || 0, // Fallback to 0 if no progress data
        });

        // Fetch leaderboard data
        const leaderboardResponse = await axios.get('/api/quiz-progress/USER_ID');
        const leaderboardData = leaderboardResponse.data || []; // Fallback to empty array if no data
        setLeaderboard(leaderboardData.length ? leaderboardData : [
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
        // Fallback to default values on error
        setDailyChallenge({
          name: "Phrase Master",
          description: "",
          progress: 0,
        });
        setLeaderboard([
          { name: "JOIN_COMMUNITY_TO_SEE_OTHERS_RATING", score: 0 },
          { name: "JOIN_COMMUNITY_TO_SEE_OTHERS_RATING", score: 0 },
          { name: "JOIN_COMMUNITY_TO_SEE_OTHERS_RATING", score: 0 },
        ]);
      }
    }

    fetchData();
  }, []); // Empty dependency array, fetch data on component mount

  const quizzes = [
    { name: "Vocabulary Blitz", icon: <Brain className="w-6 h-6" />, difficulty: "Easy", questions: 20, timeLimit: "5 min" },
    { name: "Grammar Gauntlet", icon: <Trophy className="w-6 h-6" />, difficulty: "Medium", questions: 15, timeLimit: "10 min" },
    { name: "Listening Challenge", icon: <Zap className="w-6 h-6" />, difficulty: "Hard", questions: 10, timeLimit: "15 min" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
      <header className="container mx-auto mb-8 text-center">
        <div className="inline-block bg-white pixel-border p-2 mb-4">
          <Star className="w-12 h-12 text-yellow-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
          Quizzes &amp; Challenges
        </h1>
        <p className="text-xl mt-2 pixel-text">
          Test your skills and climb the leaderboard!
        </p>
      </header>

      <main className="container mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Daily Challenge</h2>
          <Card className="pixel-border bg-white">
            <CardHeader>
              <CardTitle className="pixel-text flex items-center gap-2">
                <Flag className="w-6 h-6 text-green-500" />
                {dailyChallenge.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="pixel-text mb-2">{dailyChallenge.description}</p>
              <Progress value={dailyChallenge.progress} className="pixel-border" />
              <p className="text-right mt-2 pixel-text">{dailyChallenge.progress}% Complete</p>
              <Button className="w-full mt-4 pixel-border bg-green-500 hover:bg-green-600 text-white">
                Continue Challenge
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Available Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.name} className="pixel-border bg-white">
                <CardHeader>
                  <CardTitle className="pixel-text flex items-center gap-2">
                    {quiz.icon}
                    {quiz.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="pixel-text flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Difficulty: {quiz.difficulty}
                    </p>
                    <p className="pixel-text flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Questions: {quiz.questions}
                    </p>
                    <p className="pixel-text flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Time Limit: {quiz.timeLimit}
                    </p>
                  </div>
                  <Button className="w-full mt-4 pixel-border bg-blue-500 hover:bg-blue-600 text-white">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Leaderboard</h2>
          <Card className="pixel-border bg-white">
            <CardContent>
              <ul className="space-y-4">
                {leaderboard.map((player, index) => (
                  <li key={player.name} className="flex justify-between items-center pixel-text">
                    <span className="flex items-center gap-2">
                      {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                      {index === 1 && <Trophy className="w-6 h-6 text-gray-400" />}
                      {index === 2 && <Trophy className="w-6 h-6 text-yellow-700" />}
                      {player.name}
                    </span>
                    <Badge variant="secondary" className="pixel-border">
                      {player.score} XP
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <div className="text-center">
          <Button className="pixel-border bg-purple-500 hover:bg-purple-600 text-white">
            View All Challenges
          </Button>
        </div>
      </main>

      <footer className="mt-12 text-center">
        <Link href="/" className="text-blue-800 hover:text-blue-600 pixel-text">
          Back to Home
        </Link>
      </footer>

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

        .bg-gradient-to-b {
          background: linear-gradient(to bottom, #4f78ff, #2439c4);
        }
      `}</style>
    </div>
  )
}
