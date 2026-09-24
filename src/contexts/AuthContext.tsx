import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  User as FirebaseUser,
} from "firebase/auth";

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";

import {
  firebaseAuth,
  firebasePersistenceReady,
} from "@/lib/firebase";

/* ============================================================
   EVENTDEVX USER TYPE
   ============================================================ */

export interface EventDevXUser extends FirebaseUser {
  user_metadata?: {
    full_name?: string;
    name?: string;
    role?: string;
    avatar_url?: string;
    picture?: string;
  };
}

/* ============================================================
   EVENTDEVX SESSION TYPE
   ============================================================ */

export interface EventDevXSession {
  access_token: string;
  user: EventDevXUser;
  expires_at: number | null;
}

/* ============================================================
   SIGN IN INPUT
   ============================================================ */

interface SignInInput {
  email: string;
  password: string;
}

/* ============================================================
   SIGN UP INPUT
   ============================================================ */

interface SignUpInput {
  email: string;
  password: string;
  fullName?: string;
  name?: string;
}

/* ============================================================
   AUTH CONTEXT TYPE
   ============================================================ */

interface AuthContextValue {
  user: EventDevXUser | null;
  session: EventDevXSession | null;
  loading: boolean;
  isSigningOut: boolean;

  signIn: (
    input: string | SignInInput,
    password?: string
  ) => Promise<{
    user: EventDevXUser;
    session: EventDevXSession;
  }>;

  signUp: (
    input: string | SignUpInput,
    password?: string,
    fullName?: string
  ) => Promise<{
    user: EventDevXUser;
    session: EventDevXSession;
  }>;

  resetPassword: (
    email: string
  ) => Promise<void>;

  verifyPhoneChange: (
    phoneNumber: string
  ) => Promise<{
    success: boolean;
    error?: string;
  }>;

  signOut: () => Promise<void>;
}

/* ============================================================
   CONTEXT
   ============================================================ */

const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

/* ============================================================
   NORMALIZE FIREBASE USER
   ============================================================ */

function normalizeUser(
  firebaseUser: FirebaseUser
): EventDevXUser {
  const user = firebaseUser as EventDevXUser;

  const fullName =
    firebaseUser.displayName ||
    "";

  const avatar =
    firebaseUser.photoURL ||
    "";

  user.user_metadata = {
    ...(user.user_metadata || {}),
    full_name: fullName,
    name: fullName,
    role: "Community Member",
    avatar_url: avatar,
    picture: avatar,
  };

  return user;
}

/* ============================================================
   CREATE EVENTDEVX SESSION
   ============================================================ */

async function createSession(
  firebaseUser: FirebaseUser
): Promise<EventDevXSession> {
  const accessToken = await firebaseUser.getIdToken();

  const user = normalizeUser(firebaseUser);

  const session: EventDevXSession = {
    access_token: accessToken,
    user,
    expires_at:
      firebaseUser.metadata?.lastSignInTime
        ? null
        : null,
  };

  return session;
}

