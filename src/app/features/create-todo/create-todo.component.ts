import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router, RouterLink } from '@angular/router';
import { TodosService } from '../../core/services/todos/todos.service';
import { TodoDTO } from '../../core/models/todo';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss',
})
export class CreateTodoComponent {
  todoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private router: Router,
  ) {
    this.handleForms();
  }

  handleForms() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignTo: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('todoForm values', this.todoForm.value);
    const newValue: TodoDTO = {
      title: this.todoForm.value.title,
      description: this.todoForm.value.description,
    };
    this.todosService.postTodo(newValue).subscribe((res) => {
      console.log('create response', res);
    });
  }
}
