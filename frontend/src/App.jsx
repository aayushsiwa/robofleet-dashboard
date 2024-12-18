import React, { useEffect, useState } from "react";
import axios from "axios";
import RobotList from "./components/RobotList";
import MapView from "./components/MapView";
import Navbar from "./components/Navbar";
import { FilterButtons } from "./components/FilterButtons";

const App = () => {
    const [robots, setRobots] = useState([]);
    const [updatesEnabled, setUpdatesEnabled] = useState(false);
    const [filter, setFilter] = useState("all"); // New state for filter

    let socket = null;

    useEffect(() => {
        // Fetch initial data
        axios.get("http://localhost:8000/robots").then((response) => {
            setRobots(response.data);
        });

        if (updatesEnabled) {
            // Real-time updates with WebSocket
            socket = new WebSocket("ws://localhost:8000/ws");

            socket.onopen = () => {
                console.log("Connected to WebSocket server");
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                setRobots(data);
            };

            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
            };

            socket.onclose = () => {
                console.log("WebSocket connection closed");
            };

            return () => socket.close();
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
            <Navbar toggleUpdates={toggleUpdates} updatesEnabled={updatesEnabled} setFilter={setFilter}/>
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
