import React, { useState } from "react";
import RightContent from "../../../components/rightcontent";
const UnitLessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);

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
      id: 0,
      unitName: "Sample Unit 1",
      lessonName: "Lesson 1",
      duration: "2:30",
      assessment: "Assessment 1",
    },
    {
      id: 1,
      unitName: "Sample Unit 2",
      lessonName: "Lesson 2",
      duration: "3:00",
      assessment: "Assessment 2",
    },
    {
      id: 2,
      unitName: "Sample Unit 3",
      lessonName: "Lesson 3",
      duration: "1:45",
      assessment: "Assessment 3",
    },
    {
      id: 3,
      unitName: "Sample Unit 4",
      lessonName: "Lesson 4",
      duration: "2:15",
      assessment: "Assessment 4",
    },
    {
      id: 4,
      unitName: "Sample Unit 5",
      lessonName: "Lesson 5",
      duration: "1:30",
      assessment: "Assessment 5",
    },
    {
      id: 5,
      unitName: "Sample Unit 6",
      lessonName: "Lesson 6",
      duration: "2:00",
      assessment: "Assessment 6",
    },
    {
      id: 6,
      unitName: "Sample Unit 7",
      lessonName: "Lesson 7",
      duration: "1:15",
      assessment: "Assessment 7",
    },
    {
      id: 7,
      unitName: "Sample Unit 8",
      lessonName: "Lesson 8",
      duration: "2:45",
      assessment: "Assessment 8",
    },
    {
      id: 8,
      unitName: "Sample Unit 9",
      lessonName: "Lesson 9",
      duration: "1:00",
      assessment: "Assessment 9",
    },
    {
      id: 9,
      unitName: "Sample Unit 10",
      lessonName: "Lesson 10",
      duration: "2:30",
      assessment: "Assessment 10",
    },
  ];

  const [data, setData] = useState(dummyData);
  const maxId = Math.max(...data.map((item) => item.id), 0);
  let nextId = maxId + 1;

  const createUnit = async (e) => {
    e.preventDefault();

    const newUnit = {
      id: nextId++,
      unitName,
      lessonName,
      duration,
      assessment,
    };

    setData((prevData) => [...prevData, newUnit]);

    // Reset the form data
    setUnitName("");
    setLessonName("");
    setDuration("");
    setAssessment("");
    closeModal();
  };

  const openUpdateModal = (itemId) => {
    setIsModalOpen(true);
    setIsUpdateMode(true);
    setUpdateItemId(itemId);

    const selectedItem = data.find((item) => item.id === itemId);

    if (selectedItem) {
      setUnitName(selectedItem.unitName);
      setLessonName(selectedItem.lessonName);
      setDuration(selectedItem.duration);
      setAssessment(selectedItem.assessment);
    } else {
      console.error(`Item with ID ${itemId} not found.`);
      closeModal();
    }
  };

  const updateUnit = (e) => {
    e.preventDefault();

    const updatedData = data.map((item) =>
      item.id === updateItemId
        ? {
            ...item,
            unitName,
            lessonName,
            duration,
            assessment,
          }
        : item
    );

    setData(updatedData);
    closeModal();
    // Reset form fields
    setUnitName("");
    setLessonName("");
    setDuration("");
    setAssessment("");
  };

  const [unitName, setUnitName] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [duration, setDuration] = useState("");
  const [assessment, setAssessment] = useState("");

  const handleDelete = (itemId) => {
    console.log(itemId);
    setData((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <RightContent>
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-4">Unit & Lessons</h1>
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex items-center mb-4">
            <div className="mr-4 flex-grow">
              <label className="block text-sm font-medium text-gray-600">
                Select Grade
              </label>
              <select className="mt-1 p-2 border rounded w-full max-w-64">
                <option defaultValue>Select</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => openModal()}
              >
                Create Unit
              </button>
            </div>
          </div>

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Unit Name</th>
                <th className="border p-2">Lesson Name</th>
                <th className="border p-2">Duration (HH:MM)</th>
                <th className="border p-2">Assessments</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((data, index) => (
                <tr key={index}>
                  <td className="border p-2">{data.unitName}</td>
                  <td className="border p-2">{data.lessonName}</td>
                  <td className="border p-2">{data.duration}</td>
                  <td className="border p-2">{data.assessment}</td>
                  <td className="border p-2">
                    <span
                      className="text-blue-500 cursor-pointer mr-2"
                      onClick={() => openUpdateModal(index)}
                    >
                      Edit
                    </span>
                    <span className="text-gray-400">|</span>
                    <span
                      className="text-red-500 cursor-pointer ml-2"
                      onClick={() => handleDelete(index)}
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
              {isUpdateMode ? "Update Unit" : "Create Unit"}
            </h2>
            {/* Form for creating a unit */}
            <form onSubmit={isUpdateMode ? updateUnit : createUnit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Unit Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter unit name"
                  value={unitName}
                  onChange={(e) => setUnitName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Lesson Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter lesson name"
                  value={lessonName}
                  onChange={(e) => setLessonName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Duration (HH:MM)
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Assessments
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter assessments"
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                />
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
