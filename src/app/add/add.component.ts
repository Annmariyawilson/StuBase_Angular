import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  formData = {
    name: '',
    dob: '',
    batch: '',
    year: '',
    phone: '',
  };

  isEdit = false;

  constructor(
    private api: ApiService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const { name, dob, batch, year, phone } = this.formData;

    if (!name || !dob || !batch || !year || !phone) {
      this.toastr.warning('Please fill in all fields');
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.toString())) {
      this.toastr.error('Phone number must be exactly 10 digits');
      return;
    }

    const dobDate = new Date(dob);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 17 || age > 30) {
      this.toastr.error('Please enter a valid DOB (age 17–30)');
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

    this.api.addStudent(this.formData).subscribe({
      next: () => {
        this.toastr.success('Student added successfully!');
        this.route.navigateByUrl('dash');
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('Failed to add student. Try again.');
      },
    });
  }
}