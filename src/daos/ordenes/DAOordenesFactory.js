import Contenedor from "../../containers/containerMongo.js";

class DAOordenesFactory extends Contenedor {
    constructor(coleccion, esquema) {
        super(coleccion, esquema)
    }
   
}

export default DAOordenesFactory