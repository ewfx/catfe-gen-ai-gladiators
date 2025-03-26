
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  total?: number;
  onChange?: (rating: number) => void;
}

export default function StarRating({ total = 5, onChange }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  const handleClick = (value: number) => {
    setRating(value);
    if (onChange) onChange(value);
  };
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(total)].map((_, index) => {
        const value = index + 1;
        return (
          <Star
            key={index}
            className={cn(
              "rating-star",
              value <= (hover || rating) 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-200 text-gray-200"
            )}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleClick(value)}
          />
        );
      })}
    </div>
  );
}
