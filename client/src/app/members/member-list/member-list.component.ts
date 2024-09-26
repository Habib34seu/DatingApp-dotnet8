import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from "../member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccountsService } from '../../_services/accounts.service';
import { UserParams } from '../../_models/userParams';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, PaginationModule, FormsModule, ButtonsModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
   //private accountService = inject(AccountsService);
   memberServices = inject(MembersService);
   //userParams = new UserParams(this.accountService.currentUser());
   genderList =[{value: 'male', display:'Males'},{value: 'female', display:'Females'}]

  ngOnInit(): void {
    if(!this.memberServices.paginatedResult()) this.loadMembers();
  }

  loadMembers(){
    this.memberServices.getMembers()
  }

  resetFilters(){
    this.memberServices.resetUserParam();
    this.loadMembers();
  }
  pageChanged(event:any){
    debugger;
    if(this.memberServices.userParams().pageNumber != event.page){
      this.memberServices.userParams().pageNumber = event.page;
      this.loadMembers();
    }
  }
}
