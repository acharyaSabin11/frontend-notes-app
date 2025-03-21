import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./styles/globalStyles.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import store from "./store/store";
import { Provider } from "react-redux";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import NoteDetailPage from "./pages/NoteDetailPage";
import AllNotesPage from "./pages/AllNotes";
import AllCategoriesPage from "./pages/AllCategories";
import CategoryDetailPage from "./pages/CategoryDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="notes/:id" element={<NoteDetailPage />} />
                <Route path="notes" element={<AllNotesPage />} />
                <Route path="categories" element={<AllCategoriesPage />} />
                <Route path="categories/:id" element={<CategoryDetailPage />} />
              </Route>
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
        <Toaster />
      </Provider>
    </>
  );
}

export default App;
