const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const jobsRouter = express.Router();
const {
  addJobs,
  getJobsAddedByUser,
  updateJob,
  deleteJob,
  getJobs,
} = require("../controllers/jobsController1");
jobsRouter.get("/jobs", getJobs);
jobsRouter.get("/jobs/:id", getJobs);
jobsRouter.post("/jobs", auth, addJobs);
jobsRouter.get("/user/jobs", auth, getJobsAddedByUser);
// id is the job id from the models
jobsRouter.put("/jobs/:id", auth, updateJob);
jobsRouter.delete("/jobs/:id", auth, deleteJob);
module.exports = { jobsRouter };
