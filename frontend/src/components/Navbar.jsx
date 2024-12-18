import React from "react";
import { FilterButtons } from "./FilterButtons";

function Navbar({ toggleUpdates, updatesEnabled, setFilter }) {
    return (
        <div className="shadow-sm h-16 flex items-center justify-between bg-[#f2f2f2] fixed top-0 w-full z-10 px-4">
            <h1 className="text-3xl font-bold">
                Robot Fleet Monitoring Dashboard
            </h1>
            <FilterButtons setFilter={setFilter} />
            <button
                onClick={toggleUpdates}
                className={`${
                    updatesEnabled ? "bg-orange-500" : "bg-blue-500"
                } p-3 rounded-md text-white`}
            >
                {updatesEnabled ? "Stop Updates" : "Start Updates"}
            </button>
        </div>
    );
}

export default Navbar;
