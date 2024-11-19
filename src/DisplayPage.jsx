import React from 'react'
import { useLocation } from 'react-router-dom';
const DisplayPage = () => {
    const location = useLocation();
    const { userInfo, prompts } = location.state || {};
  
    if (!userInfo || !prompts) {
      return <p>No data to display</p>;
    }
  
  return (
    <div>
      <h1>User Information</h1>
      <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastname}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Date of Birth:</strong> {userInfo.dob}</p>
      <p><strong>Gender:</strong> {userInfo.gender}</p>

      <h2>Prompts</h2>
      {prompts.map((prompt, i) => (
        <div key={prompt.timestamp}>
          <p><strong>Prompt:</strong> {prompt.prompt}</p>
          <p><strong>Answer:</strong> {prompt.answer}</p>
        </div>
      ))}
    </div>
  )
}

export default DisplayPage