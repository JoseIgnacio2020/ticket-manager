import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil, startWith, switchMap } from 'rxjs/operators';

import { Ticket, TicketStatus } from '../../models/ticket';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'estado', 'fecha', 'acciones'];

  dataSource = new MatTableDataSource<Ticket>([]);

  filterControl = new FormControl<TicketStatus | 'Todos'>('Todos');

  loading = false;
  error: string | null = null;

  statusOptions: (TicketStatus | 'Todos')[] = [
    'Todos',
    'Pendiente',
    'En proceso',
    'Completado'
  ];

  ticketStatusOptions: TicketStatus[] = [
    'Pendiente',
    'En proceso',
    'Completado'
  ];

  private destroy$ = new Subject<void>();

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
    this.setupFilter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTickets(): void {
    this.ticketService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => this.loading = loading);

    this.ticketService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => this.error = error);

    this.ticketService.getTickets()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  private setupFilter(): void {
    this.filterControl.valueChanges.pipe(
      startWith('Todos' as TicketStatus | 'Todos'),
      switchMap(estado =>
        this.ticketService.filterByStatus(estado ?? 'Todos')
      ),
      takeUntil(this.destroy$)
    ).subscribe(tickets => {
      this.dataSource.data = tickets;

      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    });
  }

  onStatusChange(ticketId: number, nuevoEstado: TicketStatus): void {
    this.ticketService.updateTicketStatus(ticketId, nuevoEstado)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        error: (err) => console.error('Error al actualizar:', err)
      });
  }

  getStatusClass(estado: TicketStatus): string {
    const classes: Record<TicketStatus, string> = {
      'Pendiente': 'status-pendiente',
      'En proceso': 'status-en-proceso',
      'Completado': 'status-completado'
    };
    return classes[estado];
  }
}