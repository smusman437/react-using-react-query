import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getPost } from "./api/posts";
import { CreatePost } from "./CreatePost";
import Post from "./Post";
import { PostListInfinite } from "./PostListInfinite";
import { PostListPaginated } from "./PostListPaginated";
import PostsList1 from "./PostsList1";
import PostsList2 from "./PostsList2";

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);
  const queryClient = useQueryClient();

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    });
  }

  return (
    <div className="container mt-2">
      <span className="mx-1">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(<PostsList1 />)}
        >
          Posts List 1
        </button>
      </span>
      <span className="mx-1">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(<PostsList2 />)}
        >
          Posts List 2
        </button>
      </span>
      <span className="mx-1">
        <button
          className="btn btn-outline-primary"
          onMouseEnter={onHoverPostOneLink}
          onClick={() => setCurrentPage(<Post id={1} />)}
        >
          First Post
        </button>
      </span>
      <span className="mx-1">
        <button
          className="btn btn-outline-primary"
          onClick={() =>
            setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          New Post
        </button>
      </span>
      <span className="mx-1">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(<PostListPaginated />)}
        >
          Post List Paginated
        </button>
      </span>
      <span className="mx-1">
        <button
          className="btn btn-outline-primary"
          onClick={() => setCurrentPage(<PostListInfinite />)}
        >
          Post List Infinite
        </button>
      </span>
      <br />
      <div className="container">{currentPage}</div>
    </div>
  );
}
