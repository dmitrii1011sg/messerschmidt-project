import { Component } from '@angular/core';
import { AppWorkspace } from './components/app-workspace/app-workspace.component';

@Component({
  imports: [AppWorkspace],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'messerschmidt project';
}
