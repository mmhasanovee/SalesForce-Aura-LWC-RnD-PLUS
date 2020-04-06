({
  loadTabs: function(cmp, event) {
    var tab = event.getSource();
    
        this.injectComponent("c:PaanShop_Insert_New", tab);
     
    
  },
  injectComponent: function(name, target) {
    $A.createComponent(name, {}, function(contentComponent, status, error) {
      if (status === "SUCCESS") {
        target.set("v.body", contentComponent);
      } else {
        throw new Error(error);
      }
    });
  }
});
