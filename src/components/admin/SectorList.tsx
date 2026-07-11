import { type FC, useState } from "react";
import { useAdminStore } from "../../stores/adminStore";
import { Modal } from "../common/Modal";

export const SectorList: FC = () => {
  const { sectors, addSector, updateSector, deleteSector } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3B82F6");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingId(null);
    setName("");
    setColor("#3B82F6");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (id: string) => {
    const sector = sectors.find((s) => s.id === id);
    if (!sector) return;
    setEditingId(id);
    setName(sector.name);
    setColor(sector.color);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editingId) {
      updateSector(editingId, { name: name.trim(), color });
    } else {
      addSector(name.trim(), color);
    }
    setIsModalOpen(false);
    setName("");
    setColor("#3B82F6");
  };

  const handleDelete = (id: string) => {
    deleteSector(id);
    setConfirmDelete(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Setores</h3>
        <button onClick={handleOpenNew} className="btn-primary text-sm">
          Novo Setor
        </button>
      </div>

      <div className="space-y-2">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: sector.color }} />
            <span className="flex-1 text-sm font-medium">{sector.name}</span>
            <button
              onClick={() => handleOpenEdit(sector.id)}
              className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            {confirmDelete === sector.id ? (
              <div className="flex items-center gap-1">
                <button onClick={() => handleDelete(sector.id)} className="text-xs text-red-500 hover:text-red-600">Confirmar</button>
                <button onClick={() => setConfirmDelete(null)} className="text-xs text-gray-400">Cancelar</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(sector.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Setor" : "Novo Setor"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Setor</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Ex: RH"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cor</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-500">{color}</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setIsModalOpen(false)} className="btn-secondary text-sm">
              Cancelar
            </button>
            <button onClick={handleSave} className="btn-primary text-sm" disabled={!name.trim()}>
              Salvar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
