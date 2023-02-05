import useMediaQuery from "@/hooks/useMediaQuery";
import ActionButton from "@/shared/ActionButton";
import { ExerciseType, SelectedPage } from "@/shared/types";
import HomePageText from "@/assets/HomePageText.png";
import HomePageGraphic from "@/assets/HomePageGraphic.png";
import SponsorRedBull from "@/assets/SponsorRedBull.png";
import SponsorForbes from "@/assets/SponsorForbes.png";
import SponsorFortune from "@/assets/SponsorFortune.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { useQuery } from "urql";
import HText from "@/shared/HText";
import Exercise from "@/shared/Exercise";
import { useState } from "react";
import uuid from "react-uuid";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const GetExerciseQuery = `
query($offset: Int!, $limit: Int!) {
  exercises(offset: $offset, limit: $limit) {
    name
    equipment
    pattern
    instructions
  }
}
`;

// const GetExerciseQuery2 = `
// query {
//   exercise(id: "8709a6e5-bc9f-4023-b2f1-3897eda4ec0e") {
//     name
//     equipment
//     pattern
//     instructions
//   }
// }
// `;
const Home = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(1);
  const [invisible, setInvisible] = useState("invisible");
  const [previousExercises, setPreviousExercises] = useState<any[]>([]);
  const [currentExercises, setCurrentExercises] = useState<any>(null);

  const [{ data, fetching, error }] = useQuery({
    query: GetExerciseQuery,
    variables: { offset, limit },
    //    requestPolicy: "cache-first",
  });

  if (fetching) return null;

  const handlePreviousButton = () => {
    setOffset(offset - limit);
    setCurrentExercises(previousExercises[previousExercises.length - limit]);
    setPreviousExercises(
      previousExercises.slice(0, previousExercises.length - limit)
    );
  };

  const handleNextButton = (exercise: any) => {
    setOffset(offset + limit);
    setPreviousExercises([...previousExercises, currentExercises]);

    previousExercises.includes(exercise)
      ? setCurrentExercises(previousExercises[previousExercises.length + limit])
      : setCurrentExercises(exercise);
  };

  //if (error) return null;

  console.log(offset);

  // const exercises: Array<ExerciseType> = [
  //   {
  //     name: data.exercises[0].name,
  //     equipment: data.exercises[0].equipment,
  //     pattern: data.exercises[0].pattern,
  //     instructions: data.exercises[0].instructions,
  //   },

  //   {
  //     name: data.exercises[1].name,
  //     equipment: data.exercises[1].equipment,
  //     pattern: data.exercises[1].pattern,
  //     instructions: data.exercises[1].instructions,
  //   },
  //   {
  //     name: data.exercises[2].name,
  //     equipment: data.exercises[2].equipment,
  //     pattern: data.exercises[2].pattern,
  //     instructions: data.exercises[2].instructions,
  //   },
  // ];

  return (
    <section id="home" className="bg-gray-20">
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
        </motion.div>

        {/* EXERCISES */}
        <motion.div
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {currentExercises && (
            <Exercise
              name={currentExercises.name}
              equipment={currentExercises.equipment}
              pattern={currentExercises.pattern}
              instructions={currentExercises.instructions}
              setSelectedPage={setSelectedPage}
            />
          )}
          {/* {data.exercises.map((exercise: ExerciseType, index: number) => (
            <Exercise
              name={exercise.name}
              equipment={exercise.equipment}
              pattern={exercise.pattern}
              instructions={exercise.instructions}
              setSelectedPage={setSelectedPage}
            />
          ))} */}
        </motion.div>
        <motion.div className="flex justify-between">
          <button
            type="button"
            className={` mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white`}
            onClick={handlePreviousButton}
            disabled={previousExercises.length === 0}
          >
            Prev
          </button>
          <button
            type="button"
            className="mx-2 mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
            onClick={() => handleNextButton(data.exercises[0])}
          >
            Next
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
