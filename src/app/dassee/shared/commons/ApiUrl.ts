import { environment } from '../../../../environments/environment';

const API = {
  LOGIN: (): string => {
    return `${environment.HOST}/api/sellrecognizer/login`;
  },
};

export { API };

