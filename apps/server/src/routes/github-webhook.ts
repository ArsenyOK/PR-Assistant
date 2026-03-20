import { Request, Response } from "express";

export function githubWebhookHandler(req: Request, res: Response) {
  console.log("Webhook received");

  const event = req.headers["x-github-event"];
  console.log("Event:", event);

  res.status(200).send("ok");
}
