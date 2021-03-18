(function () {
    'use strict';

    angular
        .module('contactsApp')
        .service('homeService', homeService);

    function homeService($http, $q, $log, configService) {
        var self = this;
        
        self.getContacts = function () {
            $log.log("0");
            var defer = $q.defer();
            var requesturl =configService.GetContacts;           
            $http({
                method: 'GET',
                url: requesturl,
                headers: {
                  }
            }).then(/*success*/function (response) {
                $log.log("1");
                defer.resolve(response);
            }, /*error*/ function (response) {
                $log.log("2");
                defer.reject(response);
            }).finally(function () {

            });
            return defer.promise;
        }
        self.removeContacts = function (href) {
            $log.log("0");
            var defer = $q.defer();
            var requesturl =href;           
            $http({
                method: 'DELETE',
                url: requesturl,
                headers: {
                  }
            }).then(/*success*/function (response) {
                $log.log("Successfully deleted the contact");
                defer.resolve(response);
            }, /*error*/ function (response) {
                $log.log("Error in contact deletion");
                defer.reject(response);
            }).finally(function () {

            });
            return defer.promise;
        }

        self.addContact = function (contact) {
            $log.log("0");
            var defer = $q.defer();
            var requesturl =configService.GetContacts;           
            $http({
                method: 'POST',
                url: requesturl,
                data: contact, 
                headers: {
                  }
            }).then(/*success*/function (response) {
                $log.log("updated");
                defer.resolve(response);
            }, /*error*/ function (response) {
                $log.log("update failed");
                defer.reject(response);
            }).finally(function () {

            });
            return defer.promise;
        }

    }
})();