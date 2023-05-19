import React from "react";

function TableData() {
  return (
    <table className="table-auto w-full text-left shadow-md rounded-lg">
      <thead className="bg-[#111] text-white px-4 py-2">
        <tr>
          <th className="px-4 py-2 rounded-tl-lg">Countries</th>
          <th className="px-4 py-2 rounded-tr-lg">Population</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        <tr>
          <td className="pl-4 pr-2 py-1">India</td>
          <td className="pl-4 pr-2 py-1">99,999</td>
        </tr>
        <tr>
          <td className="pl-4 pr-2 py-1">Philippines</td>
          <td className="pl-4 pr-2 py-1">78,381</td>
        </tr>
        <tr>
          <td className="pl-4 pr-2 py-1">Vietnam</td>
          <td className="pl-4 pr-2 py-1">100,101</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TableData;
