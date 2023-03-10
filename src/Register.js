import { useState, useContext } from "react";
import axios from 'axios';
import UserContext from "./UserContext";
import {Navigate} from "react-router-dom";


function Register(){

const [email, setEmail] = useState('');
const [id, setId] = useState('');
const [password, setPassword] = useState('');
const [redirect, setRedirect] = useState(false);


const user = useContext(UserContext);

function registerUser(e){
    e.preventDefault();

    const data ={email, password};
    axios.post('https://api-todo-list-six.vercel.app/register', data, {withCredentials:true})
    .then(response => {
        user.setEmail(response.data.email);
        user.setId(response.data.id);
        setEmail('');
        setId('');
        setPassword('');
        setRedirect(true)
    })
    
}   

if(redirect){
    return <Navigate to={'/home'}/>
}

    return(
        <form action="" onSubmit={e => registerUser(e)}>
            <h1>Welcome!</h1>
            <h2>Create an accout to start adding your Todo's!</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/><br/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register;