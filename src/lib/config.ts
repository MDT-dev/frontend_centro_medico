/**
 * Configurações globais do sistema de gestão de usuários
 */

export const USER_CONFIG = {
  // Paginação
  ITEMS_PER_PAGE: 10,

  // Validação de Senha
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 100,

  // Nomes de Usuário
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,

  // Email
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Telefone
  PHONE_REGEX: /^\d{10,15}$/,

  // Timeouts
  API_TIMEOUT: 30000, // 30 segundos
  QUERY_STALE_TIME: 1000 * 60 * 5, // 5 minutos
  QUERY_CACHE_TIME: 1000 * 60 * 10, // 10 minutos

  // Mensagens
  MESSAGES: {
    SUCCESS: {
      CREATE: "Usuário criado com sucesso!",
      UPDATE: "Usuário atualizado com sucesso!",
      DELETE: "Usuário deletado com sucesso!",
      PASSWORD: "Senha alterada com sucesso!",
      EXPORT: "PDF baixado com sucesso!",
    },
    ERROR: {
      CREATE: "Erro ao criar usuário",
      UPDATE: "Erro ao atualizar usuário",
      DELETE: "Erro ao deletar usuário",
      PASSWORD: "Erro ao alterar senha",
      EXPORT: "Erro ao gerar PDF",
      NETWORK: "Erro de conexão com o servidor",
      VALIDATION: "Verifique os dados e tente novamente",
    },
  },

  // Permissões por Função
  PERMISSIONS: {
    ADMIN: [
      "create_user",
      "read_user",
      "update_user",
      "delete_user",
      "change_password",
      "export_pdf",
      "manage_roles",
      "view_audit_logs",
    ],
    GERENTE: [
      "create_user",
      "read_user",
      "update_user",
      "delete_user",
      "change_password",
      "export_pdf",
    ],
    MEDICO: [
      "read_user",
      "update_user",
      "change_password",
      "export_pdf",
    ],
    RECEPCIONISTA: [
      "read_user",
      "update_user",
      "change_password",
    ],
    PACIENTE: [
      "read_user",
      "change_password",
    ],
  },
};

// Tema de cores
export const THEME_CONFIG = {
  colors: {
    primary: "rgb(37, 99, 235)", // blue-600
    secondary: "rgb(100, 116, 139)", // slate-500
    success: "rgb(34, 197, 94)", // green-500
    warning: "rgb(234, 179, 8)", // yellow-500
    error: "rgb(239, 68, 68)", // red-500
    background: "rgb(255, 255, 255)", // white
    text: "rgb(15, 23, 42)", // slate-900
  },
};

// Configurações de API
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    USERS: "users",
    CHANGE_PASSWORD: "users/change-password",
    CHECK_USERNAME: "users/check-username",
    PROFILE: "users/me",
  },
};
