import React, { useState, useRef, useEffect } from 'react';
import { FiArrowRight, FiDownload } from "react-icons/fi";

const ImageGenerationPage = ({ model }) => {
    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const textareaRef = useRef(null);
  
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
    
      const handleDownload = async () => {
        if (generatedImage) {
          try {
            setIsLoading(true); // オプション: ダウンロード中はローディング状態にする
            
            // 画像をフェッチしてブロブとして取得
            const response = await fetch(generatedImage);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            
            // ブロブからオブジェクトURLを作成
            const url = window.URL.createObjectURL(blob);
            
            // リンク要素を作成し、クリックイベントをシミュレート
            const link = document.createElement('a');
            link.href = url;
            link.download = `${prompt}, ${model.modelTrigger}.png`;
            document.body.appendChild(link);
            link.click();
            
            // クリーンアップ
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Download failed:', error);
            setError('Failed to download the image. Please try again.'); // エラー状態を設定
          } finally {
            setIsLoading(false); // ローディング状態を解除
          }
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
        gap: '3rem'
    },
    imageContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexGrow: '0',
        justifyContent: 'center',
        width: '100%',
        gap: '2rem',
        position: 'relative'
    },
    imagePlaceholder: {
        flexGrow: '0',
        width: '50%',
        aspectRatio: '1/1',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '0.6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#888',
        fontSize: '14px',
        overflow: 'hidden'
      },
      image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
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
    },
    download:{
        position: 'absolute',
        right: '0',
        bottom: '0',
        width: '4rem',
        height: '4rem',
        backgroundColor: 'transparent',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',

    }

  };


  return (
    <div style={styles.container}>
        <div style={styles.mainContainer}>
            <div style={styles.imageContainer}>
                <div style={styles.imagePlaceholder}>
                    {generatedImage ? (
                        <img src={generatedImage} alt="Generated" style={styles.image} />
                    ) : (
                        isLoading ? "Generating..." : "Image"
                    )}
                </div>
                <button
                    onClick={handleDownload}
                    style={styles.download}
                >
                    <FiDownload size={30} color={"#333"} />
                </button>

            </div>
            {error && <div style={{color: 'red', textAlign: 'center'}}>{error}</div>}
            <div style={styles.promptContainer}>
                <textarea
                    value={prompt}
                    ref={textareaRef}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                    style={styles.promptBox}
                    rows={1}
                />
                <button
                    onClick={generateImage}
                    disabled={isLoading || !prompt.trim()}
                    style={{...styles.button, opacity: isLoading || !prompt.trim() ? 0.5 : 1}}
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