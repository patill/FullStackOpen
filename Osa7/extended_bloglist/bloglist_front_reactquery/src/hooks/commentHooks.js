import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "../services/comments";
import {
  sendNotification,
  useNotificationDispatch,
} from "../components/NotificationContext";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  queryClient.setMutationDefaults(["add-comment"], {
    mutationFn: (data) => {
      console.log(data);
      return commentService.postNew(data.id, data.text);
    },
    onSuccess: (data) => {
      sendNotification(dispatch, {
        text: "The comment has been created.",
        className: "notification",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
  return useMutation({ mutationKey: ["add-comment"] });
};
