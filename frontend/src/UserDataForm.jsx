// src/UserDataForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserDataForm = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState(null);
  const [picture, setPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState(null);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const calculatedAge = calculateAge(dateOfBirth);
    setAge(calculatedAge);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('age', calculatedAge);
    formData.append('picture', picture);

    try {
      const response = await axios.post('http://127.0.0.1:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
    setPicturePreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="dateOfBirth">Date of Birth: </label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
      </div>
      <br />
      <div>
        <label htmlFor="picture">Picture:   </label>
        <input
          type="file"
          id="picture"
          name="picture"
          onChange={handlePictureChange}
          required
        />
        {picturePreview && <img src={picturePreview} alt="Preview" width="100" height="100" />}
      </div>
      <br />
      <div>
        <input type="submit" value="Submit" />
      </div>
      {age !== null && (
        <div>
          <h2>Calculated Age: {age}</h2>
        </div>
      )}
    </form>
  );
};

export default UserDataForm;
