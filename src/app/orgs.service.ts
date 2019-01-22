import { Injectable } from '@angular/core';
import { VolubleRequest } from './voluble-request';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrgsService {

  constructor(private httpClient: HttpClient) { }

  createNewOrganization(organization: { name: string, phone_number: string }): Observable<VolubleRequest<any>> {
    let url = `${environment.volubleApiUrl}/orgs`
    return this.httpClient.post<VolubleRequest<any>>(url, organization)
  }

  addUserToOrganization(organization_id: string, auth0_user_id: string): Observable<VolubleRequest<any>> {
    let url = `${environment.volubleApiUrl}/orgs/${organization_id}/users`
    return this.httpClient.post<VolubleRequest<any>>(url, { auth0_id: auth0_user_id })
  }
}
