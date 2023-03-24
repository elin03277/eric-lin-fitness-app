import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import HText from "@/shared/HText";
import { useMutation } from "urql";
import { useState } from "react";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const SignUpMutation = `
mutation($loginUserInput: LoginUserInput!) {
    signup(loginUserInput: $loginUserInput) {
        username
    }
  }
`;

const SignUp = ({ setSelectedPage }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const [invisible, setInvisible] = useState<string>("");
  const [textButton, setTextButton] = useState<string>("CANCEL");

  const [{ data, fetching, error }, signUp] = useMutation(SignUpMutation);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any = {}) => {
    signUp({ loginUserInput: data });
    setInvisible("invisible");
    setTextButton("BACK");
    reset();
  };

  if (fetching)
    return (
      <div className="bg-gray-20">
        <motion.div
          onViewportEnter={() => setSelectedPage(SelectedPage.SignUp)}
          className="mx-auto w-5/6 pt-24 pb-32"
        ></motion.div>
      </div>
    );

  return (
    <div className="bg-gray-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.SignUp)}
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
            <span className="text-secondary-500">SIGN UP</span> TO GET ACCESS TO
            MORE FEATURES!
          </HText>
          <p className="my-5">
            Signing up will allow you to access workouts and add your own
            exercises!
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
                placeholder="NAME"
                {...register("username", {
                  required: true,
                  maxLength: 10,
                })}
              />
              {errors.name && (
                <p className="text-primary-500">
                  {errors.name.type === "required" && "This field is required."}
                  {errors.name.type === "maxLength" && "Max length is 10 char."}
                </p>
              )}
              <input
                className={inputStyles}
                type="text"
                placeholder="PASSWORD"
                {...register("password", {
                  required: true,
                  maxLength: 30,
                })}
              />
              {errors.password && (
                <p className="text-primary-500">
                  {errors.password.type === "required" &&
                    "This field is required."}
                  {errors.password.type === "maxLength" &&
                    "Max length is 30 char."}
                </p>
              )}
              <button
                type="submit"
                className={`${invisible} mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white`}
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
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
