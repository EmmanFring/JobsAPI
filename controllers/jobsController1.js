const { Jobs } = require("../models/model");

// POST
async function addJobs(req, res) {
  const { title, description, company, salary } = req.body;
  // id of user referenced in the jobs table
  // id of the authenticated user
  const { addedBy } = req.user;

  try {
    const response = await Jobs.create({
      title,
      description,
      company,
      salary,
      addedBy,
    });
    res.status(200).json({ response });
  } catch (error) {
    console.error(error);
  }
}

async function getJobsAddedByUser(req, res) {
  // id of person adding the jobs
  const { addedBy } = req.user;
  console.log(addedBy);
  try {
    const jobs = await Jobs.findAll({
      where: { addedBy },
    });
    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
  }
}

async function getJobs(req, res) {
  try {
    const response = await Jobs.findAll();
    return res.status(200).json({ response });
  } catch (error) {
    console.error(error);
  }
}

async function deleteJob(req, res) {
  const { id } = req.params;
  const response = await Jobs.destroy({
    where: { id },
  });
  return res.status(200).json({ response });
}

async function updateJob(req, res) {
  const { title, description, company, salary } = req.body;
  const { id } = req.params;
  try {
    const response = await Jobs.update(
      {
        title: title,
        description: description,
        company: company,
        salary: salary,
      },
      {
        where: { id },
      }
    );
    console.log(id);
    console.log(response);
    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
module.exports = { addJobs, getJobsAddedByUser, deleteJob, updateJob, getJobs };
