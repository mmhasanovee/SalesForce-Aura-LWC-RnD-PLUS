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
        return [Select Name, Paan_Name__r.Name,Paan_Customer__r.Name,Total_Quantity__c, Total_Amount__c from Paan_Name__c Limit 8];
    }

    @AuraEnabled
    public static void DeleteRecord(String delId){
        List<Paan_List__c> dataToDelete = new List<Paan_List__c> ([Select Id from Paan_List__c Where Id=:delID]);
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

    //insert a list of new pan
    @AuraEnabled
    public static void insertNewPaan(Paan_List__c paan){
    
        insert paan;
    }

    @AuraEnabled
    public static void updatePaanValue(Paan_List__c paan, Id AccountId){
    
        update paan;
    }

    //get a specific pan data
    @AuraEnabled
    public static Paan_List__c getPaan(String searchID){
        //con.AccountId=AccountId;
        Paan_List__c paanList = [Select Name, Paan_Price__c, Paan_Quantity__c, Paan_Color__c,Paan_Description__c,Paan_Img_Url__c From Paan_List__c Where Id=:searchID];

        return paanList;
        //return con;
        
    }

     //these several classes bring customer list and show with lazy loading feature in custom data table

     @AuraEnabled
     public static List<Paan_Customer__c> fetchCustomer(){
         return [Select Name, Phone_Number__c,Address__c from Paan_Customer__c Limit 8];
     }
 
 
     @AuraEnabled
     public static void batchDeleteRecordFromCustomTableCmpC(List<String> listOfIds){
         
         //delete listOfIds;
 
         List < Paan_Customer__c > lstDeleteRec = [select Id from Paan_Customer__c where id IN: listOfIds];
 
         delete lstDeleteRec;
     }
 
     @AuraEnabled
    public static List<Paan_Customer__c> getCustomerList(Integer dLimit,Integer dOffset){
     List<Paan_Customer__c> paanList=new List<Paan_Customer__c>([Select Name, Phone_Number__c,Address__c from Paan_Customer__c limit :dLimit offset :dOffset]);
     return paanList;
     }

     //insert a list of customer
    @AuraEnabled
    public static void insertNewCustomer(Paan_Customer__c customer){
    
        insert customer;
    }


}