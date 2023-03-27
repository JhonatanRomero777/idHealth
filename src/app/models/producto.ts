export interface Producto {

    _id: string,
    nombre: string
    precio: number,

    categoria: {
        _id: string,
        nombre: string
    },

    usuario: {
        _id: string,
        nombre: string
    }
}