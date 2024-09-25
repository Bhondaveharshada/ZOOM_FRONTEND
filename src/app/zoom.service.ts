import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ZoomService {

  constructor(private http:HttpClient) { }


  createMeet(body:any){
    return this.http.post('http://localhost:3000/create-meeting',body)
   }
}
