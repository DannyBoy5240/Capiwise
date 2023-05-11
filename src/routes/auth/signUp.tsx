import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'

import {
  useValidEmail,
  useValidPassword,
  useValidUsername,
} from "../../hooks/useAuthHooks";
import { Email, Password, Username } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

// const useStyles = makeStyles({
//   root: {
//     height: '100vh',
//   },
// })

const SignUp: React.FunctionComponent = () => {
  // const classes = useStyles()

  const { email, setEmail, emailIsValid } = useValidEmail("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);

  const {
    password: passwordConfirm,
    setPassword: setPasswordConfirm,
    passwordIsValid: passwordConfirmIsValid,
  } = useValidPassword("");

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0 ||
    !passwordConfirmIsValid ||
    passwordConfirm.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      await authContext.signUpWithEmail(
        email.replace(".", "s").replace("@", "s"),
        email,
        password
      );
      setCreated(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const signUp = (
    <>
      {/* <Box width="80%" m={1}>
        <Email emailIsValid={emailIsValid} setEmail={setEmail} />
      </Box>
      <Box width="80%" m={1}>
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </Box>
      <Box width="80%" m={1}>
        <Password label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />
      </Box>
      <Box width="80%" m={1}>
        <Password label="Confirm Password" passwordIsValid={passwordConfirmIsValid} setPassword={setPasswordConfirm} />
      </Box>
      <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box> */}

      <div className="w-80 m-1">
        <Email emailIsValid={emailIsValid} email={email} setEmail={setEmail} />
      </div>
      <div className="w-80 m-1">
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </div>
      <div className="w-80 m-1">
        <Password
          label="Password"
          passwordIsValid={passwordIsValid}
          password={password}
          setPassword={setPassword}
        />
      </div>
      <div className="w-80 m-1">
        <Password
          label="Confirm Password"
          passwordIsValid={passwordConfirmIsValid}
          password={passwordConfirm}
          setPassword={setPasswordConfirm}
        />
      </div>
      <div className="mt-2">
        <p className="text-red-500 text-sm">{error}</p>
      </div>

      {/* Buttons */}
      {/* <Box mt={2}>
        <Grid container direction="row" justify="center">
          <Box m={1}>
            <Button
              onClick={() => history.goBack()}
              color="secondary"
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button
              disabled={isValid}
              color="primary"
              variant="contained"
              onClick={signInClicked}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Box> */}

      <div className="mt-2">
        <div className="flex justify-center">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg mr-2"
            // onclick="navigate.back()"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            // disabled="{{isValid}}"
            disabled={isValid}
            // onclick="signInClicked()"
            onClick={() => signInClicked()}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );

  const accountCreated = (
    <>
      {/* <Typography variant="h5">{`Created ${username} account`}</Typography>
      <Typography variant="h6">{`Verfiy Code sent to ${email}`}</Typography>

      <Box m={4}>
        <Button
          onClick={() => history.push("/verify")}
          color="primary"
          variant="contained"
        >
          Send Code
        </Button>
      </Box> */}

      <h5 className="text-2xl font-bold">Created {username} account</h5>
      <h6 className="text-xl">Verfiy Code sent to {email}</h6>

      <div className="m-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          // onclick="navigate.push('/verify')"
          onClick={() => navigate("/verify")}
        >
          Send Code
        </button>
      </div>
    </>
  );

  return (
    // <Grid
    //   className={classes.root}
    //   container
    //   direction="row"
    //   justify="center"
    //   alignItems="center"
    // >
    //   <Grid
    //     xs={11}
    //     sm={6}
    //     lg={4}
    //     container
    //     direction="row"
    //     justify="center"
    //     alignItems="center"
    //     item
    //   >
    //     <Paper style={{ width: "100%", padding: 16 }}>
    //       <Grid
    //         container
    //         direction="column"
    //         justify="center"
    //         alignItems="center"
    //       >
    //         {/* Title */}
    //         <Box m={3}>
    //           <Grid
    //             container
    //             direction="row"
    //             justify="center"
    //             alignItems="center"
    //           >
    //             <Typography variant="h3">Sign Up</Typography>
    //           </Grid>
    //         </Box>

    //         {!created ? signUp : accountCreated}
    //       </Grid>
    //     </Paper>
    //   </Grid>
    // </Grid>

    <div className="flex justify-center items-center">
      <div className="w-full sm:w-6/12 lg:w-4/12 p-4">
        <div className="bg-white p-8 rounded-lg">
          <div className="mb-3">
            <h3 className="text-3xl font-bold">Sign Up</h3>
          </div>
          {!created ? signUp : accountCreated}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
