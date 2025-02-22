import React from "react";

function ProjectCard({ project }) {
  return (
    <div style={styles.card}>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "5px",
    width: "250px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
};

export default ProjectCard;
