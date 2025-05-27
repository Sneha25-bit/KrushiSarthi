
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  MapPin,
  Leaf,
  LogOut,
  Settings
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">KrushiSarthi</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Dashboard</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Crops</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Market</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Weather</a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">Resources</a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Location */}
            <div className="hidden sm:flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Maharashtra</span>
            </div>

            {user && (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    3
                  </Badge>
                </Button>

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm">
                      <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!user && !loading && (
              <Button 
                onClick={handleSignIn}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <nav className="flex flex-col gap-2">
              <a href="#" className="py-2 text-gray-600 hover:text-green-600 transition-colors">Dashboard</a>
              <a href="#" className="py-2 text-gray-600 hover:text-green-600 transition-colors">Crops</a>
              <a href="#" className="py-2 text-gray-600 hover:text-green-600 transition-colors">Market</a>
              <a href="#" className="py-2 text-gray-600 hover:text-green-600 transition-colors">Weather</a>
              <a href="#" className="py-2 text-gray-600 hover:text-green-600 transition-colors">Resources</a>
              {!user && !loading && (
                <Button 
                  onClick={handleSignIn}
                  variant="outline"
                  className="mt-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
