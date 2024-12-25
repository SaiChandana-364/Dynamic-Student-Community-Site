import React, { useState, useRef } from 'react';
import axios from 'axios'; 
// import { useNavigate } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import Header from '../components/header';

const CreatePost = () => {
  const [selectedCategory, setSelectedCategory] = useState('Select category');
  const [pollOptions, setPollOptions] = useState([]);
  const [desc, setDesc] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [descError, setDescError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCategoryError(''); // Clear any previous category error
    if (event.target.value !== '2') {
      setPollOptions([]);
    }
  };

  const handleAddOption = (event) => {
    event.preventDefault();

    const newOption = inputRef.current.value.trim();

    if (newOption) {
      setPollOptions([...pollOptions, newOption]);
    }

    inputRef.current.value = '';
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...pollOptions];
    updatedOptions.splice(index, 1);
    setPollOptions(updatedOptions);
  };

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    // Clear previous messages
    setDescError('');
    setCategoryError('');
    setSuccessMessage('');

    let hasError = false;

    // Validation
    let options = '';
    let values = '';

    if (selectedCategory === '2') {
      options = pollOptions.join(',');
      values = '0'.repeat(pollOptions.length);
    }

    const post = {
      type: selectedCategory,
      content: desc.trim(),
      time: "",
      likes: '0',
      comments: '0',
      options,
      values,
    };

    try {
      const response = await axios.post('http://localhost:8080/create', post);
      console.log('Post created successfully:', response.data);

      setSuccessMessage('Post created successfully!'); // Show success message
      setDesc(''); // Clear the form fields
      setSelectedCategory('Select category');
      setPollOptions([]);
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle errors
    }
  };

  return (
    <>
      <Header/>
      <div className="container-fluid">
        <div className="row">
          <div className="mid-col" style={{ padding: '20px' }}>
            <h3 style={{ padding: '0px 0px 20px 48px' }}>Create Your Post</h3>
            <form onSubmit={handlePostSubmit}>
              <div className="mb-3 px-5 py-2">
                <textarea
                  className="form-control custom-placeholder"
                  placeholder="What's on your mind today?"
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)}
                />
                {descError && <small className="text-danger">{descError}</small>}
              </div>
              <div className="mb-3 px-5 py-2">
                <select className="form-select" value={selectedCategory} onChange={handleCategoryChange}>
                  <option>Select category</option>
                  <option value="1">Announcements</option>
                  <option value="2">Polls</option>
                  <option value="3">Academic Resources</option>
                  <option value="4">General</option>
                  <option value="5">Complaints</option>
                </select>
                {categoryError && <small className="text-danger">{categoryError}</small>}
              </div>
              {selectedCategory === '2' && (
                <div className="poll-section mb-3 px-5">
                  <input type='text' className="pollOpt" placeholder='Write poll option here' ref={inputRef} style={{ width: "100%" }} /><br /><br />
                  <button className='add-option post-btn' onClick={handleAddOption}>
                    Add poll option
                  </button><br/><br/>
                  <ul className="list-group">
                    {pollOptions.map((option, index) => (
                      <li key={index} className="list-group-item col-md-6 d-flex justify-content-between align-items-center">
                        {option}
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveOption(index)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-3 px-5 post-div">
                <button onClick={handlePostSubmit} className="post-btn mx-auto" type="button">
                  Post
                </button><br/><br/>
                {successMessage && <small className="text-success">{successMessage}</small>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
