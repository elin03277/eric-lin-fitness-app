import HomePageText from "@/assets/HomePageText.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={HomePageText} className="h-12" />
          <p className="my-5">
            I hope this app would be able to help you on your fitness journey!
          </p>
          <p>© Evogym All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5">https://www.youtube.com/@athleanx</p>
          <p className="my-5">https://www.youtube.com/@TheKneesovertoesguy</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">https://www.linkedin.com/in/eric-lin-03277/</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
