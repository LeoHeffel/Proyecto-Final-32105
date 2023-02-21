
import logguer from "../../utils/logger.js";
import correo from '../../utils/nodemailer.js'
import { sms, whatsapp } from '../../utils/twilio.js'
import DAOCartFactory from "./DAOCartFactory.js";



class DAOcarritosMongo extends DAOCartFactory {
    constructor() {
        super('carritos', {
            user: { type: String, default: "" },//agregar id usuario
            productos: { type: Object, default: {} },
            timestamp: { type: String, required: true, default: new Date() },
            finished: { type: Boolean, default: false }
        })
    }

    async updateCarritoById(idCarrito, producto) {
        try {
            const carritoPrevio = await super.getById(idCarrito)
            let prod = carritoPrevio.productos
            if (prod.hasOwnProperty(producto._id)) {
                let cant = prod[producto._id].cant + 1
                let nuevo = { producto, cant }
                prod[producto._id] = nuevo
            } else {
                let nuevo = { producto, cant: 1 }
                prod[producto._id] = nuevo
            }
            const resutl = await this.db.updateOne({ _id: idCarrito }, { productos: prod })
            if (resutl.modifiedCount === 1) {
                logguer.info('carrito updated')
                return carritoPrevio
            }
        } catch (err) {
            logguer.error(`error en updateCarrito by id ${err} `)
        }
    }

    async deleteProductoById(idCarrito, id_prod) {//
        try {
            const carritoPrevio = await super.getById(idCarrito)
            let prod = carritoPrevio.productos
            if (prod.hasOwnProperty(id_prod)) {
                if (prod[id_prod].cant < 2) delete prod[id_prod]
                else {
                    prod[id_prod].cant--
                }
            } else {
                logguer.warn(`error al borrar producto : ${id_prod} del carrito: ${idCarrito}  `)
            }
            const resutl = await this.db.updateOne({ _id: idCarrito }, { productos: prod })
            if (resutl.modifiedCount === 1) {
                logguer.info(`producto ${id_prod} del carrito ${idCarrito} deleted `)
                return carritoPrevio
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
            let prod = carritoPrevio.productos
            const resutl = await this.db.updateOne({ _id: idCarrito }, { finished: true })
            if (resutl.modifiedCount === 1) {
                correo('pedido', { productos: prod, usuario: user })
                sms({ id: idCarrito, usuario: user })
                whatsapp({ productos: prod, usuario: user })
                logguer.info(`compra del carrito ${idCarrito} finalizada `)
                return carritoPrevio
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


