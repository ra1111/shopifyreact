import React, { useState } from 'react';
import './index.css';
function ProductBenefitGenerator() {
    const [inputData, setInputData] = useState({
        productName: '',
        productCategory: '',
        primaryFeature: '',
        tone: '',
        outputLength: ''
    });
    const [outputBenefits, setOutputBenefits] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }));
    };

    const generateBenefits = () => {
        // Logic or API call to generate the product benefits based on inputData
        const benefits = ['Sample Benefit 1', 'Sample Benefit 2'];  // Replace this with actual logic
        setOutputBenefits(benefits);
    };

    return (
        <div className="ProductBenefitGenerator">
            <div className="input-side">
                <label>Product Name</label>
                <input 
                    type="text" 
                    name="productName" 
                    value={inputData.productName} 
                    onChange={handleInputChange}
                />
                <label>Product Category</label>
                <input 
                    type="text" 
                    name="productCategory" 
                    value={inputData.productCategory} 
                    onChange={handleInputChange}
                />
                <label>Primary Feature</label>
                <input 
                    type="text" 
                    name="primaryFeature" 
                    value={inputData.primaryFeature} 
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
                <button onClick={generateBenefits}>Generate Benefits</button>
            </div>
            <div className="output-side">
                <textarea readOnly value={outputBenefits.join('\n')}></textarea>
                <button onClick={() => navigator.clipboard.writeText(outputBenefits.join('\n'))}>Copy</button>
            </div>
        </div>
    );
}

export default ProductBenefitGenerator;
