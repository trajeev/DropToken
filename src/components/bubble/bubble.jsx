import React from 'react';
import './bubble.css'

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