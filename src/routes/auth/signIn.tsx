import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'

import { useValidPassword, useValidUsername } from "../../hooks/useAuthHooks";
import { Password, Username } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

// const useStyles = makeStyles({
//   root: {
//     height: '100vh',
//   },
//   hover: {
//     '&:hover': { cursor: 'pointer' },
//   },
// })

const SignIn: React.FunctionComponent<{}> = () => {
  // const classes = useStyles()

  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const [error, setError] = useState("");

  const isValid =
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      await authContext.signInWithEmail(username, password, {
        mfaSetup: (challengeName: any, challengeParameters: any) => {
          // Handle MFA setup here
          console.log("Handle MFA setup here!");
        },
      });
      navigate("/home");
    } catch (err: any) {
      if (err.code === "UserNotConfirmedException") {
        navigate("/verify");
      } else {
        setError(err.message);
      }
    }
  };

  const passwordResetClicked = async () => {
    // navigate.push("requestcode");
    navigate("/requestcode");
  };

  return (
    // <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
    //   <Grid xs={11} sm={6} lg={4} container direction="row" justify="center" alignItems="center" item>
    //     <Paper style={{ width: '100%', padding: 32 }}>
    //       <Grid container direction="column" justify="center" alignItems="center">
    //         {/* Title */}
    //         <Box m={2}>
    //           <Typography variant="h3">Sign in</Typography>
    //         </Box>

    //         {/* Sign In Form */}
    //         <Box width="80%" m={1}>
    //           {/* <Email emailIsValid={emailIsValid} setEmail={setEmail} /> */}
    //           <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />{' '}
    //         </Box>
    //         <Box width="80%" m={1}>
    //           <Password label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />
    //           <Grid container direction="row" justify="flex-start" alignItems="center">
    //             <Box onClick={passwordResetClicked} mt={2}>
    //               <Typography className={classes.hover} variant="body2">
    //                 Forgot Password?
    //               </Typography>
    //             </Box>
    //           </Grid>
    //         </Box>

    //         {/* Error */}
    //         <Box mt={2}>
    //           <Typography color="error" variant="body2">
    //             {error}
    //           </Typography>
    //         </Box>

    //         {/* Buttons */}
    //         <Box mt={2}>
    //           <Grid container direction="row" justify="center">
    //             <Box m={1}>
    //               <Button color="secondary" variant="contained" onClick={() => history.goBack()}>
    //                 Cancel
    //               </Button>
    //             </Box>
    //             <Box m={1}>
    //               <Button disabled={isValid} color="primary" variant="contained" onClick={signInClicked}>
    //                 Sign In
    //               </Button>
    //             </Box>
    //           </Grid>
    //         </Box>
    //         <Box mt={2}>
    //           <Box onClick={() => history.push('signup')}>
    //             <Typography className={classes.hover} variant="body1">
    //               Register a new account
    //             </Typography>
    //           </Box>
    //         </Box>
    //       </Grid>
    //     </Paper>
    //   </Grid>
    // </Grid>

    <div className="flex justify-center items-center">
      <div className="w-full sm:w-6/12 lg:w-4/12 p-4">
        <div className="bg-white p-8 rounded-lg">
          <h3 className="text-3xl font-bold mb-4">Sign in</h3>
          <div className="w-80 mb-1">
            {/* <Email emailIsValid={emailIsValid} setEmail={setEmail} /> */}
            <Username
              usernameIsValid={usernameIsValid}
              setUsername={setUsername}
            />
          </div>
          <div className="w-80 mb-1">
            {/* <input
              type="password"
              placeholder="Password"
              className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
            /> */}
            <Password
              label="Password"
              passwordIsValid={passwordIsValid}
              password={password}
              setPassword={setPassword}
            />
            <div
              className="flex justify-start items-center mt-2"
              onClick={passwordResetClicked}
            >
              <span className="text-blue-500 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
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
                disabled={isValid}
                // onclick="signInClicked()"
                onClick={() => signInClicked()}
              >
                Sign In
              </button>
            </div>
          </div>
          <div className="mt-2">
            <p
              className="text-center cursor-pointer hover:underline"
              // onclick="navigate.push('signup')"
              onClick={() => navigate("/signup")}
            >
              Register a new account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
