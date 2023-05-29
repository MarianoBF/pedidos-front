export interface Product {
    id_producto?: number,
    nombre: string,
    descripcion: string,
    precio: number,
    imagen: string,
    quantity?: number,
    borrado?: number,
}