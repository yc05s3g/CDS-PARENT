define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {

    controllerModule.controller('profileController', ["$stateParams", '$state', '$http', "appUrlService", "cdsService", '$scope', "roleService", "$window",
        function($stateParams, $state, $http, appUrlService, cdsService, $scope, roleService, $window) {


            var self = this,
                currentCitizenId = $stateParams.citizenId,
                children = [];


            cdsService.getProfileInfo(currentCitizenId, initiateProfile);

            function generateParamObject(objString) {
                objString = objString || "";
                var keysArray = objString.split(",");
                var keysObj = {};
                for (var i = 0; i < keysArray.length; i++) {
                    var splitArray = keysArray[i].split(":");
                    keysObj[splitArray[0]] = splitArray[1];
                }
                return keysObj;
            }

            function initiateProfile(resp) {

                if (resp.data) {

                    if (resp.data.gender == "M") {
                        resp.data.gender = "MALE";
                    } else if (resp.data.gender == "F") {

                        resp.data.gender = "FEMALE"
                    } else {
                        resp.data.gender = "NOT DISCLOSED";
                    }


                    self.user = resp.data;
                    self.user.cadre.citizen.healthInsurance = ((self.user.cadre.citizen.healthInsurance == 0) ? "No" : "Yes");
                    self.user.cadre.citizen.lifeInsurance = ((self.user.cadre.citizen.lifeInsurance == 0) ? "No" : "Yes");
                    self.user.volunteer.citizen.interestedAsVolunteer = ((self.user.volunteer.citizen.interestedAsVolunteer == 0) ? "No" : "Yes");
                    $scope.voterNodeObj = generateParamObject(resp.data.voter.consituency);

                    children = angular.copy(resp.data.tblCitizenRelation);
                    children.shift();
                    $scope.children = children;


                }


            }





        }
    ]);

});
