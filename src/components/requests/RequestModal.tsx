import { useEffect, useState } from "react";
import { Loader2, Send, X } from "lucide-react";
import { createEventDevXRequest, type RequestType } from "@/lib/requestService";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  requestType: RequestType;
  title: string;
  item?: string;
  eventName?: string;
  defaultEventName?: string;
  projectName?: string;
  defaultTeamName?: string;
  onSubmitted?: (requestId: string) => void;
}

const RequestModal = ({ open, onClose, requestType, title, item = "", eventName = "", projectName = "", defaultTeamName = "", onSubmitted }: RequestModalProps) => {
  const [quantity, setQuantity] = useState("1");
  const [requestEventName, setRequestEventName] = useState(eventName || defaultEventName);
  const [preferredDate, setPreferredDate] = useState("");
  const [phone, setPhone] = useState("");
  const [teamName, setTeamName] = useState(defaultTeamName);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setError(""); setQuantity("1"); setRequestEventName(eventName || defaultEventName); setPreferredDate(""); setPhone(""); setTeamName(defaultTeamName); setNote("");
  }, [open, defaultTeamName, defaultEventName, eventName]);

  if (!open) return null;

  const submit = async () => {
    setError("");
    if (!preferredDate) return setError("Please select the required date.");
    if (!phone.trim()) return setError("Please enter your phone number.");
    setSubmitting(true);
    try {
      const request = await createEventDevXRequest({
        type: requestType,
        title,
        item,
        eventName: requestEventName,
        projectName,
        teamName,
        phone,
        preferredDate,
        quantity: Math.max(1, Number(quantity) || 1),
        note,
      });
      onSubmitted?.(request.id);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50 px-5 py-5 sm:px-6">
          <div>
            <div className="text-[9px] font-black uppercase tracking-[0.16em] text-indigo-600">EventDevX Request</div>
            <h2 className="mt-1 text-xl font-black text-slate-950">{title}</h2>
            {item && <p className="mt-1 text-sm font-semibold text-slate-500">{item}</p>}
          </div>
          <button type="button" onClick={onClose} disabled={submitting} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {(eventName || projectName) && (
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm font-bold text-indigo-900">
              {eventName && <>Event: {eventName}</>}
              {eventName && projectName && " · "}
              {projectName && <>Project: {projectName}</>}
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-black text-slate-700">Event Name</label>
            <input
              type="text"
              value={requestEventName}
              onChange={(e) => setRequestEventName(e.target.value)}
              placeholder="e.g. Indo-Hack 2026"
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black text-slate-700">Quantity</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-black text-slate-700">Required Date</label>
              <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-indigo-400" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black text-slate-700">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-black text-slate-700">Team Name</label>
              <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. Team Orion" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-semibold outline-none focus:border-indigo-400" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-black text-slate-700">Note</label>
            <textarea rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tell us anything important about this request." className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium outline-none focus:border-indigo-400" />
          </div>

          {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-bold text-rose-700">{error}</div>}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} disabled={submitting} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="button" onClick={() => void submit()} disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-black text-white hover:bg-indigo-500 disabled:opacity-70">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="h-4 w-4" /> Submit Request</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;