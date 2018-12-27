import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Message } from './messages/message'
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

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

  // private getNewAuthToken(): Observable<string> {

  // }

  get100Messages(offset: number = 0): Observable<VolubleRequest<Message[]>> {
    let msgs: Message[]
    const httpOptions = {

      headers: new HttpHeaders({
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UaEJSa0U0TlVVMU5qVXdSVVJGTnpneVJEVkdNRU0wUlRsQ05qTTJOVFUzUmpFNVF6SkJOUSJ9.eyJpc3MiOiJodHRwczovL3ZvbHVibGUtZGV2LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJrR09WZmNKdVF6Um1zMDc3T21rZ2NtdjN3TkdIa2dVZEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly92b2x1YmxlLXBvYy5oZXJva3VhcHAuY29tIiwiaWF0IjoxNTQ1ODM5MzExLCJleHAiOjE1NDU5MjU3MTEsImF6cCI6ImtHT1ZmY0p1UXpSbXMwNzdPbWtnY212M3dOR0hrZ1VkIiwic2NvcGUiOiJ2b2x1YmxlOmFkbWluIHNlcnZpY2VjaGFpbjpkZWxldGUgc2VydmljZWNoYWluOmVkaXQgc2VydmljZWNoYWluOmFkZCBzZXJ2aWNlY2hhaW46dmlldyBzZXJ2aWNlOnZpZXcgb3JnYW5pemF0aW9uOm93bmVyIG9yZ2FuaXphdGlvbjpkZWxldGUgb3JnYW5pemF0aW9uOmVkaXQgdXNlcjp2aWV3IHVzZXI6ZGVsZXRlIHVzZXI6ZWRpdCB1c2VyOmFkZCBibGFzdDpzZW5kIG1lc3NhZ2U6c2VuZCBtZXNzYWdlOnJlYWQgY29udGFjdDpkZWxldGUgY29udGFjdDplZGl0IGNvbnRhY3Q6dmlldyBjb250YWN0OmFkZCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.CVbCKDHPCooDujbKr4EcAzPj4jmAOd8rlJlZjcokRZINBPPT95tIC5kyTo3q6pyDHvPmyzMHOS1cSZPHpYC5Z7wEBqmUKXbjY451742fhWOlwKA8wxjEFRPhvtY6kKxva9bx79e6ZpvLZ_Skq94UxeWIlatketjlk1cqDOZYqNtsQfJAhgJM7loJmm5HE1sxxDBD-jSfLebf26IrAhyhvry9d0JPAZo5_nFPyGvk--YU6mxOvwiDd_LCKoYeUHUsgCCJ7jbpNUdUgG7a2FLuj2PBoS1P14ENLBPGaFFLoRH_1b4fNe4bfeh3J3BhGMyf2Pi3ZcAC2QgjrBwmufMd6g',
      }),
    }
    return this.httpClient.get<VolubleRequest<Message[]>>(`${this.apiBaseUrl}/messages`, httpOptions)
      .pipe(retry(3))
  }
}
