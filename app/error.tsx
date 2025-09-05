'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="glass-card p-8 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-300 mb-6">
          We encountered an error while loading ShipnEarn. Please try again.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary w-full"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="btn-outline w-full"
          >
            Go to Home
          </button>
        </div>
        {error.digest && (
          <p className="text-xs text-gray-400 mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
