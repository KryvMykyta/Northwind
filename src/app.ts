import { PgRepository } from './repository/pgRepository';
import express from 'express'
import { itemRouter } from './routers/items';
import { searchRouter } from './routers/search'
import { pagesRouter } from './routers/pages';


const app = express()

const PORT = 3000

app.use(express.json())

app.use('/pages', pagesRouter)
app.use('/item', itemRouter)
app.use('/search', searchRouter)

app.listen(PORT, () => {
    console.log("started")
})