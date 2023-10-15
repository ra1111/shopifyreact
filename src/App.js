import React, { useState } from 'react';
import Menu, { SECTIONS } from './components/Menu';
import ProductDescription from './components/ProductDescription';
import EmailMarketing from './components/EmailMarket';
import SocialPostGenerator from './components/Ads';
import AIImprover from './components/writerAssistant';
import SEOTitleGenerator from './components/SEO';
import SEODescriptionGenerator from './components/SEODescription';
import ProductNameGenerator from './components/ProductNameGenerator';
import ProductBenefitGenerator from './components/ProductBenifit';
import ArticleGenerator from './components/SeoTitle';
// Import other components
// import ProductPage from './ProductPage';
// ... 

function App() {
  const [currentSection, setCurrentSection] = useState(SECTIONS.PRODUCT_DESCRIPTION);

  return (
    <div className="App">
      <Menu currentSection={currentSection} onSectionChange={setCurrentSection} />

      <div className="content">
        {/* {currentSection === SECTIONS.PRODUCT_DESCRIPTION && <ProductDescription />}
        {currentSection === SECTIONS.PRODUCT_NAME && <ProductNameGenerator />}
        {currentSection==SECTIONS.PRODUCT_BENEFITS&&<ProductBenefitGenerator/>}
        {currentSection === SECTIONS.EMAIL_MARKET && <EmailMarketing />}
        {currentSection === SECTIONS.ARTIKLE && <ArticleGenerator />}
        {currentSection === SECTIONS.ADS && <SocialPostGenerator />}
        {currentSection === SECTIONS.WRITER_ASSITANT && <AIImprover />} */}
        {currentSection===SECTIONS.SEO_TITLE&&<ArticleGenerator/>}
        {/* {currentSection===SECTIONS.SEO_DESCRIPTION&&<SEODescriptionGenerator/>} */}
        {/* Render other components based on the currentSection */}
      </div>
    </div>
  );
}

export default App;
