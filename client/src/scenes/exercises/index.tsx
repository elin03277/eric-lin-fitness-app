import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { ExerciseType, SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

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

const GetFilteredExerciseQuery = `
query {
  getFilteredExercises(filter: "ar") {
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

const Exercises = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(3);
  const [exerciseList, setExerciseList] = useState([]);

  const [result] = useQuery({
    query: GetFilteredExerciseQuery,
    //variables: { offset, limit },
  });

  const [countResult] = useQuery({
    query: GetExerciseCount,
  });

  const exercises = useMemo(
    () => result.data?.getFilteredExercises || [],
    [result.data]
  );

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
            <HText>
              SEARCH FOR EXERCISES TO INCORPORATE IN YOUR NEXT WORKOUT!
            </HText>
            <p className="my-5">
              Here are some example exercises to get you started! Feel free to
              add your own! 3 exercises need to be added for a new page to show!
            </p>
            <Link to="/add">
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
          <Link to="/add">
            <button
              type="button"
              className="mx-2 mt-5 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white"
            >
              Add Exercise
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
          {/* <Exercise
            name={exercises[0].name}
            equipment={exercises[0].equipment}
            pattern={exercises[0].pattern}
            instructions={exercises[0].instructions}
            setSelectedPage={setSelectedPage}
          />
          <Exercise
            name={exercises[1].name}
            equipment={exercises[1].equipment}
            pattern={exercises[1].pattern}
            instructions={exercises[1].instructions}
            setSelectedPage={setSelectedPage}
          /> */}
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

export default Exercises;
