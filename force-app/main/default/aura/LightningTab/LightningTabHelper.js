({
    loadTabs: function (cmp, event) {
        var tab = event.getSource();
        switch (tab.get('v.id')) {
            case 'list':
                this.injectComponent('c:PlaneListX', tab);
                break;
            case 'insert':
                this.injectComponent('c:CreateNewPlane', tab);
                break;
            case 'delete':
                this.injectComponent('c:DeleteAPlane', tab);
                break;
        }
    },
    injectComponent: function (name, target) {
        $A.createComponent(name, {
        }, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    }
})