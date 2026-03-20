import { useState, useEffect } from "react";
import type { Job } from "../types/type";

export const useFetch = (url: RequestInfo, options?: RequestInit) => {
  const [data, setData] = useState<Job[] | Job>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchApi(url: RequestInfo, options?: RequestInit) {
    try {
      if (!url) {
        throw new Error(`Please Provide url`);
      }

      setLoading(true);
      const res = await fetch(url, options);

      if (res.status === 404) {
        throw new Error(`Resource not found`);
      } else if (!res.ok) {
        throw new Error("Error while fetch data");
      }

      const data = await res.json();
      setData(data);
      setError(null);
    } catch (error: any | unknown) {
      setError(error.message || "Some thing went wrong while fetch data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApi(url, options);
  }, [url]);

  return { data, loading, error };
};

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/jobs");
        if (!res.ok) throw new Error("failed to fetch jobs");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        if (err instanceof Error)
          setError(err.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  return { jobs, loading, error };
}

export function useJob(id: string | undefined) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        if (err instanceof Error)
          setError(err.message || "Something went wrong");
          
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [id]);

  return { job, loading, error };
}
