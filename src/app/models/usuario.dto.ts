export interface UsuarioDTO {
  id: number;
  username: string;
  rol: 'ROLE_ADMIN' | 'ROLE_EMPLEADO' | 'ROLE_SOCIO';
  token?: string; // si usás JWT
}
