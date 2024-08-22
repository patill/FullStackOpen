const Header = (props) => {
  return <h2>{props.course}</h2>;
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
      {props.parts.map((course) => (
        <Part course={course} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      <b>Total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</b>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
