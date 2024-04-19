const { body } = require("express-validator")

const validationSchema = () => {
    return [
        body('info')
            .notEmpty()
            .withMessage("information is required")
            .isLength({min: 2})
            .withMessage("title at least is 2 digits"),
        body('budget')
            .notEmpty()
            .withMessage("budget is required")    ,
        body('size')
            .notEmpty()
            .withMessage("size is required")
    ]
}

module.exports = {
    validationSchema
}