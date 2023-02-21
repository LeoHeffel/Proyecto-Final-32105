import Contenedor from "../../containers/containerMongo.js";

class DAOCartFactory extends Contenedor {
    constructor(coleccion, esquema) {
        super(coleccion, esquema)
    }
    updateCarritoById() {
        throw new Error('Metodo no creado')  
    }

    deleteProductoById() {
        throw new Error('Metodo no creado')
    }

    finalizarCompra() {
        throw new Error('Metodo no creado')
    }    
}

export default DAOCartFactory