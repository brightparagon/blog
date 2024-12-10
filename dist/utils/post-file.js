"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsFromDirectory = exports.isPublishReadyPost = void 0;
const fs_1 = require("fs");
const gray_matter_1 = __importDefault(require("gray-matter"));
const path_1 = __importDefault(require("path"));
function isPublishReadyPost(filename) {
    return !filename.startsWith('pending');
}
exports.isPublishReadyPost = isPublishReadyPost;
const getPostsFromDirectory = async () => {
    const postsDirectory = path_1.default.join(process.cwd(), 'posts');
    const fileNames = await fs_1.promises.readdir(postsDirectory);
    const posts = fileNames.filter(isPublishReadyPost).map(async (filename) => {
        const postPath = path_1.default.join(postsDirectory, filename);
        const post = await fs_1.promises.readFile(postPath, 'utf8');
        const matteredPost = (0, gray_matter_1.default)(post);
        return {
            content: matteredPost.content,
            data: matteredPost.data,
        };
    });
    return (await Promise.all(posts));
};
exports.getPostsFromDirectory = getPostsFromDirectory;
