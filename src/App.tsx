import { type FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import { AppLayout } from "./components/layout/AppLayout";
import { LoginPage } from "./pages/LoginPage";
import { ChatPage } from "./pages/ChatPage";
import { ContactsPage } from "./pages/ContactsPage";
import { AdminPage } from "./pages/AdminPage";
import { useThemeStore } from "./stores/themeStore";

const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuthStore();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AdminRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuthStore();
  if (!currentUser?.isAdmin) return <Navigate to="/chat" replace />;
  return <>{children}</>;
};

const App: FC = () => {
  const { currentUser } = useAuthStore();
  const { theme } = useThemeStore();

  return (
    <div className={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={currentUser ? <Navigate to="/chat" replace /> : <LoginPage />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
