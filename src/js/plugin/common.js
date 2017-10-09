var YiLan = {
    createNameSpace: function(namespace) {
        var names = namespace.split('.'),
            len = names.length,
            object = this;
        if (namespace.length === 0) {
            return object;
        }
        for(var i = 0; i < len; ++i) {
            if(!object[names[i]]) {
                object[names[i]] = {};
            }
            object = object[names[i]];
        }
        return object;
    }
};

YiLan.createNameSpace('loadAsync').loadScript = function() {
    var done = function(script, callback){
        var state = script.readyState;
        if (state) {
            done = function(script, callback) {
                script.onreadystatechange = function() {
                    if (state === 'loaded' || state === 'complete') {
                        scriptFactory.remove(script);
                        callback();
                    }
                }
            }
        } else {
            done = function(script, callback){
                script.onload = function() {
                    scriptFactory.remove(script);
                    callback();  //避免当 callback 中有 this 时，指向的是 script
                };
            };
        }
        done(script, callback);
    };

    var scriptFactory = {
        group: [],
        create: function() {
            var script;
            if (this.group.length > 0) {
                script = this.group.pop();
            } else {
                script  = document.createElement('script');
            }
            return script;
        },
        remove: function(script) {
            script.parentNode.removeChild(script);
            this.group.push(script);
        }
    };

    function loadScript(url, callback) {
        var script = scriptFactory.create();
            
        script.type ="text/javascript";
        script.src = url;
        script.charset = 'utf-8';
        done(script, callback);
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    return loadScript;
};