import { useEffect, useState } from "react";
import { Activity, ArrowRight, CheckCircle2, Clock3, FileText, Loader2, Package, ShieldCheck, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { watchMyEventDevXRequests, type EventDevXRequest } from "@/lib/requestService";

const Requests = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [requests, setRequests] = useState<EventDevXRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) { setLoading(false); setRequests([]); return; }
    const unsubscribe = watchMyEventDevXRequests((items) => { setRequests(items); setLoading(false); }, (e) => { setError(e.message); setLoading(false); });
    return unsubscribe;
  }, [user]);

  const statusIcon = (status: string) => status === "approved" ? <CheckCircle2 className="h-4 w-4" /> : status === "rejected" ? <XCircle className="h-4 w-4" /> : status === "completed" ? <ShieldCheck className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />;
  const statusClass = (status: string) => status === "approved" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : status === "rejected" ? "border-rose-200 bg-rose-50 text-rose-700" : status === "completed" ? "border-violet-200 bg-violet-50 text-violet-700" : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <div className="w-full space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div><div className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600">EventDevX</div><h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">My Requests</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Track infrastructure, partnership and other requests submitted from your account.</p></div>
          <div className="flex flex-wrap gap-2"><button type="button" onClick={() => navigate("/infrastructure")} className="inline-flex items-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-xs font-black text-orange-700 hover:bg-orange-100"><Package className="h-4 w-4" /> Request Kit</button><button type="button" onClick={() => navigate("/dashboard")} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-700 hover:bg-slate-50">Dashboard<ArrowRight className="h-4 w-4" /></button></div>
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><Activity className="h-5 w-5" /></div><div><h2 className="text-lg font-black text-slate-950">Request History</h2><p className="mt-1 text-xs text-slate-500">Status changes appear automatically.</p></div></div>{loading && <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />}</div>
        {error && <div className="m-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-700">{error}</div>}
        {!loading && !error && requests.length === 0 && <div className="flex min-h-[280px] flex-col items-center justify-center p-6 text-center"><FileText className="h-8 w-8 text-slate-300" /><h3 className="mt-4 text-lg font-black text-slate-900">No requests yet</h3><p className="mt-2 max-w-md text-sm leading-6 text-slate-500">When you request a kit or service, it will appear here.</p></div>}
        {!loading && !error && requests.map((request) => <div key={request.id} className="border-b border-slate-100 p-5 last:border-b-0 sm:p-7"><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2"><span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.1em] text-slate-600">{request.type}</span><span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.1em] ${statusClass(request.status)}`}>{statusIcon(request.status)} {request.status}</span></div><h3 className="mt-3 text-lg font-black text-slate-950">{request.title}</h3><p className="mt-1 text-sm font-bold text-indigo-600">{request.item || request.eventName || request.projectName || "General request"}</p><div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><div><div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Request ID</div><div className="mt-1 break-all font-mono text-xs font-bold text-slate-600">{request.id}</div></div><div><div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Event</div><div className="mt-1 text-xs font-bold text-slate-700">{request.eventName || "—"}</div></div><div><div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Quantity</div><div className="mt-1 text-xs font-bold text-slate-700">{request.quantity || 1}</div></div><div><div className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">Required</div><div className="mt-1 text-xs font-bold text-slate-700">{request.preferredDate || "—"}</div></div></div>{request.note && <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600"><b>Note:</b> {request.note}</div>}</div></div></div>)}
      </section>
    </div>
  );
};

export default Requests;
