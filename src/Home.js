import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

function Home(){

const userInfo = useContext(UserContext);
const [inputValue, setInputValue] = useState('');
const [todos, setTodos] = useState([]);


useEffect(() => {
    axios.get('https://api-todo-list-gabrielgardini.vercel.app/todos', {withCredentials: true})
    .then(response => {
        setTodos(response.data);
    })
},[]);

// if(!userInfo.email){
//     return 'You need to be logged in to see this page!';
// }


function addTodo (e){
    e.preventDefault();
    axios.put('https://api-todo-list-gabrielgardini.vercel.app/todos', {text: inputValue}, {withCredentials: true} )
    .then(response => {

        setTodos([...todos, response.data]);
        setInputValue('');
    })
}


function updateTodo(todo){
    axios.post('https://api-todo-list-gabrielgardini.vercel.app/todos', {id: todo._id, done: !todo.done}, {withCredentials: true})
    .then(() => {

        
        const newTodos = todos.map(t => {
            if(t._id === todo._id){
                t.done = !t.done;
            } 
            return t
        })
        setTodos([...newTodos])
    });
}

return(
    <>
    <form onSubmit={e =>addTodo(e)}>

        <input placeholder={'What do you want to do?'} value={inputValue} onChange={e => setInputValue(e.target.value)}/>
        <ul>
            {todos.map(todo => (

                <li>
                    <input type={'checkbox'} checked={todo.done} onClick={() => updateTodo(todo)}/>
                    {todo.text}
                </li>
                ))}
        </ul>
    </form>
    </>
)
}

export default Home;