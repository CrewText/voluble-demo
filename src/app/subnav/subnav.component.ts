import { Component, OnInit } from '@angular/core';
import { SubnavService } from '../subnav.service';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.css']
})
export class SubnavComponent implements OnInit {

  constructor(private subNavService: SubnavService) { }

  public subNavLinks = []

  ngOnInit() {
    this.subNavService.getCurrentRouteConfig().subscribe((parentRouteConfig) => {
      if (parentRouteConfig) {
        this.subNavLinks = this.subNavService.getSubNavLinksForRoute(parentRouteConfig)
      } else {
        this.subNavLinks = [];
      }
    })
  }

}
