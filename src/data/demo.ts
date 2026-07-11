import type { Sector, User, Chat, VisibilityRule, MessagePermission } from "../types";

export const sectors: Sector[] = [
  { id: "diretoria", name: "Diretoria", color: "#EF4444" },
  { id: "ti", name: "TI", color: "#3B82F6" },
  { id: "comercial", name: "Comercial", color: "#10B981" },
  { id: "suporte", name: "Suporte", color: "#F59E0B" },
  { id: "administrativo", name: "Administrativo", color: "#8B5CF6" },
];

export const users: User[] = [
  { id: "carlos", name: "Carlos Silva", role: "Diretor", sectorId: "diretoria", isAdmin: true, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "ana", name: "Ana Oliveira", role: "CEO", sectorId: "diretoria", isAdmin: true, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "joao", name: "João Santos", role: "Desenvolvedor", sectorId: "ti", isAdmin: false, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "maria", name: "Maria Oliveira", role: "Analista de Sistemas", sectorId: "ti", isAdmin: false, isOnline: false, lastAccess: new Date(Date.now() - 3600000).toISOString() },
  { id: "pedro", name: "Pedro Costa", role: "Suporte Técnico", sectorId: "ti", isAdmin: false, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "lucas", name: "Lucas Almeida", role: "Vendedor", sectorId: "comercial", isAdmin: false, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "fernanda", name: "Fernanda Lima", role: "Gerente Comercial", sectorId: "comercial", isAdmin: false, isOnline: false, lastAccess: new Date(Date.now() - 7200000).toISOString() },
  { id: "rafael", name: "Rafael Souza", role: "Atendente", sectorId: "suporte", isAdmin: false, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "juliana", name: "Juliana Torres", role: "Supervisora", sectorId: "suporte", isAdmin: false, isOnline: false, lastAccess: new Date(Date.now() - 1800000).toISOString() },
  { id: "amanda", name: "Amanda Carvalho", role: "Assistente", sectorId: "administrativo", isAdmin: false, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "bruno", name: "Bruno Dias", role: "Auxiliar", sectorId: "administrativo", isAdmin: false, isOnline: false, lastAccess: new Date(Date.now() - 5400000).toISOString() },
  { id: "camila", name: "Camila Rocha", role: "Coordenadora", sectorId: "administrativo", isAdmin: false, isOnline: true, lastAccess: new Date().toISOString() },
  { id: "daniel", name: "Daniel Ferreira", role: "Estagiário", sectorId: "administrativo", isAdmin: false, isOnline: false, lastAccess: new Date(Date.now() - 9000000).toISOString() },
];

export const initialChats: Chat[] = [
  {
    id: "chat1",
    participants: ["joao", "maria"],
    messages: [
      { id: "m1", chatId: "chat1", senderId: "joao", text: "Oi Maria, tudo bem?", timestamp: new Date(Date.now() - 86400000).toISOString(), read: true },
      { id: "m2", chatId: "chat1", senderId: "maria", text: "Tudo João! E você?", timestamp: new Date(Date.now() - 86000000).toISOString(), read: true },
      { id: "m3", chatId: "chat1", senderId: "joao", text: "Preciso de ajuda com o deploy do novo sistema.", timestamp: new Date(Date.now() - 85000000).toISOString(), read: true },
      { id: "m4", chatId: "chat1", senderId: "maria", text: "Claro! Vou olhar agora.", timestamp: new Date(Date.now() - 84000000).toISOString(), read: true },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "chat2",
    participants: ["joao", "carlos"],
    messages: [
      { id: "m5", chatId: "chat2", senderId: "carlos", text: "João, como está o andamento do projeto?", timestamp: new Date(Date.now() - 43200000).toISOString(), read: true },
      { id: "m6", chatId: "chat2", senderId: "joao", text: "Estamos na fase final, Carlos. Só alguns ajustes.", timestamp: new Date(Date.now() - 42800000).toISOString(), read: true },
    ],
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: "chat3",
    participants: ["joao", "rafael"],
    messages: [
      { id: "m7", chatId: "chat3", senderId: "rafael", text: "João, o sistema está lento. Pode verificar?", timestamp: new Date(Date.now() - 7200000).toISOString(), read: true },
      { id: "m8", chatId: "chat3", senderId: "joao", text: "Vou verificar o servidor agora.", timestamp: new Date(Date.now() - 7000000).toISOString(), read: false },
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "chat4",
    participants: ["joao", "lucas"],
    messages: [
      { id: "m9", chatId: "chat4", senderId: "lucas", text: "João, você recebeu o relatório?", timestamp: new Date(Date.now() - 3600000).toISOString(), read: false },
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export const visibilityRules: VisibilityRule[] = [
  { id: "vr1", sourceSectorId: null, sourceRole: null, targetSectorId: null, targetRole: null, canView: true },
  { id: "vr2", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "ti", targetRole: null, canView: true },
  { id: "vr3", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "comercial", targetRole: null, canView: true },
  { id: "vr4", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "suporte", targetRole: null, canView: true },
  { id: "vr5", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "administrativo", targetRole: null, canView: true },
  { id: "vr6", sourceSectorId: "ti", sourceRole: null, targetSectorId: null, targetRole: null, canView: true },
  { id: "vr7", sourceSectorId: "comercial", sourceRole: null, targetSectorId: "diretoria", targetRole: null, canView: true },
  { id: "vr8", sourceSectorId: "comercial", sourceRole: null, targetSectorId: "ti", targetRole: null, canView: true },
  { id: "vr9", sourceSectorId: "suporte", sourceRole: null, targetSectorId: "ti", targetRole: null, canView: true },
  { id: "vr10", sourceSectorId: "suporte", sourceRole: null, targetSectorId: null, targetRole: null, canView: false },
  { id: "vr11", sourceSectorId: "administrativo", sourceRole: null, targetSectorId: null, targetRole: null, canView: true },
];

export const messagePermissions: MessagePermission[] = [
  { id: "mp1", sourceSectorId: null, sourceRole: null, targetSectorId: null, targetRole: null, canSend: true },
  { id: "mp2", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "ti", targetRole: null, canSend: true },
  { id: "mp3", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "comercial", targetRole: null, canSend: true },
  { id: "mp4", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "suporte", targetRole: null, canSend: true },
  { id: "mp5", sourceSectorId: "diretoria", sourceRole: null, targetSectorId: "administrativo", targetRole: null, canSend: true },
  { id: "mp6", sourceSectorId: "ti", sourceRole: null, targetSectorId: null, targetRole: null, canSend: true },
  { id: "mp7", sourceSectorId: "comercial", sourceRole: null, targetSectorId: "diretoria", targetRole: null, canSend: true },
  { id: "mp8", sourceSectorId: "comercial", sourceRole: null, targetSectorId: "ti", targetRole: null, canSend: true },
  { id: "mp9", sourceSectorId: "suporte", sourceRole: null, targetSectorId: "ti", targetRole: null, canSend: true },
  { id: "mp10", sourceSectorId: "administrativo", sourceRole: null, targetSectorId: null, targetRole: null, canSend: true },
];
