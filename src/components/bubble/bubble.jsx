import React from 'react';
import './bubble.css'

// This component holds single bubble.
const Bubble = ({onclick, colorChange}) => {
    return ( 
        <div 
            className = {`bubble  ${colorChange}`}
            onClick = {() => onclick()} 
        >
        </div>
    );
}

 
export default Bubble;