import { Flex, Grid, Icon, Spinner, theme } from '@chakra-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { ReloadContext } from '../../contexts/Reload';
import { Post } from '../../types';
import { customTheme } from '../App';
import { PostCard } from '../PostCard';

interface Props {}

const PostList: React.FC<Props> = () => {
  const [posts, setPosts] = useState<{ [key: string]: Post }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const {
    dispatch,
    state: { reloadNeeded }
  } = useContext(ReloadContext);

  const fetchPosts = useCallback(() => {
    fetch('http://posts.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        dispatch({ type: 'SET_RELOAD_NEEDED', reloadNeeded: false });
        response.json().then(posts => setPosts(posts));
      })
      .catch(error => setError(true))
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(fetchPosts, []);

  useEffect(() => {
    console.log('reloadNeeded effect', reloadNeeded);
    if (!reloadNeeded) return;
    fetchPosts();
  }, [fetchPosts, reloadNeeded]);

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
