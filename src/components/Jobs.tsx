import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, Loader2 } from "lucide-react";
import JobCard from "./JobCard";
import { useJobs } from "../hooks/useJobs";
// import { useFetch } from "../hooks/useJobs";

const Jobs = () => {
  // const { data, loading, error } = useFetch("http://localhost:8000/jobs");

  const { jobs, loading, error } = useJobs();
  console.log("jobs :>> ", jobs);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("loc") || "");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(query.toLowerCase());
      const matchLocation = job.location
        .toLowerCase()
        .includes(location.toLowerCase());
      return matchLocation && matchTitle;
    });
  }, [jobs, query, location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("loc", location.trim());
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
        <span className="ml-2 text-zinc-500 dark:text-zinc-400 text-sm">
          Loading jobs...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <p className="text-red-500 font-medium">{error}</p>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Make sure json-server is running on port 8000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 lg:px-8">
      {/* search bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by title or company"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
          />
        </div>
        <div className="relative flex-1 sm:max-w-xs">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className=" bg-emerald-500 hover:bg-emerald-400 text-white dark:text-zinc-950 font-semibold py-2.5 px-6 rounded-xl text-sm "
        >
          Search
        </button>
      </form>

      {/* results count */}
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        {filtered.length} {filtered.length === 1 ? "job" : "jobs"} found
      </p>

      {/* grid */}
      {filtered.length === 0 ? (
        <p className="text-center  text-zinc-400 dark:text-zinc-500 py-16">
          No jobs match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
