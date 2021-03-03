import React from 'react';
import './Footer.styles.scss';

const Footer = () => {
  return (
    <footer id="footer">
      <hr />
      <p>API Used Documentations:</p>
      <div id="docs">
        <a href="http://www.geonames.org/export/web-services.html">Geonames</a>
        <a href="https://www.weatherbit.io/api">Weatherbit</a>
        <a href="https://pixabay.com/api/docs/">Pixabay</a>
      </div>
    </footer>
  );
};

export default Footer;
