import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UrgentRequestService } from './urgent-request.service';

export class UrgentRequest {
  constructor(
    public medicine: string,
    public dose: string,
    public quantity: string,
    public selectedPharmacy: string
  ) { }
}

@Component({
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.css']
})
export class UrgentRequestComponent implements OnInit {
  medicine: string = '';
  dose: string = '';
  quantity: string = '';
  selectedPharmacy: string = '';
  isAvailable: boolean = false;

  constructor(private httpClient: HttpClient, private urgentRequestService: UrgentRequestService) { }

  ngOnInit(): void {
  }

  selectChangeHandlerMedicine(event: any) {
    this.medicine = event.target.value;
    console.log(this.medicine);
  }

  selectChangeHandlerDose(event: any) {
    this.dose = event.target.value;
    console.log(this.dose);
  }


  selectChangeHandlerQuantity(event: any) {
    this.quantity = event.target.value;
    console.log(this.quantity);
  }

  selectChangeHandlerSelectedPharmacy(event: any) {
    this.selectedPharmacy = event.target.value;
    console.log(this.selectedPharmacy);
  }

  checkIfAvailable(): void {

    var urgentRequest = {
      medicine: this.medicine,
      dose: this.dose,
      quantity: this.quantity,
    };


    this.urgentRequestService.checkIfAvilable(urgentRequest).subscribe((isAvailable: boolean) => {

      this.isAvailable = isAvailable;
      console.log(this.isAvailable);

    });

    if (this.isAvailable) {
      alert("AVAILABLE!")
    }
    else {
      alert("FAIL")
    }
  }

  send(): void {
    var urgentRequest = {
      medicine: this.medicine,
      dose: this.dose,
      quantity: this.quantity,
      //selectedPharmacy: this.selectedPharmacy
    };
    console.log(urgentRequest);
    alert("success");
    quantity: this.quantity
  };
}
