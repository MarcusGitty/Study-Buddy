import { useState} from 'react'
import { Button } from '@mui/material'


export default function AssignmentTracker() {

  const [showAddTask, setShowAddTask] = useState (false)   

  const [tasks, setTasks] = useState([
   
    {
        id: 1,
        text: 'MA2001 Assignment 1',
        day: 'June 22nd at 2:30pm',
        remidner: false,
    },
    {
        id: 2,
        text: 'CS2030S Assignment 2',
        day: 'June 23rd at 7pm',
        remidner: true,
    },
    {
        id: 3,
        text: 'CS2030S Quiz',
        day: 'July 21st at 9:30pm',
        remidner: false,
    },
    {
        id: 4,
        text: 'MA1521 Online quiz',
        day: 'May 21st at 9am',
        remidner: false,
    }
])
//add task
const addTask = (task) => {
  const id = Math.floor(Math.random() * 10000 )+ 1;
  const newTask = {id,...task}
  setTasks([...tasks,newTask])
}

//delete task
const deleteTask = (id) => {
  setTasks(tasks.filter((task)=> task.id!== id))
}

//toggle reminder
const toggleReminder = (id) => {
  setTasks(tasks.map((task) => task.id === id ? 
  { ...task, reminder: !task.reminder} : task))
}

  return (
    <div className="container">
     <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} />

     {showAddTask && <AddTask onAdd={addTask} />}


     {tasks.length >0 ?<Tasks tasks={tasks} onToggle={toggleReminder} 
     onDelete={deleteTask} /> 
     :
      'No Assingments'}
  
    </div>
  

  );
}

const AddTask = ({onAdd}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text){
            alert('Please add Assignment')
            return
        }
        onAdd({text, day, reminder})

        setDay('')
        setReminder(false)
        setText('')

    }


    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Assignment' value={text} onChange={(e) => setText(e.target.value)}/>

            </div>
            <div className='form-control form-control-check'>
                <label>Day and Time</label>
                <input type='text' placeholder='Add Day and Time' value={day} onChange={(e) => setDay(e.target.value)}></input>
            </div>
            <div className='form-control'>
                <label>Set Reminder</label>
                <input type='checkbox'
                checked={reminder}
                value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}></input>
            </div>

            <input type='submit' value='Save Assignment' className='btn btn-block' ></input>
        </form>
        
    )
}


const Task = ({task, onDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={
            () => onToggle(task.id)
        }>
            <h3>{task.text} 
            <Button style={{color:'red', cursor: 'pointer'}} 
            onClick={() => onDelete(task.id)}/>
            </h3>
            <p>{task.day}</p>
            
        </div>
    )
}

const Tasks = ({tasks, onDelete, onToggle}) => {
    return (
        <>
        {tasks.map((task) => (
        <Task key={task.id} task={task}
        onDelete={onDelete} onToggle={onToggle}/>)
        )
        }
        </>
    )
}

const Header = ({title, onAdd, showAdd}) => {


    return (
        <header className='header'>
            <h1> {title}</h1>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'}
            onClick={onAdd} />
        </header>
    )
}


Header.defaultProps = {
    title: 'Assignment Tracker',
  }