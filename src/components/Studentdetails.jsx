import React, { useEffect, useState } from "react";
import axios from "axios";

function Studentdetails() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Temporary state for parent reviews
  const [parentReviews, setParentReviews] = useState({
    FA1: "",
    FA2: "",
    FA3: "",
    FA4: ""
  });

  useEffect(() => {
    const rollNumber = localStorage.getItem("user");

    if (!rollNumber) {
      setMsg("No user logged in");
      setLoading(false);
      return;
    }

    async function fetchReviews() {
      try {
        const res = await axios.get(`http://localhost:5000/student/${rollNumber}`);

        if (res.data.success) {
          setStudent(res.data.student);

          // Pre-fill existing parent reviews if already submitted
          setParentReviews({
            FA1: res.data.student.FA1?.parentReview || "",
            FA2: res.data.student.FA2?.parentReview || "",
            FA3: res.data.student.FA3?.parentReview || "",
            FA4: res.data.student.FA4?.parentReview || ""
          });

        } else {
          setMsg(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setMsg("Server error");
      }

      setLoading(false);
    }

    fetchReviews();
  }, []);

  const handleChange = (fa, value) => {
    setParentReviews({ ...parentReviews, [fa]: value });
  };

  const submitParentReview = async (fa) => {
    if (!parentReviews[fa]) {
      alert(`Please enter review for ${fa}`);
      return;
    }

    try {
      const res = await axios.put("http://localhost:5000/parent-review", {
        rollNumber: student.rollNumber,
        fa,
        parentReview: parentReviews[fa]
      });

      if (res.data.success) {
        alert(`${fa} parent review saved ✅`);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (msg) return <h2>{msg}</h2>;

  return (
    <div style={{ padding: "20px" }}>

      {student &&
        [student].map((stu) => (
          <div key={stu.rollNumber}>
            <h1>Name: {stu.studentName}</h1>
            <h1>Roll Number: {stu.rollNumber}</h1>
            <h1>Class: {stu.class}</h1>
          </div>
        ))
      }
      {student && (
        <table
          border="1"
          cellPadding="10"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>FA</th>
              <th>Teacher Review</th>
              <th>Parent Review</th>
              <th>Submit</th>
            </tr>
          </thead>

          <tbody>
            {["FA1", "FA2", "FA3", "FA4"].map((fa) => (
              <tr key={fa}>
                <td>{fa}</td>
                <td>{student[fa]?.teacherReview || "-"}</td>

                <td>
                  <textarea
                    rows="2"
                    cols="30"
                    value={parentReviews[fa]}
                    onChange={(e) => handleChange(fa, e.target.value)}
                  />
                </td>

                <td>
                  <button onClick={() => submitParentReview(fa)}>
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Studentdetails;
