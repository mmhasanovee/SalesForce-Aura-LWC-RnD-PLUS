public with sharing class PaanShopClass {

    //this class fetches list of all the paans
    @AuraEnabled
    public static List<Paan_List__c> getPaanListOfAll(){
        List<Paan_List__c> paanList = new List<Paan_List__c>
            ([Select Name, Paan_Price__c, Paan_Quantity__c, Paan_Color__c,Paan_Description__c,Paan_Img_Url__c From Paan_List__c]);
   		return paanList;
    }

    //these several classes bring sold paans list and show with lazy loading feature in custom data table

    @AuraEnabled
    public static List<Paan_Name__c> fetchSoldPaan(){
        return [Select Name, Paan_Name__r.Name,Total_Quantity__c, Total_Amount__c from Paan_Name__c Limit 8];
    }

    @AuraEnabled
    public static void DeleteRecord(String delId){
        List<Paan_Name__c> dataToDelete = new List<Paan_Name__c> ([Select Id from Paan_Name__c Where Id=:delID]);
        delete dataToDelete;
    }

    @AuraEnabled
    public static void batchDeleteRecord(List<Paan_Name__c> mewmew){
        
        delete mewmew;
    }

    @AuraEnabled
    public static void batchDeleteRecordFromCustomTableCmp(List<String> listOfIds){
        
        //delete listOfIds;

        List < Paan_Name__c > lstDeleteRec = [select Id from Paan_Name__c where id IN: listOfIds];

        delete lstDeleteRec;
    }

    @AuraEnabled
   public static List<Paan_Name__c> getPaanList(Integer dLimit,Integer dOffset){
    List<Paan_Name__c> paanList=new List<Paan_Name__c>([Select Name, Paan_Name__c,Total_Quantity__c, Total_Amount__c from Paan_Name__c limit :dLimit offset :dOffset]);
    return paanList;
    }

    //-----------------------------------------------Custom data table ends here--------------------------------//



}