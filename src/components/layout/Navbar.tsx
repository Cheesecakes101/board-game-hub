import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles, Calendar, User, LogIn } from "lucide-react";

const navLinks = [
  { href: "/games", label: "Games", icon: Sparkles, emoji: "🎲" },
  { href: "/events", label: "Saturday Nights", icon: Calendar, emoji: "🌙" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-18 items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-hero shadow-soft group-hover:scale-110 transition-transform">
            <span className="text-2xl">🎲</span>
          </div>
          <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
            Boardy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href}>
              <Button
                variant={isActive(link.href) ? "secondary" : "ghost"}
                className="gap-2 text-base"
              >
                <span className="text-lg">{link.emoji}</span>
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="fun" className="gap-2">
              <span>✨</span>
              Join the Fun!
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
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
                    <span className="text-xl">{link.emoji}</span>
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t-2 border-dashed border-primary/20 my-4" />
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full h-14 gap-2 text-lg">
                  <LogIn className="h-5 w-5" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="fun" className="w-full h-14 text-lg">
                  ✨ Join the Fun!
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
