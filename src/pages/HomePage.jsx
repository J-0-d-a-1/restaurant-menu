import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xs opacity-50">
        DEPLOY CHECK: 2026-01-23-hashrouter
      </h1>
      <div className="flex flex-col gap-4 w-64">
        <h1 className="text-2xl font-bold text-center mb-4">Welcom</h1>

        <Link
          to="/menu"
          className="text-center bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          View Menu
        </Link>

        <Link
          to="/login"
          className="text-center bg-blue-700 text-white py-3 rounded hover:bg-blue-800"
        >
          Staff Page
        </Link>
      </div>
    </div>
  );
}
