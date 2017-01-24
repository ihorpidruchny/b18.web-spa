import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SwitchState } from '../shared/enums/switchState';
import { BdNotificationPopoverComponent, MessageNotificationComponent } from '../shared/components/bd-notification-popover';
import { Contact } from '../models';

@Component({
    selector: 'navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: [
        './navigation-bar.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})

export class NavigationBarComponent {
    @Input() switchState: SwitchState;
    @Output() switchStateChange: EventEmitter<any> = new EventEmitter();

    private testUser: Contact = new Contact();

    ngOnInit(){
      this.testUser.firstName = 'Ihor';
      this.testUser.lastName = 'Pidruchny';
    }

    private items = [
    //   {
    //     label: 'Home',
    //     icon: 'icon',
    //     items: [{
    //         label: 'Sub menu',
    //         link: './home'
    //     }, {
    //         label: 'Sub menu1',
    //         link: './home',
    //         hidden: true
    //     }, {
    //         label: 'Sub menu',
    //         link: './home',
    //     }]
    // },
    // {
    //     label: 'Drivers',
    //     icon: 'icon',
    //     link: './drivers/1'
    // },
    {
        label: 'Loads',
        icon: 'icon',
        link: './loads',
        items: [{
            label: 'Loads',
            link: './loads'
          }, {
          label: 'New Load',
          link: './loads/0'
        }]
    }, {
        label: 'Customers',
        icon: 'icon',
        link: './customers',
        items: [{
              label: 'Customers',
              link: './customers'
          }, {
          label: 'New Customer',
          link: './customers/0'
        }]
    }];

    onSwitchStateChange(switchState: SwitchState) {
        this.switchStateChange.emit(switchState);
    }
}
