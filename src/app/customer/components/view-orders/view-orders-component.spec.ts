import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { Order } from '../../../common/models/interfaces';
import { OrdersService } from '../../../../app/services/orders.service';
import { ViewOrdersComponent } from './view-orders.component';
import { MaterialUIModule } from '../../../material-ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ViewOrdersComponent', () => {
  let component: ViewOrdersComponent;
  let fixture: ComponentFixture<ViewOrdersComponent>;
  let ordersServiceMock: Partial<OrdersService>;
  let matPaginatorMock: Partial<MatPaginator>;
  let matSortMock: Partial<MatSort>;

  beforeEach(async () => {
    ordersServiceMock = {
      getOrdersForUser: jest.fn().mockReturnValue(of([]))
    };

    matPaginatorMock = {
      pageSize: 10,
      length: 100
    };

    matSortMock = {
      sort: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ViewOrdersComponent],
      imports: [MaterialUIModule, BrowserAnimationsModule],
      providers: [
        { provide: OrdersService, useValue: ordersServiceMock },
        { provide: MatPaginator, useValue: matPaginatorMock },
        { provide: MatSort, useValue: matSortMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdersComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    expect(component.displayedColumns).toEqual([
      'id_pedido',
      'estado',
      'hora',
      'pago_monto',
      'pago_via'
    ]);
    expect(component.dataSource).toBeInstanceOf(MatTableDataSource);
    expect(component.currentStatus).toBe('');
    expect(component.modifyID).toBe(-1);
    // expect(component.loading).toBe(true);
  });

  it('should get orders on initialization', () => {
    const orders: Order[] = [
      { id_usuario: 333, id_pedido: 1, estado: 'Pending', hora: new Date(), pago_monto: 20, pago_via: 'efectivo' },
      { id_usuario: 333, id_pedido: 2, estado: 'Completed', hora: new Date(), pago_monto: 30, pago_via: 'efectivo' }
    ];
    ordersServiceMock.getOrdersForUser = jest.fn().mockReturnValue(of(orders));

    component.ngOnInit();

    expect(ordersServiceMock.getOrdersForUser).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(orders);
    // expect(component.dataSource.paginator).toBe(matPaginatorMock);
    // expect(component.dataSource.sort).toBe(matSortMock);
    // expect(component.loading).toBe(false);
  });

  it('should filter the data source', () => {
    const event = { target: { value: 'Pending' } };
    component.dataSource = new MatTableDataSource([
      { id_pedido: 1, estado: 'Pending', hora: '10:00', pago_monto: 20, pago_via: 'Cash' },
      { id_pedido: 2, estado: 'Completed', hora: '11:00', pago_monto: 30, pago_via: 'Card' }
    ]);

    component.filter(event);

    expect(component.dataSource.filter).toBe('pending');
  });
});
