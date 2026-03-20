import { Link } from "react-router-dom";
import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react";
import type { Job } from "../types/type";
import { type Application } from "../types/type";
import { useAuth } from "../context/AuthContext";

const JobCard = ({ job }: { job: Job }) => {
  const applications: Application[] = JSON.parse(
    localStorage.getItem("applications") || "[]",
  );

  const isApplied = applications.some((j) => Number(j.jobId) == Number(job.id));
  console.log("applications :>> ", isApplied);

  const { isLogin } = useAuth();

  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm dark:shadow-2xl">
      {/* header */}
      <div className="mb-5">
        <h2 className="mt-3 text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight line-clamp-2">
          {job.title}
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          {job.company}
        </p>
      </div>

      {/* details */}
      <div className="grid grid-cols-1 gap-2.5 mb-5">
        <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
          <MapPin className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
          {job.location}
        </div>
        <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
          <Briefcase className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
          {job.position}
        </div>
        <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
          <DollarSign className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
          {job.salary}
        </div>
        <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
          <Calendar className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
          {job.schedule}
        </div>
      </div>

      {/* description */}
      <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2 italic">
        "{job.description}"
      </p>

      {/* action buttons */}
      <div className="flex gap-3">
        <Link
          to={`/jobs/${job.id}`}
          className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center text-sm"
        >
          View
        </Link>

        {!isApplied ? (
          <Link
            to={`/jobs/${job.id}/apply`}
            className={`flex-1 bg-emerald-500  text-white dark:text-zinc-950 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center  text-sm ${isApplied ? "bg-emerald-600 " : "bg-emerald-500"}`}
          >
            Apply
          </Link>
        ) : isLogin ? (
          <div
            className={`flex-1 bg-emerald-500  text-white dark:text-zinc-950 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center  text-sm ${isApplied ? "bg-emerald-700 " : "bg-emerald-500"}`}
          >
            Applied
          </div>
        ) : (
          <Link
            to={`/jobs/${job.id}/apply`}
            className={`flex-1 bg-emerald-500  text-white dark:text-zinc-950 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center  text-sm `}
          >
            Apply
          </Link>
        )}
      </div>
    </div>
  );
};

export default JobCard;
