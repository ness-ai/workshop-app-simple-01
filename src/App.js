import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ImageGenerationPage from './components/ImageGenerationPage';
import replicateConfig from './replicateConfig.json';

const App = () => {
  const { models } = replicateConfig;

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home models={models} />} />
          {models.map((model) => (
            <Route
              key={model.modelName}
              path={`/${model.modelName}`}
              element={<ImageGenerationPage model={model} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;