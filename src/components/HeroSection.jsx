import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b border-border">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Trusted by 50,000+ Customers
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Your Health, Our Priority
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Order medicines and health products online with ease. Fast
              delivery, genuine products, and expert pharmacist support
              available 24/7.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg text-base font-semibold hover:bg-indigo-700 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="7 10 12 15 17 10"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Upload Prescription
              </button>

              <Link
                to="/online-buy"
                className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg text-base font-semibold hover:bg-gray-50 transition"
              >
                Shop Now
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <span className="text-xl">⏱️</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Fast Delivery</div>
                  <div className="text-gray-500">Within 24 hours</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                  <span className="text-xl">🛡️</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">100% Genuine</div>
                  <div className="text-gray-500">Verified products</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/HeroSection.jpg"
              alt="Pharmacy products"
              className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            />

            <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                  <span className="text-2xl">💊</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    5000+ Products
                  </div>
                  <div className="text-sm text-gray-500">Available online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
