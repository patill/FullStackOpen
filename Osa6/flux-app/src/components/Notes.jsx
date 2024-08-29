import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { toggleImportanceOf } from "../reducer/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? "important" : ""}</strong>
    </li>
  );
};

Note.propTypes = {
  content: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

Notes.propTypes = {
  notes: PropTypes.object,
};

export default Notes;
