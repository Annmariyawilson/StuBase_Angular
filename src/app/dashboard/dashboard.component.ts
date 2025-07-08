import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NgIf,NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,NgIf,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  data:any={}

  constructor(private api: ApiService) {
    this.getData()
  }
  getData() {
    this.api.getStudents().subscribe({
      next: (res: any) => {
        console.log(res);
        this.data=res
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  handledelete(id:any){
    this.api.deleteStudent(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getData()
      },
      error:(err:any)=>{
        console.log(err);
        alert:"Something went wrong"
        
      }
    })
  }

}
