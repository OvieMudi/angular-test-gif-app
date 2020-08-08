import { Component } from '@angular/core';
import { IGif } from './common/interfaces/gif';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gif-app';

  handleList(searchInput: IGif[]): void {
    console.log('AppComponent -> handleSearch -> handleSearch', searchInput);
  }
}
