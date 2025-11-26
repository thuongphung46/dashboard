/** @format */

import { post, get, put, del } from "./baseService";
import type { ICustomer } from "../types/requests";

const Controller = "/customers";
export const CustomerService = {
  Create: async (payload: ICustomer): Promise<ICustomer> => {
    return post<ICustomer, ICustomer>(Controller, payload);
  },
  Get: async (): Promise<ICustomer[]> => {
    return get<ICustomer[]>(`${Controller}`);
  },
  GetById: async (id: string): Promise<ICustomer> => {
    return get<ICustomer>(`${Controller}/${id}`);
  },
  Update: async (payload: Partial<ICustomer>): Promise<ICustomer> => {
    return put<ICustomer, Partial<ICustomer>>(`${Controller}`, payload);
  },
  Delete: async (id: number): Promise<void> => {
    return del<void>(`${Controller}/${id}`);
  },
};
