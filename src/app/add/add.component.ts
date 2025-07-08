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
    phone: '',
  };

  isEdit = false;

  constructor(
    private api: ApiService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const { name, dob, batch, phone } = this.formData;

    if (!name || !dob || !batch || !phone) {
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
      this.toastr.error('please enter valid dob');
      return;
    }

    const batchPattern = /^\d{4}\s.+$/;
    if (!batchPattern.test(batch)) {
      this.toastr.error(
        "Batch format must start with year followed by department (e.g., '2025 Computer Science')"
      );
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
