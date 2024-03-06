import React from 'react';
import './styles/footer.scss';

function Footer(): JSX.Element {
  return (
    <div className="footer">
      <div className="footer_top">
        <p>ВИНИЛ</p>
        <img src="/public/lp.png" alt="vinyl record" />
        <p>МАРКЕТ</p>
      </div>
      <div className="footer_bottom">
        <p>2024</p>
      </div>
    </div>
  );
}

export default Footer;
