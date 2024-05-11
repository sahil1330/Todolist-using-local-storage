import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let warning = window.confirm("Are you sure, you want to delete this todo?")
    if (warning) {
      let newTodos = todos.filter(item => {
        return item.id !== id;
      })
      setTodos(newTodos)
      saveToLS()
    }

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // let index = todos.findIndex(item => {
    //   return item.id === id;
    // })
    // let newTodos = [...todos]
    // newTodos[index].isCompleted = !newTodos[index].isCompleted
    // setTodos(newTodos)

    todos.filter(item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
        setTodos([...todos])
        saveToLS()
      }
    })


  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-bold text-3xl text-center'>Task Manager - Save youe tasks</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 disabled:bg-violet-400 hover:bg-violet-950 p-4 py-2 rounded-full mx-3  text-white text-sm font-bold'>Save</button>
          </div>
        </div>
        <input type="checkbox" className='my-4' id='show' onChange={toggleFinished} checked={showFinished} />
        <label htmlFor="show" className='mx-2'>Show Finsished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h1 className='text-2xl font-bold'>Your  Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (
              (showFinished || !item.isCompleted) &&
              <div key={item.id} className="todo flex md:w-full justify-between my-3">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 rounded-md mx-1 text-white text-sm font-bold'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 rounded-md mx-1 text-white text-sm font-bold'><MdDelete /></button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default App
