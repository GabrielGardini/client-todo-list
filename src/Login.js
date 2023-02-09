import { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./UserContext";

function Login(){

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loginError, setLoginError] = useState(false);



const user = useContext(UserContext);

function loginUser(e){
    e.preventDefault();

    const data ={email, password};
    axios.post('https://api-todo-list-gabrielgardini.vercel.app/login', data, {withCredentials:true})
    .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setLoginError(false);

    }).catch(() => {
        console.log("teste")
        setLoginError(true)
    })
}   

    return(
        <form action="" onSubmit={e => loginUser(e)}>
            {loginError && (
                <div>LOGIN ERROR! Wrong password!</div>
            )}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
            <button type="submit">Log in</button>
        </form>
    )
}

export default Login;