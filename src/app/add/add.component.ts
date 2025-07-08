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
  styleUrl: './add.component.css'
})
export class AddComponent {
  formData = {
    name: "",
    dob: "",
    batch: "",
    phone: ""
  }

  constructor(
    private api: ApiService,
    private route: Router,
    private toastr: ToastrService 
  ) {}

  onSubmit() {
    const { name, dob, batch, phone } = this.formData;

    if (!name || !dob || !batch || !phone) {
      this.toastr.warning("Please fill in all fields");
      return;
    }

    if (phone.toString().length < 10 || phone.toString().length > 15) {
      this.toastr.error("Please enter a valid phone number (10–15 digits)");
      return;
    }

    this.api.addStudent(this.formData).subscribe({
      next: () => {
        this.toastr.success("Student added successfully!");
        this.route.navigateByUrl('dash');
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error("Failed to add student. Try again.");
      }
    });
  }
}
