import { Component } from '@angular/core';
import { ZoomService } from '../zoom.service';


@Component({
  selector: 'app-createmeet',
  templateUrl: './createmeet.component.html',
  styleUrls: ['./createmeet.component.css']
})
export class CreatemeetComponent {
 constructor(private zoomservice:ZoomService){}


  isModalOpen: boolean = false;

  // Meeting data object
  meetingData = {
    topic: '',
    type: 1, // Default: Instant Meeting
    start_time: '', 
    duration: 30, // Default duration in minutes
    timezone: this.getCurrentTimezone(), // Timezone set to current time by default
    agenda: ''
  };

  // Open modal
  openModal() {
    this.isModalOpen = true;
    if (this.meetingData.type === 1) {
      this.setInstantMeetingTimezone(); // Set current timezone for instant meetings
    }
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Handle meeting type change
  onTypeChange() {
    if (this.meetingData.type === 1) {
      this.setInstantMeetingTimezone(); // For instant meeting, set current timezone
    } else {
      this.meetingData.timezone = ''; // Clear timezone for scheduled meetings
    }
  }

  // Set timezone to current date and time for instant meetings
  setInstantMeetingTimezone() {
    const now = new Date();
    this.meetingData.timezone = now.toISOString(); // Set timezone in ISO format
    this.meetingData.start_time = now.toISOString(); // Set current time as start time for instant meetings
  }

  // Get current timezone as a formatted string
  getCurrentTimezone(): string {
    const now = new Date();
    return now.toISOString();
  }

  // Create meeting method
  createMeeting() {
    console.log('Meeting Data: ', this.meetingData);  
    this.zoomservice.createMeet(this.meetingData).subscribe({
      next:(response:any)=>{
        console.log("meeting created successfully");
        console.log(response);
        

      },error:(error:any)=>{
        console.log("error", error.error);
        
      }
        
    })
    // Logic for creating the meeting (e.g., sending data to API)
    this.closeModal(); // Close the modal after submission
  }

}
