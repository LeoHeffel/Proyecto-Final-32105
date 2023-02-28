import Contenedor from "../../containers/containerMongo.js";

class DAOordenesMongo extends Contenedor {
    constructor() {
        super('ordenes', {
            email: { type: String, required: true },
            items: { type: Array, default: [],required: true },
            numero: { type: String, required: true },
            timestamp: { type: String, required: true },
            estado: { type: String, default: 'generada' }
        })
    }



}

export default DAOordenesMongo


