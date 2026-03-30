import { Router } from "express";
import { getReviewById, getReviews } from "../services/reviews.service";

export const reviewsRouter = Router();

reviewsRouter.get("/", (_req, res) => {
  const reviews = getReviews();
  res.json(reviews);
});

reviewsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const review = getReviewById(id);

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  return res.json(review);
});
