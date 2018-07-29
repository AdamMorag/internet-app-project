import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Task } from '../Objects/Task';
import { SocketManagerService, EventName } from './socket-manager.service';

@Injectable()
export class TasksService {

  constructor(private _http: Http, private socketManager: SocketManagerService) { }

  public getUserTasks(userId: string) {
    return this._http.get("/api/userTasks/" + userId)
      .map(result =>
        result.json());
  }

  public updateTask(task: Task) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.socketManager.emitEvent(EventName.boardUpdated, { boardId: task.boardId, userUpdating: localStorage.getItem("uid") });
    return this._http.post("/api/updateTask", task, { headers: headers });
  }
}
