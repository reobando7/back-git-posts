import express, { Request, Response } from 'express';
import cors from 'cors';
import Pool from 'pg';

const app = express();
app.use(cors())
const pool = new Pool.Pool({
  user: 'fl0user',
  host: 'ep-broken-lake-55245360.us-east-2.aws.neon.fl0.io',
  database: 'blog',
  password: 'lGS9HAxCJUk0',
  port: 5432,
  ssl:true
})

app.get('/v1/posts', (req : Request, res : Response) => {
    pool.query(`SELECT 
                p.*, 
                a.name as name_authors, 
                t.name as topic  
                FROM POSTS p 
                INNER JOIN authors a ON (p.fk_author = a.id) 
                INNER JOIN topics t ON (p.fk_topic = t.id)`, (error:any, results:any) => {
        if (error) {
            res.send({status : 200, data: error})
        }
        res.send({status : 200, data: results.rows})
    })
})

app.listen(3000, () => {console.log("**Server start**")})
