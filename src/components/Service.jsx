import React from "react";
import { Shield, Truck, Headphones, Clock, Award, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Genuine Products",
    description: "All medicines sourced directly from licensed manufacturers",
  },
  {
    icon: Truck,
    title: "Fast & Free Delivery",
    description:
      "Free shipping on orders over $50. Delivery within 24-48 hours",
  },
  {
    icon: Headphones,
    title: "24/7 Pharmacist Support",
    description: "Expert guidance available anytime via chat, phone, or email",
  },
  {
    icon: Clock,
    title: "Quick Refills",
    description: "Set up auto-refills and never run out of your medications",
  },
  {
    icon: Award,
    title: "Licensed & Certified",
    description:
      "Fully accredited pharmacy with certified healthcare professionals",
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Your health data is encrypted and HIPAA compliant",
  },
];

const Service = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Why Choose PharmaCare?
          </h2>
          <p className="text-gray-600 text-lg">
            Trusted healthcare at your fingertips
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;
