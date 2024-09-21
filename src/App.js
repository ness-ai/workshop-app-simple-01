import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ImageGenerationPage from './components/ImageGenerationPage';
import replicateConfig from './replicateConfig.json';

const App = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    setConfig(replicateConfig)
  },[])

  if (!config) {
    return <div>Loading...</div>;
  }

  console.log("setting", config);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home models={config.models} />} />
          {config.models.map((model) => (
            <Route
              key={model.modelName}
              path={`/${model.modelName}`}
              element={<ImageGenerationPage model={model} apiKey={config.apiKey} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;