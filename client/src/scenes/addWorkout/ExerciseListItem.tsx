import { AddExerciseType } from "@/shared/types";

type Props = {
  id: string;
  name: string;
  order: number;
  exerciseList: AddExerciseType[];
  setExerciseList: (value: AddExerciseType[]) => void;
};

const ExerciseListItem = ({
  id,
  name,
  order,
  exerciseList,
  setExerciseList,
}: Props) => {
  const handleClick = () => {
    setExerciseList(
      exerciseList.filter((addedExercise) => addedExercise.exerciseId !== id)
    );
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <h4 className="font-bold">{name}</h4>
      <button
        className="rounded-lg bg-primary-300 px-3 py-1 transition duration-500 hover:text-white"
        onClick={handleClick}
      >
        &times;
      </button>
    </div>
  );
};

export default ExerciseListItem;
