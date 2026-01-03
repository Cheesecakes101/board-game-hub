import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";

// Mock events data
const upcomingEvents = [
  {
    id: "1",
    title: "Strategy Night",
    date: "Saturday, Jan 11",
    time: "8:00 PM - 11:00 PM",
    location: "Common Room, Block A",
    theme: "Strategy & Conquest",
    maxParticipants: 20,
    currentParticipants: 14,
    fee: 50,
    status: "open",
    emoji: "⚔️",
  },
  {
    id: "2",
    title: "Party Games Bonanza",
    date: "Saturday, Jan 18",
    time: "8:00 PM - 11:00 PM",
    location: "Common Room, Block A",
    theme: "Fun & Laughter",
    maxParticipants: 24,
    currentParticipants: 8,
    fee: 40,
    status: "open",
    emoji: "🎉",
  },
];

const pastEvents = [
  {
    id: "p1",
    title: "New Year's Game Marathon",
    date: "Saturday, Jan 4",
    participants: 18,
    gamesPlayed: 6,
    emoji: "🎆",
  },
  {
    id: "p2",
    title: "Winter Warmup",
    date: "Saturday, Dec 28",
    participants: 16,
    gamesPlayed: 5,
    emoji: "❄️",
  },
];

const highlights = [
  { text: "Meet cool people from different floors", emoji: "👋" },
  { text: "Games randomly assigned", emoji: "🎲" },
  { text: "Snacks & drinks included", emoji: "🍿" },
  { text: "Win fun prizes", emoji: "🏆" },
];

const Events = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden gradient-hero py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBjeD0iNDAiIGN5PSI0MCIgcj0iNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
          
          <div className="container relative">
            <div className="max-w-2xl">
              <Badge className="mb-4 gradient-accent text-accent-foreground border-0 text-base px-4 py-2 font-bold">
                <span className="mr-2">🌙</span>
                Every Saturday Night
                <span className="ml-2">✨</span>
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
                Saturday Night Gaming 🎲
              </h1>
              <p className="text-xl text-white/90 mb-8 font-medium">
                The most fun you'll have all week! Epic games, awesome people, 
                unforgettable memories. Don't miss out! 🚀
              </p>
              
              <div className="flex flex-wrap gap-3">
                {highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-base font-bold border-2 border-white/30 hover:scale-105 transition-transform"
                  >
                    <span className="text-xl">{highlight.emoji}</span>
                    {highlight.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 bg-secondary/50">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">📅</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
                Upcoming Events
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => {
                const spotsLeft = event.maxParticipants - event.currentParticipants;
                const progressPercent = (event.currentParticipants / event.maxParticipants) * 100;
                
                return (
                  <div 
                    key={event.id}
                    className="bg-card rounded-3xl border-2 border-primary/20 shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-in hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="mb-3 bg-accent/20 text-accent-foreground border-2 border-accent/30 font-bold">
                            <span className="mr-1">{event.emoji}</span> {event.theme}
                          </Badge>
                          <h3 className="font-display text-2xl font-bold">
                            {event.title}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-3xl font-bold text-primary">₹{event.fee}</p>
                          <p className="text-sm text-muted-foreground font-medium">per person</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="text-xl">📅</span>
                          <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="text-xl">⏰</span>
                          <span className="font-medium">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <span className="text-xl">📍</span>
                          <span className="font-medium">{event.location}</span>
                        </div>
                      </div>
                      
                      {/* Progress */}
                      <div className="mb-5">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground font-medium">
                            👥 {event.currentParticipants}/{event.maxParticipants} registered
                          </span>
                          <span className={`font-bold ${spotsLeft <= 5 ? 'text-destructive' : 'text-success'}`}>
                            {spotsLeft <= 5 ? '🔥' : '✨'} {spotsLeft} spots left!
                          </span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full gradient-accent rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                      
                      <Button variant="fun" className="w-full gap-2 text-lg">
                        🎟️ Register Now
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-4xl">📜</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Past Events
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pastEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className="bg-card rounded-2xl border-2 border-dashed border-border p-5 animate-fade-in hover:border-primary/30 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-4xl mb-3 block">{event.emoji}</span>
                  <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                  <h3 className="font-display font-bold text-lg mb-3">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                    <span>👥 {event.participants}</span>
                    <span>🎲 {event.gamesPlayed} games</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/50">
          <div className="container text-center">
            <span className="text-6xl mb-4 block animate-bounce-in">🎮</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
              Ready to Join the Fun?
            </h2>
            <p className="text-muted-foreground text-xl mb-8 max-w-md mx-auto">
              Sign up now and get notified about upcoming events. Don't miss out! 🚀
            </p>
            <Button variant="fun" size="xl">
              ✨ Create Your Account
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
