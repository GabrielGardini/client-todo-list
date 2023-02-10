import { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";



function Login(){

const [email, setEmail] = useState('');
const [id, setId] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState(false);
const [redirect, setRedirect] = useState(false);



const user = useContext(UserContext);

function loginUser(e){
    e.preventDefault();
    if(email!==""){
        const data ={email, password};
        axios.post('https://api-todo-list-six.vercel.app/login', data, {withCredentials:true})
        .then(response => {
            user.setEmail(response.data.email);
            user.setId(response.data.id);
            setEmail('');
            setId('');
            setPassword('');
            setLoginError(false);
            setRedirect(true);
            
        }).catch(() => {
        })
    }else{
    setLoginError(true) 
    }
}
    
    if(redirect){
        return (
            <Navigate to={'/home'}/>
        )
    }

    return(
        <>
        <form action="" onSubmit={e => loginUser(e)}>
            <h1>Welcome!</h1>
            <h2>Log in to see your todo's</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
            <p>Don't have an account yet? Just click in Register!</p>
            <button type="submit">Log in</button>
            {loginError && (
                <div className={"error"}>
                    <h2 style={{ padding:10,marginTop: 150, color: 'red', backgroundColor:"#f0f0f0", borderRadius:5}}>LOGIN ERROR! Wrong email or password!</h2>
                </div>
                )}
        </form>
                </>
    )
}

export default Login;