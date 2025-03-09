import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './App.css';

const App = () => {
  const [projects, setProjects] = useState([
    { id: "1", name: "Website Redesign", description: "Improve UI/UX of the company website", status: "In Progress", comments: "", dueDate: "2025-03-20", files: [], archived: false },
    { id: "2", name: "Mobile App Development", description: "Build an iOS and Android app", status: "Not Started", comments: "", dueDate: "2025-04-15", files: [], archived: false },
    { id: "3", name: "Marketing Campaign", description: "Launch a social media ad campaign", status: "Completed", comments: "", dueDate: "2025-05-10", files: [], archived: false }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showArchive, setShowArchive] = useState(false);

  const handleAddProject = () => {
    const name = prompt("Enter Project Name:");
    if (!name) return;
    const description = prompt("Enter Project Description:");
    if (description) {
      setProjects([...projects, { id: Date.now().toString(), name, description, status: "Not Started", comments: "", dueDate: "", files: [], archived: false }]);
    }
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const handleArchiveProject = (id) => {
    setProjects(projects.map((project) =>
      project.id === id ? { ...project, archived: !project.archived } : project
    ));
  };

  const handleFileUpload = (id, newFiles) => {
    setProjects(projects.map((project) =>
      project.id === id ? { ...project, files: [...project.files, ...newFiles] } : project
    ));
  };

  const handleFileDelete = (projectId, fileIndex) => {
    setProjects(projects.map((project) =>
      project.id === projectId
        ? { ...project, files: project.files.filter((_, index) => index !== fileIndex) }
        : project
    ));
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) && !project.archived
  );

  const archivedProjects = projects.filter(project => project.archived);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Project Management</h1>
      </header>

      <div className="control-panel">
        <input
          type="text"
          className="search-bar"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-project-btn" onClick={handleAddProject}>
          + Add New Project
        </button>
        <button className="archive-btn" onClick={() => setShowArchive(true)}>
          Archive
        </button>
      </div>

      {showArchive && (
        <div className="modal-overlay" onClick={() => setShowArchive(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Archived Projects</h2>
            {archivedProjects.length === 0 ? (
              <p>No archived projects</p>
            ) : (
              archivedProjects.map(project => (
                <div key={project.id} className="project-card">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-actions">
                    <button
                      className="unarchive-btn"
                      onClick={() => handleArchiveProject(project.id)}
                    >
                      Unarchive
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div className="project-list" ref={provided.innerRef} {...provided.droppableProps}>
              {filteredProjects.map((project, index) => (
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

                      <div className="project-actions">
                        <select
                          value={project.status}
                          onChange={(e) =>
                            setProjects(projects.map(p =>
                              p.id === project.id ? { ...p, status: e.target.value } : p
                            ))
                          }
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>

                        <input
                          type="date"
                          value={project.dueDate}
                          onChange={(e) =>
                            setProjects(projects.map(p =>
                              p.id === project.id ? { ...p, dueDate: e.target.value } : p
                            ))
                          }
                        />

                        <button className="delete-btn" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                        <button className="archive-btn" onClick={() => handleArchiveProject(project.id)}>
                          {project.archived ? "Unarchive" : "Archive"}
                        </button>
                      </div>

                      <div className="file-attachments">
                        <input
                          type="file"
                          multiple
                          onChange={(e) =>
                            handleFileUpload(project.id, Array.from(e.target.files))
                          }
                        />
                        {project.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="file-item">
                            {file.name}
                            <button
                              className="delete-file-btn"
                              onClick={() => handleFileDelete(project.id, fileIndex)}
                            >
                              ✖
                            </button>
                          </div>
                        ))}
                      </div>
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
