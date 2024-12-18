import React from "react";

const ToggleButton = ({ updatesEnabled, toggleUpdates }) => {
    return (
        <button onClick={toggleUpdates} style={{ marginBottom: "10px" }}>
            {updatesEnabled ? "Stop Updates" : "Start Updates"}
        </button>
    );
};

export default ToggleButton;
