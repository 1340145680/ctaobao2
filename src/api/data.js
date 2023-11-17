import axios from '@/utils/axios'

export function getDataApi() {
    return axios.get(`card`);
  }