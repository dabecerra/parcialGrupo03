import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoffeeComponent } from './coffee.component';
import { HttpService } from '@shared/services/http.service';
import { of } from 'rxjs';
import { Coffee } from '@shared/types/coffe.type';
import { By } from '@angular/platform-browser';

describe('CoffeeComponent', () => {
  let component: CoffeeComponent;
  let fixture: ComponentFixture<CoffeeComponent>;
  let httpService: jasmine.SpyObj<HttpService>;

  const mockCoffeeList: Coffee[] = [
    { id: 1, nombre: 'Café Colombiano', tipo: 'Arábica', region: 'Colombia' },
    { id: 2, nombre: 'Café Etíope', tipo: 'Robusta', region: 'Etiopía' },
    { id: 3, nombre: 'Café Brasileño', tipo: 'Arábica', region: 'Brasil' },
  ];

  beforeEach(async () => {
    const httpServiceSpy = jasmine.createSpyObj('HttpService', ['getCoffeList']);

    await TestBed.configureTestingModule({
      declarations: [CoffeeComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpService, useValue: httpServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;

    httpService.getCoffeList.and.returnValue(of(mockCoffeeList));

    fixture.detectChanges();
  });

  it('debería crear la tabla con tres filas más el encabezado', () => {
    expect(httpService.getCoffeList).toHaveBeenCalledTimes(1);

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3, 'Debería haber 3 filas en el cuerpo de la tabla');

    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[0].nativeElement.textContent).toContain('1');
    expect(firstRowCells[1].nativeElement.textContent).toContain('Café Colombiano');
    expect(firstRowCells[2].nativeElement.textContent).toContain('Arábica');
    expect(firstRowCells[3].nativeElement.textContent).toContain('Colombia');
  });

  it('debería mostrar el total de tipos de café correctamente', () => {
    const tipoArabica = fixture.debugElement.query(By.css('p:contains("Total tipo Arábica")'));
    const tipoRobusta = fixture.debugElement.query(By.css('p:contains("Total tipo Robusta")'));

    expect(tipoArabica.nativeElement.textContent).toContain('Total tipo Arábica: 2');
    expect(tipoRobusta.nativeElement.textContent).toContain('Total tipo Robusta: 1');
  });
});
