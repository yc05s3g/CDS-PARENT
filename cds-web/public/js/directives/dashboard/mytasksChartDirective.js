 define(['directives/directiveModule'], function(directiveModule) {
     directiveModule.directive('mytasksChartDirective', ['dashboardService',
             function(dashboardService) {

                 return {
                     restrict: "A",
                     link: function(scope, elem, attrs) {

                         var donutData = [];
                         dashboardService.getTaskState(function(resp) {
                             console.log(resp);
                             donutData[0] = resp.data.assignedCount;
                             donutData[1] = resp.data.inprogressCount;
                             donutData[2] = resp.data.holdCount;
                             scope.labels = ["Assigned", "In-progress", "Hold Count"];
                             scope.data = donutData;
                             scope.legend = true;
                             scope.colours = ["#F0AD4E", "#4C8AC7", "#86AD39"];
                         });

                     }
                 }
             }
         ]

     );


 });
