import { type FC, useMemo } from "react";
import { useContactsStore } from "../../stores/contactsStore";
import { useAuthStore } from "../../stores/authStore";
import { useAdminStore } from "../../stores/adminStore";
import { useChatStore } from "../../stores/chatStore";
import { useNavigate } from "react-router-dom";
import { sectors } from "../../data/demo";
import { ContactCard } from "./ContactCard";

export const ContactList: FC = () => {
  const { currentUser } = useAuthStore();
  const { users } = useContactsStore();
  const { visibilityRules } = useAdminStore();
  const { getOrCreateChat, setActiveChat } = useChatStore();
  const navigate = useNavigate();

  const visibleUsers = useMemo(() => {
    if (!currentUser) return [];
    return users.filter((user) => {
      if (user.id === currentUser.id) return false;

      const matchingRules = visibilityRules.filter((rule) => {
        const sourceMatch = rule.sourceSectorId === null || rule.sourceSectorId === currentUser.sectorId;
        const sourceRoleMatch = rule.sourceRole === null || rule.sourceRole === currentUser.role;
        const targetMatch = rule.targetSectorId === null || rule.targetSectorId === user.sectorId;
        const targetRoleMatch = rule.targetRole === null || rule.targetRole === user.role;
        return sourceMatch && sourceRoleMatch && targetMatch && targetRoleMatch;
      });

      if (matchingRules.length === 0) return false;
      return matchingRules.some((r) => r.canView);
    });
  }, [currentUser, users, visibilityRules]);

  const groupedBySector = useMemo(() => {
    const grouped: Record<string, typeof visibleUsers> = {};
    visibleUsers.forEach((user) => {
      const sectorId = user.sectorId;
      if (!grouped[sectorId]) grouped[sectorId] = [];
      grouped[sectorId].push(user);
    });
    return grouped;
  }, [visibleUsers]);

  const handleStartChat = (userId: string) => {
    if (!currentUser) return;
    const chatId = getOrCreateChat(currentUser.id, userId);
    setActiveChat(chatId);
    navigate("/chat");
  };

  if (!currentUser) return null;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {Object.keys(groupedBySector).length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="text-lg font-medium">Nenhum contato visível</p>
          <p className="text-sm mt-1">Com base nas regras de visibilidade configuradas</p>
        </div>
      ) : (
        Object.entries(groupedBySector).map(([sectorId, sectorUsers]) => {
          const sector = sectors.find((s) => s.id === sectorId);
          return (
            <div key={sectorId} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector?.color }} />
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {sector?.name ?? sectorId}
                </h3>
                <span className="text-xs text-gray-400">({sectorUsers.length})</span>
              </div>
              <div className="space-y-1">
                {sectorUsers.map((user) => (
                  <ContactCard
                    key={user.id}
                    user={user}
                    sectorColor={sector?.color ?? "#6B7280"}
                    onStartChat={handleStartChat}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
