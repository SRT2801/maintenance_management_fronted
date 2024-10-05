import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.BASE_URL
  constructor() {}


  async getData(endpoint: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud GET', error);
      throw error;
    }
  }

  
  async postData(endpoint: string, data: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud POST', error);
      throw error;
    }
  }
}
