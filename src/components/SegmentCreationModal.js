import React, { useState } from "react";
import Swal from "sweetalert2";

const options = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const SegmentCreationModal = ({ handleCloseModal }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [schemaOptions, setSchemaOptions] = useState(options);

  const saveSagment = async () => {
    if (!segmentName || !schemas.length) return;

    const schema = schemas.map((schema) => ({
      [schema]: options.find((option) => option.value === schema)?.label,
    }));

    const data = [
      {
        segmentName: segmentName,
        schema: schema,
      },
    ];

    try {
      const response = await fetch(
        "https://webhook.site/7f98aed8-6e84-4e8c-99d8-377779a748f7",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
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
    if (!selectedSchema) return;

    setSchemas([...schemas, selectedSchema]);
    setSchemaOptions((prevOptions) =>
      prevOptions.filter((option) => option.value !== selectedSchema)
    );
    setSelectedSchema("");
  };

  
  

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-end z-50 transition-opacity duration-300 opacity-100">
      <div className="bg-white h-full w-full max-w-4xl shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0">
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
              className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-5 text-base">
            <select
              className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
              value={selectedSchema}
              onChange={(e) => setSelectedSchema(e.target.value)}
            >
              <option value="">{"Add Schema to segment"}</option>
              {schemaOptions?.map((option) => (
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

          {schemas.map((schema, i) => (
            <div className="flex  gap-5 text-base mt-4" key={i}>
              <div className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded">
                <span>
                  {options.find((option) => option.value === schema)?.label ||
                    schema}
                </span>
              </div>
              
            </div>
          ))}
        </div>

        <div className="bg-gray-200 px-10 gap-10 py-5 font-bold text-base flex justify-between items-center absolute bottom-0 w-full">
          <button
            disabled={!segmentName || !schemas.length}
            onClick={saveSagment}
            className={`px-10 py-1.5 rounded-md text-white ${
              !segmentName || !schemas.length
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
