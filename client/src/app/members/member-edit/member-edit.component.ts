import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { AccountsService } from '../../_services/accounts.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from "../photo-editor/photo-editor.component";
import { DatePipe } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule, PhotoEditorComponent,TimeagoModule, DatePipe],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload',['$event']) notify($event : any){
    if(this.editForm?.dirty){
      $event.retunValue = true;
    }
  } 
  private accountService = inject(AccountsService);
  private memberServices = inject(MembersService);
  private toastr = inject(ToastrService);
  member?: Member;

  ngOnInit(): void {
    this.loadMemeber();
  }
  
  loadMemeber(){
    const user = this.accountService.currentUser();
    if(!user) return;
    this.memberServices.getMember(user.username).subscribe({
      next: member => this.member = member
    })
  }

  updateMember(){
    this.memberServices.updateMember(this.editForm?.value).subscribe({
      next: _=>{
        this.toastr.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })
    
  }

  onMemberChange(event: Member){
    this.member = event;
  }
}
