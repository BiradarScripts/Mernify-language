'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Zap, BarChart2, Calendar, Book } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios';

export function ProgressTrackingComponent() {
  const [learningStreak, setLearningStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([
    { name: "Achievement 1", description: "Description for Achievement 1", progress: 0 },
    { name: "Achievement 2", description: "Description for Achievement 2", progress: 0 },
    { name: "Achievement 3", description: "Description for Achievement 3", progress: 0 }
  ]);
  const [recentActivities, setRecentActivities] = useState([
    { name: "N/A", xp: 0 },
    { name: "N/A", xp: 0 },
    { name: "N/A", xp: 0 }
  ]);

  // Fetch progress data on component mount
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const userId = 'YOUR_USER_ID'; // replace with actual user ID as needed
        const response = await axios.get(`/api/progress/${userId}`);
        
        const { learningStreak = 0, totalXP = 0, currentLevel = 1, achievements = [], recentActivities = [] } = response.data;

        setLearningStreak(learningStreak || 0);
        setTotalXP(totalXP || 0);
        setLevel(currentLevel || 1);
        setAchievements(
          achievements.length > 0
            ? achievements.map(ach => ({ ...ach, progress: ach.progress || 0 }))
            : [{ name: "Achievement 1", description: "Description for Achievement 1", progress: 0 },
               { name: "Achievement 2", description: "Description for Achievement 2", progress: 0 },
               { name: "Achievement 3", description: "Description for Achievement 3", progress: 0 }]
        );
        setRecentActivities(recentActivities.length > 0 ? recentActivities : [
          { name: "Completed Module 1", xp: 5 },
          { name: "Watched Introduction Video", xp: 3 },
          { name: "Joined a Study Group", xp: 8 }
        ]);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, []);

  const handleContinueLearning = async () => {
    try {
      const userId = 'YOUR_USER_ID';
      await axios.post(`/api/progress/${userId}/activity`, {
        activity: "Continued Learning",
        xp: 10,
      });

      fetchProgressData(); // Refresh data after the update
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
      <header className="container mx-auto mb-8 text-center">
        <div className="inline-block bg-white pixel-border p-2 mb-4">
          <BarChart2 className="w-12 h-12 text-blue-600 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
          Your Learning Journey
        </h1>
        <p className="text-xl mt-2 pixel-text">
          Track your progress and unlock achievements!
        </p>
      </header>

      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="pixel-border bg-white">
            <CardHeader>
              <CardTitle className="pixel-text flex items-center gap-2">
                <Calendar className="w-6 h-6 text-green-500" />
                Learning Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold pixel-text text-center">{learningStreak} days</p>
            </CardContent>
          </Card>
          <Card className="pixel-border bg-white">
            <CardHeader>
              <CardTitle className="pixel-text flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold pixel-text text-center">{totalXP} XP</p>
            </CardContent>
          </Card>
          <Card className="pixel-border bg-white">
            <CardHeader>
              <CardTitle className="pixel-text flex items-center gap-2">
                <Star className="w-6 h-6 text-purple-500" />
                Current Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold pixel-text text-center">{level}</p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="pixel-border bg-white">
                <CardHeader>
                  <CardTitle className="pixel-text flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    {achievement.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="pixel-text mb-2">{achievement.description}</p>
                  <Progress value={achievement.progress} className="pixel-border" />
                  <p className="text-right mt-2 pixel-text">{achievement.progress}%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Recent Activities</h2>
          <Card className="pixel-border bg-white">
            <CardContent>
              <ul className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="flex justify-between items-center pixel-text">
                    <span>{activity.name}</span>
                    <span className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      {activity.xp} XP
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <div className="text-center">
          <Button onClick={handleContinueLearning} className="pixel-border bg-green-500 hover:bg-green-600 text-white">
            Continue Learning
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
      `}</style>
    </div>
  )
}
