import React, { useState } from 'react';

const ImageGenerationPage = ({ model }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/.netlify/functions/replicateProxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, model }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const output = await response.json();
      console.log(output);
      
      if (Array.isArray(output) && output.length > 0) {
        setGeneratedImage(output[0]);
      } else {
        setError("Unexpected output format from the API");
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.message || "An error occurred while generating the image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `${model.modelName}-generated-image.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{model.modelName}</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={generateImage}
        disabled={isLoading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {generatedImage && (
        <div>
          <img src={generatedImage} alt="Generated" className="w-full mb-4" />
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGenerationPage;