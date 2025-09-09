// src/admin/pages/Products.jsx
import React, { useState } from "react";

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Aspirin 100mg",
      category: "Pain Relief",
      stock: 150,
      price: "$12.99",
      status: "Active",
    },
    {
      id: 2,
      name: "Vitamin D3",
      category: "Supplements",
      stock: 5,
      price: "$24.99",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Cough Syrup",
      category: "Cold & Flu",
      stock: 75,
      price: "$18.50",
      status: "Active",
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      category: "Medical Devices",
      stock: 25,
      price: "$89.99",
      status: "Active",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-800">Products</h3>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          Add Product
        </button>
      </div>

      <div className="bg-white border rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        product.status === "Active"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <button className="mr-4 text-blue-600 hover:text-blue-900">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
