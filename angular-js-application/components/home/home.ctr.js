(function () {
  angular
    .module('contactsApp')
    .controller('homeController', homeController);
  function homeController($location, $rootScope, $scope, $timeout, homeService, configService, commonService, $log) {
    vm = this;
    $log.log("homeController Called");
    // column to sort
    $scope.column = 'Name';

    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false;

    // called on header click
    $scope.sortColumn = function (col) {
      $scope.column = col;
      if ($scope.reverse) {
        $scope.reverse = false;
        $scope.reverseclass = 'arrow-up';
      } else {
        $scope.reverse = true;
        $scope.reverseclass = 'arrow-down';
      }
    };

    // remove and change class
    $scope.sortClass = function (col) {
      if ($scope.column == col) {
        if ($scope.reverse) {
          return 'arrow-down';
        } else {
          return 'arrow-up';
        }
      } else {
        return '';
      }
    }


    homeService.getContacts().then(function (response) {
      vm = this;
      $log.debug("Contacts Data" + response.data);
      vm.data = response.data
      vm.rows = [];
      for (i = 0; i < vm.data.length; i++) {
        var item = getContact(vm.data[i], $log);
        vm.rows.push(item);
        // $log.debug(item.Name, item.Title, item.City, item.Email, item.Ph);
      }
      $log.debug("Contacts Data > " + vm.rows.length);

      $scope.contacts = vm.rows;
    }, function (response) {
      $log.debug("Error Code:" + response.status);
      vm.errorMessage = 'Network Error! Get tabs data failed';
    });

    $scope.setClickedRow = function (index) {
      $scope.selectedRow = index;
    }
    function getContact(contact, $log) {
      var name = contact.Identification.FirstName + " " + contact.Identification.LastName;
      var title = contact.Identification.Title;
      var city = "";
      var email;
      var ph;
      var href = contact.links[0].href;
      for (j = 0; j < contact.Address.length; j++) {
        city = contact.Address[j].City;
        $log.debug("l = " + contact.Address[j]['type ']);
        break;

      }
      for (k = 0; k < contact.Communication.length; k++) {
        if (contact.Communication[k].type.includes("email"))
          email = contact.Communication[k].value;
        if (contact.Communication[k].type.includes("cell"))
          ph = contact.Communication[k].value;

      }
      return { "Name": name, "Title": title, "City": city, "Email": email, "Ph": ph, "href": href }
    }
    $scope.edit = function (contact) {
      localStorage.setItem('href', contact.href);
      $location.path('/contact');
    }
    $scope.remove = function (contact) {
      homeService.removeContacts(contact.href).then(function (response) {
        $log.debug("Contacts Data deleted > " + vm.rows.length);
        var index = $scope.contacts.indexOf(contact);
        $scope.contacts.splice(index, 1);

      }, function (response) {
        $log.debug("Error Code:" + response.status);
        vm.errorMessage = 'Network Error! Get tabs data failed';
      });


      $location.path('/home');
    }
    $scope.OnAddNew = function () {
      localStorage.removeItem('href');
      $location.path('/contact');

    }


  }



}).call(this);