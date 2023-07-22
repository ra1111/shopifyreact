import React, { useState } from 'react';
import './index.css'
const AIImprover = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [languageTone, setLanguageTone] = useState('Neutral');
    const [outputLength, setOutputLength] = useState('Medium');

    const handleSubmit = async () => {
        // Mock API call to an AI endpoint (replace with your actual call)
        const improvedText = await improveText(inputText, languageTone, outputLength);
        setOutputText(improvedText);
    };

    // Replace this with your actual AI integration
    const improveText = async (text, tone, length) => {
        // Mock: Just return the text for this example
        return `Improved Version of: ${text}`;
    };

    return (
        <div className="AIImprover">
            <div className="input-side">
                <label>Write anything and AI will improve it:</label>
                <textarea value={inputText}  rows="10" onChange={e => setInputText(e.target.value)}></textarea>
                <select value={languageTone} onChange={e => setLanguageTone(e.target.value)}>
                    {/* Your options for language tone */}
                    <option value="Neutral">Neutral</option>
                    <option value="Friendly">Friendly</option>
                    {/* ... */}
                </select>
                <select value={outputLength} onChange={e => setOutputLength(e.target.value)}>
                    {/* Your options for output length */}
                    <option value="Short">Short</option>
                    <option value="Medium">Medium</option>
                    <option value="Long">Long</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="output-side">
                <textarea value={outputText} readOnly></textarea>
                <button onClick={() => navigator.clipboard.writeText(outputText)}>Copy</button>
            </div>
        </div>
    );
}

export default AIImprover;
