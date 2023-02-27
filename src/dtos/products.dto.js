export  class saveProductDTO {
    constructor({ nombre, descripcion,  url, precio, categoria}){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.url = url,
        this.precio= parseFloat(precio),
        this.categoria = categoria;
    }
}

export  class sendProductDTO {
    constructor({ nombre, descripcion,  url, precio,id}){
        this.precio=precio
        this.nombre=nombre
        this.descripcion = descripcion
        this.url = url
        this.id = id
    }
}