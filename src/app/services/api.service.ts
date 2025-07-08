import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  base_url="http://localhost:3000"

  constructor(private http:HttpClient) { }

  display(){
    alert("display function from services")
  }

  addStudent(data:any){
    return this.http.post(`${this.base_url}/Students`,data)
  }

  getStudents(){
    return this.http.get(`${this.base_url}/Students`)
  }

  deleteStudent(id:any){
    return this.http.delete(`${this.base_url}/Students/${id}`)
  }

  getSpecificStudent(id:any){
    return this.http.get(`${this.base_url}/Students/${id}`)
  }
  editStudent(id:any,data:any){
    return this.http.put(`${this.base_url}/Students/${id}`,data)

  }

}
