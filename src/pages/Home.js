import styles from '../styles/home.module.css';
import Comment from '../components/Comment.js';
import { CreatePost, Loader } from '../components';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';
import {FriendsList} from '../components';
import {Post} from '../components';
const Home = () => {
  const auth = useAuth();
  const posts = usePosts();
  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost/>
        {posts.data.map((post) => (
          <Post post = {post}/>
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

export default Home;
