
$(document).on('change', 'input[name="upImage"]', function(e){
    var file = e.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(file[0]);

    // 指定したファイルの読み込みに成功した場合サムネイルを更新
    reader.onload = function(){
      var dataUrl = reader.result;
      $('#roadImg').attr('src', dataUrl);
    }
});

function file_upload(){
    // CustomVisionにリクエストをpost
    var customVisionUrl = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/d309dea3-50fb-4895-be20-5d9fbc828ffe/image?iterationId=bf24f6b1-b1be-4817-a6a5-292ff7d44d96";
    $.ajax({
        url: customVisionUrl,
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","multipart/form-data");
            xhrObj.setRequestHeader("Prediction-Key",$("input[name='predictionKey']").val());
        },
        type: "POST",
        // Request body
        data: $("input[name='upImage']").prop("files")[0],
        processData: false,
        contentType: false
    }).done(function( response ){
        console.log(response);

        // 結果を表示
        $('#result').empty();
        response.predictions.forEach(function( value ) {
            var name = value.tagName;
            var percent = Math.round(value.probability * 100);
            $('#result').append('<div>' + name + ' : ' + percent + '% </div>');
        });
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        alert("fail");
    });    
}
