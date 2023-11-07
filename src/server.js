import express from "express"
import { Server as HTTPServer } from "http"
import session from "express-session"
import cookieParser from "cookie-parser"

import routerUser from "./routers/routeUser.js"
import routerProductos from './routers/routeProductos.js'
import routerCarrito from './routers/routeCarrito.js'
import sessionOptions from "./utils/session.js"
import passport from "./utils/passport.js"
import logger from "./utils/logger.js"
import ioServer from './utils/io.js'



const app = express()
const httpServer = new HTTPServer(app)


app.use((req, res, next) => {
    logger.info(`Request ${req.method} at ${req.url}`)
    next()
})

app.use(express.static('./src/views'))
app.use(express.static('public/perfiles'))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routerUser)
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)


app.all('*', (req, res) => {
    logger.warn(`Request ${req.method} at ${req.url} not found`)
    res.status(404).send({ error: 'Ruta no implementada' })
    
})
ioServer(httpServer)
export default httpServer