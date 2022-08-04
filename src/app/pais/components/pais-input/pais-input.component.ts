import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter ();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter ();

  @Input() placeholder: string = "";
  
  debouncer: Subject<string> = new Subject(); //es un observable

  termino: string = '';

  ngOnInit(): void {
    this.debouncer
    .pipe(debounceTime(300))
    .subscribe(valor => {
      console.log('debouncer', valor);
      this.onDebounce.emit(valor);
    }
    );
  }

  buscar () {
    this.onEnter.emit(this.termino);
    this.debouncer.subscribe();
  }

  teclaPresionada (){
    this.debouncer.next(this.termino);
  }


}
