import { useRouter } from "next/router";

function Todo(
  props: TodoItem & { removeTodo: (id: number) => Promise<void> } & {
    updateTodo: (id: number) => void;
  },
) {
  const {
    id,
    task,
    description,
    category,
    time,
    priority,
    fulfillment,
    removeTodo,
    updateTodo,
  } = props;
  return (
    <div
      className="flex items-center justify-evenly"
      style={{ paddingBottom: "4px", paddingTop: "4px" }}
    >
      <span className="w-28 text-center text-base font-semibold">{task}</span>
      <span className="w-52 text-center text-base font-medium">
        {description}
      </span>
      <span className="w-24 text-center text-base font-medium">{category}</span>
      <span className="w-28 text-center text-base font-medium">
        {time.substring(0, 10)}
      </span>
      <span className="w-20 text-center text-base font-medium">{priority}</span>
      <span className="w-28 text-center text-base font-medium">
        {fulfillment === 100 ? "Completed" : `${fulfillment}%`}
      </span>
      <span className="flex w-16 justify-evenly text-center text-base font-medium">
        <button
          onClick={() => {
            updateTodo(id);
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer transition hover:scale-105"
          >
            <g id="edit_note_FILL0_wght400_GRAD0_opsz48 1">
              <path
                id="Vector"
                d="M15 26.25V24.0312L21.75 17.2812L23.9688 19.5L17.2188 26.25H15ZM3.75 19.6875V17.8125H13.125V19.6875H3.75ZM25.3125 18.1562L23.0938 15.9375L24 15.0312C24.1667 14.8646 24.3854 14.7812 24.6563 14.7812C24.9271 14.7812 25.1458 14.8646 25.3125 15.0312L26.2188 15.9375C26.3854 16.1042 26.4688 16.3229 26.4688 16.5938C26.4688 16.8646 26.3854 17.0833 26.2188 17.25L25.3125 18.1562ZM3.75 14.5312V12.6562H18.4375V14.5312H3.75ZM3.75 9.375V7.5H18.4375V9.375H3.75Z"
                fill="black"
                fillOpacity="1"
              />
            </g>
          </svg>
        </button>
        <button
          id="delete-btn"
          onClick={() => {
            removeTodo(id);
          }}
        >
          <svg
            width={25}
            height={25}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer transition hover:scale-105"
          >
            <g id="delete_forever_FILL0_wght400_GRAD0_opsz48 1">
              <path
                id="Vector"
                d="M10.5292 19.5125L14 15.9833L17.5 19.5125L18.8708 18.1125L15.4 14.5833L18.8708 11.0542L17.5 9.65417L14 13.1833L10.5292 9.65417L9.12916 11.0542L12.6292 14.5833L9.12916 18.1125L10.5292 19.5125ZM7.61249 24.7333C7.14582 24.7333 6.73749 24.5583 6.38749 24.2083C6.03749 23.8583 5.86249 23.45 5.86249 22.9833V6.35833H4.66666V4.60833H10.15V3.73333H17.85V4.60833H23.3333V6.35833H22.1375V22.9833C22.1375 23.45 21.9625 23.8583 21.6125 24.2083C21.2625 24.5583 20.8542 24.7333 20.3875 24.7333H7.61249ZM20.3875 6.35833H7.61249V22.9833H20.3875V6.35833Z"
                fill="red"
                fillOpacity="0.8"
              />
            </g>
          </svg>
        </button>
      </span>
    </div>
  );
}

export default Todo;
