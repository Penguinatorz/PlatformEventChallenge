public with sharing class HighPriorityCaseHelper {

    Public Static Void alertNotification(List<Case> caseList)
    {
        List<String> alerts = new List<String>();
            for (Case ca : [SELECT CaseNumber, Priority FROM Case WHERE Id IN: caseList AND Priority = 'High']) {
                String message = 'High Priority Alert: Case Number: ' + ca.CaseNumber + ' ' + ca.Id;
                alerts.add(message);
            }
            List<highPriorityCase__e> alertNotification = new List<highPriorityCase__e>();
            for(String alert : alerts)
            {
                highPriorityCase__e alertSetup = new highPriorityCase__e();
                alertSetup.Message__c = alert.substringBeforeLast(' ');
                alertSetup.caseId__c = alert.substringAfterLast(' ');
                alertNotification.add(alertSetup);
            }

            List<Database.SaveResult> results = EventBus.publish(alertNotification);
            // Inspect publishing results
            for (Database.SaveResult result : results) {
                if (!result.isSuccess()) {
                    for (Database.Error error : result.getErrors()) {
                        System.debug('Error returned: ' + error.getStatusCode() +' - '+ error.getMessage());
                    }
                }
            }
    }
}