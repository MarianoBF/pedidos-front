import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerMenuComponent } from './customer-menu.component';
import { By } from '@angular/platform-browser';
import { MaterialUIModule } from '../../../material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomerMenuComponent', () => {
  let component: CustomerMenuComponent;
  let fixture: ComponentFixture<CustomerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerMenuComponent],
      imports: [MaterialUIModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the menu closed first', () => {
    expect(component.openMenu).toBe(false);
  });

  it('should toggle the menu when input value changes', () => {
    jest.spyOn(component.sidenav, 'toggle');

    component.openMenu = true;
    component.ngOnChanges({ openMenu: { currentValue: true } } as any);

    expect(component.sidenav.toggle).toHaveBeenCalled();
  });

  it('should show the title', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toEqual('Menú Cliente')
  })

  it('should display the menu items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('a'));

    expect(menuItems.length).toBe(2);
    expect(menuItems[0].nativeElement.textContent).toContain('Hacer un pedido');
    expect(menuItems[1].nativeElement.textContent).toContain('Ver mis pedidos');
    expect(menuItems[1].nativeElement.getAttribute('routerLink')).toEqual('cliente/misPedidos');
  });
});