import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Signup from "./pages/Signup";
import { ErrorBoundary } from "react-error-boundary";
import FallbackError from "./pages/FallbackError";
import { lazy } from "react";
// import JobDetails from "./pages/JobDetails";
// import ApplyJob from "./pages/ApplyJob";
// import Dashboard from "./pages/Dashboard";
// import Jobs from "./components/Jobs";

const JobDetails = lazy(() => import("./pages/JobDetails"));
const ApplyJob = lazy(() => import("./pages/ApplyJob"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Jobs = lazy(() => import("./components/Jobs"));
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950 ">
        <Header />
        <main className="">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/jobs/:id/apply"
                element={
                  <ErrorBoundary fallback={<FallbackError />}>
                    <ApplyJob />
                  </ErrorBoundary>
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </Router>
  );
}

export default App;
