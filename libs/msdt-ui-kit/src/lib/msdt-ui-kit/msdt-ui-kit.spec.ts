import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsdtUiKit } from './msdt-ui-kit';

describe('MsdtUiKit', () => {
  let component: MsdtUiKit;
  let fixture: ComponentFixture<MsdtUiKit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsdtUiKit],
    }).compileComponents();

    fixture = TestBed.createComponent(MsdtUiKit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
