import express, { Express } from 'express';
import pg, { QueryConfig, QueryResult, QueryResultRow } from 'pg';
const { Pool } = pg;
import 'dotenv/config';
import cors from 'cors'

interface User {
    user_id: string,
    username: string,
    email: string,
    pw_hash: string,
}

interface Message {
    message_id: string,
    channel_id: string,
    user_id: string,
    content: string,
    message_time: string,
}

const pool = new Pool();

async function runQuery<T extends QueryResultRow>(query: QueryConfig<any>, values?: any[]): Promise<QueryResult<T>> {
    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();
    return result;
}

async function getUsers(): Promise<User[]> {
    const rows = await runQuery<User>({ text: 'SELECT * FROM users' }).then((r) => r.rows);
    return rows;
}

async function getUserById(id: string): Promise<User | null> {
    const users = await runQuery<User>({ text: 'SELECT * FROM users WHERE user_id = $1::bigint' }, [id]);
    const user = users.rows[0];
    return user ?? null;
}

async function getMessages(channel_id: string): Promise<Message[]> {
    const rows = await runQuery<Message>({ text: 'SELECT * FROM messages WHERE channel_id = $1::bigint' }, [channel_id]).then((r) => r.rows);
    return rows;
}

const app: Express = express();
const port = process.env.PORT;

app.use(cors())

app.get('/', (req, res) => {
    res.send('Express + Typescript Server');
});

app.get('/users/', async (req, res) => {
    res.send(await getUsers());
});

app.get('/messages/', async (req, res) => {
    const messages = await getMessages('1');

    res.send(messages);
});

app.get('/users/:userId', async (req, res) => {
    res.send(await getUserById(req.params.userId));
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`); 
});