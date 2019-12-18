import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {Todo} from '../todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
todos: Todo;
todo: any;
todoForm: FormGroup;
isFavirote = true;
selectedTodo: Todo;

  constructor(public rest: RestService, public fb: FormBuilder) { }

  ngOnInit() {
    this.getTodos();
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required]

    });
  }


getTodos() {
  this.rest.gettodos().subscribe(
    res => {
      this.todo = res;
      console.log(res);
      const newId = res.map( (task) => {
       return task._id;
       }
      );
      console.log(newId);
    }
  );
}
submitTodo(todo: Todo) {
console.log(this.todoForm.value);
this.rest.posttodos(this.todoForm.value).subscribe(
  res => {
    console.log('Form Data' + this.todoForm.value);
    window.location.reload();
  }
);
}

TodoClicked(todo: Todo) {
  // this.selectedTodo.id = this.todo.map( (task) => {
  //   return task.id;
  //   }
  //  );
  this.selectedTodo = todo;
  console.log(this.selectedTodo);
}
getTodById() {
  this.isFavirote = false;
  this.rest.getTodoById(this.selectedTodo._id).subscribe(
    res => {
      this.todo = res;
      console.log(res);
      this.todoForm.setValue({
        title: this.todo.title,
        name: this.todo.name

  });
      this.todoForm.reset();
  }
  );
}
removeTodo(todo: Todo) {
this.rest.deleteTodo(this.selectedTodo._id).subscribe(
  res => {
    window.location.reload();
  }
);
}


}
