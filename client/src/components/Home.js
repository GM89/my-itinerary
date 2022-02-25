import React from 'react'
import logo from "../images/myItineraryLogo.png";


function Home() {


 
    return (
      <div>
        <div className="container">
          <div className="landingPageContents">
  
            <img class=" .logo mx-auto"src={logo}  alt="Responsive image"/>
    
  
            <h2 className=" text-center">
              Find your perfect trip, designed by insiders who know and love
              their cities
            </h2>
          </div>
        </div>
      </div>
    );
}


export {Home} 



