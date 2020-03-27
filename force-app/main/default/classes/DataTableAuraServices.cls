public class DataTableAuraServices {
	@AuraEnabled
    public static List<Account> fetchAccount(){
        return [Select Id, Name, Rating, Industry, Phone from Account Limit 8];
    }

    @AuraEnabled
    public static void DeleteRecord(String delId){
        List<Account> dataToDelete = new List<Account> ([Select Id from Account Where Id=:delID]);
        delete dataToDelete;
    }

    @AuraEnabled
    public static void batchDeleteRecord(List<Account> mewmew){
        
        delete mewmew;
    }

    @AuraEnabled
    public static void batchDeleteRecordFromCustomTableCmp(List<String> listOfIds){
        
        //delete listOfIds;

        List < Account > lstDeleteRec = [select Id from Account where id IN: listOfIds];

        delete lstDeleteRec;
    }

    @AuraEnabled
   public static List<Account> getAccountList(Integer dLimit,Integer dOffset){
    List<Account> accountList=new List<Account>([Select Id, Name, Rating, Industry, Phone from Account limit :dLimit offset :dOffset]);
    return accountList;
}

    

 
 }