import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  sid: string = "";

  formData = {
    name: "",
    dob: "",
    batch: "",
    phone: ""
  };

  isEdit: boolean = true;

  constructor(
    private ar: ActivatedRoute,
    private api: ApiService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.ar.params.subscribe({
      next: (res: any) => {
        this.sid = res.id;
        this.getStudent();
      }
    });
  }

  getStudent() {
    this.api.getSpecificStudent(this.sid).subscribe({
      next: (res: any) => {
        this.formData = { ...res };
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    this.api.editStudent(this.sid, this.formData).subscribe({
      next: (res: any) => {
        this.toastr.success("Student Details Updated");
        this.route.navigateByUrl('/dash');
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error("Something went wrong");
      }
    });
  }
}
