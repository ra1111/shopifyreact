import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

function AIImprover() {
    const [inputData, setInputData] = useState({
        inputText: '',
        languageTone: 'Neutral',
        outputLength: 'Medium'
    });
    const [outputText, setOutputText] = useState('');
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

    const fetchData = async () => {
        const { inputText } = inputData;
        if (!inputText) {
            setError("Please input some text!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
                requestType: "writerAssitant",
                data: inputData
            });

            setOutputText(response.data);

            setInputData({
                inputText: '',
                languageTone: 'Neutral',
                outputLength: 'Medium'
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while improving text.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="AIImprover">
            {loading && (
                <div className="loading-overlay">
                    <LottiePlayerComponent ref={lottiePlayer} />
                </div>
            )}
            
            <div className="input-side">
                <label>Write anything and AI will improve it:</label>
                <textarea 
                    name="inputText" 
                    rows="10" 
                    value={inputData.inputText} 
                    onChange={handleInputChange}
                    disabled={loading}
                ></textarea>
                <label>Tone of Language</label>
                <select 
                    name="languageTone" 
                    value={inputData.languageTone} 
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="Neutral">Neutral</option>
                    <option value="Friendly">Friendly</option>
                </select>
                <label>Output Length</label>
                <select 
                    name="outputLength" 
                    value={inputData.outputLength} 
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                </select>
                {error && <div className="error-message">{error}</div>}
                <button onClick={fetchData} disabled={loading}>Submit</button>
            </div>

            <div className="output-side">
                <textarea readOnly value={outputText} />
                <button onClick={() => navigator.clipboard.writeText(outputText)} disabled={loading}>
                    Copy Output
                </button>
            </div>
        </div>
    );
}

export default AIImprover;
