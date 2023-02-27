import cluster from "cluster"

import logger from "./src/utils/logger.js"
import httpServer from './src/server.js'
import config from './src/config.js'

let modo = config.modo
const PORT = process.env.PORT || config.port


if (modo === 'cluster') {
    if (cluster.isPrimary) {
        for (let i = 0; i < 3; i++) {// si le pongo cpus.lenght me crashea mongo atlas
            cluster.fork()
        }
        logger.info(`primary pid ${process.pid}`)
        cluster.on('exit', (worker, code, signal) => {
            logger.warn(`Worker with id ${worker.process.pid} Killed`)
            cluster.fork()
        })
    } else {

        httpServer.listen(PORT, () => { logger.info(`worker con pid ${process.pid} escuchando en el puerto ${httpServer.address().port}`) })
        httpServer.on('error', error => logger.error(`Error en worker ${error}`))
    }
} else {

    httpServer.listen(PORT, () => { logger.info(`servidor con pid ${process.pid} escuchando en el puerto ${httpServer.address().port}`) })
    httpServer.on('error', error => logger.error(`Error en servidor ${error}`))
}



