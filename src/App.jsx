import React, { Fragment, useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";
//se agrego libreria para agregar ids de manera Random y no tener problemas al manejarla
import { v4 as uuid } from 'uuid';

// constate para guardar y buscar en local storage la lista de todos
const save = "saveTodos";

export function App(){
    // *useState* se usa para cambiar el estado, el estado es un propiedad 
    // que hace que cada que guardemos en una propiedad esta se 
    // renderice y cambie(re-renderice y cambair el DOM)
    //-Todos es el estado en si
    //-setTodos modifica el estado
    const [todos, setTodos] = useState([
        {id: 1, task: 'Tarea 1', completed: false}
    ]);

    //react identifica el componente al que se le hace uso con ref
    // el hook useRef se hace esa referencia
    const newTaskRef = useRef();

    //Use Efect es un metodo de ciclo de vida del componente, que permite ejecutar codigo cuando
    // se crea, se destruye, etc.
    // useEffect(() => {
        //funcion de callback
      // }, [
      //array de dependencias que hacen que si tu lo dejas vacio '[]' hacen que se ejecute el calback
      //Pero si tu lo que quieres es que se ejecute continuamente, colocas aqui las variables o depenedencias
      // que quieres que este escuchando para ejecutar ese use efect o no
    //]);

    //Busca si ya esta guardada una lista en la memoria del navegador
    useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(save));
      //Si existe actualiza el estado de la lista Todos
      if(storedTodos){
        setTodos(storedTodos);
      }
    }, []);

    //Se usa para gaurdar en la memoria del navegador la lista creada
    useEffect(() => {
      localStorage.setItem(save, JSON.stringify(todos));
    }, [todos]);
    
    //->funcion de check para identificar si las tareas estan terminadas
    // recibe el id del todo 
    const checkTodo = (id) =>{
      // copia de todos, copia del array
      const newTodos = [...todos];
      // busca en el arreglo de todos el todo que tenga el id igual al que se le esta pasando
      const todo = newTodos.find((todo) => todo.id === id);
      //cuando lo encuentre se le asigna el valor al contrario de la propiedad completed
      todo.completed = !todo.completed;
      //Se le para el nuevo array a set Todos para que se pueda re-renderizar 
      setTodos(newTodos);
    }
    
    //->funcion para borrar las tareas completadas
    const clearFinishedTask = () => {
      // busca todos los lementos que no esten seleccionados(true) y los trae 
      const newTodos = todos.filter((todo) => !todo.completed);
      setTodos(newTodos);

    }
    //->Borra una tarea del arreglo todo 
    const deleteTask = (id) =>{
      // copia de todos, copia del array
      const newTodos = [...todos];
      // busca en el arreglo de todos los todo a todos los que sean diferentes al id
      const todo = newTodos.filter((todo) => todo.id !== id);

      //Se le para el nuevo array a set Todos para que se pueda re-renderizar 
      setTodos(todo);
    }

    //->funcion para gregar nuevas tareas a la lista
    const TodoListAdd = () =>{
      //la tarea que se quiere agregar esta en esa referencia 'newTaskRef'
      const task = newTaskRef.current.value;
      // si el string esta vacio no se ahce anda
      if(task === '') return;

      // Se añade la nueva tarea
      // Se maneja el array de manera inmutable para que pueda manejar react los cambios
      // Si se hacen cambios en el estado siempre se tienen que hacer una copia del anterior estado
      // no se puede modificar directamente, si no react no puede localizar el estado y no puede renderizar
      setTodos((prevTodos)=>{
        return [...prevTodos, {id: uuid(), task, completed: false}]
      })
      // hace un "" al input 
      newTaskRef.current.value = null;
    }



    //-TodoList es un componente de la carpeta components
    //-todos es una propiedad dentro de TodoList
    //Las propiedades de los componetes se pasan entre llaves
    return(
      //Solo puede haver una raiz, es como el template unico de vuejs
      //fragment lo que hace es que te permite poder manejarlo sin que tengas que 
      // meter el input en otro componente o usar un div para encapsularlos
        <Fragment>
            <TodoList todos={todos} checkTodo={checkTodo} deleteTask={deleteTask}/>
            <input ref={newTaskRef} type="text" placeholder="Nueva tarea"/>
            <button onClick={TodoListAdd}>+</button>
            <button onClick={clearFinishedTask}>-</button>
            <div>
              Te quedan {todos.filter((todos)=>!todos.completed).length} tareas por completar
            </div>
        </Fragment>
        //a un evento onClikc se le asigna un manejador 
        //funcion todoListAdd entre llaves para poder agregar nuevos elementos a la lista TodoList
    );
}