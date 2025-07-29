import express from "express";
import {
  createDestination,
  getAllDestination,
  getDestinationById,
  updateDestination,
  deleteDestination,
} from "../controller/monitorDestinationController.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const router = express();

router.use(verifyJwt);

router.route("/").get(getAllDestination).post(createDestination);
router
  .route("/:id")
  .get(getDestinationById)
  .put(updateDestination)
  .delete(deleteDestination);

export default router;
