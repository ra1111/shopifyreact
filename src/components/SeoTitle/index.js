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
    function LoadingOverlay({ src }) {
        return (
            <div className="loading-overlay">
                <Player
                    autoplay={true}
                    loop={true}
                    controls={true}
                    src={src}
                    style={{ height: '900px', width: '900px' }}
                />
            </div>
        );
    }
    
    function InputSection({ inputData, handleInputChange, fetchData, error, loading }) {
        return (
            <div className="input-section">
            
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
                <div>
                    <label>Desired Sentiment</label>
                    <select name="desiredSentiment" value={inputData.desiredSentiment} onChange={handleInputChange} disabled={loading}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
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
                
                {error && <div className="error-message">{error}</div>}
                <button onClick={fetchData} disabled={loading}>Generate</button>
            </div>
            </div>
        );
    }
    
    function TitleSection({ title, fetchArticle, loading }) {
        return (
            <div className="title-section">
                <h2>{title}</h2>
                <button onClick={fetchArticle} disabled={loading}>Generate Article</button>
            </div>
        );
    }
    
    function OutputSection({ output, loading }) {
        return (
            <div className="output-section">
                <textarea readOnly value={output} style={{ height: '200px' }} />
                <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>Copy Article</button>
            </div>
        );
    }
    
   
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
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onArticle", {
                title: title
            });
            setOutput(response.data);
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
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onTitle", {
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
    
                {loading && <LoadingOverlay src="https://raw.githubusercontent.com/ra1111/shopifyreact/main/animation_lkey1cvo.json" />}
    
                <InputSection 
                    inputData={inputData}
                    handleInputChange={handleInputChange}
                    fetchData={fetchData}
                    error={error}
                    loading={loading}
                />
    
                {title && <TitleSection title={title} fetchArticle={fetchArticle} loading={loading} />}
    
                {output && <OutputSection output={output} loading={loading} />}
    
            </div>
        );
    }
    

    


export default ArticleGenerator;
