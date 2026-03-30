import { Router } from "express";
import { getReviewById, getReviews } from "../services/reviews.service";

export const reviewsRouter = Router();

reviewsRouter.get("/", async (_req, res) => {
  try {
    const reviews = await getReviews();
    return res.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
});

reviewsRouter.get("/:id", async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    return res.json(review);
  } catch (error) {
    console.error("Failed to fetch review", error);
    return res.status(500).json({ message: "Failed to fetch review" });
  }
});
