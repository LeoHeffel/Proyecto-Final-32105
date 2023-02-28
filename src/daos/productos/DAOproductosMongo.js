import Contenedor from "../../containers/containerMongo.js";
import logguer from "../../utils/logger.js";


class DAOproductosMongo extends Contenedor {
    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: false },
            url: { type: String, required: true },
            precio: { type: Number, required: true },
            categoria: { type: String, required: true},
        })
    }
    
    async getByCat(cat) {
        try {
            const encontrado = await this.db.find({categoria: cat })
            if (encontrado.length > 0) {
                return encontrado
            } else {
                return null
            }
        } catch (err) {
            logguer.error(`hubo un error al buscar por categoria : ${err}`)
        }
    }
}

export default DAOproductosMongo