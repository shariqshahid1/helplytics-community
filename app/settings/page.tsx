import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Bell, Shield, Wallet, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const sections = [
    { id: 'profile', label: 'Profile', icon: User, color: 'text-indigo-600' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-violet-600' },
    { id: 'security', label: 'Security', icon: Shield, color: 'text-zinc-900' },
    { id: 'billing', label: 'Billing', icon: Wallet, color: 'text-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-8 md:mb-12">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          <aside className="lg:col-span-1 flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 md:gap-4 pb-4 lg:pb-0">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`flex-1 lg:flex-none flex items-center justify-between p-4 rounded-2xl transition-all whitespace-nowrap lg:whitespace-normal min-w-[160px] lg:min-w-0 ${
                  section.id === 'profile' 
                  ? 'bg-white shadow-sm shadow-indigo-100 ring-2 ring-indigo-500/10' 
                  : 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-4">
                  <section.icon className={`h-5 w-5 ${section.id === 'profile' ? section.color : ''}`} />
                  <span className="font-bold">{section.label}</span>
                </div>
                {section.id === 'profile' && <ChevronRight className="hidden lg:block h-4 w-4 text-indigo-500" />}
              </button>
            ))}
          </aside>

          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <Card className="border-none shadow-sm bg-white rounded-[28px] md:rounded-[32px] overflow-hidden">
              <div className="p-6 md:p-10">
                <h3 className="text-xl md:text-2xl font-black text-zinc-900 mb-6 md:mb-8">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Full Name</Label>
                    <Input className="h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:ring-indigo-500 font-medium" defaultValue="Mock User" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Email Address</Label>
                    <Input className="h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:ring-indigo-500 font-medium" defaultValue="mock@example.com" disabled />
                  </div>
                  <div className="space-y-3 md:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-zinc-400">Bio</Label>
                    <Input className="h-12 rounded-xl bg-zinc-50 border-zinc-200 focus:ring-indigo-500 font-medium" defaultValue="Expert in full-stack development and community building." />
                  </div>
                </div>
                <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-end gap-4">
                  <Button variant="outline" className="w-full sm:w-auto rounded-xl h-12 px-8 font-bold border-2 order-2 sm:order-1">Discard</Button>
                  <Button className="w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl h-12 px-8 font-bold shadow-lg shadow-indigo-100 order-1 sm:order-2">Save Changes</Button>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm bg-zinc-900 text-white rounded-[28px] md:rounded-[32px] overflow-hidden">
              <div className="p-6 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-black mb-2">Public Profile</h3>
                  <p className="text-zinc-400 font-medium">Your profile is currently visible to everyone.</p>
                </div>
                <div className="h-8 w-14 bg-indigo-500 rounded-full relative cursor-pointer shrink-0">
                  <div className="absolute right-1 top-1 h-6 w-6 bg-white rounded-full shadow-lg" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
