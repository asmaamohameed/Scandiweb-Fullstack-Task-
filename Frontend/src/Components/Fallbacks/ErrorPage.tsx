export default function ErrorPage({ message }: { message?: string }) {
  // Remove useNavigate and use window.location.reload() instead
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong 😥</h1>
      <p className="mb-4">{message || "We couldn't fetch the data from the server."}</p>
      <button
        onClick={() => window.location.reload()} // ← Simple page reload
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}