import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Clock, Star } from "lucide-react";

// Mock data - will be replaced with real data from database
const featuredGames = [
  {
    id: "1",
    name: "Catan",
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop",
    category: "intermediate",
    minPlayers: 3,
    maxPlayers: 4,
    duration: "60-90 min",
    complexity: 3,
    status: "available",
    emoji: "🏝️",
  },
  {
    id: "2",
    name: "Ticket to Ride",
    image: "https://images.unsplash.com/photo-1606503153255-59d7543cd7e4?w=400&h=300&fit=crop",
    category: "beginner",
    minPlayers: 2,
    maxPlayers: 5,
    duration: "45-60 min",
    complexity: 2,
    status: "available",
    emoji: "🚂",
  },
  {
    id: "3",
    name: "Codenames",
    image: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&h=300&fit=crop",
    category: "casual",
    minPlayers: 4,
    maxPlayers: 8,
    duration: "15-30 min",
    complexity: 1,
    status: "booked",
    emoji: "🕵️",
  },
  {
    id: "4",
    name: "Terraforming Mars",
    image: "https://images.unsplash.com/photo-1566694271453-390536dd823b?w=400&h=300&fit=crop",
    category: "complex",
    minPlayers: 1,
    maxPlayers: 5,
    duration: "120+ min",
    complexity: 4,
    status: "available",
    emoji: "🚀",
  },
];

const categoryColors: Record<string, string> = {
  beginner: "bg-success/20 text-success border-success/30",
  intermediate: "bg-info/20 text-info border-info/30",
  casual: "bg-warning/20 text-warning border-warning/30",
  complex: "bg-primary/20 text-primary border-primary/30",
};

const statusConfig: Record<string, { label: string; class: string; emoji: string }> = {
  available: { label: "Available", class: "status-available", emoji: "✅" },
  booked: { label: "Booked", class: "status-booked", emoji: "🔒" },
  partial: { label: "Partial", class: "status-partial", emoji: "⚠️" },
  unavailable: { label: "Unavailable", class: "status-unavailable", emoji: "❌" },
};

export function FeaturedGames() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-4xl mb-2 block">🔥</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
              Hot Games
            </h2>
            <p className="text-muted-foreground text-xl">
              Fan favorites that everyone's obsessed with! 🤩
            </p>
          </div>
          <Link to="/games" className="hidden md:block">
            <Button variant="ghost" className="gap-2 text-lg">
              View All
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGames.map((game, index) => (
            <Link
              key={game.id}
              to={`/games/${game.id}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-3xl border-2 border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 hover:rotate-1">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className={`${statusConfig[game.status].class} border-0 text-sm font-bold`}>
                      {statusConfig[game.status].emoji} {statusConfig[game.status].label}
                    </Badge>
                  </div>
                  {/* Game Emoji */}
                  <div className="absolute bottom-3 left-3 text-4xl drop-shadow-lg group-hover:animate-wiggle">
                    {game.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">
                      {game.name}
                    </h3>
                    <Badge variant="outline" className={`${categoryColors[game.category]} border-2 font-bold`}>
                      {game.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{game.minPlayers}-{game.maxPlayers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{game.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🧠</span>
                      <span>{game.complexity}/5</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden mt-8 text-center">
          <Link to="/games">
            <Button variant="purple" className="gap-2">
              View All Games 🎲
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
