import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Shift } from '@app/modules/management/models/shift.model';

import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { ShiftCRUDService } from '../../services/shift-crud.service';

@Component({
  selector: 'app-update-shift-dialog',
  templateUrl: './update-shift-dialog.component.html',
  styleUrls: ['./update-shift-dialog.component.scss'],
  providers: [ NgbTimepickerConfig]
})
export class UpdateShiftDialogComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() selectedShift!: Shift;
  @Output() notifyCloseDialog: EventEmitter<string> = new EventEmitter<string>();
  startTime: NgbTimeStruct = {hour: 13, minute: 0, second: 0};
  endTime: NgbTimeStruct = {hour: 20, minute: 0, second: 0};

  constructor(config: NgbTimepickerConfig, private shiftCRUDService: ShiftCRUDService) { 
    config.spinners = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['selectedShift']){
      if(this.selectedShift.id !== -1){
        this.selectedShift = changes.selectedShift.currentValue;
        let start = new Date(this.selectedShift.start)
        let end = new Date(this.selectedShift.end)
        this.startTime.hour = start.getHours();
        this.startTime.minute = start.getMinutes();
        this.endTime.hour = end.getHours();
        this.endTime.minute = end.getMinutes();
      }
    }
  }

  ngOnInit(): void {
  }

  onCancelClick(): void{
    this.notifyCloseDialog.emit("close");
  }

  updateShift(): void{
    let start = new Date(this.selectedShift.start)
    let end = new Date(this.selectedShift.end)
    start.setHours(this.startTime.hour + 1);
    start.setMinutes(this.startTime.minute);
    end.setHours(this.endTime.hour + 1);
    end.setMinutes(this.endTime.minute);
    let shift = new Shift();
    shift.id = this.selectedShift.id;
    shift.name = this.selectedShift.name;
    shift.start = start;
    shift.end = end;
    this.shiftCRUDService.putShift(shift).subscribe(
      data => {
        this.notifyCloseDialog.emit("close");
      }
    );
  }

}
