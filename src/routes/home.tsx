import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

// import { makeStyles } from '@material-ui/core/styles'

// import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
// import GitHubIcon from '@material-ui/icons/GitHub'
// import Link from '@material-ui/core/Link'

import logoImage from "./logo.png";

import { AuthContext } from "../contexts/authContext";

// const useStyles = makeStyles((theme) => ({
//   root: {},
//   title: {
//     textAlign: 'center',
//   },
//   session: {
//     width: '80vw',
//     overflow: 'auto',
//     overflowWrap: 'break-word',
//     fontSize: '16px',
//   },
//   hero: {
//     width: '100%',
//     background: 'rgb(220,220,220)',
//   },
// }))

export default function Home() {
  // const classes = useStyles();

  const navigatge = useNavigate();

  const auth = useContext(AuthContext);

  async function signOutClicked() {
    await auth.signOut();
    // navigatge.push("/");
    navigatge("/");
  }

  function changePasswordClicked() {
    // navigatge.push("changepassword");
    navigatge("/changepassword");
  }

  return (
    // <Grid container>
    //   <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
    //     <Box className={classes.hero} p={4}>
    //       <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
    //         <Box m={2}>
    //           <img src={logoImage} width={224} height={224} alt="logo" />
    //         </Box>
    //         <Box m={2}>
    //           <Link underline="none" color="inherit" href="https://github.com/dbroadhurst/aws-cognito-react">
    //             <Grid container direction="row" justify="center" alignItems="center">
    //               <Box mr={3}>
    //                 <GitHubIcon fontSize="large" />
    //               </Box>
    //               <Typography className={classes.title} variant="h3">
    //                 AWS Cognito Starter Home
    //               </Typography>
    //             </Grid>
    //           </Link>
    //         </Box>
    //         <Box m={2}>
    //           <Button onClick={signOutClicked} variant="contained" color="primary">
    //             Sign Out
    //           </Button>
    //         </Box>
    //         <Box m={2}>
    //           <Button onClick={changePasswordClicked} variant="contained" color="primary">
    //             Change Password
    //           </Button>
    //         </Box>
    //       </Grid>
    //     </Box>
    //     <Box m={2}>
    //       <Typography variant="h5">Session Info</Typography>
    //       <pre className={classes.session}>{JSON.stringify(auth.sessionInfo, null, 2)}</pre>
    //     </Box>
    //     <Box m={2}>
    //       <Typography variant="h5">User Attributes</Typography>
    //       <pre className={classes.session}>{JSON.stringify(auth.attrInfo, null, 2)}</pre>
    //     </Box>
    //   </Grid>
    // </Grid>

    <div className="grid grid-cols-1 justify-center items-center">
      <div className="p-4">
        <div className="grid grid-cols-1 justify-center items-center">
          <div className="m-2">
            <img src={logoImage} width={224} height={224} alt="logo" />
          </div>
          <div className="m-2">
            <a
              href="https://github.com/dbroadhurst/aws-cognito-react"
              className="flex justify-center items-center"
            >
              <div className="mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.64-1.33-2.24-.25-4.6-1.12-4.6-4.98 0-1.1.39-2 1.03-2.7a3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.87-2.36 4.73-4.6 4.98.36.31.68.92.68 1.86v2.76c0 .26.18.57.69.48A10 10 0 0 0 10 0z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold">AWS Cognito Starter Home</h3>
            </a>
          </div>
          <div className="m-2">
            <button
              onClick={signOutClicked}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </div>
          <div className="m-2">
            <button
              onClick={changePasswordClicked}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      <div className="m-2">
        <h5 className="text-xl font-bold">Session Info</h5>
        <pre className="bg-gray-200 p-2">
          {JSON.stringify(auth.sessionInfo, null, 2)}
        </pre>
      </div>
      <div className="m-2">
        <h5 className="text-xl font-bold">User Attributes</h5>
        <pre className="bg-gray-200 p-2">
          {JSON.stringify(auth.attrInfo, null, 2)}
        </pre>
      </div>
    </div>
  );
}
