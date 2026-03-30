import { Review } from "../types";
import { mockReviews } from "../utils/mock-data";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getReviews(): Promise<Review[]> {
  await wait(500);
  return mockReviews;
}

export async function getReviewById(id: string): Promise<Review | null> {
  await wait(400);

  const review = mockReviews.find((item) => item.id === id);
  return review ?? null;
}
