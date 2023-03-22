import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { ExerciseType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  accessToken: string;
};

const buttonStyle = `mx-2 mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white`;

const GetInitialFilteredExerciseQuery = `
query ($filter: String!){
  getInitialFilteredExercises(filter: $filter) {
    id
    name
    equipment
    group
    type
    instructions
  }
}
`;

const GetExerciseCount = `
query {
  countExercises
}
`;

const Exercises = ({ setSelectedPage, accessToken }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);
  const [filter, setFilter] = useState<string>("");

  const [result] = useQuery({
    query: GetInitialFilteredExerciseQuery,
    variables: { filter },
  });

  const [countResult] = useQuery({
    query: GetExerciseCount,
  });

  const exercises = useMemo(
    () => result.data?.getInitialFilteredExercises || [],
    [result.data]
  );

  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any = {}) => {
    setFilter(data.filter);
  };

  if (result.fetching || countResult.fetching)
    return (
      <div className="bg-gray-20">
        <motion.div
          className="mx-auto w-5/6  gap-16 py-20 md:h-full"
          onViewportEnter={() => setSelectedPage(SelectedPage.Exercises)}
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
            <HText>SEARCH EXERCISES HERE!</HText>
            <p className="my-5">
              Incorporate these exercises into your next workout! Feel free to
              add your own!
            </p>
            <button
              type="button"
              className="invisible mx-2 mt-5 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
            >
              Add Exercise
            </button>
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
        onViewportEnter={() => setSelectedPage(SelectedPage.Exercises)}
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
          <HText>SEARCH EXERCISES HERE!</HText>
          <p className="my-5">
            Incorporate these exercises into your next workout! Feel free to add
            your own!
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <div className=" mx-2 mt-2 justify-between gap-8">
          <form className="basis-3/5 md:mt-0" onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5 flex items-center justify-between gap-1">
              <input
                className={inputStyles}
                type="text"
                placeholder="Search Exercises..."
                {...register("filter", {
                  maxLength: 30,
                })}
              />
              <button
                className="mb-5 whitespace-nowrap rounded-lg bg-primary-300 px-10 py-3 transition duration-500 hover:text-white"
                type="submit"
              >
                {errors.filter && errors.filter.type === "maxLength"
                  ? "Max length 30 char"
                  : "Search"}
              </button>
            </div>
          </form>
          {accessToken ? (
            <Link to="/addExercise">
              <button
                type="button"
                className="mt-2 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
              >
                Add Exercise
              </button>
            </Link>
          ) : (
            <Link to="/logIn">
              <button
                type="button"
                className="mt-2 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
              >
                Add Exercise
              </button>
            </Link>
          )}
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
          {exercises.length !== 0 &&
            exercises.map((exercise: ExerciseType) => (
              <Exercise
                key={exercise.id}
                name={exercise.name}
                equipment={exercise.equipment}
                group={exercise.group}
                type={exercise.type}
                instructions={exercise.instructions}
                setSelectedPage={setSelectedPage}
              />
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Exercises;
