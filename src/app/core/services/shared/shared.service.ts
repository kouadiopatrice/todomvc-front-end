import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList } from '../../models/todo';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  taskSubject = new BehaviorSubject<TodoList[]>([
    {
      id: 0,
      title: '',
      description: '',
      status: '',
      createdAt: '',
    },
  ]);

  currentTaskSubject = new BehaviorSubject<TodoList[]>([
    {
      id: 0,
      title: '',
      description: '',
      status: '',
      createdAt: '',
    },
  ]);

  tasks$: Observable<TodoList[]> = this.taskSubject.asObservable();

  sendData(data: TodoList[]) {
    console.log('data', data);
    this.taskSubject.next(data);
  }

  getData() {
    return this.taskSubject.asObservable();
  }

  setCurrentTask(data: TodoList[]) {
    this.currentTaskSubject.next(data);
  }

  getCurrentTask() {
    return this.currentTaskSubject.asObservable();
  }
}
