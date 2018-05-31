
const unde = 'undefined';
const data = new Date();
const dia =  data.getDate();
const mes  =  data.getMonth()+1;
const FB = require('fb').default;
FB.setAccessToken('your_token_goes_here');

function getMsg(nome){
	return 'Happy birthday'+ nome +', wish you an amazing day! :D';
}

FB.api('me/friends?fields=name,birthday', function(res){
	if(unde.localeCompare(res) == 0){return;}
	console.log('HOJE: '+dia+'/'+mes);

	//console.log(res['data'].length);
	for(var c=0; c<res['data'].length; c++){
		var amigo = res['data'][c];		
		if(unde.localeCompare(amigo.birthday) != 0){
			var nasc = amigo.birthday;
			var dataNasc = amigo.birthday.split('/');
			if(dataNasc[0] == mes.toString() && dataNasc[1] == dia.toString()){
				console.log(amigo.id+'::'+amigo.name+'::'+dataNasc[1]+'/'+dataNasc[0]);

				FB.api('/'+amigo.id+'/feed', 'post', { message: getMsg(amigo.name) }, function(resp){
					if (!resp || resp.error) {
					    console.log(resp);
					} else {
					    console.log('Post ID: ' + resp.id);
					}			
				} );


			}

		}
			

		
	}
});


