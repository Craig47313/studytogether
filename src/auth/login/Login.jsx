import { useState } from 'react'
import useAuthStore from '../../lib/firebase'
import { Navigate } from 'react-router-dom';

export default function Login() {
  const user = useAuthStore((state) => state.user);
  if(user != null){
    return <Navigate to="/" replace/>;
  }

  return (
    <div className="login">
      <div className="authcard">
        <AuthHeading head="Log in" sub="or Sign Up" link="/signup"/>
        <GoogleButton/>
      </div>
    </div>
  )
}
