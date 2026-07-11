import { type FC, useState } from "react";
import { Header } from "../components/layout/Header";
import { SectorList } from "../components/admin/SectorList";
import { PermissionPanel } from "../components/admin/PermissionPanel";

type Tab = "sectors" | "visibility" | "messages";

export const AdminPage: FC = () => {
  const [tab, setTab] = useState<Tab>("sectors");

  const tabs: { id: Tab; label: string }[] = [
    { id: "sectors", label: "Setores" },
    { id: "visibility", label: "Visibilidade" },
    { id: "messages", label: "Mensagens" },
  ];

  return (
    <>
      <Header title="Administração" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex gap-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "sectors" && <SectorList />}
        {tab === "visibility" && <PermissionPanel type="visibility" />}
        {tab === "messages" && <PermissionPanel type="message" />}
      </div>
    </>
  );
};
