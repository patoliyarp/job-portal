import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useJob } from "../hooks/useJobs";

export default function JobDetails() {
  const { id } = useParams();
  const { job, loading, error } = useJob(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
        <span className="ml-2 text-zinc-500 dark:text-zinc-400 text-sm">
          Loading job details...
        </span>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error || "Job not found"}</p>
          <Link
            to="/jobs"
            className="text-emerald-600 dark:text-emerald-400 text-sm mt-2 inline-block hover:underline"
          >
            Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 lg:px-8">
      {/* back link */}
      <Link
        to="/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400  mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to jobs
      </Link>

      {/* card */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 shadow-sm">
        {/* header */}
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 px-2 py-1 rounded">
          {job.position}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {job.title}
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          {job.company}
        </p>

        {/* details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 mb-8">
          <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
            <MapPin className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
            {job.location}
          </div>
          <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
            <DollarSign className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
            {job.salary}
          </div>
          <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
            <Briefcase className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
            {job.position}
          </div>
          <div className="flex items-center text-zinc-600 dark:text-zinc-400 text-sm">
            <Calendar className="w-4 h-4 mr-2.5 text-zinc-400 dark:text-zinc-500" />
            {job.schedule}
          </div>
        </div>

        {/* description */}
        <div className="mb-8">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            Description
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 ">
            {job.description}
          </p>
        </div>

        {/* responsibilities */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Responsibilities
            </h2>
            <ul className="space-y-1.5">
              {job.responsibilities.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* requirements */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
              Requirements
            </h2>
            <ul className="space-y-1.5">
              {job.requirements.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* apply button */}
        <Link
          to={`/jobs/${job.id}/apply`}
          className=" items-center bg-emerald-500  text-white dark:text-zinc-950 font-semibold py-2.5 px-6 rounded-xl text-sm "
        >
          Apply for this Position
        </Link>
      </div>
    </div>
  );
}
