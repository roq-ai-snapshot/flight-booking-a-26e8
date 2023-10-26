import { FlightInterface } from 'interfaces/flight';
import { GetQueryInterface } from 'interfaces';

export interface AirlineInterface {
  id?: string;
  description?: string;
  founded_at?: any;
  headquarters?: string;
  website?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  tenant_id: string;
  flight?: FlightInterface[];

  _count?: {
    flight?: number;
  };
}

export interface AirlineGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  headquarters?: string;
  website?: string;
  name?: string;
  tenant_id?: string;
}
