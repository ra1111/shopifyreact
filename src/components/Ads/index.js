import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
function SocialPostGenerator() {
    const [postContext, setPostContext] = useState('');
    const [platform, setPlatform] = useState('Facebook');
    const [language, setLanguage] = useState('');
    const [tone, setTone] = useState('');
    const [outputLength, setOutputLength] = useState('');
    const [output, setOutput] = useState('');

    const handleSubmit = () => {
        let dataToSend = {};
    if (postContext !== '') dataToSend.postContext = postContext;
    if (platform !== '') dataToSend.platform = platform;
    if (language !== '') dataToSend.language = language;
    if (tone !== '') dataToSend.tone = tone;
    if (outputLength !== '') dataToSend.outputLength = outputLength;
    console.log(dataToSend)
   fetchData(dataToSend)
        // Handle your output logic here...
    };
    const fetchData = async (dataToSend) => {
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
                requestType: "ads",
               data: dataToSend
              
            });
            console.log(response.data);
            setOutput(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="SocialPostGenerator">
            <div className="input-side">
                <label>What is the Social post about</label>
                <textarea 
                    placeholder="Provide the context for the ad"
                    value={postContext}
                    onChange={e => setPostContext(e.target.value)}
                    rows="5"
                />

                <label>Select Platform</label>
                <select value={platform} onChange={e => setPlatform(e.target.value)}>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Google">Google</option>
                </select>

                <label>Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    {/* Add other language options as needed */}
                </select>

                <label>Tone</label>
                <select value={tone} onChange={e => setTone(e.target.value)}>
                    <option value="formal">Formal</option>
                    {/* Add other tone options as needed */}
                </select>

                <label>Output Length</label>
                <select value={outputLength} onChange={e => setOutputLength(e.target.value)}>
                    <option value="short">Short</option>
                    {/* Add other length options as needed */}
                </select>

                <button onClick={handleSubmit}>Generate Post</button>
            </div>

            <div className="output-side">
                <textarea readOnly value={output} />
                <button onClick={() => navigator.clipboard.writeText(output)}>Copy Post</button>
                <div>
                    <p>Characters: {output.length}</p>
                    {/* <p>Words: {output.split(' ').length}</p> */}
                </div>
            </div>
        </div>
    );
}

export default SocialPostGenerator;
