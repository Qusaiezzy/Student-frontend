import './App.css';
import Navbar from './components/navbar';
import Tablecontent from './components/Tablecontent';
import Login from './components/Login';
import ExcelUpload from './components/ExcelUpload';
import Studentdetails from './components/Studentdetails';
function App() {
  return (
    <div className="App">
      
      {/* <Navbar /> */}
      {/* <Tablecontent /> */}
      <Login/>
      {/* <ExcelUpload/> */}
      <Studentdetails/>
    </div>
  );
}

export default App;
