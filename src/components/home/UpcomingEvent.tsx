import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

export function UpcomingEvent() {
  // Mock data - will be replaced with real data
  const event = {
    id: "1",
    title: "Strategy Night",
    date: "Saturday, Jan 11",
    time: "8:00 PM - 11:00 PM",
    location: "Common Room, Block A",
    theme: "Strategy & Conquest",
    maxParticipants: 20,
    currentParticipants: 14,
    fee: 50,
    spotsLeft: 6,
  };

  const progressPercent = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-fun text-white border-0 text-base px-4 py-2 font-bold">
              <span className="mr-2">🔥</span>
              This Week
              <span className="ml-2">🔥</span>
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
              Saturday Night Gaming
            </h2>
            <p className="text-muted-foreground text-xl">
              Epic games, great vibes, new friends! 🎉🎲
            </p>
          </div>

          <div className="bg-card rounded-[2rem] border-2 border-primary/20 shadow-elevated overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left: Event Details */}
              <div className="p-8 md:p-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground text-base font-bold mb-6 border-2 border-accent/30">
                  <span>⚔️</span> {event.theme}
                </div>

                <h3 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  {event.title} 🎯
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                      📅
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-lg">{event.date}</p>
                      <p>{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center text-2xl">
                      📍
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-lg">{event.location}</p>
                      <p>Hostel premises</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-2xl">
                      👥
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-lg">{event.currentParticipants}/{event.maxParticipants} registered</p>
                      <p>{event.spotsLeft} spots remaining!</p>
                    </div>
                  </div>
                </div>

                <Link to={`/events/${event.id}`}>
                  <Button variant="fun" size="lg" className="w-full md:w-auto text-lg">
                    🎟️ Register Now — ₹{event.fee}
                  </Button>
                </Link>
              </div>

              {/* Right: Visual */}
              <div className="relative gradient-hero p-8 md:p-10 flex flex-col justify-center">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBjeD0iNDAiIGN5PSI0MCIgcj0iNSIvPjwvZz48L3N2Zz4=')] opacity-30" />
                
                <div className="relative text-center">
                  {/* Progress Circle */}
                  <div className="w-44 h-44 mx-auto mb-6 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="88"
                        cy="88"
                        r="75"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="88"
                        cy="88"
                        r="75"
                        stroke="url(#progressGradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 75}`}
                        strokeDashoffset={`${2 * Math.PI * 75 * (1 - progressPercent / 100)}`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(85, 75%, 55%)" />
                          <stop offset="100%" stopColor="hsl(160, 75%, 50%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <span className="text-5xl mb-1">🔥</span>
                      <span className="font-display text-4xl font-bold">{event.spotsLeft}</span>
                      <span className="text-sm text-white/70 font-medium">spots left</span>
                    </div>
                  </div>

                  <div className="text-white">
                    <p className="text-xl font-bold mb-2">Filling up fast! 🚀</p>
                    <p className="text-white/70">
                      Games randomly assigned based on group size 🎲
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
