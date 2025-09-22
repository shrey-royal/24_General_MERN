const examModel = require("../model/ExamModel");

// Create a new exam
const createExam = async (req, res) => {
    try {
        const { name, duration, totalMarks, perQuestionMarks, questions } = req.body;

        if (!name || !duration || !totalMarks || !perQuestionMarks) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newExam = await examModel.create({ name, duration, totalMarks, perQuestionMarks, questions });

        res.status(201).json({
            message: "Exam created successfully",
            data: newExam
        });
    } catch (error) {
        console.error("Create Exam Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all exams
const getAllExams = async (req, res) => {
    try {
        const exams = await examModel.find().populate('questions');

        res.status(200).json({
            message: "Exams list",
            data: exams
        });
    } catch (error) {
        console.error("Get All Exams Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get exam by ID
const getExamById = async (req, res) => {
    try {
        const exam = await examModel.findById(req.params.id).populate('questions');

        if (!exam) {
            return res.status(404).json({ message: "No exam found" });
        }

        res.status(200).json({
            message: "Exam fetched!",
            data: exam
        });
    } catch (error) {
        console.error("Get Exam by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update exam by ID
const updateExamById = async (req, res) => {
    try {
        const id = req.params.id;
        const examData = req.body;

        const updatedExam = await examModel.findByIdAndUpdate(id, examData, { new: true }).populate('questions');

        if (!updatedExam) {
            return res.status(404).json({ message: "Exam not found!" });
        }

        res.status(200).json({
            message: "Exam updated!",
            data: updatedExam
        });
    } catch (error) {
        console.error("Update Exam Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete exam by ID
const deleteExam = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedExam = await examModel.findByIdAndDelete(id);

        if (!deletedExam) {
            return res.status(404).json({ message: "Exam not found!" });
        }

        res.status(200).json({
            message: "Exam deleted!",
            data: deletedExam
        });
    } catch (error) {
        console.error("Delete Exam Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createExam,
    getAllExams,
    getExamById,
    updateExamById,
    deleteExam
};
