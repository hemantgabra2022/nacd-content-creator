import React, { useState } from "react";
import RightContent from "../../../components/rightcontent";
const UnitLessions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVdoModalOpen, setIsVdoModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [selectedGradeName, setSelectedGradeName] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setIsUpdateMode(false); // Set to false for creating a new unit
    setUpdateItemId(null); // Reset updateItemId
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openVdoModal = (url) => {
    setVideoUrl(url);
    setIsVdoModalOpen(true);
  };
  const closeVdoModal = () => {
    setIsVdoModalOpen(false);
  };

  // Dummy data for table
  const dummyData = [
    {
      id: 0,
      unitName: "Introduction to Algebra",
      gradeName: "Elementary School - 6th Grade",
      lessonName: "Basic concepts of algebra, solving equations",
      duration: "02:30",
      assessment: "Mid-term exam, problem-solving tasks",
      videoUrl: "https://www.youtube.com/embed/EngW7tLk6R8?si=AqUWozfo6DFzuPEX",
    },
    {
      id: 1,
      unitName: "World War II",
      gradeName: "Middle School - 8th Grade",
      lessonName: "Causes, major events, impact",
      duration: "03:00",
      assessment: "Research project, oral presentations",
      videoUrl: "https://www.youtube.com/embed/a3ICNMQW7Ok?si=xgs_zxPM5R_q-J-3",
    },
    {
      id: 2,
      unitName: "Photosynthesis",
      gradeName: "Middle School - 7th Grade",
      lessonName: "Process, importance, factors affecting",
      duration: "02:15",
      assessment: "Lab experiments, written quizzes",
      videoUrl: "https://www.youtube.com/embed/K4TOrB7at0Y?si=L-xeboe9g46yemis",
    },
    {
      id: 3,
      unitName: "Romeo and Juliet",
      gradeName: "High School - 9th Grade",
      lessonName: "Shakespearean literature, tragic love story",
      duration: "03:30",
      assessment: "Analytical essays, dramatic performances",
      videoUrl: "https://www.youtube.com/embed/PCwL3-hkKrg?si=jy3LlHOAlGR3rOz9",
    }
  ];

  const [data, setData] = useState(dummyData);
  const maxId = Math.max(...data.map((item) => item.id), 0);
  let nextId = maxId + 1;

  const createUnit = async (e) => {
    e.preventDefault();

    const newUnit = {
      id: nextId++,
      unitName,
      gradeName,
      lessonName,
      duration,
      assessment,
    };

    setData((prevData) => [...prevData, newUnit]);

    // Reset the form data
    setUnitName("");
    setGradeName("");
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
      setGradeName(selectedItem.gradeName);
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
            gradeName,
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
    setGradeName("");
    setLessonName("");
    setDuration("");
    setAssessment("");
  };

  const [unitName, setUnitName] = useState("");
  const [gradeName, setGradeName] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [duration, setDuration] = useState("");
  const [assessment, setAssessment] = useState("");

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
        <h1 className="text-3xl font-bold mb-4">Unit & Lessons</h1>
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
                Create Unit
              </button>
            </div>
          </div>

          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Unit Name</th>
                <th className="border p-2">Grade Name</th>
                <th className="border p-2">Lesson Name</th>
                <th className="border p-2">Duration (HH:MM)</th>
                <th className="border p-2">Assessments</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={data.id}>
                  <td className="border p-2">{data.unitName}</td>
                  <td className="border p-2">{data.gradeName}</td>
                  <td className="border p-2">
                      <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => openVdoModal(data.videoUrl)}
                      >
                      {data.lessonName}
                      </span>
                  </td>
                  <td className="border p-2">{data.duration}</td>
                  <td className="border p-2">{data.assessment}</td>
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
      {isVdoModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 w-1/2 rounded shadow-md">
            <iframe src={videoUrl}
              frameborder='0'
              allow='autoplay; encrypted-media'
              height= '400'
              width= '100%'
              allowfullscreen
              title='video'
            />
            <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 my-2 rounded"
                  onClick={closeVdoModal}
                >
                  Cancel
                </button>
              </div>
          </div>
        </div>
      )}
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
