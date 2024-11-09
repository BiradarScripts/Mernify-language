'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, MessageSquare, Globe, Search, UserPlus, Star } from 'lucide-react'
import Link from 'next/link'

export function CommunityComponent() {
  const languagePartners = [
    { name: "Maria", language: "Spanish", level: "Native", status: "Online" },
    { name: "Yuki", language: "Japanese", level: "Native", status: "Offline" },
    { name: "Hans", language: "German", level: "C1", status: "Online" },
  ];

  const discussionTopics = [
    { title: "Tips for learning verb conjugations", replies: 23, views: 156 },
    { title: "Best movies for improving listening skills", replies: 45, views: 302 },
    { title: "How to overcome speaking anxiety", replies: 67, views: 489 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
      <header className="container mx-auto mb-8 text-center">
        <div className="inline-block bg-white pixel-border p-2 mb-4">
          <Users className="w-12 h-12 text-blue-600 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
          PixelLingo Community
        </h1>
        <p className="text-xl mt-2 pixel-text">
          Connect, chat, and level up your language skills!
        </p>
      </header>

      <main className="container mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Find Language Partners</h2>
          <Card className="pixel-border bg-white">
            <CardContent className="p-6">
              <div className="flex space-x-4 mb-4">
                <Input className="pixel-border" placeholder="Search by language or username" />
                <Button className="pixel-border bg-green-500 hover:bg-green-600 text-white">
                  <Search className="w-4 h-4 mr-2" /> Search
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languagePartners.map((partner) => (
                  <Card key={partner.name} className="pixel-border bg-gray-100">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold pixel-text">{partner.name}</h3>
                        <p className="pixel-text text-sm">{partner.language} ({partner.level})</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge variant={partner.status === "Online" ? "default" : "secondary"} className="pixel-border mb-2">
                          {partner.status}
                        </Badge>
                        <Button size="sm" className="pixel-border">
                          <UserPlus className="w-4 h-4 mr-2" /> Connect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Discussion Forum</h2>
          <Card className="pixel-border bg-white">
            <CardContent className="p-6">
              {discussionTopics.map((topic, index) => (
                <div key={index} className="mb-4 last:mb-0 p-4 bg-gray-100 pixel-border">
                  <h3 className="font-bold pixel-text mb-2">{topic.title}</h3>
                  <div className="flex justify-between text-sm pixel-text">
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" /> {topic.replies} replies
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2" /> {topic.views} views
                    </span>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 pixel-border bg-blue-500 hover:bg-blue-600 text-white">
                Start a New Discussion
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Language Exchange Challenges</h2>
          <Card className="pixel-border bg-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-yellow-100 pixel-border">
                  <h3 className="font-bold pixel-text mb-2">Daily Conversation Challenge</h3>
                  <p className="pixel-text mb-2">Practice a 5-minute conversation in your target language</p>
                  <Button className="w-full pixel-border bg-yellow-500 hover:bg-yellow-600 text-white">
                    Join Challenge
                  </Button>
                </div>
                <div className="p-4 bg-purple-100 pixel-border">
                  <h3 className="font-bold pixel-text mb-2">Weekly Writing Prompt</h3>
                  <p className="pixel-text mb-2">Write a short story based on the given theme</p>
                  <Button className="w-full pixel-border bg-purple-500 hover:bg-purple-600 text-white">
                    View Prompt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <Button className="pixel-border bg-green-500 hover:bg-green-600 text-white">
            <Globe className="w-4 h-4 mr-2" /> Explore More Community Features
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