import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useAuthContext } from "../contexts/authUserContext";

const signin = () => {
  const router = useRouter();

  const userContext = useAuthContext();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    setError("");
    if(email == "" || password == "") setError("Fields should not be empty.");
    else{
      userContext.signInWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log("Sign in success!")
        console.log(authUser);
        router.push("/noteboards");
      })
      .catch(err => {
        setError(err.message);
      })
    }
  }

  return (
    <div className="container">
        <form onSubmit={submitHandler}>
          <div className="form-default">
            <div className="errorMessage">
              {error}
            </div>
            <div className="form-item">
              <label htmlFor="emailInput">Email</label>
              <input value={email} onInput={e => {setEmail(e.target.value)}} type="text" id="emailInput"/>
            </div>
            <div className="form-item">
              <label htmlFor="passwordInput">Password</label>
              <input value={password} onInput={e => {setPassword(e.target.value)}} type="password" id="passwordInput" />
            </div>
            <button>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default signin
