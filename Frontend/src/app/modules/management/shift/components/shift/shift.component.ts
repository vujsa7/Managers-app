import { Component, OnInit } from '@angular/core';
import { Shift } from '@app/modules/management/models/shift.model';
import { ShiftService } from '@app/modules/management/services/shift.service';
import { ShiftCRUDService } from '../../services/shift-crud.service';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {

  shifts: Shift[] = [];
  isShiftSelected: boolean = false;
  selectedShift: Shift = new Shift();
  showOptionalDialog: boolean = false;
  createShiftDialogVisible: boolean = false;
  updateShiftDialogVisible: boolean = false;

  constructor(private shiftCRUDService: ShiftCRUDService, private shiftService: ShiftService) {}

  ngOnInit(): void {

    this.shiftService.getAllShifts().subscribe(
      data => {
        this.shifts = data;
      }
    );
  }

  selectShift(shift: any): void{
    this.isShiftSelected = true;
    this.selectedShift = shift;
  }

  onNotifyCancelButton(){
    this.showOptionalDialog = false;
  }

  onNotifyConfirmButton(){
    this.shiftCRUDService.deleteShift(this.selectedShift).subscribe(
      data => {
        window.location.reload();
      }
    );
    this.showOptionalDialog = false;
  }

  deleteShift(): void{
    this.showOptionalDialog = true;
  }

  createShift(): void{
    this.createShiftDialogVisible = true;
  }

  updateShift(): void{
    this.updateShiftDialogVisible = true;
  }

  onNotifyCloseDialog(message: string): void{
    if(message == "close"){
      window.location.reload();
    }
  }

}
