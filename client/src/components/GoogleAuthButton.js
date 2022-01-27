import React, { useState, useEffect } from 'react';


const GoogleAuthButton = () => {
    const  [isSignedInState, isSignedInSetState] = useState({ isSignedIn: null });
    const  [authState, setAuthState] = useState({});
   
    console.log("client_id",process.env.REACT_APP_CLIENT_ID)

   /*  function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    }
    function onFailure(error) {
    console.log(error);
    } */
    //We prepend this window. to make it clear that this is a variable that is available on window scope inside of our browser.
    // If you do not add this React will tell you it is undefined because it is searching in the wrong scope.

    
    useEffect(()=> {
                window.gapi.load("auth2", () => {
                window.gapi.auth2
                .init({
                    client_id: process.env.REACT_APP_CLIENT_ID, 
                    scope: "email", //scope:email
                })
                .then(() => {
                    //gapi.auth2 becomes an state of our function component
                    setAuthState(window.gapi.auth2.getAuthInstance());
                    // update state so that component will re-render
                    isSignedInSetState(authState.isSignedIn.get());
       
                    // listen for changes to authentication status
                    authState.isSignedIn.listen(isSignedInState)
 
                })
            } )
        },[])


        
     // updates auth state to current auth status
     // triggered when authentication status changes
         const onAuthChange = () => {
            isSignedInSetState({isSignedIn: authState.isSignedIn.get()})
          }
        
         const  onSignInClick = () => {
            authState.signIn()
          }

         const  onSignOutClick = () => {
            authState.signOut()
          }
        
            console.log("valor de onAuthChange", onAuthChange) // todo lo que hay dentro de la fórmula

            console.log("isSignedInState", isSignedInState) //{isSigned: null}
            
            console.log("está signin? ", isSignedInState.isSignedIn) //nullx    
 

        function authButton  () { 
            if (isSignedInState.isSignedIn === null) {
                return (
                   <div>
                    <p>null</p>
                    <button onClick={onSignInClick} className="ui red google button">
                    
                        Sign In
                    </button>
                     </div>
                    )
        } else if (isSignedInState.isSignedIn ===  true) {
            return (
            <button onClick={onSignOutClick} className="ui red google button">
                {/* <i className="google icon" /> */}
                Sign Out
            </button>
            )
        } else {
            return (
            <button onClick={onSignInClick} className="ui red google button">
                {/* <i className="google icon" /> */}
                Sign In
            </button>
            )
        }
        }
        
        console.log("authentication", authState)
console.log("authButton", authButton)

        return (
            <div>
            <p>a button, some day...</p>
            <div>{authButton}</div>
            </div>
        )

     

    
    }


export {GoogleAuthButton}