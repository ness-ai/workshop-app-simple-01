import React, { useState, useRef, useEffect } from 'react';
import { FiArrowRight } from "react-icons/fi";

const ImageGenerationPage = ({ model }) => {
    const [prompt, setPrompt] = useState('');
    const [generatedImages, setGeneratedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const textareaRef = useRef(null);
  
    const generateImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/.netlify/functions/replicateProxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt, model, num_outputs: 2 }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate images');
        }
  
        const output = await response.json();
        console.log('API response:', output);
  
        if (Array.isArray(output) && output.length >= 2) {
          setGeneratedImages(output.slice(0, 2));
        } else if (typeof output === 'object' && output.output && Array.isArray(output.output)) {
          setGeneratedImages(output.output.slice(0, 2));
        } else {
          throw new Error("Unexpected output format from the API");
        }
      } catch (err) {
        console.error('Error generating images:', err);
        setError(err.message || "An error occurred while generating the images");
      } finally {
        setIsLoading(false);
      }
    };

    const autoResize = () => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
      };
    
      useEffect(() => {
        autoResize();
      }, [prompt]);



  const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        background: '#ADB0B9',
        color: 'black',
        
    },
    mainContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: '0px 20%',
        boxSizing: 'border-box',
        gap: '2rem'
    },
    imageContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: '0',
        justifyContent: 'center',
        width: '100%',
        gap: '2rem'
    },
    imagePlaceholder: {
        flexGrow: '1',
        aspectRatio: '1/1',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '0.6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888',
        fontSize: '14px',
      },
      image: {
        width: '300px',
        height: '300px',
        objectFit: 'cover',
        border: '1px solid #ddd',
        borderRadius: '4px',
      },
    promptContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        height: 'auto',
        position: 'relative'
    },
    promptBox:{
        width: '100%',
        maxHeight: '200px', 
        padding: '1rem',
        paddingBottom: '0',
        paddingRight: '50px',
        borderRadius: '0.6rem',
        border: '1px solid #ccc',
        resize: 'none', 
        fontFamily: 'inherit',
        fontSize: '1.5rem',
        lineHeight: '2rem', 
        overflow: 'hidden', 
        transition: 'height 0.2s ease', 
    },
    button: {
        position: 'absolute',
        right: '10px',
        paddingLeft: '5px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 'auto',
        height: '90%',
        backgroundColor: 'white',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        borderRadius: '50%'
      },
    fotter: {
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: '#C8FC04',
        padding: '1rem',
    },
    h4Style:{
        margin: '0',
        fontWeight: '400'
    }

  };


  return (
    <div style={styles.container}>
        <div style={styles.mainContainer}>
            <div style={styles.imageContainer}>
            {[0, 1].map((index) => (
          <div key={index} style={styles.imagePlaceholder}>
            {generatedImages[index] ? (
              <img src={generatedImages[index]} alt={`Generated ${index + 1}`} style={styles.image} />
            ) : (
              isLoading ? "Generating..." : "Image"
            )}
          </div>
        ))}
            </div>
            <div style={styles.promptContainer}>
                <textarea
                    value={prompt}
                    ref={textareaRef}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="prompt"
                    style={styles.promptBox}
                    rows={1}
                    />
                    
                <button
                    onClick={generateImages}
                    disabled={isLoading}
                    style={styles.button}
                    >
                    <FiArrowRight size={30} color={isLoading ? "#ccc" : "#333"} />
                </button>
            </div>
        </div>
        <div style={styles.fotter}>
            <h4 style={styles.h4Style}>{model.modelName}</h4>
            <h4 style={styles.h4Style}>NESS WORKSHOP APP</h4>
        </div>
    </div>

  );

  
};

export default ImageGenerationPage;