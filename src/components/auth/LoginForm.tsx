import { type FC, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import { sectors, users } from "../../data/demo";

export const LoginForm: FC = () => {
  const { login } = useAuthStore();
  const [selectedSector, setSelectedSector] = useState(sectors[0].id);

  const filteredUsers = users.filter((u) => u.sectorId === selectedSector);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">NCC Spark</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Sistema de Mensagens Internas</p>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
            Selecione um usuário para entrar no modo demonstração
          </p>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Setor</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="input-field"
            >
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => login(user.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all text-left"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
                  style={{ backgroundColor: sectors.find((s) => s.id === user.sectorId)?.color }}
                >
                  {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                </div>
                {user.isAdmin && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full font-medium">
                    Admin
                  </span>
                )}
                <div className={`w-2 h-2 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
