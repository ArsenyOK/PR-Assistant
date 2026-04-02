import { Review } from "../types";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const INSTALLATION_ID = 120397789;

export async function getReviews(): Promise<Review[]> {
  console.info(VITE_API_BASE_URL, "API_BASE_URL");
  const response = await fetch(
    `${VITE_API_BASE_URL}/api/reviews?installationId=${INSTALLATION_ID}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return response.json();
}

export async function getReviewById(id: string): Promise<Review | null> {
  const response = await fetch(
    `${VITE_API_BASE_URL}/api/reviews/${id}?installationId=${INSTALLATION_ID}`,
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch review");
  }

  return response.json();
}
