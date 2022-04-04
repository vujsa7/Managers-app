import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgbDatepickerModule, NgbDropdownModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgChartsModule } from "ng2-charts";
import { NgxSpinnerModule } from "ngx-spinner";
import { AvailableTimeSlotsComponent } from "./components/available-time-slots/available-time-slots.component";
import { EquipmentCardComponent } from "./components/equipment-card/equipment-card.component";
import { InfoDialogComponent } from "./components/info-dialog/info-dialog.component";
import { OptionalDialogComponent } from "./components/optional-dialog/optional-dialog.component";
import { PrimaryButtonComponent } from "./components/primary-button/primary-button.component";
import { RoomCardComponent } from "./components/room-card/room-card.component";
import { RoomStatusToStringPipe } from "./pipes/room-status-to-string.pipe";
import { RoomTypeToStringPipe } from "./pipes/room-type-to-string.pipe";

@NgModule({
    declarations: [
        AvailableTimeSlotsComponent,
        EquipmentCardComponent,
        InfoDialogComponent,
        OptionalDialogComponent,
        PrimaryButtonComponent,
        RoomCardComponent,
        RoomStatusToStringPipe,
        RoomTypeToStringPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbDatepickerModule,
        NgbDropdownModule,
        FullCalendarModule,
        NgxSpinnerModule,
        NgbTimepickerModule,
        NgChartsModule,
    ],
    exports: [
        // My shared components
        AvailableTimeSlotsComponent,
        EquipmentCardComponent,
        InfoDialogComponent,
        OptionalDialogComponent,
        PrimaryButtonComponent,
        RoomCardComponent,
        
        // My shared pipes
        RoomStatusToStringPipe,
        RoomTypeToStringPipe,

        // Imported modules from packages
        FormsModule,
        NgbDatepickerModule,
        NgbDropdownModule,
        FullCalendarModule,
        NgxSpinnerModule,
        NgbTimepickerModule,
        NgChartsModule,
    ]
})

export class SharedModule { }