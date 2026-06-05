import React from "react";
import {
  Pill,
  Heart,
  Sparkles,
  Activity,
  Stethoscope,
  Baby,
} from "lucide-react";

const categories = [
  {
    icon: Pill,
    name: "Medicines",
    count: "2000+",
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    icon: Heart,
    name: "Wellness",
    count: "500+",
    color: "text-pink-600 bg-pink-50",
  },
  {
    icon: Sparkles,
    name: "Personal Care",
    count: "800+",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    icon: Activity,
    name: "Fitness",
    count: "300+",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Stethoscope,
    name: "Medical Devices",
    count: "250+",
    color: "text-teal-600 bg-teal-50",
  },
  {
    icon: Baby,
    name: "Mother & Baby",
    count: "400+",
    color: "text-indigo-600 bg-indigo-50",
  },
];

export function Categories() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Find everything you need for your health and wellness
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                role="button"
                tabIndex={0}
                className="p-6 rounded-lg bg-white shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 cursor-pointer flex flex-col items-center text-center"
                onKeyDown={() => {}}
              >
                <div
                  className={`h-14 w-14 rounded-xl ${category.color} flex items-center justify-center mb-3`}
                >
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {category.count} items
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
