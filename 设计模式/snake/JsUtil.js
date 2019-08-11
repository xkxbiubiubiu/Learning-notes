var JsUtil = {
    
    extends : function (parent) {
        var result = function () {
            parent.apply(this, arguments);
        }
        var Super = function () {};
        Super.prototype = parent.prototype;
        result.prototype = new Super();
        return result;
    },
    // 单例模式
    single : function () {
        var result = function () {
            if(typeof result.instance === "object"){
                return result.instance; 
            }
            result.instance = this;
            return this;
        }
        return result;
    }
}