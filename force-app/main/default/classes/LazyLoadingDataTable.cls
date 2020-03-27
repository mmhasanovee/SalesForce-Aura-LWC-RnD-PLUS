public class LazyLoadingDataTable {
    
    @AuraEnabled
    public static List < Account > fetchAccts(Integer intOffSet) {
        
        return [ SELECT Id, Name, Industry, Type FROM Account LIMIT 5 OFFSET : Integer.valueOf(intOffSet) ];
        
    }
    
}