

museum_objectcatControllers.controller('museum_objectDetailCtrl', ['$scope', 
																   '$routeParams',
																   'museum_object',
																   '$sce', 
																   "$timeout",
																   "productService",
																   "load_object_record",
																   "record_id",'$location','$interval','$rootScope','screen_saver_loop','send_data','app_settings','media_player',
  function($scope, $routeParams, museum_object,$sce,$timeout,productService,load_object_record,record_id ,$location, $interval,$rootScope,screen_saver_loop,send_data,app_settings,media_player) {
	  
	  
				$scope.log_page_view = function (museum_object) {

									var page = {           
										page_id: museum_object.id,
										page_name: museum_object.name,
										page_type: museum_object.type[0],
										kiosk: app_settings.kiosk
									};
									
									send_data.add_log(page)
									
								};
			
			$scope.show_menu=app_settings.hide_menu
			$scope.screensaver_on=false
			$scope.labels="labels"
			$scope.directory=dir
			$scope.firstOne=true;
			$scope.lastOne=true;
			$scope.pageClass = 'page-details';	
			$scope.menu=app_settings.menu
 	
			 $scope.start_screen_saver = function ( ) {
				 screen_saver_loop.start_screen_saver()
					
			};
			
			$scope.novideo=true
		
			
			$scope.changeheadingcolor = function() {
			//kiosk=$scope.kiosk
			var color="color:"+ set_color_by_kiosk($routeParams.kiosk)+" !important;"

				 return  color
			}
			
			$scope.kiosk=$routeParams.kiosk			
			kiosk=$routeParams.kiosk ||"SOMALI-KIOSK"
			$scope.functionThatReturnsStyle = function() {
			//kiosk=$scope.kiosk
			var color="background-color:"+ set_color_by_kiosk(kiosk)+";"

				 return  color
			}
									$scope.pagenav = function(next_prev,firstLoad) {
											
											var museum_object_id = productService.getProduct_id(next_prev,$routeParams.museum_objectId)
											
											$routeParams.museum_objectId=museum_object_id
											record_id.setrecord_id(museum_object_id)
											if(museum_object_id>0 && !firstLoad){
													$scope.museum_object = museum_object.get({museum_objectId: museum_object_id}, function(museum_object) {
													load_object_record.load_object_record(museum_object)
	
													})
											}
											$scope.add_nav_buttons()
											
									}
									
									
					
						   
									$scope.museum_object = museum_object.get({museum_objectId: $routeParams.museum_objectId}, function(museum_object) {
										
										
														console.log(museum_object)
														var children=museum_object.child
															console.log('children',children)
															var child_id_string = "/ids/"
															angular.forEach(children, function(value, key) {
															child_id_string+="-"+value.id
															
															})
															$scope.childlinks=child_id_string
															  
															  $scope.go = function ( path ) {
																
																  var page = {           
																	page_id:"1234",
																	page_name: path,
																	page_type:'button click',
																	kiosk: $scope.kiosk
																};
																
																
																
																send_data.add_log(page)
																
																	$location.path( path );
																};


															  $scope.goSlideshow = function ( path ) {
																  
																    
																
																
																  $location.path( '/slideshow'+child_id_string );
															};

										
											$scope.mainImageUrl = "http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+museum_object.images[0].image+"&width=600&format=jpeg";
											$scope.setImage = function(imageUrl) {
												$scope.mainImageUrl = imageUrl.image;
												$scope.museum_object.description = imageUrl.description;
												
											};
											
											
											$scope.no_audio=false
											$scope.audiohtml=media_player.play_video($scope.directory,museum_object)
											
											
											
											$scope.go_video = function (  ) {
												
												
											
																 // screen_saver_loop.screensaverOff()
																 $location.path( '/slideshow/ids/'+museum_object.id );
																};
												$scope.log_page_view(museum_object)
												//return false
											})
											
											
									

									
									
									
									$scope.add_nav_buttons=function(){
									try{
									console.log(productService.getProduct_id("prev",$routeParams.museum_objectId))
									$scope.firstOne=false;
									}
									catch(er){
										$scope.firstOne=true;
									}
									
									
									try{
									console.log(productService.getProduct_id("next",$routeParams.museum_objectId))
									$scope.lastOne=false;
									}
									catch(er){
										$scope.lastOne=true;
									}
									
									}
									$scope.add_nav_buttons()
									
									
									

							
		

							
						
}]);
