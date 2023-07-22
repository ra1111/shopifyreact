import React, { useState } from 'react';
import './index.css';
function ProductNameGenerator() {
    const [inputData, setInputData] = useState({
        productDescription: '',
        productKeywords: '',
        tone: '',
        outputLength: ''
    });
    const [outputData, setOutputData] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    };

    const generateProductName = () => {
        // Logic or API call to generate the product name based on inputData
        const productName = 'Sample Product Name'; // Replace this with actual logic
        setOutputData(productName);
    };

    return (
        <div className="SEOGenerator">
            <div className="input-side">
                <label>Product Description</label>
                <input 
                    type="text" 
                    name="productDescription" 
                    value={inputData.productDescription} 
                    onChange={handleInputChange}
                />
                <label>Product Keywords</label>
                <input 
                    type="text" 
                    name="productKeywords" 
                    value={inputData.productKeywords} 
                    onChange={handleInputChange}
                />
                <label>Tone of Language</label>
                <select 
                    name="tone" 
                    value={inputData.tone} 
                    onChange={handleInputChange}
                >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    {/* Add more tones as needed */}
                </select>
                <label>Output Length</label>
                <select 
                    name="outputLength" 
                    value={inputData.outputLength} 
                    onChange={handleInputChange}
                >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                </select>
                <button onClick={generateProductName}>Generate</button>
            </div>
            <div className="output-side">
                <textarea readOnly value={outputData}></textarea>
                <button onClick={() => navigator.clipboard.writeText(outputData)}>Copy</button>
            </div>
        </div>
    );
}

export default ProductNameGenerator;
