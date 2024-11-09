'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Video, MessageCircle, Star, Clock, Book } from 'lucide-react'
import Link from 'next/link'

export function InstructorComponent() {
  const instructor = {
    name: "Prof. Pixel",
    language: "Spanish",
    rating: 4.9,
    totalLessons: 1337,
    nextAvailable: "Today, 3:00 PM",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
      <header className="container mx-auto mb-8 text-center">
        <div className="inline-block bg-white pixel-border p-2 mb-4">
          <Video className="w-12 h-12 text-blue-600 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
          Your Personal Instructor
        </h1>
        <p className="text-xl mt-2 pixel-text">
          Level up your language skills with one-on-one video lessons!
        </p>
      </header>

      <main className="container mx-auto">
        <Card className="pixel-border bg-white mb-8">
          <CardHeader>
            <CardTitle className="pixel-text flex items-center justify-between">
              <span>Meet Your Instructor</span>
              <Badge variant="secondary" className="pixel-border">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                {instructor.rating}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-24 h-24 pixel-border">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={instructor.name} />
                <AvatarFallback>{instructor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold pixel-text">{instructor.name}</h2>
                <p className="pixel-text">{instructor.language} Instructor</p>
                <p className="pixel-text flex items-center mt-2">
                  <Book className="w-4 h-4 mr-2" />
                  {instructor.totalLessons} lessons taught
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Button className="pixel-border bg-green-500 hover:bg-green-600 text-white">
                <Video className="w-4 h-4 mr-2" />
                Start Video Lesson
              </Button>
              <Button variant="outline" className="pixel-border">
                <MessageCircle className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
            <p className="pixel-text flex items-center justify-center bg-blue-100 p-2 pixel-border">
              <Clock className="w-4 h-4 mr-2" />
              Next available: {instructor.nextAvailable}
            </p>
          </CardContent>
        </Card>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Upcoming Lessons</h2>
          <Card className="pixel-border bg-white">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-100 pixel-border">
                  <div className="pixel-text">
                    <h3 className="font-bold">Conversational Spanish</h3>
                    <p>Thursday, 2:00 PM</p>
                  </div>
                  <Button size="sm" className="pixel-border">Join</Button>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100 pixel-border">
                  <div className="pixel-text">
                    <h3 className="font-bold">Spanish Grammar Review</h3>
                    <p>Saturday, 10:00 AM</p>
                  </div>
                  <Button size="sm" className="pixel-border">Join</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Book a Lesson</h2>
          <Card className="pixel-border bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((day) => (
                  <Button key={day} variant="outline" className="pixel-border">
                    <Calendar className="w-4 h-4 mr-2" />
                    Day {day}
                  </Button>
                ))}
              </div>
              <Button className="w-full mt-4 pixel-border bg-blue-500 hover:bg-blue-600 text-white">
                View More Time Slots
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <Button className="pixel-border bg-purple-500 hover:bg-purple-600 text-white">
            Explore Other Instructors
          </Button>
        </section>
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