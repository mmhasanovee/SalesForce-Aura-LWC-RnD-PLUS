public class PlaneListXController {
    @AuraEnabled
    public static List<Plane__c> getPlaneList(){
        List<Plane__c> planeList = new List<Plane__c>
            ([Select Name, Plane_Model__c, Plane_Price__c, Status__c From Plane__c]);
   		return planeList;
    }

    @AuraEnabled
    public static void createPlane(Plane__C con,Id AccountId){
        //con.AccountId=AccountId;
        insert con;
        //return con;
        
    }

    @AuraEnabled
    public static Plane__c getPlane(String searchID){
        //con.AccountId=AccountId;
        Plane__c planeList = [Select Name, Plane_Model__c, Plane_Price__c, Status__c from Plane__c Where Id=:searchID];

        return planeList;
        //return con;
        
    }

    @AuraEnabled
    public static void delPlane(String searchID){
            List<Plane__c> planeList = new List<Plane__c> ([Select Id from Plane__c Where Id=:searchID]);
              delete planeList;
    }

    @AuraEnabled
    public static void updatePlane(Plane__C con,Id AccountId){
        //con.AccountId=AccountId;
        update con;
        //return con;
        
    }
}

//SOQL-->SELECT Id, Name FROM Account WHERE Name = 'Acme'
//SOSL-->FIND {Joe Smith} IN Name Fields RETURNING lead(name, phone)