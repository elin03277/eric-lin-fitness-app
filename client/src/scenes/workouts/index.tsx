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
            <Link to="/addWorkout">
              <button
                type="button"
                className="invisible mx-2 mt-5 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
              >
                Add Exercise
              </button>
            </Link>
          </motion.div>

          {/* EXERCISES */}
          <motion.div
            className="mt-5 items-center justify-between gap-8 md:flex"
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

        {/* EXERCISES */}
        <motion.div
          className="mt-5 items-center justify-between gap-8" // md:flex"
          initial="hidden"
          animate="visible"
          //whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {workouts.map(({ id, name, equipment, type, description }: any) => (
            <Exercise
              key={id}
              name={name}
              equipment={equipment}
              pattern={type}
              instructions={description}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>
        <div className="mt-10 h-[353px] w-full overflow-x-auto overflow-y-hidden">
          <ul className="w-[2800px] whitespace-nowrap">
            {workouts.map((item: WorkoutType, index: number) => (
              <Workout
                key={`${item.name}-${index}`}
                name={item.name}
                description={item.description}
                type={item.type}
              />
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Workouts;
