import React,{useState} from 'react'
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const nameRef = useRef("")
  const passwordRef = useRef("")

  function validate(){
    return true;
  }
  function handleForm(event){
    event.preventDefault()

    const isValid = validate()
    if(!isValid){
      return;
    }
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true)
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if(data.message === "User Not found."){
          alert(data.message),
          nameRef.current.focus()
          return
        }
        if(data.message === "Invalid Password!"){
          alert(data.message),
          passwordRef.current.focus()
          return
        }
        if(data.accessToken){
          alert('Sucsses')
          localStorage.setItem('user', JSON.stringify(data))
          localStorage.setItem('token', data.accessToken)

          navigate('/')
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(function(){
        setLoading(false)
      })  
  }
  return (
      <form className={styles.form}>
        <h2>LOGIN </h2> <Link className={`${styles.login} ${styles.btn}`} to = '/register'>Register</Link>
        <input ref={nameRef} type="text" placeholder="User name" />
        <input ref={passwordRef} type="password" placeholder="User Password" />

        {
          loading && <button className={styles.btn} disabled>Loading...</button>
        }
        {
          !loading && <button className={styles.btn} onClick={handleForm}>Login</button>
        }
      </form>
  )
}

export default Login
