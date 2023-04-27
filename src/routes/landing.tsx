import React from "react";

import { useNavigate } from "react-router-dom";

// import { makeStyles } from "@material-ui/core/styles";

// import Typography from '@material-ui/core/Typography'
// import Grid from '@material-ui/core/Grid'
// import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
// import Link from '@material-ui/core/Link'
// import GitHubIcon from '@material-ui/icons/GitHub'

import logoImage from "./logo.png";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//   },
//   title: {
//     textAlign: 'center',
//   },
// }))

const Landing: React.FunctionComponent = () => {
  // const classes = useStyles()

  const navigate = useNavigate();

  const signIn = () => {
    // navigate.push("/signin");
    navigate("/signin");
  };

  return (
    // <Grid container>
    //   <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
    //     <Box m={2}>
    //       <img src={logoImage} width={224} height={224} alt="logo" />
    //     </Box>
    //     <Box m={2}>
    //       <Link underline="none" color="inherit" href="https://github.com/dbroadhurst/aws-cognito-react">
    //         <Grid container direction="row" justify="center" alignItems="center">
    //           <Box mr={3}>
    //             <GitHubIcon fontSize="large" />
    //           </Box>
    //           <Typography className={classes.title} variant="h3">
    //             AWS Cognito Starter
    //           </Typography>
    //         </Grid>
    //       </Link>
    //     </Box>
    //     <Box m={2}>
    //       <Button onClick={signIn} variant="contained" color="primary">
    //         SIGN IN
    //       </Button>
    //     </Box>
    //   </Grid>
    // </Grid>

    <div className="container">
      <div className="flex flex-col justify-center items-center">
        <div className="m-2">
          <img src={logoImage} width={224} height={224} alt="logo" />
        </div>
        <div className="m-2">
          <a
            className="flex flex-row justify-center items-center text-black no-underline"
            href="https://github.com/dbroadhurst/aws-cognito-react"
          >
            <div className="mr-3">
              <svg
                className="w-8 h-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.91 11.84 2.63 11.65C2.34 11.46 1.82 10.89 2.49 10.88C3.15 10.86 3.57 11.61 3.72 11.88C4.43 13 5.56 12.63 6.05 12.39C6.12 12.06 6.33 11.85 6.65 11.68C4.82 11.45 3.68 10.7 3.68 7.99C3.68 7.08 3.95 6.34 4.34 5.74C4.28 5.54 4.03 4.73 4.46 3.56C4.46 3.56 5.23 3.34 6.02 4.16C6.63 4.03 7.34 3.97 8.05 3.97C8.76 3.97 9.47 4.03 10.08 4.16C10.87 3.34 11.64 3.56 11.64 3.56C12.07 4.73 11.82 5.54 11.76 5.74C12.15 6.34 12.42 7.08 12.42 7.99C12.42 10.71 11.28 11.44 9.44 11.67C9.76 11.84 10 12.06 10 12.61C10 13.23 10 14.01 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold title">AWS Cognito Starter</h1>
          </a>
        </div>
        <div className="m-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={signIn}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
