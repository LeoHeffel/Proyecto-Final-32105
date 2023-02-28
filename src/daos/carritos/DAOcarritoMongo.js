
import logguer from "../../utils/logger.js";

import DAOCartFactory from "./DAOCartFactory.js";


class DAOcarritosMongo extends DAOCartFactory {
    constructor() {
        super('carritos', {
            email: { type: String, default: "" },
            productos: { type: Object, default: {} },
            direccion:{ type: String, default: "" },
            fechaYhora: { type: String, required: true, default: new Date() },
            finished: { type: Boolean, default: false }
        })
    }


    async findByUser(user) {
        try {
            const carritosUsuario = await this.db.find({ email: user })
            if(carritosUsuario.length) return carritosUsuario
            return null
            }
        catch (err) {
            logguer.error(`error en find carrrito by user ${err} `)
        }
    }



    async updateCarritoById(idCarrito, producto) {
        try {
            const cP = await super.getById(idCarrito)
            if (cP.productos.hasOwnProperty(producto._id)) {
                let cant = cP.productos[producto._id] + 1
                cP.productos[producto._id] = cant
            } else {
                cP.productos[producto._id] = 1
            }
            const resutl = await this.db.updateOne({ _id: idCarrito }, { productos: cP.productos })
            if (resutl.modifiedCount === 1) {
                logguer.info('carrito updated')
                return cP.productos
            }
        } catch (err) {
            logguer.error(`error en updateCarrito by id ${err} `)
        }
    }

    async deleteProductoById(idCarrito, id_prod) {
        try {
            const cP = await super.getById(idCarrito)
            if (cP.productos.hasOwnProperty(id_prod)) {
                if (cP.productos[id_prod] < 2) delete cP.productos[id_prod]
                else {
                    cP.productos[id_prod]--
                }
            } else {
                logguer.warn(`error al borrar producto : ${id_prod} del carrito: ${idCarrito}  `)
            }
            const resutl = await this.db.updateOne({ _id: idCarrito }, { productos: cP.productos })
            if (resutl.modifiedCount === 1) {
                logguer.info(`producto ${id_prod} del carrito ${idCarrito} deleted `)
                return cP.productos
            } else {
                logguer.warn(`error al borrar producto : ${id_prod} del carrito: ${idCarrito}  `)
                return { error: "Carrito no encontrado" }
            }
        } catch (err) {
            logguer.error(`hubo un error al borrar producto por id : ${err}`)
        }
    }

    async finalizarCompra(idCarrito, user) { 
        try {
            const carritoPrevio = await super.getById(idCarrito)
            let prods = carritoPrevio.productos
            const resutl = await this.db.updateOne({ _id: idCarrito }, { finished: true })
            if (resutl.modifiedCount === 1) {
        logguer.info(`compra del carrito ${idCarrito} finalizada `)
                return prods
            } else {
                logguer.warn(`error finalizar compra  del carrito: ${idCarrito}  `)
                return { error: "Carrito no encontrado" }
            }
        } catch (err) {
            logguer.error(`hubo un error al finalizr compra: ${err}`)
        }
    }
}

export default DAOcarritosMongo


