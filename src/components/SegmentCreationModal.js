import React, { useState } from "react";
import Swal from "sweetalert2";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];
const apiUrl = process.env.REACT_APP_API_URL;
const SegmentCreationModal = ({ handleCloseModal }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [schema, setSchema] = useState("");

  const saveSagment = async () => {
    if (!segmentName || !selectedSchemas.length) return;

    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema]: schemaOptions.find((option) => option.value === schema)
          ?.label,
      })),
    };
    try {
      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Segment Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Success: Request sent");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const addSchema = () => {
    if (!schema) return;
    if (schema && !selectedSchemas.includes(schema)) {
      setSelectedSchemas([...selectedSchemas, schema]);
      setSchema("");
    }
  };

  const removeSchema = (removeIndex) => {
    Swal.fire({
      text: "Are you sure you want to remove this schema?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSchemas = selectedSchemas.filter(
          (_, i) => i !== removeIndex
        );
        setSelectedSchemas(updatedSchemas);
        Swal.fire("Removed!", "The schema has been removed.", "success");
      } else {
        Swal.fire("Cancelled", "The schema is safe :)", "error");
      }
    });
  };

  const schemaChange = (index, value) => {
    const updatedSchemas = [...selectedSchemas];
    updatedSchemas[index] = value;
    setSelectedSchemas(updatedSchemas);
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      handleCloseModal();
    }
  };
  return (
    <div
      id="modal-overlay"
      onClick={handleClickOutside}
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-end z-50 transition-opacity duration-300 opacity-100 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-full w-full max-w-4xl shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 cursor-auto"
      >
        <div className="bg-cyan-500 px-10 gap-10 py-5 text-white text-lg flex justify-between items-center">
          <h2 className="font-semibold">Saving Segment</h2>
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 border-2 rounded-full px-2.5 py-1 hover:text-gray-600"
          >
            ✖
          </button>
        </div>

        <div className="p-10">
          <div className="flex flex-col gap-5 text-base mb-4">
            <label className="font-bold text-gray-700">
              Enter the Name of the Segment
            </label>
            <input
              name="segmentName"
              type="text"
              placeholder="Name of the segment"
              className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5 text-base">
            <select
              className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
              value={schema}
              onChange={(e) => setSchema(e.target.value)}
            >
              <option value="">{"Add Schema to segment"}</option>
              {schemaOptions
                .filter((option) => !selectedSchemas.includes(option.value))
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>

            <button
              onClick={addSchema}
              className="py-1.5 text-teal-600 text-base font-semibold rounded-md underline decoration-teal-600 flex justify-start"
            >
              + Add new Schema
            </button>
          </div>

          {selectedSchemas.map((schema, i) => (
            <div className="flex  gap-5 text-base mt-4" key={i}>
              <select
                value={schema}
                onChange={(e) => schemaChange(i, e.target.value)}
                className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
              >
                {schemaOptions
                  .filter(
                    (option) =>
                      !selectedSchemas.includes(option.value) ||
                      option.value === schema
                  )
                  .map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
              <button
                className="px-2 py-1 bg-red-200 border-2 border-red-600 rounded-md text-red-700"
                onClick={() => removeSchema(i)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-200 px-10 gap-10 py-5 font-bold text-base flex justify-between items-center absolute bottom-0 w-full">
          <button
            disabled={!segmentName || !selectedSchemas.length}
            onClick={saveSagment}
            className={`px-10 py-1.5 rounded-md text-white ${
              !segmentName || !selectedSchemas.length
                ? "cursor-not-allowed  bg-teal-400  "
                : "cursor-pointer  bg-teal-500 "
            }`}
          >
            Save the Segment
          </button>
          <button
            onClick={handleCloseModal}
            className="px-6 py-1.5 bg-white rounded-md text-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentCreationModal;
