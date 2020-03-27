public with sharing class PlaneListX {
    @AuraEnabled
    public static List<Plane__c> getPlaneList(String accountId){
        List<Plane__c> planeList = new List<Plane__c>
            ([Select Name, Plane_Model__c, Plane_Price__c, Status__c From Plane__c]);
   		return planeList;
    }
}