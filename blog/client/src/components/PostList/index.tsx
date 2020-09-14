import { Flex, Grid, Icon, Spinner, theme } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Post } from '../../typings';
import { customTheme } from '../App';
import { PostCard } from '../PostCard';

interface Props {}

const PostList: React.FC<Props> = () => {
  const [posts, setPosts] = useState<{ [key: string]: Post }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:4000/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        response.json().then(posts => setPosts(posts));
      })
      .catch(error => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    );
  } else if (error) {
    content = <Icon name="warning" size="32px" color="red.500" />;
  } else {
    content = (
      <Grid
        width="100%"
        templateColumns="repeat(2, 1fr)"
        gap={customTheme.space[2]}>
        {Object.values(posts).map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Grid>
    );
  }

  return (
    <Flex marginTop={theme.space[10]} justify="center">
      {content}
    </Flex>
  );
};

export default PostList;
