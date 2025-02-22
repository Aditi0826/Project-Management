import React from 'react';
import './AddProject.css';

const AddProject = ({ onAdd }) => {
  return (
    <button className="add-project-btn" onClick={onAdd}>
      Add New Project
    </button>
  );
};

export default AddProject;
