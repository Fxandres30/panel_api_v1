export interface Message {
  telefono: string;
  mensaje?: string;
  tipo?: string;
  from_me?: boolean;
  estado?: string;
  leido?: boolean;
  created_at?: string;
}