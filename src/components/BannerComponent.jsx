import React from 'react';

const BannerComponent = ({ title, text, linkText, imgSrc, imgFirst }) => (
  <div className={`row align-items-center ${imgFirst ? 'flex-md-row-reverse' : ''} mb-4`}>
    <div className="col-md-6 mb-4 mb-md-0">
      <img src={imgSrc} className="img-fluid rounded shadow" alt={title} />
    </div>
    <div className="col-md-6">
      <h2>{title}</h2>
      <p>{text}</p>
      <a href="#" className="btn btn-primary">{linkText}</a>
    </div>
  </div>
);

export default BannerComponent;
