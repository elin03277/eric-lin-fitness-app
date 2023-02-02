import { SelectedPage } from "@/shared/types";
import { Link } from "react-router-dom";

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const SelectLink = ({ page, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;
  return (
    <Link
      className={`${selectedPage === lowerCasePage ? "text-primary-500" : ""}
      transition duration-500 hover:text-primary-300`}
      // href={`#${lowerCasePage}`}
      to={`/${lowerCasePage}`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </Link>
  );
};

export default SelectLink;
