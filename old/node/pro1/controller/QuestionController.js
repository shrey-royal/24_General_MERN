const questionModel = require("../model/QuestionModel");

// Create a new question
const createQuestion = async (req, res) => {
    try {
        const { question, option1, option2, option3, option4, answer } = req.body;

        if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newQuestion = await questionModel.create({ question, option1, option2, option3, option4, answer });

        res.status(201).json({
            message: "Question created successfully",
            data: newQuestion
        });
    } catch (error) {
        console.error("Create Question Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionModel.find();

        res.status(200).json({
            message: "Questions list",
            data: questions
        });
    } catch (error) {
        console.error("Get All Questions Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get question by ID
const getQuestionById = async (req, res) => {
    try {
        const question = await questionModel.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "No question found" });
        }

        res.status(200).json({
            message: "Question fetched!",
            data: question
        });
    } catch (error) {
        console.error("Get Question by ID Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update question by ID
const updateQuestionById = async (req, res) => {
    try {
        const id = req.params.id;
        const questionData = req.body;

        const updatedQuestion = await questionModel.findByIdAndUpdate(id, questionData, { new: true });

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found!" });
        }

        res.status(200).json({
            message: "Question updated!",
            data: updatedQuestion
        });
    } catch (error) {
        console.error("Update Question Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete question by ID
const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedQuestion = await questionModel.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found!" });
        }

        res.status(200).json({
            message: "Question deleted!",
            data: deletedQuestion
        });
    } catch (error) {
        console.error("Delete Question Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestionById,
    deleteQuestion
};
