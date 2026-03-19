import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useJob } from "../hooks/useJobs";
import { useAuth } from "../context/AuthContext";
import type { Application } from "../types/type";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  resume: yup.string().required("Resume filename is required"),
});

interface IApplyForm {
  name: string;
  email: string;
  resume: string;
}

export default function ApplyJob() {
  const { id } = useParams();
  const { job, loading, error } = useJob(id);
  const { userEmail } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IApplyForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: userEmail || "",
    },
  });

  const onSubmit = (data: IApplyForm) => {
    if (!job) return;

    // check if already applied
    const applications: Application[] = JSON.parse(
      localStorage.getItem("applications") || "[]",
    );
    const alreadyApplied = applications.find(
      (a) => a.jobId === job.id && a.email === data.email,
    );
    if (alreadyApplied) {
      toast.error("You have already applied for this job");
      return;
    }

    const newApp: Application = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      name: data.name,
      email: data.email,
      resume: data.resume,
      appliedAt: new Date().toISOString(),
    };
    applications.push(newApp);
    localStorage.setItem("applications", JSON.stringify(applications));
    toast.success("Application submitted!");
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
        <span className="ml-2 text-zinc-500 dark:text-zinc-400 text-sm">
          Loading...
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
            &larr; Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10 lg:px-8">
      <Link
        to={`/jobs/${job.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400  mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to job
      </Link>

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          Apply: {job.title}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          {job.company} &middot; {job.location}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2.5  pr-3 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2.5  pr-3 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
              placeholder="Your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Resume (filename)
            </label>
            <input
              type="text"
              {...register("resume")}
              className="w-full px-3 py-2.5  pr-3 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
              placeholder="e.g. resume.pdf"
            />
            {errors.resume && (
              <p className="text-red-500 text-xs mt-1">
                {errors.resume.message}
              </p>
            )}
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              Mock upload – just enter a filename
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white dark:text-zinc-950 font-semibold py-2.5 rounded-xl transition-colors text-sm mt-2"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
