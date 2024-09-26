import React, { useState } from "react";

const options = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "city", value: "city" },
  { label: "state", value: "state" },
];
const SegmentCreationModal = ({ handleCloseModal }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");

  const [schemas, setSchemas] = useState([]);
  const [schemaOptions, setSchemaOptions] = useState(options);

  const saveSagment = () => {
   const schema= schemas.map((schema) => ({
      [schema]: options.find((option) => option.value == schema)?.label,
    }))
    const data = {
      segment_name: segmentName,
      schema: schema,
    };

    console.log(data);
  };

  const addSchema = () => {
    if (!selectedSchema) return;
    if (selectedSchema) {
      setSchemas([...schemas, selectedSchema]);
      setSchemaOptions((prevOptions) =>
        prevOptions.filter((option) => option.value !== selectedSchema)
      );
      setSelectedSchema("");
    }
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
          <div className="flex flex-col gap-5 text-base mb-4">
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

          <div className="flex flex-col gap-5 text-base">
            <select
              className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
              onChange={(e) => setSelectedSchema(e.target.value)}
            >
              <option value="">{"Add Schema to segment"}</option>
              {schemaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => addSchema()}
              className="py-1.5 text-teal-600 text-base font-semibold rounded-md underline decoration-teal-600 flex justify-start"
            >
              + Add new Schema
            </button>
          </div>
          <div className="flex flex-col gap-5 text-base mt-4">
            {schemas.map((schema, i) => {
              return (
                <div
                  className="border-2 border-gray-600 py-1.5 px-2.5 w-[70%] rounded"
                  key={i}
                >
                  <span>
                    {options.find((option) => option.value === schema)?.label ||
                      schema}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-200 px-10 gap-10 py-5 font-bold text-base flex justify-between items-center">
          <button
            onClick={() => saveSagment()}
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
