import { Review } from "../types";

const API_BASE_URL = "http://localhost:3001";

export async function getReviews(): Promise<Review[]> {
  const response = await fetch(`${API_BASE_URL}/api/reviews`);

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
}

export async function getReviewById(id: string): Promise<Review | null> {
  const response = await fetch(`${API_BASE_URL}/api/reviews/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }

  return response.json();
}
