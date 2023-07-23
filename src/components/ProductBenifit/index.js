import React, { useState, useRef,useEffect} from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './index.css';

function ProductBenefitGenerator() {
    const [inputData, setInputData] = useState({
        productName: '',
        productCategory: '',
        primaryFeature: '',
        productDescription: '',
        tone: '',
        outputLength: ''
    });
    const [outputBenefits, setOutputBenefits] = useState([]);
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
        const { productName, productCategory, primaryFeature, productDescription } = inputData;
        if (!productName && !productCategory && !primaryFeature && !productDescription) {
            setError("Please ensure at least one field is filled!");
            return;
        }

        setLoading(true);
        if (lottiePlayer.current) {
            lottiePlayer.current.play();
        }

        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onMessage", {
                requestType: "productBenifits",
                data: inputData
            });

            setOutputBenefits(response.data);

            setInputData({
                productName: '',
                productCategory: '',
                primaryFeature: '',
                productDescription: '',
                tone: '',
                outputLength: ''
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data.");
        } finally {
            setLoading(false);
            if (lottiePlayer.current) {
                lottiePlayer.current.pause();
            }
        }
    };

    return (
        <div className="ProductBenefitGenerator">
                {loading && (
        <div className="loading-overlay">
   <LottiePlayerComponent ref={lottiePlayer} />
        </div>
      )}

            <div className="input-side">
                <label>Product Name</label>
                <input 
                    type="text" 
                    name="productName" 
                    value={inputData.productName} 
                    onChange={handleInputChange}
                    disabled={loading}
                />
                <label>Product Category</label>
                <input 
                    type="text" 
                    name="productCategory" 
                    value={inputData.productCategory} 
                    onChange={handleInputChange}
                    disabled={loading}
                />
                <label>Primary Feature</label>
                <input 
                    type="text" 
                    name="primaryFeature" 
                    value={inputData.primaryFeature} 
                    onChange={handleInputChange}
                    disabled={loading}
                />
                <label>Product Description</label>
                <textarea 
                    name="productDescription" 
                    rows={"10"}
                    value={inputData.productDescription} 
                    onChange={handleInputChange}
                    disabled={loading}
                ></textarea>
                <label>Tone of Language</label>
                <select 
                    name="tone" 
                    value={inputData.tone} 
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                </select>
                <label>Output Length</label>
                <select 
                    name="outputLength" 
                    value={inputData.outputLength} 
                    onChange={handleInputChange}
                    disabled={loading}
                >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                </select>
                {error && <div className="error-message">{error}</div>}
                <button onClick={fetchData} disabled={loading}>Generate Benefits</button>
            </div>

            <div className="output-side">
                <textarea readOnly value={outputBenefits} />
                <button onClick={() => navigator.clipboard.writeText(outputBenefits)} disabled={loading}>
                    Copy Output
                </button>
            </div>
        </div>
    );
}

export default ProductBenefitGenerator;
