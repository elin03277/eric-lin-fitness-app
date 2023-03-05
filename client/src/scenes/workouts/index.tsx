import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { ExerciseType, SelectedPage, WorkoutType } from "@/shared/types";
import { motion } from "framer-motion";
import { useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Workout from "./Workout";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const buttonStyle = `mx-2 mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white`;

const GetWorkouts = `
query {
  getWorkouts {
    id
    name
    type
    exerciseIds
  }
}
`;

const Workouts = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const [result, getWorkouts] = useQuery({
    query: GetWorkouts,
  });

  const workouts = useMemo(() => result.data?.getWorkouts || [], [result.data]);
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const handleWorkout = (workoutId: string) => {
    console.log(`Workout clicked: ${workoutId}`);
  };

  if (result.fetching)
    return (
      <div className="bg-gray-20">
        <motion.div
          className="mx-auto w-5/6  gap-16 py-20 md:h-full"
          onViewportEnter={() => setSelectedPage(SelectedPage.Workouts)}
        >
          {/* HEADER */}
          <motion.div
            className="md:my-5 md:w-3/5"
            initial="hidden"
            // whileInView="visible"
            animate="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <HText>FIND YOUR NEXT WORKOUT HERE!</HText>
            <p className="my-5">
              Here are some example workouts to get you started! Feel free to
              add your own!
            </p>
            <button
              type="button"
              className="invisible mx-2 mt-5 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
            >
              Add Exercise
            </button>
          </motion.div>

          {/* WORKOUTS */}
          <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
            <ul className="w-[2800px] whitespace-nowrap">
              <Workout
                name="Loading..."
                description="Loading..."
                type="Loading..."
              />
              <Workout
                name="Loading..."
                description="Loading..."
                type="Loading..."
              />
              <Workout
                name="Loading..."
                description="Loading..."
                type="Loading..."
              />
            </ul>
          </div>
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
          className="md:my-5 md:w-3/5"
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
          <HText>FIND YOUR NEXT WORKOUT HERE!</HText>
          <p className="my-5">
            Here are some example workouts to get you started! Feel free to add
            your own!
          </p>
          <Link to="/addWorkout">
            <button
              type="button"
              className="mx-2 mt-5 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
            >
              Add Workout
            </button>
          </Link>
        </motion.div>

        {/* WORKOUTS */}
        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
          <ul className="w-[2800px] whitespace-nowrap">
            {workouts.map((workout: WorkoutType, index: number) => (
              <Workout
                key={workout.id}
                id={workout.id}
                name={workout.name}
                description={workout.description}
                type={workout.type}
                // onPress={() => handleWorkout(workout.id)}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Workouts;
