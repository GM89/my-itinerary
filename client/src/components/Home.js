import React from 'react'
import {useNavigate} from 'react-router-dom';


/*
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
  }*/



function Home() {
    return (

        <div>
            <p>Home</p>
            <p>{/* <GoBackButton/> */} </p>
        </div>
    )
}


export {Home} 



