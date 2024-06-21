const logger = require("../logger/Logger");
const proposalRepository = require("../repositories/proposal.repository");

class ProposalController {
  async sendProposalToJob(req, res) {
    try {
      logger.info("Controller: sendProposal");
      const proposal = await proposalRepository.sendProposalToJob(
        req.body,
        req.user.id,
        req.params.id
      );
      res.json(proposal);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProposals(req, res) {
    try {
      logger.info("Controller: getProposals");
      const proposals = await proposalRepository.getProposals(req.user.id);
      res.json(proposals);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getProposal(req, res) {
    try {
      logger.info("Controller: getProposal");
      const proposal = await proposalRepository.getProposal(
        req.params.id,
        req.user.id
      );
      res.json(proposal);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async acceptProposal(req, res) {
    try {
      logger.info("Controller: acceptProposal");
      const proposal = await proposalRepository.acceptProposal(
        req.params.id,
        req.user.id
      );
      res.json(proposal);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async declineProposal(req, res) {
    try {
      logger.info("Controller: declineProposal");
      const proposal = await proposalRepository.declineProposal(
        req.params.id,
        req.user.id
      );
      res.json(proposal);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ProposalController();
