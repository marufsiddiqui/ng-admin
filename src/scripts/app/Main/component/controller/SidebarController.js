define([
    'config'
], function(config) {
    'use strict';

    var SidebarController = function($scope, $location) {
        this.$scope = $scope;
        this.$location = $location;
        this.entities = config.getEntities();

        this.computeCurrentEntity();
        $scope.$on('$locationChangeSuccess', this.computeCurrentEntity.bind(this));
        $scope.$on('$destroy', this.destroy.bind(this));
    };

    /**
     * Inject the current entity in the controller
     */
    SidebarController.prototype.computeCurrentEntity = function() {
        var urlParts = this.$location.url().split('/');

        this.currentEntity = urlParts && urlParts.length > 2 ? urlParts[2] : null;
    };

    SidebarController.prototype.displayList = function(entity) {
        this.$location.search('q', null);
        this.$location.search('page', 1);
        this.$location.path('/list/' + entity.getName());
    };

    SidebarController.prototype.isActive = function(entity) {
        return this.currentEntity === entity.getName();
    };

    SidebarController.prototype.destroy = function() {
        this.$scope = undefined;
        this.$location = undefined;
    };

    SidebarController.$inject = ['$scope', '$location'];

    return SidebarController;
});
