import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <div>
      <Image
        src={`https://ik.imagekit.io/75bfsfl5j/TodoList_Nextjs/todo_hero.png?updatedAt=1694339778769`}
        alt="hero image"
        width={90}
        height={90}
      />
    </div>
  );
};

export default Home;
