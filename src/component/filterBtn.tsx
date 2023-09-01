const filterBtn = (props: {
  status: string;
  filter: string;
  sortBy: string;
  filterFunction: () => Promise<void>;
}) => {
  const { status, filter, filterFunction } = props;
  return (
    <button
      className={`${
        filter === status
          ? "bg-indigo-700 font-bold text-white"
          : "bg-white text-black"
      } w-full  rounded-2xl py-3 text-lg capitalize transition hover:scale-105`}
      onClick={filterFunction}
    >
      {status}
    </button>
  );
};

export default filterBtn;
