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

interface CommentCreationValues {
  content: string;
}

interface Props {
  postID: string;
}

export const CommentCreate: React.FC<Props> = ({ postID }) => {
  return (
    <Formik<CommentCreationValues>
      initialValues={{
        content: ''
      }}
      validationSchema={Yup.object({
        content: Yup.string().required()
      })}
      onSubmit={async (values, actions) => {
        await fetch(`http://localhost:4001/posts/${postID}/comments`, {
          method: 'POST',
          body: JSON.stringify({ content: values.content }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        actions.setSubmitting(false);
        actions.setValues({ content: '' });
      }}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <Field name="content">
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={
                  form.errors.content !== undefined &&
                  form.touched.content === true
                }>
                <FormLabel htmlFor="content">New comment</FormLabel>
                <Input {...field} id="content" />
                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
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

export default CommentCreate;
