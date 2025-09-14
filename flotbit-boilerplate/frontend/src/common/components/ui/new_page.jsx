import React, { useState } from "react";
// import { ReactComponent as StarIcon } from "./ic_round-star.svg"; 
// import { ReactComponent as PrevIcon } from "../ui/"; 
// import { ReactComponent as NextIcon } from "./next.svg"; 

const ReviewCard = () => {
  const [rating, setRating] = useState(1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e8f0fe]">
      <div className="w-[600px] bg-[#e8f0fe] p-10 rounded-3xl shadow-md flex flex-col items-center">
        
        {/* Review Section */}
        <div className="w-full bg-white/20 backdrop-blur-md rounded-2xl shadow p-8">
          <h2 className="text-gray-700 text-lg font-medium">Give us a review?</h2>
          <p className="text-gray-400 text-sm mb-4">Description (optional)</p>

          {/* Stars */}
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition"
              >
                {/* <StarIcon
                  className={`w-8 h-8 ${
                    star <= rating ? "fill-indigo-600" : "fill-indigo-300"
                  }`}
                /> */}
              </button>
            ))}
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-10 mt-10">
          {/* Previous Button */}
          {/* <button className="w-12 h-12 rounded-full bg-white/50 shadow flex items-center justify-center">
            <PrevIcon className="w-6 h-6 text-gray-700" />
          </button> */}

          {/* Progress Bar */}
          <div className="w-[300px]">
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div className="h-2 bg-gray-700 rounded-full w-[70%]"></div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1">1:20</p>
          </div>

          {/* Next Button */}
          <button className="w-12 h-12 rounded-full bg-white/50 shadow flex items-center justify-center">
            {/* <NextIcon className="w-6 h-6 text-gray-700" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;