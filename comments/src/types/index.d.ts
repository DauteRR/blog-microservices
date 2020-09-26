export interface CommentRepository {
  [key: string]: Comment[];
}

export interface Comment {
  /** Post ID */
  postID: string;
  /** Comment ID */
  id: string;
  /** Comment content */
  content: string;
  /** Moderation status */
  status: 'pending' | 'moderated' | 'rejected';
}

export interface URLParams {
  /** Post ID */
  id: string;
}
