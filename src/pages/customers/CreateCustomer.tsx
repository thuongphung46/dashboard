/** @format */

import { useNavigate } from "react-router-dom";
import { CUSTOMERS } from "../../config/paths";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import { CustomerService } from "../../services/customersService";
import CustomerForm from "./CustomerForm";
import { ICustomer } from "../../types/requests";

export function CreateCustomer() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCreate = async (payload: Partial<ICustomer>) => {
    await CustomerService.Create(payload as ICustomer);
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
          <h1 className="text-gray-900">{t("customers.create.title")}</h1>
          <p className="text-gray-600 mt-1">
            {t("customers.create.description")}
          </p>
        </div>
      </div>

      <CustomerForm
        onSubmit={handleCreate}
        submitLabel={t("customers.create.actions.create")}
      />
    </div>
  );
}
