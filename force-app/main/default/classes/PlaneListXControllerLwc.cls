public class PlaneListXControllerLwc {
    @AuraEnabled(cacheable=true)
    public static List<Plane__c> getPlaneList(){
        List<Plane__c> planeList = new List<Plane__c>
            ([Select Name, Plane_Model__c, Plane_Price__c, Status__c From Plane__c]);
   		return planeList;
    }
}

//To improve runtime performance, annotate the Apex method with @AuraEnabled(cacheable=true), which caches the method results on the client. To set cacheable=true, a method must only get data, it can’t mutate (change) data.