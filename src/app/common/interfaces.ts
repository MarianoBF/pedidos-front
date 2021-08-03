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

export interface OrderToUpdate {
    estado: string;
}

export interface User {
    id_usuario?: number,
    nombre_usuario: string,
    nombre_completo: string,
    password: string,
    email: string,
    rol: string, // TODO: Acotar roles
    direccion: string,
    telefono: string,
}

export interface decodedToken {
    rol: string;
    nombre_usuario: string;
    id_usuario: number;
    exp: number;
    iat: number;
  }

  export interface loggedInUser {
      name: string;
      token: string;
  }