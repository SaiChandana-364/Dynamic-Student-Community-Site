import React,{useState,useEffect} from "react";
import PostType from "../../components/PostType";
import axios from 'axios';


function General(){
  const [Posts, setPosts] = useState([]);
  // Fetch posts on component mount
  useEffect(() => {
      const fetchPosts = async () => {
          try {
              const response = await axios.get('http://localhost:8080/posts', {
                  params: { type: "4" } // Post type for polls
              });
              setPosts(response.data); // Set the fetched posts in the state
          } catch (error) {
              console.error('Error fetching posts:', error);
          }
      };

      fetchPosts();
  }, []);

    return(
        <PostType name="General" posts={Posts}/>
    );
}
export default General;