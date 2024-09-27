import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "../services/comments";

export const useAddComment = (id) => {
  const queryClient = useQueryClient();
  queryClient.setMutationDefaults(["add-comment"], {
    mutationFn: (data) => {
      console.log(data);
      return commentService.postNew(id, data);
    },
  });
  return useMutation({ mutationKey: ["add-comment"] });
};
