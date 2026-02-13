import React from "react";

export const FilterButtons = ({ setFilter, activeFilter }) => {
  const filters = [
    { key: "all", label: "All" },
    { key: "online", label: "Online" },
    { key: "offline", label: "Offline" },
    { key: "low-battery", label: "Low Battery" },
  ];

  return (
    <div className="flex bg-slate-800 rounded-lg p-1">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => setFilter(filter.key)}
          className={`px-4 py-1.5 text-sm rounded-md transition-all duration-200 ${
            activeFilter === filter.key
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-700"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};
