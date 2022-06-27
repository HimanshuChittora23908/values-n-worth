import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import axios from 'axios'

export default function Navbar() {
    let [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [category, setCategory] = useState('Personal')
    const [error, setError] = useState([]);

    var errorLength = 0;

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const validate = () => {
        setError([]);
        errorLength = 0;

        if (!title) {
            setError((error) => [...error, { type: "title", message: "Title is required" },]);
            errorLength++;
        }
        if (title.length > 32) {
            setError((error) => [...error, { type: "title", message: "Title must be less than equals to 32 characters" },]);
            errorLength++;
        }
        if (!description) {
            setError((error) => [...error, { type: "description", message: "Description is required" },]);
            errorLength++;
        }
        if (!date) {
            setError((error) => [...error, { type: "date", message: "Date is required" },]);
            errorLength++;
        }
        if (date && new Date(date) < new Date(Date.now() - (24 * 60 * 60 * 1000))) {
            setError((error) => [...error, { type: "date", message: "Date must be of today or of future" },]);
            errorLength++;
        }

        if (errorLength === 0) {
            axios.post('http://127.0.0.1:5000/addTodo', {
                title: title,
                description: description,
                userName: window.location.pathname.split('/')[1].replace(/\b\w/g, l => l.toUpperCase()),
                status: 'Pending',
                date: date,
                category: category
            })
            closeModal()
            window.location.reload()
        }
        else {
            console.log(error)
        }
    }

    return (
        <>
            <div className='flex px-8 py-4 justify-between shadow items-center'>
                <p className='text-black font-black'>TASKS</p>
                {window.location.pathname.split('/')[1].replace(/\b\w/g, l => l.toUpperCase()) !== "Admin" ? <button className='bg-blue-800 text-white py-2 px-4 rounded-md font-medium' onClick={openModal}>+ New Task</button> : null}
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                                    >
                                        Add Todo
                                    </Dialog.Title>
                                    <div className='mt-4'>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="col-span-1">
                                                <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
                                                    Time
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        id="title"
                                                        type="text"
                                                        className="form-input block w-full sm:text-sm sm:leading-5"
                                                        placeholder="Title"
                                                        required
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                    />
                                                    {error.length > 0
                                                        ? error.map((item, index) => {
                                                            if (item.type === "title") {
                                                                return (
                                                                    <p className="text-red-500 text-xs" key={index}>
                                                                        {item.message}
                                                                    </p>
                                                                );
                                                            }
                                                        })
                                                        : null}
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">
                                                    Description
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        id="description"
                                                        type="text"
                                                        className="form-input block w-full sm:text-sm sm:leading-5"
                                                        placeholder="Description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                    />
                                                    {error.length > 0
                                                        ? error.map((item, index) => {
                                                            if (item.type === "description") {
                                                                return (
                                                                    <p className="text-red-500 text-xs" key={index}>
                                                                        {item.message}
                                                                    </p>
                                                                );
                                                            }
                                                        })
                                                        : null}
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="date" className="block text-sm font-medium leading-5 text-gray-700">
                                                    Due Date
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <input
                                                        id="date"
                                                        type="date"
                                                        className="form-input block w-full sm:text-sm sm:leading-5"
                                                        placeholder="Due Date"
                                                        required
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    />
                                                    {error.length > 0
                                                        ? error.map((item, index) => {
                                                            if (item.type === "date") {
                                                                return (
                                                                    <p className="text-red-500 text-xs" key={index}>
                                                                        {item.message}
                                                                    </p>
                                                                );
                                                            }
                                                        })
                                                        : null}
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <label htmlFor="category" className="block text-sm font-medium leading-5 text-gray-700">
                                                    Category
                                                </label>
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <select id="category" className="form-select block w-full sm:text-sm sm:leading-5" required value={category} onChange={(e) => setCategory(e.target.value)}>
                                                        <option value="Personal">Personal</option>
                                                        <option value="Home">Home</option>
                                                        <option value="Office">Office</option>
                                                        <option value="Travel">Travel</option>
                                                    </select>
                                                    {error.length > 0
                                                        ? error.map((item, index) => {
                                                            if (item.type === "category") {
                                                                return (
                                                                    <p className="text-red-500 text-xs" key={index}>
                                                                        {item.message}
                                                                    </p>
                                                                );
                                                            }
                                                        })
                                                        : null}
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <button className="bg-blue-800 text-white py-2 px-4 rounded-md font-medium" onClick={(e) => {
                                                    e.preventDefault();
                                                    validate();
                                                }}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog >
            </Transition >
        </>
    )
}
