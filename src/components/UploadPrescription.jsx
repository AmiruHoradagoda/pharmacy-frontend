"use client";

import React, { useState } from "react";
import { Upload, FileText, CheckCircle2, Phone } from "lucide-react";

export function UploadPrescription() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // dummy: no network call, just store locally
      console.log("Prescription selected:", e.target.files[0].name);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Upload Your Prescription
            </h2>
            <p className="text-gray-600 text-lg">
              Quick and secure prescription processing by licensed pharmacists
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-lg shadow">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">
                      Upload Prescription
                    </h3>
                    <p className="text-sm text-gray-500">Upload image or PDF</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      placeholder="Enter your full name"
                      className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="mt-1.5 w-full px-3 py-2 border rounded-md focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prescription File
                    </label>
                    <div className="mt-1.5">
                      <label
                        htmlFor="prescription"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        {file ? (
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-indigo-600" />
                            <span className="text-sm font-medium">
                              {file.name}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-gray-400" />
                            <span className="text-sm text-gray-500">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-xs text-gray-400">
                              PDF, PNG, JPG (MAX. 10MB)
                            </span>
                          </div>
                        )}
                        <input
                          id="prescription"
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Submit Prescription
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Terms & Conditions
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">How it works</h4>
                    <ol className="space-y-2 text-sm text-gray-600">
                      <li className="flex gap-2">
                        <span className="font-semibold text-gray-900">1.</span>{" "}
                        Upload a clear photo of your prescription
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-gray-900">2.</span>{" "}
                        Our pharmacist will verify and process it
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-gray-900">3.</span>{" "}
                        Receive confirmation and order details
                      </li>
                      <li className="flex gap-2">
                        <span className="font-semibold text-gray-900">4.</span>{" "}
                        Get your medicines delivered to your door
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-indigo-600 text-white rounded-lg shadow">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Need Help?</h4>
                    <p className="text-sm text-white/90 mb-3">
                      Our pharmacists are available 24/7 to assist you with your
                      prescription needs.
                    </p>
                    <button className="px-3 py-2 bg-white/10 text-white rounded-md">
                      Call Now: 1-800-PHARMACY
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow">
                <h4 className="font-semibold mb-3">Safety & Privacy</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      All prescriptions verified by licensed pharmacists
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Your data is encrypted and HIPAA compliant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>100% genuine medicines from certified suppliers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadPrescription;
