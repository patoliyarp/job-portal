import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";
import type { Application } from "../types/type";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { userEmail } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const stored: Application[] = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );
    const userApps = stored.filter((a) => a.email === userEmail);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setApplications(userApps);
  }, [userEmail]);

  const handleWithdraw = (appId: string) => {
    const allApps: Application[] = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );
    const updated = allApps.filter((a) => a.id !== appId);
    localStorage.setItem("applications", JSON.stringify(updated));
    setApplications(updated.filter((a) => a.email === userEmail));
    toast.success("Application withdrawn");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 lg:px-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white mt-10 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-10 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            You haven't applied to any jobs yet.
          </p>
          <Link
            to="/jobs"
            className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mt-2 "
          >
            Browse jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 flex items-center justify-between"
            >
              <div className="min-w-0">
                <Link
                  to={`/jobs/${app.jobId}`}
                  className="text-base font-semibold text-zinc-900 dark:text-zinc-100 truncate block"
                >
                  {app.jobTitle}
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {app.company}
                </p>
                <div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  <Calendar className="w-3 h-3" />
                  Applied {new Date(app.appliedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => handleWithdraw(app.id)}
                className="ml-4 flex items-center gap-1.5 text-sm text-red-500 hover:text-red-400 font-medium  "
              >
                Withdraw
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
