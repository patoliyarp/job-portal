import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

export default function Hero() {
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // const params = new URLSearchParams();
    // if (position.trim()) params.set("q", position.trim());
    // if (location.trim()) params.set("loc", location.trim());
    // navigate(`/jobs?${params.toString()}`)
    let params = {};
    if (position.trim()) params = { ...params, q: position.trim() };
    if (location.trim()) params = { ...params, loc: location.trim() };
    navigate(`/jobs?${createSearchParams(params)}`);
  };

  return (
    <section className="bg-white h-[90vh] dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 lg:py-36 text-center">
        <p className="inline-block mb-4 text-xs font-bold uppercase  text-emerald-600  bg-emerald-50 dark:bg-emerald-400/10 px-3 py-1 rounded-full">
          Find your next opportunity
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white  ">
          Find your dream job
        </h1>
        <p className="mt-5 text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis quasi
          doloribus dolorum ullam reiciendis dolores fugiat qui blanditiis
          commodi alias.{" "}
        </p>
        {/* search Form */}
        <form
          onSubmit={handleSearch}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Enter Job title "
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500"
            />
          </div>
          <div className="relative w-full">
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
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white dark:text-zinc-950 font-semibold py-2.5 px-6 rounded-xl text-sm "
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
