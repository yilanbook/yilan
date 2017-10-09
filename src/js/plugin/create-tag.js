;(function(doc){
    var tags = ['nav', 'header', 'article', 'section', 'mark'],
        tag,
        i;
    for(i = 0; tag = tags[i++];) {
        doc.createElement(tag);
    }
}(document));