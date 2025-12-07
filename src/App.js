import './App.css';
import Login from './components/Login';
import ExcelUpload from './components/ExcelUpload';
import { Routes, Route } from "react-router-dom";
import Studentdetails from './components/Studentdetails';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <ExcelUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/:roll"
          element={
            <ProtectedRoute>
              <Studentdetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
