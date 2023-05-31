import * as React from 'react';
import { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
const defaultTodos = [
	{
		id: 1,
		title: 'Walk Lunar',
		complete: false,
	},
	{
		id: 2,
		title: 'Eat Breakfast',
		complete: false,
	},
	{
		id: 3,
		title: 'Learn Japanese',
		complete: false,
	},
];

const IndexPage = () => {
	const [todos, setToDos] = useState([]);
	const [totalCompleted, setTotalCompleted] = useState(0);
	useEffect(() => {
		// if no todos in local storage, set default to dos
		setToDos(defaultTodos);
		// else use local storage todos
	}, []);

	console.log({ todos, totalCompleted });

	useEffect(() => {
		const totalCompleted = todos.reduce(
			(acc, curr) => (curr.complete ? acc + 1 : acc),
			0
		);
		setTotalCompleted(totalCompleted);
	}, [todos]);

	const handleSubmitToDo = (e) => {
		e.preventDefault();
		if (e.keyCode !== 13 || !e.target.value) return;
		const newToDo = {
			id: todos.length + 1,
			title: e.target.value,
			complete: false,
		};
		setToDos([...todos, newToDo]);
		e.target.value = '';
	};

	const handleCheckedTodo = (e) => {
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

	return (
		<main className='flex justify-center flex-col items-center gap-2 font-mono p-10 h-full'>
			<div
				id='todo-list'
				className='bg-white rounded-2xl rounded-t-0 p-6 shadow-lg gap-4 flex flex-col absolute max-h-[80vh] top-[10vh] max-w-[80vw] min-w-[50vw]'
			>
				<div className='z-10 text-center'>
					<h1 className='text-2xl font-bold mb-2'>Daily To Do List</h1>
					<p className='text-sm'>
						{totalCompleted}/{todos.length} ✅
					</p>
				</div>
				<div id='todos' className='overflow-y-auto overflow-x-hidden px-4'>
					{todos.map((todo, index) => {
						return (
							<div className='flex gap-4 py-4 border-b last:border-b-0 justify-between'>
								<div className='flex gap-4 min-w-0'>
									<input
										type='checkbox'
										id={todo.id}
										name='todo'
										value={todo.title}
										className='peer checked:bg-blue-[#23a6d5]'
										checked={todo.complete}
										onChange={handleCheckedTodo}
									/>
									<label
										for={todo.id}
										className='peer-checked:line-through text-ellipsis overflow-hidden hover:overflow'
									>
										{todo.title}
									</label>
								</div>
								<div
									className='cursor-pointer'
									onClick={() => handleDeleteTodo(todo.id)}
								>
									<FaRegTrashAlt />
								</div>
							</div>
						);
					})}
				</div>
				<input
					class='placeholder:text-slate-400 block bg-white w-full border rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm text-center'
					placeholder='Go for a run'
					type='text'
					name='add-todo'
					onKeyUp={handleSubmitToDo}
				/>
			</div>
		</main>
	);
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
