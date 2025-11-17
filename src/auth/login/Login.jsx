import { useState } from 'react'
import useAuthStore from '../../lib/useAuthStore'
import { Navigate } from 'react-router-dom';
import AuthHeading from '../authCardHeading/AuthCardHeading'
import GoogleButton from '../googleButton/GoogleButton';
export default function Login() {
  const user = useAuthStore((state) => state.user);
  //const hadHydrated = useAuthStore.persist.hasHydrated();
  console.log(user);
  if (!user) return(
    <div className="login">
      <div className="authcard">
        Login
        <AuthHeading head="Log in" sub="or Sign Up" link="/signup"/>
        <GoogleButton/>
      </div>
    </div>   
  )
  return <Navigate to="/" replace/>;
  
  
      
  
}
