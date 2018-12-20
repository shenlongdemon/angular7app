const ENV : any = {
  HOST: 'http://192.168.0.102:5000'
};
const API = {
  LOGIN: (): string => {
    return `${ENV.HOST}/api/sellrecognizer/login`;
  },
};

export { API };

