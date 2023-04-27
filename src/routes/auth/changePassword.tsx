import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'

import { useValidPassword } from "../../hooks/useAuthHooks";
import { Password } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

// const useStyles = makeStyles({
//   root: {
//     height: '100vh',
//   },
// })

export default function ChangePassword() {
  // const classes = useStyles()

  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  const {
    password: oldPassword,
    setPassword: setOldPassword,
    passwordIsValid: oldPasswordIsValid,
  } = useValidPassword("");

  const {
    password: newPassword,
    setPassword: setNewPassword,
    passwordIsValid: newPasswordIsValid,
  } = useValidPassword("");

  const isValid =
    !oldPasswordIsValid ||
    oldPassword.length === 0 ||
    !newPasswordIsValid ||
    newPassword.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const changePassword = async () => {
    try {
      await authContext.changePassword(oldPassword, newPassword);
      setReset(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const signOut = async () => {
    try {
      await authContext.signOut();
      // navigate.push("/");
      navigate("/");
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const updatePassword = (
    <>
      {/* <Box width="80%" m={1}>
        <Password label="Old Password" passwordIsValid={oldPasswordIsValid} setPassword={setOldPassword} />
      </Box>
      <Box width="80%" m={1}>
        <Password label="Password" passwordIsValid={newPasswordIsValid} setPassword={setNewPassword} />
      </Box> */}
      {/* Error */}
      {/* <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box> */}

      {/* Buttons */}
      {/* <Box mt={2}>
        <Grid container direction="row" justify="center">
          <Box m={1}>
            <Button onClick={() => history.goBack()} color="secondary" variant="contained">
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button disabled={isValid} color="primary" variant="contained" onClick={changePassword}>
              Change Password
            </Button>
          </Box>
        </Grid>
      </Box> */}

      <div className="w-80 mx-auto">
        <Password
          label="Old Password"
          passwordIsValid={oldPasswordIsValid}
          setPassword={setOldPassword}
        />
        <Password
          label="Password"
          passwordIsValid={newPasswordIsValid}
          setPassword={setNewPassword}
        />

        {/* Error */}
        <div className="mt-2">
          <p className="text-red-500 text-sm">{error}</p>
        </div>

        {/* Buttons */}
        <div className="mt-2 flex justify-center">
          <button
            // onClick={() => navigate.goBack()}
            onClick={() => navigate(-1)}
            className="mx-1 bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={isValid}
            onClick={changePassword}
            className="mx-1 bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Change Password
          </button>
        </div>
      </div>
    </>
  );

  const passwordReset = (
    <>
      {/* <Typography variant="h5">{`Password Changed`}</Typography>

      <Box m={4}>
        <Button onClick={signOut} color="primary" variant="contained">
          Sign In
        </Button>
      </Box> */}
      <h1 className="text-2xl font-bold">{`Password Changed`}</h1>

      <div className="my-16">
        <button
          onClick={signOut}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Sign In
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
    //             <Typography variant="h3">Change Password</Typography>
    //           </Grid>
    //         </Box>

    //         {!reset ? updatePassword : passwordReset}
    //       </Grid>
    //     </Paper>
    //   </Grid>
    // </Grid>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
      <div className="col-span-2 lg:col-span-1 w-full">
        <div className="bg-white rounded-md shadow-md p-8">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-6">Change Password</h1>
          </div>

          {!reset ? updatePassword : passwordReset}
        </div>
      </div>
    </div>
  );
}
