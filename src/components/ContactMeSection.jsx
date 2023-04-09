import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import FullScreenSection from './FullScreenSection';
import useSubmit from '../hooks/useSubmit';
import { useAlertContext } from '../context/alertContext';

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const initialValues = {
    firstName: '',
    email: '',
    type: '',
    comment: '',
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      submit('www.google.com', values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      type: Yup.string(),
      comment: Yup.string().required('Required'),
    }),
  });

  useEffect(() => {
    if (response) {
      if (response.type === 'success') {
        formik.resetForm({ initialValues });
      }
      onOpen(response.type, response.message);
    }
  }, [response]);

  const isNameInvalid =
    formik.touched.firstName && !formik.isValid && formik.errors.firstName;
  const isEmailInvalid =
    formik.touched.comment && !formik.isValid && formik.errors.email;
  const isCommentInvalid =
    formik.touched.comment && !formik.isValid && formik.errors.comment;

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl
                isInvalid={isNameInvalid}
                {...formik.getFieldProps()}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{isNameInvalid}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={isEmailInvalid}
                {...formik.getFieldProps()}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{isEmailInvalid}</FormErrorMessage>
              </FormControl>
              <FormControl {...formik.getFieldProps()}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl
                isInvalid={isCommentInvalid}
                {...formik.getFieldProps()}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{isCommentInvalid}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                {isLoading ? 'Wait...' : 'Submit'}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
