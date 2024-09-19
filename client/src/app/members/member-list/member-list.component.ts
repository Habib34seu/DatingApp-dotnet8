import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  private memberServices = inject(MembersService);
  members: Member[]=[];
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberServices.getMembers().subscribe({
      next: members => this.members = members
    })
  }
}
