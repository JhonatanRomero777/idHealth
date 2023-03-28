import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

    @Output() editOutput = new EventEmitter<Usuario>();
    @Output() deleteOutput = new EventEmitter<Usuario>();
  
    $users: Usuario[];
  
    private $usersSubscription: Subscription;
  
    $initLoading: boolean;
  
    ColumnMode = ColumnMode;
    @ViewChild(DatatableComponent) table: DatatableComponent;
  
    constructor(private userService: UserService){}
  
    ngOnInit(){ this.reset(); }
  
    ngOnDestroy() { if(this.$usersSubscription) this.$usersSubscription.unsubscribe(); }
  
    reset(){
  
      this.$initLoading = true;
  
      this.$usersSubscription = this.userService.index()
      .subscribe((result)=>{
        this.$users = result.usuarios.reverse();
  
        this.$initLoading = false;
      });
    }
  
    setUsers($users: Usuario[]){
      this.$users = $users;
    }
  
    edit($row: Usuario){
      this.editOutput.emit($row);
    }
  
    delete($row: Usuario){
      this.deleteOutput.emit($row);
    }
}