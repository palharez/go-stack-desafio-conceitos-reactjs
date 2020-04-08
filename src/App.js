import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);
  
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": "Umbriey",
      "techs": [
        "Node",
        "Express",
        "TypeScript"
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filteredRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(filteredRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(respository => (
          <li key={respository.id}>
            {respository.title}
            <button onClick={() => handleRemoveRepository(respository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
