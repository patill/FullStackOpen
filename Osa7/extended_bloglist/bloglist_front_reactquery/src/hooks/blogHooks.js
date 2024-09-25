import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import {
  sendNotification,
  useNotificationDispatch,
} from "../components/NotificationContext";

export const useAddBlog = () => {
  console.log("useAddBlog fired");
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  queryClient.setMutationDefaults(["add-blogs"], {
    mutationFn: (data) => {
      console.log("add blog mutation fired");
      console.log(data);
      return blogService.newBlog(data);
    },
    onSuccess: (data) => {
      console.log(data);
      //toggleBlogForm.current.toggleVisibility();
      sendNotification(dispatch, {
        text: `The blog entry ${data.title} has been created`,
        className: "notification",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      console.log(err);
      sendNotification(dispatch, {
        text: `There was an error`,
        className: "error",
      });
    },
  });
  return useMutation({ mutationKey: ["add-blogs"] });
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  queryClient.setMutationDefaults(["like-blogs"], {
    mutationFn: (data) => {
      return blogService.update(data);
    },
    onSuccess: (data) => {
      sendNotification(dispatch, {
        text: `You liked ${data.title}.`,
        className: "notification",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      console.log(err);
      sendNotification(dispatch, {
        text: "Someting went wrong, try again",
        className: "error",
      });
    },
  });
  return useMutation({ mutationKey: ["like-blogs"] });
};

export const useRemoveBlog = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  queryClient.setMutationDefaults(["remove-blog"], {
    mutationFn: (data) => {
      blogService.remove(data._id);
      //return data.title;
    },
    onSuccess: () => {
      //console.log(data);
      sendNotification(dispatch, {
        text: `The blog entry  has been removed.`,
        className: "notification",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (err) => {
      console.log(err);
      sendNotification(dispatch, {
        text: "The blog entry could not be removed",
        className: "error",
      });
    },
  });
  return useMutation({ mutationKey: ["remove-blog"] });
};
