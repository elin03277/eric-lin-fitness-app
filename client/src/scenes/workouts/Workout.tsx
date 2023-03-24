import { Link } from "react-router-dom";

type Props = {
  id?: string;
  name: string;
  type: string;
  description: string;
};

const Workout = ({ id, name, type, description }: Props) => {
  const overlayStyles = `p-5 absolute z-32 flex 
    h-[380px] w-[450px] flex-col items-center justify-center
    whitespace-normal bg-primary-500 text-center text-white
    opacity-0 transition duration-500 hover:opacity-90`;

  return (
    <li className="relative mx-5 inline-block h-[380px] w-[450px] cursor-pointer">
      <Link
        to="/displayWorkout"
        state={{ passedWorkoutId: id }}
        className={overlayStyles}
      >
        <p className="text-2xl">{name}</p>
        <p className="mt-5">Type: {type}</p>
        <p className="mt-5">Description: {description}</p>
      </Link>
      <div
        className="flex h-[380px]
    w-[450px] flex-col items-center justify-center 
    bg-primary-100 p-5 text-center"
      >
        <p className="text-2xl">{name}</p>
      </div>
    </li>
  );
};

export default Workout;
