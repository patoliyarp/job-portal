
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 "
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 "
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
