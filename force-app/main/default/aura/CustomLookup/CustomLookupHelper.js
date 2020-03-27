({
    helperMethod : function() {

    }

   
})

 //first 3 attributes on the .cmp file can be set from the lightning application component, These attributes determines which object or custom object needed to access. Acoording to the object, u may need to modify the files inside the components!!

 //Parent: This, Childs--->ListComponent, CustomLookupSearch
 //Class--> CustomLookupAuraService

 //CustomLookupSearch:: cmp holds the search box and whenever any text is inputted, it passes the text to the parent component through the CustomLookupEvent. Parent search the db using class and pass it to the listcomponent.
 //ListComponent:: cmp gets the result of searched data and also registers the select event.