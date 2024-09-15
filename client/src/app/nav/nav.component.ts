import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../_services/accounts.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountsService);
  private router = inject(Router);
  model: any = {};

  login(){
    this.accountService.login(this.model).subscribe({
      next: _ => {
         this.router.navigateByUrl('/members')
      },
      error : error => console.log(error)
    })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
