"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const rss_1 = __importDefault(require("rss"));
const post_file_1 = require("../utils/post-file");
function generateRSSFeed(posts) {
    const feed = new rss_1.default({
        title: 'Kyeongmo Noh',
        description: '일상에서 깨달은 것을 정리합니다.',
        site_url: 'https://www.brightparagon.me',
        feed_url: 'https://www.brightparagon.me/rss.xml',
        language: 'ko',
    });
    posts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.description ?? '',
            url: `https://www.brightparagon.me/${post.key}`,
            date: post.createdAt,
        });
    });
    return feed.xml({ indent: true });
}
async function generateRSSFile() {
    const posts = await (0, post_file_1.getPostsFromDirectory)();
    const rss = generateRSSFeed(posts.map((post) => {
        return post.data;
    }));
    const rssPath = path_1.default.join(process.cwd(), 'public', 'rss.xml');
    promises_1.default.writeFile(rssPath, rss).then(() => {
        console.log('RSS feed generated at:', rssPath);
    });
}
generateRSSFile().catch((error) => {
    console.error('Failed to generate RSS feed:', error);
    process.exit(1);
});
