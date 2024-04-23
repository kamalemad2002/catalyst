const { body } = require("express-validator")

const validationSchema = () => {
    return [
        body('info')
            .notEmpty()
            .withMessage("information is required"),
        body('budget')
            .notEmpty()
            .withMessage("budget is required")    ,
        body('size')
            .notEmpty()
            .withMessage("size is required"),
            // body('user')
            // .notEmpty()
            // .withMessage("user is required")
    ]
}
module.exports = {
    validationSchema
}