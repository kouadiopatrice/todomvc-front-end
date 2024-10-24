import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { TodosService } from '../../core/services/todos/todos.service';
import { TodoDTO } from '../../core/models/todo';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent implements OnInit {
  todoForm!: FormGroup;
  taskId: number = 0;
  constructor(
    private fb: FormBuilder,
    private todoSevice: TodosService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.handleForms();
  }
  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    console.log('taskId', taskId);
    this.getTodoById(Number(taskId));
  }

  getTodoById(id: number) {
    this.todoSevice.getTodoById(id).subscribe((task) => {
      this.todoForm.patchValue({
        title: task?.title,
        description: task?.description,
        status: task?.status,
      });
    });
  }

  handleForms() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  onSubmit() {
    const newValue: TodoDTO = {
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
      status: this.todoForm.value.status,
    };

    this.todoSevice.putTodo(newValue, this.taskId).subscribe((res) => {
      this.router.navigate(['/Home/DotoList']);
    });
  }
}
