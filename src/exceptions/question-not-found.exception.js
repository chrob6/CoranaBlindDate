class QuestionNotFoundException extends Error {
    constructor(message) {
        super(message || "Question not found");
        this.status = 404
    }
}

module.exports = QuestionNotFoundException;