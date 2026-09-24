import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  where,
  query,
  type Unsubscribe,
} from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "@/lib/firebase";

export type RequestType =
  | "infrastructure"
  | "partnership"
  | "event"
  | "project"
  | "community"
  | "certificate"
  | "other";

export type RequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "cancelled";

export interface EventDevXRequestInput {
  type: RequestType;
  title: string;
  item?: string;
  description?: string;
  quantity?: number;
  eventId?: string;
  eventName?: string;
  projectId?: string;
  projectName?: string;
  teamName?: string;
  phone?: string;
  preferredDate?: string;
  note?: string;
}

export interface EventDevXRequest extends EventDevXRequestInput {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  status: RequestStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

function requireUser() {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("Please sign in before submitting a request.");
  return user;
}

export async function createEventDevXRequest(input: EventDevXRequestInput) {
  const user = requireUser();

  const data = {
    ...input,
    title: input.title.trim(),
    userId: user.uid,
    userEmail: user.email || "",
    userName: user.displayName || user.email || "EventDevX User",
    status: "pending" as RequestStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(firebaseDb, "requests"), data);

  return { id: ref.id, ...data };
}

export async function getMyEventDevXRequests() {
  const user = requireUser();
  const q = query(collection(firebaseDb, "requests"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() }) as EventDevXRequest)
    .sort((a, b) => getSeconds(b.createdAt) - getSeconds(a.createdAt));
}

export function watchMyEventDevXRequests(
  onChange: (requests: EventDevXRequest[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const user = firebaseAuth.currentUser;

  if (!user) {
    onChange([]);
    onError?.(new Error("Please sign in before reading requests."));
    return () => undefined;
  }

  const q = query(collection(firebaseDb, "requests"), where("userId", "==", user.uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }) as EventDevXRequest)
        .sort((a, b) => getSeconds(b.createdAt) - getSeconds(a.createdAt));
      onChange(items);
    },
    (error) => onError?.(error)
  );
}

export async function getEventDevXRequest(requestId: string) {
  const user = requireUser();
  const snapshot = await getDoc(doc(firebaseDb, "requests", requestId));

  if (!snapshot.exists()) return null;

  const data = snapshot.data() as Omit<EventDevXRequest, "id">;

  if (data.userId !== user.uid) {
    throw new Error("You are not allowed to read this request.");
  }

  return { id: snapshot.id, ...data } as EventDevXRequest;
}

export async function updateEventDevXRequestStatus(
  requestId: string,
  status: RequestStatus
) {
  requireUser();
  await updateDoc(doc(firebaseDb, "requests", requestId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

function getSeconds(value: unknown) {
  if (value && typeof value === "object" && "seconds" in value) {
    return Number((value as { seconds: number }).seconds) || 0;
  }
  return 0;
}
