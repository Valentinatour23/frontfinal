import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoAlojamientoComponent } from './info-alojamiento'; 

describe('InfoAlojamientoComponent', () => {
  let component: InfoAlojamientoComponent;
  let fixture: ComponentFixture<InfoAlojamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoAlojamientoComponent] // Importamos el nombre correcto
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoAlojamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});