import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { setPaginatedResponse, setPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
 baseurl = environment.apiUrl;
 private http = inject(HttpClient);
 paginatedResult = signal<PaginatedResult<Message[]> | null> (null);

 getMessages(pageNumber: number, pageSize: number, container: string){
  let params = setPaginationHeaders(pageNumber,pageSize);

  params = params.append('Container',container);

  return this.http.get<Message[]>(this.baseurl + 'messages', {observe: 'response', params})
        .subscribe({
           next: response => setPaginatedResponse(response, this.paginatedResult)
        })
 }

 getMessageThread(username: string){
  return this.http.get<Message[]>(this.baseurl + 'messages/thread/'+username );
 }
 sendMessage(username: string, content: string){
  return this.http.post<Message>(this.baseurl + 'messages',{recipientUserName: username, content});
 }
 deleteMessage(id: number){
  return this.http.delete(this.baseurl + 'messages/'+ id);
 }
}
