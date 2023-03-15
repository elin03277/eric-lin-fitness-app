type Props = {
  name: string;
  equipment: string;
  group: string;
  type: string;
  instructions: string;
};

const ConfirmExercise = ({
  name,
  equipment,
  group,
  type,
  instructions,
}: Props) => {
  const overlayStyles = `p-5 absolute z-32 flex 
      h-[380px] w-[450px] flex-col items-center justify-center
      whitespace-normal bg-primary-300 text-center text-white
    `;

  return (
    <li className="relative mx-5 inline-block h-[380px] w-[450px]">
      <div className={overlayStyles}>
        <p className="text-2xl">{name}</p>
        <p className="mt-5">{equipment}</p>
        <p className="mt-5">{group}</p>
        <p className="mt-5">{type}</p>
        <p className="mt-5">{instructions}</p>
      </div>
    </li>
  );
};

export default ConfirmExercise;
