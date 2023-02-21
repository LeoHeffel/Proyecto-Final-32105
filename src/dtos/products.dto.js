export  class saveProductDTO {
    constructor({ nombre, descripcion, codigo, url, precio, stock,categoria}){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.url = url,
        this.precio= parseFloat(precio),
        this.stock = parseInt(stock),
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