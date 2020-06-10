import { Ticket } from "./ticket.model";


export class Concert {
  Id: number;
  TourName: string;
  Artist: string;
  Stage: string;
  ConcertDate: Date;
  NumberTicketsAvailable: number;
  TicketPrice: number;
  Tickets: Ticket[];

}
