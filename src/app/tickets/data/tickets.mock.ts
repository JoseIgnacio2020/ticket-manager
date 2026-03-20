import { Ticket } from '../models/ticket';

export const TICKETS_MOCK: Ticket[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    tipo: 'Examen',
    estado: 'Pendiente',
    fecha: new Date('2026-03-01')
  },
  {
    id: 2,
    nombre: 'María González',
    tipo: 'Consulta',
    estado: 'En proceso',
    fecha: new Date('2026-03-05')
  },
  {
    id: 3,
    nombre: 'Carlos Rodríguez',
    tipo: 'Procedimiento',
    estado: 'Completado',
    fecha: new Date('2026-03-08')
  },
  {
    id: 4,
    nombre: 'Ana Martínez',
    tipo: 'Examen',
    estado: 'En proceso',
    fecha: new Date('2026-03-10')
  },
  {
    id: 5,
    nombre: 'Pedro Sánchez',
    tipo: 'Consulta',
    estado: 'Pendiente',
    fecha: new Date('2026-03-12')
  },
  {
    id: 6,
    nombre: 'Laura Torres',
    tipo: 'Procedimiento',
    estado: 'Completado',
    fecha: new Date('2026-03-15')
  },
  {
    id: 7,
    nombre: 'Diego Flores',
    tipo: 'Examen',
    estado: 'Pendiente',
    fecha: new Date('2026-03-18')
  },
  {
    id: 8,
    nombre: 'Valentina López',
    tipo: 'Consulta',
    estado: 'En proceso',
    fecha: new Date('2026-03-20')
  }
];