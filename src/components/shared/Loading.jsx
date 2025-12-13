import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50">
      <div className="relative w-[120px] h-[90px] mx-auto">
        {/* Bouncing Ball */}
        <div
          className="absolute bottom-[30px] left-[50px] h-[30px] w-[30px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
          style={{
            animation: "loading-bounce 0.5s ease-in-out infinite alternate",
          }}
        />

        {/* Steps */}
        <div
          className="absolute right-0 top-0 h-[7px] w-[45px] rounded-[4px]"
          style={{
            boxShadow:
              "0 5px 0 #c7d2fe, -35px 50px 0 #c7d2fe, -70px 95px 0 #c7d2fe",
            animation: "loading-step 1s ease-in-out infinite",
          }}
        />
      </div>

      <p className="mt-8 text-gray-700 font-semibold text-lg animate-pulse ">
        Loading...
      </p>

      {/* Animations */}
      <style>
        {`
          @keyframes loading-bounce {
            0% { transform: scale(1, 0.7); }
            40% { transform: scale(0.8, 1.2); }
            60% { transform: scale(1, 1); }
            100% { bottom: 140px; transform: scale(1, 1); }
          }
          
          @keyframes loading-step {
            0% {
              box-shadow:
                0 10px 0 rgba(0,0,0,0),
                0 10px 0 #c7d2fe,
                -35px 50px 0 #c7d2fe,
                -70px 90px 0 #c7d2fe;
            }
            100% {
              box-shadow:
                0 10px 0 #c7d2fe,
                -35px 50px 0 #c7d2fe,
                -70px 90px 0 #c7d2fe,
                -70px 90px 0 rgba(0,0,0,0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
