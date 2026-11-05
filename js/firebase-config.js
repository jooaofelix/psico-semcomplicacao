/*
  CONFIGURAÇÃO DO FIREBASE (login e progresso na nuvem do PsicoPlay)

  Cole aqui o objeto firebaseConfig do seu app da Web:
  Console do Firebase → ⚙ Configurações do projeto → Seus apps → app da Web (</>) → Configuração.
  Esses valores não são senhas: podem ficar públicos. Quem protege os dados são as regras em firestore.rules.

  Se voltar a ser null, o PsicoPlay funciona sem login e salva o progresso só no aparelho.
*/
window.PP_FIREBASE = {
  apiKey: "AIzaSyB24VH1fXO9NOvGYhmthrNpSStsC5vR-Uo",
  authDomain: "psicosemcomplicacao-a9ed8.firebaseapp.com",
  projectId: "psicosemcomplicacao-a9ed8",
  storageBucket: "psicosemcomplicacao-a9ed8.firebasestorage.app",
  messagingSenderId: "310114007860",
  appId: "1:310114007860:web:b1e48110564c964f4c8361"
};

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
