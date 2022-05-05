import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { OnCallShift } from '../../models/on-call-shift.model';
import { DoctorManagementService } from '../../services/doctor-management.service';

@Component({
  selector: 'app-assign-on-call-shift-dialog',
  templateUrl: './assign-on-call-shift-dialog.component.html',
  styleUrls: ['./assign-on-call-shift-dialog.component.scss']
})
export class AssignOnCallShiftDialogComponent implements OnInit, OnChanges {

  @Input() isVisible: boolean = false;
  @Input() doctorId: number = -1;
  @Input() doctorsOnCallShifts: OnCallShift[] = [];
  startTime: NgbTimeStruct = {hour: 23, minute: 0, second: 0};
  endTime: NgbTimeStruct = {hour: 8, minute: 0, second: 0};
  fromDate!: NgbDateStruct;
  disabledDates: NgbDateStruct[] = []
  isOnCallShiftSelected: boolean = false;
  
  @Output() notifyFromAssignOnCallShiftDialog: EventEmitter<string> = new EventEmitter<string>();

  constructor(config: NgbDatepickerConfig, private doctorManagementService: DoctorManagementService) { 
    const current = new Date();
    config.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate()+2 };
  }

  ngOnInit(): void {}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['doctorId']){
      this.doctorId = changes.doctorId.currentValue;
    }
  }

  onCancelClick(): void{
    this.notifyFromAssignOnCallShiftDialog.emit("close");
  }

  assignOnCallShift(): void{
    let startDate = new Date(this.fromDate.year, this.fromDate.month -1, this.fromDate.day, this.startTime.hour+1, this.startTime.minute, this.startTime.second);
    let onCallShift = {start: startDate, doctorId: this.doctorId};
    this.doctorManagementService.postOnCallShift(onCallShift).subscribe(
      data => {
        this.notifyFromAssignOnCallShiftDialog.emit("assigned");
      }
    );

  }

  
}
