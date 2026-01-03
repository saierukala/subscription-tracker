import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ body: { title: "Get all subscriptions" } })
);

// subscriptionRouter.post("/", authorize, (req, res) =>
//   res.send({ body: { title: "CREATE new subscription" } })
// );

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ body: { title: "UPDATE subscription" } })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ body: { title: "DELETE subscription" } })
);

// subscriptionRouter.get("/user/:id", (req, res) =>
//   res.send({ body: { title: "Get all user subscriptions" } })
// );

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ body: { title: "Get subscription details" } })
);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ body: { title: "CANCEL subscription" } })
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ body: { title: "Get upcoming renewals" } })
);

export default subscriptionRouter;
