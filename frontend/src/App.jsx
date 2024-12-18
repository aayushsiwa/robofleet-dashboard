import React, { useEffect, useState } from "react";
import axios from "axios";
import RobotList from "./components/RobotList";
import MapView from "./components/MapView";
import Navbar from "./components/Navbar";

const App = () => {
    const [robots, setRobots] = useState([]);
    const [updatesEnabled, setUpdatesEnabled] = useState(false);
    const [filter, setFilter] = useState("all"); // New state for filter
    let eventSource = null;

    useEffect(() => {
        // Fetch initial data
        axios.get(`${import.meta.env.VITE_API_URL}/robots`).then((response) => {
            setRobots(response.data);
        });

        if (updatesEnabled) {
            // Real-time updates with SSE
            eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/stream`);
            // const eventSource = new EventSource("https://robofleet-dashboard.onrender.com/stream");

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setRobots(data);
            };

            eventSource.onerror = (error) => {
                console.error("SSE error:", error);
                eventSource.close();
            };

            return () => {
                eventSource.close();
            };
        }
    }, [updatesEnabled]);

    const toggleUpdates = () => {
        setUpdatesEnabled((prev) => !prev);
    };

    const filterRobots = (robots, filter) => {
        switch (filter) {
            case "online":
                return robots.filter((robot) => robot["Online/Offline"]);
            case "offline":
                return robots.filter((robot) => !robot["Online/Offline"]);
            case "low-battery":
                return robots.filter((robot) => robot["Battery Percentage"] <= 20);
            default:
                return robots;
        }
    };

    return (
        <div className="h-[100vh] overflow-hidden">
            <Navbar toggleUpdates={toggleUpdates} updatesEnabled={updatesEnabled} setFilter={setFilter} />
            <div className="flex flex-col px-4 h-[100vh] overflow-hidden gap-4 mt-20">
                <div className="flex justify-between gap-2 h-full">
                    <RobotList robots={filterRobots(robots, filter)} />
                    <MapView robots={robots} />
                </div>
            </div>
        </div>
    );
};

export default App;
