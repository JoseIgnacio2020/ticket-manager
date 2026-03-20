import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { Ticket, TicketStatus } from '../models/ticket';
import { TICKETS_MOCK } from '../data/tickets.mock';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketsSubject = new BehaviorSubject<Ticket[]>(TICKETS_MOCK);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  tickets$ = this.ticketsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  getTickets(): Observable<Ticket[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return of(TICKETS_MOCK).pipe(
      delay(800),
      tap({
        next: (tickets) => {
          this.ticketsSubject.next(tickets);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.errorSubject.next('Error al cargar los tickets');
          this.loadingSubject.next(false);
        }
      })
    );
  }

  updateTicketStatus(id: number, nuevoEstado: TicketStatus): Observable<Ticket> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const ticketsActuales = this.ticketsSubject.getValue();
    const ticketIndex = ticketsActuales.findIndex(t => t.id === id);

    if (ticketIndex === -1) {
      this.loadingSubject.next(false);
      return throwError(() => new Error(`Ticket con id ${id} no encontrado`));
    }

    const ticketActualizado: Ticket = {
      ...ticketsActuales[ticketIndex],
      estado: nuevoEstado
    };

    const ticketsActualizados = [
      ...ticketsActuales.slice(0, ticketIndex),
      ticketActualizado,
      ...ticketsActuales.slice(ticketIndex + 1)
    ];

    return of(ticketActualizado).pipe(
      delay(500),
      tap({
        next: () => {
          this.ticketsSubject.next(ticketsActualizados);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.errorSubject.next('Error al actualizar el ticket');
          this.loadingSubject.next(false);
        }
      })
    );
  }

  filterByStatus(estado: TicketStatus | 'Todos'): Observable<Ticket[]> {
    return this.tickets$.pipe(
      map(tickets =>
        estado === 'Todos'
          ? tickets
          : tickets.filter(t => t.estado === estado)
      )
    );
  }
}