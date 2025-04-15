"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_services_1 = require("./user.services");
const JWT_SECRET = config_1.default.jwt_secret;
const registerUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    try {
        const existingUser = yield user_services_1.UserServices.findUserByEmail(email);
        if (existingUser) {
            res.status(409).send({ message: "User email is already exists! please use another email" });
            return;
        }
        const userRole = role || 'user';
        const user = yield user_services_1.UserServices.createUser(email, password, userRole);
        // Exclude password from response
        const userResponse = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        res.status(200).send({ message: 'User created successfully!', user: userResponse });
    }
    catch (err) {
        res.status(500).send({
            message: "User registration failed!",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_services_1.UserServices.findUserByEmail(email);
        if (!user) {
            res.status(400).send({ message: "Invalid email" });
            return;
        }
        const isValidPassword = yield user_services_1.UserServices.validatePassword(password, user === null || user === void 0 ? void 0 : user.password);
        if (!isValidPassword) {
            res.status(400).send({ message: "Invalid password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: "User loggedIn successfully!", token });
    }
    catch (err) {
    }
});
exports.UserController = {
    registerUsers,
    loginUser
};
