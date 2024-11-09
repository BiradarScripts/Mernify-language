'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Globe, BarChart, Users, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export function PixelLingoLandingComponent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel">
      <header className="p-4 bg-blue-600 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold pixel-text">PixelLingo</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="#features" className="hover:text-yellow-300 transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-yellow-300 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-yellow-300 transition-colors">About</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">Learn Languages the Pixel Way!</h2>
          <p className="text-xl mb-8 pixel-text">Embark on a retro-style journey to master new languages</p>
          <Button className="pixel-border bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
            Start Learning Now
          </Button>
        </section>
{/* //awefeafeafadf */}
        <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<BookOpen className="w-12 h-12 mb-4 text-blue-600" />}
            title="Interactive Lessons"
            description="Engage with fun, pixel-perfect lessons that make learning a breeze"
            route="/interactive-lessonns"
          />
          <FeatureCard
            icon={<Globe className="w-12 h-12 mb-4 text-green-600" />}
            title="Multiple Languages"
            description="Choose from a variety of languages to expand your linguistic horizons"
            route="/multiple-languages"
          />
          <FeatureCard
            icon={<BarChart className="w-12 h-12 mb-4 text-purple-600" />}
            title="Progress Tracking"
            description="Watch your skills grow with detailed progress charts and achievements"
            route="/progress-tracking"
          />
          <FeatureCard
            icon={<Users className="w-12 h-12 mb-4 text-red-600" />}
            title="Community"
            description="Connect with fellow learners and practice your skills together"
            route="/community"
          />
          <FeatureCard
            icon={<GraduationCap className="w-12 h-12 mb-4 text-yellow-600" />}
            title="Expert Instructors"
            description="Learn from the best with our team of experienced language instructors"
            route="/instructor"
          />
          <FeatureCard
            icon={<GraduationCap className="w-12 h-12 mb-4 text-yellow-600" />}
            title="Quiz-and-Challenges"
            description=" real-time language practice with an AI chatbot"
            route="/quiz-and-challenges"
          />
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 pixel-text">Ready to Start Your Pixel Language Adventure?</h2>
          <Button className="pixel-border bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 text-lg">
            Sign Up for Free
          </Button>
        </section>
      </main>

      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="pixel-text">&copy; 2023 PixelLingo. All rights reserved.</p>
          <div className="mt-4">
            <Link href="#" className="text-yellow-300 hover:text-yellow-100 mr-4">Terms of Service</Link>
            <Link href="#" className="text-yellow-300 hover:text-yellow-100">Privacy Policy</Link>
          </div>
        </div>
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

function FeatureCard({ icon, title, description, route }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <Card className="pixel-border bg-white cursor-pointer" onClick={handleClick}>
      <CardContent className="p-6 text-center">
        {icon}
        <h3 className="text-xl font-bold mb-2 pixel-text">{title}</h3>
        <p className="pixel-text">{description}</p>
      </CardContent>
    </Card>
  );
}
