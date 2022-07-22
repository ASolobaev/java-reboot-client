import {AddressInterface} from "./address.interface";

export interface UserDto {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  address: AddressInterface[];
}