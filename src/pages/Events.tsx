import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import type { Event, EventRegistration } from "@shared/schema";

const highlights = [
  { text: "Meet cool people from different floors" },
  { text: "Games randomly assigned" },
  { text: "Snacks & drinks included" },
  { text: "Win fun prizes" },
];

const Events = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: myRegistrations } = useQuery<EventRegistration[]>({
    queryKey: ["/api/registrations/my"],
    enabled: !!user,
  });

  const { data: registrations } = useQuery<EventRegistration[]>({
    queryKey: ["/api/registrations"],
    enabled: !!user?.role && user.role === "admin",
  });

  const upcomingEvents = events?.filter(e => new Date(e.date) >= new Date()) || [];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCFD]">
      <Navbar />
      <main className="flex-1">
        <section className="py-12 md:py-16 text-center">
          <div className="container">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#FFB84D] to-[#FF8C42] text-white font-bold text-sm mb-6 shadow-sm">
              <span role="img" aria-label="fire">🔥</span> This Week <span role="img" aria-label="fire">🔥</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#D659A1] mb-4">
              Saturday Night Gaming
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Epic games, great vibes, new friends! <span role="img" aria-label="party">🎉</span> <span role="img" aria-label="dice">🎲</span>
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container max-w-5xl">
            {isLoading ? (
              <div className="grid gap-8">
                <Skeleton className="h-[400px] rounded-[40px]" />
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-xl">No upcoming events. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-12">
                {upcomingEvents.map((event, index) => {
                  const eventRegs = registrations?.filter(r => r.eventId === event.id && r.status === "confirmed") || [];
                  const regCount = eventRegs.length;
                  const spotsLeft = event.capacity - regCount;
                  const isRegistered = myRegistrations?.some(r => r.eventId === event.id);
                  const progress = (regCount / event.capacity) * 100;

                  return (
                    <div 
                      key={event.id}
                      className="group relative bg-white rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-[#F0F0F0] overflow-hidden flex flex-col md:flex-row animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Left Side: Content */}
                      <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                        <div className="space-y-6">
                          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EBF7E9] text-[#1A4D2E] font-bold text-sm border border-[#D4E9D2]">
                            <span role="img" aria-label="swords">⚔️</span> Strategy & Conquest
                          </div>

                          <h2 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] flex items-center gap-3">
                            {event.name}
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FEE2E2] text-[#EF4444]">
                               <span role="img" aria-label="target">🎯</span>
                            </span>
                          </h2>

                          <div className="space-y-5">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center shrink-0">
                                <Calendar className="h-6 w-6 text-[#4F46E5]" />
                              </div>
                              <div>
                                <p className="font-bold text-lg text-[#1A1A1A]">
                                  {format(new Date(event.date), "EEEE, MMM d")}
                                </p>
                                <p className="text-[#666666] font-medium">{event.time}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] flex items-center justify-center shrink-0">
                                <MapPin className="h-6 w-6 text-[#EA580C]" />
                              </div>
                              <div>
                                <p className="font-bold text-lg text-[#1A1A1A]">{event.location}</p>
                                <p className="text-[#666666] font-medium">Hostel premises</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] flex items-center justify-center shrink-0">
                                <Users className="h-6 w-6 text-[#16A34A]" />
                              </div>
                              <div>
                                <p className="font-bold text-lg text-[#1A1A1A]">{regCount}/{event.capacity} registered</p>
                                <p className="text-[#666666] font-medium">{spotsLeft} spots remaining!</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-10">
                          {isRegistered ? (
                            <Button className="h-14 px-8 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xl gap-3 pointer-events-none w-full md:w-auto">
                              <CheckCircle2 className="h-6 w-6" />
                              Registered
                            </Button>
                          ) : (
                            <Link to={`/events/${event.id}`}>
                              <Button className="h-14 px-8 rounded-full bg-gradient-to-r from-[#A855F7] to-[#FACC15] hover:opacity-90 text-white font-bold text-xl gap-3 shadow-lg shadow-purple-200 w-full md:w-auto">
                                <span role="img" aria-label="ticket">🎟️</span> Register Now — ₹{event.price}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Right Side: Visual Progress */}
                      <div className="w-full md:w-[45%] bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#FBBF24] p-12 flex flex-col items-center justify-center text-white text-center">
                        <div className="relative w-48 h-48 mb-8">
                          {/* Circular Progress Bar */}
                          <svg className="w-full h-full -rotate-90 transform">
                            <circle
                              cx="96"
                              cy="96"
                              r="88"
                              stroke="rgba(255,255,255,0.2)"
                              strokeWidth="12"
                              fill="none"
                            />
                            <circle
                              cx="96"
                              cy="96"
                              r="88"
                              stroke="#4ADE80"
                              strokeWidth="12"
                              strokeDasharray={552.92}
                              strokeDashoffset={552.92 * (1 - progress / 100)}
                              strokeLinecap="round"
                              fill="none"
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="w-16 h-16 mb-1">
                               <span role="img" aria-label="fire" className="text-5xl">🔥</span>
                             </div>
                             <p className="text-5xl font-black">{spotsLeft}</p>
                             <p className="text-sm font-bold uppercase tracking-wider opacity-90">spots left</p>
                          </div>
                        </div>

                        <h3 className="text-3xl font-black mb-2 flex items-center gap-2">
                          Filling up fast! <span role="img" aria-label="rocket">🚀</span>
                        </h3>
                        <p className="text-lg font-medium opacity-90">
                          Games randomly assigned based on group size <span role="img" aria-label="dice">🎲</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
