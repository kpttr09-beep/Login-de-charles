// =============================================================================
// mensagens.js
// -----------------------------------------------------------------------------
// O Firebase devolve os erros em INGLÊS e em forma de "código"
// (ex.: "auth/invalid-credential"). Esta função traduz esses códigos
// para mensagens claras em português, que mostramos ao usuário.
// =============================================================================

export function traduzirErro(codigo) {
  const mapa = {
    "auth/invalid-email":         "E-mail inválido. Confira o formato (exemplo@email.com).",
    "auth/missing-password":      "Digite a senha.",
    "auth/weak-password":         "A senha é muito fraca. Use pelo menos 6 caracteres.",
    "auth/email-already-in-use":  "Este e-mail já está cadastrado. Faça login.",
    "auth/invalid-credential":    "E-mail ou senha incorretos.",
    "auth/user-not-found":        "Usuário não encontrado. Cadastre-se primeiro.",
    "auth/wrong-password":        "Senha incorreta.",
    "auth/too-many-requests":     "Muitas tentativas. Aguarde um pouco e tente novamente.",
    "auth/network-request-failed":"Falha de conexão. Verifique sua internet."
  };

  // Se o código não estiver no mapa, mostramos uma mensagem genérica.
  return mapa[codigo] || "Ocorreu um erro. Tente novamente.";
}
