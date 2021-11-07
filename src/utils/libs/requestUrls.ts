import { EmojiType } from "types/types";

//알고리즘 관리
export const postController = {
  getPost: (cursor: number | string, status: string) => {
    return `/post/AlgorithemList?count=15&cursor=${cursor}&status=${status}`;
  },
  createPost: () => {
    return `/post/create`;
  },
  deletePost: (id: string) => {
    return `/post/${id}/delete`;
  },
  modifyPost: (id: string) => {
    return `/post/${id}/modify`;
  },
  reportPost: (id: string) => {
    return `/post/${id}/report`;
  },
  setStatusPost: (id: string) => {
    return `/post/${id}/setStatus`;
  },
};

//계정
export const authController = {
  login: () => {
    return `/auth/`;
  },
  googleLogin: () => {
    return `/account/account/login`;
  },
};

//이모지
export const emojiController = {
  getEmoji: (emoji: number) => {
    return `/account/emoji?num=${emoji}`;
  },
  updateEmoji: (emoji: EmojiType) => {
    return `/account/emoji/${emoji}`;
  },
};

//확인
export const verifyController = {
  getQuestion: () => {
    return `/verify/`;
  },
};
