import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

function ProductNameGenerator() {
    const [inputData, setInputData] = useState({
        productDescription: '',
        productKeywords: '',
        tone: '',
        outputLength: ''
    });
    const [outputData, setOutputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const lottiePlayer = useRef(null);

    const handleInputChange = (e) => {
        setError(null);
        const { name, value } = e.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    };

    const LottiePlayerComponent = React.forwardRef((props, ref) => {
        return (
            <Player
                ref={ref}
                autoplay={true}
                loop={true}
                controls={true}
                src="https://raw.githubusercontent.com/ra1111/shopifyreact/main/animation_lkey1cvo.json"
                style={{ height: '900px', width: '900px' }}
            ></Player>
        );
    });

    useEffect(() => {
        if (loading && lottiePlayer.current) {
            lottiePlayer.current.play();
        } else if (lottiePlayer.current) {
            lottiePlayer.current.pause();
        }
    }, [loading]);

    const generateProductName = async () => {
        const { productName, productKeywords, productDescription,tone,outputLength } = inputData;
        if (!productName && !productKeywords  && !productDescription) {
            setError("Please ensure at least one field is filled!");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
                requestType: "productName",
             data:inputData
            });

            setOutputText(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while improving text.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="ProductNameGenerator">
            {loading && (
                <div className="loading-overlay">
                    <LottiePlayerComponent ref={lottiePlayer} />
                </div>
            )}

            <div className="input-side">
                <label>Product Description</label>
                <input 
                    type="text" 
                    name="productDescription" 
                    value={inputData.productDescription} 
                    onChange={handleInputChange}
                    disabled={loading}
                />
                <label>Product Keywords</label>
                <input 
                    type="text" 
                    name="productKeywords" 
                    value={inputData.productKeywords} 
                    onChange={handleInputChange}
                    disabled={loading}
                />
                <label>Tone of Language</label>
                <select 
                    name="tone" 
                    value={inputData.tone} 
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    {/* Add more tones as needed */}
                </select>
                <label>Output Length</label>
                <select 
                    name="outputLength" 
                    value={inputData.outputLength} 
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                </select>
                {error && <div className="error-message">{error}</div>}
                <button onClick={generateProductName} disabled={loading}>Generate</button>
            </div>
            
            <div className="output-side">
                <textarea readOnly value={outputData}></textarea>
                <button onClick={() => navigator.clipboard.writeText(outputData)} disabled={loading}>Copy</button>
            </div>
        </div>
    );
}

export default ProductNameGenerator;
