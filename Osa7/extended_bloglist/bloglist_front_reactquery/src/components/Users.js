//import { useSelector } from 'react-redux'
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const Users = () => {
  const queryClient = useQueryClient();
  const [users] = queryClient.getQueriesData({ queryKey: ["users"] });
  console.log(JSON.parse(JSON.stringify(users)));
  if (users.isLoading) {
    return <div>loading data...</div>;
  }
  return (
    <div>
      <h1>User page</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users[1].map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
