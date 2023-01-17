export  interface UserInfo {
  Token: string;
  Refresh: string;
  Nivel: Roles;
  Identificador: string;
  UserInfo: User;
  
}
export type Roles = "ADMIN" | "PROFESOR" | "USER" | "INVITADO";
export type JeraquiaRoles = {
  Rol: Roles | string;
  ID: number;
};
export type Genero = "HOMBRE" | "MUJER";
export interface User {
  ID: number;
  Nombre: string;
  Apellidos: string;
  Numero_Cuenta: string;
  Tipo_user?:Roles;
  Icono: string;
  Correo?:string;
  Genero: Genero;
}
export type Ruta = {
  Nombre: string;
  Ruta: string;
};
export type Seguimiento = {
  ID: number;
  UsuarioID: number;
  Usuario: User;
  RecursoID: number;
  Recurso: Recurso;
  PorcentajeVisto: number;
  TiempoVisto: number;
  PrimerVisto: string;
  UltimaVisto: string;
  RutaVista: string;
};
export type Usuario = {
  ID: number;
  Nombre: string;
  Correo: string;
};
export type Recurso = {
  ID: number;
  Indice: number;
  Titulo: string;
  Descripcion: string;
  PalabrasClave: string;
  Direccion: string;
  TipoMaterialId: number;
  TipoMaterial: TipoMaterial;
  //
  Catalogo: string;
  IDIdioma: number | string;
  Ambito: string;
  Estructura: number | string;
  IDNivelAgregacion: number | string;
  //Ciclo
  Version: string;
  Estado: string;
  Contribucion: string;

  TipoContribucion: string;
  Entidad: string;
  TipoInteractividad: number | string;
  DensidadSemantica: string;
  TipoDestinatario: number | string;
  Contexto: string;
  RangoDeEdad: string;
  Dificultad: string;
  TiempoTipicoAprendizadje: string;
  DescripcionRecurso: string;
  ConocimientoPrevio: string;
  ObjetivosDidacticos: string;

  TipoConocimiento: string | number;
  IdiomaUtilizado: string;
  Proposito: string;
  Fuente: string;
  Taxon: string;
  Entrada: string;

  //Educativo
  TipRecurso: number | string;
  ProcesoCognitivo: string;
  //
  Estatus:boolean;
  IdiomaTabla: { ID: number; nombre: string };
  Agregacion: TablasType;
  TipoRecursoEducativoTabla: TablasType;
  TipoInteractividadTabla: TablasType;
  Destinatario: TablasType;
  TipoDeConocimiento: TablasType;
  Seguimiento: Seguimiento[];
  createdAt: string;
  updatedAt: string;
};
interface TablasType {
  ID: number;
  Nombre: string;
}
interface TipoMaterial {
  ID: string;
  Nombre_Tipo: string;
  Terminaciones: string;
}

//Tipos relacionados a Grupos/Guias
export interface Grupo {
  ID: number;
  Icono: string;
  Codigo: string;
  Nombre: string;
  Descripcion: string;
  Creador: Creador;
  CursoGuia: Guia[];
  Matriculados: User[];
}
export interface Creador {
  Nombre: string;
  Apellidos: string;
}
export interface Guia {
  ID: number;
  Nombre: string;
  Plantilla: materia[];
}

export interface materia {
  ID: number;
  Nombre: string;
  Descripcion?: string;
  SemestreID?: number;
  Publica: boolean;
  Bloques: Bloque[];
}

export interface Bloque {
  ID: number;
  Nombre: string;
  Descripcion?: string;
  Contenido: ContenidoBloque[];
}

export interface ContenidoBloque {
  ID: number;
  Titulo: string;
  Descripcion?: string;
  MaterialAsociado: Recurso[];
}
