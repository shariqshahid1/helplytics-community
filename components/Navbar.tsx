"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  MessageSquare, 
  LayoutDashboard, 
  Globe, 
  Trophy, 
  Bell, 
  BarChart3, 
  Menu, 
  X,
  Settings
} from "lucide-react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/explore", label: "Explore", icon: Globe },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/ai-center", label: "AI Center", icon: Sparkles, color: "text-indigo-500" },
    { href: "/reports", label: "Reports", icon: BarChart3 },
  ];

  const authLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105 shrink-0">
              <div className="bg-zinc-900 p-2 rounded-xl shadow-lg shadow-zinc-200">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-zinc-900">
                Helplytics<span className="text-indigo-600">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`text-sm font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    isActive 
                    ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100" 
                    : "text-zinc-500 hover:text-indigo-600 hover:bg-zinc-50"
                  }`}
                >
                  <link.icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : (link.color || "text-zinc-400")}`} />
                  {link.label}
                </Link>
              );
            })}
            
            {isSignedIn && (
              <>
                <div className="w-px h-6 bg-zinc-200 mx-2" />
                {authLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className={`text-sm font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                        isActive 
                        ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100" 
                        : "text-zinc-500 hover:text-indigo-600 hover:bg-zinc-50"
                      }`}
                    >
                      <link.icon className={`h-4 w-4 ${isActive ? "text-indigo-600" : "text-zinc-400"}`} />
                      {link.label}
                    </Link>
                  );
                })}
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link href="/request/create">
                  <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl font-bold px-6 shadow-lg shadow-zinc-200 transition-all hover:-translate-y-0.5 active:scale-95">
                    Ask for Help
                  </Button>
                </Link>
                <div className="p-0.5 rounded-full border-2 border-indigo-50">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-9 w-9"
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="font-bold text-zinc-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl px-6">
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl font-bold px-6 shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 active:scale-95">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            {isSignedIn && (
              <div className="p-0.5 rounded-full border-2 border-indigo-50">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8"
                    }
                  }}
                />
              </div>
            )}
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl animate-in slide-in-from-top duration-300">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                    isActive 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <link.icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : (link.color || "text-zinc-400")}`} />
                  {link.label}
                </Link>
              );
            })}

            {isSignedIn && (
              <>
                <div className="h-px bg-zinc-100 my-2" />
                {authLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link 
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
                        isActive 
                        ? "bg-indigo-50 text-indigo-700" 
                        : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      <link.icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : "text-zinc-400"}`} />
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-4">
                  <Link href="/request/create" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl h-14 font-bold shadow-lg shadow-zinc-200">
                      Ask for Help
                    </Button>
                  </Link>
                </div>
              </>
            )}

            {!isSignedIn && (
              <div className="flex flex-col gap-2 pt-4 border-t border-zinc-100">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="w-full h-14 rounded-2xl font-bold text-zinc-600">
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full h-14 bg-indigo-600 text-white hover:bg-indigo-700 rounded-2xl font-bold shadow-lg shadow-indigo-100">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
