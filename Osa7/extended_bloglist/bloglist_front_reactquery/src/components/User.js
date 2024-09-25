import { useMatch } from "react-router-dom";
import {
  sendNotification,
  useNotificationDispatch,
} from "./NotificationContext";
import Notification from "./Notification";
import { useQueryClient } from "@tanstack/react-query";

const User = () => {
  const dispatch = useNotificationDispatch();
  const match = useMatch("/users/:id");
  const queryClient = useQueryClient();
  const [users] = queryClient.getQueriesData({ queryKey: ["users"] });
  let user;

  if (users) {
    user = match ? users[1].find((user) => user.id === match.params.id) : null;
  }

  console.log(user);
  if (!user || !users) {
    sendNotification(dispatch, {
      notification: "The user does not exist",
      class: "error",
    });

    return (
      <div>
        <Notification />
        <p>There is no user</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
