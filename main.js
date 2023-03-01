import logger from "./src/utils/logger.js"
import httpServer from './src/server.js'
import config from './src/config.js'


const PORT = process.env.PORT || config.port

httpServer.listen(PORT, () => { logger.info(`servidor con pid ${process.pid} escuchando en el puerto ${httpServer.address().port}`) })
httpServer.on('error', error => logger.error(`Error en servidor ${error}`))




