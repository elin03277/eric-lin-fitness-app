import AnchorLink from "react-anchor-link-smooth-scroll";

type Props = {
  page: string;
};

const Link = ({ page }: Props) => {
  //  const lowerCasePage
  return (
    <AnchorLink
    //   className={}
    //   href={}
    //   onClick={}
    >
      {page}
    </AnchorLink>
  );
};

export default Link;
