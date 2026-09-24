import { lazy, Suspense, useEffect } from "react";

import { registerSW } from "virtual:pwa-register";

import { Toaster } from "@/components/ui/toaster";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { TooltipProvider } from "@/components/ui/tooltip";

import CookieConsent from "@/components/layout/CookieConsent";

import { OfflineFallback } from "@/components/layout/OfflineFallback";

import { ErrorBoundary } from "@/components/layout/ErrorBoundary";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import AdminRoute from "@/components/auth/AdminRoute";

import {
  DashboardLayout,
} from "@/components/layout/DashboardLayout";

import ScrollToTop from "@/components/layout/ScrollToTop";


/* ============================================================
   PUBLIC EVENTDEVX PAGES
   ============================================================ */

import Landing from "./pages/Landing";

import Auth from "./pages/Auth";

import PrivacyPolicy from "./pages/PrivacyPolicy";

import TermsOfService from "./pages/TermsOfService";

import NotFound from "./pages/NotFound";


/* ============================================================
   EVENTDEVX PROTECTED APPLICATION PAGES
   ============================================================ */

const Dashboard = lazy(
  () => import("./pages/Index")
);


const Events = lazy(
  () => import("./pages/Events")
);


const Projects = lazy(
  () => import("./pages/Projects")
);


const Community = lazy(
  () => import("./pages/Community")
);


const Analytics = lazy(
  () => import("./pages/Analytics")
);


const Infrastructure = lazy(
  () => import("./pages/Infrastructure")
);


const Certificates = lazy(
  () => import("./pages/Certificates")
);


const Settings = lazy(
  () => import("./pages/Settings")
);


/* ============================================================
   EVENTDEVX REQUESTS
   ============================================================ */

const Requests = lazy(
  () => import("./pages/Requests")
);


/* ============================================================
   EVENTDEVX ADMIN
   ============================================================ */

const AdminPage = lazy(
  () => import("./pages/AdminPage")
);


/* ============================================================
   REACT QUERY
   ============================================================ */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,

      retry: 2,

      refetchOnWindowFocus: false,
    },
  },
});


/* ============================================================
   PAGE FALLBACK
   ============================================================ */

const PageFallback = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-4">

        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-2
            border-primary
            border-t-transparent
          "
        />

        <p
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >
          Loading EventDevX...
        </p>

      </div>
    </div>
  );
};


/* ============================================================
   APP
   ============================================================ */

const App = () => {

  /* ==========================================================
     PWA AUTO UPDATE
     ========================================================== */

  useEffect(() => {

    const updateSW = registerSW({

      onNeedRefresh() {

        const shouldUpdate = window.confirm(
          "A new version of EventDevX is available. Click OK to update now."
        );


        if (shouldUpdate) {

          updateSW(true);

        }

      },


      onOfflineReady() {

        console.log(
          "EventDevX is ready to work offline."
        );

      },

    });

  }, []);


  /* ==========================================================
     APPLICATION TREE
     ========================================================== */

  return (
    <ErrorBoundary>

      <QueryClientProvider
        client={queryClient}
      >

        <TooltipProvider>

          <Toaster />

          <Sonner />

          <BrowserRouter>

            <AuthProvider>

              <ScrollToTop />

              <Suspense
                fallback={
                  <PageFallback />
                }
              >

                <Routes>

                  {/* ==================================================
                      PUBLIC EVENTDEVX WEBSITE
                      ================================================== */}

                  <Route
                    path="/"
                    element={
                      <Landing />
                    }
                  />


                  {/* ==================================================
                      AUTHENTICATION
                      ================================================== */}

                  <Route
                    path="/auth"
                    element={
                      <Auth />
                    }
                  />


                  {/* ==================================================
                      LEGAL / PUBLIC INFORMATION
                      ================================================== */}

                  <Route
                    path="/privacy-policy"
                    element={
                      <PrivacyPolicy />
                    }
                  />


                  <Route
                    path="/terms-of-service"
                    element={
                      <TermsOfService />
                    }
                  />


                  {/* ==================================================
                      EVENTDEVX DASHBOARD
                      ================================================== */}

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      EVENTS
                      ================================================== */}

                  <Route
                    path="/events"
                    element={
                      <ProtectedRoute>
                        <Events />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      PROJECTS
                      ================================================== */}

                  <Route
                    path="/projects"
                    element={
                      <ProtectedRoute>
                        <Projects />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      COMMUNITY
                      ================================================== */}

                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      ANALYTICS
                      ================================================== */}

                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      INFRASTRUCTURE
                      ================================================== */}

                  <Route
                    path="/infrastructure"
                    element={
                      <ProtectedRoute>
                        <Infrastructure />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      CERTIFICATES
                      ================================================== */}

                  <Route
                    path="/certificates"
                    element={
                      <ProtectedRoute>
                        <Certificates />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      SETTINGS
                      ================================================== */}

                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      MY REQUESTS
                      ================================================== */}

                  <Route
                    path="/requests"
                    element={
                      <ProtectedRoute>
                        <DashboardLayout>
                          <Requests />
                        </DashboardLayout>
                      </ProtectedRoute>
                    }
                  />


                  {/* ==================================================
                      ADMIN
                      ================================================== */}

                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <DashboardLayout>
                          <AdminPage />
                        </DashboardLayout>
                      </AdminRoute>
                    }
                  />


                  {/* ==================================================
                      FALLBACK
                      ================================================== */}

                  <Route
                    path="*"
                    element={
                      <NotFound />
                    }
                  />

                </Routes>

              </Suspense>


              {/* =====================================================
                  GLOBAL COMPONENTS
                  ===================================================== */}

              <CookieConsent />

              <OfflineFallback />

            </AuthProvider>

          </BrowserRouter>

        </TooltipProvider>

      </QueryClientProvider>

    </ErrorBoundary>
  );
};


export default App;