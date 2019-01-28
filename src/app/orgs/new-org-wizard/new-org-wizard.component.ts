import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { OrgsService } from 'src/app/orgs.service';
import { AuthService } from 'src/app/auth.service';
import { ContactsService } from 'src/app/contacts.service';
import { Contact } from 'src/app/contacts/contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-org-wizard',
  templateUrl: './new-org-wizard.component.html',
  styleUrls: ['./new-org-wizard.component.css']
})
export class NewOrgWizardComponent implements OnInit {

  @ViewChild("wizardxl") wizard: ClrWizard
  @ViewChild("confirm_page") confirmPage: ClrWizardPage

  constructor(private orgsService: OrgsService,
    private authService: AuthService,
    private contactsService: ContactsService,
    private router: Router) { }
  public wizardOpen = false

  public org_name: string
  public org_phone_number: string

  public is_loading = false
  public loading_text = ""

  public onCommit() {
    this.is_loading = true
    this.loading_text = "Creating new organization"
    this.orgsService.createNewOrganization({
      name: this.org_name,
      phone_number: this.org_phone_number
    })
      .toPromise()
      .then((orgReq) => {
        console.log("Creating Organization")
        console.log(orgReq)

        this.is_loading = false
        if (orgReq.status == "success") {
          this.wizardOpen = false
        }
        return
      })
      .then(() => {
        console.log("Renewing session for ID token")
        this.authService.renewSession2()
          .catch((err) => {
            this.authService.login()
          })
      })
      .then(() => {
        console.log("Moving back to homepage")
        this.router.navigate(['/'])
      })

    // Set up a default servicechain?


    // // Create new contact with user details, add it to the org
    // let contact:Contact = {
    //   OrganizationId:orgReq.data.id,
    //   ServicechainId:org
    // }


  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/'])
    }
    this.wizardOpen = true
  }

}
