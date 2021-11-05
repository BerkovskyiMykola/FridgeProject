import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <img src="https://i.imgur.com/qIufhof.png"  />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
       </div>
    )
}

export default NotFound