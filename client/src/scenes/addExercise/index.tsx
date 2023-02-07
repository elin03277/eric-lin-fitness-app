import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import HText from "@/shared/HText";
import { useMutation } from "urql";
import Exercise from "@/shared/Exercise";
import { useState } from "react";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const CreateExercise = `
    mutation($createExerciseInput: CreateExerciseInput!) {
        createExercise(createExerciseInput: $createExerciseInput) {
            name
            equipment
            pattern
            instructions
        }
    }
`;

const AddExercise = ({ setSelectedPage }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const [dataReceived, useDataReceived] = useState(false);
  const [textButton, setTextButton] = useState("CANCEL");

  const [{ data, fetching, error }, createExercise] =
    useMutation(CreateExercise);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any = {}) => {
    await createExercise({ createExerciseInput: data });
    useDataReceived(true);
    setTextButton("BACK");
    reset();
  };

  if (fetching) return null;

  return (
    <div className="bg-gray-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
        className="mx-auto w-5/6 pt-24 pb-32"
      >
        {/* HEADER */}
        <motion.div
          className="md:3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
            <span className="text-primary-500">ADD AN EXERCISE</span> AND GET IN
            SHAPE
          </HText>
          <p className="my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            pharetra venenatis pellentesque.
          </p>
        </motion.div>

        {/* FORM AND IMAGE */}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className={inputStyles}
                type="text"
                placeholder="EXERCISE NAME"
                {...register("name", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.name && (
                <p className="text-primary-500">
                  {errors.name.type === "required" && "This field is required."}
                  {errors.name.type === "maxLength" && "Max length is 30 char."}
                </p>
              )}
              <input
                className={inputStyles}
                type="text"
                placeholder="EQUIPMENT"
                {...register("equipment", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.equipment && (
                <p className="text-primary-500">
                  {errors.equipment.type === "required" &&
                    "This field is required."}
                  {errors.equipment.type === "maxLength" &&
                    "Max length is 30 char."}
                </p>
              )}
              <input
                className={inputStyles}
                type="text"
                placeholder="MOVEMENT PATTERN"
                {...register("pattern", {
                  required: true,
                  maxLength: 10,
                })}
              />
              {errors.pattern && (
                <p className="text-primary-500">
                  {errors.pattern.type === "required" &&
                    "This field is required."}
                  {errors.pattern.type === "maxLength" &&
                    "Max length is 10 char."}
                </p>
              )}
              <textarea
                className={inputStyles}
                rows={4}
                cols={50}
                placeholder="INSTRUCTIONS"
                {...register("instructions", {
                  required: true,
                  maxLength: 2000,
                })}
              />
              {errors.instructions && (
                <p className="text-primary-500">
                  {errors.instructions.type === "required" &&
                    "This field is required."}
                  {errors.instructions.type === "maxLength" &&
                    "Max length is 2000 char."}
                </p>
              )}
              <button
                type="submit"
                className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
              >
                SUBMIT
              </button>
              <Link to="/..">
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
            <div className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext">
              {dataReceived ? (
                <Exercise
                  name={data.createExercise.name}
                  equipment={data.createExercise.equipment}
                  pattern={data.createExercise.pattern}
                  instructions={data.createExercise.instructions}
                  setSelectedPage={setSelectedPage}
                />
              ) : (
                <Exercise
                  name="Name"
                  equipment="Equipment"
                  pattern="Pattern"
                  instructions="Instructions"
                  setSelectedPage={setSelectedPage}
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddExercise;
