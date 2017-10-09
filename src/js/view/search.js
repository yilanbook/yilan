function goTargetPagination(){
    function setParam(param,paramVal,url){
        if(!url){
            url="javascript:;";
            return url
        }
        var theAnchor=null;
        var newAdditionalURL="";
        var tempArray=url.split("?");
        var baseURL=tempArray[0]; // origin + pathname
        var additionalURL=tempArray[1];
        var temp="";
        if(additionalURL){
            var tmpAnchor=additionalURL.split("#");

            var TheParams=tmpAnchor[0];
            theAnchor=tmpAnchor[1];

            if(theAnchor) additionalURL=TheParams;

            tempArray=additionalURL.split("&");
            for(o=0;o<tempArray.length;o++){
                if(tempArray[o].split("=")[0]!=param){
                    newAdditionalURL+=temp+tempArray[o];
                    temp="&"
                }
            }
        } else {
            var tmpAnchor=baseURL.split("#");
            var TheParams=tmpAnchor[0];
            theAnchor=tmpAnchor[1];
            
            if(TheParams) baseURL=TheParams
        }
        
        if(theAnchor) paramVal+="#"+theAnchor;
        
        var rowsTxt=temp+""+param+"="+paramVal;
        return "//www.qidian.com/all"+"?"+newAdditionalURL+rowsTxt
    }

    location.href=setParam("page",document.getElementById("PAGINATION-INPUT").value,location.href);
}
