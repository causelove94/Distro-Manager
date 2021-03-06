define([
    "jquery",
    "define",
    "selector"
], function(
    jquery,
    define,
    selector
) {
    return {
        lang: null,
        login: null,

        ePageX: 0,
        ePageY: 0,

        init: function(lang, login) {
            var self   = this;
            this.lang  = lang;
            this.login = login;

            selector.contextmenu.unbind("click contextmenu").bind("click contextmenu", function(e) {
                self.hidden();
                e.preventDefault();
            });
        },

        show: function(element, options, callback) {
            if (typeof element === "undefined")
                return false;

            if (typeof callback === "undefined")
                callback = function(index, object) { };

            var contextListLeft   = (this.ePageX + 20);
            var contextListTop    = (this.ePageY - selector.header.height()) + 20;
            var contextListBuffer = "";

            for (var key in options) {
                var entry = options[key];

                contextListBuffer += "<li><p>";
                contextListBuffer += "<span name=\"" + key + "\">" + entry + "</span>";
                contextListBuffer += "</p></li>";
            }

            selector.contextmenuList.html(contextListBuffer);
            selector.contextmenuList.find("li > p").each(function(index, object) {
                var element = $(this);

                element.unbind("click contextmenu").bind("click contextmenu", function(e) {
                    if (typeof callback !== "undefined")
                        callback(index, object);

                    return false;
                });
            });

            selector.contextmenuList.css({
                left: contextListLeft + "px",
                top:  contextListTop  + "px"
            });

            selector.contextmenu.css({
                display: "block",
                opacity: 0
            }).animate({
                opacity: 1
            }, define.time.animate_show);
        },

        hidden: function() {
            selector.contextmenu.animate({
                opacity: 0
            }, define.time.animate_hidden, function() {
                selector.contextmenu.css({
                    display: "none"
                });

                selector.contextmenuList.find("li > p").each(function() {
                    $(this).unbind("click").parent().remove();
                });
            });
        },

        onMouseMove: function(container, e) {
            this.ePageX = e.pageX;
            this.ePageY = e.pageY;
        }
    };
});