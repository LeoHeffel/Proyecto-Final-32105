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
    mem: async () => {
        const { default: DAOcarritosMem } = await import('./carritos/DAOcarritosMem.js.js')
        const { default: DAOproductosMem } = await import('./productos/DAOproductosMem.js.js')
        return {
            DAOcarritos: new DAOcarritosMem,
            DAOproductos: new DAOproductosMem
        }
    },
    firebase: async () => {
        const { default: DAOcarritosFirebase } = await import('./carritos/DAOcarritosFirebase.js.js')
        const { default: DAOproductosFirebase } = await import('./productos/DAOproductosFirebase.js.js')
        return {
            DAOcarritos: new DAOcarritosFirebase,
            DAOproductos: new DAOproductosFirebase
        }
    },
    fs: async () => {
        const { default: DAOcarritosFs } = await import('./carritos/DAOcarritosFs.js.js')
        const { default: DAOproductosFs } = await import('./productos/DAOproductosFs.js.js')
        return {
            DAOcarritos: new DAOcarritosFs,
            DAOproductos: new DAOproductosFs
        }
    }

}


export default await daos[config.tipoBD]()