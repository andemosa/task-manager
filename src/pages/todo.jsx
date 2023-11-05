/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import Todo from "../components/Todo";

import { useThemeSwitch } from "../hook/useThemeSwitch";

const initialStateTodos = [
  { id: 1, title: "Go To the Gym", completed: false },
  { id: 2, title: "Complete Online JavaScript course", completed: true },
  { id: 3, title: "10 min meditation", completed: false },
  { id: 4, title: "Complete Course", completed: false },
];

const filterTodos = (todos = [], filter) => {
  switch (filter) {
    case "all":
      return todos;
    case "active":
      return todos.filter((todo) => !todo.completed);
    case "completed":
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

const TodoPage = ({ user, setUser }) => {
  const { theme, changeTheme } = useThemeSwitch();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTodos = filterTodos(todos, filter);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      setTodos(todos);
    } else {
      setTodos(initialStateTodos);
    }
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const newTodos = [...todos];

    const [reorderedItem] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = [
      ...todos,
      { id: uuidv4(), title: todo, completed: false },
    ];
    setTodos(newTodos);
    setTodo("");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleCheck = (id) => {
    const newTodos = [...todos];
    const item = newTodos.find((item) => item.id === id);
    item.completed = !item.completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handleDelete = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((item) => item.id === id);
    newTodos.splice(idx, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const clearCompleted = () => {
    const activeTodos = todos.filter((todo) => !todo.completed);
    setTodos(activeTodos);
    localStorage.setItem("todos", JSON.stringify(activeTodos));
  };

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  return (
    <div
      className={`h-screen transition-all duration-500 bg-[#f6f6f8] dark:bg-[#161622]`}
    >
      <header
        className={`bg-[url('/images/bg-desktop-light.jpg')] h-52 bg-center bg-cover transition-all duration-500 dark:bg-[url('/images/bg-desktop-dark.jpg')]`}
      ></header>
      <main className="flex flex-col mt-[-150px]  mx-10 ">
        <div className="flex flex-col sm:flex-row gap-2 justify-between items-center w-full max-w-[550px] mx-auto h-full ">
          <h1 className="text-white text-3xl self-start">{user.Name} - TODO</h1>
          <div className="flex gap-4 items-center self-end">
            <img
              src={`${
                theme === "dark"
                  ? "./images/icon-sun.svg"
                  : "./images/icon-moon.svg"
              }`}
              alt=""
              className="cursor-pointer"
              onClick={changeTheme}
            />
            <button className="text-slate-600 dark:text-[#c8cae1]" onClick={() => setUser(null)}>
              Log out
            </button>
          </div>
        </div>
        <form className="w-full max-w-[550px] mx-auto" onSubmit={handleSubmit}>
          <div className="flex relative mt-6 w-full">
            <div
              className={`flex justify-center items-center cursor-pointer absolute rounded-full border-[1px] h-[26px] w-[26px] border-slate-300 left-3 bottom-[13px] text-white`}
            >
              &nbsp;
            </div>
            <input
              type="text"
              placeholder="Create a new todo..."
              className={`rounded-md w-full p-3 pl-[52px] outline-none border-none text-slate-600 dark:text-[#c8cae1] bg-white dark:bg-[#25273d]`}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="mt-[22px]">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredTodos.map(({ id, title, completed }, index) => {
                      return (
                        <Draggable key={id} draggableId={`${id}`} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Todo
                                title={title}
                                completed={completed}
                                id={id}
                                handleCheck={handleCheck}
                                handleDelete={handleDelete}
                              />
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            <div
              className={` flex gap-2 justify-between bg-white dark:bg-[#25273d] w-full p-3  outline-none border-b-[1px] border-slate-300 dark:border-[#36384d] text-slate-600 dark:text-[#c8cae1]`}
            >
              <div>{itemsLeft} items left</div>
              <div className="gap-3 hidden md:flex">
                <div
                  className={`cursor-pointer  ${
                    filter === "all" ? "text-[#3A7BFD]" : ""
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </div>
                <div
                  className={`cursor-pointer  ${
                    filter === "active" ? "text-[#3A7BFD]" : ""
                  }`}
                  onClick={() => setFilter("active")}
                >
                  Active
                </div>
                <div
                  className={`cursor-pointer ${
                    filter === "completed" ? "text-[#3A7BFD]" : ""
                  }`}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </div>
              </div>
              <div className="cursor-pointer" onClick={clearCompleted}>
                Clear Completed
              </div>
            </div>
            <div className="gap-3 flex md:hidden my-2 justify-center bg-white dark:bg-[#25273d] w-full p-3  outline-none border-b-[1px] border-slate-300 dark:border-[#36384d] text-slate-600 dark:text-[#c8cae1]">
              <div
                className={`cursor-pointer  ${
                  filter === "all" ? "text-[#3A7BFD]" : ""
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </div>
              <div
                className={`cursor-pointer  ${
                  filter === "active" ? "text-[#3A7BFD]" : ""
                }`}
                onClick={() => setFilter("active")}
              >
                Active
              </div>
              <div
                className={`cursor-pointer ${
                  filter === "completed" ? "text-[#3A7BFD]" : ""
                }`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </div>
            </div>
            <p className="mt-6 mb-2 text-center text-slate-600 dark:text-[#c8cae1]">
              Drag and drop to reorder list
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default TodoPage;
