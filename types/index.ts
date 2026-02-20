export default interface Post {
  id: string;
  title: string;
  description?: string | null;
  type?: string | null;
  isPublic: boolean;
  author: {
    id: string;
    name?: string | null;
    image?: string | null;
  };
  views: number;
  likes: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}