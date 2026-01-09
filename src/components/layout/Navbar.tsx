import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, LogIn, LogOut, User, Settings, Package, Bell, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Notification } from "@shared/schema";

const navLinks = [
  { href: "/games", label: "Games" },
  { href: "/events", label: "Saturday Nights" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { toast } = useToast();

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
    enabled: !!user,
    refetchInterval: 30000,
  });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const markReadMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("POST", `/api/notifications/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    },
  });

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      toast({ title: "Logged out", description: "See you soon!" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3 group" data-testid="link-home">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-hero shadow-soft group-hover:scale-110 transition-transform">
            <span className="text-2xl">🎲</span>
          </div>
          <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
            Boardy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} data-testid={`nav-link-${link.href.slice(1)}`}>
              <Button
                variant={isActive(link.href) ? "secondary" : "ghost"}
                className="gap-2 text-base"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/5">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 border-2 border-background text-[10px] font-bold">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-bold">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {!notifications || notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground italic">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${!notif.read ? "bg-primary/5" : ""}`}
                        onClick={() => !notif.read && markReadMutation.mutate(notif.id)}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`text-sm font-bold ${!notif.read ? "text-primary" : ""}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {format(new Date(notif.createdAt), "MMM d")}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notif.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2" data-testid="button-user-menu">
                  <User className="h-4 w-4" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")} data-testid="menu-profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-rentals")} data-testid="menu-my-rentals">
                  <Package className="h-4 w-4 mr-2" />
                  My Rentals
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/admin")} data-testid="menu-admin">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" data-testid="link-login">
                <Button variant="ghost" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" data-testid="link-signup">
                <Button className="gap-2">
                  Create Account
                </Button>
              </Link>
            </>
          )}
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-hero">
                <span className="text-2xl">🎲</span>
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
                Boardy
              </span>
            </div>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(link.href) ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 h-14 text-lg"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t-2 border-dashed border-primary/20 my-4" />
              {user ? (
                <>
                  <Link to="/my-rentals" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-14 gap-2 text-lg">
                      <Package className="h-5 w-5" />
                      My Rentals
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full h-14 gap-2 text-lg">
                        <Settings className="h-5 w-5" />
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" className="w-full h-14 gap-2 text-lg" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full h-14 gap-2 text-lg">
                      <LogIn className="h-5 w-5" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-14 text-lg">
                      Create Account
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
