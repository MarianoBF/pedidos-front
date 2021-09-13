export interface Product {
    id_producto?: number,
    nombre: string,
    descripcion: string,
    precio: number,
    imagen: string,
}

export interface ProductInCart {
    id_producto?: number,
    nombre: string,
    descripcion: string,
    precio: number,
    imagen: string,
    quantity: number,
}

export interface Order {
    id_orden?: number,
    hora: Date,
    id_usuario: number,
    estado: string,
    pago_via: "efectivo"|"tarjeta",
    pago_monto: number,
    observaciones?: string,
}

export interface NewOrder {
    id_usuario: number,
    pago_via: "efectivo"|"tarjeta"
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
    rol: "usuario" | "administrador",
    direccion: string,
    telefono: string,
}

export interface NewUser {
    id_usuario?: number,
    nombre_usuario: string,
    nombre_completo: string,
    password: string,
    email: string,
    direccion: string,
    telefono: string,
}

export interface UserResponse {
    datos: User[];
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

  export interface loginCredentialsForm {
    userName: string;
    password: string;
}

  export interface loginCredentialsRequest {
      nombre_usuario: string;
      password: string;
  }

  export interface tokenResponse {
      token: string;
  }