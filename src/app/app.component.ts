import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RegistroService } from './services/registro.service';
import { Company } from './models/company.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private registroService: RegistroService,
    private _snackBar: MatSnackBar,
  ) { }
  
  company: Company = {
    idType: '',
    id: '',
    name: '',
    firstName: '',
    secondName: '',
    lastName: '',
    secondLastName: '',
    email: '',
    smsAval: false,
    mailAval: false,
    enabled: false,
  }

  nitFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{9,13}'),
  ]);

  mailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  alphaFormControl = new FormControl(null, [
    Validators.required,
    Validators.pattern('^[A-Za-z]+$'),
  ]);

  matcher = new MyErrorStateMatcher();

  openSnackbar(msg:string){
    this._snackBar.open(msg, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async getCompany(){
    this.registroService.getCompany(this.company.id).subscribe(async (data: Company) => {
      if (data != null) {
        this.company = data;
      }
      if (this.company.enabled) {
        this.openSnackbar('Perfecto, puede continuar con el registro.');
      } else {
        this.openSnackbar('La identificación de la empresa no está registrada');
      }
    });
  }

  onSubmit(){
    this.registroService.setCompany(this.company).subscribe(
      data => this.openSnackbar('Perfecto, Se a actualizado el registro.'),
      error => this.openSnackbar('No se pudo actualizar el registro')
    );
  }

}
