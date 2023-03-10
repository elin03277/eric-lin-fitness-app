import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import HText from "@/shared/HText";
import { useMutation } from "urql";
import { useEffect, useState } from "react";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  setAccessToken: (value: string) => void;
};

const LogInMutation = `
mutation($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
        user {
          username
        }
        access_token
    }
  }
`;

const LogIn = ({ setSelectedPage, setAccessToken }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

  const [dataReceived, useDataReceived] = useState<string>("");
  const [textButton, setTextButton] = useState<string>("CANCEL");
  // const [token, setToken] = useState<string>("");
  const [{ data, fetching, error }, logIn] = useMutation(LogInMutation);

  useEffect(() => {
    if (data) {
      setAccessToken(data.login.access_token);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any = {}) => {
    await logIn({ loginUserInput: data });
    setTextButton("BACK");
    reset();
  };

  if (fetching) return null;

  return (
    <div className="bg-gray-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.LogIn)}
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
            <span className="text-primary-500">LOG IN</span> TO GET ACCESS TO
            MORE FEATURES!
          </HText>
          <p className="my-5">
            Logging in will allow you to access workouts and add your own
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
                className={`${dataReceived} mt-5 rounded-lg bg-secondary-500 px-20 py-3 transition duration-500 hover:text-white`}
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
            {/* <div className="w-full before:absolute before:-bottom-20 before:-right-10 before:z-[-1] md:before:content-evolvetext">
              {data ? <p>{`${data.login.access_token}`}</p> : <p></p>}
            </div> */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LogIn;
