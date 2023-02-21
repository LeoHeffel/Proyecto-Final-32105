import daos from '../daos/DAOFactory.js'
const dbCarrito = daos.DAOcarritos

 const checkCart= async(cartsIds) =>{
    if (cartsIds.length > 0) {
        const carritos = await Promise.all(
            cartsIds.map(async (id) => {
                return await dbCarrito.getById(id)
            })
        )
        for (let i = 0; i < carritos.length; i++) {
            if (carritos[i]?.finished === false) {
                return carritos[i]
            }
        }
    }else{
       return null 
    }
    
}
export default checkCart