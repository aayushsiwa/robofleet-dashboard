function Footer({ connectionStatus, robots, lastUpdated }) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 backdrop-blur-lg px-6 py-3 text-xs text-slate-400 flex justify-between items-center">
      {/* Left */}
      <div>© {new Date().getFullYear()} RoboFleet Monitoring System</div>

      {/* Center */}
      <div className="hidden md:flex items-center gap-4">
        <span>Total Robots: {robots.length}</span>
        <span>Online: {robots.filter((r) => r["Online/Offline"]).length}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              connectionStatus === "connected"
                ? "bg-green-500 animate-pulse"
                : "bg-red-500"
            }`}
          />
          {connectionStatus === "connected" ? "Live" : "Paused"}
        </div>

        {lastUpdated && <span>Updated {lastUpdated.toLocaleTimeString()}</span>}
      </div>
    </footer>
  );
}

export default Footer;
