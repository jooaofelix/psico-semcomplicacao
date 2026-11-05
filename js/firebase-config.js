/*
  CONFIGURAÇÃO DO FIREBASE (login e progresso na nuvem do PsicoPlay)

  Cole aqui o objeto firebaseConfig do seu app da Web:
  Console do Firebase → ⚙ Configurações do projeto → Seus apps → app da Web (</>) → Configuração.
  Esses valores não são senhas: podem ficar públicos. Quem protege os dados são as regras em firestore.rules.

  Enquanto estiver null, o PsicoPlay funciona sem login e salva o progresso só no aparelho.
*/
window.PP_FIREBASE = null;

/* Exemplo do formato:
window.PP_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:abc123"
};
*/
