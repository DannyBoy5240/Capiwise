import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles'
// import Box from '@material-ui/core/Box'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import Paper from '@material-ui/core/Paper'

import { useValidCode, useValidUsername } from "../../hooks/useAuthHooks";
import { Code, Username } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

// const useStyles = makeStyles({
//   root: {
//     height: '100vh',
//   },
//   hover: {
//     '&:hover': { cursor: 'pointer' },
//   },
// })

const VerifyCode: React.FunctionComponent<{}> = () => {
  // const classes = useStyles()

  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const { code, setCode, codeIsValid } = useValidCode("");
  const [error, setError] = useState("");

  const isValid =
    !usernameIsValid ||
    username.length === 0 ||
    !codeIsValid ||
    code.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const sendClicked = async () => {
    try {
      await authContext.verifyCode(username, code);
      // navigate.push("signin");
      navigate("signin");
    } catch (err) {
      setError("Invalid Code");
    }
  };

  const passwordResetClicked = async () => {
    // navigate.push("/resetpassword");
    navigate("/resetpassword");
  };

  return (
    // <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
    //   <Grid xs={11} sm={6} lg={4} container direction="row" justify="center" alignItems="center" item>
    //     <Paper style={{ width: '100%', padding: 32 }}>
    //       <Grid container direction="column" justify="center" alignItems="center">
    //         {/* Title */}
    //         <Box m={2}>
    //           <Typography variant="h3">Send Code</Typography>
    //         </Box>

    //         {/* Sign In Form */}
    //         <Box width="80%" m={1}>
    //           {/* <Email emailIsValid={emailIsValid} setEmail={setEmail} /> */}
    //           <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />{' '}
    //         </Box>
    //         <Box width="80%" m={1}>
    //           <Code codeIsValid={codeIsValid} setCode={setCode} />
    //           <Grid container direction="row" justify="flex-start" alignItems="center">
    //             <Box onClick={passwordResetClicked} mt={2}>
    //               <Typography className={classes.hover} variant="body2">
    //                 Resend Code
    //               </Typography>
    //               <Box mt={2}>
    //                 <Typography color="error" variant="body2">
    //                   {error}
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           </Grid>
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
    //               <Button disabled={isValid} color="primary" variant="contained" onClick={sendClicked}>
    //                 Send
    //               </Button>
    //             </Box>
    //           </Grid>
    //         </Box>
    //       </Grid>
    //     </Paper>
    //   </Grid>
    // </Grid>

    <div className="flex justify-center items-center">
      <div className="w-full sm:w-2/3 lg:w-1/2">
        <div className="bg-white p-8">
          <div className="flex flex-col justify-center items-center">
            {/* <!-- Title --> */}
            <h1 className="text-3xl font-bold mb-4">Send Code</h1>

            {/* <!-- Sign In Form --> */}
            <div className="w-80 mb-2">
              <div className="mb-2">
                {/* <!-- <Email emailIsValid={emailIsValid} setEmail={setEmail} /> --> */}
                <Username
                  usernameIsValid={usernameIsValid}
                  setUsername={setUsername}
                />
              </div>
              <div className="mb-2">
                <Code codeIsValid={codeIsValid} setCode={setCode} />
                <div className="flex flex-row justify-start items-center">
                  <div
                    className="cursor-pointer"
                    onClick={passwordResetClicked}
                  >
                    <p className="text-blue-500 hover:underline">Resend Code</p>
                    <div className="mt-2">
                      <p className="text-red-500">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Buttons --> */}
            <div className="mt-4">
              <div className="flex flex-row justify-center">
                <div className="mr-2">
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    // onClick={() => navigate.goBack()}
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
                <div className="ml-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    disabled={isValid}
                    onClick={sendClicked}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
