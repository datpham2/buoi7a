import { React, useEffect, useState } from 'react'
import './todo.css'

export default function Todo() {
    const [taskInput, setTaskInput] = useState('')
    const addTask = (task) => {
        // Add task to local storage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        tasks.push({ content: task, isCompleted: false })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        // Load tasks to UI
        const taskList = document.getElementById('task-list')
        taskList.innerHTML = ''
        tasks.forEach(task => {
            // add to local storage
            const li = document.createElement('li')
            // include checkbox, task content with class 'task', and delete button
            // with class 'delete'
            li.innerHTML = `<input type='checkbox' ${task.isCompleted ? 'checked' : ''} />`
            li.innerHTML += `<span class='task ${task.isCompleted ? 'completed' : ''}'>${task.content}</span>`
            li.innerHTML += `<span class='delete'>X</span>`
            taskList.appendChild(li)

            // Add event listener for checkbox
            li.querySelector('input').addEventListener('change', () => {
                task.isCompleted = !task.isCompleted
                localStorage.setItem('tasks', JSON.stringify(tasks))
                li.querySelector('.task').classList.toggle('completed')
            })

            // Add event listener for delete button
            li.querySelector('.delete').addEventListener('click', () => {
                // add className for animation
                li.classList.add('delete-animation')
                li.style.animationPlayState = 'running'
                li.addEventListener('animationend', () => {
                    console.log('animationend')
                    li.remove()
                })

                const index = tasks.indexOf(task)
                tasks.splice(index, 1)
                localStorage.setItem('tasks', JSON.stringify(tasks))
                // li.remove()
            }
            )


        })

    }

    const filterTasks = (type) => {
        const taskList = document.getElementById('task-list')
        taskList.innerHTML = ''
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        tasks.forEach(task => {
            if (type === 'checked' && !task.isCompleted) return
            if (type === 'unchecked' && task.isCompleted) return
            const li = document.createElement('li')
            li.innerHTML = `<input type='checkbox' ${task.isCompleted ? 'checked' : ''} />`
            li.innerHTML += `<span class='task ${task.isCompleted ? 'completed' : ''}'>${task.content}</span>`
            li.innerHTML += `<span class='delete'>X</span>`
            taskList.appendChild(li)

            li.querySelector('input').addEventListener('change', () => {
                task.isCompleted = !task.isCompleted
                localStorage.setItem('tasks', JSON.stringify(tasks))
                li.querySelector('.task').classList.toggle('completed')
            })

            li.querySelector('.delete').addEventListener('click', () => {
                // add className for animation
                li.classList.add('delete-animation')
                li.style.animationPlayState = 'running'
                li.addEventListener('animationend', () => {
                    console.log('animationend')
                    li.remove()
                })


                const index = tasks.indexOf(task)
                tasks.splice(index, 1)
                localStorage.setItem('tasks', JSON.stringify(tasks))
                // li.remove()
            }
            )

        })
    }

    const checkAllTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        tasks.forEach(task => {
            task.isCompleted = true
        })
        localStorage.setItem('tasks', JSON.stringify(tasks))
        filterTasks('all')
    }

    const removeFilter = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        localStorage.setItem('tasks', JSON.stringify(tasks))
        filterTasks('all')
    }

    useEffect(() => {
        // Load tasks to UI
        const taskList = document.getElementById('task-list')
        taskList.innerHTML = ''
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []
        tasks.forEach(task => {
            // add to local storage
            const li = document.createElement('li')
            // include checkbox, task content with class 'task', and delete button
            // with class 'delete'
            li.innerHTML = `<input type='checkbox' ${task.isCompleted ? 'checked' : ''}/>`
            li.innerHTML += `<span class='task ${task.isCompleted ? 'completed' : ''}'>${task.content}</span>`
            li.innerHTML += `<span class='delete'>X</span>`
            taskList.appendChild(li)

            // Add event listener for checkbox
            li.querySelector('input').addEventListener('change', () => {
                task.isCompleted = !task.isCompleted
                localStorage.setItem('tasks', JSON.stringify(tasks))
                li.querySelector('.task').classList.toggle('completed')
            })

            // Add event listener for delete button
            li.querySelector('.delete').addEventListener('click', () => {
                // add className for animation
                li.classList.add('delete-animation')
                li.style.animationPlayState = 'running'
                li.addEventListener('animationend', () => {
                    console.log('animationend')
                    li.remove()
                })
                const index = tasks.indexOf(task)
                tasks.splice(index, 1)
                localStorage.setItem('tasks', JSON.stringify(tasks))
                // li.remove()
            }
            )

        })
    }, [])
  return (
    <div>
        <div className='container'>
            <h1 className='fw-bold'>To-Do List</h1>
            <input autoComplete='off' autoFocus type='text' id='taskInput'
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addTask(taskInput)
                    setTaskInput('')
                }
            }}
            placeholder='Add a new task...'
            value={taskInput} />
            <ul id='task-list'></ul>
            <div className='filter-buttons'>
                <button
                className='btn btn-primary mx-2 my-2'
                onClick={() => filterTasks('checked')}>Checked</button>
                <button 
                className='btn btn-primary mx-2 my-2'
                onClick={() => filterTasks('unchecked')}>Unchecked</button>
                <button 
                className='btn btn-primary mx-2 my-2'
                onClick={checkAllTasks}>Check All</button>
                <button 
                className='btn btn-primary mx-2 my-2'
                onClick={removeFilter}>Remove Filter</button>
            </div>
        </div>
    </div>
  )
}
