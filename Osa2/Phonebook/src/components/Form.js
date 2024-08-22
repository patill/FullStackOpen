const Form = (props) => {
  return (
    <form onSubmit={props.addname}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
        <div>
          number:{" "}
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
