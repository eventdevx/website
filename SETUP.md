EVENTDEVX FIREBASE BACKEND SETUP

NEW FILES

1. src/lib/firebase.ts
2. src/lib/requestService.ts
3. src/lib/storageService.ts
4. src/components/auth/AdminRoute.tsx
5. src/pages/AdminPage.tsx (use your admin UI here)
6. src/pages/Requests.tsx (use your request history UI here)
7. src/components/requests/RequestModal.tsx (use your request form here)
8. firestore.rules

EXISTING FILE TO UPDATE

src/App.tsx:
Add AdminRoute import:

import AdminRoute from "@/components/auth/AdminRoute";

Add Requests/AdminPage imports:

import Requests from "./pages/Requests";
import AdminPage from "./pages/AdminPage";

Use the same DashboardLayout structure already used by your current app.
Protected route example:

<Route
  path="/requests"
  element={
    <ProtectedRoute>
      <Requests />
    </ProtectedRoute>
  }
/>

Admin example:

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminRoute>
        <AdminPage />
      </AdminRoute>
    </ProtectedRoute>
  }
/>

If your page component already wraps DashboardLayout, do not wrap it a second time.

ADMIN SETUP

Firebase Console -> Authentication -> Users -> copy the UID of the account that should be admin.

Firebase Console -> Firestore Database -> create collection:
admins

Create a document with the document ID equal to that Firebase UID.
Add:
active: true
email: admin@example.com

Only a signed-in user who has that admins/{uid} document can pass AdminRoute.
Firestore rules also enforce the same admin check for privileged data.

REQUEST FLOW

Infrastructure button -> RequestModal -> createEventDevXRequest()
-> Firestore requests/{requestId}
-> status: pending

Admin -> /admin -> Approve / Reject / Complete
-> Firestore update

User -> /requests -> sees own request status in real time.
