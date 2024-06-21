const express = require("express");
const router = express.Router();
const proposalController = require("../controllers/proposal.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

router.post("/send/:id", authMiddleware, proposalController.sendProposalToJob);
router.get("/all", authMiddleware, proposalController.getProposals);
router.get("/get/:id", authMiddleware, proposalController.getProposal);
router.put("/accept/:id", authMiddleware, proposalController.acceptProposal);
router.put("/decline/:id", authMiddleware, proposalController.declineProposal);

module.exports = router;
