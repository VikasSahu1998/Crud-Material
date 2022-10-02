import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-empdialog',
  templateUrl: './empdialog.component.html',
  styleUrls: ['./empdialog.component.css']
})
export class EmpdialogComponent implements OnInit {

  empform !: FormGroup;
  button1: string = "Save"
  constructor(private formbuilder: FormBuilder,
    private dialogref: MatDialogRef<EmpdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private api: ApiService) { }

  ngOnInit(): void {
    this.empform = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
    if (this.editData) {
      this.button1 = "Update";
      this.empform.controls['email'].setValue(this.editData.email);
      this.empform.controls['name'].setValue(this.editData.name);
    }
  }

  adddetail() {
    if (!this.editData) {
      if (this.empform.valid) {
        this.api.postEmp(this.empform.value)
          .subscribe({
            next: (res) => {
              alert("details added successfully");
              this.empform.reset();
              this.dialogref.close('save');
            },
            error: () => {
              alert("Something went wrong ")
            }
          })
      }
    } else {
      this.updatedetail();
    }
  }

  updatedetail() {
    this.api.putEmp(this.empform.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("details updated successfully");
          this.empform.reset();
          this.dialogref.close('update');
        },
        error: () => {
          alert("Something went wrong ")
        }
      })
  }
}