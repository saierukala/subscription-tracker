import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ body: { title: "Get all subscriptions" } })
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ body: { title: "Get subscription details" } })
);

subscriptionRouter.post("/", (req, res) =>
  res.send({ body: { title: "CREATE new subscription" } })
);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ body: { title: "UPDATE subscription" } })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ body: { title: "DELETE subscription" } })
);

subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ body: { title: "Get all user subscriptions" } })
);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ body: { title: "CANCEL subscription" } })
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ body: { title: "Get upcoming renewals" } })
);

export default subscriptionRouter;
