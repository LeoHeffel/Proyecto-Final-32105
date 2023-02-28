import config from '../config.js'

const daos = {
    mongo: async () => {
        const { default: DAOcarritoMongo } = await import('./carritos/DAOcarritoMongo.js')
        const { default: DAOproductosMongo } = await import('./productos/DAOproductosMongo.js')
        const { default: DAOusersMongo } = await import('./usuarios/DAOusersMongo.js')
        const { default: DAOmensajesMongo } = await import('./mensajes/DAOmensajesMongo.js')
        const { default: DAOordenesMongo } = await import('./ordenes/DAOordenesMongo.js')
        return {
            DAOcarritos: new DAOcarritoMongo,
            DAOproductos: new DAOproductosMongo,
            DAOusers: new DAOusersMongo,
            DAOmensajes: new DAOmensajesMongo,
            DAOordenes: new DAOordenesMongo
        }
    },
}


export default await daos[config.tipoBD]()