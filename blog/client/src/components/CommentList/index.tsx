import { Box, List, ListItem } from '@chakra-ui/core';
import React from 'react';
import { Comment } from '../../typings';
import { customTheme } from '../App';

interface Props {
  comments: Comment[];
}

export const CommentList: React.FC<Props> = ({ comments }) => {
  return (
    <Box ml={customTheme.space[4]} mb={customTheme.space[6]}>
      <List styleType="disc">
        {comments.map(comment => (
          <ListItem
            fontStyle={comment.status === 'approved' ? '' : 'italic'}
            key={comment.id}>
            {comment.content}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
