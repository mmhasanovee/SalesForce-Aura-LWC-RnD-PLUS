public class BeerSearchAuraService {
    
    @AuraEnabled
    public static List<sObject> searchBeer(String searchParam){
        String likeParam = '%' + searchParam + '%';
        String Query ='';

        if(searchParam!=null){
            Query  = 'Select id__c,alcohol__c	,Price__c,name__c, Name from beer__c Where Name Like :likeParam LIMIT 5';
        }else {
            Query = 'Select id__c,alcohol__c	,Price__c,name__c, Name from beer__c  LIMIT 5';
        }

        List<SObject> sObjectList = Database.query(Query);
        return sObjectList;
    }
}