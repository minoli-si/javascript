import React from 'react';
import './LoginSignup.css';
import { Link } from 'react-router-dom';
    const AdminEmployee = () => {     
        const button = {
            backgroundColor:'white',
             padding:"30px",
             margin: "30px",
             border: "1px solid black",
             borderRadius: "10px",
             textAlign: 'center',
          };  
    return( <>
        <div style={{textAlign:"center"}}>
            <div>
                <header><h1 style={{color:"Black"}}>Sportz Interactive</h1>
                </header>

           <Link to="/Login"><button style={button}>Admin Login</button></Link>
             </div> 
           <div>
          <Link to="/Signup"><button style={button}>Employee Login</button></Link>
          </div>
          </div>
          </>
    );
}
export default AdminEmployee;
