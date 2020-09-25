import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/core';
import { Field, FieldProps, Formik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { ReloadContext } from '../../contexts/Reload';

interface CommentCreationValues {
  content: string;
}

interface Props {
  postID: string;
}

export const CommentCreate: React.FC<Props> = ({ postID }) => {
  const { dispatch } = useContext(ReloadContext);

  return (
    <Formik<CommentCreationValues>
      initialValues={{
        content: ''
      }}
      validationSchema={Yup.object({
        content: Yup.string().required()
      })}
      onSubmit={async (values, actions) => {
        await fetch(`http://posts.com/posts/${postID}/comments`, {
          method: 'POST',
          body: JSON.stringify({ content: values.content }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        dispatch({ type: 'SET_RELOAD_NEEDED', reloadNeeded: true });
        actions.setSubmitting(false);
        actions.resetForm();
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
            Send
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default CommentCreate;
