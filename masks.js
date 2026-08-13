(function () {
  const only = value => String(value || '').replace(/\D/g, '');
  window.Masks = {
    document(value) {
      const v = only(value).slice(0, 14);
      if (v.length <= 11) return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return v.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    },
    phone(value) {
      const v = only(value).slice(0, 11);
      return v.length > 10 ? v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : v.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    },
    cep(value) { return only(value).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2'); },
    money(value) {
      const n = Number(String(value || '').replace(/\D/g, '')) / 100;
      return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    parseMoney(value) { return Number(String(value || '').replace(/[^\d,-]/g, '').replace(/\./g, '').replace(',', '.')) || 0; }
  };
})();
