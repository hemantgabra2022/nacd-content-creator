import React, { useState } from "react";
import RightContent from "../../../components/rightcontent";

const UnitLessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Dummy data for table
  const dummyData = [
    {
      title: "Sample Unit 1",
      description: "Lesson 1",
      pdf: "2:30",
      assessment: "Assessment 1",
    },
    {
      title: "Sample Unit 2",
      description: "Lesson 2",
      pdf: "3:00",
      assessment: "Assessment 2",
    },
    {
      title: "Sample Unit 3",
      description: "Lesson 3",
      pdf: "1:45",
      assessment: "Assessment 3",
    },
    {
      title: "Sample Unit 4",
      description: "Lesson 4",
      pdf: "2:15",
      assessment: "Assessment 4",
    },
    {
      title: "Sample Unit 5",
      description: "Lesson 5",
      pdf: "1:30",
      assessment: "Assessment 5",
    },
    {
      title: "Sample Unit 6",
      description: "Lesson 6",
      pdf: "2:00",
      assessment: "Assessment 6",
    },
    {
      title: "Sample Unit 7",
      description: "Lesson 7",
      pdf: "1:15",
      assessment: "Assessment 7",
    },
    {
      title: "Sample Unit 8",
      description: "Lesson 8",
      pdf: "2:45",
      assessment: "Assessment 8",
    },
    {
      title: "Sample Unit 9",
      description: "Lesson 9",
      pdf: "1:00",
      assessment: "Assessment 9",
    },
    {
      title: "Sample Unit 10",
      description: "Lesson 10",
      pdf: "2:30",
      assessment: "Assessment 10",
    },
  ];

  return (
    <RightContent>
      <div className="px-4">
        <h1 className="text-3xl font-bold mb-4">Learning roadmap</h1>
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex items-center mb-4">
            <div className="mr-2 w-full max-w-48">
              <label className="block text-sm font-medium text-gray-600">
                Select Grade
              </label>
              <select className="mt-1 p-2 border rounded w-full max-w-full">
                <option defaultValue>Select</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="mr-2 w-full max-w-48">
              <label className="block text-sm font-medium text-gray-600">
                Select Unit
              </label>
              <select className="mt-1 p-2 border rounded w-full max-w-full">
                <option defaultValue>Select</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="flex-grow"></div>{" "}
            {/* This will push the button to the right */}
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={openModal}
              >
                Add
              </button>
            </div>
          </div>

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">PDF</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((data, index) => (
                <tr key={index}>
                  <td className="border p-2">{data.title}</td>
                  <td className="border p-2">{data.description}</td>
                  <td className="border p-2">{data.pdf}</td>
                  <td className="border p-2">
                    <span className="text-blue-500 cursor-pointer mr-2">
                      Edit
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-red-500 cursor-pointer ml-2">
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
            <h2 className="text-2xl font-bold mb-4">Create Unit</h2>
            {/* Form for creating a unit */}
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Unit Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter unit name"
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
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  pdf (HH:MM)
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter pdf"
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
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={closeModal}
                >
                  Save
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
