
kiosk="Boycotting"

museum_objectcatServices.factory('app_settings', ['$http', function ($http) {

   

	var menu={}
	menu.hide_browse_button = false
	menu.hide_stories_button= false
	menu.hide_objects_button= false
	menu.hide_list_button= true
	menu.hide_timeline_button= true
	menu.hide_slideshow_button= true
	menu.hide_feedback_button= false
	screensaver=['1','']
	kiosk="Boycotting"
	call_to_action="Select a picture to find out more."
	 var app_settings = {'hide_menu':true,'menu':menu,'call_to_action':call_to_action,'kiosk':kiosk,screensaver:screensaver};
	
	
    return app_settings;

}]);



function app_start_log(kiosk,ACTION){
	
	var urlBase = 'https://performance.bristolmuseums.org.uk/analytics/new'
    var StudentDataOp = {};
	
	var page = {           
				page_id: "1234",
				page_name: ACTION,
				page_type:"AUTO",
				kiosk_id:"PPL-CH-ICT03",
				kiosk: kiosk,
				app_type:"INTERPRETATION-KIOSK"
				};

    StudentDataOp.getStudents = function () {
        return $http.get(urlBase+'/GetStudents');
    };

    StudentDataOp.add_log = function (page) {
		
		  return $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : urlBase, // the url where we want to POST
            data        : page, // our data object
         dataType    : 'jsonp',// what type of data do we expect back from the server
             encode          : true
        })
		
		
	
}
  StudentDataOp.add_log(page)
}
app_start_log(kiosk,"APP START")