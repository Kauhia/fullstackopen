import React from 'react'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({name, exercises}) => <p key={name}>{name} {exercises}</p>
const Content = ({parts}) => parts.map(Part)

const Total = ({parts}) =>
  <p>total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</p>

const Course = ({course}) => 
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/> 
      <Total parts={course.parts}/>
    </div>

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App