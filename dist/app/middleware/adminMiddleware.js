"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    var _a;
    try {
        const userRole = (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.role;
        if (userRole != 'admin') {
            res.status(403).json({
                success: false,
                message: 'You are not authorized to perform this action!'
            });
            return;
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.isAdmin = isAdmin;
