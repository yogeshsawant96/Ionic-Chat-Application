import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChannelChatPage } from './channel-chat.page';

describe('ChannelChatPage', () => {
  let component: ChannelChatPage;
  let fixture: ComponentFixture<ChannelChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
