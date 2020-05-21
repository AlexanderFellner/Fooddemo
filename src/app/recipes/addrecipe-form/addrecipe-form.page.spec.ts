import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddrecipeFormPage } from './addrecipe-form.page';

describe('AddrecipeFormPage', () => {
  let component: AddrecipeFormPage;
  let fixture: ComponentFixture<AddrecipeFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrecipeFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddrecipeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
