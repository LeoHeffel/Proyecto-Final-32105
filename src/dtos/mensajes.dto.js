
export  class saveMensajeDTO {
    constructor({ email, text,sistema }) {
        this.email = email
        this.mensaje=text
        this.tipo=sistema ? "admin": "usuario",
        this.fyh= new Date()
    }
}


export  class sendMensajeDTO {
    constructor({ email, mensaje,tipo,fyh }) {
        this.email = email
        this.text=mensaje
        this.sistema =tipo== "admin"?true:false,
        this.fyh=fyh
    }
}