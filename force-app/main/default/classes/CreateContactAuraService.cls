public class CreateContactAuraService {
    
    @AuraEnabled
    public static void createContact(List<Contact> contactList,String accountId){
        for(Contact c : contactList){
            c.AccountId = accountId;

        }
        insert contactList;
    }
}