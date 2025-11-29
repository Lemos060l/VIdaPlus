export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Mínimo 8 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Uma letra maiúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Uma letra minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Um número');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  cpf: (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, '');

    if (cleanCpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1{10}$/.test(cleanCpf)) {
      return false;
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanCpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanCpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanCpf.substring(10, 11))) {
      return false;
    }

    return true;
  },

  phone: (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  },

  crm: (crm: string): boolean => {
    const cleanCrm = crm.replace(/\D/g, '');
    return cleanCrm.length >= 4 && cleanCrm.length <= 8;
  },

  fullName: (name: string): boolean => {
    const trimmed = name.trim();
    return trimmed.length >= 3 && trimmed.split(' ').length >= 2;
  },
};

export const formatters = {
  cpf: (cpf: string): string => {
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length === 11) {
      return `${cleanCpf.substring(0, 3)}.${cleanCpf.substring(3, 6)}.${cleanCpf.substring(6, 9)}-${cleanCpf.substring(9)}`;
    }
    return cpf;
  },

  phone: (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 11) {
      return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 7)}-${cleanPhone.substring(7)}`;
    }
    if (cleanPhone.length === 10) {
      return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 6)}-${cleanPhone.substring(6)}`;
    }
    return phone;
  },

  crm: (crm: string): string => {
    const cleanCrm = crm.replace(/\D/g, '');
    if (cleanCrm.length > 0) {
      return cleanCrm;
    }
    return crm;
  },
};
