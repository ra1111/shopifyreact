import React, { useState } from 'react';
import './index.css';
function SEODescriptionGenerator() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productKeywords, setProductKeywords] = useState('');
    const [languageTone, setLanguageTone] = useState('');
    const [outputLength, setOutputLength] = useState('');
    const [output, setOutput] = useState('');

    const handleGenerate = () => {
        // Implement your logic to generate the SEO description
        // Here's a simple mock example
        setOutput(`Discover ${productName}. ${productDescription}. Best for ${productKeywords}.`);
    };

    return (
        <div className="SEODescriptionGenerator">
            <div className="input-side">
                <label>Product Name</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                
                <label>Product Description</label>
                <textarea type="text" rows="10" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
                
                <label>Product Keywords</label>
                <input type="text" value={productKeywords} onChange={(e) => setProductKeywords(e.target.value)} />

                <label>Language Tone</label>
                <select value={languageTone} onChange={(e) => setLanguageTone(e.target.value)}>
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                </select>

                <label>Output Length</label>
                <select value={outputLength} onChange={(e) => setOutputLength(e.target.value)}>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                </select>

                <button onClick={handleGenerate}>Generate Description</button>
            </div>
            <div className="output-side">
                <textarea value={output} readOnly />
                <button>Copy</button>
            </div>
        </div>
    );
}

export default SEODescriptionGenerator;
