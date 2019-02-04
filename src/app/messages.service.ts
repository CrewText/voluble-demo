import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { VolubleRequest } from './voluble-request'
import { Contact } from './contacts/contact';
import { Message } from 'voluble-common'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiBaseUrl = `${environment.volubleApiUrl}`
  constructor(private httpClient: HttpClient) { }

  get100Messages(offset: number = 0): Observable<VolubleRequest<Message[]>> {
    return this.httpClient.get<VolubleRequest<Message[]>>(`${this.apiBaseUrl}/messages`)
      .pipe(retry(3))
  }

  getMessage(id: string): Observable<VolubleRequest<Message>> {
    let url = `${this.apiBaseUrl}/messages/${id}`
    return this.httpClient.get<VolubleRequest<Message>>(url)
      .pipe(retry(3))
  }

  getContactDetails(id: string): Observable<VolubleRequest<Contact>> {
    let url = `${this.apiBaseUrl}/contacts/${id}`
    return this.httpClient.get<VolubleRequest<Contact>>(url)
      .pipe(retry(3))
  }

  sendMessage(msg: { msg_body: string, contact_id: string, servicechain_id: string }): Observable<VolubleRequest<Message>> {
    let url = `${this.apiBaseUrl}/messages`
    return this.httpClient.post<VolubleRequest<Message>>(url, msg)
  }
}