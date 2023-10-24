import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './styles.css';
import Markdown from 'react-markdown';

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
    const [socialMediaOutput, setSocialMediaOutput] = useState('');

    const lottiePlayer = useRef(null);

    const handleInputChange = (newData) => {
        setError(null);
        setInputData(newData);
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
    const generateSocialPost = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onSocial", {
                article: output // Assuming the API needs the article content to generate the social post
            });
            setSocialMediaOutput(response.data);
        } catch (err) {
            console.error("Error generating social media post:", err);
            setError("An error occurred while generating the social media post.");
        } finally {
            setLoading(false);
        }
    };
    
    
    function SocialOutputSection({ socialMediaOutput, generateSocialPost, loading }) {
        return (
            <div className="social-output-section">
                {socialMediaOutput ? (
                    <>
                        <Markdown>{socialMediaOutput}</Markdown>
                        <button onClick={() => navigator.clipboard.writeText(socialMediaOutput)} disabled={loading}>Copy Social Post</button>
                    </>
                ) : (
                    <button onClick={generateSocialPost} disabled={loading}>Generate Social Post</button>
                )}
            </div>
        );
    }
    
    const InputSection = React.memo(({ handleInputChange, fetchData, error, loading }) => {

        const [localInputData, setLocalInputData] = useState(inputData);
    
        const handleLocalInputChange = (e) => {
            const { name, value } = e.target;
            const newData = { ...localInputData, [name]: value };
            setLocalInputData(newData);
        };
        
    const handleGenerateClick = () => {
    console.log("localInputData on Generate:", localInputData);
    fetchData(localInputData);
}
    
        return (
         
            <div className="input-section">
            
                <div>
                    <label>Focus Keyword <span className="required">*</span></label>
                    <input 
                        name="focusKeyword"
                        value={localInputData.focusKeyword}
    onChange={handleLocalInputChange}
    disabled={loading}
                    />
                </div>
                <div>
                    <label>Content Context (Optional)</label>
                    <input 
                        name="contentContext"
                        value={localInputData.contentContext}
                        onChange={handleLocalInputChange}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Desired Sentiment</label>
                    <select name="desiredSentiment" value={localInputData.desiredSentiment} onChange={handleLocalInputChange} disabled={loading}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                    </select>
                </div>
                <div>
                    <label>Power Word</label>
                    <select name="powerWordType"  value={localInputData.powerWordType} 
    onChange={handleLocalInputChange} 
    disabled={loading}>
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
                    <select name="includeNumber" value={localInputData.includeNumber} onChange={handleLocalInputChange} disabled={loading}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                
         
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleGenerateClick} disabled={loading}>Generate</button>
            </div>
            </div>
        );
    });
    
    

    
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
            <Markdown>{output}</Markdown>
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

    const fetchData = async (dataToFetch) => {
        if (!dataToFetch.focusKeyword) {
            setError("Please provide a focus keyword!");
            return;
        }
        setLoading(true);
        console.log(dataToFetch)
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onTitle", {
                ...dataToFetch
            });
            console.log(response)
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
        <div className="output-view">
            {title && (
                <div className="title-section">
                    <h2>{title}</h2>
                    <button onClick={fetchArticle} disabled={loading}>Generate Article</button>
                </div>
            )}
            {output && (
                <div className="output-section">
                    <Markdown>{output}</Markdown>
                    <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>Copy Article</button>
                    <button onClick={generateSocialPost} disabled={loading}>Generate Social Post</button>
                </div>
            )}
            {socialMediaOutput && (
                <div className="social-output-section">
                    <Markdown>{socialMediaOutput}</Markdown>
                    <button onClick={() => navigator.clipboard.writeText(socialMediaOutput)} disabled={loading}>Copy Social Post</button>
                </div>
            )}
        </div>
    </div>
);
    }
    

    


export default ArticleGenerator;
