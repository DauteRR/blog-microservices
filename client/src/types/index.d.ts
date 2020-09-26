export interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  postID: string;
  status: 'pending' | 'rejected' | 'approved';
}