/* ============================================================
   PROVIDER
   ============================================================ */

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    user,
    setUser,
  ] = useState<EventDevXUser | null>(null);

  const [
    session,
    setSession,
  ] = useState<EventDevXSession | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    isSigningOut,
    setIsSigningOut,
  ] = useState(false);

  /* ==========================================================
     FIREBASE LOCAL SESSION RESTORE
     ========================================================== */

  useEffect(() => {
    let active = true;

    let unsubscribe: (() => void) | null = null;

    const startAuthListener = async () => {
      try {
        /*
         * Wait until local browser persistence is configured.
         * This prevents ProtectedRoute from deciding that the user
         * is logged out during the small refresh/startup window.
         */
        await firebasePersistenceReady;

        await setPersistence(
          firebaseAuth,
          browserLocalPersistence
        );

      } catch (error) {
        console.error(
          "EventDevX Firebase auth persistence error:",
          error
        );
      }

      if (!active) {
        return;
      }

      unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (firebaseUser) => {
          if (!active) {
            return;
          }

          if (!firebaseUser) {
            setUser(null);
            setSession(null);
            setLoading(false);
            return;
          }

          try {
            const nextSession =
              await createSession(firebaseUser);

            if (!active) {
              return;
            }

            setUser(nextSession.user);
            setSession(nextSession);
            setLoading(false);

          } catch (error) {
            console.error(
              "EventDevX session restore failed:",
              error
            );

            if (!active) {
              return;
            }

            /*
             * Keep the Firebase user available even if getting the
             * optional ID token has a temporary problem.
             */
            setUser(
              normalizeUser(firebaseUser)
            );

            setSession(null);
            setLoading(false);
          }
        }
      );

    };

    void startAuthListener();

    return () => {
      active = false;

      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  /* ==========================================================
     SIGN IN
     ========================================================== */

  const signIn = async (
    input: string | SignInInput,
    password?: string
  ) => {
    const email =
      typeof input === "string"
        ? input
        : input.email;

    const accessKey =
      typeof input === "string"
        ? password || ""
        : input.password;

    if (!email) {
      throw new Error(
        "Email is required."
      );
    }

    if (!accessKey) {
      throw new Error(
        "Password is required."
      );
    }

    /*
     * Explicitly establish local persistence before login.
     * This is the part that fixes the refresh logout problem.
     */
    await setPersistence(
      firebaseAuth,
      browserLocalPersistence
    );

    const credential =
      await signInWithEmailAndPassword(
        firebaseAuth,
        email.trim(),
        accessKey
      );

    const nextSession =
      await createSession(credential.user);

    setUser(nextSession.user);
    setSession(nextSession);

    return {
      user: nextSession.user,
      session: nextSession,
    };
  };

  /* ==========================================================
     SIGN UP
     ========================================================== */

  const signUp = async (
    input: string | SignUpInput,
    password?: string,
    fullName?: string
  ) => {
    const email =
      typeof input === "string"
        ? input
        : input.email;

    const accessKey =
      typeof input === "string"
        ? password || ""
        : input.password;

    const name =
      typeof input === "string"
        ? fullName || ""
        : input.fullName ||
          input.name ||
          "";

    if (!email) {
      throw new Error(
        "Email is required."
      );
    }

    if (!accessKey) {
      throw new Error(
        "Password is required."
      );
    }

    await setPersistence(
      firebaseAuth,
      browserLocalPersistence
    );

    const credential =
      await createUserWithEmailAndPassword(
        firebaseAuth,
        email.trim(),
        accessKey
      );

    if (name.trim()) {
      await updateProfile(
        credential.user,
        {
          displayName: name.trim(),
        }
      );
    }

    const nextSession =
      await createSession(credential.user);

    setUser(nextSession.user);
    setSession(nextSession);

    return {
      user: nextSession.user,
      session: nextSession,
    };
  };

  /* ==========================================================
     RESET PASSWORD
     ========================================================== */

  const resetPassword = async (
    email: string
  ) => {
    const cleanEmail =
      email.trim();

    if (!cleanEmail) {
      throw new Error(
        "Email is required."
      );
    }

    await sendPasswordResetEmail(
      firebaseAuth,
      cleanEmail
    );
  };

  /* ==========================================================
     PHONE VERIFICATION PLACEHOLDER
     ========================================================== */

  const verifyPhoneChange = async (
    phoneNumber: string
  ) => {
    if (!phoneNumber.trim()) {
      return {
        success: false,
        error: "Phone number is required.",
      };
    }

    return {
      success: false,
      error:
        "Phone number change is not part of the EventDevX Firebase flow.",
    };
  };

  /* ==========================================================
     SIGN OUT
     ========================================================== */

  const signOut = async () => {
    setIsSigningOut(true);

    try {
      await firebaseSignOut(
        firebaseAuth
      );

      setUser(null);
      setSession(null);

    } finally {
      setIsSigningOut(false);
    }
  };

  /* ==========================================================
     CONTEXT VALUE
     ========================================================== */

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      isSigningOut,
      signIn,
      signUp,
      resetPassword,
      verifyPhoneChange,
      signOut,
    }),
    [
      user,
      session,
      loading,
      isSigningOut,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ============================================================
   USE AUTH
   ============================================================ */

export function useAuth() {
  const context = useContext(
    AuthContext
  );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}