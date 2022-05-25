import React from 'react'
import { Link } from 'react-router-dom'

function NoMatch() {
    return (
        <div style={{backgroundColor: '#73e6cc', height: "100vh"}} >
            <div className='container text-center d-flex align-items-center flex-column justify-content-center' style={{height: "100%", margin: "auto"}}>
            <h3 className='text-capitalize'>Hmmm... that page does not exist</h3>
            <Link to="/">
                <button className="button mt-5 mb-3 p-3">Back to home</button>
            </Link>
            </div>
          
        </div>
    )
}

export default NoMatch
