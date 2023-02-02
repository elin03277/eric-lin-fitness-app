import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  name: string;
  equipment: string;
  pattern: string;
  instructions: string;
  setSelectedPage: (value: SelectedPage) => void;
};

const Exercise = ({
  name,
  equipment,
  pattern,
  instructions,
  setSelectedPage,
}: Props) => {
  return (
    <motion.div
      variants={childVariant}
      className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
    >
      <h4 className="font-bold">{name}</h4>
      <p className="my-3">Equipment: {equipment}</p>
      <p className="my-3">Pattern: {pattern}</p>
      <p className="my-3">Instructions: {instructions}</p>
      <AnchorLink
        className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
        onClick={() => setSelectedPage(SelectedPage.ContactUs)}
        href={`${SelectedPage.ContactUs}`}
      >
        <p>Learn More</p>
      </AnchorLink>
    </motion.div>
  );
};

export default Exercise;
