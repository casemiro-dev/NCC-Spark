import { type FC, useState } from "react";
import { useAdminStore } from "../../stores/adminStore";
import { sectors } from "../../data/demo";

interface PermissionPanelProps {
  type: "visibility" | "message";
}

export const PermissionPanel: FC<PermissionPanelProps> = ({ type }) => {
  const { visibilityRules, messagePermissions, addVisibilityRule, removeVisibilityRule, addMessagePermission, removeMessagePermission } = useAdminStore();

  const rules = type === "visibility" ? visibilityRules : messagePermissions;
  const addRule = type === "visibility" ? addVisibilityRule : addMessagePermission;
  const removeRule = type === "visibility" ? removeVisibilityRule : removeMessagePermission;

  const title = type === "visibility" ? "Visibilidade" : "Mensagens";
  const desc = type === "visibility"
    ? "Controla quais setores/cargos podem ver outros setores/cargos"
    : "Controla quais setores/cargos podem enviar mensagens para outros";
  const actionLabel = type === "visibility" ? "Ver" : "Enviar Mensagem";

  const [showForm, setShowForm] = useState(false);
  const [sourceSector, setSourceSector] = useState<string>("*");
  const [sourceRole, setSourceRole] = useState("");
  const [targetSector, setTargetSector] = useState<string>("*");
  const [targetRole, setTargetRole] = useState("");
  const [can, setCan] = useState(true);

  const roles = ["Diretor", "CEO", "Desenvolvedor", "Analista de Sistemas", "Suporte Técnico", "Vendedor", "Gerente Comercial", "Atendente", "Supervisora", "Assistente", "Auxiliar", "Coordenadora", "Estagiário"];

  const handleAdd = () => {
    addRule({
      sourceSectorId: sourceSector === "*" ? null : sourceSector,
      sourceRole: sourceRole || null,
      targetSectorId: targetSector === "*" ? null : targetSector,
      targetRole: targetRole || null,
      canSend: can,
      canView: can,
    } as any);
    setShowForm(false);
    setSourceSector("*");
    setSourceRole("");
    setTargetSector("*");
    setTargetRole("");
    setCan(true);
  };

  const getLabel = (rule: typeof rules[0]) => {
    const src = rule.sourceSectorId ? sectors.find((s) => s.id === rule.sourceSectorId)?.name ?? rule.sourceSectorId : "Todos";
    const srcR = rule.sourceRole ?? "";
    const tgt = rule.targetSectorId ? sectors.find((s) => s.id === rule.targetSectorId)?.name ?? rule.targetSectorId : "Todos";
    const tgtR = rule.targetRole ?? "";
    const permit = (type === "visibility" ? (rule as any).canView : (rule as any).canSend);
    return {
      from: `${src}${srcR ? ` (${srcR})` : ""}`,
      to: `${tgt}${tgtR ? ` (${tgtR})` : ""}`,
      permit,
    };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
          Nova Regra
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg space-y-3 bg-gray-50 dark:bg-gray-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">Quem pode {actionLabel.toLowerCase()}</label>
              <select value={sourceSector} onChange={(e) => setSourceSector(e.target.value)} className="input-field text-sm">
                <option value="*">Todos os setores</option>
                {sectors.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Cargo (opcional)</label>
              <select value={sourceRole} onChange={(e) => setSourceRole(e.target.value)} className="input-field text-sm">
                <option value="">Qualquer cargo</option>
                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Pode {actionLabel.toLowerCase()} para</label>
              <select value={targetSector} onChange={(e) => setTargetSector(e.target.value)} className="input-field text-sm">
                <option value="*">Todos os setores</option>
                {sectors.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Cargo alvo (opcional)</label>
              <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)} className="input-field text-sm">
                <option value="">Qualquer cargo</option>
                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={can} onChange={(e) => setCan(e.target.checked)} className="rounded" />
              <span className="text-sm">Permitir</span>
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancelar</button>
            <button onClick={handleAdd} className="btn-primary text-sm">Adicionar</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {rules.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">Nenhuma regra cadastrada</p>
        ) : (
          rules.map((rule) => {
            const { from, to, permit } = getLabel(rule);
            return (
              <div
                key={rule.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className={`w-2 h-2 rounded-full ${permit ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm flex-1">
                  <strong>{from}</strong> → <strong>{to}</strong>
                  <span className={`ml-2 text-xs ${permit ? "text-green-600" : "text-red-600"}`}>
                    ({permit ? "Permitido" : "Negado"})
                  </span>
                </span>
                <button
                  onClick={() => removeRule(rule.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
