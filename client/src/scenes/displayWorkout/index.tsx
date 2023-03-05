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

const GetFilteredExerciseQuery = `
query ($filter: String!){
  getFilteredExercises(filter: $filter) {
    id
    name
    equipment
    pattern
    instructions
  }
}
`;

const DisplayWorkout = ({ setSelectedPage }: Props) => {
  // , accessToken }: Props) => {
  const [filter, setFilter] = useState<string>("");
  const location = useLocation();
  const id = location.state?.passedWorkoutId;
  const [workoutId, setWorkoutId] = useState<string>(id);

  const [result, filterSearch] = useQuery({
    query: GetFilteredExerciseQuery,
    variables: { filter },
  });

  const exercises = useMemo(
    () => result.data?.getFilteredExercises || [],
    [result.data]
  );

  const test = () => {
    workoutId === undefined
      ? console.log("Select a workout")
      : console.log(workoutId);
  };

  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const {
    register: registerFilter,
    handleSubmit: handleFilterSubmit,
    reset: resetFilter,
    formState: { errors: errorsFilter },
  } = useForm();

  const onFilterSubmit = async (data: any = {}) => {
    setFilter(data.filter);
  };

  if (result.fetching)
    return (
      <div className="bg-gray-20">
        <motion.div
          className="mx-auto w-5/6 gap-16 py-20 md:h-full"
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
            <HText>MAKE YOUR OWN WORKOUT!</HText>
            <p className="my-5">
              Search for exercises and add them to your workout!
            </p>
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
          <HText>MAKE YOUR OWN WORKOUT!</HText>
          <p className="my-5">
            Search for exercises and add them to your workout!
          </p>
        </motion.div>
        {/* <button onClick={test}>Hi</button> */}

        {/* SEARCH BAR */}
        <div className=" mt-2 justify-between gap-8">
          <form
            className="basis-3/5 md:mt-0"
            onSubmit={handleFilterSubmit(onFilterSubmit)}
          >
            <div className="mt-5 flex items-center justify-between gap-1">
              <input
                className={inputStyles}
                type="text"
                placeholder="Search Exercises..."
                {...registerFilter("filter", {
                  maxLength: 30,
                })}
              />
              <button
                className="mb-5 whitespace-nowrap rounded-lg bg-primary-300 px-10 py-3 transition duration-500 hover:text-white"
                type="submit"
              >
                {errorsFilter.filter && errorsFilter.filter.type === "maxLength"
                  ? "Max length 30 char"
                  : "Search"}
              </button>
            </div>
          </form>
        </div>

        {/* EXERCISES */}
        <motion.div
          className="mt-5 items-center justify-between gap-8" // md:flex"
          initial="hidden"
          animate="visible"
          //whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {exercises.map(
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
                setSelectedPage={setSelectedPage}
              />
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DisplayWorkout;
