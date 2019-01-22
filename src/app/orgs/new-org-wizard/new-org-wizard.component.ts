import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { OrgsService } from 'src/app/orgs.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-new-org-wizard',
  templateUrl: './new-org-wizard.component.html',
  styleUrls: ['./new-org-wizard.component.css']
})
export class NewOrgWizardComponent implements OnInit {

  @ViewChild("wizardxl") wizard: ClrWizard
  @ViewChild("confirm_page") confirmPage: ClrWizardPage

  constructor(private orgsService: OrgsService,
    private authService: AuthService) { }
  public wizardOpen = true

  public org_name: string
  public org_phone_number: string

  public show_spinner = false

  public createOrganization() {

  }

  public onCommit() {
    this.show_spinner = true
    this.orgsService.createNewOrganization({
      name: this.org_name,
      phone_number: this.org_phone_number
    })
      .subscribe((orgReq) => {
        console.log(orgReq)
        this.show_spinner = false
        // this.orgsService.addUserToOrganization(orgReq.data["id"], this.authService.getLoggedInUserId())
        //   .subscribe((userReq) => {
        //     console.log(userReq)
        //     this.show_spinner = false
        //   })
      })
  }

  ngOnInit() {
  }

}
