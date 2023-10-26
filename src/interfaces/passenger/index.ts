import { BookingInterface } from 'interfaces/booking';
import { GetQueryInterface } from 'interfaces';

export interface PassengerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  passport_number: string;
  nationality?: string;
  date_of_birth?: any;
  booking_id: string;
  created_at?: any;
  updated_at?: any;

  booking?: BookingInterface;
  _count?: {};
}

export interface PassengerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  passport_number?: string;
  nationality?: string;
  booking_id?: string;
}
