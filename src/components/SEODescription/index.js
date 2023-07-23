import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

function SEODescriptionGenerator() {
    const [inputData, setInputData] = useState({
        productName: '',
        productDescription: '',
        productKeywords: '',
        languageTone: '',
        outputLength: ''
    });
    const [output, setOutput] = useState('');
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

    const handleGenerate = async () => {
        const { productName, productKeywords,productDescription,languageTone,outputLength } = inputData;

        if (!productName && !productKeywords&& !productDescription) {
            setError("Please ensure the product name or keywords or description is provided!");
            return;
        }
        setLoading(true);

        try {
            // Mock API call
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
                requestType: "seoDescription",
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
        <div className="SEODescriptionGenerator">
            {loading && (
                <div className="loading-overlay">
                    <LottiePlayerComponent ref={lottiePlayer} />
                </div>
            )}

            <div className="input-side">
                <label>Product Name</label>
                <input
                    type="text"
                    name="productName"
                    value={inputData.productName}
                    onChange={handleInputChange}
                    disabled={loading}
                />

                <label>Product Description</label>
                <textarea
                    name="productDescription"
                    rows="10"
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

                <label>Language Tone</label>
                <select
                    name="languageTone"
                    value={inputData.languageTone}
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
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
                <button onClick={handleGenerate} disabled={loading}>Generate Title</button>
            </div>

            <div className="output-side">
                <textarea readOnly value={output} />
                <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>
                    Copy Output
                </button>
            </div>
        </div>
    );
}

export default SEODescriptionGenerator;
