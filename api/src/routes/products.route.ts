import { Router } from "express";
import { Products } from "../models/products.model";
import { verifyJwt } from "../middlewares/jwt.middleware";

const router = Router();

router
  .route("/")
  .post(verifyJwt, (req, res) => {
    const { title, description } = req.body;
    const price = +(req.body.price || "0");
    if (!title || !price || !description) throw new Error("invalid body");
    Products.create(title, price, description);
    res.sendStatus(201);
  })
  .get((req, res) => res.status(200).json(Products.find()));

router
  .route("/:id")
  .get((req, res) => {
    const product = Products.findById(+req.params.id);
    if (!product) throw new Error("product not found");
    res.status(200).json(product);
  })
  .patch(verifyJwt, (req, res) => {
    Products.udpated({ id: +req.params.id, ...req.body });
    res.status(200).json();
  })
  .delete(verifyJwt, (req, res) => {
    Products.delete(+req.params.id);
    res.sendStatus(204);
  });

export const productRoutes = router;
