import React from "react";
import { FilterButtons } from "./FilterButtons";

function Navbar({ toggleUpdates, updatesEnabled, setFilter, activeFilter }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 
      bg-slate-900/80 backdrop-blur-xl 
      border-b border-slate-800 
      shadow-lg px-6 py-4 flex justify-between items-center"
    >
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-white tracking-wide">
          RoboFleet Dashboard
        </h1>
        <p className="text-xs text-slate-400">
          Real-time Robot Fleet Monitoring
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        {/* Filters */}
        <FilterButtons setFilter={setFilter} activeFilter={activeFilter} />

        {/* Live Status */}
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              updatesEnabled ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          {updatesEnabled ? "Live" : "Paused"}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleUpdates}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            updatesEnabled
              ? "bg-red-600 hover:bg-red-500"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          {updatesEnabled ? "Stop Updates" : "Start Updates"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
