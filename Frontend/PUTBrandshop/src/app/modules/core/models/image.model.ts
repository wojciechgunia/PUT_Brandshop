export interface PostImageResponse {
  createAt: string;
  uid: string;
}

export interface PostImagesResponse {
  fileDTOS: PostImageResponse[];
}

export interface Image {
  url: string;
}

export interface DeleteImageResponse {
  timestamp: string;
  message: string;
}
