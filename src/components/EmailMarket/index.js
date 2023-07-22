import React, { useState } from 'react';
import './index.css';
import axios from 'axios';
function EmailMarketing() {
  const [emailContext, setEmailContext] = useState('');
  const [language, setLanguage] = useState('');
  const [tone, setTone] = useState('');
  const [outputLength, setOutputLength] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = () => {
    let dataToSend = {};
    if (emailContext !== '') dataToSend.emailContext = emailContext;
    if (language !== '') dataToSend.language = language;
    if (tone !== '') dataToSend.tone = tone;
    if (outputLength !== '') dataToSend.outputLength = outputLength;
    if (output !== '') dataToSend.output = output;
  console.log(fetchData(dataToSend))
    // Handle your output logic here...
  };
  const fetchData = async (dataToSend) => {
    try {
        const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
            requestType: "email",
           data: dataToSend
          
        },{headers: {"Access-Control-Allow-Origin": "*"}});
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


  return (
    <div className="EmailMarketing">
      <div className="input-side">
        <label>What's the main topic of your email?</label>
        <textarea 
          placeholder="Email Context"
          value={emailContext}
          onChange={e => setEmailContext(e.target.value)}
          rows="10"
        />

        <label>Language</label>
        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option value="en">English</option>
          {/* ... */}
        </select>

        <label>Tone</label>
        <select value={tone} onChange={e => setTone(e.target.value)}>
          <option value="formal">Formal</option>
          {/* ... */}
        </select>

        <label>Output Length</label>
        <select value={outputLength} onChange={e => setOutputLength(e.target.value)}>
          <option value="short">Short</option>
          {/* ... */}
        </select>

        <button onClick={handleSubmit}>Write</button>
      </div>

      <div className="output-side">
        <textarea readOnly value={output} />
        <button onClick={() => navigator.clipboard.writeText(output)}>Copy Output</button>
      </div>
    </div>
  );
}

export default EmailMarketing;
