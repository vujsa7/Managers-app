import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarEvent } from '@app/shared/models/calendar-event.model';
import { EquipmentTransfer } from '@app/modules/equipment/transfer/models/equipment-transfer.model';
import { RoomType } from '@app/shared/models/room-type.enum';
import { RoomTypeToStringPipe } from '@app/shared/pipes/room-type-to-string.pipe';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { MergeRenovation } from '../../models/merge-renovation.model';
import { SplitRenovation } from '../../models/split-renovation.model';
import { RenovationService } from '../../services/renovation.service';

@Component({
  selector: 'room-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent{
  
  @Input() equipmentTransfers: EquipmentTransfer[] = [];
  @Input() splitRenovations: SplitRenovation[] = [];
  @Input() mergeRenovations: MergeRenovation[] = [];
  events : CalendarEvent[] = [];
  @ViewChild('roomschedulecalendar') fullCalendar! : FullCalendarComponent;
  descriptionText: string="";
  selectedEventId: string="";
  showOptionalDialog: boolean = false;
  @Output() deleteEquipmentTransfer = new EventEmitter<any>();
  

  constructor(private renovationService: RenovationService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: true,
    height: '97%',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    editable: false,
    selectable: true,
    allDaySlot: false,
    events: (_, sucessCallback, __) => {
      sucessCallback(this.events);
    },
    eventBorderColor : "#ffffff",
    expandRows: true,
    eventClick:(info)=>{
      if(info.event.start != null){
        var eventStartTime = new Date(info.event.start);
        var range = eventStartTime.valueOf() - Date.now().valueOf();
        if(range >= 24*60*60*1000){
          this.descriptionText = info.event.title
          this.showOptionalDialog = true;
          this.selectedEventId = info.event.id;
      }

      }
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['equipmentTransfers']) {
      this.equipmentTransfers = changes.equipmentTransfers.currentValue;
      this.filterTransfers();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
    if(changes['splitRenovations']){
      this.splitRenovations = changes.splitRenovations.currentValue;
      this.filterSplitRenovations();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
    if(changes['mergeRenovations']){
      this.mergeRenovations = changes.mergeRenovations.currentValue;
      this.filterMergeRenovations();
      if(this.fullCalendar){
        this.fullCalendar.getApi().refetchEvents();
      }
    }
  }

  private filterMergeRenovations() : void {
    for(let renovation of this.mergeRenovations){
      this.events.push(
        new CalendarEvent(
          renovation.id!.toString() + "merge",
          "Merge of rooms " + renovation.firstOldRoomId + " & " + renovation.secondOldRoomId,
          renovation.start,
          renovation.end,
          "#623FC8"
        )
      );
    }
  }

  private filterSplitRenovations() : void {
    for(let renovation of this.splitRenovations){
      this.events.push(
        new CalendarEvent(
          renovation.id!.toString() + "split",
          "Split of room " + renovation.roomId,
          renovation.start,
          renovation.end,
          "#66A182"
        )
      );
    }
  }

  private filterTransfers() : void {
    for(let transfer of this.equipmentTransfers){
      const roomTypePipe = new RoomTypeToStringPipe();
      let sourceRoomText =  roomTypePipe.transform(transfer.sourceRoomType) + " " + transfer.sourceRoomName;
      if(transfer.sourceRoomType == RoomType.Restroom)
      sourceRoomText = transfer.sourceRoomName + " " + "WC";
      let destinationRoomText =  roomTypePipe.transform(transfer.destinationRoomType) + " " + transfer.destinationRoomName;
      if(transfer.destinationRoomType == RoomType.Restroom)
      destinationRoomText = transfer.destinationRoomName + " " + "WC";
      this.events.push(
        new CalendarEvent(
          transfer.id!.toString() + "transfer",
          "Transfer: " + sourceRoomText + " -> " + destinationRoomText,
          transfer.transferDate,
          new Date(new Date(transfer.transferDate).getTime() + transfer.transferDuration*60000),
          "#214975"
        )
      );
    }
  }

  onNotifyCancelButton(){
    this.showOptionalDialog = false;
  }

  onNotifyConfirmButton(){
    this.showOptionalDialog = false;
    if(this.selectedEventId.includes("transfer")){
      let selectedEquipmentTransfer = this.equipmentTransfers.filter(o=>{return o.id == parseInt(this.selectedEventId.slice(0,-8))})[0];
      
      this.deleteEquipmentTransfer.emit(selectedEquipmentTransfer);
    } else if(this.selectedEventId.includes("merge")){
      let selectedMergeRenovation = this.mergeRenovations.filter(r=>{return r.id == parseInt(this.selectedEventId.slice(0,-5))})[0];
      this.renovationService.deleteMergeRenovation(selectedMergeRenovation).subscribe();
    } else if(this.selectedEventId.includes("split")){
      let selectedSplitRenovation = this.splitRenovations.filter(r=>{return r.id == parseInt(this.selectedEventId.slice(0,-5))})[0];
      this.renovationService.deleteSplitRenovation(selectedSplitRenovation).subscribe(); 
    }
  }

  // full calendar component will only be available after rendering
  ngAfterViewInit() {
    this.fullCalendar.getApi().refetchEvents();
  }

}
