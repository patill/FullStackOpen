const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.course} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part course={props.part1.name} exercises={props.part1.exercises} />
      <Part course={props.part2.name} exercises={props.part2.exercises} />
      <Part course={props.part3.name} exercises={props.part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.sumArray.reduce((p, a) => p + a, 0)}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  const allExercises = [part1.exercises, part2.exercises, part3.exercises];

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total sumArray={allExercises} />
    </div>
  );
};

export default App;
