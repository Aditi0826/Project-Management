// src/components/ProjectList.js

import React, { useState } from "react";
import "./ProjectList.css";

const ProjectList = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project A", description: "Build a React App" },
    { id: 2, name: "Project B", description: "Implement Backend API" },
    { id: 3, name: "Project C", description: "UI/UX Improvements" },
  ]);

  // Function to add a new project
  const addProject = () => {
    const name = prompt("Enter project name:");
    if (!name) return;

    const description = prompt("Enter project description:");
    if (!description) return;

    const newProject = {
      id: projects.length + 1,
      name,
      description
    };

    setProjects([...projects, newProject]);
  };

  // Function to delete a project
  const deleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  return (
    <div className="project-list-container">
      <h2 className="header">Project List</h2>
      
      <button className="add-btn" onClick={addProject}>
        Add New Project
      </button>

      {projects.map((project) => (
        <div key={project.id} className="project">
          <h3 className="project-title">{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-actions">
            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
