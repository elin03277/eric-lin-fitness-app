import Logo from "@/assets/Logo.png";
import HomePageText from "@/assets/HomePageText.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary-100 py-16">
      <div className="justify-content mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={HomePageText} className="h-12" />
          <p className="my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
            nisi sem. Nullam semper nisi a nunc lacinia, in egestas nunc mollis.
            Integer quis ultrices nulla, nec iaculis ex. Etiam lorem libero,
            laoreet non nisl sit amet, ultrices commodo diam. Aliquam id ex
            justo.
          </p>
          <p>© Evogym All Rights Reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Links</h4>
          <p className="my-5">Lorem ipsum dolor</p>
          <p className="my-5">Nullam semper nisi</p>
          <p>Integer quis ultrices</p>
        </div>
        <div className="mt-16 basis-1/4 md:mt-0">
          <h4 className="font-bold">Contact Us</h4>
          <p className="my-5">Etiam lorem libero</p>
          <p className="my-5">(333)425-6825</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
