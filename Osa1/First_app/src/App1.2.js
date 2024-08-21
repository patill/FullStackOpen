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
      <Part course={props.part1} exercises={props.exercises1} />
      <Part course={props.part2} exercises={props.exercises2} />
      <Part course={props.part3} exercises={props.exercises3} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.sumArray.reduce((p, a) => p + a, 0)}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const allExercises = [exercises1, exercises2, exercises3];

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
        part2={part2}
        part3={part3}
      />
      <Total sumArray={allExercises} />
    </div>
  );
};

export default App;
