import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Gamepad2 } from "lucide-react";

const floatingEmojis = ["🎲", "🎯", "🃏", "♟️", "🎮", "🧩"];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Fun background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBjeD0iNDAiIGN5PSI0MCIgcj0iNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
      
      {/* Floating Emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingEmojis.map((emoji, index) => (
          <span
            key={index}
            className="absolute text-4xl md:text-6xl animate-float opacity-20 select-none"
            style={{
              left: `${10 + index * 15}%`,
              top: `${15 + (index % 3) * 30}%`,
              animationDelay: `${index * 0.4}s`,
              animationDuration: `${4 + index * 0.5}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="container relative py-20 md:py-28 lg:py-36">
        <div className="max-w-3xl mx-auto text-center">
          {/* Fun Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-base font-bold mb-8 animate-bounce-in">
            <span className="text-xl animate-pulse">🔥</span>
            Saturday Night Event This Week!
            <span className="text-xl animate-pulse">🎉</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in [animation-delay:100ms]">
            Board Games,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-lime-300 to-green-300 drop-shadow-lg">
              Zero Boredom! 🎲
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms] font-medium">
            Rent awesome games, join wild Saturday nights, and find your new game squad! 🤝✨
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:300ms]">
            <Link to="/games">
              <Button variant="accent" size="xl" className="w-full sm:w-auto gap-2">
                <span className="text-xl">🎲</span>
                Browse Games
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/events">
              <Button 
                size="xl" 
                className="w-full sm:w-auto border-3 border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
              >
                <span className="text-xl">🌙</span>
                Saturday Nights
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative bg-white/10 backdrop-blur-md border-t-2 border-white/20">
        <div className="container py-8">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl group-hover:animate-wiggle">🎲</span>
                <span className="font-display text-3xl font-bold text-white">25+</span>
              </div>
              <p className="text-base text-white/70 font-medium">Board Games</p>
            </div>
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl group-hover:animate-wiggle">👥</span>
                <span className="font-display text-3xl font-bold text-white">100+</span>
              </div>
              <p className="text-base text-white/70 font-medium">Players</p>
            </div>
            <div className="text-center group hover:scale-110 transition-transform">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl group-hover:animate-wiggle">🎉</span>
                <span className="font-display text-3xl font-bold text-white">Weekly</span>
              </div>
              <p className="text-base text-white/70 font-medium">Events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
