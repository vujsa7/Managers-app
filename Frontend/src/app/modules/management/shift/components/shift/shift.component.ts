import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shift } from '@app/modules/management/models/shift.model';
import { ShiftService } from '@app/modules/management/services/shift.service';

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

  constructor(private shiftService: ShiftService, private router: Router) { }

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
    this.shiftService.deleteShift(this.selectedShift).subscribe(
      data => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
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
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }
  }

  onBack(): void{
    this.router.navigate(['/map'])
  }

}
