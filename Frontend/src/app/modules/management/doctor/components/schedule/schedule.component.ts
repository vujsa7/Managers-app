import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shift } from '@app/modules/management/models/shift.model';
import { Doctor } from '@app/shared/models/doctor.model';
import { Holiday } from '../../models/holiday.model';
import { OnCallShift } from '../../models/on-call-shift.model';
import { WorkdayShift } from '../../models/workday-shift.model';
import { DoctorManagementService } from '../../services/doctor-management.service';

@Component({
  selector: 'doctor-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  roomId: string = "";
  doctorId!: number;
  doctor!: Doctor;
  assignShiftDialogVisible: boolean = false;
  assignHolidayDialogVisible: boolean = false;
  assignOnCallShiftDialogVisible: boolean = false;
  shifts: WorkdayShift[] = [];
  onCallShifts: OnCallShift[] = [];
  holidays: Holiday[] = [];
  infoDialogTitle: string = "";
  infoDialogMessage: string = "";
  infoDialogButtonText: string = "";
  isInfoDialogVisible: boolean = false;
  newShift!: Shift;
  deleteShiftDialogVisible: boolean = false;
  deleteOnCallShiftDialogVisible: boolean = false;
  title: string = "";
  description: string = "";
  deleteWorkdayId: number = -1;
  deleteOnCallShiftId: number = -1;
  update: boolean = false;
  holidayId: number = -1;

  constructor(private doctorManagementService: DoctorManagementService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.doctorId = parseInt(params['id']);
      this.doctorManagementService.getDoctor(this.doctorId).subscribe(
        data => {
          this.doctor = data;
        }
      );
      this.doctorManagementService.getShiftWorkdaysForDoctor(this.doctorId).subscribe(
        data => {
          this.shifts = data;
        }
      );
      this.doctorManagementService.getHolidays(this.doctorId).subscribe(
        data => {
          this.holidays = data;
        }
      );
      this.doctorManagementService.getOnCallShifts(this.doctorId).subscribe(
        data => {
          this.onCallShifts = data;
        }
      );
    })
  }

  toggleAssignShiftDialog(): void {
    this.assignShiftDialogVisible = !this.assignShiftDialogVisible;
  }

  toggleAssignOnCallShiftDialog(): void {
    this.assignOnCallShiftDialogVisible = !this.assignOnCallShiftDialogVisible;
  }

  toggleAssignHolidayDialog(): void {
    this.update = false;
    this.assignHolidayDialogVisible = !this.assignHolidayDialogVisible;
  }

  onNotifyFromAssignShiftDialog(messenger: any): void {
    this.assignShiftDialogVisible = false;
    if (messenger.result == "assignedShift") {
      this.showInfoDialog("Assigned shift", "The shift has successfully been added to the doctor.", "Okay");
      this.doctorManagementService.getShift(messenger.workday.shiftId).subscribe(
        data => {
          this.newShift = data;
        }
      );
    } else if (messenger.result == "badRequest") {
      this.showInfoDialog("Bad request", "Unable to assign shift to doctor.", "Okay");
    }
  }

  onNotifyFromDoctorScheduleCalendar(messenger: any): void {
    if (messenger.id.includes("workday")) {
      this.deleteWorkdayId = parseInt(messenger.id.slice(0, -8));
      this.title = "Delete workday?";
      this.description = "Are you sure you want to remove " + this.doctor.name + " " + this.doctor.surname + " from this working this day?"
      this.deleteShiftDialogVisible = true;
    }
    if (messenger.id.includes("onCallShift")) {
      this.deleteOnCallShiftId = parseInt(messenger.id.slice(0, -11));
      this.title = "Delete On-Call Shift?";
      this.description = "Are you sure you want to remove " + this.doctor.name + " " + this.doctor.surname + " from this working this day?"
      this.deleteOnCallShiftDialogVisible = true;
    }
    if (messenger.id.includes("holiday")) {
      this.assignHolidayDialogVisible = true;
      this.update = true;
      this.holidayId = parseInt(messenger.id.slice(0, -7));
    }
  }

  onNotifyFromAssignOnCallShiftDialog(message: string): void {
    if (message == "close") {
      this.assignOnCallShiftDialogVisible = false;
    } else if (message == "assigned") {
      this.assignOnCallShiftDialogVisible = false;
      this.showInfoDialog("Successful", "Sucessfuly added on-call shift in Dr. " + this.doctor.name + " " + this.doctor.surname + "'s schedule.", "Okay");
      this.reload();
    }
  }

  onNotifyCloseHolidayDialog(): void {
    this.update = false;
    this.assignHolidayDialogVisible = false;
  }

  showInfoDialog(title: string, message: string, buttonText: string) {
    this.infoDialogTitle = title;
    this.infoDialogMessage = message;
    this.infoDialogButtonText = buttonText;
    this.isInfoDialogVisible = true;
  }

  onInfoDialogNotify(message: string): void {
    if (message == "close")
      this.isInfoDialogVisible = false;
  }

  onNotifyConfirmButton(): void {
    this.deleteShiftDialogVisible = false;
    if (this.deleteWorkdayId != -1)
      this.doctorManagementService.removeShiftFromDoctor(this.deleteWorkdayId).subscribe(
        data => {
          this.reload();
          this.showInfoDialog("Removed workday", "Sucessfuly removed workday from Dr. " + this.doctor.name + " " + this.doctor.surname + "'s schedule.", "Okay");
        }
      );
  }

  onNotifyCancelButton(): void {
    this.deleteShiftDialogVisible = false;
    this.deleteWorkdayId = -1;
  }

  onNotifyConfirmOnCallShiftButton(): void {
    this.deleteOnCallShiftDialogVisible = false;
    this.doctorManagementService.deleteOnCallShift(this.deleteOnCallShiftId).subscribe();
  }

  onNotifyCancelOnCallShiftButton(): void {
    this.deleteOnCallShiftDialogVisible = false;
  }

  reload(): void {
    document.location.reload();
  }

  onNotifyCloseDialog(message: string): void {
    if (message == "close") {
      this.assignShiftDialogVisible = false;
      this.assignOnCallShiftDialogVisible = false;
    }
    else if (message == "badRequest") {
      this.assignShiftDialogVisible = false;
      this.assignOnCallShiftDialogVisible = false;
    }
  }

}
