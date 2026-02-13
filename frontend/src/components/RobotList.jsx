import React from "react";

const RobotList = ({ robots }) => {
  return (
    <div className="w-full h-full overflow-auto rounded-xl">
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-lg text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Battery</th>
            <th className="px-4 py-3">CPU</th>
            <th className="px-4 py-3">RAM</th>
            <th className="px-4 py-3">Location</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {robots.map((robot) => {
            const isOnline = robot["Online/Offline"];
            const battery = robot["Battery Percentage"];

            return (
              <tr
                key={robot["Robot ID"]}
                className="hover:bg-slate-800/50 transition duration-200"
              >
                {/* ID */}
                <td className="px-4 py-4 font-medium text-white">
                  {robot["Robot ID"]}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isOnline
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </td>

                {/* Battery */}
                <td className="px-4 py-4 w-40">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-2 ${
                          battery <= 20
                            ? "bg-red-500"
                            : battery <= 40
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${battery}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">{battery}%</span>
                  </div>
                </td>

                {/* CPU */}
                <td className="px-4 py-4">
                  <span className="text-indigo-400 font-medium">
                    {robot["CPU Usage"]}%
                  </span>
                </td>

                {/* RAM */}
                <td className="px-4 py-4">
                  <span className="text-purple-400 font-medium">
                    {robot["RAM Consumption"]}MB
                  </span>
                </td>

                {/* Location */}
                <td className="px-4 py-4 text-slate-400 text-xs">
                  {robot["Location Coordinates"][0].toFixed(4)},{" "}
                  {robot["Location Coordinates"][1].toFixed(4)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RobotList;
