/**
 * Request payload interfaces for API calls (POST/PUT)
 *
 * @format
 */

/** Payload to create a new customer */
export interface CreateCustomerRequest {
  /** Company / business name */
  companyName: string;
  /** Primary domain for customer (e.g. acme.com) */
  domain: string;
  /** Optional client-provided customer id (usually server-generated) */
  customerId?: string;
  /** Postal address */
  address?: string;

  /* Contact */
  contactName: string;
  contactEmail: string;
  phone?: string;
  alternateEmail?: string;

  /* Service configuration */
  servicePackage: "trial" | "professional" | "enterprise" | string;
  userLimit?: number;
  storageLimit?: number; // in GB
  databaseLimit?: number;

  /* Status / meta */
  isActive?: boolean;
  logoUrl?: string; // optional uploaded logo URL
}

export default {};
