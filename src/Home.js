import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Home(){

const userInfo = useContext(UserContext);
const [inputValue, setInputValue] = useState('');
const [todos, setTodos] = useState([]);


useEffect(() => {
    axios.post('https://api-todo-list-six.vercel.app/todoslist', {id:userInfo.id}, {withCredentials: true})
    .then(response => {
        setTodos(response.data);
    })
},[]);

if(!userInfo.email){
    return 'You need to be logged in to see this page!';
}


function addTodo (e){
    e.preventDefault();
    console.log(userInfo.id);
    axios.put('https://api-todo-list-six.vercel.app/todos', {text: inputValue, id:userInfo.id}, {withCredentials: true} )
    .then(response => {

        setTodos([...todos, response.data]);
        setInputValue('');
    })
}


function updateTodo(todo){
    axios.post('https://api-todo-list-six.vercel.app/todos', {id: todo._id, done: !todo.done, userId: userInfo.id}, {withCredentials: true})
    .then(() => {

        
        const newTodos = todos.map(t => {
            if(t._id === todo._id){
                t.done = !t.done;
            } 
            return t
        })
        setTodos([...newTodos])
    });
    axios.post('https://api-todo-list-six.vercel.app/todoslist', {id:userInfo.id}, {withCredentials: true})
    .then(response => {
        setTodos(response.data);
    })
}

return(
    <>
    <form onSubmit={e =>addTodo(e)}>

        <input placeholder={'What do you want to do?'} value={inputValue} onChange={e => setInputValue(e.target.value)}/>
        <ul>
            {todos.map(todo => (

                <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                    <h3>{todo.text}</h3>
                    <DeleteOutlineIcon onClick={() => updateTodo(todo)}/>
                </div>
                // <li>
                //     <input type={'checkbox'} checked={todo.done} onClick={() => updateTodo(todo)}/>
                //     {todo.text}
                // </li>
                ))}
        </ul>
    </form>
    </>
)
}

export default Home;