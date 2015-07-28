define(['controllers/controllerModule'], function(controllerModule) {

    controllerModule.controller('listController', ['$scope', '$state', '$http', 'listService', "$sessionStorage", "appModalService", 'cdsService',
        function($scope, $state, $http, listService, $sessionStorage, appModalService, cdsService) {

            var self = this,
                rolesList = [];

            this.minAge = 18;
            this.maxAge = 50;
            this.filter = false;
            this.showImage = true;
            var cadreDeleteOverlayModal;
            this.selected = {};
            var cdsSession = $sessionStorage.cds = $sessionStorage.cds || {};

            var selectedUsers = [];

            var that = this;

            var defSearchObj = {
                q: "",
                userType: "2,3,4",
                limit: 8
            };
            self.hideCadreStats = true;
            cdsService.getUserSession(function(resp) {
                rolesList = resp.data.user.appRoles;
                for (var i = 0; i < rolesList.length; i++) {

                    if (rolesList[i].roleName == "MP") {
                        self.hideCadreStats = false;
                    } else {
                        self.hideCadreStats = true;
                    }

                }
            });

            this.render = function() {
                listService.getUserList(defSearchObj, function(resObj) {
                    that.userList = resObj.data.searchResults;
                   
                });

                listService.getUserTypes(function(resp) {
                    self.userTypes = resp.data;
                });               
            };

            this.render();

            this.search = function() {
                if (typeof this.searchQ == "undefined" || this.searchQ == "") return;
                this.selectedGender = this.selectedUserTypes = false;
                this.minAge = this.maxAge = "";

                listService.getUserList({
                    q: this.searchQ,
                    page: 1,
                    userType: "2,3,4",
                    limit: 50
                }, function(resObj) {
                    that.userList = resObj.data.searchResults;

                });
            };



            this.confirmDelete = function() {
                if (selectedUsers.length) {
                    self.selectedUsers = selectedUsers;
                    cadreDeleteOverlayModal = appModalService.init("cadreDeleteOverlay.html", "cadreDeleteController", self, {
                        class: "cadre-delete-overlay"
                    })();
                } else {


                }
            }


            this.editUserInfo = function(citizenId) {
                $state.go('root.profile.editprofile.personal', {
                    "userId": citizenId
                });
            }


            this.viewProfile = function(citizenId) {
                cdsSession.currentUserId = citizenId;
                $state.go('root.profileLookup', {
                    "citizenId": citizenId
                });
            }

            this.viewDetails = function(citizenId) {
                $state.go('root.profile.memberdashboard', {
                    "citizenId": citizenId
                });
            }

            this.enableDisableOption = function(citizenId) {

                if (selectedUsers.indexOf(citizenId) < 0) {
                    selectedUsers.push(citizenId);
                } else {
                    var currentEleIndex = selectedUsers.indexOf(citizenId);
                    selectedUsers.splice(currentEleIndex, 1);
                }

                console.log(selectedUsers);
                this.disableEdit = (selectedUsers.length > 1) ? "grey" : "";
            }



            this.editCurrentUser = function() {
                if (selectedUsers.length == 1) {
                    cdsSession.currentUserId = selectedUsers[0];
                    $state.go('root.profile.editprofile.personal');
                } else {
                    console.log("please select only one user");
                }
            }

            /*Show filter*/

            this.showFilter = function() {
                console.log("get log");
                this.filter = !this.filter;
            };



            this.filterSearch = function() {

                // if(typeof this.searchQ == "undefined" || this.searchQ == "") return;

                console.log("add loader");

                var filterObj = {
                    q: this.searchQ,
                    page: 1,
                    limit: 100
                };

                (this.minAge !== "") ? filterObj.minAge = this.minAge: false;
                (this.maxAge !== "") ? filterObj.maxAge = this.maxAge: false;


                console.log(this.selectedUserTypes);

                if (typeof this.selectedUserTypes !== undefined) {
                    var str = this.getSelectedFromObject(this.selectedUserTypes).toString();

                    console.log(str);

                    (str) ? filterObj.userType = str: false;
                }


                if (typeof this.selectedGender !== undefined) {

                    console.log(this.selectedGender);

                    var str = this.getSelectedFromObject(this.selectedGender).toString();
                    (str) ? filterObj.gender = str: "";
                }

                console.log(filterObj);


                listService.getUserList(filterObj, function(resObj) {

                    console.log(resObj);

                    self.userList = resObj.data.searchResults;
                    console.log(resObj);

                    self.filteredWith();
                    console.log("remove Loader");
                });

            };


            this.resetUserFilterSearch = function(e,userTypeScope){                            
                if(!e.currentTarget.checked){
                    self.selectedUserTypes[userTypeScope.appRoleId] = false;
                    self.filterSearch();
                }                  
            }


            this.resetGenderFilterSearch = function(e,gender){                            
                if(!e.currentTarget.checked){
                      self.selectedGender[gender] = false;
                      self.filterSearch();
                }                  
            }


            this.getSelectedFromObject = function(obj) {

                if (obj) {
                    var keys = Object.keys(obj);

                    var filtered = keys.filter(function(key) {
                        return obj[key]
                    });

                    return filtered;
                } else {
                    return "";
                }

            }




            this.filteredWith = function() {

                this.selectedFilter = [];
                var minMaxAge = [];
                var selectedUserTypes = this.selectedUserTypes || {};

                var keys = Object.keys(selectedUserTypes);


                var selectedUserFilter = self.userTypes.filter(
                    function(user) {
                        if (selectedUserTypes[user.appRoleId]) {
                            return true;
                        }
                    }

                );



                var selectedGender = this.getSelectedFromObject(this.selectedGender) || [];


                selectedUserFilter = selectedUserFilter.map(function(user) {

                    return {
                        "filterName": user.appRoleName+"1",
                        "filterObj": function() {

                            self.selectedUserTypes[user.appRoleId] = false;
                            self.filterSearch();

                        }
                    };

                });


                console.log(selectedUserFilter);




                console.log(selectedUserFilter);

                if (selectedGender.length) {

                    selectedGender = selectedGender.map(function(gender) {

                        return {
                            "filterName": self.getGender(gender),
                            "filterObj": function() {

                                self.selectedGender[gender] = false;
                                self.filterSearch();

                            }
                        };

                    });
                }


                if (this.minAge !== "" && this.maxAge !== "") {
                    minMaxAge.push({
                        "filterName": "Age " + this.minAge + " to " + this.maxAge,
                        "filterObj": function() {
                            console.log("minAge");
                            self.minAge = self.maxAge = "";
                            self.filterSearch();

                        }
                    });
                }

                this.selectedFilter = this.selectedFilter.concat(selectedUserFilter, selectedGender, minMaxAge);

            };

            this.getGender = function(gender) {
                return gender === 'M' ? "Male" : "Female";
            };


            this.resetSerach = function() {
                this.selectedUserTypes = [];
                this.selectedGender = [];
                this.selectedFilter = [];
            }


        }
    ]);
});
