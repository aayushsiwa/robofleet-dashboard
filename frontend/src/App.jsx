import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import RobotList from "./components/RobotList";
import MapView from "./components/MapView";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [robots, setRobots] = useState([]);
  const [updatesEnabled, setUpdatesEnabled] = useState(false);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const eventSourceRef = useRef(null);

  // 🔹 Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/robots`);
        setRobots(response.data);
      } catch (err) {
        console.error("Failed to fetch robots:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 SSE Setup
  useEffect(() => {
    if (!updatesEnabled) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setConnectionStatus("disconnected");
      return;
    }

    const eventSource = new EventSource(`${API_URL}/stream`);
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRobots(data);
      setLastUpdated(new Date());
    };
    eventSourceRef.current = eventSource;
    setConnectionStatus("connecting");

    eventSource.onopen = () => {
      setConnectionStatus("connected");
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRobots(data);
      setLastUpdated(new Date());
    };

    eventSource.onerror = () => {
      setConnectionStatus("reconnecting");
      eventSource.close();

      // Auto-reconnect
      setTimeout(() => {
        if (updatesEnabled) {
          setUpdatesEnabled(false);
          setUpdatesEnabled(true);
        }
      }, 3000);
    };

    return () => {
      eventSource.close();
    };
  }, [updatesEnabled]);

  // 🔹 Toggle Updates
  const toggleUpdates = () => {
    setUpdatesEnabled((prev) => !prev);
  };

  // 🔹 Memoized Filtered Robots
  const filteredRobots = useMemo(() => {
    switch (filter) {
      case "online":
        return robots.filter((r) => r["Online/Offline"]);
      case "offline":
        return robots.filter((r) => !r["Online/Offline"]);
      case "low-battery":
        return robots.filter((r) => r["Battery Percentage"] <= 20);
      default:
        return robots;
    }
  }, [robots, filter]);

  return (
    <div className="min-h-screen h-full w-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white  pt-20">
      {/* Navbar */}
      <Navbar
        toggleUpdates={toggleUpdates}
        updatesEnabled={updatesEnabled}
        setFilter={setFilter}
        activeFilter={filter}
        connectionStatus={connectionStatus}
      />

      {/* Main Content */}
      <div className="flex flex-col gap-6 p-6 min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center text-slate-400">
            Loading robots...
          </div>
        ) : (
          <>
            <div
              className="h-[50vh] bg-slate-900/60 backdrop-blur-xl 
  rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col"
            >
              <div className="px-5 py-3 border-b border-slate-800 text-sm text-slate-400">
                Fleet Map
              </div>

              <div className="flex-1">
                <MapView robots={robots} />
              </div>
            </div>

            {/* Robot List Section (Bottom) */}
            <div
              className=" bg-slate-900/60 backdrop-blur-xl 
  rounded-2xl border border-slate-800 shadow-xl flex flex-col"
            >
              <div className="px-5 py-3 border-b border-slate-800 text-sm text-slate-400">
                Robot Fleet
              </div>

              <div className="flex-1 overflow-auto p-4">
                <RobotList robots={filteredRobots} />
              </div>
            </div>
          </>
        )}
      </div>

      <Footer
        connectionStatus={connectionStatus}
        robots={robots}
        lastUpdated={lastUpdated}
      />
    </div>
  );
};

export default App;
