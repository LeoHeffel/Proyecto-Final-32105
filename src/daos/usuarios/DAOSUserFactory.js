
import Contenedor from "../../containers/containerMongo.js";

class DAOUserFactory extends Contenedor {
    constructor(coleccion, esquema) {
        super(coleccion, esquema)

    }

    register =  () => {
        throw new Error('Metodo no creado')
    }

    login = () => {
        throw new Error('Metodo no creado')
 
    }

    find =  ( ) => {
        throw new Error('Metodo no creado')
        
    }

    addCart =  () => {
        throw new Error('Metodo no creado')
    }
}




export default DAOUserFactory 