import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <motion.div
      variants={childVariant}
      className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
    >
      <h4 className="font-bold">{name}</h4>
      <p className="my-3">Equipment: {equipment}</p>
      <p className="my-3">Group: {group}</p>
      <p className="my-3">Type: {type}</p>

      <button
        className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
        onClick={() => setToggle(!toggle)}
      >
        Learn More
      </button>
      {toggle ? <p className="my-3">Instructions: {instructions}</p> : <></>}
    </motion.div>
  );
};

export default Exercise;
