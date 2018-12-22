import { environment } from '../../../../environments/environment';

const API = {
  LOGIN: (): string => {
    return `${environment.HOST}/api/sellrecognizer/login`;
  },
  SAVE_MATERIAL_PROCESSES: (): string => {
    return `${environment.HOST}/api/sellrecognizer/saveMaterialProcess`;
  },
  GET_MATERIAL_PROCESSES_BY_OWNER_ID: (ownerId): string => {
    return `${environment.HOST}/api/sellrecognizer/getMaterialProcessByOwnerId?id=${ownerId}`;
  },
};

export { API };

