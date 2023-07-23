import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

function SocialPostGenerator() {
    const [inputData, setInputData] = useState({
        postContext: '',
        platform: 'Facebook',
        language: 'en',
        tone: 'formal',
        outputLength: 'short'
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
            />
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
        const { postContext } = inputData;
        if (!postContext) {
            setError("Please provide context for the post!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
                requestType: "ads",
                data: inputData
            });
            setOutput(response.data);
        } catch (err) {
            setError("Error generating post");
        }
        setLoading(false);
    };

    return (
        <div className="SocialPostGenerator">
            {loading && (
                <div className="loading-overlay">
                    <LottiePlayerComponent ref={lottiePlayer} />
                </div>
            )}

            <div className="input-side">
                <label>What is the Social post about?</label>
                <textarea 
                    name="postContext"
                    placeholder="Provide the context for the ad"
                    value={inputData.postContext}
                    onChange={handleInputChange}
                    rows="5"
                    disabled={loading}
                />

                <label>Select Platform</label>
                <select 
                    name="platform"
                    value={inputData.platform}
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Google">Google</option>
                </select>

                <label>Language</label>
                <select 
                    name="language"
                    value={inputData.language}
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="en">English</option>
                </select>

                <label>Tone</label>
                <select 
                    name="tone"
                    value={inputData.tone}
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="formal">Formal</option>
                </select>

                <label>Output Length</label>
                <select 
                    name="outputLength"
                    value={inputData.outputLength}
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="short">Short</option>
                </select>

                {error && <div className="error-message">{error}</div>}
                <button onClick={handleGenerate} disabled={loading}>Generate Post</button>
            </div>

            <div className="output-side">
                <textarea readOnly value={output} />
                <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>
                    Copy Post
                </button>
            </div>
        </div>
    );
}

export default SocialPostGenerator;
