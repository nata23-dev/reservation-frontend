export type ReservaStatus = 'ACTIVE' | 'CANCELED';

export interface Reserva {
  id: number;
  customerName: string;
  date: string;
  time: string;
  service: string;
  status: ReservaStatus;
}


export interface CreateReservaRequest {
  customerName: string;
  date: string;
  time: string;
  service: string;

}
