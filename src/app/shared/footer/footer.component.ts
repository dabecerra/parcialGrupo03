import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public readonly phoneNumber: string = '+57 3102105253';
  public readonly email: string = 'info@elaromagico.com';
  public readonly site: string = '@elaromamagico';
}
