import React from "react";

const RobotList = ({ robots }) => {
    return (
        <div className="w-1/2 overflow-auto">
            <table
                border="1"
                cellPadding="4"
                className="w-full px-1 border-blue-500 p-4 border"
            >
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Battery</th>
                        <th className="text-center">CPU</th>
                        <th className="text-center">RAM</th>
                        <th className="text-center">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {robots.map((robot) => (
                        <tr key={robot["Robot ID"]}>
                            <td className="text-center border border-black">{robot["Robot ID"]}</td>
                            <td
                                className={`text-center ${
                                    robot["Online/Offline"]
                                        ? "bg-green-400"
                                        : "bg-red-500"
                                } border border-black`}
                            >
                                {robot["Online/Offline"] ? "Online" : "Offline"}
                            </td>
                            <td
                                className={`text-center ${
                                    robot["Battery Percentage"] <= 20
                                        ? "bg-yellow-500"
                                        : "bg-green-400"
                                } border border-black`}
                            >
                                {robot["Battery Percentage"]}%
                            </td>
                            <td className="text-center border border-black">
                                {robot["CPU Usage"]}%
                            </td>
                            <td className="text-center border border-black">
                                {robot["RAM Consumption"]}MB
                            </td>
                            <td className="text-center border border-black">
                                ({robot["Location Coordinates"][0]},{" "}
                                {robot["Location Coordinates"][1]})
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RobotList;
