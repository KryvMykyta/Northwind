import { Pool } from "pg";
import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'
import { ItemRouter } from './routers/ItemRouter';
import { SearchRouter } from './routers/SearchRouter';
import { PagesRouter } from './routers/PagesRouter';


const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

const poolConnection = new Pool({
    connectionString: process.env.CONN_STRING as string,
  });

const itemRouter = new ItemRouter('/item', poolConnection)
const searchRouter = new SearchRouter('/search', poolConnection)
const pagesRouter = new PagesRouter('/pages', poolConnection)

const routers = [itemRouter, searchRouter, pagesRouter]
routers.forEach((router) => {
    app.use(router.path, router.router)
})

app.listen(PORT, () => {
    console.log("started")
})