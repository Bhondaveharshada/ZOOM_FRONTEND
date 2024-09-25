import { Component, OnInit, Inject, NgZone } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  
  authEndpoint = 'http://localhost:4000/signature'
  sdkKey = 'v_ILNsd6RIaXDo60R4yviQ'
  meetingNumber = '88419952916'
  passWord = 'yR03k9'
  role = 0
  userName = 'Angular'
  userEmail = ''
  registrantToken = ''
  zakToken = ''
  leaveUrl = 'http://localhost:4200'

  client = ZoomMtgEmbedded.createClient();
  

  constructor(public httpClient: HttpClient, @Inject(DOCUMENT) document, private ngZone: NgZone) {

  }

  ngOnInit() {
    
  }

  
  getSignature() {
    this.httpClient.post(this.authEndpoint, {
        meetingNumber: this.meetingNumber,
        role: this.role
    }).subscribe({
      next:(data: any) => {
        console.log("signature", data.signature);
        
        if (data.signature) {
          console.log(data.signature);
          this.startMeeting(data.signature);
        } else {
          console.log(data);
        }
      }, error:(error) => {
        console.log(error);
      }
      });
    
  }
  
  startMeeting(signature:any) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    this.ngZone.runOutsideAngular(() => {
      this.client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true, leaveOnPageUnload: true}).then(() => {
        console.log("zoom initialized");
        
        this.client.join({
          signature: signature,
          sdkKey: this.sdkKey,
          meetingNumber: this.meetingNumber,
          password: this.passWord,
          userName: this.userName,
          userEmail: this.userEmail,
          tk: this.registrantToken,
          zak: this.zakToken
        }).then(() => {
          console.log('joined successfully')
        }).catch((error) => {
          console.log(error)
        })
      }).catch((error) => {
        console.log(error)
      })
    })
  }
}
