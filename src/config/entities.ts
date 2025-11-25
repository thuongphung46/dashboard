/**
 * Entity column definitions used to generate tables.
 * Each entity has an array of column definitions describing field, i18n label key,
 * whether the column is sortable, and optional width/formatter.
 *
 * @format
 */

import type { ReactNode } from "react";

export interface ColumnDef {
  key: string; // unique key for the column
  field: string; // field name in data objects
  labelKey: string; // i18n key for header label
  sortable?: boolean; // whether column supports sorting
  width?: string; // CSS width (eg '120px' or '20%')
  type?: string; // optional data type hint, e.g. 'string' | 'number' | 'date'
  render?: (value: any, row?: any) => ReactNode; // optional custom renderer
}

export interface EntityDef {
  key: string;
  columns: ColumnDef[];
}

export const customers: EntityDef = {
  key: "customers",
  columns: [
    {
      key: "name",
      field: "name",
      labelKey: "customers.table.name",
      sortable: true,
    },
    {
      key: "id",
      field: "id",
      labelKey: "customers.table.id",
      sortable: true,
      width: "140px",
    },
    { key: "contact", field: "contact", labelKey: "customers.table.contact" },
    {
      key: "users",
      field: "users",
      labelKey: "customers.table.users",
      width: "90px",
    },
    {
      key: "status",
      field: "status",
      labelKey: "customers.table.status",
      width: "110px",
    },
    {
      key: "created",
      field: "created",
      labelKey: "customers.table.created",
      sortable: true,
      width: "160px",
    },
    {
      key: "actions",
      field: "_actions",
      labelKey: "customers.table.actions",
      width: "140px",
    },
  ],
};

export const licenses: EntityDef = {
  key: "licenses",
  columns: [
    {
      key: "id",
      field: "id",
      labelKey: "license.table.id",
      sortable: true,
      width: "140px",
    },
    {
      key: "license_key",
      field: "license_key",
      labelKey: "license.table.license_key",
    },
    { key: "customer", field: "customer", labelKey: "license.table.customer" },
    {
      key: "start_date",
      field: "start_date",
      labelKey: "license.table.start_date",
      sortable: true,
    },
    {
      key: "expiration_date",
      field: "expiration_date",
      labelKey: "license.table.expiration",
      sortable: true,
    },
    { key: "status", field: "status", labelKey: "license.table.status" },
    {
      key: "actions",
      field: "_actions",
      labelKey: "common.actions",
      width: "140px",
    },
  ],
};

export const databases: EntityDef = {
  key: "databases",
  columns: [
    {
      key: "db_name",
      field: "db_name",
      labelKey: "database.table.db_name",
      sortable: true,
    },
    { key: "size", field: "size", labelKey: "database.table.size" },
    {
      key: "last_backup",
      field: "last_backup",
      labelKey: "database.table.last_backup",
      sortable: true,
    },
    {
      key: "connections",
      field: "connections",
      labelKey: "database.table.connections",
    },
    { key: "status", field: "status", labelKey: "customers.table.status" },
    { key: "actions", field: "_actions", labelKey: "common.actions" },
  ],
};

export const activity: EntityDef = {
  key: "activity",
  columns: [
    {
      key: "timestamp",
      field: "timestamp",
      labelKey: "activity.table.timestamp",
      sortable: true,
      width: "180px",
    },
    { key: "type", field: "type", labelKey: "activity.table.type" },
    { key: "action", field: "action", labelKey: "activity.table.action" },
    { key: "user", field: "user", labelKey: "activity.table.user" },
    { key: "resource", field: "resource", labelKey: "activity.table.resource" },
    { key: "status", field: "status", labelKey: "activity.table.status" },
  ],
};

export const day: EntityDef = {
  key: "day",
  columns: [
    { key: "name", field: "name", labelKey: "day.table.name", type: "number" },
    { key: "code", field: "code", labelKey: "day.table.code", type: "string" },
  ],
};

export const entities: Record<string, EntityDef> = {
  customers,
  licenses,
  databases,
  activity,
  day,
};

export default entities;
