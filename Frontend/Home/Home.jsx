import 'bootstrap/dist/css/bootstrap.css';
import React,{useState,useEffect} from "react";
import PostType from "../../components/PostType";
import axios from 'axios';


function Home(){
  // const location = useLocation();
  // const uid = location.state.uid;
  // console.log(uid);
  const [Posts, setPosts] = useState([]);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/show'); // Replace with your backend endpoint for fetching posts
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  
    return(
        <div style={{backgroundColor:"gray"}}>
        {/* <Header/> */}
        <PostType name="Trending" posts={Posts}/>
        </div>
    );
}

export default Home;