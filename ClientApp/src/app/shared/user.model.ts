import { Ticket } from "./ticket.model";

export class User {

  Id: string;
  FullName: string;
  UserName: string;
  Email: string;
  homeAddress: string;
  Tickets: Ticket[];
}
