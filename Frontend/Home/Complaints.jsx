import React,{useState,useEffect} from "react";
import axios from 'axios';
import PostType from "../../components/PostType";

function Complaints(){
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
      const fetchPosts = async () => {
          try {
              const response = await axios.get('http://localhost:8080/posts', {
                  params: { type: "5" } // Post type for polls
              });
              setPosts(response.data);// Set the fetched posts in the state
          } catch (error) {
              console.error('Error fetching posts:', error);
          }
      };

      fetchPosts();
  }, []);

    return(
      <PostType name="Complaints" posts={Posts} />
);
}
export default Complaints;