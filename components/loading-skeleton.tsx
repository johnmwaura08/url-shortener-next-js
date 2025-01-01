import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <ul className="space-y-2">
        {[1, 2, 3, 4, 5, 6,7].map((i) => (
          <li
            key={i}
            className="flex  items-center  gap-2 rounded-md border bg-card p-4 text-card-foreground justify-between"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gray-200 rounded"></div>

              <span className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
                <div className="h-4 w-10 bg-gray-200 rounded"></div>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
