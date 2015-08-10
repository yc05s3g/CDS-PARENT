define(['controllers/controllerModule', 'formValidation', 'validators/changePasswordValidators', 'errorMessages/changePasswordErrors'], function(controllerModule, formValidation, validationMap, errorJson) {

    controllerModule.controller('changepasswordController', ['$scope', '$state', '$http', "$sessionStorage", "appModalService", 'cdsService', 'appUrlService',
        function($scope, $state, $http, $sessionStorage, appModalService, cdsService, appUrlService) {

            var self = this;


            var config = {
                initiate: true,
                blurValidation: false,
                htmlValidation: false,
                submitValidForm: false,
                runCallBack: false,
            };

            var formStack = formValidation.init("#changepasswordForm", validationMap, errorJson, config);

            self.save = function() {
                $scope.$broadcast("clearServiceErrors");

                if (formStack.isValid) {
                    console.log("Your password changed successfully");

                    $http.put(appUrlService.changePwd, {
                        params: {
                            password: self.user.password,
                            orgId: "2"
                        }
                    }).success(function(resp, status, headers, config) {
                        if (resp.status == "success") {
                            console.log(resp);
                            //         self.hideForm = true;
                            //         if (resp.data.valid) {

                            //             self.successMsg = resp.data.message;
                            //             self.hidesuccessMsg = false;
                            //         } else {
                            //             self.errorMsg = resp.data.message;
                            //             self.hideerrorMsg = false;
                            //         }


                        } else {
                            self.successMsg = "failure";
                        }
                    }).error(function(data, status, headers, config) {
                        self.successMsg = "failure";
                    });


                } else {
                    self.isNotValid = true;
                }
            };





        }
    ]);
});
