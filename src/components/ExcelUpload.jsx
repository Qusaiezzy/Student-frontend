import React, { useState } from "react";

const ExcelUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an Excel file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("http://localhost:5000/upload-excel", {
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

  return (
    <div style={{
      width: "400px",
      margin: "50px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px"
    }}>
      <h2>Upload Excel File</h2>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
      />

      <br /><br />

      {file && <p>Selected File: <strong>{file.name}</strong></p>}

      <button onClick={handleUpload}>Upload</button>

      <br /><br />
      {message && <p><strong>{message}</strong></p>}
    </div>
  );
};

export default ExcelUpload;
