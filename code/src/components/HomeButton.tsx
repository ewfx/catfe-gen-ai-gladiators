
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeButton() {
  return (
    <div className="absolute top-4 right-4 animate-fade-in">
      <Link to="/" className="home-button">
        <Home size={16} />
        <span>Home</span>
      </Link>
    </div>
  );
}
