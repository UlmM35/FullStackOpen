const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Courses = ({ courses }) => {
  return (
  <div>
    <Course course={courses[0]} />
    <Course course={courses[1]} />
  </div>
  )
}

const Course = ({ course }) => {
  const total = course.parts.reduce((accumulator, currentVal) => accumulator + currentVal.exercises, 0);
  return (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total total={total} />
  </>
  )
}

export default Courses