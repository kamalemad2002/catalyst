// const appError = require("../utility/appError");

// module.exports = (...roling) => {    
//     return (req, res, next) => {
//         if(!roling.includes(req.currentUser.roling)) {
//             return next(appError.create('this is not a role', 401))
//         }
//         next();
//     }
// }