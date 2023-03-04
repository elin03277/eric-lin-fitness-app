import { AddExerciseType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  id: string;
  name: string;
  equipment: string;
  pattern: string;
  instructions: string;
  exerciseList: AddExerciseType[];
  setExerciseList: (value: AddExerciseType[]) => void;
};

const ExerciseWorkoutAdd = ({
  id,
  name,
  equipment,
  pattern,
  instructions,
  exerciseList,
  setExerciseList,
}: Props) => {
  const handleClick = () => {
    setExerciseList([...exerciseList, { exerciseId: id, exerciseName: name }]);
  };

  return (
    <motion.div
      variants={childVariant}
      className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
    >
      <h4 className="font-bold">{name}</h4>
      <p className="my-3">Equipment: {equipment}</p>
      <p className="my-3">Pattern: {pattern}</p>
      <p className="my-3">Instructions: {instructions}</p>
      <button
        className="rounded-lg bg-primary-300 px-10 py-2 transition duration-500 hover:text-white"
        onClick={handleClick}
      >
        Add
      </button>
    </motion.div>
  );
};

export default ExerciseWorkoutAdd;
