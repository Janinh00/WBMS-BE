export const ENV = { ...process.env };

export const Configs = {
  SITE_TYPE: ENV.WBMS_SITE_TYPE,
  SITE_CODE: ENV.WBMS_SITE_CODE,
  BONTRIP_SUFFIX: ENV.WBMS_BONTRIP_SUFFIX,
  BONTRIP_SUFFIX_BACKDATED_FORM: ENV.WBMS_BONTRIP_SUFFIX_BACKDATED_FORM,
  BONTRIP_SUFFIX_BACKDATED_TEMPLATE: ENV.WBMS_BONTRIP_SUFFIX_BACKDATED_TEMPLATE
};
export const WBMS_JWT_KEY = ENV.WBMS_JWT_KEY;
export const WBMS_JWT_AT_KEY = ENV.WBMS_JWT_AT_KEY;
export const WBMS_JWT_RT_KEY = ENV.WBMS_JWT_RT_KEY;

// 4:15 harus dirubah, ini sementara, status ini tidak valid, seharusnya 4:20
export const edispatchUrlMapping = {
  1: {
    10: {
      0: '/wb/transaction-pks/normal-in'
    },
    20: {
      15: '/wb/transaction-pks/cancel'
    },
    40: {
      10: '/wb/transaction-pks/normal-out',
      15: '/wb/transaction-pks/cancel'
    },
    50: {
      20: '/wb/transaction-pks/cancel'
    },
    60: { 26: '/wb/transaction-pks/reject' }
  },
  2: {
    10: { 0: '/wb/transaction-t30/normal' },
    20: { 3: '/wb/transaction-t30/cancel' },
    50: { 20: '/wb/transaction-t30/cancel' }
  },
  3: {
    50: { 20: '/wb/bulking-transaction/normal' }
  }
};
