import React, { useState } from "react";
import RightContent from "../../../components/rightcontent";

const UnitLessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [selectedGradeName, setSelectedGradeName] = useState(null);
  const [currentPdf, setCurrentPdf] = useState(""); // New state for current file name
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdateMode(false); // Set to false for creating a new unit
    setUpdateItemId(null); // Reset updateItemId
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Dummy data for table
  const dummyData = [
    {
      id: 1,
      title: "Introduction to Fractions",
      gradeName: "Grade 3 - Elementary School",
      description:
        "Basic understanding of fractions, fractions on a number line",
      pdf: "introduction_to_fractions.pdf",
    },
    {
      id: 2,
      title: "Photosynthesis Explained",
      gradeName: "Grade 5 - Elementary School",
      description: "Photosynthesis process, importance to plants",
      pdf: "photosynthesis_explained.pdf",
    },
    {
      id: 3,
      title: "The Solar System",
      gradeName: "Grade 6 - Elementary School",
      description: "Planets, moons, asteroids, and comets",
      pdf: "solar_system.pdf",
    },
    {
      id: 4,
      title: "History of Ancient Civilizations",
      gradeName: "Grade 7 - Middle School",
      description: "Mesopotamia, Egypt, Greece, Rome",
      pdf: "ancient_civilizations.pdf",
    },
  ];

  const [data, setData] = useState(dummyData);

  const maxId = Math.max(...data.map((item) => item.id), 0);
  let nextId = maxId + 1;

  const addOutcome = async (e) => {
    e.preventDefault();

    const newOutcome = {
      id: nextId++,
      title,
      gradeName,
      description,
      pdf: selectedFile ? selectedFile.name : "",
    };

    setData((prevData) => [...prevData, newOutcome]);

    // Reset the form data
    setTitle("");
    setGradeName("");
    setDescription("");
    setSelectedFile(null);
    setCurrentPdf(""); // Reset the current file name
    closeModal();
  };

  const openUpdateModal = (itemId) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setUpdateItemId(itemId);

    const selectedItem = data.find((item) => item.id === itemId);

    if (selectedItem) {
      setTitle(selectedItem.title);
      setGradeName(selectedItem.gradeName);
      setDescription(selectedItem.description);
      setCurrentPdf(selectedItem.pdf); // Set the current file name
    } else {
      console.error(`Item with ID ${itemId} not found.`);
      closeModal();
    }
  };

  const updateOutcome = (e) => {
    e.preventDefault();

    const updatedData = data.map((item) =>
      item.id === updateItemId
        ? {
            ...item,
            title,
            gradeName,
            description,
            pdf: selectedFile ? selectedFile.name : item.pdf,
          }
        : item
    );

    setData(updatedData);
    closeModal();
    // Reset form fields
    setTitle("");
    setGradeName("");
    setDescription("");
    setCurrentPdf(""); // Reset the current file name
    setSelectedFile(null);
  };

  const [title, setTitle] = useState("");
  const [gradeName, setGradeName] = useState("");
  const [description, setDescription] = useState("");
  const [pdf, setPdf] = useState("");

  const handleDelete = (itemId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (isConfirmed) {
      setData((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };
  const getUniqueGradeNames = () => {
    const uniqueGradeNames = [...new Set(data.map((item) => item.gradeName))];
    return uniqueGradeNames;
  };
  const uniqueGradeNames = getUniqueGradeNames();
  const filteredData = selectedGradeName
    ? data.filter((item) => item.gradeName === selectedGradeName)
    : data;

  return (
    <RightContent>
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-4">Outcomes</h1>
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex items-center mb-4">
            <div className="mr-4 flex-grow">
              <label className="block text-sm font-medium text-gray-600">
                Select Grade
              </label>
              <select
                className="mt-1 p-2 border rounded w-full max-w-64"
                value={selectedGradeName}
                onChange={(e) => setSelectedGradeName(e.target.value)}
              >
                <option value="" defaultValue>
                  Select
                </option>
                {uniqueGradeNames.map((gradeName, index) => (
                  <option key={index}>{gradeName}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => openModal()}
              >
                Add
              </button>
            </div>
          </div>

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Grade Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">PDF</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data.id}>
                  <td className="border p-2">{data.title}</td>
                  <td className="border p-2">{data.gradeName}</td>
                  <td className="border p-2">{data.description}</td>
                  <td className="border p-2">
                    <a
                      href={`path/to/pdf/${data.pdf}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.pdf}
                    </a>
                  </td>
                  <td className="border p-2">
                    <span
                      className="text-blue-500 cursor-pointer mr-2"
                      onClick={() => openUpdateModal(data.id)}
                    >
                      Edit
                    </span>
                    <span className="text-gray-400">|</span>
                    <span
                      className="text-red-500 cursor-pointer ml-2"
                      onClick={() => handleDelete(data.id)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create Unit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 w-1/2 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              {isUpdateMode ? "Update Outcome" : "Add Outcome"}
            </h2>
            {/* Form for creating a unit */}
            <form onSubmit={isUpdateMode ? updateOutcome : addOutcome}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Grade Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter grade name"
                  value={gradeName}
                  onChange={(e) => setGradeName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Description
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter pdf"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedFile.name}
                  </p>
                )}
                {!selectedFile && currentPdf && (
                  <p className="mt-2 text-sm text-gray-500">
                    Current file: {currentPdf}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  type="submit"
                >
                  {isUpdateMode ? "Update" : "Save"}
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RightContent>
  );
};

export default UnitLessions;
