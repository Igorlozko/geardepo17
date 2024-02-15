import { Box, Button, Container, Stack, Step, StepButton, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddDate from './addDate/AddDate'
import AddResInfo from './addResInfo/AddResInfo'
import { useValue } from '../../context/ContextProvider'
import { Send } from '@mui/icons-material'


const AddReservations = () => {
    const {state:{resDetails},} = useValue();
    const [activeStep, setActiveStep] = useState(0)
    const [steps, setSteps] = useState([
        {label:'Date Range', completed:false},
        {label:'Details', completed:false},
    ]);

    // state for the subit button 
    const [showSubmit, setShowSubmit] = useState(false)

    const checkDisabledState = ()=>{
        if(activeStep < steps.length -1 ) return false  // checks if the active steps if 0 stops execution 
        const index = findUnfinished // if lat step find index if any of the steps are not completed 
        if(index !== -1 ) return false // if all steps completed function returns -1 is not equal to not -1 then not finished 
        return true // if index =1 then finished to diable next function 
    }

    const findUnfinished = ()=>{
        return steps.findIndex(step => !step.completed) // if lat step find index if any of the steps are not completed
    }

    const handleNextState = ()=>{
        if(activeStep < steps.length -1 ){
                setActiveStep(activeStep => activeStep+ 1) // adding plus one to move to next step 
        }else {
            const stepIndex = findUnfinished() // incase last step functionused returns index of first unfineds step sets to actver step
            setActiveStep(stepIndex)
        }
    }

    useEffect(()=>{
        if(resDetails.phone.length > 5 && resDetails.purpose.length > 4 && resDetails.addinfo.length > 4 ){
            if(!steps[1].completed) setComplete(1,true)
        }else{
            if(steps[1].completed) setComplete(1, false)
        }   
    },[resDetails]);
    const setComplete = (index, status) =>{
        setSteps((steps)=>{
            steps[index].completed = status;
            return[...steps]
        });
    };

    useEffect(()=>{
        // check if all steps are completed  then function returns 1
        if(findUnfinished() ===-1){// this means that all the steps ahve been completed 
            if(!showSubmit) setShowSubmit(true)
        }else {
            if(showSubmit) setShowSubmit(false) // if the steps are not completed the state is false 
        }
    },[steps])

    const handleSubmit = ()=>{};

  return (
    // container centeralises compnments within the page 
    <Container sx={{my:4}}>
        <Stepper
            alternativeLabel // labels under the stepper
            nonLinear // flexiable stepper
            activeStep={activeStep}
            sx={{mb:3}}
        >
            {steps.map((step, index)=>(
                <Step
                    key={step.label} 
                    completed={step.completed}
                >
                    <StepButton onClick={()=>setActiveStep(index)}>
                        {step.label}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
        {/**Box componment containing the steps inside the curly bracets is a switch case */}
        <Box 
            sx={{
                pb:7,
            }}
        > 
            {{
                0: <AddDate/>,  // if 0 the date range will show up 
                1: <AddResInfo/> // if 1 the reservation info wil show up
            }[activeStep]} {/**switch state depends on the active step */}
        <Stack
            direction="row"
            sx={{pt:2,  justifyContent:'space-around'}}
        >
            <Button
                color='inherit'
                disabled={!activeStep}  // if 0 then disabled 
                onClick={()=>setActiveStep(activeStep=>activeStep-1)} // set active set to minus one when next clicked 
            >
                Back
            </Button>
            <Button
                disabled={checkDisabledState()} // disabled is controled by function invkes with every render 
                onClick={handleNextState}
            >
                Next
            </Button>
        </Stack>
        {showSubmit && (
            <Stack
                sx={{alignItems:'center'}}
            >
                <Button
                    variant='contained'
                    endIcon={<Send/>}
                    onClick={handleSubmit}
                >Submit</Button>
            </Stack>
        )}
        </Box>
    </Container>
  )
}

export default AddReservations;