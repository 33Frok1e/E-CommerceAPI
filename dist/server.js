"use strict";
// import mongoose from 'mongoose';
// import app from './app';
// import config from './app/config';
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
exports.connectDB = connectDB;
// async function main() {
//     await mongoose.connect(config.db_url as string);
//     app.listen(config.port, () => {
//         console.log(`Server is running on ${config.port}`);
//     })
// }
// main().then(() => console.log('MongoDB is connected')).catch((e) => console.log(`Error is ${e}`));
// src/server.ts
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let isConnected = false;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isConnected)
            return;
        try {
            yield mongoose_1.default.connect(config_1.default.db_url);
            isConnected = true;
            console.log('MongoDB connected');
        }
        catch (err) {
            console.error('DB Connection Error:', err);
            throw err;
        }
    });
}
exports.default = app_1.default;
