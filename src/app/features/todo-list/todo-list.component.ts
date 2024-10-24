import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TodosService } from '../../core/services/todos/todos.service';
import { provideHttpClient } from '@angular/common/http';
import { Route, Router, RouterLink } from '@angular/router';
import { TodoDTO, TodoList } from '../../core/models/todo';
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
import { CommonModule } from '@angular/common';
import { SharedService } from '../../core/services/shared/shared.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
  ],
  providers: [TodosService],

  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todoList?: TodoList[];
  todoForm!: FormGroup;
  todoDetails: TodoList | undefined;
  currentData: TodoList[] | undefined;

  isEdited = false;
  editLabel = 'Ajouter';
  taskId: number = 0;

  constructor(
    private todoSevice: TodosService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.handleForms();
  }

  ngOnInit(): void {
    this.handleTodoList();
  }

  handleSharedData() {
    this.sharedService.getCurrentTask().subscribe((tasks) => {
      this.todoList = tasks;
      this.currentData = tasks;
    });
  }

  handleTodoList() {
    this.todoSevice.getTodos().subscribe((todosList) => {
      this.todoList = todosList;
      this.sharedService.sendData(todosList);
      this.handleSharedData();
      this.currentData = todosList;
    });
  }
  getTodoById(id: number) {
    this.todoSevice.getTodoById(id).subscribe((todo) => {
      this.todoDetails = todo;
      this.todoForm.patchValue({
        title: this.todoDetails?.title,
        description: this.todoDetails?.description,
        status: this.todoDetails?.status,
      });
    });
  }

  onDelete(id: number) {
    this.todoSevice.deleteTask(id).subscribe((value: any) => {
      this.handleTodoList();
    });
  }

  onEdit(id: number) {
    this.taskId = id;
    this.isEdited = true;
    this.router.navigate(['/Home/EditTask', id]);
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
    };

    this.todoSevice.postTodo(newValue).subscribe((res) => {
      this.handleTodoList();
      this.todoForm.reset();
      this.isEdited = false;
    });
  }
}
