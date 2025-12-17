import React from "react";
import { FaClock, FaUsers, FaShieldAlt } from "react-icons/fa";

const Featured = () => {
  const features = [
    {
      icon: <FaClock />,
      title: "24/7 Fast Search",
      description:
        "Find blood donors near your location in minutes during emergencies.",
      colorClass: "text-red-600",
      bgClass: "bg-red-50",
      lineColor: "bg-red-500",
    },
    {
      icon: <FaUsers />,
      title: "Largest Community",
      description: "Join thousands of verified blood donors across Bangladesh.",
      colorClass: "text-blue-600",
      bgClass: "bg-blue-50",
      lineColor: "bg-blue-500",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description:
        "Your data is protected. We ensure a secure process for all members.",
      colorClass: "text-green-600",
      bgClass: "bg-green-50",
      lineColor: "bg-green-500",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-100 rounded-full">
              Key Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Why People Choose <br />
              <span className="text-red-600 italic">Our Platform</span>
            </h2>
          </div>
          <p className="text-gray-500 max-w-sm text-lg">
            We've simplified blood donation with modern technology to save lives
            faster than ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 lg:p-10 bg-white rounded-[32px] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${feature.bgClass} ${feature.colorClass}`}
              >
                {feature.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-gray-800">
                {feature.title}
              </h3>

              <p className="mt-4 text-gray-500 leading-relaxed text-lg">
                {feature.description}
              </p>

              {/*  line hover */}
              <div className="mt-8 w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full w-0 group-hover:w-full transition-all duration-500 ${feature.lineColor}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
