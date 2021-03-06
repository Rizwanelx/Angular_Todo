import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class RestService {
apiUrl = 'http://localhost:3002/api/todo';

  constructor(public http: HttpClient) { }

getTodos(): Observable<any> {
return this.http.get(this.apiUrl);
}
postTodos( todo: Todo): Observable<any> {
  return this.http.post(this.apiUrl, todo);
}

getTodoById(_id: number) {
    return this.http.get(this.apiUrl + '/' + _id);
}
editTodo(todo: Todo, id: number) {
    return this.http.put(this.apiUrl + '/' + id + '/', todo);
}
deleteTodo(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}


