import {
  getMoviesService,
  getMovieService,
  updateMovieByIdService,
  deleteMovieByIdService,
  addNewMovieService,
} from "../services/movieService.js";
import dotenv from "dotenv";

dotenv.config();

export const getMovies = async (req, res) => {
  console.log("getMovies: ");

  try {
    res
      .status(200)
      .json(
        await getMoviesService(
          parseInt(req.query.page) || 1,
          parseInt(req.query.perPage) || 10,
          req.query.title || ""
        )
      );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMovie = async (req, res) => {
  try {
    res.status(200).json(await getMovieService(req.params.id));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateMovieById = async (req, res) => {
  try {
    await updateMovieByIdService(req.params.id, req.body);
    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    console.log("Error :( ", error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteMovieById = async (req, res) => {
  try {
    const deletedCount = await deleteMovieByIdService(req.params.id);
    console.log("deletedCount ", deletedCount);
    if (deletedCount == 0) {
      res.status(404).json({ message: "ID does not exists" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addNewMovie = async (req, res) => {
  try {
    res.status(201).json(await addNewMovieService(req.body));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
