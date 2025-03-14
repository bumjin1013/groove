export interface Short {
  id: string;
  title: string;
  description: string;
  duration: number;
  width: number;
  height: number;
  author: Author;
  url: string;
  thumbnailURL: string;
  subtitles: SubTitle[];
  tags: string[];
  likes: number;
  views: number;
  shares: number;
  publishedAt: Date;
  comments: Comment[];
}

export interface Author {
  id: string;
  name: string;
  avatarURL: string;
}

export interface SubTitle {
  languageCode: string;
  origin?: boolean;
  type: string;
  url: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
}
