const ErrorFallback = () => {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-75 p-6 m-4 border-2 border-red-300 rounded-lg bg-red-50 dark:bg-gray-900 dark:border-red-900"
    >
      <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">
        Something went wrong
      </h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        We apologize for the inconvenience.
      </p>

      <button
        // onClick={resetErrorBoundary}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
