export interface ViewArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}
export interface ViewerArticle {
  title: string;
  author: string | null;
  id: number;
  slug: string;
  content: string;
  createdAt: string;
  imageUrl?: string | null;
}

export interface WikiArticleViewerProps {
  article: ViewerArticle;
  canEdit?: boolean;
  pageviews?: number | null;
}

export interface EditArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export type ServerActionSuccessResult = {
  success: true;
};

export type ServerActionFailResult = {
  success: false;
  error: string;
};

export type ServerActionResult =
  | ServerActionFailResult
  | ServerActionSuccessResult;
