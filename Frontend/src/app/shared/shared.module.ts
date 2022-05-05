import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgbDatepickerModule, NgbDropdownModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { NgChartsModule } from "ng2-charts";
import { NgxSpinnerModule } from "ngx-spinner";
import { InfoDialogComponent } from "./components/info-dialog/info-dialog.component";
import { OptionalDialogComponent } from "./components/optional-dialog/optional-dialog.component";
import { PrimaryButtonComponent } from "./components/primary-button/primary-button.component";
import { RoomCardComponent } from "../modules/map/floor-plan/components/room-card/room-card.component";
import { BuildingNamePipe } from "./pipes/building-name.pipe";
import { RoomFloorPipe } from "./pipes/room-floor.pipe";
import { RoomStatusToStringPipe } from "./pipes/room-status-to-string.pipe";
import { RoomTypeToStringPipe } from "./pipes/room-type-to-string.pipe";

@NgModule({
    declarations: [
        InfoDialogComponent,
        OptionalDialogComponent,
        PrimaryButtonComponent,
        RoomCardComponent,
        RoomStatusToStringPipe,
        RoomTypeToStringPipe,
        RoomFloorPipe,
        BuildingNamePipe,
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
        InfoDialogComponent,
        OptionalDialogComponent,
        PrimaryButtonComponent,
        RoomCardComponent,
        
        // My shared pipes
        RoomStatusToStringPipe,
        RoomTypeToStringPipe,
        RoomFloorPipe,
        BuildingNamePipe,

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