import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateChannelPage } from './create-channel.page';

describe('CreateChannelPage', () => {
  let component: CreateChannelPage;
  let fixture: ComponentFixture<CreateChannelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChannelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
