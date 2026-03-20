export type TicketType = 'Examen' | 'Consulta' | 'Procedimiento';

export type TicketStatus = 'Pendiente' | 'En proceso' | 'Completado';

export interface Ticket {
  id: number;
  nombre: string;
  tipo: TicketType;
  estado: TicketStatus;
  fecha: Date;
}