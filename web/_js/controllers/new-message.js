$(document).ready(function () {
//    $("#btnStart").click(function () {
        $.ajax("PublicChatServlet",{
        accepts: {mycustomtype:"*/*"},
            data:{
                action:"frist-time"                
            },
            method:"POST"
        }).done(function (result) { 

            $("#btnStart").css("display","none");
            alert(result);
            if(result==="frist-time"){
                $("#containerName").css("display","block");
            }else{
                $("#containerMsg").css("display","block");
            }
        });
//    });
    
    
    $("#btnLoggin").click(function () {
        if(validate.isEmpty($("#txtName").val())){
            $("#txtName").focus();
            return ;
        }
        $.ajax("PublicChatServlet",{
            accepts: {mycustomtype:"*/*"},
                data:{
                    action:"logging",
                    name:$("#txtName").val()
                },
                method:"POST"
        }).done(function (result) {            
            $("#containerName").css("display","none");            
            $("#containerMsg").css("display","block");
            
    });
    });
    $("#btnSend").click(function () {
        $.ajax("PublicChatServlet",{
            accepts: {mycustomtype:"*/*"},
                data:{
                    action:"send",
                    message:$("#txtMessage").val()
                },
                method:"POST"
        }).done(function (result) {    
            var arr=JSON.parse(result);
            $("#txtMessage").val("");
            
            alert(result);
            
    });
    });
});