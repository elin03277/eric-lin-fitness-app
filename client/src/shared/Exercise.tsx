import { SelectedPage } from "@/shared/types";
// import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  name: string;
  equipment: string;
  group: string;
  type: string;
  instructions: string;
  setSelectedPage?: (value: SelectedPage) => void;
};

const Exercise = ({
  name,
  equipment,
  group,
  type,
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
      <p className="my-3">Group: {group}</p>
      <p className="my-3">Type: {type}</p>
      <p className="my-3">Instructions: {instructions}</p>
      {setSelectedPage ? (
        <Link
          className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
          onClick={() => setSelectedPage(SelectedPage.SignUp)}
          to={`/${SelectedPage.SignUp}`}
        >
          <p>Learn More</p>
        </Link>
      ) : (
        <></>
      )}
    </motion.div>
  );
};

export default Exercise;
