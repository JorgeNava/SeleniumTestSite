import axios from 'axios';

export default class axiosService {

  constructor() {
    this.baseUrl = 'http://localhost:3002';
  }

  async getData(endpoint){
    const TOKEN = JSON.parse(localStorage.getItem("User")).token;

    const config = {
      url: this.baseUrl + endpoint,
      method: "GET",
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    console.log('AXIOS[GET]', config);
    try {
      const resp = await axios(config);
      console.log('AXIOS[RESP]', resp);
      return resp.data
    } catch (err) {
      return err
    }
  };
  
  async postData(endpoint, data) {
    const TOKEN = JSON.parse(localStorage.getItem("User")).token;
    const config = {
      url:  this.baseUrl+endpoint,
      method: "POST",
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: data
    };
    console.log('AXIOS[POST]', config);
    try {
      const resp = await axios(config);
      console.log('AXIOS[RESP]', resp);
      return resp.data
    } catch (err) {
      return err
    }
  };
}
