
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-appblue-dark mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="app-button">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
