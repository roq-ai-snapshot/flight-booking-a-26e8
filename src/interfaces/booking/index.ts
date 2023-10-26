import { PassengerInterface } from 'interfaces/passenger';
import { FlightInterface } from 'interfaces/flight';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  booking_code: string;
  flight_id: string;
  user_id: string;
  seat_number?: string;
  booking_date: any;
  created_at?: any;
  updated_at?: any;
  passenger?: PassengerInterface[];
  flight?: FlightInterface;
  user?: UserInterface;
  _count?: {
    passenger?: number;
  };
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  booking_code?: string;
  flight_id?: string;
  user_id?: string;
  seat_number?: string;
}
