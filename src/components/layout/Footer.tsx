import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-primary/20 bg-secondary/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-hero">
                <span className="text-2xl">🎲</span>
              </div>
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary via-pink-500 to-warning bg-clip-text text-transparent">
                Boardy
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-lg">
              Making hostel life more fun, one board game at a time! 🎯 Rent games, join epic Saturday nights, and make lifelong friends. 
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <span>🔗</span> Quick Links
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/games" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>🎲</span> Browse Games
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>🌙</span> Saturday Nights
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>📖</span> How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <span>💬</span> Support
            </h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/rules" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>📋</span> Rental Rules
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>❓</span> FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span>👋</span> Contact Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-primary/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
          <p className="flex items-center gap-2">
            <span className="text-xl">🏠</span> © 2025 Boardy. Made for hostel homies!
          </p>
          <p className="flex items-center gap-2 text-lg">
            Built with <Heart className="h-5 w-5 text-pink-500 fill-pink-500 animate-pulse" /> for board game lovers
            <span className="text-xl">🎲</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
