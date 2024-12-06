import React from 'react'

export default function Footer() {
  return (
    <footer className="b-0 relative mt-12 py-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 opacity-80"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-white text-opacity-90 font-bold text-xl mb-1 animate-pulse">
            Website created by
          </div>
          <div className="text-white text-opacity-90 font-extrabold text-3xl mb-3 tracking-wider">
            Mohamed Hazem Hassine
          </div>
          <div className="flex space-x-4">
            {['M', 'H', 'H'].map((letter, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white text-xl font-bold transform hover:scale-110 transition-transform duration-200 ease-in-out"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fillOpacity="0.2" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </footer>
  )
}

