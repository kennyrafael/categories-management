import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) { }

  getCategories($filter?:string){
    const endpoint = `${this.API}/categories` + ($filter ? `?filter=${$filter}` : '')
    return this.httpClient.get(endpoint)
  }

  getCategory($id){
    const endpoint = `${this.API}/categories/${$id}`
    return this.httpClient.get(endpoint)
  }

  createCategories($category){
    const endpoint = `${this.API}/categories`
    return this.httpClient.post(endpoint, $category)
  }

  editCategories($id, $category){
    const endpoint = `${this.API}/categories/${$id}`
    return this.httpClient.put(endpoint, $category)
  }

  deleteCategories($id){
    const endpoint = `${this.API}/categories/${$id}`
    return this.httpClient.delete(endpoint)
  }
}
