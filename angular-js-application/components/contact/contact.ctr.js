(function () {
  angular
    .module('contactsApp')
    .controller('contactController', contactController);
  function contactController($scope, $timeout, homeService, contactService, configService, commonService, $location, $log) {
   
   
    $log.log("contactController Called");
    var vm = this;
    vm.href = localStorage['href'];
   
    vm.href = localStorage['href']
    if (vm.href != null) { //update
      contactService.getContact(vm.href).then(function (response) {
        $log.debug("Contacts Data" + response.data.Communication[0].preferred);

        vm.data = response.data;
        $scope.contact = vm.data;
        $scope.mode = "Update";
      }, function (response) {
        $log.debug("Error Code:" + response.status);
        vm.errorMessage = 'Network Error! Get tabs data failed';
      });
    }
       
   
    $scope.OnUpdate = function (contact) {
      $log.debug("mode" + $scope.mode);
      if ($scope.mode == "Update") {
        $log.debug("I am in update");
        var href = localStorage['href'];
        $log.debug("href" + href);
        contactService.setContact(href, contact).then(function (response) {
          $log.debug("Contacts Data update successfully");
          $location.path('/home');
        }, function (response) {
          $log.debug("Error Code:" + response.status);
          vm.errorMessage = 'Network Error! Get tabs data failed';
        });
      }
      if ($scope.mode == "Add New") {
        $log.debug("I am in Add New");
        homeService.addContact(contact).then(function (response) {
          $log.debug("Contacts Data added successfully");
          $location.path('/home');
        }, function (response) {
          $log.debug("Error Code:" + response.status);
          vm.errorMessage = 'Network Error! Get tabs data failed';
        });
      }

    };

    $scope.previous = function () {
      $log.debug("previous>>");
      $location.path('/home');
    };
    $scope.checkAllA = function () {
      if (!$scope.selectedAllA) {
        $scope.selectedAllA = true;
      } else {
        $scope.selectedAllA = false;
      }
      angular.forEach($scope.contact.Address, function (address) {
        address.selected = $scope.selectedAllA;
      });
    };
    $scope.checkAllB = function () {
      if (!$scope.selectedAllB) {
        $scope.selectedAllB = true;
      } else {
        $scope.selectedAllB = false;
      }
      angular.forEach($scope.contact.Communication, function (com) {
        com.selected = $scope.selectedAllB;
      });
    };

    $scope.removeCommunication = function () {
      $log.debug("remove communication>>");
      var newDataList = [];
      $scope.selectedAllB = false;
      angular.forEach($scope.contact.Communication, function (selected) {
        if (!selected.selected) {
          newDataList.push(selected);
        }
      });
      $scope.contact.Communication = newDataList;
    };
    $scope.removeAddress = function () {
      $log.debug("remove Address>>");
      var newDataList = [];
      $scope.selectedAllA = false;
      angular.forEach($scope.contact.Address, function (selected) {
        if (!selected.selected) {
          newDataList.push(selected);
        }
      });
      $scope.contact.Address = newDataList;
    };
    $scope.addCommunication = function () {
      $scope.contact.Communication.push({
        'type': "",
        'value': "",
        'preferred': "false",
      });
    };

    $scope.addAddress = function () {
      $scope.contact.Address.push({
        'type ': "",
        'number': "",
        'street': "",
        'City': "",
        'Unit': "",
        'State': "",
        'zipcode': "",
      });
    };
    
    if (vm.href == null) {
      $scope.mode = "Add New";
      $scope.contact =
      {
        "Identification": {
          "FirstName": "Test",
          "LastName": "Mandal",
          "DOB": "06/21/1980",
          "Gender": "M",
          "Title": "Manager"
        },
        "Address": [
          {
            "type ": "homeMandal",
            "number": 1234,
            "street": "blah blah St",
            "City": "Kolkata",
            "Unit": "1 a",
            "State": "WEst Bengal",
            "zipcode": "12345"
          }
        ],
        "Communication": [
          {
            "type": "email",
            "value": "Mandal@sample.com",
            "preferred": "true"
          },
          {
            "type": "cell",
            "value": "304-555-8282-Mandal",
            "preferred": "false"
          }
        ]

      }
    }
    
  }



}).call(this);