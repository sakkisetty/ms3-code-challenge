  (function () {
    'use strict';

    angular
        .module('contactsApp')
        .factory('commonService', commonService);

    function commonService($http, $q, $log) {
        var contact= "";
  
        var addContact = function(newObj) {
            contact = newObj;
        };
      
        var getContact = function(){
            return contact;
        };
      
        return {
            addContact: addContact,
            getContact: getContact
        }; 
    }
})();