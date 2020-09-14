import { Box } from '@chakra-ui/core';
import React from 'react';
import { Post } from '../../typings';

interface Props {
  post: Post;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const { title } = post;

  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Box mt="1" fontWeight="semibold" as="h3" isTruncated>
            {title}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostCard;
