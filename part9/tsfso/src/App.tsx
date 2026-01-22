interface HeaderProps {
  courseName: string,
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartsDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartsDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartsDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartsDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

interface CourseProps {
  courseParts: CoursePart[]
}

interface TotalProps {
  totalExercises: number,
}

const Header = (props: HeaderProps) => <h1>{props.courseName}</h1>

const Course = (props: CourseProps) => {
  return (
    <>
      {props.courseParts.map(part => (
        <Part key={part.name} {...part} />
      ))}
    </>
  )
}

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <>
          <h1>{props.name} {props.exerciseCount}</h1>
          <i>{props.description}</i>
        </>
      )
    case "group":
      return (
        <>
          <h1>{props.name} {props.exerciseCount}</h1>
          <div>project exercises {props.groupProjectCount}</div>
        </>
      )
    case "background":
      return (
        <>
          <h1>{props.name} {props.exerciseCount}</h1>
          <i>{props.description}</i>
          <div>{props.backgroundMaterial}</div>
        </>
      )
    case "special":
      return (
        <>
          <h1>{props.name} {props.exerciseCount}</h1>
          <i>{props.description}</i>
          <div>requirements: {props.requirements.join(", ")}</div>
        </>
      )
    default:
      return assertNever(props)
  }
}

const Total = (props: TotalProps) => <p>Number of exercises {props.totalExercises}</p>

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName: string = "Half Stack application development";
  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}
];
  const totalExercises: number = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName}/>
      <Course courseParts={courseParts}/>
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

export default App;