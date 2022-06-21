import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { EquipmentTransferService } from '@app/modules/equipment/transfer/services/equipment-transfer.service';
import { MergeRenovation } from '@app/modules/room/models/merge-renovation.model';
import { SplitRenovation } from '@app/modules/room/models/split-renovation.model';
import { RenovationService } from '@app/modules/room/services/renovation.service';
import { EquipmentTransfer } from '@app/shared/models/equipment-transfer.model';

import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'room-renovation-time',
  templateUrl: './renovation-time.component.html',
  styleUrls: ['./renovation-time.component.scss']
})

export class RenovationTime implements OnInit {

  @Input() equipmentTransfer!: EquipmentTransfer;
  @Input() splitRenovation!: SplitRenovation;
  @Input() mergeRenovation!: MergeRenovation;
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  fromDateString: string = "";
  toDate: NgbDate | null;
  toDateString: string = "";
  minDate!: NgbDate;
  isSearchDisabled: boolean = true;
  transferStartDate: string = "";
  transferEndDate: string = "";
  timeSlots: any[] = [];
  isTimeSlotSelected: boolean = false;
  selectedTimeSlot: any = null;
  durationString: string = "";

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private equipmentTransferService: EquipmentTransferService, private renovationService: RenovationService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getToday();
  }

  ngOnInit() {
    this.convertDatesToString();
    this.checkIfCanSearch();
  }

  public removeTimeSlots() {
    this.timeSlots = [];
    this.isTimeSlotSelected = false;
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
    this.convertDatesToString();
    this.checkIfCanSearch();
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

  private convertDatesToString(): void {
    this.fromDateString = "";
    this.toDateString = "";
    if (this.fromDate != null)
      this.fromDateString = this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    if (this.toDate != null)
      this.toDateString = this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
  }

  onDurationChange(newValue: string): void {
    this.durationString = newValue;
    this.checkIfCanSearch();
  }

  checkIfCanSearch(): void {
    if (this.durationString != "" && this.fromDateString != "" && this.toDateString != "")
      this.isSearchDisabled = false;
    else
      this.isSearchDisabled = true;
  }

  searchAvailableTimeSlots(): void {
    let firstRoomId = -1;
    let secondRoomId = undefined;
    if (this.equipmentTransfer) {
      firstRoomId = this.equipmentTransfer.sourceRoomId;
      secondRoomId = this.equipmentTransfer.destinationRoomId;
    } else if (this.mergeRenovation) {
      firstRoomId = this.mergeRenovation.firstOldRoomId;
      secondRoomId = this.mergeRenovation.secondOldRoomId;
    } else if (this.splitRenovation) {
      firstRoomId = this.splitRenovation.roomId;
    }
    this.renovationService.getAvailableTimeSlots(this.fromDateString, this.toDateString, this.durationString, firstRoomId, secondRoomId).subscribe(
      data => {
        this.timeSlots = data;
      }
    )
    this.isTimeSlotSelected = false;
  }

  selectTimeSlot(timeSlot: any): void {
    this.isTimeSlotSelected = true;
    this.selectedTimeSlot = timeSlot;
  }

  schedule(): void {
    if (this.isTimeSlotSelected) {
      if (this.equipmentTransfer) {
        this.equipmentTransfer.transferDate = this.selectedTimeSlot.start;
        this.equipmentTransfer.transferDuration = parseInt(this.durationString.split(":")[1]);
        this.equipmentTransferService.postEquipmentTransfer(this.equipmentTransfer).subscribe();
      } else if (this.mergeRenovation) {
        this.mergeRenovation.start = this.selectedTimeSlot.start;
        this.mergeRenovation.end = this.selectedTimeSlot.end;
        this.renovationService.postMergeRenovation(this.mergeRenovation).subscribe(
          data => this.displaySuccessDialog(data),
          error => this.displayErrorDialog(error)
        );
      } else if (this.splitRenovation) {
        this.splitRenovation.start = this.selectedTimeSlot.start;
        this.splitRenovation.end = this.selectedTimeSlot.end;
        if (this.splitRenovation.equipmentDestination == 'first') {
          this.splitRenovation.equipmentDestination = this.splitRenovation.firstNewRoomInfo.roomName;
        } else {
          this.splitRenovation.equipmentDestination = this.splitRenovation.secondNewRoomInfo.roomName;
        }
        this.renovationService.postSplitRenovation(this.splitRenovation).subscribe(
          data => this.displaySuccessDialog(data),
          error => this.displayErrorDialog(error)
        );
      }

    }
  }

  displaySuccessDialog(data: object): void {
    alert("Successfuly scheduled renovation!");
  }

  displayErrorDialog(error: HttpErrorResponse): void {
    alert(error.error);
  }

}

