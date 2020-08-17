import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatBoxPage } from './chat-box.page';

describe('ChatBoxPage', () => {
  let component: ChatBoxPage;
  let fixture: ComponentFixture<ChatBoxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBoxPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
