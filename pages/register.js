import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/authUserContext";
import Link from 'next/link';

const Register = () => {

  const router = useRouter();

  const userContext = useAuthContext();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    
  }, [username])

  const submitHandler = e => {
    e.preventDefault();
    setError("");
    if(password != password2) setError("Passwords do not match.");
    else if(email == "" || password == "" || username == "") setError("Fields should not be empty.");
    else{
      userContext.createUserWithEmailAndPassword(email, password, username)
      .then(user => {
        console.log("Success. User created.")
        console.log(user);
        router.push("/noteboards");
      })
      .catch(err => {
        setError(err.message);
      })
    }
  }

  return (
    <div className="flex-center">
      <div className="form-window">
        <form onSubmit={submitHandler}>
          <div className="form-column">
            <div className="headline">
              Register
            </div>
            <div className="form-default">
              <div className="errorMessage">
                {error}
              </div>
              <div className="form-item">
                <label htmlFor="emailInput">email</label>
                <input value={email} onInput={e => {setEmail(e.target.value)}} type="text" id="emailInput"/>
              </div>
              <div className="form-item">
                <label htmlFor="usernameInput">username</label>
                <input value={username} onInput={e => {setUsername(e.target.value)}} type="text" id="usernameInput"/>
              </div>
              <div className="form-item">
                <label htmlFor="passwordInput">password</label>
                <input value={password} onInput={e => {setPassword(e.target.value)}} type="password" id="passwordInput" />
              </div>
              <div className="form-item">
                <label htmlFor="repeatPasswordInput">repeat password</label>
                <input value={password2} onInput={e => {setPassword2(e.target.value)}} type="password" id="repeatPasswordInput" />
              </div>
            </div>
            <div>
              <button className="primary">Submit</button> 
            </div>
            <div>
              Already have an account? <Link href="/signin"><a className="link">Sign In</a></Link>
            </div>
          </div> 
        </form>
      </div>
    </div>
  )
}

export default Register
