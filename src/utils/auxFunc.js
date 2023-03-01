import daos from '../daos/DAOFactory.js'
import correo from './nodemailer.js'

const dbCarrito = daos.DAOcarritos
const dbProductos = daos.DAOproductos
const dbOrdenes = daos.DAOordenes



export const checkCart = async (email) => {
    const carritos = await dbCarrito.findByUser(email)
    if (carritos) {
        for (let i = 0; i < carritos.length; i++) {
            if (carritos[i]?.finished === false) {
                return carritos[i]._id
            }
        }
    } else {
        return null
    }
}
export const getProds = async (prods) => {
    const prodIds = Object.keys(prods)
    if (prodIds.length > 0) {
        const productos = await Promise.all(
            prodIds.map(async (id) => {
                let producto = await dbProductos.getById(id)
                return { producto, cant: prods[id] }
            })
        )
        return productos
    } else {
        return []
    }
}

export const finalizar = async (prodIds, user, idCarrito) => {

    const items = await getProds(prodIds)

    const orden = await dbOrdenes.save({ items, numero: idCarrito, email: user.email, estado: 'generada', timestamp: new Date() })

    correo('pedido', { productos: items, usuario: user, numero: orden })

}