import Image from "next/image";

function Todo(props: TodoItem) {
  const { task, description, category, time, priority, fulfillment } = props;
  return (
    <div
      className="flex justify-evenly items-center"
      style={{ paddingBottom: "4px", paddingTop: "4px" }}
    >
      <span className="w-28 font-semibold text-base text-center">{task}</span>
      <span className="w-52 font-medium text-base text-center">
        {description}
      </span>
      <span className="w-24 font-medium text-base text-center">{category}</span>
      <span className="w-28 font-medium text-base text-center">
        {time.substring(0, 10)}
      </span>
      <span className="w-16 font-medium text-base text-center">{priority}</span>
      <span className="w-28 font-medium text-base text-center">
        {fulfillment === 100 ? "Completed" : `${fulfillment}%`}
      </span>
      <span className="w-16 font-medium text-base text-center flex gap-3">
        <Image
          src={`edit.svg`}
          alt="edit button"
          width={25}
          height={25}
          className="transition hover:scale-105 "
        />
        <Image
          src={`delete.svg`}
          alt="delete button"
          width={25}
          height={25}
          className="transition hover:scale-105 "
        />
      </span>
    </div>
  );
}

export default Todo;
