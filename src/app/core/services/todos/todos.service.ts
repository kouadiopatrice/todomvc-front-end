import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, map } from 'rxjs';
import { TodoDTO, TodoList } from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoList[]> {
    return this.http
      .get<TodoList[]>(`${this.url}/todos`)
      .pipe(map((values) => values));
  }

  getTodoById(id: number): Observable<TodoList> {
    return this.http.get<TodoList>(`${this.url}/todos/${id}`).pipe(
      map((values) => {
        return values;
      }),
    );
  }

  postTodo(value: TodoDTO) {
    return this.http
      .post(`${this.url}/todos`, value)
      .pipe(map((value) => value));
  }

  putTodo(value: TodoDTO, id: number) {
    return this.http
      .put(`${this.url}/todos/${id}`, value)
      .pipe(map((value) => value));
  }

  deleteTask(id: number) {
    return this.http
      .delete(`${this.url}/todos/${id}`)
      .pipe(map((value) => value));
  }
}
