/** @format */

import { post, get, put, del } from "./baseService";
import type { CreateCustomerRequest } from "../types/requests";

const Controller = "/customers";
export const CustomerService = {
  Create: async (
    payload: CreateCustomerRequest
  ): Promise<CreateCustomerRequest> => {
    return post<CreateCustomerRequest, CreateCustomerRequest>(
      Controller,
      payload
    );
  },
  Get: async (id: string): Promise<CreateCustomerRequest> => {
    return get<CreateCustomerRequest>(`${Controller}`);
  },
  GetById: async (id: string): Promise<CreateCustomerRequest> => {
    return get<CreateCustomerRequest>(`${Controller}/${id}`);
  },
  Update: async (
    payload: Partial<CreateCustomerRequest>
  ): Promise<CreateCustomerRequest> => {
    return put<CreateCustomerRequest, Partial<CreateCustomerRequest>>(
      `${Controller}`,
      payload
    );
  },
  Delete: async (id: string): Promise<void> => {
    return del<void>(`${Controller}/${id}`);
  },
};
