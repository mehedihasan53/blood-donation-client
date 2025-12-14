import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <div className="relative mx-auto w-16 h-24 mb-6">
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-gradient-to-b from-red-500 to-red-600 rounded-full animate-pulse"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            ></div>

            <div className="absolute -inset-4 border-2 border-transparent border-t-red-400 border-r-red-300 rounded-full animate-spin"></div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Loading
            <span className="inline-flex">
              <span className="animate-[bounce_1s_infinite] mx-0.5">.</span>
              <span className="animate-[bounce_1s_infinite_0.2s] mx-0.5">
                .
              </span>
              <span className="animate-[bounce_1s_infinite_0.4s] mx-0.5">
                .
              </span>
            </span>
          </h3>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
