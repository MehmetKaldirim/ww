import * as React from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from "native-base";

const SignUpForm = () => {
  return (
    <Center mt="-10" w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="2">
        <Heading size="lg" color="white" fontWeight="semibold">
          Sign Up
        </Heading>
        <VStack space={3} mt="10">
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input h="45" rounded="full" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input h="45" rounded="full" type="password" />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input h="45" rounded="full" type="password" />
          </FormControl>
          <Button color="amber.600" rounded="full" mt="2" w="150">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignUpForm;
