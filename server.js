const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 5000;
const DATA_FILE = "projects.json";

app.use(express.json());
app.use(cors());

// Read projects from file
const readProjects = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
};

// Write projects to file
const writeProjects = (projects) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2));
};

// Get all projects
app.get("/projects", (req, res) => {
  res.json(readProjects());
});

// Add a new project
app.post("/projects", (req, res) => {
  const projects = readProjects();
  const newProject = {
    id: Date.now().toString(),
    name: req.body.name,
    description: req.body.description,
  };
  projects.push(newProject);
  writeProjects(projects); 
  res.json(newProject);
});

// Delete a project
app.delete("/projects/:id", (req, res) => {
  let projects = readProjects();
  projects = projects.filter((p) => p.id !== req.params.id);
  writeProjects(projects);
  res.json({ message: "Project deleted" });
});

// Reorder projects
app.put("/projects/reorder", (req, res) => {
  writeProjects(req.body);
  res.json({ message: "Projects reordered" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
