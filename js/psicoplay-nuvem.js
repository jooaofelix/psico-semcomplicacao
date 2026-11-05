/*
  PsicoPlay na nuvem: login (Google ou e-mail e senha) e progresso salvo no Firestore.
  Cada pessoa tem um documento em jogadores/{uid} com XP, sequência, lições feitas, erros e histórico.
  O Firestore guarda uma cópia no aparelho, então dá para jogar sem internet; ele envia quando a conexão voltar.
*/
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, updateProfile, signOut, connectAuthEmulator,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, getDoc, setDoc, serverTimestamp, connectFirestoreEmulator,
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

const cfg = window.PP_FIREBASE;
const jogo = window.ppJogo;
const $ = s => document.querySelector(s);

if (cfg && jogo) iniciar();

function iniciar() {
  const app = initializeApp(cfg);
  const auth = getAuth(app);
  auth.languageCode = 'pt';
  const db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) });
  // Só para testar no computador com os emuladores do Firebase (emulador: true na configuração).
  if (cfg.emulador) { connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true }); connectFirestoreEmulator(db, '127.0.0.1', 8080); }

  let uid = null, perfil = null, timer = null, criando = false, nomeNovo = '';

  /* ---------- salvar ---------- */
  function enviar() {
    if (!uid) return;
    const { dono, ...estado } = jogo.S;
    setDoc(doc(db, 'jogadores', uid), {
      estado, nome: perfil.nome, email: perfil.email || '', atualizadoEm: serverTimestamp(),
    }).catch(() => jogo.toast('Não deu para salvar agora. Tento de novo depois.'));
  }
  window.ppNuvem = {
    salvar() { if (!uid) return; clearTimeout(timer); timer = setTimeout(enviar, 700); },
    sair() { clearTimeout(timer); if (uid) enviar(); signOut(auth); },
  };
  // Ao fechar ou trocar de aba, envia o que estiver pendente.
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && timer) { clearTimeout(timer); timer = null; enviar(); } });

  /* ---------- tela de login ---------- */
  const espera = (txt) => { $('#lgEspera').hidden = !txt; $('#lgEsperaTxt').textContent = txt || ''; $('#lgOpcoes').hidden = !!txt; };
  const msg = (txt, tipo = 'erro') => { const m = $('#lgMsg'); m.hidden = !txt; m.textContent = txt || ''; m.className = 'lg-msg ' + tipo; };

  const ERROS = {
    'auth/invalid-email': 'Esse e-mail não parece certo. Confira e tente de novo.',
    'auth/missing-password': 'Digite a senha.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/email-already-in-use': 'Já existe uma conta com esse e-mail. Toque em “Já tenho conta” para entrar.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'Não achamos uma conta com esse e-mail. Toque em “Criar conta”.',
    'auth/too-many-requests': 'Muitas tentativas seguidas. Espere alguns minutos e tente de novo.',
    'auth/network-request-failed': 'Sem conexão com a internet. Conecte-se para entrar.',
    'auth/popup-closed-by-user': '',
    'auth/cancelled-popup-request': '',
    'auth/unauthorized-domain': 'Este endereço ainda não foi liberado no Firebase (Authentication → Configurações → Domínios autorizados).',
    'auth/operation-not-allowed': 'Esse jeito de entrar ainda não foi ativado no Firebase (Authentication → Método de login).',
  };
  const erro = e => {
    const c = (e && e.code) || '';
    if (c.startsWith('auth/api-key')) return msg('A configuração do Firebase está incompleta (js/firebase-config.js).');
    const t = ERROS[c]; if (t !== '') msg(t || 'Algo deu errado. Tente de novo.');
  };

  function modo(criar) {
    criando = criar;
    $('#lgCampoNome').hidden = !criar;
    $('#lgTitulo').textContent = criar ? 'Crie sua conta' : 'Entre para jogar';
    $('#lgEnviar').textContent = criar ? 'CRIAR CONTA' : 'ENTRAR';
    $('#lgModo').textContent = criar ? 'Já tenho conta' : 'Criar conta';
    $('#lgSenha').autocomplete = criar ? 'new-password' : 'current-password';
    msg('');
  }
  $('#lgModo').addEventListener('click', () => modo(!criando));

  $('#lgGoogle').addEventListener('click', async () => {
    msg('');
    const prov = new GoogleAuthProvider();
    prov.setCustomParameters({ prompt: 'select_account' });
    try { await signInWithPopup(auth, prov); }
    catch (e) {
      // Em alguns celulares (e no app instalado no iPhone) a janela não abre: entra pela página do Google.
      if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment'].includes(e.code)) {
        espera('Abrindo o Google…'); signInWithRedirect(auth, prov);
      } else erro(e);
    }
  });
  getRedirectResult(auth).catch(erro);

  $('#lgForm').addEventListener('submit', async ev => {
    ev.preventDefault(); msg('');
    const email = $('#lgEmail').value.trim(), senha = $('#lgSenha').value;
    const nome = $('#lgNome').value.trim();
    if (criando && !nome) { msg('Conta pra gente como quer ser chamado.'); $('#lgNome').focus(); return; }
    $('#lgEnviar').disabled = true;
    try {
      if (criando) {
        nomeNovo = nome; // a conta fica pronta antes do nome ser gravado nela
        const r = await createUserWithEmailAndPassword(auth, email, senha);
        await updateProfile(r.user, { displayName: nome });
      } else await signInWithEmailAndPassword(auth, email, senha);
    } catch (e) { erro(e); }
    $('#lgEnviar').disabled = false;
  });

  $('#lgEsqueci').addEventListener('click', async () => {
    const email = $('#lgEmail').value.trim();
    if (!email) { msg('Digite seu e-mail no campo acima e toque de novo em “Esqueci a senha”.'); $('#lgEmail').focus(); return; }
    try { await sendPasswordResetEmail(auth, email); msg('Mandamos um link para ' + email + '. Confira também o spam.', 'ok'); }
    catch (e) { erro(e); }
  });

  /* ---------- entrar e carregar o progresso ---------- */
  onAuthStateChanged(auth, async user => {
    if (!user) {
      uid = null; perfil = null;
      if (jogo.S.dono) jogo.sair(); else jogo.show('login');
      espera(''); modo(false);
      return;
    }
    espera('Carregando seu progresso…');
    perfil = { nome: nomeNovo || user.displayName || (user.email || 'Jogador').split('@')[0], email: user.email || '' };
    nomeNovo = '';
    const local = jogo.S;
    let snap = null;
    try { snap = await getDoc(doc(db, 'jogadores', user.uid)); } catch (e) { snap = null; }

    let estado, novo = false;
    if (snap && snap.exists()) estado = snap.data().estado || {};
    else if (snap) { novo = true; estado = local.dono && local.dono !== user.uid ? {} : local; } // conta nova leva o que foi jogado antes do login
    else if (local.dono === user.uid) estado = local;                                            // sem internet: usa a cópia deste aparelho
    else { espera(''); msg('Sem conexão para carregar seu progresso. Conecte-se à internet e abra de novo.'); return; }

    uid = user.uid;
    jogo.entrar({ ...estado, dono: user.uid }, perfil);
    espera('');
    if (novo) enviar();
  });
}
