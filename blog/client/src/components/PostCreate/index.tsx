import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/core';
import { Field, FieldProps, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface Props {}

interface PostCreationValues {
  title: string;
}

export const PostCreate: React.FC<Props> = () => {
  return (
    <Formik<PostCreationValues>
      initialValues={{
        title: ''
      }}
      validationSchema={Yup.object({
        title: Yup.string().min(3).max(50)
      })}
      onSubmit={async (values, actions) => {
        const response = await fetch('http://localhost:4000/posts', {
          method: 'POST',
          body: JSON.stringify({ title: values.title })
        });
        console.log(response);
        actions.setSubmitting(false);
        actions.setValues({ title: '' });
      }}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="title">
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={
                  form.errors.title !== undefined && form.touched.title === true
                }>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input {...field} id="title" />
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            variantColor="teal"
            isLoading={props.isSubmitting}
            type="submit">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default PostCreate;
