import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { VolubleRequest } from './voluble-request'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpClient: HttpClient) {
  }

  getContacts(): Observable<VolubleRequest<any[]>> {
    return this.httpClient.get<VolubleRequest<any[]>>(`${environment.volubleApiUrl}/contacts`)
      .pipe(retry(3))
  }
}
