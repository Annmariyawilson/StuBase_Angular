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
  styleUrl: './edit.component.css',
})
export class EditComponent {
  sid: string = '';

  formData = {
    name: '',
    dob: '',
    batch: '',
    year:'',
    phone: '',
  };

  isEdit = true;

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
      },
    });
  }

  getStudent() {
    this.api.getSpecificStudent(this.sid).subscribe({
      next: (res: any) => {
        this.formData = { ...res };
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const { name, dob, batch, year, phone } = this.formData;

    if (!name || !dob || !batch || !year || !phone) {
      this.toastr.warning('Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(phone.toString())) {
      this.toastr.error('Phone number must be exactly 10 digits');
      return;
    }

    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 17 || age > 30) {
      this.toastr.error('Please enter a valid DOB');
      return;
    }

    if (!/^.{2,}$/.test(batch)) {
      this.toastr.error("Batch must contain department name");
      return;
    }

    if (!/^\d{4}$/.test(year.toString())) {
      this.toastr.error("Year must be a 4-digit number (e.g., '2025')");
      return;
    }

    this.api.editStudent(this.sid, this.formData).subscribe({
      next: (res: any) => {
        this.toastr.success('Student Details Updated');
        this.route.navigateByUrl('/dash');
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Something went wrong');
      },
    });
  }
}
