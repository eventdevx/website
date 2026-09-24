import {
  FormEvent,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Plus,
  ShieldCheck,
  Sparkles,
  User,
  X,
  Zap,
} from "lucide-react";

import {
  useAuth,
} from "@/contexts/AuthContext";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  firebaseAuth,
  firebasePersistenceReady,
} from "@/lib/firebase";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";


/* ============================================================
   FORM TYPES
   ============================================================ */

interface LoginForm {
  email: string;
  password: string;
}

interface SignupForm {
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  domain: string;
  password: string;
  confirmPassword: string;
}


/* ============================================================
   DOMAIN OPTIONS
   ============================================================ */

const DOMAIN_OPTIONS = [
  "Hackathon Organizer",
  "College Tech Society",
  "Community Partner",
  "Corporate Sponsor",
  "Individual Developer",
];


/* ============================================================
   INPUT CLASS
   ============================================================ */

const inputClass = `
  w-full
  rounded-2xl
  border
  border-slate-200
  bg-slate-50
  px-4
  py-3.5
  text-sm
  font-medium
  text-slate-900
  outline-none
  transition-all
  duration-200
  placeholder:text-slate-400
  focus:border-indigo-500
  focus:bg-white
  focus:ring-4
  focus:ring-indigo-100
`;


/* ============================================================
   AUTH PAGE
   ============================================================ */

