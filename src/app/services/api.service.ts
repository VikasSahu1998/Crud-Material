import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  postEmp(data: any) {
    return this.http.post<any>("http://localhost:3000/emplist/", data);
  }

  getEmp() {
    return this.http.get<any>("http://localhost:3000/emplist/");
  }

  putEmp(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/emplist/" + id, data);
  }

  deleteEmp(id: number) {
    return this.http.delete<any>("http://localhost:3000/emplist/" + id);
  }
}
