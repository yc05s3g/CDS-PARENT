define(['controllers/controllerModule','formValidation','validators/familyValidators','errorMessages/familyErrors','jquery'], function (controllerModule,formValidation,validationMap,errorJson,$) {

	controllerModule.controller('familyController', ['$state','$http',"appUrlService","cdsService",'$scope','registerService',function($state,$http,appUrls,cdsService,$scope,registerService){
		
		var self = this,
		   dataJson={};


		var reqMethod = "PUT";
        var reqURL = appUrls.updateFamily;
        handleGetFamily();

		var config = {
            initiate :false,
            blurValidation: false,
            htmlValidation : false,
            submitValidForm : false,
            runCallBack : false,
        };
		
		registerService.getEducationOptions(function(resp){				
			$scope.educationOptions = resp.data;			
		});
		
		var formStack = formValidation.init("#familyRegistrationForm", validationMap, errorJson, config);
		
		this.save = function(){
			
			var requestData = [];

			

			var spouseObj = {};
			var childObj = {};
			

			spouseObj.relationType = "Wife";
			spouseObj.educationId = self.user.spouseData.education.educationId;
			spouseObj.firstName = self.user.spouseData.firstName;
			spouseObj.lastName = self.user.spouseData.lastName;
			spouseObj.middleName = self.user.spouseData.middleName;
			spouseObj.gender = self.user.spouseData.gender;		
			spouseObj.marriageDate = self.user.spouseData.marriageDate;
			spouseObj.dateOfBirth = self.user.spouseData.dateOfBirth;

			requestData.push(spouseObj);

			console.log(self.user.childData);

			if(self.user.childData.length && self.user.childData[0].firstName){

			for(var j=0; j<self.user.childData.length; j++){				
				childObj.relationType = "Kid";
				childObj.educationId = self.user.childData[j].education.educationId;
				childObj.firstName = self.user.childData[j].firstName;
				childObj.middleName = self.user.childData[j].middleName;
				childObj.lastName = self.user.childData[j].lastName;
				childObj.gender = self.user.childData[j].gender;		
				childObj.marriageDate = self.user.childData[j].marriageDate;
				childObj.dateOfBirth = self.user.childData[j].dateOfBirth;
				requestData.push(self.user.childData[j]);	
			}

		}



			$http({
				method: reqMethod,
				 url: reqURL,
				data: requestData
			}).success(function(data, status, headers, config){


				
			}).error(function(data, status, headers, config){
				

			});




		/*	
			if(self.user.spouse) {
				self.user.spouse.relationType = "Wife";
				self.user.spouse.citizenId = cdsService.getUserId();
			}
			if(self.user.child) {				
				self.user.child.relationType = "Kid";
				self.user.child.citizenId = cdsService.getUserId();				
			}
			requestObj[0] = {};			
			requestObj[0]['userId'] = cdsService.getUserId();
			requestObj[1] = angular.copy(self.user.spouse);		
			
			requestObj[2] = angular.copy(self.user.child);
			
			if(formStack.isValid){								

				$http({
					method: "PUT",
					url: appUrls.updateFamily,
					data: requestObj
				}).success(function(data, status, headers, config){
					console.log("success");
					$state.go('root.profile.editprofile.cadre');
				}).error(function(data, status, headers, config){
					

				});
			} */
		




		}


	/*	this.addChildSection = function(event){
				event.preventDefault();
				self.user.childData.push({});

		}
*/


		  function handleGetFamily() {             
              	registerService.getFamilyInfo( function(resp) {                  
				
				console.log(resp);                 

                 dataJson= resp.data;
                 self.user = {};
                 /*To show primary field*/
                 self.user.childData = [{}];
                 
                 if(resp.status=="success"){

                 self.users = resp.data; 

                 for(var i=0; i<self.users.length; i++){
                 	if(self.users[i].relationId==1){
                 		self.user.spouseData = self.users[i];                 		
                 	}else{
                 		self.user.childData.push(self.users[i]);                 		
                 	}
                 };
       

             	}

				 });

          }

	}]);

});

