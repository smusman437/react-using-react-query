import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "./api/posts";
import Post from "./Post";

export function CreatePost({ setCurrentPage }) {
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const handleCreatePost = () => {
    createPostMutation.mutate({
      ...newPost,
    });
    setNewPost({ title: "", body: "" });
  };

  const handleDisable = () =>
    !(newPost.title && newPost.body) || createPostMutation.isLoading;
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
    // onMutate: (postData) => {
    //   // Update the local state optimistically before the mutation is executed
    //   queryClient.setQueryData("posts", (prevData) => {
    //     const newPost = { id: Date.now(), ...postData };
    //     return [...prevData, newPost];
    //   });

    //   // Return a snapshot of the previous posts data for possible rollback
    //   return () => queryClient.setQueryData("posts", prevData);
    // },
    // // Rollback the optimistic update on mutation failure
    // onError: (error, newItem, rollback) => {
    //   // Show an error toast or handle the error in your preferred way
    //   console.error("Create post failed:", error);

    //   // Rollback to the previous posts data
    //   rollback();
    // },
    // // Invalidate and refetch the posts query after successful mutation
    // onSuccess: () => {
    //   queryClient.invalidateQueries("posts");
    // },
  });

  return (
    <div className="mt-3">
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h3>Create a new post</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="validationDefault01" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            id="validationDefault01"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="validationDefault02" className="form-label">
            Body
          </label>
          <textarea
            type="text"
            placeholder="Body"
            className="form-control"
            id="validationDefault02"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
        </div>

        <div className="col-12">
          <button
            className="btn btn-primary"
            onClick={handleCreatePost}
            disabled={handleDisable()}
          >
            {createPostMutation.isLoading ? "Loading..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
