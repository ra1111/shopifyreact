import React, { useState } from 'react';
import './index.css';

function ProductDescription() {
  const [productNames, setProductNames] = useState(['']);
  const [productDescription, setProductDescription] = useState('');
  const [productTags, setProductTags] = useState('');
  const [displayedTags, setDisplayedTags] = useState([]);
  const [language, setLanguage] = useState('');
  const [tone, setTone] = useState('');
  const [outputLength, setOutputLength] = useState('');
  const [output, setOutput] = useState('');

  const handleNameChange = (index, value) => {
    const newProductNames = [...productNames];
    newProductNames[index] = value;
    setProductNames(newProductNames);
  };

  const addProductNameField = () => {
    setProductNames([...productNames, '']);
  };

  const handleTagsChange = (value) => {
    setProductTags(value);
    const tagsArray = value.split(',').map(tag => tag.trim());
    setDisplayedTags(tagsArray);
  };

  const handleSubmit = () => {
    // Handle your output logic here...
  };

  return (
    <div className="ProductDescription">
      <div className="input-side">
        {productNames.map((name, index) => (
          <div key={index}>
            <label>Product Name</label>
            <input 
              placeholder="Product Name"
              value={name}
              onChange={e => handleNameChange(index, e.target.value)}
            />
          </div>
        ))}
     
        <label>Product Description</label>
        <textarea 
          placeholder="Product Description"
          value={productDescription}
          onChange={e => setProductDescription(e.target.value)}
          rows="5"
        />

        <label>Product Tags (CSV)</label>
        <input
          placeholder="Enter tags separated by commas"
          value={productTags}
          onChange={e => handleTagsChange(e.target.value)}
        />
        <div className="tags-display">
          {displayedTags.map((tag, index) => (
            <span className="tag" key={index}>{tag}</span>
          ))}
        </div>

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
        <textarea readOnly  style={{height: '80%'}} value={output} />
        <button onClick={() => navigator.clipboard.writeText(output)}>Copy Output</button>
      </div>
    </div>
  );
}

export default ProductDescription;
