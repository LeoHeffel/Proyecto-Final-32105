import mongoose from "mongoose"

import config from '../config.js'
import logguer from "../utils/logger.js"
import ContainerFactory from "./containerFactory.js"

mongoose.connect(config.mongoDB.uri, config.mongoDB.options)
class Contenedor extends ContainerFactory{
    constructor(coleccion, esquema) {
        super()
        this.db = mongoose.model(coleccion, esquema)

    }
    async save(objeto) {
        try {
            const doc = await this.db.create(objeto)
            return doc.id
        } catch (err) {
            logguer.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getById(numero) {
        try {
            const encontrado = await this.db.findOne({ _id: numero })
            return encontrado

        } catch (err) {
            logguer.error(`hubo un error al buscar por id : ${err}`)
        }
    }

    async updateById(objeto) {
        const resutl = await this.db.replaceOne({ _id: objeto.id }, objeto)
        if (resutl.modifiedCount === 1) {
            return objeto
        }
    }


    async getAll() {
        try {
            const encontrado = await this.db.find({})
            if (encontrado.length > 0) {
                return encontrado
            } else {
                return null
            }
        } catch (err) {
            logguer.error(`hubo un error al buscar todos : ${err}`)
        }
    }
    async deleteById(numero) {
        try {
            const elim = await this.db.deleteOne({ _id: numero })
            if (elim.deletedCount === 1) {
                return { ok: 'eliminado id' + numero }
            }
        } catch (err) {
            logguer.error(`hubo un error al borrar por id : ${err}`)
        }
    }
    async deleteAll() {
        try {
            const elim = await this.db.deleteMany({})
            return { ok: elim.deletedCount + ' eliminados' }

        } catch (err) {
            logguer.error(`hubo un error al borrar todos : ${err}`)
        }
    }
}
export default Contenedor