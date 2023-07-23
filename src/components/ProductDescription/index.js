import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

function ProductDescription() {
    const [inputData, setInputData] = useState({
        productNames: [''],
        productDescription: '',
        productTags: '',
        language: '',
        tone: '',
        outputLength: ''
    });
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const lottiePlayer = useRef(null);

    const handleInputChange = (e, index) => {
        setError(null);
        const { name, value } = e.target;

        if (name === "productNames") {
            const newProductNames = [...inputData.productNames];
            newProductNames[index] = value;
            setInputData((prevData) => ({ ...prevData, productNames: newProductNames }));
        } else {
            setInputData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    useEffect(() => {
        if (loading && lottiePlayer.current) {
            lottiePlayer.current.play();
        } else if (lottiePlayer.current) {
            lottiePlayer.current.pause();
        }
    }, [loading]);

    const fetchData = async () => {
      const { productNames, productTags, language, tone,outputLength } = inputData;

        // Mocking a simple API call and response
        if (!inputData.productNames.some(name => name) && !inputData.productDescription) {
            setError("Please provide at least one product name or a description!");
            return;
        }
        setLoading(true);

        try {
            // Mock API call
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
                requestType: "productDescr",
                data: inputData
            });
            setOutput(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while generating the product description.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ProductDescription">
            {loading && (
                <div className="loading-overlay">
                    <Player
                        ref={lottiePlayer}
                        autoplay={true}
                        loop={true}
                        controls={true}
                        src="https://raw.githubusercontent.com/ra1111/shopifyreact/main/animation_lkey1cvo.json"
                        style={{ height: '900px', width: '900px' }}
                    />
                </div>
            )}

            <div className="input-side">
                {inputData.productNames.map((name, index) => (
                    <div key={index}>
                        <label>Product Name {index + 1}</label>
                        <input 
                            name="productNames"
                            value={name}
                            onChange={(e) => handleInputChange(e, index)}
                            disabled={loading}
                        />
                    </div>
                ))}

                <label>Product Description</label>
                <textarea 
                    name="productDescription"
                    value={inputData.productDescription}
                    onChange={handleInputChange}
                    disabled={loading}
                    rows="5"
                />

                <label>Product Tags (CSV)</label>
                <input
                    name="productTags"
                    value={inputData.productTags}
                    onChange={handleInputChange}
                    disabled={loading}
                />

                <label>Language</label>
                <select name="language" value={inputData.language} onChange={handleInputChange} disabled={loading}>
                    <option value="en">English</option>
                    {/* ... */}
                </select>

                <label>Tone</label>
                <select name="tone" value={inputData.tone} onChange={handleInputChange} disabled={loading}>
                    <option value="formal">Formal</option>
                    {/* ... */}
                </select>

                <label>Output Length</label>
                <select name="outputLength" value={inputData.outputLength} onChange={handleInputChange} disabled={loading}>
                    <option value="short">Short</option>
                    {/* ... */}
                </select>

                {error && <div className="error-message">{error}</div>}
                <button onClick={fetchData} disabled={loading}>Write</button>
            </div>

            <div className="output-side">
                <textarea readOnly style={{ height: '80%' }} value={output} />
                <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>
                    Copy Output
                </button>
            </div>
        </div>
    );
}

export default ProductDescription;
