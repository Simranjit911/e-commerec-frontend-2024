
import { Link } from "react-router-dom";

function CancelPage() {
  return (
    <div className="bg-red-100 min-h-screen flex justify-center items-center">
      <div className="bg-red-200 p-8 rounded shadow-2xl text-center">
        <h2 className="text-2xl font-semibold text-red-800 mb-4">
          Payment Cancelled
        </h2>
        <p className="text-gray-700 mb-8">Your Order was cancelled.</p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}

export default CancelPage;
