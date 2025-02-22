import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([
    { id: "1", name: "Website Redesign", description: "Improve UI/UX of the company website" },
    { id: "2", name: "Mobile App Development", description: "Build an iOS and Android app" },
    { id: "3", name: "Marketing Campaign", description: "Launch a social media ad campaign" }
  ]);

  const handleAddProject = () => {
    const name = prompt("Enter Project Name:");
    const description = prompt("Enter Project Description:");
    if (name && description) {
      setProjects([...projects, { id: Date.now().toString(), name, description }]);
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updatedProjects = [...projects];
    const [reorderedItem] = updatedProjects.splice(result.source.index, 1);
    updatedProjects.splice(result.destination.index, 0, reorderedItem);
    setProjects(updatedProjects);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Project Management</h1>
      </header>

      <button className="add-project-btn" onClick={handleAddProject}>
        + Add New Project
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div className="project-list" ref={provided.innerRef} {...provided.droppableProps}>
              {projects.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index}>
                  {(provided) => (
                    <div
                      className="project-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h2>{project.name}</h2>
                      <p>{project.description}</p>
                      <button className="delete-btn" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default App;
