const logger = require("../logger/Logger");
const jobRepository = require("../repositories/job.repository");

class JobController {
  async create(req, res) {
    try {
      logger.info("Controller: create");
      const job = await jobRepository.create(req.body, req.user.id);
      res.status(201).json(job);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      logger.info("Controller: getAll");
      const jobs = await jobRepository.getAll();
      res.status(200).json(jobs);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllByStatusTrue(req, res) {
    try {
      logger.info("Controller: getAllByStatusTrue");
      const jobs = await jobRepository.getAllByStatusTrue();
      res.status(200).json(jobs);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllByStatusFalse(req, res) {
    try {
      logger.info("Controller: getAllByStatusFalse");
      const jobs = await jobRepository.getAllByStatusFalse();
      res.status(200).json(jobs);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllMyJobs(req, res) {
    try {
      logger.info("Controller: getAllMyJobs");
      const jobs = await jobRepository.getAllMyJobs(req.user.id);
      res.status(200).json(jobs);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      logger.info("Controller: getById");
      const job = await jobRepository.getById(req.params.id);
      res.status(200).json(job);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getAllByProfile(req, res) {
    try {
      logger.info("Controller: getAllByProfile");
      const jobs = await jobRepository.getAllByProfile(req.params.profile);
      res.status(200).json(jobs);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      logger.info("Controller: update");
      const job = await jobRepository.update(req.params.id, req.body);
      res.status(200).json(job);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new JobController();
