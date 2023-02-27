import { encrypt } from "../utils/bcrypt.js"



export  class saveUserDTO {
    constructor({ username, password, email, address, age, phone, photo }) {
        this.username = username
        this.password = encrypt(password)
        this.email = email
        this.address = address
        this.age = age
        this.phone = phone
        this.photo = photo || null
    }
}


export  class sendUserDTO {
    constructor({ username, photo, admin,email }, activeCart) {
        this.usuario = username
        this.admin = admin
        this.email = email
        this.foto = photo || "/avatar.jpg"
        this.cart = activeCart?._id || null
    }
}