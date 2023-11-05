/* eslint-disable react/prop-types */

const Todo = ({ title, completed, id, handleCheck, handleDelete }) => {
  return (
    <div>
      <div
        className={`bg-white dark:bg-[#25273d] w-full p-3  outline-none border-b-[1px] flex border-slate-300 dark:border-[#36384d] text-slate-600 dark:text-[#c8cae1] `}
      >
        <div
          className={` flex justify-center items-center rounded-full border-[1px] cursor-pointer ${
            completed ? "checkColor h-[26px] w-[26px] " : "p-3"
          }  mx-2 text-slate-600 dark:text-[#c8cae1]`}
          onClick={() => {
            handleCheck(id);
          }}
        >
          <span className="select-none">{completed ? "✓" : ""}</span>
        </div>
        <span
          className={`flex-1 select-none ${completed ? "line-through" : ""}`}
        >
          {title}
        </span>
        <span
          className="flex items-center justify-center cursor-pointer"
          onClick={() => handleDelete(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7851 0.471404L11.3137 0L5.89256 5.42115L0.471404 0L0 0.471404L5.42115 5.89256L0 11.3137L0.471404 11.7851L5.89256 6.36396L11.3137 11.7851L11.7851 11.3137L6.36396 5.89256L11.7851 0.471404Z"
              fill="#4b5083"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Todo;
