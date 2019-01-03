import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from './messages/message';

interface VolubleRequest<T> {
  status: "success" | "error" | "fail",
  data: T
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiBaseUrl = `http://${environment.volubleApiUrl}`
  constructor(private httpClient: HttpClient) { }

  get100Messages(offset: number = 0): Observable<VolubleRequest<Message[]>> {
    return this.httpClient.get<VolubleRequest<Message[]>>(`${this.apiBaseUrl}/messages`)
      .pipe(retry(3))
  }

  getMessage(id: string): Observable<VolubleRequest<Message>> {
    let url = `${this.apiBaseUrl}/messages/${id}`
    console.log("Reqing URL " + url)
    return this.httpClient.get<VolubleRequest<Message>>(url)
      .pipe(retry(3))
  }
}