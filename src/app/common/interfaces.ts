export interface Product {
    id_producto?: number,
    nombre: string,
    descripcion: string,
    precio: number,
}

export interface Order {
    id_orden?: number,
    hora: Date,
    id_usuario: number,
    estado: string,
    pago_via: string,
    pago_monto: number,
    observaciones?: string,
}