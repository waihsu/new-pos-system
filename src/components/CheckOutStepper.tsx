import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Card, Flex, Text } from "@radix-ui/themes";
import { AiFillDelete } from "react-icons/ai";
import { Cart } from "@/app/actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function CheckOutStepper({
  carts,
  deleteCartItem,
}: {
  carts: Cart[];
  deleteCartItem: (id: string) => void;
}) {
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

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
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
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
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
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
            <Box>
              {activeStep === 0 ? (
                carts &&
                carts.map((cart) => (
                  <Card key={cart.id}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}>
                      <Image
                        src={cart.asset_url}
                        alt="product"
                        width={100}
                        height={100}
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          {cart.name}
                        </Text>
                        <Text as="div" size="2" color="gray">
                          {cart.price}
                        </Text>
                        <Text as="div" size="2" color="gray">
                          {cart.quantity}
                        </Text>
                        <Text as="div" size="2" color="gray">
                          Total: {Number(cart.quantity) * Number(cart.price)}
                        </Text>
                      </Box>
                      <Button
                        onClick={() => {
                          deleteCartItem(cart.id);
                          router.refresh();
                        }}>
                        <AiFillDelete />
                      </Button>
                    </Box>
                  </Card>
                ))
              ) : (
                <span></span>
              )}
              {activeStep === 1 ? <h1>Hello2</h1> : <span></span>}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
