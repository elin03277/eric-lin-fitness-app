import useMediaQuery from "@/hooks/useMediaQuery";
import { ExerciseType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

const GetExerciseQuery = `
query($offset: Int!, $limit: Int!) {
  getInitialExercises(offset: $offset, limit: $limit) {
    name
    equipment
    group
    type
    instructions
  }
}
`;

const GetInitialExerciseCount = `
query {
  countInitialExercises
}
`;

const Home = ({ setSelectedPage, accessToken }: Props) => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [prevInvisible, setPrevInvisible] = useState<string>("invisible");
  const [nextInvisible, setNextInvisible] = useState<string>("");
  const [previousExercises, setPreviousExercises] = useState<unknown[]>([]);
  const [currentExercises, setCurrentExercises] = useState<unknown>(null);

  const [result] = useQuery({
    query: GetExerciseQuery,
    variables: { offset, limit },
  });

  const [countResult] = useQuery({
    query: GetInitialExerciseCount,
  });

  const exercises = useMemo(
    () => result.data?.getInitialExercises || [],
    [result.data]
  );

  const pageLimit = useMemo(
    () => Math.floor(countResult.data?.countInitialExercises / limit) || 0,
    [countResult.data]
  );

  useEffect(() => {
    if (!countResult.fetching) {
      pages > 1 ? setPrevInvisible("") : setPrevInvisible("invisible");
      pages < pageLimit ? setNextInvisible("") : setNextInvisible("invisible");
    }
  }, [pages]);

  const handlePreviousButton = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
      setCurrentExercises(previousExercises[previousExercises.length - limit]);
      setPreviousExercises(
        previousExercises.slice(0, previousExercises.length - limit)
      );
      setPages(pages - 1);
    }
  };

  const handleNextButton = (exercise: unknown[]) => {
    if (pages < pageLimit) {
      setOffset(offset + limit);
      setPreviousExercises([...previousExercises, currentExercises]);

      previousExercises.includes(exercise)
        ? setCurrentExercises(
            previousExercises[previousExercises.length + limit]
          )
        : setCurrentExercises(exercise);
      setPages(pages + 1);
    }
  };

  if (result.fetching || countResult.fetching)
    return (
      <div className="bg-gray-20">
        <motion.div
          className="mx-auto w-5/6  gap-16 py-20 md:h-full"
          onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
        >
          {/* HEADER */}
          <motion.div
            className="md:my-5 md:w-3/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <HText>START YOUR FITNESS JOURNEY TODAY!</HText>
            <p className="my-5">
              Here are some example exercises to get you started! Feel free to
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
            animate="visible"
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
          <motion.div className="flex justify-between">
            <button type="button" className={`${prevInvisible} ${buttonStyle}`}>
              Prev
            </button>
            <button type="button" className={`${nextInvisible} ${buttonStyle}`}>
              Next
            </button>
          </motion.div>
        </motion.div>
      </div>
    );

  return (
    <div className="bg-gray-20">
      <motion.div
        className="mx-auto w-5/6  gap-16 py-20 md:h-full"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
        {/* HEADER */}
        <motion.div
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>START YOUR FITNESS JOURNEY TODAY!</HText>
          <p className="my-5">
            Here are some example exercises to get you started! Feel free to add
            your own!
          </p>
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
        </motion.div>

        {/* EXERCISES */}
        <motion.div
          className="mt-5 items-center justify-between gap-8"
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {exercises.length !== 0 &&
            exercises.map(
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
                  setSelectedPage={setSelectedPage}
                />
              )
            )}
        </motion.div>
        <motion.div className="flex justify-between">
          <button
            type="button"
            className={`${prevInvisible} ${buttonStyle}`}
            onClick={handlePreviousButton}
          >
            Prev
          </button>
          <button
            type="button"
            className={`${nextInvisible} ${buttonStyle}`}
            onClick={() => handleNextButton(exercises[0])}
          >
            Next
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
