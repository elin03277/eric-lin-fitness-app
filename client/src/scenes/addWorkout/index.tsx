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

const GetExerciseCount = `
query {
  countExercises
}
`;

const AddWorkout = ({ setSelectedPage }: Props) => {
  // , accessToken }: Props) => {
  const [textButton, setTextButton] = useState<string>("CANCEL");
  const [filter, setFilter] = useState<string>("");
  const [exerciseList, setExerciseList] = useState<string[]>([]);

  const [result, filterSearch] = useQuery({
    query: GetFilteredExerciseQuery,
    variables: { filter },
  });

  const [countResult] = useQuery({
    query: GetExerciseCount,
  });

  const exercises = useMemo(
    () => result.data?.getFilteredExercises || [],
    [result.data]
  );

  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const {
    register: registerFilter,
    handleSubmit: handleFilterSubmit,
    reset: resetFilter,
    formState: { errors: errorsFilter },
  } = useForm();

  const {
    register: registerWorkout,
    handleSubmit: handleWorkoutSubmit,
    reset: resetWorkout,
    formState: { errors: errorsWorkout },
  } = useForm();

  const onFilterSubmit = async (data: any = {}) => {
    setFilter(data.filter);
  };

  const onWorkoutSubmit = async (data: any = {}) => {
    console.log(data);
    // try {
    //     await createExercise(
    //       { createExerciseInput: data },
    //       {
    //         fetchOptions: { headers: { Authorization: `Bearer ${accessToken}` } },
    //       }
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   useDataReceived(true);
    //   setTextButton("BACK");
    //   reset();
  };

  if (result.fetching || countResult.fetching)
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
          <HText>MAKE YOUR OWN WORKOUT!</HText>
          <p className="my-5">
            Search for exercises and add them to your workout!
          </p>
        </motion.div>

        {/* WORKOUT FORM */}
        <div className="mt-10 justify-between gap-8 md:flex">
          <motion.div
            className="mt-10 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <form onSubmit={handleWorkoutSubmit(onWorkoutSubmit)}>
              <input
                className={inputStyles}
                type="text"
                placeholder="WORKOUT NAME"
                {...registerWorkout("name", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errorsWorkout.name && (
                <p className="text-primary-500">
                  {errorsWorkout.name.type === "required" &&
                    "This field is required."}
                  {errorsWorkout.name.type === "maxLength" &&
                    "Max length is 30 char."}
                </p>
              )}
              <input
                className={inputStyles}
                type="text"
                placeholder="TYPE"
                {...registerWorkout("type", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errorsWorkout.type && (
                <p className="text-primary-500">
                  {errorsWorkout.type.type === "required" &&
                    "This field is required."}
                  {errorsWorkout.type.type === "maxLength" &&
                    "Max length is 30 char."}
                </p>
              )}
              <textarea
                className={inputStyles}
                rows={2}
                cols={50}
                placeholder="DESCRIPTION"
                {...registerWorkout("description", {
                  required: true,
                  maxLength: 2000,
                })}
              />
              {errorsWorkout.description && (
                <p className="text-primary-500">
                  {errorsWorkout.description.type === "required" &&
                    "This field is required."}
                  {errorsWorkout.description.type === "maxLength" &&
                    "Max length is 2000 char."}
                </p>
              )}
              <button
                type="submit"
                className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
              >
                SUBMIT
              </button>
              <Link to="/workouts">
                <button
                  type="button"
                  className="mx-2 mt-5 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
                >
                  {textButton}
                </button>
              </Link>
            </form>
          </motion.div>
          <motion.div
            className="relative mt-16 basis-2/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="rounded-md border-2 border-gray-100 px-5 py-16 text-center">
              <p>Exercise List:</p>
              {exerciseList.map((name) => (
                <p>{name}</p>
              ))}
            </div>
          </motion.div>
        </div>

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
              {/* {errorsFilter.filter && (
                <p className="text-primary-500">
                  {errorsFilter.filter.type === "maxLength" &&
                    "Max length is 30 char."}
                </p>
              )} */}
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
            ({ id, name, equipment, pattern, instructions }: any) => (
              <Exercise
                key={id}
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

export default AddWorkout;
