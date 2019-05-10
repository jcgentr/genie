import React from 'react';
import './Navigation.css';

const Navigation = ({isSignedIn, onRouteChange}) => {
    if(isSignedIn) {
        return (
            <nav className="flex justify-between bb b--white-10 bg-near-black">
                <h1 className="fl pa3 near-white">Genie</h1>
                <div className="flex-grow pa3 flex items-center">
                    <button 
                        onClick={() => onRouteChange('signout')}
                        className="f6 dib lightgray bg-animate hover-bg-white hover-black no-underline pv2 ph4 ba b--black-20 pointer"
                    >Sign Out</button>
                </div>
             </nav>
        );
    } else {
        return (
            <nav className="flex justify-between bb b--white-10 bg-near-black">
                <h1 className="fl pa3 near-white">Genie</h1>
                <div className="flex-grow pa3 flex items-center">
                    <button 
                        onClick={() => onRouteChange('signin')}
                        className="f6 dib lightgray bg-animate hover-bg-white hover-black no-underline pv2 ph4 ba b--black-20 pointer"
                    >Sign In</button>
                    <button 
                        onClick={() => onRouteChange('register')}
                        className="f6 dib lightgray bg-animate hover-bg-white hover-black no-underline pv2 ph4 ba b--black-20 pointer"
                    >Register</button>
                </div>
             </nav>
        );
    }
}

export default Navigation;