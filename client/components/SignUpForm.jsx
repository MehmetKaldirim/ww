import * as React from "react";
import * as Yup from "yup";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
} from "native-base";
import { Formik } from "formik";

const SignUpForm = ({ handleSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const initialFieldsValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <Center mt="-10" w="100%">
      <Formik
        initialValues={initialFieldsValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Box safeArea p="2" w="90%" maxW="290" py="2">
            <Heading size="lg" color="white" fontWeight="semibold">
              Sign Up
            </Heading>
            <VStack space={3} mt="10">
              <FormControl isInvalid={touched.name && errors.name}>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  h="45"
                  rounded="full"
                  color="white"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.email && errors.email}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  h="45"
                  rounded="full"
                  color="white"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <FormControl.ErrorMessage>
                  {errors.email}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.password && errors.password}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  h="45"
                  rounded="full"
                  type="password"
                  color="white"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                backgroundColor="#a22cd9"
                rounded="full"
                mt="2"
                w="150"
                onPress={handleSubmit}
                disabled={Object.keys(errors).length !== 0}
              >
                Sign up
              </Button>
            </VStack>
          </Box>
        )}
      </Formik>
    </Center>
  );
};

export default SignUpForm;
