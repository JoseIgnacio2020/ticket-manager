import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';


@NgModule({
  declarations: [
    TicketListComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
