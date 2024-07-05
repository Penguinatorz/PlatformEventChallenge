/**
 * 
 * Platform Event Challenge 7/3/24
 
Create a platform event that will trigger when a high priority case is created. 
Next, subscribe to the platform event from within a Lightning Web Component. 
You should display the following on the component, provided from data of the platform event: 
"HIGH Priority Alert: Case Number:CASENUMBERHERE"
 */

trigger highPriorityCase on Case (before insert, before update, before delete, after insert, after update, after delete, after undelete) {

    switch on Trigger.OperationType{
        when AFTER_INSERT
        {
            HighPriorityCaseHelper.alertNotification(Trigger.new);
        }
    }

}