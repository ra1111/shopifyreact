import React from 'react';
import './index.css';
export const SECTIONS = {
  PRODUCT_DESCRIPTION: 'Product Description',
  PRODUCT_NAME: 'Product Name',
  PRODUCT_BENEFITS: 'Product Benefits',
  SEO_TITLE: 'SEO Title',
  EMAIL_MARKET:'EmailMarketing',
  ADS:"Ads",
  WRITER_ASSITANT:'Writer Aisstant',
  SEO_DESCRIPTION:'SEO Description'
};

function Menu({ currentSection, onSectionChange }) {
  return (
    <div className="menu">
      {Object.values(SECTIONS).map(section => (
        <button
          key={section}
          className={currentSection === section ? 'active' : ''}
          onClick={() => onSectionChange(section)}
        >
          {section}
        </button>
      ))}
    </div>
  );
}

export default Menu;
