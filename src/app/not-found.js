export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-gray-700 mb-6">Page not found</p>
      <a
        href="/"
        className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow hover:bg-purple-600 transition"
      >
        Go Home
      </a>
    </div>
  );
}
