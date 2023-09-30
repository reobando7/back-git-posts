"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = __importDefault(require("pg"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const pool = new pg_1.default.Pool({
    user: 'fl0user',
    host: 'ep-broken-lake-55245360.us-east-2.aws.neon.fl0.io',
    database: 'blog',
    password: 'lGS9HAxCJUk0',
    port: 5432,
    ssl: true
});
app.get('/v1/posts', (req, res) => {
    pool.query(`SELECT 
                p.*, 
                a.name as name_authors, 
                t.name as topic  
                FROM POSTS p 
                INNER JOIN authors a ON (p.fk_author = a.id) 
                INNER JOIN topics t ON (p.fk_topic = t.id)`, (error, results) => {
        if (error) {
            res.send({ status: 200, data: error });
        }
        res.send({ status: 200, data: results.rows });
    });
});
app.listen(3000, () => { console.log("**Server start**"); });
