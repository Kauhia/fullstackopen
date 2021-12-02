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

export default Course