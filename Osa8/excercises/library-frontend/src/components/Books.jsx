const Books = (props) => {
  if (!props.show) {
    return null;
  }

  const res = props.books;
  //const res = useQuery(ALL_BOOKS);

  if (res.loading) {
    return <div>loading...</div>;
  }

  console.log(res);
  const books = props.books.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
