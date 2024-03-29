import { ExerciseType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

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
      group
      type
      instructions
    }
  }
}
`;

const DisplayWorkout = ({ setSelectedPage }: Props) => {
  const location = useLocation();
  const workoutId = location.state?.passedWorkoutId;
  const [id, setId] = useState<string>(workoutId);

  const [result] = useQuery({
    query: GetWorkoutQuery,
    variables: { id },
  });

  const workout = useMemo(() => result.data?.getWorkout || [], [result.data]);

  if (result.fetching)
    return (
      <div className="bg-gray-20">
        <motion.div
          className="mx-auto w-5/6 gap-16 py-20 md:h-full"
          onViewportEnter={() => setSelectedPage(SelectedPage.Workouts)}
        >
          <button
            type="button"
            className="invisible mt-2 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
          >
            Back
          </button>

          {/* HEADER */}
          <motion.div
            className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
            initial="hidden"
            animate="visible"
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
              group="Loading..."
              type="Loading..."
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
        <Link to="/workouts">
          <button
            type="button"
            className="mt-2 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
          >
            Back
          </button>
        </Link>
        {/* HEADER */}
        <motion.div
          className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
          initial="hidden"
          animate="visible"
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
          className="mt-5 items-center justify-between gap-8"
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {workout.exercises &&
            workout.exercises.map(
              (
                {
                  id,
                  name,
                  equipment,
                  group,
                  type,
                  instructions,
                }: ExerciseType,
                index: number
              ) => (
                <Exercise
                  key={`${id}-${index}`}
                  name={name}
                  equipment={equipment}
                  group={group}
                  type={type}
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
