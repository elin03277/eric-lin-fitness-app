export enum SelectedPage {
  Home = "home",
  Benefits = "benefits",
  OurClasses = "ourclasses",
  ContactUs = "contactus",
  SignUp = "signup",
  LogIn = "login",
  Exercises = "exercises",
  Workouts = "workouts",
}

export interface BenefitType {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ClassType {
  name: string;
  description?: string;
  image: string;
}

export interface AddExerciseType {
  exerciseId: string;
  exerciseName: string;
}

export interface ExerciseType {
  id: string;
  name: string;
  equipment: string;
  pattern: string;
  instructions: string;
}

export interface WorkoutType {
  id: string;
  name: string;
  type: string;
  description: string;
}
