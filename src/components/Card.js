import React from 'react'

export default function Card({ index, todo, updateTodo, deleteTodo, username, complete, del }) {
    return (
        <div key={index} className='px-4 py-2 rounded border-gray-100 border-2 shadow-lg'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <p className='font-medium'>{todo.title}</p>
                    <p className='text-xs px-2 py-0.5 rounded-sm bg-blue-700 text-white'>{todo.category}</p>
                    {username === "Admin" ? <p className='text-xs px-2 py-0.5 rounded-sm bg-amber-700 text-white'>{todo.userName}</p> : null}
                </div>
                <p className='font-gray-800'>{new Date(todo.date).toDateString()}</p>
            </div>
            <div className='flex justify-between'>
                <p className='text-sm text-gray-700'>{todo.description}</p>
            </div>
            <div className='flex justify-between'>
                {complete ? <button className='bg-green-500 px-4 py-0.5 text-white rounded text-sm mt-2' onClick={() => { updateTodo(todo._id, todo) }}> Complete </button> : null}
                {del ? <button className='bg-red-500 px-4 py-0.5 text-white rounded text-sm mt-2' onClick={() => { deleteTodo(todo._id) }}>Delete</button> : null}
            </div>
        </div>
    )
}
