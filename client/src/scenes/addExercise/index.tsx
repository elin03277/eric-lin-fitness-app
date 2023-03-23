import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import HText from "@/shared/HText";
import { useMutation } from "urql";
import Exercise from "@/shared/Exercise";
import { useEffect, useState } from "react";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  setAccessToken: (value: string) => void;
  accessToken: string;
};

const CreateExercise = `
    mutation($createExerciseInput: CreateExerciseInput!) {
        createExercise(createExerciseInput: $createExerciseInput) {
            name
            equipment
            group
            type
            instructions
        }
    }
`;

const AddExercise = ({
  setSelectedPage,
  setAccessToken,
  accessToken,
}: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const [dataReceived, useDataReceived] = useState<boolean>(false);
  const [textButton, setTextButton] = useState<string>("CANCEL");
  const [{ data, fetching, error }, createExercise] =
    useMutation(CreateExercise);

  useEffect(() => {
    if (error) {
      setAccessToken("");
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any = {}) => {
    createExercise(
      { createExerciseInput: data },
      {
        fetchOptions: { headers: { Authorization: `Bearer ${accessToken}` } },
      }
    );

    useDataReceived(true);
    setTextButton("BACK");
    reset();
  };

  if (fetching) return null;

  return (
    <div className="bg-gray-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Exercises)}
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
          {!error ? (
            <HText>
              <span className="text-primary-500">ADD AN EXERCISE</span> AND GET
              IN SHAPE
            </HText>
          ) : (
            <HText>
              <span className="text-primary-500">LOG IN</span> TO ADD AN
              EXERCISE
            </HText>
          )}
        </motion.div>

        {/* FORM AND CONFIRMATION */}
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
                placeholder="MUSCLE GROUP"
                {...register("group", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.group && (
                <p className="text-primary-500">
                  {errors.group.type === "required" &&
                    "This field is required."}
                  {errors.group.type === "maxLength" &&
                    "Max length is 30 char."}
                </p>
              )}

              <input
                className={inputStyles}
                type="text"
                placeholder="EXERCISE TYPE"
                {...register("type", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.type && (
                <p className="text-primary-500">
                  {errors.type.type === "required" && "This field is required."}
                  {errors.type.type === "maxLength" && "Max length is 30 char."}
                </p>
              )}

              <textarea
                className={inputStyles}
                rows={4}
                cols={50}
                placeholder="INSTRUCTIONS"
                {...register("instructions", {
                  required: true,
                  maxLength: 500,
                })}
              />
              {errors.instructions && (
                <p className="text-primary-500">
                  {errors.instructions.type === "required" &&
                    "This field is required."}
                  {errors.instructions.type === "maxLength" &&
                    "Max length is 500 char."}
                </p>
              )}
              {accessToken ? (
                <button
                  type="submit"
                  className="mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white"
                >
                  SUBMIT
                </button>
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
              <Link to="/exercises">
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
              {dataReceived && !error ? (
                <Exercise
                  name={data.createExercise.name}
                  equipment={data.createExercise.equipment}
                  group={data.createExercise.group}
                  type={data.createExercise.type}
                  instructions={data.createExercise.instructions}
                />
              ) : (
                <Exercise
                  name="Name"
                  equipment=""
                  group=""
                  type=""
                  instructions=""
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
