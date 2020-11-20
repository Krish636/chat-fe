import { WebSocketAPI } from './../service/websocket.service';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  users: any[] = [];
  userFormControl = new FormControl('', [Validators.required]);
  messageFormControl = new FormControl('', [Validators.required]);
  chatWith!: string;
  message!: string;
  incomingMessage!: string;
  webSocketAPI!: WebSocketAPI;
  currentUser = sessionStorage.getItem('name');
  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI(new ChatComponent(this.userService));
    this.getAllUsers();
    this.webSocketAPI._connect();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      console.log(response);
      this.users = response;
      this.chatWith = this.users[0];
    });
  }

  addUser() {
    if (this.userFormControl.valid) {
      this.userService
        .addUser(this.userFormControl.value)
        .subscribe((response) => {
          this.getAllUsers();
        });
    } else {
      alert('user should not be empty');
    }
  }

  chat(user: any) {
    this.chatWith = user;
  }

  sendMessage() {
    if (this.messageFormControl.valid) {
      this.message = this.messageFormControl.value;
      this.webSocketAPI._send(this.message, this.chatWith);
      this.messageFormControl.reset();
    } else {
      alert('You cannot send the empty message');
    }
  }

  handleMessage(message: any) {
    this.incomingMessage = message;
  }
}
