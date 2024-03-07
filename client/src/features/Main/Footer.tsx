import React from 'react';
import './styles/footer.scss';

function Footer(): JSX.Element {
  return (
    <div className="footer">
      <div className="footer_top">
        <p style={{ color: 'white' }}>ВИНИЛ</p>
        <img src="/public/vinyl.png" alt="vinyl record" />
        <p style={{ color: 'white' }}>МАРКЕТ</p>
      </div>
    </div>
  );
}

export default Footer;
