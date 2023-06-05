import { useEffect, useRef, useState } from "react";
import './data.css'
import checkIcon from '../../public/verified.png'
import editIcon from '../../public/edit.png'
import deleteIcon from '../../public/delete.png'
import Image from 'next/image';

export default function Data() {
    const [tasks, setTask] = useState([])
    const [click, setClick] = useState(false)
    const [IDs, setID] = useState([])
    const nomeTarefaRef = useRef(null)
    const novoNomeTarefaRef = useRef(null)

    async function clickHandlerUpdate(task) {
        const data = await fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: task.id,
                description: task.description,
                done: !task.done,
            })
        })
        getListTasks()
    }

    async function clickHandlerUpdateName(task, event) {
        event.preventDefault()
        const data = await fetch(`http://localhost:3001/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: task.id,
                description: novoNomeTarefaRef.current.value,
                done: false,
            })
        })
        getListTasks()
    }

    async function clickHandlerDelete(id) {
        const data = await fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        getListTasks()
    }

    async function clickHandlerCreate(event) {
        event.preventDefault()
        const data = await fetch(`http://localhost:3001/tasks/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description: nomeTarefaRef.current.value,
                done: false,
            })
        })
        getListTasks()
    }

    async function clickHandler(id) {
        setClick(click => !click)
        setID(id)
    }

    const getListTasks = async () => {
        const data = await fetch('http://localhost:3001/tasks')
        const dataJson = await data.json()
        setTask(dataJson)
    }

    useEffect(() => {
        getListTasks()
    }, [])


    return (
        <div>
            <div className="flex py-5 rounded-lg justify-center items-center w-80 mx-auto">
                <form>
                    <input ref={nomeTarefaRef} type="text" className="rounded black-text" placeholder="Nome da tarefa"></input>{" "}
                    <button onClick={clickHandlerCreate} className="bg-green-500 hover:bg-green-700 text-white font-bold py-0 px-2 rounded">Criar</button>
                </form>
            </div>
            <div className="flex py-2 justify-center items-center mx-auto">
                <ul className="border py-5 rounded-lg">
                    {tasks.map((task) =>
                        <li key={task.id} className={`py-2 px-2 ${task.done ? 'done' : ''}`}>
                            &quot;{task.description}&quot;{" "}<br></br>
                            <button className={`mx-1 ${task.done ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`} onClick={() => { clickHandlerUpdate(task) }}><Image src={checkIcon} /></button>
                            <button id="createButton" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => { clickHandlerDelete(task.id) }}><Image src={deleteIcon} /></button>
                            <button className="mx-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => { clickHandler(task.id) }}><Image src={editIcon} /></button>
                            {click && IDs == task.id && (<form className="py-2">
                                <input ref={novoNomeTarefaRef} type="text" className="my-2 rounded black-text" placeholder="Novo nome da tarefa"></input><br></br>
                                <button onClick={(e) => { clickHandlerUpdateName(task, event); setClick(false) }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-0 px-2 rounded">Atualizar</button>
                            </form>)}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}