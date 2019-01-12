import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubnavService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  public subNavItems: Observable<any[]>
  public activeMenuItem$: Observable<Route>

  public getCurrentRouteConfig() {
    this.activeMenuItem$ = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((_) => {
        if (this.router.routerState.root.children.length) { return this.router.routerState.root.children[0].snapshot.routeConfig }
        return null
      })
    )
    return this.activeMenuItem$
  }

  public getSubNavLinksForRoute(route: Route): any {
    let config_route = this.router.config.filter((top_route) => {
      if (top_route.path == route.path) {
        return true
      }
    })[0]

    let children = config_route.children.filter((child) => {
      if (child.data && child.data.title) { return true }
    })
      .map((child) => {
        return { title: child.data.title, path: `/${config_route.path}/${child.path}` }
      })

    return children

  }
}
