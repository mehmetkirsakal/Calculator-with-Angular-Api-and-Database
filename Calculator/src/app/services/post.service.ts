import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  GetAll(){
    return this.http.get<any>(this.apiUrl+'/api/users');
  }
  GetSum(){
    return this.http.get<any>(this.apiUrl+'/api/sum');
  }
  Find(data){
    return this.http.get<any>(this.apiUrl + '/api/users/' + data);
  }
  DeleteAll(){
    return this.http.delete<any>(this.apiUrl + '/api/users/deleteall');
  }
  Delete(input){
    return this.http.delete<any>(this.apiUrl + '/api/users/' + input);
  }
  Send(obj:Post){
    return this.http.post(this.apiUrl + '/api/users',obj);
  }
  Update(obj:Post,input){
    return this.http.put(this.apiUrl + '/api/users/' + input,obj);
  }
}
