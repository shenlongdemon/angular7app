import { ENV } from '../config';

const API = {
  LOGIN_MASTER: (): string => {
    return `${ENV.HOST}/auth/login/master`;
  },
  VERIFY_CODE: (): string => {
    return `${ENV.HOST}/auth/verify/device`;
  },
  LOGIN_USER: (): string => {
    return `${ENV.HOST}/auth/login/normal`;
  },
  RESEND_VERIFY_CODE: (): string => {
    return `${ENV.HOST}/auth/login/user`;
  },
  GET_OPERATIONS: (): string => {
    return `${ENV.HOST}/operation/list`;
  },
  GET_COMPANY_SETTING: (): string => {
    return `${ENV.HOST}/company/setting`;
  },
  GET_OPERATION_BY_ID: (id: string): string => {
    return `${ENV.HOST}/operation/id=${id}`;
  },
  GET_QUICK_MENUS: (): string => {
    return `${ENV.HOST}/business/quickmenu`;
  }
};

export { API };

