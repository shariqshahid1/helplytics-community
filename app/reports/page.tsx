import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PieChart, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  const reports = [
    { title: "Monthly Resolution Rate", date: "April 2026", status: "Ready" },
    { title: "Trust Score Analysis", date: "April 2026", status: "Processing" },
    { title: "Community Impact Report", date: "Q1 2026", status: "Ready" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-4">Reports</h1>
            <p className="text-zinc-500 text-base md:text-lg font-medium">Deep dive into your platform activity and performance metrics.</p>
          </div>
          <Button className="w-full md:w-auto bg-zinc-900 text-white hover:bg-zinc-800 rounded-2xl h-12 px-6 font-bold shadow-lg shadow-zinc-200">
            <Download className="mr-2 h-4 w-4" /> Export All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border-none shadow-sm bg-white rounded-[32px] p-8">
            <div className="p-3 bg-indigo-50 rounded-2xl w-fit mb-6">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Activity Overview</h3>
            <p className="text-zinc-500 mb-6">Visualize your help requests and contributions over time.</p>
            <div className="h-32 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Chart Placeholder</span>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-white rounded-[32px] p-8">
            <div className="p-3 bg-violet-50 rounded-2xl w-fit mb-6">
              <PieChart className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Category Distribution</h3>
            <p className="text-zinc-500 mb-6">See which areas you contribute to the most.</p>
            <div className="h-32 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Chart Placeholder</span>
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-white rounded-[32px] p-8">
            <div className="p-3 bg-amber-50 rounded-2xl w-fit mb-6">
              <TrendingUp className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Growth Metrics</h3>
            <p className="text-zinc-500 mb-6">Track your trust score growth and network expansion.</p>
            <div className="h-32 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center">
              <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs">Chart Placeholder</span>
            </div>
          </Card>
        </div>

        <div className="bg-white rounded-[32px] md:rounded-[40px] shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-zinc-100">
            <h2 className="text-xl md:text-2xl font-black text-zinc-900">Recent Reports</h2>
          </div>
          <div className="divide-y divide-zinc-100">
            {reports.map((report, i) => (
              <div key={i} className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-zinc-50 transition-colors gap-4">
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 mb-1">{report.title}</h4>
                  <p className="text-sm text-zinc-400 font-medium">{report.date}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                    report.status === 'Ready' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {report.status}
                  </span>
                  <Button variant="ghost" className="rounded-xl font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
