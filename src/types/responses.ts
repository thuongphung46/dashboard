/**
 * API response interfaces
 * Add interfaces here for server responses so components/services can import them.
 *
 * @format
 */

export interface DayResponse {
  /** Numeric name field as requested */
  name: number;
  /** Code string */
  code: string;
}

export interface LicenseResponse {
  id: string;
  license_key: string;
  customer?: string;
  start_date?: string;
  expiration_date?: string;
  status?: string;
}

export interface DatabaseResponse {
  id?: string;
  db_name: string;
  size?: string;
  last_backup?: string;
  connections?: number;
  status?: string;
}

export interface ActivityResponse {
  timestamp: string;
  type?: string;
  action?: string;
  user?: string;
  resource?: string;
  status?: string;
}

export type ApiResponse<T> = T | T[];

export default {};
