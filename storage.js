(function () {
  'use strict';
  const PREFIX = 'locagest_fb_cache_';
  let uid = '';
  let cache = {};
  let userRef = null;
  let listener = null;

  function localKey(){ return PREFIX + (uid || 'guest'); }
  function readLocal(){
    try { cache = JSON.parse(localStorage.getItem(localKey())) || {}; }
    catch { cache = {}; }
  }
  function writeLocal(){
    try { localStorage.setItem(localKey(), JSON.stringify(cache)); } catch {}
  }
  function normalize(v, fallback){ return v === undefined || v === null ? fallback : v; }

  window.Store = {
    get(key, fallback = []) { return normalize(cache[key], fallback); },
    set(key, value) {
      cache[key] = value;
      writeLocal();
      if (userRef) userRef.child('dados/' + key).set(value).catch(err => console.error('Firebase set', key, err));
    },
    remove(key) {
      delete cache[key]; writeLocal();
      if (userRef) userRef.child('dados/' + key).remove().catch(err => console.error('Firebase remove', key, err));
    },
    id() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); },
    uid() { return uid; },
    async flush(){ if(userRef) await userRef.child('dados').set(cache); }
  };

  const api = {};
  window.LocaFirebase = api;
  const ready = new Promise(resolve => {
    if (!window.firebase || !window.LOCAGEST_FIREBASE_CONFIG) {
      console.error('Firebase SDK/configuração não carregados.');
      resolve(null); return;
    }
    if (!firebase.apps.length) firebase.initializeApp(window.LOCAGEST_FIREBASE_CONFIG);
    const auth = firebase.auth();
    const db = firebase.database();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(console.error);

    auth.onAuthStateChanged(async user => {
      if (listener && userRef) userRef.child('dados').off('value', listener);
      listener = null; userRef = null; uid = user ? user.uid : ''; cache = {};
      if (!user) { resolve(null); window.dispatchEvent(new CustomEvent('locagest-auth-changed',{detail:null})); return; }
      readLocal();
      userRef = db.ref('usuarios/' + uid);
      try {
        const snap = await userRef.child('dados').once('value');
        const remote = snap.val();
        if (remote && typeof remote === 'object') cache = remote;
        writeLocal();
        listener = userRef.child('dados').on('value', s => {
          const val = s.val(); cache = val && typeof val === 'object' ? val : {}; writeLocal();
          window.dispatchEvent(new CustomEvent('locagest-data-changed'));
        });
      } catch (e) { console.error('Falha ao carregar dados do Firebase', e); }
      resolve(user);
      window.dispatchEvent(new CustomEvent('locagest-auth-changed',{detail:user}));
    });

    Object.assign(api, {
      auth, db,
      currentUser: () => auth.currentUser,
      async signIn(email,password){ return auth.signInWithEmailAndPassword(email.trim(),password); },
      async signUp(email,password,profile){
        const cred = await auth.createUserWithEmailAndPassword(email.trim(),password);
        uid = cred.user.uid; userRef = db.ref('usuarios/' + uid); cache = {};
        const p = {...profile,id:uid,email:cred.user.email,status:'Ativo'};
        cache.locadores=[p]; cache.settingsByLocador={}; cache.lastPage='dashboard';
        await userRef.child('dados').set(cache); writeLocal();
        return cred;
      },
      async signOut(){ return auth.signOut(); },
      async updatePassword(password){ if(auth.currentUser) return auth.currentUser.updatePassword(password); },
      friendlyError(err){
        const code=err?.code||'';
        const map={
          'auth/invalid-email':'E-mail inválido.', 'auth/missing-password':'Informe a senha.',
          'auth/invalid-credential':'E-mail ou senha incorretos.', 'auth/wrong-password':'E-mail ou senha incorretos.',
          'auth/user-not-found':'E-mail ou senha incorretos.', 'auth/email-already-in-use':'Este e-mail já possui cadastro.',
          'auth/weak-password':'A senha precisa ter pelo menos 6 caracteres.', 'auth/too-many-requests':'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
          'auth/requires-recent-login':'Por segurança, saia e entre novamente antes de alterar a senha.',
          'auth/network-request-failed':'Falha de conexão com a internet.'
        }; return map[code] || ('Não foi possível concluir: ' + (err?.message||code));
      }
    });
  });
  api.ready = ready;
})();
