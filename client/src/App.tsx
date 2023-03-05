import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import Benefits from "@/scenes/benefits";
import OurClasses from "@/scenes/ourClasses";
import ContactUs from "@/scenes/contactUs";
import Footer from "@/scenes/footer";
import SignUp from "@/scenes/signUp";
import LogIn from "@/scenes/logIn";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import { Routes, Route, Navigate } from "react-router-dom";
import AddExercise from "@/scenes/addExercise";
import Exercises from "@/scenes/exercises";
import Workouts from "@/scenes/workouts";
import AddWorkout from "@/scenes/addWorkout";
import DisplayWorkout from "./scenes/displayWorkout";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
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
          path="/exercises"
          element={<Exercises setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/workouts"
          element={<Workouts setSelectedPage={setSelectedPage} />}
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
          path="/addExercise"
          element={
            <AddExercise
              setSelectedPage={setSelectedPage}
              accessToken={accessToken}
            />
          }
        />
        <Route
          path="/addWorkout"
          element={<AddWorkout setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/displayWorkout"
          element={<DisplayWorkout setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/signup"
          element={<SignUp setSelectedPage={setSelectedPage} />}
        />
        <Route
          path="/login"
          element={
            <LogIn
              setSelectedPage={setSelectedPage}
              // Set access token in login and pass it to add exercise and workout
              setAccessToken={setAccessToken}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
