import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Holiday } from '../../models/holiday.model';
import { DoctorManagementService } from '../../services/doctor-management.service';

@Component({
  selector: 'app-assign-holiday-dialog',
  templateUrl: './assign-holiday-dialog.component.html',
  styleUrls: ['./assign-holiday-dialog.component.scss']
})
export class AssignHolidayDialogComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() doctorId: number = -1;
  @Input() doctorsHolidays: Holiday[] = [];
  @Input() update: boolean = false;
  @Input() holidayId: number = -1;
  @Output() notifyCloseHolidayDialog: EventEmitter<string> = new EventEmitter<string>();
  @Output() notifyReload: EventEmitter<any> = new EventEmitter<any>();
  holiday: Holiday = new Holiday(new Date(), new Date(), -1, "");
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate!: NgbDate;

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private doctorManagementService: DoctorManagementService) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getToday();
  }

  ngOnInit(): void {
    this.holiday.doctorId = this.doctorId;
    if(this.update){
      this.holiday = this.doctorsHolidays.filter(holiday => holiday.id == this.holidayId)[0];
      let start = new Date(this.holiday.start);
      start.setHours(this.getHoursDiff(start));
      start.setMinutes(this.getMinutesDiff(start));
      let end = new Date(this.holiday.end);
      end.setHours(this.getHoursDiff(end));
      end.setMinutes(this.getMinutesDiff(end));
      this.fromDate = new NgbDate(start.getFullYear(), start.getMonth() + 1, start.getDate())
      this.toDate = new NgbDate(end.getUTCFullYear(), end.getUTCMonth() + 1, end.getUTCDate());
    } 
    this.convertNgbDateToDate();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.convertNgbDateToDate();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  convertNgbDateToDate(): void{
    if(this.fromDate != null)
      this.holiday.start = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      this.holiday.start.setHours(this.getHoursDiff(this.holiday.start));
      this.holiday.start.setMinutes(this.getMinutesDiff(this.holiday.start));
    if(this.toDate != null)
      this.holiday.end = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      this.holiday.end.setHours(23);
      this.holiday.end.setMinutes(59);
  }

  getHoursDiff(date: Date): number {
    return date.getHours() - date.getTimezoneOffset() / 60;
  }

  getMinutesDiff(date: Date): number {
    return (date.getHours() - date.getTimezoneOffset()) % 60;
  }

  assignHoliday(): void {
    if(this.update){
      this.doctorManagementService.updateHoliday(this.holiday).subscribe(
        (_) => console.log("OK"),
        (error) => alert(error.error)
      );
    } else {
      this.doctorManagementService.postHoliday(this.holiday).subscribe(
            (_) => console.log("OK"),
            (error) => alert(error.error)
          );
    }
    
    this.notifyCloseHolidayDialog.emit();
    this.notifyReload.emit();
  }

  cancel(): void {
    this.notifyCloseHolidayDialog.emit();
  }

  deleteHoliday(): void {
    this.doctorManagementService.deleteHoliday(this.holiday).subscribe();
    this.notifyCloseHolidayDialog.emit();
    this.notifyReload.emit();
  }

}
