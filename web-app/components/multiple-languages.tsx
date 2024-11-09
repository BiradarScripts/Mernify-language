'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Star, Trophy, Heart } from 'lucide-react'
import Link from 'next/link'

export function MultipleLanguagesComponent() {
  const languages = [
    { name: "Spanish", level: "Beginner", users: "2M+", flag: "🇪🇸", popular: true },
    { name: "French", level: "Intermediate", users: "1.5M+", flag: "🇫🇷", popular: true },
    { name: "Japanese", level: "All Levels", users: "1M+", flag: "🇯🇵", popular: true },
    { name: "German", level: "Beginner", users: "800K+", flag: "🇩🇪", popular: false },
    { name: "Italian", level: "Beginner", users: "600K+", flag: "🇮🇹", popular: false },
    { name: "Chinese", level: "All Levels", users: "1.2M+", flag: "🇨🇳", popular: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
      <header className="container mx-auto mb-8 text-center">
        <div className="inline-block bg-white pixel-border p-2 mb-4">
          <Globe className="w-12 h-12 text-blue-600 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
          Choose Your Language Quest
        </h1>
        <p className="text-xl mt-2 pixel-text">
          Unlock new worlds with every language you learn!
        </p>
      </header>

      <main className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {languages.map((lang) => (
            <Card key={lang.name} className="pixel-border bg-white hover:transform hover:scale-105 transition-transform">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="text-4xl">{lang.flag}</div>
                <div>
                  <CardTitle className="pixel-text flex items-center gap-2">
                    {lang.name}
                    {lang.popular && (
                      <Badge variant="secondary" className="pixel-border">
                        <Star className="w-3 h-3 mr-1" /> Popular
                      </Badge>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pixel-text">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    Level: {lang.level}
                  </div>
                  <div className="flex items-center gap-2 pixel-text">
                    <Heart className="w-4 h-4 text-red-500" />
                    Active Users: {lang.users}
                  </div>
                  <Button className="w-full pixel-border bg-green-500 hover:bg-green-600 mt-4">
                    Start Learning
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="bg-white pixel-border p-6 text-center mb-8">
          <h2 className="text-2xl font-bold mb-4 pixel-text">Why Learn Multiple Languages?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4">
              <div className="text-3xl mb-2">🧠</div>
              <h3 className="font-bold pixel-text mb-2">Brain Power</h3>
              <p className="pixel-text">Enhance cognitive abilities and memory</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🌍</div>
              <h3 className="font-bold pixel-text mb-2">Global Access</h3>
              <p className="pixel-text">Connect with people worldwide</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">💼</div>
              <h3 className="font-bold pixel-text mb-2">Career Boost</h3>
              <p className="pixel-text">Unlock new job opportunities</p>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Button className="pixel-border bg-yellow-400 hover:bg-yellow-500 text-black">
            View All Languages
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




// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Globe, Star, Trophy, Heart } from 'lucide-react'
// import Link from 'next/link'

// export function MultipleLanguagesComponent() {
//   const [languages, setLanguages] = useState([]); // State to store language data
//   const [loading, setLoading] = useState(true);  // To show loading state
//   const [error, setError] = useState(null); // For handling errors

//   // Fetch data from backend (API call)
//   useEffect(() => {
//     const fetchLanguages = async () => {
//       try {
//         const response = await fetch('/api/languages');  // Assuming your backend is at /api/languages
//         if (response.ok) {
//           const data = await response.json();
//           setLanguages(data);  // Set the fetched data to state
//         } else {
//           throw new Error('Failed to fetch languages');
//         }
//       } catch (error) {
//         setError(error.message); // Set error state if the fetch fails
//       } finally {
//         setLoading(false); // Stop loading state
//       }
//     }

//     fetchLanguages(); // Call the fetch function on component mount
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading indicator while data is being fetched
//   }

//   if (error) {
//     return <div>Error: {error}</div>; // Show error message if there's any
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 font-pixel p-4">
//       <header className="container mx-auto mb-8 text-center">
//         <div className="inline-block bg-white pixel-border p-2 mb-4">
//           <Globe className="w-12 h-12 text-blue-600 mx-auto" />
//         </div>
//         <h1 className="text-4xl font-bold pixel-text text-yellow-400 drop-shadow-[2px_2px_0_#000]">
//           Choose Your Language Quest
//         </h1>
//         <p className="text-xl mt-2 pixel-text">
//           Unlock new worlds with every language you learn!
//         </p>
//       </header>

//       <main className="container mx-auto">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           {languages.map((lang) => (
//             <Card key={lang.name} className="pixel-border bg-white hover:transform hover:scale-105 transition-transform">
//               <CardHeader className="flex flex-row items-center space-x-4">
//                 <div className="text-4xl">{lang.flag}</div>
//                 <div>
//                   <CardTitle className="pixel-text flex items-center gap-2">
//                     {lang.name}
//                     {lang.popular && (
//                       <Badge variant="secondary" className="pixel-border">
//                         <Star className="w-3 h-3 mr-1" /> Popular
//                       </Badge>
//                     )}
//                   </CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2 pixel-text">
//                     <Trophy className="w-4 h-4 text-yellow-500" />
//                     Level: {lang.level}
//                   </div>
//                   <div className="flex items-center gap-2 pixel-text">
//                     <Heart className="w-4 h-4 text-red-500" />
//                     Active Users: {lang.users}
//                   </div>
//                   <Button className="w-full pixel-border bg-green-500 hover:bg-green-600 mt-4">
//                     Start Learning
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <section className="bg-white pixel-border p-6 text-center mb-8">
//           <h2 className="text-2xl font-bold mb-4 pixel-text">Why Learn Multiple Languages?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="p-4">
//               <div className="text-3xl mb-2">🧠</div>
//               <h3 className="font-bold pixel-text mb-2">Brain Power</h3>
//               <p className="pixel-text">Enhance cognitive abilities and memory</p>
//             </div>
//             <div className="p-4">
//               <div className="text-3xl mb-2">🌍</div>
//               <h3 className="font-bold pixel-text mb-2">Global Access</h3>
//               <p className="pixel-text">Connect with people worldwide</p>
//             </div>
//             <div className="p-4">
//               <div className="text-3xl mb-2">💼</div>
//               <h3 className="font-bold pixel-text mb-2">Career Boost</h3>
//               <p className="pixel-text">Unlock new job opportunities</p>
//             </div>
//           </div>
//         </section>

//         <div className="text-center">
//           <Button className="pixel-border bg-yellow-400 hover:bg-yellow-500 text-black">
//             View All Languages
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
