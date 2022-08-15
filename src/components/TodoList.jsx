import React from "react";
import { TodoItem } from "./TodoItem";

//componente de Lista en el que se crea la estrucuta de un <ul>
//todo es un arreglo que viene desde App.jsx
//checkTodo es una funcion que viene desde App.jsx
export function TodoList({ todos, checkTodo, deleteTask }){
    // a un ul se le pasa un arreglo mapeado para que pueda crearse la lista
    // mediante otro componente llamado TodoItem
    return(<ul>
        { todos.map((todo)=> (
            <TodoItem key={todo.id} todo={todo} checkTodo={checkTodo} deleteTask={deleteTask}/>
        ))}
    </ul>); 
}