const Auth = () => {

  /* ==========================================================
     ROUTER
     ========================================================== */

  const navigate =
    useNavigate();


  /* ==========================================================
     AUTH CONTEXT
     ========================================================== */

  const {
    user,
    signIn,
    signUp,
    resetPassword,
  } = useAuth();


  /* ==========================================================
     SCREEN STATE
     ========================================================== */

  const [
    isSignup,
    setIsSignup,
  ] = useState(false);


  /* ==========================================================
     PASSWORD VISIBILITY
     ========================================================== */

  const [
    showLoginPassword,
    setShowLoginPassword,
  ] = useState(false);


  const [
    showSignupPassword,
    setShowSignupPassword,
  ] = useState(false);


  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);


  /* ==========================================================
     LOGIN FORM
     ========================================================== */

  const [
    loginForm,
    setLoginForm,
  ] = useState<LoginForm>({
    email: "",
    password: "",
  });


  /* ==========================================================
     SIGNUP FORM
     ========================================================== */

  const [
    signupForm,
    setSignupForm,
  ] = useState<SignupForm>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    domain: DOMAIN_OPTIONS[0],
    password: "",
    confirmPassword: "",
  });


  /* ==========================================================
     SUBMISSION STATES
     ========================================================== */

  const [
    loginSubmitting,
    setLoginSubmitting,
  ] = useState(false);


  const [
    signupSubmitting,
    setSignupSubmitting,
  ] = useState(false);


  /* ==========================================================
     GOOGLE STATE
     ========================================================== */

  const [
    googleSubmitting,
    setGoogleSubmitting,
  ] = useState(false);


  /* ==========================================================
     MESSAGE STATE
     ========================================================== */

  const [
    loginMessage,
    setLoginMessage,
  ] = useState("");


  const [
    signupMessage,
    setSignupMessage,
  ] = useState("");


  const [
    forgotMessage,
    setForgotMessage,
  ] = useState("");


  /* ==========================================================
     FORGOT PASSWORD STATE
     ========================================================== */

  const [
    forgotMode,
    setForgotMode,
  ] = useState(false);


  const [
    forgotEmail,
    setForgotEmail,
  ] = useState("");


  const [
    forgotSubmitting,
    setForgotSubmitting,
  ] = useState(false);


  /* ==========================================================
     SIGNED-IN REDIRECT
     ========================================================== */

  /*
   * AuthContext restores the Firebase session from browser storage.
   *
   * The user can therefore directly access the dashboard
   * when an active authenticated session exists.
   *
   * We intentionally do not force navigation immediately here,
   * because the ProtectedRoute also owns access control.
   */


  /* ==========================================================
     LOGIN HANDLER
     ========================================================== */

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    setLoginMessage("");


    const email =
      loginForm.email.trim();


    const password =
      loginForm.password;


    /* ========================================================
       VALIDATION
       ======================================================== */

    if (!email) {

      setLoginMessage(
        "Please enter your email address."
      );

      return;
    }


    if (!password) {

      setLoginMessage(
        "Please enter your password."
      );

      return;
    }


    setLoginSubmitting(true);


    try {

      const result =
        await signIn(
          email,
          password
        );


      if (result.error) {

        setLoginMessage(
          result.error.message ||
          "Login failed. Please check your credentials."
        );

        return;
      }


      setLoginMessage(
        "Authentication successful. Opening EventDevX..."
      );


      window.setTimeout(() => {

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );

      }, 250);


    } catch (error) {

      console.error(
        "EventDevX login error:",
        error
      );


      setLoginMessage(
        error instanceof Error
          ? error.message
          : "Unable to authenticate your session."
      );


    } finally {

      setLoginSubmitting(false);

    }

  };


  /* ==========================================================
     SIGNUP HANDLER
     ========================================================== */

  const handleSignup = async (
    event: FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();


    setSignupMessage("");


    /* ========================================================
       VALIDATION
       ======================================================== */

    if (
      !signupForm.fullName.trim()
    ) {

      setSignupMessage(
        "Please enter your full name or organization name."
      );

      return;
    }


    if (
      !signupForm.email.trim()
    ) {

      setSignupMessage(
        "Please enter your email address."
      );

      return;
    }


    if (
      !signupForm.phone.trim()
    ) {

      setSignupMessage(
        "Please enter your mobile number."
      );

      return;
    }


    if (
      signupForm.password.length < 6
    ) {

      setSignupMessage(
        "Password must contain at least 6 characters."
      );

      return;
    }


    if (
      signupForm.password !==
      signupForm.confirmPassword
    ) {

      setSignupMessage(
        "Passwords do not match."
      );

      return;
    }


    setSignupSubmitting(true);


    try {

      const result =
        await signUp(
          signupForm.email.trim(),
          signupForm.password,
          signupForm.fullName.trim(),
          signupForm.phone.trim()
        );


      if (result.error) {

        setSignupMessage(
          result.error.message ||
          "Unable to create your EventDevX account."
        );

        return;
      }


      /*
       * EventDevX uses Firebase Authentication.
       *
       * Depending on your Firebase email-verification settings,
       * the user may receive a confirmation email here.
       */


      setSignupMessage(
        "Account created successfully. Check your email if verification is required."
      );


      window.setTimeout(() => {

        setIsSignup(false);

        setLoginForm({
          email:
            signupForm.email.trim(),
          password: "",
        });

        setSignupMessage("");

      }, 1800);


    } catch (error) {

      console.error(
        "EventDevX signup error:",
        error
      );


      setSignupMessage(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );


    } finally {

      setSignupSubmitting(false);

    }

  };


  /* ==========================================================
     GOOGLE LOGIN
     ========================================================== */

  const handleGoogleLogin = async () => {

    setGoogleSubmitting(true);

    setLoginMessage("");


    try {

      /*
       * Firebase handles the Google OAuth flow.
       *
       * Google sign-in is configured through the Firebase
       * Authentication provider. No third-party client-side
       * OAuth redirect is used by EventDevX.
       */

      await firebasePersistenceReady;


      const provider =
        new GoogleAuthProvider();


      provider.setCustomParameters({
        prompt:
          "select_account",
      });


      const credential =
        await signInWithPopup(
          firebaseAuth,
          provider
        );


      /*
       * AuthContext is listening to Firebase auth state changes,
       * so the authenticated Firebase user becomes the active
       * EventDevX session automatically.
       */

      setLoginMessage(
        `Welcome ${credential.user.displayName || credential.user.email || "to EventDevX"}. Opening your workspace...`
      );


      window.setTimeout(() => {

        navigate(
          "/dashboard",
          {
            replace: true,
          }
        );

      }, 250);


    } catch (error) {

      console.error(
        "EventDevX Google login error:",
        error
      );


      let message =
        "Google authentication failed.";


      if (
        error &&
        typeof error === "object" &&
        "code" in error
      ) {

        const firebaseError =
          error as {
            code?: string;
            message?: string;
          };


        switch (
          firebaseError.code
        ) {

          case "auth/popup-closed-by-user":

            message =
              "Google sign-in was cancelled.";

            break;


          case "auth/popup-blocked":

            message =
              "The browser blocked the Google sign-in popup. Allow popups for this site and try again.";

            break;


          case "auth/unauthorized-domain":

            message =
              "This domain is not authorized for Firebase Google sign-in. Add the current domain in Firebase Authentication settings.";

            break;


          case "auth/account-exists-with-different-credential":

            message =
              "An account already exists with this email using another sign-in method.";

            break;


          case "auth/operation-not-allowed":

            message =
              "Google sign-in is not enabled in Firebase Authentication.";

            break;


          default:

            message =
              firebaseError.message ||
              "Google authentication failed.";

        }

      } else if (
        error instanceof Error
      ) {

        message =
          error.message;

      }


      setLoginMessage(
        message
      );


    } finally {

      setGoogleSubmitting(false);

    }

  };


  /* ==========================================================
     FORGOT PASSWORD
     ========================================================== */

  const handleForgotPassword = async () => {

    setForgotMessage("");


    if (
      !forgotEmail.trim()
    ) {

      setForgotMessage(
        "Please enter your email address."
      );

      return;
    }


    setForgotSubmitting(true);


    try {

      await resetPassword(
        forgotEmail.trim()
      );



      setForgotMessage(
        "Password reset instructions have been sent to your email."
      );


    } catch (error) {

      console.error(
        "EventDevX password reset error:",
        error
      );


      setForgotMessage(
        error instanceof Error
          ? error.message
          : "Unable to send password reset instructions."
      );


    } finally {

      setForgotSubmitting(false);

    }

  };


  /* ==========================================================
     SWITCH TO SIGNUP
     ========================================================== */

  const openSignup = () => {

    setLoginMessage("");

    setForgotMessage("");

    setForgotMode(false);

    setIsSignup(true);

  };


  /* ==========================================================
     SWITCH TO LOGIN
     ========================================================== */

  const openLogin = () => {

    setSignupMessage("");

    setForgotMessage("");

    setForgotMode(false);

    setIsSignup(false);

  };


  /* ==========================================================
     TOGGLE FORGOT PASSWORD
     ========================================================== */

  const toggleForgotPassword = () => {

    setForgotMessage("");

    setForgotMode(
      (current) => !current
    );

  };


  /* ==========================================================
     LOGGED USER SHORTCUT
     ========================================================== */

  const openDashboard = () => {

    navigate(
      "/dashboard",
      {
        replace: true,
      }
    );

  };


  /* ==========================================================
     RETURN
     ========================================================== */

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-50
      "
    >


      {/* ======================================================
          BACKGROUND DECORATION
          ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            -left-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-indigo-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-24
            top-1/3
            h-80
            w-80
            rounded-full
            bg-cyan-200/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-160px]
            left-1/3
            h-96
            w-96
            rounded-full
            bg-violet-200/20
            blur-3xl
          "
        />

      </div>


      {/* ======================================================
          PAGE HEADER
          ====================================================== */}

      <header
        className="
          relative
          z-20
          border-b
          border-slate-200/70
          bg-white/80
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            flex
            min-h-20
            max-w-7xl
            items-center
            justify-between
            gap-4
            px-5
            lg:px-8
          "
        >


          {/* ==================================================
              BRAND
              ================================================== */}

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-indigo-600
                text-white
                shadow-lg
                shadow-indigo-200
              "
            >

              <Zap
                className="
                  h-5
                  w-5
                "
              />

            </div>


            <div
              className="
                text-left
              "
            >

              <div
                className="
                  text-lg
                  font-black
                  tracking-tight
                  text-slate-950
                "
              >
                EventDevX
              </div>


              <div
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.16em]
                  text-indigo-600
                "
              >
                Community Infrastructure
              </div>

            </div>

          </button>


          {/* ==================================================
              HEADER ACTION
              ================================================== */}

          {user && (

            <Button
              variant="outline"
              className="
                hidden
                gap-2
                rounded-xl
                sm:flex
              "
              onClick={openDashboard}
            >

              Open Dashboard

              <ArrowRight
                className="
                  h-4
                  w-4
                "
              />

            </Button>

          )}

        </div>

      </header>


      {/* ======================================================
          AUTH MAIN
          ====================================================== */}

      <main
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-81px)]
          max-w-7xl
          items-center
          justify-center
          px-5
          py-10
          lg:px-8
          lg:py-14
        "
      >

        <div
          className="
            grid
            w-full
            max-w-6xl
            gap-10
            lg:grid-cols-[minmax(0,1fr)_460px]
            lg:items-center
          "
        >


          {/* ==================================================
              LEFT INFORMATION
              ================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              x: -30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.55,
            }}
            className="
              hidden
              lg:block
            "
          >

            <div
              className="
                max-w-xl
              "
            >

              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-indigo-100
                  bg-white
                  px-3
                  py-2
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.12em]
                  text-indigo-600
                  shadow-sm
                "
              >

                <Sparkles
                  className="
                    h-3.5
                    w-3.5
                  "
                />

                Community Network

              </div>


              <h1
                className="
                  text-5xl
                  font-black
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-slate-950
                  xl:text-6xl
                "
              >

                Connect the
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-cyan-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  people behind
                  the events.
                </span>

              </h1>


              <p
                className="
                  mt-6
                  max-w-xl
                  text-base
                  font-medium
                  leading-8
                  text-slate-600
                "
              >

                EventDevX gives organizers,
                developers, community partners
                and event teams a central place
                to manage the ecosystem around
                their events.

              </p>


              {/* ==================================================
                  VALUE CARDS
                  ================================================== */}

              <div
                className="
                  mt-8
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >


                <div
                  className="
                    rounded-2xl
                    border
                    border-white
                    bg-white/80
                    p-4
                    shadow-sm
                    backdrop-blur
                  "
                >

                  <div
                    className="
                      mb-3
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-indigo-100
                      text-indigo-600
                    "
                  >

                    <UsersIcon />

                  </div>


                  <p
                    className="
                      text-sm
                      font-extrabold
                      text-slate-900
                    "
                  >
                    Global Network
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      leading-relaxed
                      text-slate-500
                    "
                  >
                    Organizers,
                    developers and
                    partners in one
                    connected network.
                  </p>

                </div>


                <div
                  className="
                    rounded-2xl
                    border
                    border-white
                    bg-white/80
                    p-4
                    shadow-sm
                    backdrop-blur
                  "
                >

                  <div
                    className="
                      mb-3
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-100
                      text-emerald-600
                    "
                  >

                    <ShieldCheck
                      className="
                        h-5
                        w-5
                      "
                    />

                  </div>


                  <p
                    className="
                      text-sm
                      font-extrabold
                      text-slate-900
                    "
                  >
                    Verified Infrastructure
                  </p>


                  <p
                    className="
                      mt-1
                      text-xs
                      leading-relaxed
                      text-slate-500
                    "
                  >
                    Event operations,
                    certificates and
                    community resources.
                  </p>

                </div>

              </div>


              {/* ==================================================
                  STATUS
                  ================================================== */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-3
                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-100
                    text-emerald-600
                  "
                >

                  <CheckCircle2
                    className="
                      h-4
                      w-4
                    "
                  />

                </div>


                <div>

                  <p
                    className="
                      text-xs
                      font-extrabold
                      text-slate-900
                    "
                  >
                    EventDevX network available
                  </p>


                  <p
                    className="
                      text-[10px]
                      font-medium
                      text-slate-500
                    "
                  >
                    Authentication and community services are ready.
                  </p>

                </div>

              </div>

            </div>

          </motion.section>


          {/* ==================================================
              AUTH CARD
              ================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 28,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.55,
              delay: 0.05,
            }}
            className="
              w-full
            "
          >

            <Card
              className="
                overflow-hidden
                rounded-[2rem]
                border
                border-white
                bg-white/90
                shadow-2xl
                shadow-slate-300/30
                backdrop-blur-2xl
              "
            >

              <CardContent
                className="
                  p-0
                "
              >

                <AnimatePresence
                  mode="wait"
                >

                  {/* ==================================================
                      LOGIN
                      ================================================== */}

                  {!isSignup && (

                    <motion.div
                      key="login"
                      initial={{
                        opacity: 0,
                        rotateY: -8,
                        x: 18,
                      }}
                      animate={{
                        opacity: 1,
                        rotateY: 0,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        rotateY: 8,
                        x: -18,
                      }}
                      transition={{
                        duration: 0.28,
                      }}
                      className="
                        p-6
                        sm:p-8
                      "
                    >

                      {/* ==================================================
                          BRAND
                          ================================================== */}

                      <div
                        className="
                          mb-7
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            bg-indigo-600
                            text-white
                            shadow-lg
                            shadow-indigo-200
                          "
                        >

                          <Zap
                            className="
                              h-5
                              w-5
                            "
                          />

                        </div>


                        <div>

                          <div
                            className="
                              text-xl
                              font-black
                              tracking-tight
                              text-slate-950
                            "
                          >
                            EventDevX
                          </div>


                          <div
                            className="
                              text-[9px]
                              font-extrabold
                              uppercase
                              tracking-[0.15em]
                              text-indigo-600
                            "
                          >
                            Core Community Network
                          </div>

                        </div>

                      </div>


                      {/* ==================================================
                          HEADING
                          ================================================== */}

                      {!forgotMode ? (

                        <>

                          <h2
                            className="
                              text-3xl
                              font-black
                              tracking-tight
                              text-slate-950
                            "
                          >
                            Welcome Back
                          </h2>


                          <p
                            className="
                              mt-2
                              text-sm
                              font-medium
                              leading-6
                              text-slate-500
                            "
                          >
                            Access your EventDevX community
                            workspace.
                          </p>

                        </>

                      ) : (

                        <>

                          <h2
                            className="
                              text-3xl
                              font-black
                              tracking-tight
                              text-slate-950
                            "
                          >
                            Reset Access
                          </h2>


                          <p
                            className="
                              mt-2
                              text-sm
                              font-medium
                              leading-6
                              text-slate-500
                            "
                          >
                            Enter your email and we'll
                            send password reset instructions.
                          </p>

                        </>

                      )}


                      {/* ==================================================
                          FORGOT PASSWORD FORM
                          ================================================== */}

                      {forgotMode ? (

                        <div
                          className="
                            mt-8
                            space-y-5
                          "
                        >

                          <div>

                            <label
                              className="
                                mb-2
                                block
                                text-[10px]
                                font-extrabold
                                uppercase
                                tracking-[0.12em]
                                text-slate-400
                              "
                            >
                              Email Address
                            </label>


                            <div
                              className="
                                relative
                              "
                            >

                              <Mail
                                className="
                                  pointer-events-none
                                  absolute
                                  left-4
                                  top-1/2
                                  h-4
                                  w-4
                                  -translate-y-1/2
                                  text-slate-400
                                "
                              />


                              <input
                                type="email"
                                className={`
                                  ${inputClass}
                                  pl-11
                                `}
                                placeholder="you@example.com"
                                value={forgotEmail}
                                onChange={(
                                  event
                                ) =>
                                  setForgotEmail(
                                    event.target.value
                                  )
                                }
                              />

                            </div>

                          </div>


                          {forgotMessage && (

                            <div
                              className="
                                rounded-2xl
                                border
                                border-slate-200
                                bg-slate-50
                                p-4
                                text-xs
                                font-semibold
                                leading-relaxed
                                text-slate-600
                              "
                            >
                              {forgotMessage}
                            </div>

                          )}


                          <Button
                            type="button"
                            className="
                              h-12
                              w-full
                              rounded-2xl
                              bg-indigo-600
                              font-extrabold
                              shadow-lg
                              shadow-indigo-200
                              hover:bg-indigo-700
                            "
                            disabled={
                              forgotSubmitting
                            }
                            onClick={
                              handleForgotPassword
                            }
                          >

                            {forgotSubmitting ? (

                              <>
                                <Loader2
                                  className="
                                    mr-2
                                    h-4
                                    w-4
                                    animate-spin
                                  "
                                />

                                Sending...

                              </>

                            ) : (

                              <>
                                Send Reset Link

                                <ArrowRight
                                  className="
                                    ml-2
                                    h-4
                                    w-4
                                  "
                                />

                              </>

                            )}

                          </Button>


                          <button
                            type="button"
                            onClick={
                              toggleForgotPassword
                            }
                            className="
                              w-full
                              text-center
                              text-xs
                              font-bold
                              text-indigo-600
                              hover:underline
                            "
                          >
                            Return to Login
                          </button>

                        </div>

                      ) : (

                        <form
                          onSubmit={
                            handleLogin
                          }
                          className="
                            mt-8
                            space-y-5
                          "
                        >

                          {/* ==================================================
                              EMAIL
                              ================================================== */}

                          <div>

                            <label
                              className="
                                mb-2
                                block
                                text-[10px]
                                font-extrabold
                                uppercase
                                tracking-[0.12em]
                                text-slate-400
                              "
                            >
                              Universal ID
                            </label>


                            <div
                              className="
                                relative
                              "
                            >

                              <Mail
                                className="
                                  pointer-events-none
                                  absolute
                                  left-4
                                  top-1/2
                                  h-4
                                  w-4
                                  -translate-y-1/2
                                  text-slate-400
                                "
                              />


                              <input
                                type="email"
                                required
                                autoComplete="email"
                                className={`
                                  ${inputClass}
                                  pl-11
                                `}
                                placeholder="Enter your email"
                                value={
                                  loginForm.email
                                }
                                onChange={(
                                  event
                                ) =>
                                  setLoginForm({
                                    ...loginForm,
                                    email:
                                      event.target.value,
                                  })
                                }
                              />

                            </div>

                          </div>


                          {/* ==================================================
                              PASSWORD
                              ================================================== */}

                          <div>

                            <div
                              className="
                                mb-2
                                flex
                                items-center
                                justify-between
                              "
                            >

                              <label
                                className="
                                  block
                                  text-[10px]
                                  font-extrabold
                                  uppercase
                                  tracking-[0.12em]
                                  text-slate-400
                                "
                              >
                                Access Key
                              </label>


                              <button
                                type="button"
                                onClick={
                                  toggleForgotPassword
                                }
                                className="
                                  text-[11px]
                                  font-bold
                                  text-indigo-600
                                  hover:underline
                                "
                              >
                                Forgot?
                              </button>

                            </div>


                            <div
                              className="
                                relative
                              "
                            >

                              <LockKeyhole
                                className="
                                  pointer-events-none
                                  absolute
                                  left-4
                                  top-1/2
                                  h-4
                                  w-4
                                  -translate-y-1/2
                                  text-slate-400
                                "
                              />


                              <input
                                type={
                                  showLoginPassword
                                    ? "text"
                                    : "password"
                                }
                                required
                                autoComplete="current-password"
                                className={`
                                  ${inputClass}
                                  pl-11
                                  pr-12
                                `}
                                placeholder="••••••••"
                                value={
                                  loginForm.password
                                }
                                onChange={(
                                  event
                                ) =>
                                  setLoginForm({
                                    ...loginForm,
                                    password:
                                      event.target.value,
                                  })
                                }
                              />


                              <button
                                type="button"
                                onClick={() =>
                                  setShowLoginPassword(
                                    (
                                      current
                                    ) =>
                                      !current
                                  )
                                }
                                className="
                                  absolute
                                  right-3
                                  top-1/2
                                  flex
                                  h-9
                                  w-9
                                  -translate-y-1/2
                                  items-center
                                  justify-center
                                  rounded-xl
                                  text-slate-400
                                  transition
                                  hover:bg-slate-100
                                  hover:text-slate-600
                                "
                              >

                                {showLoginPassword ? (

                                  <EyeOff
                                    className="
                                      h-4
                                      w-4
                                    "
                                  />

                                ) : (

                                  <Eye
                                    className="
                                      h-4
                                      w-4
                                    "
                                  />

                                )}

                              </button>

                            </div>

                          </div>


                          {/* ==================================================
                              REMEMBER SESSION
                              ================================================== */}

                          <label
                            className="
                              flex
                              cursor-pointer
                              items-center
                              gap-2
                              text-xs
                              font-medium
                              text-slate-500
                            "
                          >

                            <input
                              type="checkbox"
                              defaultChecked
                              className="
                                h-4
                                w-4
                                rounded
                                border-slate-300
                                accent-indigo-600
                              "
                            />

                            Keep me signed in

                          </label>


                          {/* ==================================================
                              MESSAGE
                              ================================================== */}

                          {loginMessage && (

                            <div
                              className="
                                rounded-2xl
                                border
                                border-indigo-100
                                bg-indigo-50
                                p-4
                                text-xs
                                font-semibold
                                leading-relaxed
                                text-indigo-700
                              "
                            >
                              {loginMessage}
                            </div>

                          )}


                          {/* ==================================================
                              LOGIN BUTTON
                              ================================================== */}

                          <Button
                            type="submit"
                            disabled={
                              loginSubmitting
                            }
                            className="
                              h-13
                              w-full
                              rounded-2xl
                              bg-indigo-600
                              px-6
                              text-sm
                              font-extrabold
                              shadow-lg
                              shadow-indigo-200
                              transition-all
                              hover:-translate-y-0.5
                              hover:bg-indigo-700
                            "
                          >

                            {loginSubmitting ? (

                              <>
                                <Loader2
                                  className="
                                    mr-2
                                    h-4
                                    w-4
                                    animate-spin
                                  "
                                />

                                Authenticating...

                              </>

                            ) : (

                              <>
                                Authenticate Session

                                <ShieldCheck
                                  className="
                                    ml-2
                                    h-4
                                    w-4
                                  "
                                />

                              </>

                            )}

                          </Button>


                          {/* ==================================================
                              OR DIVIDER
                              ================================================== */}

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              py-1
                            "
                          >

                            <div
                              className="
                                h-px
                                flex-1
                                bg-slate-200
                              "
                            />

                            <span
                              className="
                                text-[10px]
                                font-extrabold
                                uppercase
                                tracking-[0.15em]
                                text-slate-400
                              "
                            >
                              OR
                            </span>

                            <div
                              className="
                                h-px
                                flex-1
                                bg-slate-200
                              "
                            />

                          </div>


                          {/* ==================================================
                              GOOGLE
                              ================================================== */}

                          <Button
                            type="button"
                            variant="outline"
                            disabled={
                              googleSubmitting
                            }
                            onClick={
                              handleGoogleLogin
                            }
                            className="
                              h-12
                              w-full
                              rounded-2xl
                              border-slate-200
                              bg-white
                              font-bold
                              text-slate-700
                              hover:bg-slate-50
                            "
                          >

                            {googleSubmitting ? (

                              <Loader2
                                className="
                                  mr-2
                                  h-4
                                  w-4
                                  animate-spin
                                "
                              />

                            ) : (

                              <span
                                className="
                                  mr-2
                                  flex
                                  h-6
                                  w-6
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-slate-100
                                  text-xs
                                  font-black
                                "
                              >
                                G
                              </span>

                            )}

                            Continue with Google

                          </Button>


                          {/* ==================================================
                              SIGNUP
                              ================================================== */}

                          <p
                            className="
                              pt-2
                              text-center
                              text-xs
                              font-medium
                              text-slate-500
                            "
                          >

                            New to the collective?

                            <button
                              type="button"
                              onClick={
                                openSignup
                              }
                              className="
                                ml-1
                                font-extrabold
                                text-indigo-600
                                hover:underline
                              "
                            >
                              Apply for Entry
                            </button>

                          </p>

                        </form>

                      )}

                    </motion.div>

                  )}


                  {/* ==================================================
                      SIGNUP
                      ================================================== */}

                  {isSignup && (

                    <motion.div
                      key="signup"
                      initial={{
                        opacity: 0,
                        rotateY: 8,
                        x: -18,
                      }}
                      animate={{
                        opacity: 1,
                        rotateY: 0,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        rotateY: -8,
                        x: 18,
                      }}
                      transition={{
                        duration: 0.28,
                      }}
                      className="
                        p-6
                        sm:p-8
                      "
                    >

                      {/* ==================================================
                          BRAND
                          ================================================== */}

                      <div
                        className="
                          mb-7
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              h-11
                              w-11
                              items-center
                              justify-center
                              rounded-2xl
                              bg-indigo-600
                              text-white
                            "
                          >

                            <Plus
                              className="
                                h-5
                                w-5
                              "
                            />

                          </div>


                          <div>

                            <div
                              className="
                                text-xl
                                font-black
                                tracking-tight
                                text-slate-950
                              "
                            >
                              EventDevX
                            </div>


                            <div
                              className="
                                text-[9px]
                                font-extrabold
                                uppercase
                                tracking-[0.15em]
                                text-indigo-600
                              "
                            >
                              Join the Collective
                            </div>

                          </div>

                        </div>


                        <button
                          type="button"
                          onClick={
                            openLogin
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-slate-100
                            text-slate-500
                            transition
                            hover:bg-slate-200
                          "
                        >

                          <X
                            className="
                              h-4
                              w-4
                            "
                          />

                        </button>

                      </div>


                      {/* ==================================================
                          HEADING
                          ================================================== */}

                      <h2
                        className="
                          text-3xl
                          font-black
                          tracking-tight
                          text-slate-950
                        "
                      >
                        Join Collective
                      </h2>


                      <p
                        className="
                          mt-2
                          text-sm
                          font-medium
                          leading-6
                          text-slate-500
                        "
                      >
                        Create your EventDevX community account.
                      </p>


                      {/* ==================================================
                          SIGNUP FORM
                          ================================================== */}

                      <form
                        onSubmit={
                          handleSignup
                        }
                        className="
                          mt-7
                          space-y-4
                        "
                      >

                        {/* ==================================================
                            FULL NAME
                            ================================================== */}

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-[0.12em]
                              text-slate-400
                            "
                          >
                            Legal Entity / Name
                          </label>


                          <div
                            className="
                              relative
                            "
                          >

                            <User
                              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-slate-400
                              "
                            />


                            <input
                              type="text"
                              required
                              className={`
                                ${inputClass}
                                pl-11
                              `}
                              placeholder="Organization or Full Name"
                              value={
                                signupForm.fullName
                              }
                              onChange={(
                                event
                              ) =>
                                setSignupForm({
                                  ...signupForm,
                                  fullName:
                                    event.target.value,
                                })
                              }
                            />

                          </div>

                        </div>


                        {/* ==================================================
                            EMAIL
                            ================================================== */}

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-[0.12em]
                              text-slate-400
                            "
                          >
                            Digital Mail
                          </label>


                          <div
                            className="
                              relative
                            "
                          >

                            <Mail
                              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-slate-400
                              "
                            />


                            <input
                              type="email"
                              required
                              autoComplete="email"
                              className={`
                                ${inputClass}
                                pl-11
                              `}
                              placeholder="name@domain.com"
                              value={
                                signupForm.email
                              }
                              onChange={(
                                event
                              ) =>
                                setSignupForm({
                                  ...signupForm,
                                  email:
                                    event.target.value,
                                })
                              }
                            />

                          </div>

                        </div>


                        {/* ==================================================
                            PHONE
                            ================================================== */}

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-[0.12em]
                              text-slate-400
                            "
                          >
                            Mobile Number
                          </label>


                          <input
                            type="tel"
                            required
                            autoComplete="tel"
                            className={
                              inputClass
                            }
                            placeholder="+91 XXXXX XXXXX"
                            value={
                              signupForm.phone
                            }
                            onChange={(
                              event
                            ) =>
                              setSignupForm({
                                ...signupForm,
                                phone:
                                  event.target.value,
                              })
                            }
                          />

                        </div>


                        {/* ==================================================
                            ORGANIZATION
                            ================================================== */}

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-[0.12em]
                              text-slate-400
                            "
                          >
                            Organization
                          </label>


                          <input
                            type="text"
                            className={
                              inputClass
                            }
                            placeholder="Company / College / Community"
                            value={
                              signupForm.organization
                            }
                            onChange={(
                              event
                            ) =>
                              setSignupForm({
                                ...signupForm,
                                organization:
                                  event.target.value,
                              })
                            }
                          />

                        </div>


                        {/* ==================================================
                            PRIMARY DOMAIN
                            ================================================== */}

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-[0.12em]
                              text-slate-400
                            "
                          >
                            Primary Domain
                          </label>


                          <select
                            className={
                              inputClass
                            }
                            value={
                              signupForm.domain
                            }
                            onChange={(
                              event
                            ) =>
                              setSignupForm({
                                ...signupForm,
                                domain:
                                  event.target.value,
                              })
                            }
                          >

                            {DOMAIN_OPTIONS.map(
                              (
                                option
                              ) => (

                                <option
                                  key={
                                    option
                                  }
                                  value={
                                    option
                                  }
                                >
                                  {option}
                                </option>

                              )
                            )}

                          </select>

                        </div>


                        {/* ==================================================
                            PASSWORD
                            ================================================== */}

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-[0.12em]
                              text-slate-400
                            "
                          >
                            Create Access Key
                          </label>


                          <div
                            className="
                              relative
                            "
                          >

                            <LockKeyhole
                              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-slate-400
                              "
                            />


                            <input
                              type={
                                showSignupPassword
                                  ? "text"
                                  : "password"
                              }
                              required
                              minLength={6}
                              autoComplete="new-password"
                              className={`
                                ${inputClass}
                                pl-11
                                pr-12
                              `}
                              placeholder="Min. 6 characters"
                              value={
                                signupForm.password
                              }
                              onChange={(
                                event
                              ) =>
                                setSignupForm({
                                  ...signupForm,
                                  password:
                                    event.target.value,
                                })
                              }
                            />


                            <button
                              type="button"
                              onClick={() =>
                                setShowSignupPassword(
                                  (
                                    current
                                  ) =>
                                    !current
                                )
                              }
                              className="
                                absolute
                                right-3
                                top-1/2
                                flex
                                h-9
                                w-9
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-xl
                                text-slate-400
                                hover:bg-slate-100
                              "
                            >

                              {showSignupPassword ? (

                                <EyeOff
                                  className="
                                    h-4
                                    w-4
                                  "
                                />

                              ) : (

                                <Eye
                                  className="
                                    h-4
                                    w-4
                                  "
                                />

                              )}

                            </button>

                          </div>

                        </div>


                        {/* ==================================================
                            CONFIRM PASSWORD
                            ================================================== */}

                        <div>

                          <label
                            className="
                              mb-2
                              block
                              text-[10px]
                              font-extrabold
                              uppercase
                              tracking-[0.12em]
                              text-slate-400
                            "
                          >
                            Confirm Key
                          </label>


                          <div
                            className="
                              relative
                            "
                          >

                            <LockKeyhole
                              className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-slate-400
                              "
                            />


                            <input
                              type={
                                showConfirmPassword
                                  ? "text"
                                  : "password"
                              }
                              required
                              minLength={6}
                              autoComplete="new-password"
                              className={`
                                ${inputClass}
                                pl-11
                                pr-12
                              `}
                              placeholder="Repeat password"
                              value={
                                signupForm.confirmPassword
                              }
                              onChange={(
                                event
                              ) =>
                                setSignupForm({
                                  ...signupForm,
                                  confirmPassword:
                                    event.target.value,
                                })
                              }
                            />


                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(
                                  (
                                    current
                                  ) =>
                                    !current
                                )
                              }
                              className="
                                absolute
                                right-3
                                top-1/2
                                flex
                                h-9
                                w-9
                                -translate-y-1/2
                                items-center
                                justify-center
                                rounded-xl
                                text-slate-400
                                hover:bg-slate-100
                              "
                            >

                              {showConfirmPassword ? (

                                <EyeOff
                                  className="
                                    h-4
                                    w-4
                                  "
                                />

                              ) : (

                                <Eye
                                  className="
                                    h-4
                                    w-4
                                  "
                                />

                              )}

                            </button>

                          </div>

                        </div>


                        {/* ==================================================
                            MESSAGE
                            ================================================== */}

                        {signupMessage && (

                          <div
                            className="
                              rounded-2xl
                              border
                              border-indigo-100
                              bg-indigo-50
                              p-4
                              text-xs
                              font-semibold
                              leading-relaxed
                              text-indigo-700
                            "
                          >
                            {signupMessage}
                          </div>

                        )}


                        {/* ==================================================
                            SIGNUP BUTTON
                            ================================================== */}

                        <Button
                          type="submit"
                          disabled={
                            signupSubmitting
                          }
                          className="
                            mt-2
                            h-13
                            w-full
                            rounded-2xl
                            bg-indigo-600
                            font-extrabold
                            shadow-lg
                            shadow-indigo-200
                            hover:bg-indigo-700
                          "
                        >

                          {signupSubmitting ? (

                            <>
                              <Loader2
                                className="
                                  mr-2
                                  h-4
                                  w-4
                                  animate-spin
                                "
                              />

                              Creating Account...

                            </>

                          ) : (

                            <>
                              Initialize Partnership

                              <ArrowRight
                                className="
                                  ml-2
                                  h-4
                                  w-4
                                "
                              />

                            </>

                          )}

                        </Button>


                        {/* ==================================================
                            LOGIN LINK
                            ================================================== */}

                        <p
                          className="
                            pt-2
                            text-center
                            text-xs
                            font-medium
                            text-slate-500
                          "
                        >

                          Already verified?

                          <button
                            type="button"
                            onClick={
                              openLogin
                            }
                            className="
                              ml-1
                              font-extrabold
                              text-indigo-600
                              hover:underline
                            "
                          >
                            Return to Login
                          </button>

                        </p>

                      </form>

                    </motion.div>

                  )}

                </AnimatePresence>

              </CardContent>

            </Card>


            {/* ==================================================
                SECURITY NOTE
                ================================================== */}

            <div
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                text-center
                text-[10px]
                font-semibold
                text-slate-400
              "
            >

              <ShieldCheck
                className="
                  h-3.5
                  w-3.5
                "
              />

              Secure authentication powered by EventDevX infrastructure.

            </div>

          </motion.section>

        </div>

      </main>


      {/* ======================================================
          MOBILE FOOTER
          ====================================================== */}

      <footer
        className="
          relative
          z-10
          border-t
          border-slate-200
          bg-white/70
          px-5
          py-5
          text-center
          text-[10px]
          font-medium
          text-slate-400
          backdrop-blur-xl
        "
      >
        EventDevX Community Infrastructure Platform
      </footer>

    </div>

  );

};


/* ============================================================
   USERS ICON
   ============================================================ */

const UsersIcon = () => {

  return (

    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >

      <path
        d="
          M16 21v-2
          a4 4 0 0 0-4-4
          H6
          a4 4 0 0 0-4 4
          v2
        "
      />

      <circle
        cx="9"
        cy="7"
        r="4"
      />

      <path
        d="
          M22 21v-2
          a4 4 0 0 0-3-3.87
        "
      />

      <path
        d="
          M16 3.13
          a4 4 0 0 1 0 7.75
        "
      />

    </svg>

  );

};


export default Auth;