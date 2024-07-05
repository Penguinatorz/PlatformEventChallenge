/**
 *
 * Create a platform event that will trigger when a high priority case is created.
 * Next, subscribe to the platform event from within a Lightning Web Component.
 * You should display the following on the component, provided from data of the platform event:
 * "HIGH Priority Alert: Case Number:CASENUMBERHERE"
 */
import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { subscribe, unsubscribe } from "lightning/empApi";
import { NavigationMixin } from "lightning/navigation";

export default class LWC_Challenge7_3_2024 extends NavigationMixin(LightningElement) {
  @track
  notifications = [];
  caseId;

  async connectedCallback() {
    // listen to all new events
    // and handle them with handleNotificationEvent
    this.subscription = await subscribe(
      "/event/highPriorityCase__e",
      -1,
      (event) => this.handleNotificationEvent(event)
    );
  }

  // click to go to case record
  handleClickToCase(evt) {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: this.caseId,
        name: "Case",
        objectApiName: 'Case',
        actionName: 'view'
      }
    });
  }

  //clear notifications
  handleClearClick() {
    this.notifications = [];
  }
  get notificationCount() {
    return this.notifications.length;
  }

  handleNotificationEvent(event) {
    const id = event.data.event.replayId;
    const message = event.data.payload.Message__c;
    const utcDate = new Date(event.data.payload.CreatedDate);
    const time = `${utcDate.getHours()}:${utcDate.getMinutes()}`;
    this.caseId = event.data.payload.caseId__c;
    const notification = {
      id,
      message,
      time
    };
    this.notifications.push(notification);
    this.dispatchEvent(
      new ShowToastEvent({
        variant: "info",
        title: message
      })
    );
  }

  disconnectedCallback() {
    unsubscribe(this.subscription);
  }
}
