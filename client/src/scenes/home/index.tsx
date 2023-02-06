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

const GetExerciseCount = `
query {
  countExercises
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
  const [limit, setLimit] = useState(3);
  const [pages, setPages] = useState(1);
  const [prevInvisible, setPrevInvisible] = useState("invisible");
  const [nextInvisible, setNextInvisible] = useState("");
  const [previousExercises, setPreviousExercises] = useState<any[]>([]);
  const [currentExercises, setCurrentExercises] = useState<any>(null);

  const [result] = useQuery({
    query: GetExerciseQuery,
    variables: { offset, limit },
  });

  const [countResult] = useQuery({
    query: GetExerciseCount,
  });

  const exercises = useMemo(() => result.data?.exercises || [], [result.data]);

  if (result.fetching) return null;
  if (countResult.fetching) return null;

  const count = countResult.data;
  const pageLimit = Math.floor(count.countExercises / limit);

  console.log(count.countExercises);
  console.log(pageLimit);

  const handlePreviousButton = () => {
    console.log(pages);
    pages === 2 ? setPrevInvisible("invisible") : setPrevInvisible("");
    if (offset >= limit) {
      setOffset(offset - limit);
      setCurrentExercises(previousExercises[previousExercises.length - limit]);
      setPreviousExercises(
        previousExercises.slice(0, previousExercises.length - limit)
      );
      setNextInvisible("");
      setPages(pages - 1);
    }
  };

  const handleNextButton = (exercise: any[]) => {
    pages + 1 < pageLimit
      ? setNextInvisible("")
      : setNextInvisible("invisible");
    if (pages < pageLimit) {
      setOffset(offset + limit);
      setPreviousExercises([...previousExercises, currentExercises]);

      previousExercises.includes(exercise)
        ? setCurrentExercises(
            previousExercises[previousExercises.length + limit]
          )
        : setCurrentExercises(exercise);
      setPrevInvisible("");
      setPages(pages + 1);
    }
  };

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
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          <Exercise
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
          />
          <Exercise
            name={exercises[2].name}
            equipment={exercises[2].equipment}
            pattern={exercises[2].pattern}
            instructions={exercises[2].instructions}
            setSelectedPage={setSelectedPage}
          />
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
    </section>
  );
};

export default Home;