import {
  useEffect,
  useState,
} from "react";

import {
  Loader2,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  firebaseAuth,
  firebaseDb,
} from "@/lib/firebase";

interface MessageRecipient {
  id?: number | string;
  name: string;
  role?: string;
  email?: string;
  avatar?: string;
}

interface MessageModalProps {
  open: boolean;
  recipient: MessageRecipient | null;
  onClose: () => void;
  onSent?: (messageId: string) => void;
}

const MessageModal = ({
  open,
  recipient,
  onClose,
  onSent,
}: MessageModalProps) => {
  const [
    subject,
    setSubject,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    sending,
    setSending,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    setSubject("");

    setMessage("");

    setError("");
  }, [
    open,
    recipient?.name,
  ]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        !sending
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      onKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [
    open,
    onClose,
    sending,
  ]);

  if (
    !open ||
    !recipient
  ) {
    return null;
  }

  const handleSend = async () => {
    const user =
      firebaseAuth.currentUser;

    setError("");

    if (!user) {
      setError(
        "Please sign in before sending a message."
      );

      return;
    }

    if (!message.trim()) {
      setError(
        "Please write a message."
      );

      return;
    }

    setSending(true);

    try {
      const messageRef =
        await addDoc(
          collection(
            firebaseDb,
            "messages"
          ),
          {
            senderId:
              user.uid,

            senderName:
              user.displayName ||
              user.email ||
              "EventDevX User",

            senderEmail:
              user.email || "",

            recipientId:
              recipient.id ||
              "",

            recipientName:
              recipient.name,

            recipientEmail:
              recipient.email ||
              "",

            subject:
              subject.trim() ||
              "EventDevX Message",

            message:
              message.trim(),

            status:
              "sent",

            createdAt:
              serverTimestamp(),
          }
        );

      setSending(false);

      onSent?.(
        messageRef.id
      );

      onClose();
    } catch (
      sendError
    ) {
      console.error(
        "EventDevX message send failed:",
        sendError
      );

      setSending(false);

      setError(
        sendError instanceof
          Error
          ? sendError.message
          : "Message could not be sent."
      );
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        flex
        items-end
        justify-center
        bg-slate-950/45
        p-0
        backdrop-blur-sm
        sm:items-center
        sm:p-4
      "
      onMouseDown={(event) => {
        if (
          event.target ===
            event.currentTarget &&
          !sending
        ) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-xl
          overflow-hidden
          rounded-t-[2rem]
          border
          border-slate-200
          bg-white
          shadow-[0_30px_100px_rgba(15,23,42,0.25)]
          sm:rounded-[2rem]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-slate-100
            px-5
            py-5
            sm:px-6
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600
              "
            >
              <MessageSquare className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-indigo-600
                "
              >
                New Message
              </div>

              <h2
                className="
                  mt-1
                  truncate
                  text-lg
                  font-black
                  text-slate-950
                "
              >
                Message {recipient.name}
              </h2>

              {recipient.role && (
                <p
                  className="
                    mt-1
                    truncate
                    text-xs
                    font-semibold
                    text-slate-500
                  "
                >
                  {recipient.role}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              disabled:opacity-50
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          className="
            space-y-5
            p-5
            sm:p-6
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-indigo-100
              bg-indigo-50
              p-4
            "
          >
            <p
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.12em]
                text-indigo-500
              "
            >
              Recipient
            </p>

            <p
              className="
                mt-1
                text-sm
                font-black
                text-indigo-950
              "
            >
              {recipient.name}
            </p>

            {recipient.email && (
              <p
                className="
                  mt-1
                  text-xs
                  font-semibold
                  text-indigo-700
                "
              >
                {recipient.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="eventdevx-message-subject"
              className="
                mb-2
                block
                text-xs
                font-black
                text-slate-700
              "
            >
              Subject
            </label>

            <input
              id="eventdevx-message-subject"
              type="text"
              value={subject}
              onChange={(event) =>
                setSubject(
                  event.target.value
                )
              }
              placeholder="e.g. Partnership discussion"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                px-3
                text-sm
                font-semibold
                text-slate-900
                outline-none
                transition
                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          <div>
            <label
              htmlFor="eventdevx-message-body"
              className="
                mb-2
                block
                text-xs
                font-black
                text-slate-700
              "
            >
              Message
            </label>

            <textarea
              id="eventdevx-message-body"
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              placeholder="Write your message..."
              rows={7}
              className="
                w-full
                resize-y
                rounded-xl
                border
                border-slate-200
                px-3
                py-3
                text-sm
                font-medium
                leading-6
                text-slate-900
                outline-none
                transition
                focus:border-indigo-400
                focus:ring-2
                focus:ring-indigo-100
              "
            />
          </div>

          {error && (
            <div
              className="
                rounded-xl
                border
                border-rose-200
                bg-rose-50
                px-4
                py-3
                text-xs
                font-bold
                leading-5
                text-rose-700
              "
            >
              {error}
            </div>
          )}

          <div
            className="
              flex
              flex-col-reverse
              gap-2
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                py-3
                text-sm
                font-black
                text-slate-600
                transition
                hover:bg-slate-50
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() =>
                void handleSend()
              }
              disabled={
                sending
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-5
                py-3
                text-sm
                font-black
                text-white
                shadow-[0_12px_30px_rgba(79,70,229,0.20)]
                transition
                hover:bg-indigo-500
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
