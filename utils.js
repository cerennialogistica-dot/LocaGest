(function () {
  window.Utils = {
    id() { return (window.Store && Store.id) ? Store.id() : (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)); },
    esc(v='') { return String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); },
    money(v=0) { return Number(v || 0).toLocaleString('pt-BR', { style:'currency', currency:'BRL' }); },
    date(v) { if (!v) return '-'; const [y,m,d] = v.split('-'); return `${d}/${m}/${y}`; },
    daysUntil(v) { return Math.ceil((new Date(v+'T12:00:00') - new Date()) / 86400000); },
    download(name, content, type='text/csv;charset=utf-8') { const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([content],{type})); a.download=name; a.click(); URL.revokeObjectURL(a.href); }
  };
})();
