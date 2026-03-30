import { mockReviews } from "../mock/mock-data";
import { Review } from "../types";

export const getReviews = (): Review[] => {
  return mockReviews;
};

export const getReviewById = (id: string): Review | null => {
  const review = mockReviews.find((item) => item.id === id);
  return review ?? null;
};
