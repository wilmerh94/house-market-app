import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Explore } from './pages/Explore';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/SignIn';
import Navbar from './components/Navbar/Navbar';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Category } from './pages/Category';
import { Offers } from './pages/Offers';
import { CreateListing } from './pages/CreateListing';
import { Listing } from './pages/Listing';
import { Contact } from './pages/Contact';

export function App() {
 return (
  <>
   <Routes>
    <Route path='/' element={<Explore />} />
    <Route path='/offers' element={<Offers />} />
    <Route path='/category/:categoryName' element={<Category />} />
    <Route path='/profile' element={<PrivateRoute />}>
     <Route path='/profile' element={<Profile />} />
    </Route>
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/create-listing' element={<CreateListing />} />
    <Route path='/category/:categoryName/:listingId' element={<Listing />} />
    <Route path='/contact/:landlordId' element={<Contact />} />
   </Routes>
   <Navbar />
   <ToastContainer />
  </>
 );
}
export default App;
