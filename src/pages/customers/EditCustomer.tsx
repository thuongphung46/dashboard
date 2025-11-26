/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CUSTOMERS } from "../../config/paths";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import { CustomerService } from "../../services/customersService";
import { ICustomer } from "../../types/requests";
import CustomerForm from "./CustomerForm";

export function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  useEffect(() => {
    const fetch = async (customerId: string) => {
      setLoading(true);
      try {
        const data = await CustomerService.GetById(customerId);
        setCustomer(data);
      } catch (err) {
        console.error("Failed to load customer", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetch(id);
  }, [id]);

  const handleUpdate = async (payload: Partial<ICustomer>) => {
    await CustomerService.Update(payload);
    navigate(CUSTOMERS);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(CUSTOMERS)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.back")}
        </Button>
        <div>
          <h1 className="text-gray-900">{t("customers.edit.title")}</h1>
          <p className="text-gray-600 mt-1">
            {t("customers.edit.description")}
          </p>
        </div>
      </div>

      <CustomerForm
        initial={customer ?? undefined}
        onSubmit={handleUpdate}
        submitLabel={t("common.save")}
      />
    </div>
  );
}
