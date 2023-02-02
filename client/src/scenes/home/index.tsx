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
query {
  exercise(id: "d1410779-2fc2-4c3a-8e59-bdfb6da8fbb5") {
    name
  }
}
`;
const Home = ({ setSelectedPage }: Props) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  const [{ data, fetching, error }] = useQuery<{ exercises: ExerciseType[] }>({
    query: GetExerciseQuery,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const exercises: Array<ExerciseType> = [
    {
      name: "Barbell Shoulder Press",
      equipment: "Barbell",
      pattern: "Push",
      instructions: "Bar at chest, push vertically, lower slowly.",
    },

    {
      name: "Barbell Shoulder Press",
      equipment: "Barbell",
      pattern: "Push",
      instructions: "Bar at chest, push vertically, lower slowly.",
    },
  ];

  return (
    <section id="home" className="mx-auto min-h-full w-5/6 py-20">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.Home)}>
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
          <HText>MORE THAN JUST A GYM.</HText>
          <p className="my-5 text-sm">
            We provide world class fitness equipment, trainers, and classes to
            get you to your ultimate fitness goals with ease. We provide true
            care into each and every member.
          </p>
        </motion.div>

        {/* BENEFITS */}
        <motion.div
          className="mt-flex items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {exercises.map((exercise: ExerciseType) => (
            <Exercise
              //key={exercise.name}
              name={exercise.name}
              equipment={exercise.equipment}
              pattern={exercise.pattern}
              instructions={exercise.instructions}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* SPONSORS */}
      {/* {isAboveMediumScreens && (
        <div className="h-[150px] w-full bg-primary-100 py-10">
          <div className="mx-auto w-5/6">
            <div className="flex w-3/5 items-center justify-between gap-8">
              <img alt="redbull-sponsor" src={SponsorRedBull} />
              <img alt="forbes-sponsor" src={SponsorForbes} />
              <img alt="fortune-sponsor" src={SponsorFortune} />
            </div>
          </div>
        </div>
      )} */}
    </section>
  );
};

export default Home;
