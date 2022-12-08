import express from "express";
import {
  getMovies,
  getMovie,
  updateMovieById,
  deleteMovieById,
  addNewMovie,
} from "../controllers/movieController.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/", addNewMovie);

router.get("/", getMovies);

router.get("/:id", getMovie);

router.put("/:id", updateMovieById);

router.delete("/:id", deleteMovieById);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      res.sendStatus(403);
      res.end();
    } else {
      req.user = user;
      next();
    }
  });
}

export default router;
