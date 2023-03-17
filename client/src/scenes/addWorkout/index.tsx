import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { AddExerciseType, ExerciseType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ExerciseWorkoutAdd from "./ExerciseWorkoutAdd";
import ExerciseListItem from "./ExerciseListItem";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  setAccessToken: (value: string) => void;
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

const CreateWorkout = `
mutation($createWorkoutInput: CreateWorkoutInput!) {
    createWorkout(createWorkoutInput: $createWorkoutInput) {
      id
    }
  }
`;

const AddWorkout = ({
  setSelectedPage,
  setAccessToken,
  accessToken,
}: Props) => {
  const [textButton, setTextButton] = useState<string>("CANCEL");
  const [filter, setFilter] = useState<string>("");
  const [exerciseList, setExerciseList] = useState<AddExerciseType[]>([]);
  const [workoutId, setWorkoutId] = useState<string>("");

  const [result, filterSearch] = useQuery({
    query: GetInitialFilteredExerciseQuery,
    variables: { filter },
  });

  const [{ data, fetching, error }, createWorkout] = useMutation(CreateWorkout);

  useEffect(() => {
    if (data) {
      setWorkoutId(data.createWorkout.id);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setAccessToken("");
    }
  }, [error]);

  const exercises = useMemo(
    () => result.data?.getInitialFilteredExercises || [],
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
    setValue: setWorkoutValue,
    watch: watchWorkout,
    formState: { errors: errorsWorkout },
  } = useForm();

  const onFilterSubmit = async (data: any = {}) => {
    await setFilter(data.filter);
  };

  const onWorkoutSubmit = async (data: any = {}) => {
    await createWorkout(
      { createWorkoutInput: data },
      {
        fetchOptions: { headers: { Authorization: `Bearer ${accessToken}` } },
      }
    );
    setExerciseList([]);
    setTextButton("Back");
    resetWorkout();
  };

  const addExerciseList = () => {
    const ids = exerciseList.map(
      (exercise: AddExerciseType) => exercise.exerciseId
    );

    setWorkoutValue("exerciseIds", ids);
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
          {!error ? (
            <>
              <HText>MAKE YOUR OWN WORKOUT!</HText>
              <p className="my-5">
                Search for exercises and add them to your workout!
              </p>
            </>
          ) : (
            <>
              <HText>LOG IN TO ADD YOUR WORKOUT!</HText>
              <p className="my-5">Please log in and come back!</p>
            </>
          )}
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
                  maxLength: 500,
                })}
              />
              {errorsWorkout.description && (
                <p className="text-primary-500">
                  {errorsWorkout.description.type === "required" &&
                    "This field is required."}
                  {errorsWorkout.description.type === "maxLength" &&
                    "Max length is 500 char."}
                </p>
              )}
              {accessToken !== "" ? (
                exerciseList.length !== 0 ? (
                  <button
                    type="submit"
                    className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                    onClick={addExerciseList}
                  >
                    SUBMIT
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                  >
                    SUBMIT
                  </button>
                )
              ) : (
                <Link to="/logIn">
                  <button
                    type="button"
                    className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                  >
                    SUBMIT
                  </button>
                </Link>
              )}
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
            <div className="h-[300px] overflow-auto rounded-md border-2 border-gray-100 py-10 text-center">
              <p>Exercise List:</p>
              {exerciseList.map((item: AddExerciseType, index: number) => (
                <ExerciseListItem
                  key={`${item.exerciseId}-${index}`}
                  id={item.exerciseId}
                  name={item.exerciseName}
                  order={index}
                  exerciseList={exerciseList}
                  setExerciseList={setExerciseList}
                />
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
            ({
              id,
              name,
              equipment,
              group,
              type,
              instructions,
            }: ExerciseType) => (
              <ExerciseWorkoutAdd
                key={id}
                id={id}
                name={name}
                equipment={equipment}
                group={group}
                type={type}
                instructions={instructions}
                exerciseList={exerciseList}
                setExerciseList={setExerciseList}
              />
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddWorkout;
