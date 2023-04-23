import { BrowserRouter , Routes, Route , Navigate} from 'react-router-dom';
import { Home, Settings, Login } from '../pages';
import { Loader, Navbar } from './';
import About from '../pages/About';
import SignUp from '../pages/SignUp'
import { useAuth } from '../hooks';
import UserProfile from '../pages/UserProfile';

 const Page404 = () => {
  
    return <h1>404</h1>;
  };
function App() {

  const auth = useAuth();
 
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/"   element={<Home  />}/>
          <Route path="/about"  element={<About />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/signUp"  element={<SignUp />} />
          <Route path="/settings"  element={auth.user? <Settings/>:<Navigate to = "/login" />}/>
          <Route path="/user/:userId" element={auth.user? <UserProfile/>:<Navigate to = "/login" />}/>
          
            <Route path="*" element={<Page404 />} />
      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
