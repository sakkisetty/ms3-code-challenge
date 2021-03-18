(function () {
    'use strict';

    angular
        .module('contactsApp')
        .service('contactService', contactService);

    function contactService($http, $q, $log, configService) {
        var self = this;
        
        self.getContact = function (href) {
            $log.log("0");
            var defer = $q.defer();
            var requesturl =href;           
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

        self.setContact = function (href, contact) {
            $log.log("0");
            var defer = $q.defer();
            var requesturl =href;           
            $http({
                method: 'PUT',
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