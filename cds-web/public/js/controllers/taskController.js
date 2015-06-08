define(['controllers/controllerModule', 'jquery'], function(controllerModule, $) {

    controllerModule.controller('taskController', ["$rootScope",'$state', '$http', "appUrlService", "cdsService", '$scope', "taskService", "appModalService",
        function($rootScope,$state, $http, appUrls, cdsService, $scope, taskService,appModalService) {
           
   
            var self = this;
            var config = {
                initiate: false,
                blurValidation: false,
                htmlValidation: false,
                submitValidForm: false,
                runCallBack: false,
            };

                 self.user = {}

            self.user.taskWorkAllocation = {}
            self.user.taskWorkAllocation.citizenId = $rootScope.assignedCitizenName;
            
            taskService.getTaskCategories(function(resp) {
                $scope.taskCategoryOptions = resp.data;
            });
            taskService.getMyTasks(function(resp){
                $scope.myTaskLists = resp.data.tasks;               
            });
            taskService.getTaskPriorities(function(resp){
                $scope.taskPriorities = resp.data;
            });
            taskService.getTeamTasks(function(resp){
                $scope.teamTasks = resp.data.tasks;                
            });
            taskService.getAllTasks(function(resp){
                $scope.allTasks = resp.data.tasks;                
            });

            this.showCadresList = function(queryString){
                $rootScope.queryString = queryString;
                cadreModal = appModalService.init("cadreList.html","cadreListController", $rootScope,{class:"cadre-overlay"} )();


                console.log(cadreModal);

                cadreModal.result.then(function(selObj){
                    self.assignedToCitizenName = selObj.value;
                    self.user.taskWorkAllocation.citizenId = selObj.id;                    
                },function(){                               
                    self.assignedToCitizenName ="";
                    self.user.taskWorkAllocation.citizenId = null;
                });
             
            }


           
            this.newTask = function(){
                $state.go('root.addTask');
            };
            this.viewTask = function(params){                
                $state.go('root.viewTasks',{"taskId":params});
            };
            this.viewTeamTasks = function(){
                $state.go('root.teamTasks');                
            };
            this.viewAllTasks = function(){                
                $state.go('root.allTasks');                
            }
            this.deleteTask = function(params){
                taskService.deleteTask(params, function(resp){                     
                    console.log(resp);               
                });                
            }

            this.save = function() { 



                var commentsObj= angular.copy(self.user.comments);
                commentsObj.commentTo = 104;
                var commentsArray = [];
                
                console.log(self.user);

                commentsArray.push(commentsObj);
                self.user.comments = commentsArray;

                $http({
                    url : appUrls.saveTaskInfo,                        
                    method : "POST",
                    data: self.user
                }).success(function(data, textStatus, jqXHR) {
                        $state.go("root.tasks");
                }).error(function(jqXHR, textStatus, errorThrown) {

                })
               
            };
        }
    ]);

});