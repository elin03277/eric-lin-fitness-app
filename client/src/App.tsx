import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import Benefits from "@/scenes/benefits";
import OurClasses from "@/scenes/ourClasses";
import ContactUs from "@/scenes/contactUs";
import Footer from "@/scenes/footer";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import { Routes, Route, Navigate } from "react-router-dom";
import AddExercise from "@/scenes/addExercise";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app bg-gray-20">
      <Navbar
        isTopOfPage={isTopOfPage}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<Home setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/benefits"
          element={<Benefits setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/ourclasses"
          element={<OurClasses setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/contactus"
          element={<ContactUs setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/add"
          element={<AddExercise setSelectedPage={setSelectedPage} />}
        />
        <Route path=":id">
          <Route
            index
            element={<OurClasses setSelectedPage={setSelectedPage} />}
          />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
