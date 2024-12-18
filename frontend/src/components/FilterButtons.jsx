import React from "react";

export const FilterButtons = ({ setFilter }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={() => setFilter("all")}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
                All
            </button>
            <button
                onClick={() => setFilter("online")}
                className="bg-green-200 px-4 py-2 rounded hover:bg-green-300"
            >
                Online
            </button>
            <button
                onClick={() => setFilter("offline")}
                className="bg-red-200 px-4 py-2 rounded hover:bg-red-300"
            >
                Offline
            </button>
            <button
                onClick={() => setFilter("low-battery")}
                className="bg-yellow-200 px-4 py-2 rounded hover:bg-yellow-300"
            >
                Low Battery
            </button>
        </div>
    );
};
