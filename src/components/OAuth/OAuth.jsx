import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase.config';
import googleIcon from '../../assets/svg/googleIcon.svg';

export const OAuth = () => {
 const navigate = useNavigate();
 const location = useLocation();

 const onGoogleClick = async () => {
  try {
   const auth = getAuth();
   const provider = new GoogleAuthProvider();
   const result = await signInWithPopup(auth, provider);
   const user = result.user;
   //Check for user
   const userDoc = await getDoc(doc(db, 'users', user.uid));
   if (userDoc.exists) {
    //if the user exist
    navigate('/');
   } else {
    //if the user does not exist
    const formData = {
     name: user.displayName,
     email: user.email,
     timestamp: serverTimestamp(),
    };
    await setDoc(doc(db, 'users', user.uid), formData);
    navigate('/');
   }
  } catch (error) {
   toast.error('Something when wrong');
  }
 };

 return (
  <div className='socialLogin'>
   <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
   <button className='socialIconDiv' onClick={onGoogleClick}>
    <img className='socialIconImg' src={googleIcon} alt='google' />
   </button>
  </div>
 );
};
