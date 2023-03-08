import { AddExerciseType, ExerciseType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  // accessToken: string;
};

const buttonStyle = `mx-2 mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white`;

const GetWorkoutQuery = `
query ($id: String!){
  getWorkout(id: $id) {
    name
    type
    description
    exercises {
      id
      name
      equipment
      pattern
      instructions
    }
  }
}
`;

const DisplayWorkout = ({ setSelectedPage }: Props) => {
  // , accessToken }: Props) => {
  const location = useLocation();
  const workoutId = location.state?.passedWorkoutId;
  const [id, setId] = useState<string>(workoutId);

  const [result, workoutDisplay] = useQuery({
    query: GetWorkoutQuery,
    variables: { id },
  });

  const workout = useMemo(() => result.data?.getWorkout || [], [result.data]);

  const test = () => {
    workoutId === undefined
      ? console.log("Select a workout")
      : console.log(result.data.getWorkout);
  };

  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  if (result.fetching)
    return (
      <div className="bg-gray-20">
        <motion.div
          className="mx-auto w-5/6 gap-16 py-20 md:h-full"
          onViewportEnter={() => setSelectedPage(SelectedPage.Workouts)}
        >
          {/* HEADER */}
          <motion.div
            //className="md:my-5 md:w-3/5"
            className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
            initial="hidden"
            animate="visible"
            // whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <HText>Loading...</HText>
            <p className="my-5">Type: Loading...</p>
            <p className="my-5">Description: Loading...</p>
          </motion.div>

          {/* EXERCISES */}
          <motion.div
            className="mt-5 items-center justify-between gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={container}
          >
            <Exercise
              name="Loading Name..."
              equipment="Loading..."
              pattern="Loading..."
              instructions="Loading..."
              setSelectedPage={setSelectedPage}
            />
          </motion.div>
        </motion.div>
      </div>
    );

  return (
    <div className="bg-gray-20">
      <motion.div
        className="mx-auto w-5/6  gap-16 py-20 md:h-full"
        onViewportEnter={() => setSelectedPage(SelectedPage.Workouts)}
      >
        {/* HEADER */}
        <motion.div
          //className="md:my-5 md:w-3/5"
          className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
          initial="hidden"
          animate="visible"
          // whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>{workout.name}</HText>
          <p className="my-5">{`Type: ${workout.type}`}</p>
          <p className="my-5">{`Description: ${workout.description}`}</p>
        </motion.div>

        {/* EXERCISES */}
        <motion.div
          className="mt-5 items-center justify-between gap-8" // md:flex"
          initial="hidden"
          animate="visible"
          //whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {workout.exercises.map(
            (
              { id, name, equipment, pattern, instructions }: ExerciseType,
              index: number
            ) => (
              <Exercise
                key={`${id}-${index}`}
                name={name}
                equipment={equipment}
                pattern={pattern}
                instructions={instructions}
              />
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DisplayWorkout;
