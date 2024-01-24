import React, { useState } from "react";
import RightContent from "../../../components/rightcontent";

const Summative = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    gradeName: "",
    unitName: "",
    assessmentName: "",
    lastDate: "",
    literacyType: "",
    assessmentType: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  const [dummyData, setDummyData] = useState([
    {
      title: "Sample Unit 1",
      description: "Lesson 1",
      pdf: "2:30",
      assessment: "Assessment 1",
      literacyType: "Type A",
      assessmentType: "Type X",
    },
    {
      title: "Sample Unit 2",
      description: "Lesson 2",
      pdf: "3:00",
      assessment: "Assessment 2",
      literacyType: "Type B",
      assessmentType: "Type Y",
    },
    // ... (more data)
  ]);

  const gradeOptions = Array.from(new Set(dummyData.map((data) => data.title)));
  const unitOptions = Array.from(
    new Set(dummyData.map((data) => data.description))
  );

  const filteredData = dummyData.filter(
    (data) =>
      (!formData.gradeName ||
        data.title === formData.gradeName ||
        formData.gradeName === "Select") &&
      (!formData.unitName ||
        data.description === formData.unitName ||
        formData.unitName === "Select")
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAssessment = {
      title: formData.gradeName,
      description: formData.unitName,
      assessment: formData.assessmentName,
      pdf: "", // Set the PDF value accordingly
      literacyType: formData.literacyType,
      assessmentType: formData.assessmentType,
    };

    if (editIndex !== null) {
      setDummyData((prevData) =>
        prevData.map((item, index) =>
          index === editIndex ? newAssessment : item
        )
      );
    } else {
      setDummyData((prevData) => [...prevData, newAssessment]);
    }

    setFormData({
      gradeName: "",
      unitName: "",
      assessmentName: "",
      lastDate: "",
      literacyType: "",
      assessmentType: "",
    });
    setEditIndex(null);

    closeModal();
  };

  const handleDelete = (index) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this row?"
    );
    if (isConfirmed) {
      setDummyData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    const selectedRow = dummyData[index];
    setFormData({
      gradeName: selectedRow.title,
      unitName: selectedRow.description,
      assessmentName: selectedRow.assessment,
      lastDate: "", // Set the last date value accordingly
      literacyType: selectedRow.literacyType,
      assessmentType: selectedRow.assessmentType,
    });
    setEditIndex(index);
    openModal();
  };

  return (
    <RightContent>
      <div className="px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Summative Assessments</h1>
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex items-center mb-4">
            <div className="mr-2 w-full max-w-48">
              <label className="block text-sm font-medium text-gray-600">
                Select Grade
              </label>
              <select
                className="mt-1 p-2 border rounded w-full max-w-full"
                value={formData.gradeName}
                onChange={handleChange}
                name="gradeName"
              >
                <option defaultValue>Select</option>
                {gradeOptions.map((grade, index) => (
                  <option key={index} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>
            <div className="mr-2 w-full max-w-48">
              <label className="block text-sm font-medium text-gray-600">
                Select Unit
              </label>
              <select
                className="mt-1 p-2 border rounded w-full max-w-full"
                value={formData.unitName}
                onChange={handleChange}
                name="unitName"
              >
                <option defaultValue>Select</option>
                {unitOptions.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-grow"></div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={openModal}
              >
                Create Assessment
              </button>
            </div>
          </div>

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">S.No.</th>
                <th className="border p-2">Grade Name</th>
                <th className="border p-2">Unit Name</th>
                <th className="border p-2">Assessment Name</th>
                <th className="border p-2">Last date to attend</th>
                <th className="border p-2">Literacy Type</th>
                <th className="border p-2">Assessment Type</th>
                <th className="border p-2">PDF</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{data.title}</td>
                  <td className="border p-2">{data.description}</td>
                  <td className="border p-2">{data.assessment}</td>
                  <td className="border p-2">{data.pdf}</td>
                  <td className="border p-2">{data.literacyType}</td>
                  <td className="border p-2">{data.assessmentType}</td>
                  <td className="border p-2">{data.pdf}</td>
                  <td className="border p-2">{data.description}</td>
                  <td className="border p-2">
                    <span
                      className="text-blue-500 cursor-pointer mr-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </span>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 w-1/2 rounded shadow-md">
            <div className="flex">
              <h2 className="text-2xl font-bold mb-4">Create Assessment</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Grade Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter grade name"
                  name="gradeName"
                  value={formData.gradeName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Unit Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter unit name"
                  name="unitName"
                  value={formData.unitName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Assessment Name
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter assessment name"
                  name="assessmentName"
                  value={formData.assessmentName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Last date to attend
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter last date to attend"
                  name="lastDate"
                  value={formData.lastDate}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Literacy Type
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter literacy type"
                  name="literacyType"
                  value={formData.literacyType}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Assessment Type
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  placeholder="Enter assessment type"
                  name="assessmentType"
                  value={formData.assessmentType}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  type="submit"
                >
                  Submit
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

export default Summative;
