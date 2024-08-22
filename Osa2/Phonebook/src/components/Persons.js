const Number = ({ person, onDelete }) => {
  return (
    <p>
      {person.name} (phone {person.number})
      <button onClick={onDelete}>Delete</button>
    </p>
  );
};

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <Number
          key={person.id}
          person={person}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </div>
  );
};

export default Persons;
