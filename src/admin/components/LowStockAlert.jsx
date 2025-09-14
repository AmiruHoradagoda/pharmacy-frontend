import React from "react";

const LowStockAlert = ({ lowStockItems, loading, onRefresh }) => {
  return (
    <div className="p-6 bg-white border rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Low Stock Alert</h3>
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {loading ? "..." : `${lowStockItems?.length || 0} items`}
        </span>
      </div>
      <div className="space-y-3">
        {loading ? (
          [...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 animate-pulse"
            >
              <div className="flex-1">
                <div className="w-32 h-4 mb-2 bg-gray-200 rounded"></div>
                <div className="w-24 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : lowStockItems?.length > 0 ? (
          lowStockItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-red-50"
            >
              <div>
                <p className="font-medium text-gray-900">{item.itemName}</p>
                <p className="text-sm text-gray-500">
                  Current: {item.currentStock} | Min: {item.minStockThreshold}
                </p>
              </div>
              <button
                onClick={() => console.log("Reorder:", item.itemName)}
                className="text-sm font-medium text-red-600 hover:text-red-800"
              >
                Reorder
              </button>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <div className="mb-2 text-2xl">✅</div>
            <p>All items are well stocked!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LowStockAlert;
