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

interface Props {}

interface PostCreationValues {
  title: string;
}

export const PostCreate: React.FC<Props> = () => {
  const { dispatch } = useContext(ReloadContext);
  return (
    <Formik<PostCreationValues>
      initialValues={{
        title: ''
      }}
      validationSchema={Yup.object({
        title: Yup.string().min(3).max(50).required()
      })}
      onSubmit={async (values, actions) => {
        await fetch('http://posts.com/posts/create', {
          method: 'POST',
          body: JSON.stringify({ title: values.title }),
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
            Create
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default PostCreate;
