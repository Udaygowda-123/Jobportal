const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // ✅ must be exactly like this (no curly braces)
const Job = require("../models/Job");

// ✅ Create job
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, lastDate, companyName } = req.body;
    const job = new Job({
      title,
      description,
      lastDate,
      companyName,
      createdBy: req.user.id,
    });
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all jobs
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update job
router.put("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    if (job.createdBy.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete job
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    if (job.createdBy.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await job.deleteOne();
    res.json({ msg: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
