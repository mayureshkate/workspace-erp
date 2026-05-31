import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function CRMPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Mock data representing Gmail threads and clients
  const recentEmails = [
    { id: 1, sender: "Alice Smith", subject: "Invoice #1024 Approved", time: "10:30 AM", status: "Read" },
    { id: 2, sender: "Bob Jones", subject: "Proposal Feedback Needed", time: "Yesterday", status: "Unread" },
    { id: 3, sender: "Charlie Davis", subject: "Contract Renewal", time: "May 29", status: "Read" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500">
            Customer Relationship Management
          </h1>
          <p className="mt-2 text-slate-400">
            Integrated with Gmail API to track client communications natively.
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-blue-200 transition-colors">
          Compose Email
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clients List */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-white/5 border border-glass-border backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-slate-200">Active Clients</h3>
          <div className="space-y-3">
            {["Acme Corp", "Globex Inc", "Initech"].map((client, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-between">
                <span className="text-slate-300">{client}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            ))}
          </div>
        </div>

        {/* Gmail Integration Feed */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-glass-border backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-200">Recent Communications (Gmail)</h3>
            <span className="text-sm text-slate-400">Synced just now</span>
          </div>
          
          <div className="space-y-4">
            {recentEmails.map((email) => (
              <div key={email.id} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold shrink-0">
                    {email.sender.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`font-medium ${email.status === 'Unread' ? 'text-white' : 'text-slate-300'}`}>
                      {email.sender}
                    </h4>
                    <p className="text-slate-400 text-sm">{email.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-500">{email.time}</span>
                  {email.status === 'Unread' && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">New</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
