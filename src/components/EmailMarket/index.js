import React, { useState,useRef,useEffect} from 'react';
import './index.css';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
function EmailMarketing() {
  const [emailContext, setEmailContext] = useState('');
  const [language, setLanguage] = useState('');
  const [tone, setTone] = useState('');
  const [outputLength, setOutputLength] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const lottiePlayer = useRef(null);
  const handleEmailContextChange = (e) => {
    setEmailContext(e.target.value);
    if (e.target.value !== '') {
      setError('');  // Clear error if user starts typing
    }
  }
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
    if (isLoading && lottiePlayer.current) {
      lottiePlayer.current.play();
    } else if (lottiePlayer.current) {
      lottiePlayer.current.pause();
    }
  }, [isLoading]);
  const handleSubmit = () => {
    if (emailContext === '') {
      setError('Please enter the context for the email.');
      return;
    }

    let dataToSend = {
      emailContext: emailContext,
      language: language,
      tone: tone,
      outputLength: outputLength,
      output: output
    };

    fetchData(dataToSend);
  };

  const fetchData = async (dataToSend) => {
    setIsLoading(true);
    if (lottiePlayer.current) {
      lottiePlayer.current.play();
  }


    try {
      const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
        requestType: "email",
        data: dataToSend
      });
      setOutput(response.data);
      setEmailContext('');
      setLanguage('');
      setTone('');
      setOutputLength('');
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      if (lottiePlayer.current) {
        lottiePlayer.current.pause();
    }
    }
  };

  return (
    <div className="EmailMarketing">
          {isLoading && (
        <div className="loading-overlay">
   <LottiePlayerComponent ref={lottiePlayer} />
        </div>
      )}
      <div className="input-side">
        <label>What's the main topic of your email?</label>
        <textarea 
          placeholder="Email Context"
          value={emailContext}
          onChange={handleEmailContextChange}  // Use the handler to clear the error
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

        {error && <div className="error-message">{error}</div>} 

        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Writing...' : 'Write'}
        </button>
      </div>

      <div className="output-side">
        <textarea readOnly value={output} />
        <button onClick={() => navigator.clipboard.writeText(output)} disabled={isLoading}>
          Copy Output
        </button>
      </div>
    </div>
  );
}

export default EmailMarketing;
