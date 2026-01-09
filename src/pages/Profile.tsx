import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Home, Edit, Package, Calendar, History, PlayCircle, Users } from "lucide-react";
import type { Rental, EventRegistration, Event } from "@shared/schema";

type RentalWithGame = Rental & { game?: any };
type RegistrationWithEvent = EventRegistration & { event?: Event };
type PersonPlayedWith = { id: number; name: string; email: string; eventsCount: number };

export default function Profile() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"rentals" | "events" | "people">("rentals");

  const { data: rentals, isLoading: rentalsLoading } = useQuery<RentalWithGame[]>({
    queryKey: ["/api/rentals/my"],
    enabled: !!user,
  });

  const { data: registrations, isLoading: regsLoading } = useQuery<RegistrationWithEvent[]>({
    queryKey: ["/api/registrations/my"],
    enabled: !!user,
  });

  const { data: peoplePlayedWith } = useQuery<PersonPlayedWith[]>({
    queryKey: ["/api/people-played-with"],
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <Skeleton className="h-64 w-full rounded-xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const activeRentals = rentals?.filter(r => r.status === "active") || [];
  const attendedEvents = registrations?.filter(r => r.attended) || [];
  const stats = [
    { label: "Games Rented", value: rentals?.length || 0, icon: Package },
    { label: "Events Attended", value: attendedEvents.length, icon: Calendar },
    { label: "People Played With", value: peoplePlayedWith?.length || 0, icon: Users },
    { label: "Active Rentals", value: activeRentals.length, icon: PlayCircle },
  ];

  // Auto-funky profile photo using dicebear avatars
  const avatarUrl = `https://api.dicebear.com/7.x/funmoji/svg?seed=${user.email}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfcf8]">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Info & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-sm overflow-visible">
              <CardContent className="pt-8 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg mx-auto">
                    <AvatarImage src={avatarUrl} alt={user.name} />
                    <AvatarFallback className="text-4xl bg-muted">{user.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <h1 className="text-2xl font-black mb-6">{user.name.toLowerCase()}</h1>
                
                <div className="space-y-3 text-left max-w-[240px] mx-auto text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Home className="w-4 h-4" />
                    <span className="text-sm">Room {user.roomNo}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-8 bg-[#2dd4bf] hover:bg-[#26bba8] text-white rounded-xl py-6" 
                  data-testid="button-edit-profile"
                  onClick={() => toast({ title: "Coming Soon", description: "Profile editing will be available in the next update!" })}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="font-bold text-lg px-2">Your Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <Card key={i} className="border-none shadow-sm bg-[#faf9f6]">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <stat.icon className="w-5 h-5 mb-2 text-primary" />
                      <div className="text-2xl font-black">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tabs/History */}
          <div className="lg:col-span-2">
            <div className="bg-[#f0ece4] p-1 rounded-xl flex gap-1 mb-6">
              <Button 
                variant="ghost" 
                className={`flex-1 ${activeTab === "rentals" ? "bg-white shadow-sm hover:bg-white" : "hover:bg-[#e5e1d9] text-muted-foreground"} rounded-lg py-2 h-auto text-sm`}
                onClick={() => setActiveTab("rentals")}
                data-testid="tab-rental-history"
              >
                Rentals
              </Button>
              <Button 
                variant="ghost" 
                className={`flex-1 ${activeTab === "events" ? "bg-white shadow-sm hover:bg-white" : "hover:bg-[#e5e1d9] text-muted-foreground"} rounded-lg py-2 h-auto text-sm`}
                onClick={() => setActiveTab("events")}
                data-testid="tab-events"
              >
                Events
              </Button>
              <Button 
                variant="ghost" 
                className={`flex-1 ${activeTab === "people" ? "bg-white shadow-sm hover:bg-white" : "hover:bg-[#e5e1d9] text-muted-foreground"} rounded-lg py-2 h-auto text-sm`}
                onClick={() => setActiveTab("people")}
                data-testid="tab-people"
              >
                Played With
              </Button>
            </div>

            <Card className="border-none shadow-sm min-h-[400px]">
              <CardContent className="flex flex-col items-center justify-center py-20">
                {activeTab === "rentals" ? (
                  !rentals || rentals.length === 0 ? (
                    <>
                      <div className="bg-[#faf9f6] p-4 rounded-2xl mb-4">
                        <Package className="w-12 h-12 text-muted-foreground/40" />
                      </div>
                      <p className="text-muted-foreground font-medium mb-6">No rentals yet</p>
                      <Button 
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 rounded-xl py-6 h-auto"
                        onClick={() => navigate("/games")}
                        data-testid="button-browse-games"
                      >
                        Browse Games
                      </Button>
                    </>
                  ) : (
                    <div className="w-full space-y-4">
                      {rentals.map((rental) => (
                        <div key={rental.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#faf9f6]">
                           <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                             <Package className="w-6 h-6 text-primary" />
                           </div>
                           <div className="flex-1">
                             <h4 className="font-bold">{rental.game?.name}</h4>
                             <p className="text-xs text-muted-foreground">Status: {rental.status}</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  !registrations || registrations.length === 0 ? (
                    <>
                      <div className="bg-[#faf9f6] p-4 rounded-2xl mb-4">
                        <Calendar className="w-12 h-12 text-muted-foreground/40" />
                      </div>
                      <p className="text-muted-foreground font-medium mb-6">No events joined yet</p>
                      <Button 
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 rounded-xl py-6 h-auto"
                        onClick={() => navigate("/events")}
                        data-testid="button-browse-events"
                      >
                        Browse Events
                      </Button>
                    </>
                  ) : (
                    <div className="w-full space-y-4">
                      {registrations.map((reg) => (
                        <div key={reg.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#faf9f6]">
                           <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border">
                             <Calendar className="w-6 h-6 text-primary" />
                           </div>
                           <div className="flex-1">
                             <h4 className="font-bold">{reg.event?.name}</h4>
                             <p className="text-xs text-muted-foreground">
                               Status: {reg.status} {reg.attended && " - Attended"}
                             </p>
                           </div>
                        </div>
                      ))}
                    </div>
                  )
                )}

                {activeTab === "people" && (
                  !peoplePlayedWith || peoplePlayedWith.length === 0 ? (
                    <>
                      <div className="bg-[#faf9f6] p-4 rounded-2xl mb-4">
                        <Users className="w-12 h-12 text-muted-foreground/40" />
                      </div>
                      <p className="text-muted-foreground font-medium mb-2">No gaming buddies yet</p>
                      <p className="text-sm text-muted-foreground mb-6">Attend Saturday events to meet fellow gamers!</p>
                      <Button 
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 rounded-xl py-6 h-auto"
                        onClick={() => navigate("/events")}
                        data-testid="button-find-events"
                      >
                        Find Events
                      </Button>
                    </>
                  ) : (
                    <div className="w-full space-y-4">
                      {peoplePlayedWith.map((person) => {
                        const avatarUrl = `https://api.dicebear.com/7.x/funmoji/svg?seed=${person.email}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
                        return (
                          <div key={person.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#faf9f6]">
                            <Avatar className="w-12 h-12 border-2 border-white shadow">
                              <AvatarImage src={avatarUrl} alt={person.name} />
                              <AvatarFallback>{person.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-bold">{person.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                Played together at {person.eventsCount} event{person.eventsCount > 1 ? 's' : ''}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
