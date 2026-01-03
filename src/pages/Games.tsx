import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Search, 
  ArrowRight,
  Grid3X3, 
  List,
} from "lucide-react";

// Mock data
const allGames = [
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
    description: "Trade, build, and settle the island of Catan in this classic strategy game.",
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
    description: "Collect train cards and claim railway routes across the map.",
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
    description: "A social word game with a simple premise and challenging gameplay.",
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
    description: "Compete to transform Mars into a habitable planet.",
    emoji: "🚀",
  },
  {
    id: "5",
    name: "Uno",
    image: "https://images.unsplash.com/photo-1551431009-a802eeec77b1?w=400&h=300&fit=crop",
    category: "beginner",
    minPlayers: 2,
    maxPlayers: 10,
    duration: "15-30 min",
    complexity: 1,
    status: "available",
    description: "The classic card game of matching colors and numbers.",
    emoji: "🃏",
  },
  {
    id: "6",
    name: "Pandemic",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    category: "intermediate",
    minPlayers: 2,
    maxPlayers: 4,
    duration: "45-60 min",
    complexity: 3,
    status: "partial",
    description: "Work together to save humanity from deadly diseases.",
    emoji: "🦠",
  },
];

const categories = [
  { value: "all", label: "All Games", emoji: "🎲" },
  { value: "beginner", label: "Beginner", emoji: "🌱" },
  { value: "casual", label: "Casual", emoji: "😎" },
  { value: "intermediate", label: "Intermediate", emoji: "🎯" },
  { value: "complex", label: "Complex", emoji: "🧠" },
];

const statusConfig: Record<string, { label: string; class: string; emoji: string }> = {
  available: { label: "Available", class: "status-available", emoji: "✅" },
  booked: { label: "Booked", class: "status-booked", emoji: "🔒" },
  partial: { label: "Partial", class: "status-partial", emoji: "⚠️" },
  unavailable: { label: "Unavailable", class: "status-unavailable", emoji: "❌" },
};

const categoryColors: Record<string, string> = {
  beginner: "bg-success/20 text-success border-success/30",
  intermediate: "bg-info/20 text-info border-info/30",
  casual: "bg-warning/20 text-warning border-warning/30",
  complex: "bg-primary/20 text-primary border-primary/30",
};

const Games = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredGames = allGames.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-warm">
        {/* Header */}
        <div className="bg-card border-b-2 border-dashed border-primary/20">
          <div className="container py-10">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl animate-bounce-in">🎲</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
                Game Library
              </h1>
            </div>
            <p className="text-muted-foreground text-xl ml-16">
              {allGames.length} awesome games waiting for you! 🎯
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="container py-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search games... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-2 text-lg"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 flex-1 md:flex-initial">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "purple" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className="whitespace-nowrap gap-2 rounded-xl"
                  >
                    <span>{category.emoji}</span>
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-1 border-2 rounded-xl p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9 rounded-lg"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="container pb-12">
          {filteredGames.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">😅</span>
              <p className="text-muted-foreground text-xl">No games found. Try a different search!</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game, index) => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="bg-card rounded-3xl border-2 border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 hover:rotate-1">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${statusConfig[game.status].class} border-0 font-bold`}>
                          {statusConfig[game.status].emoji} {statusConfig[game.status].label}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 text-4xl drop-shadow-lg group-hover:animate-wiggle">
                        {game.emoji}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">
                          {game.name}
                        </h3>
                      </div>
                      <Badge variant="outline" className={`${categoryColors[game.category]} border-2 font-bold mb-3`}>
                        {game.category}
                      </Badge>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {game.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                        <span>👥 {game.minPlayers}-{game.maxPlayers}</span>
                        <span>⏱️ {game.duration}</span>
                        <span>🧠 {game.complexity}/5</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredGames.map((game, index) => (
                <Link
                  key={game.id}
                  to={`/games/${game.id}`}
                  className="group block animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="bg-card rounded-2xl border-2 border-border p-4 shadow-soft hover:shadow-elevated transition-all duration-300 flex gap-4 hover:-translate-x-1">
                    <div className="relative">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-28 h-28 rounded-xl object-cover"
                      />
                      <span className="absolute bottom-1 right-1 text-2xl">{game.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display font-bold text-xl group-hover:text-primary transition-colors">
                            {game.name}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-1">
                            {game.description}
                          </p>
                        </div>
                        <Badge className={`${statusConfig[game.status].class} border-0 shrink-0 font-bold`}>
                          {statusConfig[game.status].emoji} {statusConfig[game.status].label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground font-medium flex-wrap">
                        <Badge variant="outline" className={`${categoryColors[game.category]} border-2`}>
                          {game.category}
                        </Badge>
                        <span>👥 {game.minPlayers}-{game.maxPlayers}</span>
                        <span>⏱️ {game.duration}</span>
                        <span>🧠 {game.complexity}/5</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Games;
