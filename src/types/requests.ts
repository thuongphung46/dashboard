/**
 * Payload to create a new customer
 *
 * @format
 */

export interface ICustomer {
  id?: number;
  companyName: string;
  domain: string;
  customerId?: string;
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
  logoUrl?: string;
  createdDate?: string;
}
