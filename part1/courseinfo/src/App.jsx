const Header = (course) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Content = (count) => {
  return (
    <>
      <Part part={count.part1} exercise={count.exercise1}/>
      <Part part={count.part2} exercise={count.exercise2}/>
      <Part part={count.part3} exercise={count.exercise3}/>
    </>
  )
}

const Part = (content) => {
  return (
    <>
      <p>{content.part} {content.exercise}</p>
    </>
  )
}

const Total = (number) => {
  return (
    <> 
      <p>Number of excercises {number.first + number.second + number.third}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content part1={course.parts[0].name} part2={course.parts[1].name} part3={course.parts[2].name} exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2].exercises}/>
      <Total first={course.parts[0].exercises} second={course.parts[1].exercises} third={course.parts[2].exercises}/>
    </div>
  )
}

export default App