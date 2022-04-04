import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Shift } from '@app/modules/management/models/shift.model';
import { CalendarEvent } from '@app/shared/models/calendar-event.model';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { Holiday } from '../../models/holiday.model';
import { OnCallShift } from '../../models/on-call-shift.model';
import { WorkdayShift } from '../../models/workday-shift.model';

@Component({
  selector: 'doctor-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {
  @Input() shifts: WorkdayShift[] = [];
  @Input() onCallShifts: OnCallShift[] = [];
  @Input() holidays: Holiday[] = [];
  @Input() newShift!: Shift;
  @Output() notifyFromDoctorScheduleCalendar: EventEmitter<any> = new EventEmitter<any>();
  events: CalendarEvent[] = [];
  @ViewChild('doctorschedulecalendar') fullCalendar!: FullCalendarComponent;
  descriptionText: string = "";
  selectedEventId: string = "";
  showOptionalDialog: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: true,
    height: '79.5vh',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek',
    },
    editable: false,
    selectable: true,
    allDaySlot: false,
    events: (fetchInfo, sucessCallback, failureCallback) => {
      sucessCallback(this.events);
    },
    eventBorderColor: "#ffffff",
    expandRows: true,
    eventClick: (info) => {
      if (info.event.start != null) {
        this.notifyFromDoctorScheduleCalendar.emit({ id: info.event.id });
      }
    }
  };

  ngOnInit(): void {
    const headEl = this.document.getElementsByTagName('head')[0];
    const newLinkEl = this.document.createElement('link');
    newLinkEl.id = 'custom-calendar';
    newLinkEl.rel = "stylesheet";
    newLinkEl.href = 'custom-calendar.css';

    headEl.appendChild(newLinkEl);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['shifts']) {
      this.shifts = changes.shifts.currentValue;
      this.filterShifts();
      if (this.fullCalendar) {
        this.fullCalendar.getApi().refetchEvents();
      }
    }
    if (changes['onCallShifts']) {
      this.onCallShifts = changes.onCallShifts.currentValue;
      this.filterOnCallShifts();
      if (this.fullCalendar) {
        this.fullCalendar.getApi().refetchEvents();
      }
    }
    if (changes['holidays']) {
      this.holidays = changes.holidays.currentValue;
      this.filterHolidays();
      if (this.fullCalendar) {
        this.fullCalendar.getApi().refetchEvents();
      }
    }
    if (changes['newShift']) {
      if (changes.newShift.currentValue) {
        this.newShift = changes.newShift.currentValue;
        this.events.push(new CalendarEvent(
          this.newShift.id!.toString() + "shift",
          this.newShift.name,
          this.newShift.start,
          this.newShift.end,
          "#66A182"
        ));
      }
    }
    if (this.fullCalendar) {
      this.fullCalendar.getApi().refetchEvents();
    }
  }

  private filterShifts(): void {
    if (this.events.length == 0) {
      for (let shift of this.shifts) {
        this.events.push(
          new CalendarEvent(
            shift.workdayId!.toString() + "workdays",
            shift.name,
            shift.start,
            shift.end,
            "#66A182"
          )
        );
      }
    }
  }

  private filterOnCallShifts(): void {
    for (let onCallShift of this.onCallShifts) {
      this.events.push(
        new CalendarEvent(
          onCallShift.id!.toString() + "onCallShift",
          "On-call shift",
          onCallShift.start,
          new Date(new Date(onCallShift.start).getTime() + 9 * 60 * 60 * 1000),
          "#387da7"
        )
      );
    }
  }

  private filterHolidays(): void {
    for (let holiday of this.holidays) {
      this.events.push(
        new CalendarEvent(
          holiday.id!.toString() + "holiday",
          "Holiday ",
          holiday.start,
          holiday.end,
          "#6F10CE"
        )
      );
    }
  }
}
