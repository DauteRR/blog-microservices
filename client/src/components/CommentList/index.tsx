import { Box, List, ListItem, Tag, TagIcon } from '@chakra-ui/core';
import React from 'react';
import { Comment } from '../../typings';
import { customTheme } from '../App';

type CommentTagByStatusType = { [key in Comment['status']]: JSX.Element };

const CommentTagByStatus: CommentTagByStatusType = {
  approved: (
    <Tag ml="8px" variantColor="green">
      <TagIcon icon="check" size="12px" />
    </Tag>
  ),
  pending: (
    <Tag ml="8px" variantColor="yellow">
      <TagIcon icon="settings" size="12px" />
    </Tag>
  ),
  rejected: (
    <Tag ml="8px" variantColor="red">
      <TagIcon icon="close" size="12px" />
    </Tag>
  )
};

interface CommentTagProps {
  status: Comment['status'];
}

export const CommentTag: React.FC<CommentTagProps> = ({ status }) => {
  return CommentTagByStatus[status];
};

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
            <CommentTag status={comment.status} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentList;
