import React, { useState } from "react";

const SegmentCreationModal = ({ handleCloseModal }) => {
  const [segmentName, setSegmentName] = useState("");
 

  const saveSagment = (e) => {
    e.preventDefault();
    console.log(segmentName);
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-end z-50 transition-opacity duration-300 
      opacity-100
    }`}
    >
      <div
        className={`bg-white h-full w-full max-w-4xl shadow-lg transform transition-transform duration-300 ease-in-out 
        translate-x-0
      `}
      >
        <div className="bg-cyan-500 px-10 gap-10 py-5 text-white text-lg flex justify-between items-center">
          <h2 className="font-semibold"> Saving Segment</h2>

          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 border-2 rounded-full px-2.5 py-1 hover:text-gray-600"
          >
            ✖
          </button>
        </div>

        <div className="p-10">
          <div className="flex flex-col gap-5 text-base">
            <label className="font-bold text-gray-700 ">
              Enter the Name of the Segment
            </label>
            <input
              name="sagmentName"
              type="text"
              className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-gray-200 px-10 gap-10 py-5 font-bold text-base flex justify-between items-center">
          <button
            onClick={(e) => saveSagment(e)}
            className="px-10 py-1.5 bg-teal-500 rounded-md text-white"
          >
            Save the Segment
          </button>
          <button
            onClick={handleCloseModal}
            className="px-6 py-1.5 bg-white rounded-md text-red-500 "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default SegmentCreationModal;
