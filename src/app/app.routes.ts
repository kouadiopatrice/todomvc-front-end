import { Routes } from '@angular/router';
import { TodoListComponent } from './features/todo-list/todo-list.component';
import { HomeComponent } from './features/home/home.component';
import { CreateTodoComponent } from './features/create-todo/create-todo.component';
import { EditTaskComponent } from './features/edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path: 'Home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/Home/DotoList', pathMatch: 'full' },
      {
        path: 'DotoList',
        component: TodoListComponent,
      },
      {
        path: 'EditTask/:taskId',
        component: EditTaskComponent,
      },
    ],
  },
];
