import { BookingInterface } from 'interfaces/booking';
import { AirlineInterface } from 'interfaces/airline';
import { GetQueryInterface } from 'interfaces';

export interface FlightInterface {
  id?: string;
  flight_number: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: any;
  arrival_time: any;
  airline_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  airline?: AirlineInterface;
  _count?: {
    booking?: number;
  };
}

export interface FlightGetQueryInterface extends GetQueryInterface {
  id?: string;
  flight_number?: string;
  departure_airport?: string;
  arrival_airport?: string;
  airline_id?: string;
}
