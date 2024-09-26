import logo from "./logo.svg";
import "./App.css";
import SegmentCreationModal from "./components/SegmentCreationModal";
import { useState } from "react";

function App() {
  const [openSegmentModal, setOpenSegmentModal] = useState(false);
  const handleCloseModal = () => {
    setOpenSegmentModal(!openSegmentModal);
  };
  return (
    <div className="p-10">
      <button
        onClick={() => handleCloseModal()}
        className="px-10 py-1 bg-teal-500 rounded-md text-white font-bold text-base"
      >
        Save Segment
      </button>
      {openSegmentModal && (
        <SegmentCreationModal handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
