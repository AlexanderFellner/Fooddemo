import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdaterecipeFormPage } from './updaterecipe-form.page';

describe('UpdaterecipeFormPage', () => {
  let component: UpdaterecipeFormPage;
  let fixture: ComponentFixture<UpdaterecipeFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdaterecipeFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdaterecipeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
