
function check_email (email)
{ 
  
  	var re, resp;
    re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    resp = re.test(email);

    resp = (resp === false) ? false : email ;

    return resp;
}

function on_load()
{

	$("#go_sign_up").click(function()
	{
		var email, url, msg_obj;
		
		email = check_email( $("#email_addr").val() );

		if ( $("ul#email_signup li#message").length == 0 )
		{
			$("ul#email_signup").prepend("<li id='message'></li>");
		}

		if (email === false)
		{
			$("ul#email_signup li#message").show().text("Yea... that's one funky e-mail addy.").delay(5000).fadeOut();
			$("#email_addr").addClass("error");
		}
		else
		{
			url = "http://endgamestudio.webscript.io/save_email?email_addr=" + email;

			$.get(url, function(resp)
			{

				switch (resp)
				{
					case "OK":
						$("#email_addr").addClass("success");
						$("ul#email_signup li#message").show().text("You're all signed up, hauss.").delay(5000).fadeOut();	
					break;
					case "exists":
						$("#email_addr").addClass("success");
						$("ul#email_signup li#message").show().text("Looks like you're already signed up. Love that enthusiasm!").delay(5000).fadeOut();
					break;
					default:
						$("#email_addr").addClass("error");
						$("ul#email_signup li#message").show().text("Aw, man. Try it again, hauss.").delay(5000).fadeOut();

					break;
				}
				
			});
		}


	});

	$("#email_addr").keypress(function(){$(this).removeClass("error").removeClass("success");});

}

$(document).ready(on_load);