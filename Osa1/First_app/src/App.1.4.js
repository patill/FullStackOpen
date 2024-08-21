const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  //console.log(props.course.name);
  return (
    <p>
      {props.course.name} {props.course.exercises}
    </p>
  );
};

const Content = (props) => {
  //console.log(props);
  return (
    <div>
      <Part course={props.parts[0]} />
      <Part course={props.parts[1]} />
      <Part course={props.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts.reduce((a, b) => a + b.exercises, 0)}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
