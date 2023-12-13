import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import './styles.css';
import Markdown from 'react-markdown';

function ArticleGenerator() {
    const [inputData, setInputData] = useState({
        focusKeyword: '',
        contentContext: '',
        desiredSentiment: 'Positive',
        powerWordType: 'Greed and FOMO',
        includeNumber: 'Yes'
    });
    const [sections, setSections] = useState({});
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [socialMediaOutput, setSocialMediaOutput] = useState('');
    const [combinedContent, setCombinedContent] = useState('');
    const lottiePlayer = useRef(null);

    const handleInputChange = (newData) => {
        setError(null);
        setInputData(newData);
    };
    useEffect(() => {
        const combined = Object.values(sections).join('\n\n');
        setCombinedContent(combined);
    }, [sections]);

    const copyToClipboard = () => {
        const contentToCopy = `${title}\n\n${combinedContent}`;
        navigator.clipboard.writeText(contentToCopy)
            .then(() => {
                // Handle successful copy
                alert('Content copied to clipboard!');
            })
            .catch(err => {
                // Handle copy error
                console.error('Failed to copy text: ', err);
            });
    };
    
    
    function LoadingOverlay({ src }) {
        return (
            <div className="loading-overlay">
                <Player
                    autoplay={true}
                    loop={true}
                    controls={true}
                    src={src}
                    style={{ height: '900px', width: '900px' }}
                />
            </div>
        );
    }
    const generateSocialPost = async () => {
        setLoading(true);
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onSocial", {
                article: output // Assuming the API needs the article content to generate the social post
            });
            setSocialMediaOutput(response.data);
        } catch (err) {
            console.error("Error generating social media post:", err);
            setError("An error occurred while generating the social media post.");
        } finally {
            setLoading(false);
        }
    };
    
    
    function SocialOutputSection({ socialMediaOutput, generateSocialPost, loading }) {
        return (
            <div className="social-output-section">
                {socialMediaOutput ? (
                    <>
                        <Markdown>{socialMediaOutput}</Markdown>
                        <button onClick={() => navigator.clipboard.writeText(socialMediaOutput)} disabled={loading}>Copy Social Post</button>
                    </>
                ) : (
                    <button onClick={generateSocialPost} disabled={loading}>Generate Social Post</button>
                )}
            </div>
        );
    }
    
    const InputSection = React.memo(({ handleInputChange, fetchData, error, loading }) => {

        const [localInputData, setLocalInputData] = useState(inputData);
    
        const handleLocalInputChange = (e) => {
            const { name, value } = e.target;
            const newData = { ...localInputData, [name]: value };
            setLocalInputData(newData);
        };
        
    const handleGenerateClick = () => {
    console.log("localInputData on Generate:", localInputData);
    fetchData(localInputData);
}
    
        return (
         
            <div className="input-section">
            
                <div>
                    <label>Focus Keyword <span className="required">*</span></label>
                    <input 
                        name="focusKeyword"
                        value={localInputData.focusKeyword}
    onChange={handleLocalInputChange}
    disabled={loading}
                    />
                </div>
                <div>
                    <label>Content Context (Optional)</label>
                    <input 
                        name="contentContext"
                        value={localInputData.contentContext}
                        onChange={handleLocalInputChange}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label>Desired Sentiment</label>
                    <select name="desiredSentiment" value={localInputData.desiredSentiment} onChange={handleLocalInputChange} disabled={loading}>
                        <option value="Positive">Positive</option>
                        <option value="Negative">Negative</option>
                    </select>
                </div>
                <div>
                    <label>Power Word</label>
                    <select name="powerWordType"  value={localInputData.powerWordType} 
    onChange={handleLocalInputChange} 
    disabled={loading}>
                        <option value="Greed and FOMO">Greed and FOMO</option>
                        <option value="Curiosity">Curiosity</option>
                        <option value="Ease and Convenience">Ease and Convenience</option>
                        <option value="Desire and Lust">Desire and Lust</option>
                        <option value="Vanity and Bragging">Vanity and Bragging</option>
                        <option value="Trust">Trust</option>
                        <option value="Anger">Anger</option>
                        <option value="Fear">Fear</option>
                    </select>
                </div>
                <div>
                    <label>Include Number</label>
                    <select name="includeNumber" value={localInputData.includeNumber} onChange={handleLocalInputChange} disabled={loading}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                
         
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleGenerateClick} disabled={loading}>Generate</button>
            </div>
            </div>
        );
    });
    
    

    
    function TitleSection({ title, fetchArticle, loading }) {
        return (
            <div className="title-section">
                <h2>{title}</h2>
                <button onClick={fetchArticle} disabled={loading}>Generate Article</button>
            </div>
        );
    }
    
    function OutputSection({ output, loading }) {
        return (
            <div className="output-section">
            <Markdown>{output}</Markdown>
                <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>Copy Article</button>
            </div>
        );
    }
    
   
    useEffect(() => {
        if (loading && lottiePlayer.current) {
            lottiePlayer.current.play();
        } else if (lottiePlayer.current) {
            lottiePlayer.current.pause();
        }
    }, [loading]);
    const generateSectionContent = async (sectionTitle) => {
        setLoading(true);
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onSection", {
                Title: sectionTitle
            });
            setSections(prevSections => ({
                ...prevSections,
                [sectionTitle]: response.data
            }));
        } catch (error) {
            console.error("Error generating content for section:", error);
            setError("An error occurred while generating content.");
        } finally {
            setLoading(false);
        }
    };
    const generateAllSections = async () => {
        setLoading(true);
        try {
            const sectionTitles = Object.keys(sections);
            for (const title of sectionTitles) {
                if (!sections[title]) { // Check if content already exists
                    await generateSectionContent(title); // Generate content for this section
                }
            }
        } catch (error) {
            console.error("Error generating content for all sections:", error);
            setError("An error occurred while generating content.");
        } finally {
            setLoading(false);
        }
    };
    const fetchArticle = async () => {
        setLoading(true);
        console.log(title)
        try {
            const response = await axios.post("http://us-central1-foresight-club.cloudfunctions.net/onArticle", {
                Title: title
            });
            setOutput(response.data);
            parseContent(response.data)
            console.log(response)
        } catch (error) {
            if (error.response) {
                
                // The request was made and the server responded with a status code
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
              } else {
                // Something happened in setting up the request
                console.log('Error', error.message);
              }
            setError("An error occurred while generating the article.");
        } finally {
            setLoading(false);
        }
    };
    const parseContent = (content) => {
        const sectionPattern = /(?:\n|^)([IVXLCDM]+\..+?)(?=\n[IVXLCDM]+\..+|\n*$)/gs;
        const parsedSections = {};
        let match;
    
        while ((match = sectionPattern.exec(content)) !== null) {
            const [fullMatch, sectionTitle] = match;
            parsedSections[sectionTitle.trim()] = fullMatch.replace(sectionTitle, '').trim();
        }
    
        setSections(parsedSections);
    };
    const [editingSections, setEditingSections] = useState({});

    // Function to toggle edit mode
    const toggleEditMode = (sectionTitle) => {
        setEditingSections(prevEditingSections => ({
            ...prevEditingSections,
            [sectionTitle]: !prevEditingSections[sectionTitle]
        }));
    };

    // Function to update section content
    const updateSectionContent = (sectionTitle, newContent) => {
        setSections(prevSections => ({
            ...prevSections,
            [sectionTitle]: newContent
        }));
    };
    const fetchData = async (dataToFetch) => {
        if (!dataToFetch.focusKeyword) {
            setError("Please provide a focus keyword!");
            return;
        }
        setLoading(true);
        console.log(dataToFetch)
        try {
            const response = await axios.post("https://us-central1-foresight-club.cloudfunctions.net/onTitle", {
                ...dataToFetch
            });
            console.log(response)
            setOutput(response.data);
            setTitle(response.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("An error occurred while generating the article title.");
        } finally {
            setLoading(false);
        }
    };
    
    const regenerateSectionContent = async (sectionTitle) => {
        // Call your API or function to regenerate content
        // Update the sections state with the new content
    };

    // Function to handle section content editing
    const editSectionContent = (sectionTitle, newContent) => {
        setSections(prevSections => ({
            ...prevSections,
            [sectionTitle]: newContent
        }));
    };

    // Function to handle section deletion
    const deleteSection = (sectionTitle) => {
        setSections(prevSections => {
            const newSections = { ...prevSections };
            delete newSections[sectionTitle];
            return newSections;
        });
    };

    

return (
    <div className="ArticleGenerator">
        {loading && <LoadingOverlay src="https://raw.githubusercontent.com/ra1111/shopifyreact/main/animation_lkey1cvo.json" />}
        <InputSection 
            inputData={inputData}
            handleInputChange={handleInputChange}
            fetchData={fetchData}
            error={error}
            loading={loading}
        />
        <div className="output-view">
            {title && (
                <div className="title-section">
                   <Markdown>{title}</Markdown>
                    <button onClick={fetchArticle} disabled={loading}>Generate Outline</button>
                </div>
            )}
            {/* {output && (
                <div className="output-section">
                    <Markdown>{output}</Markdown>
                    <button onClick={() => navigator.clipboard.writeText(output)} disabled={loading}>Copy Article</button>
                    <button onClick={generateSocialPost} disabled={loading}>Generate Social Post</button>
                </div>
            )} */}
             <div className="sections-container">
             {Object.entries(sections).map(([sectionTitle, sectionContent]) => (
  <div key={sectionTitle} className="section">
    <Markdown>{sectionTitle}</Markdown>
    {editingSections[sectionTitle] ? (
      <>
        {/* <textarea
          value={sectionContent}
          onChange={(e) => updateSectionContent(sectionTitle, e.target.value)}
        /> */}
             <button onClick={() => deleteSection(sectionTitle)}>
          Delete
        </button>
        <button onClick={() => toggleEditMode(sectionTitle)}>
          Save
        </button>
      </>
    ) : (
      <>
        {/* <Markdown className="section-content">{sectionContent}</Markdown> */}
        {/* <button onClick={() => toggleEditMode(sectionTitle)}>
          Edit
        </button> */}
        {/* <button onClick={() => deleteSection(sectionTitle)}>
          Delete
        </button> */}
      </>
    )}
  </div>
))}

   <div className="generate-all-button-container">
                <button onClick={generateAllSections} disabled={loading}>
                    Generate All Sections
                </button>
            </div>
 <div className="combined-content">
                <Markdown className="article-content">{combinedContent}</Markdown>
                <button onClick={copyToClipboard} disabled={!combinedContent}>Copy Article</button>
            </div>
        </div>
        </div>
            {socialMediaOutput && (
                <div className="social-output-section">
                    <Markdown>{socialMediaOutput}</Markdown>
                    <button onClick={() => navigator.clipboard.writeText(socialMediaOutput)} disabled={loading}>Copy Social Post</button>
                </div>
            )}
        </div>
    

);
    }
    

    


export default ArticleGenerator;
