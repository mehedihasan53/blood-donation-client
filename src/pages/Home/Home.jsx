import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-red-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-red-700">
            Donate Blood, Save Lives
          </h1>
          <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
            Every drop counts. Join our community of donors and help people in
            urgent need.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
              Become a Donor
            </button>
            <button className="px-6 py-3 border border-red-400 text-red-600 rounded-xl hover:bg-red-100 transition">
              Find Blood
            </button>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-red-700">Why Donate?</h3>
          <p className="mt-2 text-gray-600">
            A single donation can save up to three lives. It’s simple, safe, and
            life-changing.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-red-700">
            Who Can Donate?
          </h3>
          <p className="mt-2 text-gray-600">
            Healthy individuals aged 18+ with no major health issues can donate
            blood regularly.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-red-700">How It Works</h3>
          <p className="mt-2 text-gray-600">
            Register, pick a date, and visit the nearest center. The process
            takes less than 20 minutes.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
