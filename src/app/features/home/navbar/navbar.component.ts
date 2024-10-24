import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoList } from '../../../core/models/todo';
import { SharedService } from '../../../core/services/shared/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatListModule, MatCheckboxModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  @Output('handleStatusSelected') handleStatusSelected =
    new EventEmitter<string>();
  taskList: TodoList[] | undefined;

  statusTask: { label: string; value: string; total: number }[] = [
    { label: 'Toutes', value: 'all', total: 0 },
    { label: 'À faire', value: 'to-do', total: 0 },
    { label: 'En cours', value: 'in-progress', total: 0 },
    { label: 'Terminé', value: 'finished', total: 0 },
  ];

  totalOfTodoTask = 0;
  totalOfInProgressTask = 0;
  totaOfFinishedTask = 0;
  totalAllTask = 0;

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sharedService.getData().subscribe((tasks) => {
        this.taskList = tasks;
        this.totalAllTask = tasks.length;

        const todoTasks = tasks.filter((value) => value.status === 'to-do');

        const inProgressTask = tasks.filter(
          (value) => value.status === 'in-progress',
        );
        const finishedTask = tasks.filter(
          (value) => value.status === 'finished',
        );
        this.totalOfTodoTask = todoTasks.length;
        this.totalOfInProgressTask = inProgressTask.length;
        this.totaOfFinishedTask = finishedTask.length;

        this.statusTask.map((value) => {
          value.total =
            value.value === 'to-do'
              ? this.totalOfTodoTask
              : value.value === 'in-progress'
                ? this.totalOfInProgressTask
                : value.value === 'finished'
                  ? this.totaOfFinishedTask
                  : this.totalAllTask;
        });
      });
    }, 2000);
  }

  onSelecteStatus(status: string) {
    const taskSelected = this.taskList?.filter(
      (value) => value.status === status,
    );

    const currentTask = status !== 'all' ? taskSelected : this.taskList;

    this.sharedService.setCurrentTask(currentTask as TodoList[]);

    this.handleStatusSelected.emit(status);
  }
}
