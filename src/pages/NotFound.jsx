import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 Not Found</h1>
      <p className="text-lg text-gray-600">
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link className="underline text-blue-600 hover:text-blue-900" to={"/"}>
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
