import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './styles.css';

function ArticleGenerator() {
    const [inputData, setInputData] = useState({
        focusKeyword: '',
        contentContext: '',
        desiredSentiment: 'Positive',
        powerWordType: 'Greed and FOMO',
        includeNumber: 'Yes'
    });
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const lottiePlayer = useRef(null);

    const handleInputChange = (e) => {
        setError(null);
        const { name, value } = e.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    };


    useEffect(() => {
        if (loading && lottiePlayer.current) {
            lottiePlayer.current.play();
        } else if (lottiePlayer.current) {
            lottiePlayer.current.pause();
        }
    }, [loading]);
    const fetchArticle = async () => {
        setLoading(true);

        try {
            const response = await axios.post("https://console.cloud.google.com/functions/details/us-central1/onArticle", {
                title: title  // Send the title as payload to the API
            });
            setOutput(response.data);  // assuming response.data is the article
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while generating the article.");
        } finally {
            setLoading(false);
        }
    };
    const fetchData = async () => {
        if (!inputData.focusKeyword) {
            setError("Please provide a focus keyword!");
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post("https://console.cloud.google.com/functions/details/us-central1/onTitle", {
                ...inputData
            });
            setOutput(response.data);
            setTitle(response.data); 
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while generating the article title.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ArticleGenerator">
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
                <div>
                    <label>Focus Keyword <span className="required">*</span></label>
                    <input 
                        name="focusKeyword"
                        value={inputData.focusKeyword}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Content Context (Optional)</label>
                    <input 
                        name="contentContext"
                        value={inputData.contentContext}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                </div>
                {/* Add other input fields similarly ... */}
                <div>
                    <label>Desired Sentiment</label>
                    <select name="desiredSentiment" value={inputData.desiredSentiment} onChange={handleInputChange} disabled={loading}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                        {/* ... */}
                    </select>
                </div>
                <div>
    <label>Power Word</label>
    <select name="powerWordType" value={inputData.powerWordType} onChange={handleInputChange} disabled={loading}>
        <option value="Greed and FOMO">Greed and FOMO</option>
        <option value="Curiosity">Curiosity</option>
        <option value="Ease and Convenience">Ease and Convenience</option>
        <option value="Desire and Lust">Desire and Lust</option>
        <option value="Vanity and Bragging">Vanity and Bragging</option>
        <option value="Trust">Trust</option>
        <option value="Anger">Anger</option>
        <option value="Fear">Fear</option>
    </select>
</div>

                <div>
                    <label>Include Number</label>
                    <select name="includeNumber" value={inputData.includeNumber} onChange={handleInputChange} disabled={loading}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                {error && <div className="error-message">{error}</div>}
                <button onClick={fetchData} disabled={loading}>Generate</button>
            </div>

            <div className="output-side">
                <textarea readOnly style={{ height: '80%' }} value={output} />
                <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>
                    Copy Output
                </button>
            </div>
            {title && (
                <div className="title-section">
                    <h2>Generated Title:</h2>
                    <p>{title}</p>
                    <button onClick={fetchArticle} disabled={loading}>
                        Generate Article
                    </button>
                </div>
            )}

            {output && (
                <div className="output-section">
                    <h2>Generated Article:</h2>
                    <textarea readOnly value={output} style={{ height: '80%' }} />
                    <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>
                        Copy Article
                    </button>
                </div>
            )}
        </div>
    );
}

export default ArticleGenerator;
