import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
// import { makeStyles } from '@mui/styles';
import "./HorizontalStepper.css";

const steps = ["", "", "", ""];

export default function HorizontalNonLinearStepper() {
  // const useStyles = makeStyles(() => ({
  //   root: {
  //     "& .MuiStepIcon-active": { color: "red" },
  //     "& .MuiStepIcon-completed": { color: "green" },
  //     "& .Mui-disabled .MuiStepIcon-root": { color: "white" }
  //   }
  // }));

  // const c = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ margin: "auto", marginTop: "2.7rem",maxWidth : "30%" }}>
      <Stepper sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: '#6951e6', 
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: '#6951e6',
          },
        }} nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}
          >
            <StepButton onClick={handleStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 7, mb: 1, py: 0 }}>
              <h1 className="heading">How are you planning to use Eden?</h1>
              <h4 className="h4tag">We'll streamline your setup experience accordingly.</h4>
              <div className="cardcontainer">
                  <div className="card">
                    <div><Person2OutlinedIcon sx={{marginTop : '1rem',px : "1rem"}}/></div>
                    <div className="strong"><strong>For myself</strong></div>
                    <div className="h4tagcard">Write better. Think more clearly. Stay organized.</div>
                  </div>
                  <div className="card">
                    <div><GroupsOutlinedIcon sx={{marginTop : '1rem',px : "1rem"}}/></div>
                    <div className="strong"><strong>With my team</strong></div>
                    <div className="h4tagcard">Wiki's, docs, tasks and projects, all in one place.</div>
                  </div>
              </div>
            </Typography>
            <Box
              textAlign="center"
              sx={{ display: "flex", flexDirection: "row", pt: 2 }}
            >
              <Box sx={{ flex: "1 1 auto", marginTop : '4rem'}} />
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button sx={{textTransform : 'none' ,height : '3rem',color : 'white' ,backgroundColor : "#6951e6", width : "100%"}} onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Launch Eden"
                      : "Create Workspace"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

