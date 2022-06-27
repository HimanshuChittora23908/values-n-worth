import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'

export default function Archive() {
    const [selected2, setSelected2] = useState(null)
    const [todo, setTodo] = useState(null)
    const [category, setCategory] = useState('')
    const navigate = useNavigate()
    const username = window.location.pathname.split('/')[1].replace(/\b\w/g, l => l.toUpperCase());
    const token = username === 'Himanshu' ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjJiNmU0MmEzMWFjYzJkOTI1MTQ0YmQzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTYxNTMzOTd9.k9W3JkTbxYGZ4rx6-OKybmqE4mzCA12dWrrgcFbNb5M' : (username === 'Vinamra' ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjJiNmU0YzkzMWFjYzJkOTI1MTQ0YmQ1Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTYxNTM0MjV9._kv3fWlMaMXKRFh8easmeWhW33bgb4He1QmA1sc69Ao' : (username === 'Raghhav' ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjJiNmU0ZDQzMWFjYzJkOTI1MTQ0YmQ3Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTYxNTM0NDl9.Iy3KhRUgKL3s9Ru0k5BIiFuR8lK_RicMii6_hzgcwq8' : (
        username === 'Aakash' ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjJiNmU0ZGQzMWFjYzJkOTI1MTQ0YmQ5Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTYxNTM0Nzh9.729xHPmvxJrC0gsxHXRPjxEEeBuSMbmmtNfnZT_hlyM' : username === "Admin" ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjJiNmU0ZjEzMWFjYzJkOTI1MTQ0YmRiIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTYxNTM1MDZ9.0upHzP_V3wmnawsP22Zbr9xj6i4D1Y-vjA4ZitkpZS8'
            : '')))

    const getTodos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/getTodos?token=' + token + '&category=' + category + '&status=' + 'Completed' + '&username=' + username)
            setTodo(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTodo = async (id) => {
        try {
            const res = await axios.delete('http://localhost:5000/deleteTodo?token=' + token + '&id=' + id)
            getTodos()
        } catch (err) {
            console.log(err)
        }
    }

    const updateTodo = async (id, todo) => {
        try {
            const res = await axios.put('http://localhost:5000/updateTodo?token=' + token + '&id=' + id, {
                title: todo.title,
                description: todo.description,
                userName: todo.userName,
                category: todo.category,
                date: todo.date,
                status: 'Completed'
            })
            getTodos()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    useEffect(() => {
        getTodos()
    }, [category])

    return (
        <div className='grid grid-cols-6 h-screen divide-x-2'>
            <div className='flex flex-col divide-y-2'>
                <div className='py-4 px-8 flex flex-col gap-2'>
                    {['Personal', 'Home', 'Office', 'Travel'].map((text, index) => {
                        return (
                            <div key={index}>
                                {selected2 === index ? (
                                    <p className='bg-green-500 font-medium px-4 py-1 rounded text-white' onClick={() => setSelected2(index)}>
                                        {text}
                                    </p>
                                ) : (
                                    <p
                                        onClick={() => {
                                            setSelected2(index);
                                            setCategory(text);
                                        }}
                                        className='cursor-pointer px-4 py-1'
                                    >
                                        {text}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>
                <div className='py-4 px-8 flex gap-2'>
                    <p className='cursor-pointer px-4 py-1' onClick={() => { navigate('/' + window.location.pathname.split('/')[1]) }}>Home</p>
                </div>
            </div>
            <div className='flex flex-col gap-4 py-8 px-8 col-span-5'>
                {todo && todo.map((todo, index) => {
                    return (
                        <Card key={index} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} username={username} />
                    )
                })}
            </div>
        </div >
    )
}
