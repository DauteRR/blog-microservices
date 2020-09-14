import { Box, List, ListItem } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Comment } from '../../typings';
import { customTheme } from '../App';

interface Props {
  postID: string;
}

export const CommentList: React.FC<Props> = ({ postID }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4001/posts/${postID}/comments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(comments => setComments(comments));
    });
  }, []);

  return (
    <Box ml={customTheme.space[4]} mb={customTheme.space[6]}>
      <List styleType="disc">
        {comments.map(comment => (
          <ListItem key={comment.id}>{comment.content}</ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
