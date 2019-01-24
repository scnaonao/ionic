import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { DiscoveryPage } from '../discovery/discovery';
import { MorePage } from '../more/more';
import { NotificationPage } from '../notification/notification';
import { ChatPage } from '../chat/chat';

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tabChat = ChatPage;
  tabNotification = NotificationPage;
  tabMore = MorePage;
  constructor() {
  }
}
