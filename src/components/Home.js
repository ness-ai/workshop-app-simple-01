import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ models }) => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-8">NESS-WORKSHOP-TOOL</h1>
      <nav className="flex flex-wrap justify-center gap-4 mb-8">
        {models.map((model) => (
          <Link
            key={model.modelName}
            to={`/${model.modelName}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {model.modelName}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Home;