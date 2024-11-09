'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, MessageSquare, User, VolumeX, Volume2, Lightbulb, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export function ChatbotComponent() {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m PixelBot, your quiz assistant. Are you ready to start?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { role: 'user', content: inputMessage }]);
      setInputMessage('');

      if (!isQuizStarted) {
        if (inputMessage.toLowerCase() === 'yes') {
          setIsQuizStarted(true);
          setMessages(prevMessages => [
            ...prevMessages,
            { role: 'bot', content: 'Great! Let\'s get started. First question: What is the capital of France?' }
          ]);
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { role: 'bot', content: 'No problem! Let me know when you are ready.' }
          ]);
        }
      } else {
        if (inputMessage.toLowerCase() === 'paris') {
          setMessages(prevMessages => [
            ...prevMessages,
            { role: 'bot', content: 'Correct! Next question: What is the largest planet in our solar system?' }
          ]);
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { role: 'bot', content: 'Oops, that\'s not quite right. Try again: What is the capital of France?' }
          ]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
      <header className="container mx-auto mb-8 text-center">
        <div className="inline-block bg-white pixel-border p-2 mb-4">
          <MessageSquare className="w-12 h-12 text-blue-600 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
          PixelBot Chat
        </h1>
        <p className="text-xl mt-2 pixel-text">
          Your pixelated quiz companion!
        </p>
      </header>

      <main className="container mx-auto max-w-2xl">
        <Card className="pixel-border bg-white">
          <CardHeader>
            <CardTitle className="pixel-text flex items-center justify-between">
              <span>Chat with PixelBot</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" className="pixel-border">
                  <VolumeX className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="pixel-border">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full pr-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="w-8 h-8 pixel-border">
                      {message.role === 'bot' ? (
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="PixelBot" />
                      ) : (
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                      )}
                    </Avatar>
                    <div className={`mx-2 px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'} pixel-border`}>
                      <p className="pixel-text text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Input 
                type="text" 
                placeholder="Type your message..." 
                className="pixel-border"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="pixel-border bg-green-500 hover:bg-green-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 flex justify-center space-x-4">
          <Button variant="outline" className="pixel-border">
            <Lightbulb className="h-4 w-4 mr-2" />
            Get a Hint
          </Button>
          <Button variant="outline" className="pixel-border">
            <RefreshCw className="h-4 w-4 mr-2" />
            New Topic
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
