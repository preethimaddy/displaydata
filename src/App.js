import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './FormPage'; // Your form component
import DisplayPage from './DisplayPage'; // The page to display form data
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/display" element={<DisplayPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
