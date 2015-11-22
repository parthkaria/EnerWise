/* global angular, $ */
(function () {
    'use strict';

    var appControllers = angular.module('SUNSHOT.controllers', ['SUNSHOT.services']);
    //global variables
    var loggedInUserObj={};

    /* Show error message */
    var showError = function (message, $scope) {
        $scope.message = {};
        $scope.message.show = true;
        $scope.message.text = message;
        $scope.message.type = 'error';
        $scope.message.title = 'Something Wrong';
        $scope.message.button = "OK";
    };

    /* Show success message */
    var showSuccess = function (message, $scope, title) {
        $scope.message = {};
        $scope.message.show = true;
        $scope.message.text = message;
        $scope.message.type = 'success';
        $scope.message.title = title || 'Success';
        $scope.message.button = "OK";
    };
    /* Show PDF message */
    var showPDF = function (message, $scope) {
        $scope.message = {};
        $scope.message.show = true;
        $scope.message.text = message;
        $scope.message.type = 'pdf';
        $scope.message.title = 'Export to PDF';
        $scope.message.button = "EXPORT TO PDF";
    };

    /* validate email */
    var validateEmail = function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    };
    /* validate empty */
    var emptyValidate = function (value) {
        return value === undefined || value === '';
    };

    // landing page controller
    appControllers.controller('landingPage',
        function ($scope, $rootScope, $location) {
            $rootScope.bodyClass = 'landing';
            $rootScope.page = 'home';
            $rootScope.landing = true;
            $scope.goto = function (path) {
                $location.path(path);
            };

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };
        });

    // signup  page controller
    appControllers.controller('signupPage',
        function ($scope, $rootScope, $routeParams, $location,dataServicesPost) {
            $rootScope.bodyClass = 'inner';
            $rootScope.landing = false;
            $rootScope.page = 'signup';
            $scope.type = $routeParams.type;
            $scope.agreement = false;
            $scope.user = {};
            $scope.user.firstname = '';
            $scope.user.lastname = '';
            $scope.user.email = '';
            $scope.user.password = '';

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };

            /* signUp */
            $scope.signUp = function () {
                debugger
                if ($scope.user.firstname === '') {
                    showError('Firstname is required.', $scope);
                    return false;
                }
                if ($scope.user.lastname === '') {
                    showError('Lastname is required.', $scope);
                    return false;
                }
                if ($scope.user.email === '') {
                    showError('Email is required.', $scope);
                    return false;
                }
                if (validateEmail($scope.user.email) === false) {
                    showError('Email is incorrect.', $scope);
                    return false;
                }
                if ($scope.user.password === '') {
                    showError('Password is required.', $scope);
                    return false;
                }
                if ($scope.user.password.length <= 8) {
                    showError('Password need to more than 8 characters.', $scope);
                    return false;
                }
                if ($scope.agreement === false) {
                    showError('You must agree our terms and conditions.', $scope);
                    return false;
                }
                $scope.user.role=$scope.type;
                var userCreated= createUser($scope.user);
                if (userCreated && $scope.type === 'financier') {
                    $location.path('financier');
                } else if (userCreated && $scope.type === 'owner') {
                    $location.path('homeowner');
                } else {
                    $location.path('thankyou');
                }
            };

            var createUser=function(userObj){

                var promise = dataServicesPost.save('createUser',{user:userObj});
                promise.then(function (data) {
                   console.log(data+"angular createUser call data");
                }, function (data) {
                });

            }
        });

    // signin  page controller
    appControllers.controller('signinPage',
        function ($scope, $rootScope, $location,dataServicesPost) {
            $rootScope.bodyClass = 'inner';
            $rootScope.landing = false;
            $rootScope.page = 'signin';
            $scope.user = {};
            $scope.user.email = '';
            $scope.user.password = '';

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };


            /* signIn */
            $scope.signIn = function () {

                if ($scope.user.email === '') {
                    showError('Email is required.', $scope);
                    return false;
                }
                if (validateEmail($scope.user.email) === false) {
                    showError('Email is incorrect.', $scope);
                    return false;
                }
                if ($scope.user.password === '') {
                    showError('Password is required.', $scope);
                    return false;
                }
                /*if ($scope.user.email === 'homeowner@enerwise.io' && $scope.user.password === 'welcomeH0me') {
                    // Homeowner page
                    $location.path('homeowner');
                } else if ($scope.user.email === 'money@enerwise.io' && $scope.user.password === 'cashM0ney') {
                    // Financier page
                    $location.path('financier');
                } else if ($scope.user.email === 'admin@enerwise.io' && $scope.user.password === 'likeAB0ss') {
                    // admin page
                    $location.path('admin');
                }
            else if ($scope.user.email === 'admin@enerwise.io' && $scope.user.password === 'admin') {
                // admin page
                $location.path('admin');
            }
                else {
                    showError('Email/Password is incorrect.', $scope);
                    return false;
                }*/
              //  $scope.user.username=$scope.user.email;
                var promise = dataServicesPost.save('signin',$scope.user);
                promise.then(function (data) {
                    if(data.successFlag==true)
                    {
                        console.log(data.user);
                        loggedInUserObj=data.user;
                        if(loggedInUserObj.role=='owner')
                            $location.path('homeowner');
                        else if(loggedInUserObj.role=='financier')
                            $location.path('financier');
                    }
                    else
                    {
                        $scope.loginFailureMsg=data.message;
                    }
                }, function (data) {
                });
            };
            $scope.strength = [0, 0, 0, 0, 0];
            $scope.$watch('user.password', function (newValue) {
                newValue = newValue + '';
                var length = newValue.length / 2;
                for (var i = 4; i >= 0; i--) {
                    $scope.strength[i] = ((4 - i) < length) ? 1 : 0;
                }
            });
        });

    // reset  page controller
    appControllers.controller('resetPage',
        function ($scope, $rootScope, $location) {
            $rootScope.bodyClass = 'inner';
            $rootScope.page = 'reset';
            $rootScope.landing = false;
            $scope.user = {};
            $scope.user.email = '';

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };

            /* resetPassword */
            $scope.resetPassword = function () {

                if ($scope.user.email === '') {
                    showError('Email is required.', $scope);
                    return false;
                }
                if (validateEmail($scope.user.email) === false) {
                    showError('Email is incorrect.', $scope);
                    return false;
                }
                $location.path('/signin');
            };
        });
    // thank you  page controller
    appControllers.controller('thankyouPage',
        function ($scope, $rootScope) {
            $rootScope.bodyClass = 'inner';
            $rootScope.landing = false;

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };
        });


    // admin  page controller
    appControllers.controller('adminPage',
        function ($scope, $rootScope, dataServices) {
            $rootScope.bodyClass = 'inner';
            $rootScope.page = 'inner';
            $scope.user = { name: "John Smith"};

            var promise = dataServices.query('admin');
            promise.then(function (data) {
                $scope.items = data.admin;
            }, function (data) {
            });

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };


            /* done */
            $scope.done = function (index) {
                var item = $scope.items[index], error = false;
                $.each(item, function (key, value) {
                    if (value === undefined || value === '') {
                        error = true;
                    }
                });
                if (error) {
                    showError('Your data cannot be saved because of your connection issue', $scope);
                } else {
                    $scope.items.splice(index, 1);
                    showSuccess('Your data has been successfuly saved.', $scope)
                }
            };

            $scope.attachFiles = function ($event) {
                $($event.target).closest('.img-upload').find('input').trigger('click');
            };

            /* file change */
            $scope.fileChange = function (e) {
                $(e.target).closest('.img-upload').find('img').prop('src', URL.createObjectURL(e.target.files[0]));
                $(e.target).closest('.img-upload').find('a').hide();
            }
        });


    // reset  page controller
    appControllers.controller('homeownerPage',
        function ($scope, $rootScope, dataServices,helperDataServices,dataServicesPost,dataServicesPut) {
            $rootScope.bodyClass = 'homeowner';
            $scope.user = { name: "John Smith"};dataServices
            $rootScope.page = 'inner';
            $scope.tab = 'info'; // default tab
            $scope.houses = [
                {"address": ""}
            ];
            $scope.step = 0;
            $scope.contact = {};
            $scope.utility = {};
            $scope.resident = {};
            $scope.findVendorButton = true;

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };

            //getting states
            var promise = helperDataServices.query('helperdata/states');
            promise.then(function (data) {
                console.log(data);
                $scope.state=data;
                $scope.resident.state=data[0];
                //$scope.items = data.admin;
            }, function (data) {
            });

            $scope.getCities = function(){
                //var promise = helperDataServices.query('helperdata/cities/'+$scope.resident.state.value);
                //promise.then(function (data) {
                //    console.log(data);
                //    $scope.city=data;
                //    $scope.resident.city=data[0];
                //}, function (data) {
                //});
            };

            var count = 0;
            promise = dataServices.query('electric');
            promise.then(function (data) {
                $scope.electric = data.electric;
              /*  $scope.state = data.state;*/
                $scope.houseslist = data.houseslist;
                $scope.chartData = data.chartData;
            }, function (data) {
            });

            $scope.nextStep1 = function () {

                if (emptyValidate($scope.contact.firstname)) {
                    showError('First Name is required.', $scope);
                    return false;
                }

                if (emptyValidate($scope.contact.lastname)) {
                    showError('Last Name is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.contact.email)) {
                    showError('Email is required.', $scope);
                    return false;
                }
                if (validateEmail($scope.contact.email) === false) {
                    showError('Email is incorrect.', $scope);
                    return false;
                }
                if (emptyValidate($scope.contact.password)) {
                    showError('Password is required.', $scope);
                    return false;
                }
                var promise = dataServicesPut.save('createUser/update',{user:$scope.contact});
                promise.then(function (data) {
                    console.log(data);
                    $scope.step = 1;
                    //$scope.items = data.admin;
                }, function (data) {
                });

            };
            $scope.nextStep2 = function () {
                if (emptyValidate($scope.utility.electric)) {
                    showError('Electric Co is required.', $scope);
                    return false;
                }

                if (emptyValidate($scope.utility.login)) {
                    showError('Login is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.utility.password)) {
                    showError('Password is required.', $scope);
                    return false;
                }
                $scope.step = 2;
            };
            $scope.nextStep3 = function () {
                if (emptyValidate($scope.resident.address)) {
                    showError('Address is required.', $scope);
                    return false;
                }

                if (emptyValidate($scope.resident.city)) {
                    showError('City is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.resident.state)) {
                    showError('State is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.resident.zip)) {
                    showError('Zip is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.resident.adult)) {
                    showError('# of Adults is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.resident.child)) {
                    showError('# of Children is required.', $scope);
                    return false;
                }

                var promise = dataServicesPost.save('createhome',{homeinfo:$scope.resident});
                promise.then(function (data) {
                    console.log(data);
                    $scope.step = 3;
                    //$scope.items = data.admin;
                }, function (data) {
                });
            };

            $scope.backStep2 = function () {
                if ($scope.step > 0) {
                    $scope.step = 0;
                }
            };

            $scope.backStep3 = function () {
                if ($scope.step > 1) {
                    $scope.step = 1;
                }
            };

            $scope.backStep4 = function () {
                if ($scope.step > 2) {
                    $scope.step = 2;
                }
            };
            $scope.goToStep = function (index) {
                    $scope.step = index;
            };

            /* update Information */
            $scope.updateInformation = function () {
                var error = false;
                $.each($scope.houses, function (i, house) {
                    if (emptyValidate(house.address)) {
                        showError('Row ' + (i + 1) + ', Address is required.', $scope);
                        error = true;
                        return false;
                    }
                    if (emptyValidate(house.city)) {
                        showError('Row ' + (i + 1) + ', City is required.', $scope);
                        error = true;
                        return false;
                    }
                    if (emptyValidate(house.state)) {
                        showError('Row ' + (i + 1) + ', State is required.', $scope);
                        error = true;
                        return false;
                    }
                    if (emptyValidate(house.zip)) {
                        showError('Row ' + (i + 1) + ', Zip is required.', $scope);
                        error = true;
                        return false;
                    }
                });
                if (!error) {
                    showSuccess('Your house analysis is ready', $scope, 'House Analysis');
                }
            };
            /* add new house */
            $scope.addHouse = function () {
                count++;
                var object = {
                    "id": count,
                    "address": "",
                    "city": "",
                    "state": "",
                    "zip": ""
                };
                $scope.houses.push(object);
            };

            /* view Analysis */
            $scope.viewAnalysis = function () {
                $scope.tab = 'analysis';
            };
            /* view Analysis */
            $scope.removeItem = function (index) {
                $scope.houses.splice(index, 1);
            };

            $scope.housename = {
                text: "Select Address"
            };

            $scope.findVendors = function () {
                showSuccess("Thank you. We'll be in touch", $scope, 'Thank You');
            };

            $scope.findVendors = function () {
                $scope.findVendorButton = false;
                showSuccess("Thank you. We'll be in touch", $scope, 'Thank You');
            };

           var fillUserDetails=function(){
               $scope.contact.userId=loggedInUserObj.id;
                $scope.contact.firstname=loggedInUserObj.first_name;
                $scope.contact.lastname=loggedInUserObj.last_name;
                $scope.contact.email=loggedInUserObj.email;
                $scope.contact.password=loggedInUserObj.password;
            };
            fillUserDetails();

        });

    // financier  page controller
    appControllers.controller('financierPage',
        function ($scope, $rootScope, dataServices) {
            $rootScope.bodyClass = 'homeowner';
            $rootScope.page = 'inner';
            $scope.tab = 'customers'; // default tab
            $scope.user = { name: "John Smith"};
            $scope.customerModal = false;
            $scope.add = false;
            $scope.edit = false;
            $scope.popup = {};
            $scope.message = {};
            $scope.selectedIndex = null;
            $scope.findVendorButton = false;
            $scope.finance = {};

            /* side menu */
            $rootScope.menu = false;
            /* close menu */
            $rootScope.closeMenu = function () {
                $rootScope.menu = false;
            };
            /*toggle menu */
            $rootScope.toggleMenu = function () {
                $rootScope.menu = !$rootScope.menu;
            };

            $scope.housename = {
                text: "Select Address"
            };

            var promise = dataServices.query('financier');
            promise.then(function (data) {
                $scope.your = data.info;
                $scope.customers = data.customers;
                $scope.chartData = data.chartData;
                $scope.houseslist = data.houseslist;
                $scope.lineChart = data.lineChart;
                $scope.finance = data.finance;
            }, function (data) {
            });

            $scope.updateInformation = function () {

                if (emptyValidate($scope.your.firstname)) {
                    showError('First Name is required.', $scope);
                    return false;
                }

                if (emptyValidate($scope.your.lastname)) {
                    showError('Last Name is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.your.company)) {
                    showError('Company is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.your.email)) {
                    showError('Email is required.', $scope);
                    return false;
                }
                if (validateEmail($scope.your.email) === false) {
                    showError('Email is incorrect.', $scope);
                    return false;
                }
                if (emptyValidate($scope.your.password)) {
                    showError('Password is required.', $scope);
                    return false;
                }

                showSuccess('Your data has been successfuly saved.', $scope);

            };

            $scope.addEditCustomer = function () {
                var error = false;
                if (emptyValidate($scope.popup.firstname)) {
                    showError('First Name is required.', $scope);
                    return false;
                }

                if (emptyValidate($scope.popup.lastname)) {
                    showError('Last Name is required.', $scope);
                    return false;
                }
                if (emptyValidate($scope.popup.email)) {
                    showError('Email is required.', $scope);
                    return false;
                }
                if (!validateEmail($scope.popup.email)) {
                    showError('Email is incorrect.', $scope);
                    return false;
                }
                if (emptyValidate($scope.popup.address)) {
                    showError('Primary Address is required.', $scope);
                    return false;
                }
                $.each($scope.popup.houses, function (i, house) {
                    if (emptyValidate(house.address)) {
                        showError('Row ' + ( i + 1) + ', House is required.', $scope);
                        error = true;
                        return false;
                    }
                });
                if (!error) {
                    showSuccess('Your data has been successfuly saved.', $scope);
                    $scope.popup.name = $scope.popup.firstname + ' ' + $scope.popup.lastname;
                    if ($scope.add) {
                        $scope.popup.status = 'Completed';
                        $scope.customers.push($scope.popup);
                    }
                    if ($scope.edit) {
                        $scope.customers[$scope.selectedIndex] = $scope.popup;
                    }

                    $scope.customerModal = false;
                    $scope.add = false;
                    $scope.edit = false;
                }
            };

            /* delete items */
            $scope.deleteItem = function (index) {
                $scope.customers.splice(index, 1);
            };

            /* edit items */
            $scope.editItem = function (index) {
                $scope.selectedIndex = index;
                $scope.customerModalTitle = "Edit";
                var items = $.extend(true, {}, $scope.customers[index]);
                $scope.popup = items;
                $scope.customerModal = true;
                $scope.message.show = false;
                $scope.edit = true;
            };

            /* view analysis */
            $scope.viewAnalysis = function () {
                $scope.tab = 'analysis';
            };

            /* add customer  */
            $scope.addCustomer = function () {
                $scope.customerModalTitle = "Add";
                $scope.popup = {};
                $scope.popup.houses = [
                    {"address": "", "status": "Complete", primary: false}
                ];
                $scope.message.show = false;
                $scope.add = true;
                $scope.customerModal = true;
            };
            /* add Popup House */
            $scope.addPopupHouse = function () {
                $scope.popup.houses.push(
                    {"address": "", "status": "Complete", primary: false});
            };

            /* close Modal */
            $scope.closeModal = function () {
                $scope.customerModal = false;
                $scope.add = false;
                $scope.edit = false;
            };
            /* set Primary */
            $scope.setPrimary = function (parentIndex, index) {
                if ($scope.customers[parentIndex].houses) {
                    $.each($scope.customers[parentIndex].houses, function (i, house) {
                        house.primary = i === parseInt(index, 10);
                    });
                }
            };

            $scope.exportPDF = function () {
                showPDF('Would you like to export the report to PDF?', $scope);
            };
        });
})();
