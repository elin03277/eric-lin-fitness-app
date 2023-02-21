import React from "react";
// import AnchorLink from "react-anchor-link-smooth-scroll";
import { Link } from "react-router-dom";
import { SelectedPage } from "./types";

type Props = {
  children: React.ReactNode;
  setSelectedPage: (value: SelectedPage) => void;
};

const ActionButton = ({ children, setSelectedPage }: Props) => {
  return (
    <Link
      className="rounded-md bg-secondary-500 px-10 py-2 hover:bg-primary-500 hover:text-white"
      onClick={() => setSelectedPage(SelectedPage.SignUp)}
      to={`/${SelectedPage.SignUp}`}
    >
      {children}
    </Link>
  );
};

export default ActionButton;
