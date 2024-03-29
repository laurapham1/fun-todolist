import * as React from 'react';
import { useState, useEffect } from 'react';
import {
	FaRegTrashAlt,
	FaRegCheckCircle,
	FaUndo,
	FaHandHoldingHeart,
	FaCross,
	FaTimes,
} from 'react-icons/fa';

const IndexPage = () => {
	const [todos, setToDos] = useState([]);
	const [totalCompleted, setTotalCompleted] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// if todos in local storage, set to dos
		if (localStorage.getItem('todos')) {
			const storedTodos = JSON.parse(localStorage.getItem('todos'));
			setToDos(storedTodos);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		const totalCompleted = todos.reduce(
			(acc, curr) => (curr.complete ? acc + 1 : acc),
			0
		);
		setTotalCompleted(totalCompleted);
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	const handleSubmitToDo = (e) => {
		e.preventDefault();
		if (e.keyCode !== 13 || !e.target.value) return;
		const newToDo = {
			id: todos[todos.length - 1]?.id + 1 || 0,
			title: e.target.value,
			complete: false,
		};
		setToDos([...todos, newToDo]);
		e.target.value = '';
	};

	const handleCheckTodo = (e) => {
		e.preventDefault();
		const updatedTodoIndex = todos.findIndex(
			(todo) => todo.id === parseInt(e.target.id, 10)
		);
		const updatedTodo = todos.find(
			(todo) => todo.id === parseInt(e.target.id, 10)
		);
		todos[updatedTodoIndex] = {
			...updatedTodo,
			complete: !updatedTodo.complete,
		};
		setToDos([...todos]);
	};

	const handleDeleteTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setToDos(newTodos);
	};

	const handleClearTodo = () => setToDos([]);

	if (isLoading) {
		return (
			<main className='flex items-center justify-center flex-col gap-4 m-4 text-lg h-screen'>
				<div class='loader'></div>
			</main>
		);
	}
	return (
		<main className='flex justify-end flex-col items-center gap-2 p-6 font-light h-[100vh]'>
			<div
				id='todo-list'
				className='bg-white rounded-2xl rounded-t-0 p-6 shadow-lg gap-4 flex flex-col absolute max-h-[80vh] top-[10vh] max-w-[80vw] min-w-[50vw] md:min-w-[30vw]'
			>
				<div className='z-10 text-center'>
					<div>
						<h1 className='text-2xl font-light mb-2'>Daily To Do List</h1>
					</div>
					<div className='flex items-center justify-center gap-2'>
						<p className='text-sm'>
							{totalCompleted}/{todos.length}
						</p>
						<FaRegCheckCircle className='fill-green-600' />
					</div>
				</div>
				<div id='todos' className='overflow-y-auto overflow-x-hidden px-4'>
					{todos.map((todo, index) => {
						return (
							<div className='flex gap-4 py-4 border-b last:border-b-0 justify-between'>
								<div className='flex gap-4 min-w-0 w-full items-center'>
									<input
										type='checkbox'
										id={todo.id}
										name='todo'
										value={todo.title}
										className='peer checked:bg-blue-500 cursor-pointer h-fit'
										checked={todo.complete}
										onChange={handleCheckTodo}
										onKeyDown={(e) => e.code === 'Enter' && handleCheckTodo(e)}
									/>
									<label
										for={todo.id}
										className='peer-checked:line-through text-ellipsis overflow-hidden hover:overflow cursor-pointer w-full'
									>
										{todo.title}
									</label>
								</div>
								<button
									className='cursor-pointer flex items-center'
									onClick={() => handleDeleteTodo(todo.id)}
								>
									<FaTimes className='text-gray-500 text-sm hover:bg-gray-100 rounded' />
								</button>
							</div>
						);
					})}
				</div>
				<input
					class='placeholder:text-slate-400 block bg-white w-full border rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-md text-center'
					placeholder='Go for a run 🏃🏻‍♀️'
					type='text'
					name='add-todo'
					onKeyUp={handleSubmitToDo}
				/>
				{todos.length > 0 && (
					<div className='flex justify-end'>
						<button
							onClick={() => handleClearTodo()}
							className='p-2 py-1 rounded text-sm hover:bg-gray-100'
						>
							<p>clear all</p>
						</button>
					</div>
				)}
			</div>
			<footer>
				<span className='flex items-center gap-2'>
					Made with <FaHandHoldingHeart /> by Laura P.
				</span>
			</footer>
		</main>
	);
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
