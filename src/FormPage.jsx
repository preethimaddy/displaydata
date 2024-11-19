import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormPage() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastname: "",
    email: "",
    dob: "",
    gender: "",
  });

  const [prompts, setPrompts] = useState([
    { prompt: "", answer: "", timestamp: new Date().getTime() },
  ]);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePrompt = (e, index) => {
    const { name, value } = e.target;
    const updatedPrompts = prompts.map((prompt, i) =>
      i === index ? { ...prompt, [name]: value } : prompt
    );
    setPrompts(updatedPrompts);
  };

  const handleAddPrompt = () => {
    setPrompts([
      ...prompts,
      { prompt: "", answer: "", timestamp: new Date().getTime() },
    ]);
  };

  const handleDelete = (index) => {
    const updatedPrompts = prompts.filter((_, i) => i !== index);
    setPrompts(updatedPrompts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.firstName || !userInfo.lastname || !userInfo.email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Navigate to display page and pass state
    navigate("/display", { state: { userInfo, prompts } });
  };

  return (
    <>
    <div className="container mt-4">
      <h1 className="text-center mb-4">React Bootstrap Form</h1>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        {/* User Info Section */}
        <fieldset className="mb-4">
          <legend className="text-primary mb-3">About You</legend>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              className="form-control"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
              className="form-control"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="form-control"
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              max="2024-11-27"
              className="form-control"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="form-select"
              onChange={handleInput}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        
      {/* Prompts Section */}
      {prompts.map((prompt, i) => (
        <div key={prompt.timestamp}>
          <select
            name="prompt"
            onChange={(e) => handlePrompt(e, i)}
          >
            <option>Select Prompt</option>
            <option value="prompt1">Prompt 1</option>
            <option value="prompt2">Prompt 2</option>
          </select>
          <textarea
            name="answer"
            placeholder="Answer"
            onChange={(e) => handlePrompt(e, i)}
          />
          <button type="button" className='del' onClick={() => handleDelete(i)}>
            Delete
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddPrompt}>
        Add Prompt
      </button>
      <button  className ="sub" type="submit">Submit</button>
      </fieldset>
    </form>
    
    </div>
    </>

  );
}

export default FormPage;