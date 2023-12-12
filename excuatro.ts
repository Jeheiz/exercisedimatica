import { Component, OnInit } from '@angular/core';
import { Subject, timer, concat } from 'rxjs';
import { switchMap, debounceTime, takeUntil, startWith } from 'rxjs/operators';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: `
    <input type="text" [(ngModel)]="query" (ngModelChange)="querySubject.next($event)">
    <div *ngFor="let user of users">
        {{ user.email }}
    </div>
  `
})
export class AppUsers implements OnInit {

  query = '';
  querySubject = new Subject<string>();
  users: { email: string; }[] = [];
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    concat(
      of(this.query),
      this.querySubject.asObservable()
    ).pipe(
      debounceTime(300), // Esperar 300ms después del último evento
      switchMap(q => timer(0, 60000).pipe(startWith(0))), // Búsqueda inmediata, luego cada 60 segundos
      switchMap(() => this.userService.findUsers(this.query)),
      takeUntil(this.destroy$) // Asegura la limpieza
    ).subscribe({
      next: (res) => this.users = res,
      error: (err) => console.error(err) // Manejo de errores
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
