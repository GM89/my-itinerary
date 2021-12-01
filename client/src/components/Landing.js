import React from 'react'
import {useNavigate} from 'react-router-dom';

const GoBackButton = () => {

    
    let navigate = useNavigate();
    
      function handleClick() {
            navigate('/home')
        }
  
    return (
      <button type="button" className="btn btn-secondary" onClick={handleClick}>
        Go back
      </button>
    );
  }



function Landing() {
    return (
        <div>
            <p>Landing page</p>
            <p><GoBackButton/> </p>
        </div>
    )
}


export {Landing} 



