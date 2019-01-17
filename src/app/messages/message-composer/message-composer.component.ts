import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ContactsService } from 'src/app/contacts.service';
import { MessagesService } from 'src/app/messages.service';
import { Contact } from 'src/app/contacts/contact';
import { ServicechainService } from 'src/app/servicechain.service';
import { Servicechain } from 'src/app/servicechains/servicechain';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-message-composer',
  templateUrl: './message-composer.component.html',
  styleUrls: ['./message-composer.component.css']
})
export class MessageComposerComponent implements OnInit, OnChanges {

  constructor(private contactsService: ContactsService,
    private messagesService: MessagesService,
    private scService: ServicechainService,
    private authService: AuthService) { }

  @Input() message: string = ""
  @Input() contact: Contact
  public servicechainsAvailable: Servicechain[]
  @Input() public servicechain: Servicechain
  public contactsList: Contact[]

  getContacts() {
    this.contactsService.get100Contacts(0)
      .subscribe((contactsReq) => {
        this.contactsList = contactsReq.data
      })
  }

  getServicechainsAvailable() {
    if (this.contact) {
      this.scService.getServicechainsForOrg(this.contact.OrganizationId)
        .subscribe((scsReq) => {
          this.servicechainsAvailable = scsReq.data
        })

      this.scService.getServicechain(this.contact.ServicechainId)
        .subscribe((scReq) => {
          this.servicechain = scReq.data
        })
    }

  }

  ngOnInit() {
    this.getContacts()
    this.getServicechainsAvailable()
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("change")
    console.log(changes)
    if (changes) {
      console.log(changes)
    }
  }

}
