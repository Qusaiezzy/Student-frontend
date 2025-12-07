import React, { useState } from "react";
import Navbar from "./navbar";

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [teacherReviews, setTeacherReviews] = useState({});
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;
  // ================= FILE CHANGE =================
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // ================= UPLOAD EXCEL =================
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an Excel file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${BASE_URL}/upload-excel`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "Uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading file.");
    }
  };

  // ================= FETCH STUDENTS =================
  const fetchStudents = async () => {
    if (!selectedClass) {
      alert("Please select a class first");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/students/${selectedClass}`
      );

      if (!res.ok) {
        setStudents([]);
        setMessage("No students found for this class");
        return;
      }

      const data = await res.json();
      setStudents(data);

      const reviews = {};
      data.forEach((stu) => {
        ["FA1", "FA2", "FA3", "FA4"].forEach((fa) => {
          reviews[stu._id + "-" + fa] = stu[fa]?.teacherReview || "";
        });
      });

      setTeacherReviews(reviews);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= HANDLE CLASS CHANGE =================
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // ================= HANDLE TEXTAREA =================
  const handleReviewChange = (studentId, fa, value) => {
    setTeacherReviews((prev) => ({
      ...prev,
      [studentId + "-" + fa]: value,
    }));
  };

  // ================= SUBMIT TEACHER REVIEW =================
  const submitTeacherReview = async (studentId, fa) => {
    try {
      const student = students.find((s) => s._id === studentId);

      await fetch(`${BASE_URL}/teacher/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNumber: student.rollNumber,
          fa,
          teacherReview: teacherReviews[studentId + "-" + fa],
        }),
      });

      alert("Review submitted!");
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Upload Card */}
      <div className="uploadCard">
        <h2>Upload Excel File</h2>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        />

        {file && (
          <p>
            Selected File: <strong>{file.name}</strong>
          </p>
        )}

        <button onClick={handleUpload}>Upload</button>

        {message && (
          <p>
            <strong>{message}</strong>
          </p>
        )}
      </div>

      {/* Class Selection Card */}
      <div className="uploadCard">
        <h2>Select Class</h2>

        <select value={selectedClass} onChange={handleClassChange}>
          <option value="">-- Select Class --</option>
          <option value="4">Class 4</option>
          <option value="5">Class 5</option>
          <option value="6">Class 6</option>
        </select>

        <button onClick={fetchStudents} style={{ marginTop: "10px" }}>
          Get Students
        </button>
      </div>

      {/* Student Table */}
      {students.length > 0 && (
        <div style={{ width: "95%", margin: "20px auto", overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>FA</th>
                <th>Parent Review</th>
                <th>Teacher Review</th>
                <th>Submit</th>
              </tr>
            </thead>

            <tbody>
              {students.map((stu) =>
                ["FA1", "FA2", "FA3", "FA4"].map((fa) => (
                  <tr key={stu._id + "-" + fa}>
                    {fa === "FA1" && (
                      <>
                        <td rowSpan={4}>{stu.studentName}</td>
                        <td rowSpan={4}>{stu.rollNumber}</td>
                      </>
                    )}

                    <td>{fa}</td>
                    <td>{stu[fa]?.parentReview || "-"}</td>

                    <td>
                      <textarea
                        value={teacherReviews[stu._id + "-" + fa] || ""}
                        onChange={(e) =>
                          handleReviewChange(stu._id, fa, e.target.value)
                        }
                      />
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          submitTeacherReview(stu._id, fa)
                        }
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ExcelUpload;
