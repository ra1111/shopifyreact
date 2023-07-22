import React, { useState } from 'react';
import './index.css';
function SEOTitleGenerator() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productKeywords, setProductKeywords] = useState('');
    const [languageTone, setLanguageTone] = useState('');
    const [outputLength, setOutputLength] = useState('');
    const [output, setOutput] = useState('');

    const handleGenerate = () => {
        // Implement your logic to generate the SEO title
        // Here's a simple mock example
        setOutput(`${productName} - ${productKeywords}`);
    };

    return (
        <div className="SEOTitleGenerator">
            <div className="input-side">
                <label>Product Name</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                
                <label>Product Description</label>
                <textarea type="text" value={productDescription} rows="10" onChange={(e) => setProductDescription(e.target.value)} />
                
                <label>Product Keywords</label>
                <input type="text" value={productKeywords} onChange={(e) => setProductKeywords(e.target.value)} />

                <label>Language Tone</label>
                <select value={languageTone} onChange={(e) => setLanguageTone(e.target.value)}>
                    {/* Add your options for language tone here */}
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                </select>

                <label>Output Length</label>
                <select value={outputLength} onChange={(e) => setOutputLength(e.target.value)}>
                    {/* Add your options for output length here */}
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                </select>

                <button onClick={handleGenerate}>Generate Title</button>
            </div>
            <div className="output-side">
                <textarea value={output} readOnly />
                <button>Copy</button>
            </div>
        </div>
    );
}

export default SEOTitleGenerator;
