

import DAOordenesFactory from "./DAOordenesFactory.js";



class DAOordenesMongo extends DAOordenesFactory {
    constructor() {
        super('ordenes', {
            email: { type: String, default: "" },
            items: { type: Array, default: [] },
            numero: { type: String, default: "" },
            timestamp: { type: String, required: true, default: new Date() },
            estado: { type: String, default: 'generada' }
        })
    }



}

export default DAOordenesMongo


