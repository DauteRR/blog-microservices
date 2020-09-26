export interface Post {
  /** Identifier */
  id: string;
  /** Title of the post */
  title: string;
}

export interface PostsRepository {
  [key: string]: Post;
}
