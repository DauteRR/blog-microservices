import { Box, Heading, theme } from '@chakra-ui/core';
import React from 'react';
import { Post } from '../../typings';
import { CommentCreate } from '../CommentCreate';
import { CommentList } from '../CommentList';

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const { title, id, comments } = post;

  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" p="6">
      <Box d="flex" flexDir="column" justifyContent="baseline">
        <Heading fontWeight="semibold" isTruncated as="h3" mb={theme.space[2]}>
          {title}
        </Heading>
        <CommentList comments={comments} />
        <CommentCreate postID={id} />
      </Box>
    </Box>
  );
};

export default PostCard;
