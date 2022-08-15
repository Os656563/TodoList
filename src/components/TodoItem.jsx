import React from "react";

//TodoItem es los objetos que van en los <li> de la lista de TodoList
// todo es las propiedades de los objetos en el arreglo de todos en TodoList
// checkTodo es una funcion que viene desde App.jsx para que se pueda utilizar en TodoItem
export function TodoItem({ todo, checkTodo, deleteTask }){
    const {id, task, completed } = todo;
    //escucha cuando se marca o desmarca el CheckBox y utiliza la funcion checkTodo  
    const toggleChek = () => {
        //Esta funcion es la que esta en APP.js
        // esta informacion sube hacia el padre
        checkTodo(id)
    }

    const deleteItem = () => {
        deleteTask(id)
    }

    // checlet utiliza la propiedad completed de todo.completed
    return(
    <li>
        <input type="checkBox" checked={completed} onChange={toggleChek}/>
        {task}
        <button onClick={deleteItem}>x</button>
    </li>
    ); 
}