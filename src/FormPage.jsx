import React, { useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function FormPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize state with location.state if available
  const [userInfo, setUserInfo] = useState(
    location.state?.userInfo || {
      firstName: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
    }
  );
  const [prompts, setPrompts] = useState(location.state?.prompts || [
    { prompt: '', answer: '', timestamp: new Date().getTime() },
  ]);
  const [isEditing, setIsEditing] = useState(location.state?.isEditing ?? true);

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
      { prompt: '', answer: '', timestamp: new Date().getTime() },
    ]);
  };

  const handleDelete = (index) => {
    const updatedPrompts = prompts.filter((_, i) => i !== index);
    setPrompts(updatedPrompts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.firstName || !userInfo.lastname || !userInfo.email) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsEditing(false);
    navigate('/display', { state: { userInfo, prompts } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={!isEditing}>
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInput}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleInput}
            placeholder="Last Name"
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInput}
            placeholder="Email"
          />
        </fieldset>

        <fieldset>
          {prompts.map((prompt, index) => (
            <div key={prompt.timestamp}>
              <input
                type="text"
                name="prompt"
                value={prompt.prompt}
                onChange={(e) => handlePrompt(e, index)}
                placeholder="Prompt"
                disabled={!isEditing}
              />
              <textarea
                name="answer"
                value={prompt.answer}
                onChange={(e) => handlePrompt(e, index)}
                placeholder="Answer"
                disabled={!isEditing}
              />
              {isEditing && (
                <button type="button" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              )}
            </div>
          ))}
          {isEditing && <button type="button" onClick={handleAddPrompt}>Add Prompt</button>}
        </fieldset>

        {isEditing ? (
          <button type="submit">Save and Continue</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </form>
    </div>
  );
}

export default FormPage;
