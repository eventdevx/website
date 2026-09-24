import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock3, Loader2, Package, Search, ShieldCheck, XCircle } from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "@/lib/firebase";
import { updateEventDevXRequestStatus, type EventDevXRequest, type RequestStatus } from "@/lib/requestService";

const AdminPage = () => {
  const [requests, setRequests] = useState<EventDevXRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const [updating, setUpdating] = useState("");

  useEffect(() => {
    if (!firebaseAuth.currentUser) { setLoading(false); setError("Please sign in as an admin."); return; }
    const q = query(collection(firebaseDb, "requests"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => { setRequests(snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as EventDevXRequest)); setLoading(false); setError(""); }, () => { setLoading(false); setError("Requests could not be loaded. Check Firestore rules and the admin record."); });
  }, []);

  const filtered = useMemo(() => requests.filter((r) => { const q = search.trim().toLowerCase(); return (filter === "all" || r.status === filter) && (!q || `${r.title} ${r.userName} ${r.userEmail} ${r.item || ""} ${r.eventName || ""}`.toLowerCase().includes(q)); }), [filter, requests, search]);
  const setStatus = async (id: string, status: RequestStatus) => { setUpdating(id); try { await updateEventDevXRequestStatus(id, status); } catch (e) { window.alert(e instanceof Error ? e.message : "Could not update request."); } finally { setUpdating(""); } };

  return (
    <div className="w-full space-y-6">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8"><div className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">Admin Only</div><h1 className="mt-2 text-3xl font-black">EventDevX Admin</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Review requests submitted by EventDevX members and update their status.</p></section>
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search requests..." className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-indigo-400" /></div><select value={filter} onChange={(e) => setFilter(e.target.value as "all" | RequestStatus)} className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-bold"><option value="all">All</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="completed">Completed</option></select></div></section>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><Package className="h-5 w-5" /></div><div><h2 className="text-lg font-black text-slate-950">Incoming Requests</h2><p className="mt-1 text-xs text-slate-500">New requests appear in real time.</p></div></div>{loading && <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />}</div>
        {error && <div className="m-5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-700">{error}</div>}
        {!loading && !error && filtered.length === 0 && <div className="p-10 text-center text-sm font-semibold text-slate-500">No requests found.</div>}
        {!loading && !error && filtered.map((r) => <div key={r.id} className="border-b border-slate-100 p-5 last:border-b-0 sm:p-7"><div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2"><span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[8px] font-black uppercase text-slate-600">{r.type}</span><span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[8px] font-black uppercase text-amber-700">{r.status}</span></div><h3 className="mt-3 text-lg font-black text-slate-950">{r.title}</h3><p className="mt-1 text-sm font-bold text-indigo-600">{r.item || r.eventName || r.projectName || "General request"}</p><p className="mt-2 text-xs font-semibold text-slate-500">{r.userName} · {r.userEmail}</p>{r.note && <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">{r.note}</p>}</div><div className="grid gap-2 sm:grid-cols-3 xl:w-72 xl:grid-cols-1"><button type="button" disabled={updating === r.id} onClick={() => void setStatus(r.id, "approved")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-black text-white hover:bg-emerald-500 disabled:opacity-50"><CheckCircle2 className="h-4 w-4" />Approve</button><button type="button" disabled={updating === r.id} onClick={() => void setStatus(r.id, "rejected")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-black text-rose-700 hover:bg-rose-100 disabled:opacity-50"><XCircle className="h-4 w-4" />Reject</button><button type="button" disabled={updating === r.id} onClick={() => void setStatus(r.id, "completed")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-xs font-black text-violet-700 hover:bg-violet-100 disabled:opacity-50"><ShieldCheck className="h-4 w-4" />Complete</button><button type="button" disabled={updating === r.id} onClick={() => void setStatus(r.id, "pending")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700 hover:bg-slate-50 disabled:opacity-50"><Clock3 className="h-4 w-4" />Re-open</button></div></div></div>)}
      </section>
    </div>
  );
};

export default AdminPage;
