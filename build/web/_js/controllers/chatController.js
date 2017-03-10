var timerId4EmojiScale = -1;

$("#txtMessage").keydown(function (event) {
    if (!event.shiftKey && event.keyCode === 13) {
        event.preventDefault();
    }
    if ($("#txtMessage").html().trim() === ""){
        sendTypingSignal("upul",false);
    }else{
        sendTypingSignal("upul",true);
    }
});

function sendTypingSignal(user,isTyping){
    $.ajax("/PublicChat/TypingDetector",{
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        method:"POST",
        data:{
            user:user,
            isTyping:isTyping
        }
    });
}

setInterval(function(){
    $.ajax("/PublicChat/TypingDetector",{
        contentType:"text/html",
        dataType:"json",
        method:"GET"
    }).done(function(json){
        console.log("Came : " + json);
    });    
},1000);

$("#spn-emoji").click(function () {
    $("#div-emoji-container").css("display", "initial");
    var top = $("#frmClient").offset().top - $("#div-emoji-container").height() - 15;
    var left = $("#spn-emoji").offset().left + 4;
    $("#div-emoji-container").css("top", top + "px");
    $("#div-emoji-container").css("left", left + "px");
});

$(window).resize(function () {
    $("#div-emoji-container").css("display", "none");
});

$(".emoji").mousedown(function (e) {
    var bImage;
    if ($(e.target).is(".emoji")){
        bImage = $(e.target).children("i").css('background-image');
    }else{
        bImage = $(e.target).css('background-image');
    }
    bImage = (bImage.substring(5, bImage.length - 2));
    if ($("#txtMessage *").last().is("br")){
        $("#txtMessage *").last().remove();
    }
    $("#txtMessage").append('<img src="' + bImage + '" height="18">');
    timerId4EmojiScale = setInterval(function () {
        var height = $("#txtMessage img:last-child").height();
        height += 5;
        if (height > 44) {
            clearInterval(timerId4EmojiScale);
        } else {
            $("#txtMessage img:last-child").css("height", height + "px");
        }   
    }, 50);


});

$(".emoji").mouseup(function (e) {
    clearInterval(timerId4EmojiScale);
});

$(document).click(function (e) {
    if (!$(e.target).is("#spn-emoji,#spn-emoji *") && !$(e.target).is("#div-emoji-container,#div-emoji-container *")) {
        $("#div-emoji-container").css("display", "none");
    }
});

//$(window).load(function () {
//    $('#myModal').modal('show');
//});

//data-dismiss="modal"

$('#myModal').modal({
    backdrop: 'static',
    keyboard: false
});
$(document).ready(function () {
    $('#myModal').modal('show');
    
    $.ajax("PublicChatServlet",{
        accepts: {mycustomtype:"*/*"},
            data:{
                action:"frist-time"                
            },
            method:"POST"
        }).done(function (result) { 
            if(result==="frist-time"){                
            }else{
                $("#myModal").css("display","none");
                loadIframe();
            }
        });
//    });
    
    
    $("#btnSignIn").click(function () {
        if(validate.isEmpty($("#txtUsername").val())| $("#txtUsername").val()===null){
            $("#txtUsername").focus();
            return ;
        }
        $.ajax("PublicChatServlet",{
            accepts: {mycustomtype:"*/*"},
                data:{
                    action:"loging",
                    name:$("#txtUsername").val()
                },
                method:"POST"
        }).done(function (result) {        
            loadIframe();
            $("#myModal").css("display","none");
            
    });
    });
    $("#spn-send").click(function () {
        var msg=$("#txtMessage").html();
        $.ajax("PublicChatServlet",{
            accepts: {mycustomtype:"*/*"},
                data:{
                    action:"send",
                    message:msg
                },
                method:"POST"
        }).done(function (result) {    
//            var arr=JSON.parse(result);
            $("#txtMessage").html("");
            
            //alert(result);
            
    });
    });
    
});


function loadIframe() {
    $('<iframe />', {
        src: 'hashMap.jsp',
        id:  'myFrame',
        width:'100%',
        height:'450'
        }).appendTo($("#iframeContainer"));
}