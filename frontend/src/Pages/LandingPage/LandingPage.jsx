import React from 'react';
import './LandingPage.css';

import cliptop from "../../Resorces/Clips/Clip-03.mp4"
import clipmiddle from "../../Resorces/Clips/Clip-02.mp4"
import clipbottom from "../../Resorces/Clips/Clip-01.mp4"
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='landingpage'>
      <div className="clip-container clip-container-top">
      <Link style={{textDecoration:'none', cursor:'pointer'}} to='/store'><h1 className='clip-logo'>SKYDOT.com</h1></Link>

      
        <video className='clip' autoPlay muted loop>
          <source src={cliptop} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Link style={{textDecoration:'none'}} to='/shirts'><button className='clip-button'>Shirts</button></Link>
      </div>
      <div className="clip-container clip-container-middle">
        <video className='clip' autoPlay muted loop>
          <source src={clipmiddle} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Link style={{textDecoration:'none'}} to='/pants'><button className='clip-button'>Pants</button></Link>
      </div>
      <div className="clip-container clip-container-bottom">
        <video className='clip' autoPlay muted loop>
          <source src={clipbottom} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Link style={{textDecoration:'none'}} to='/t-shirts'> <button className='clip-button'>T Shirts</button></Link>

      </div>
    </div>
  );
};

export default LandingPage;



