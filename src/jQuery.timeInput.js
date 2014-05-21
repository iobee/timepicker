/*
 time select
 @author wangdong
 */
TimeInput = (function($) { // Localise the $ function
    function TimeInput(el, opts) {
        if (typeof (opts) !== "object") {
            opts = {};
        }
        $.extend(this, TimeInput.DEFAULT_OPTS, opts);
        this.input = $(el);
        this.format = this.parseFormat(this.DEFAULT_OPTS.timeFormat);
        this.build();
    }
    TimeInput.DEFAULT_OPTS = {
        timeFormat : 'HH:mm', //set the time display format. 'HH:mm:ss', 'hh:mm:ss'
        timeDefault : '08:30'
    };
    TimeInput.prototype = {
        build: function() {
            var hourItem = "<select>";
            for (var i = 0; i < 12; i++) {
                hourItem += "<option>" + i + "点" + "</option>";
            }
            hourItem += "</select>";
            var minuteItem = "<select>";
            for (var i = 0; i < 60; i++) {
                minuteItem += "<option>" + i + "分" + "</option>";
            }
            minuteItem += "</select>";

            this.rootLayer = $('<div class="date_selector"></div>');
            this.rootLayer.append(hourItem);
            this.rootLayer.append(minuteItem);
            this.rootLayer.insertAfter(this.input);
        },

        show: function() {
            this.rootLayer.css("display", "block");
            $([window, document.body]).click(this.hideIfClickOutSide);
            this.input.unbind("focus", this.show);
        },

        hideIfClickOutSide: function(event) {
            if (event.target != this.input[0]) {
                this.hide();
            }
        },

        hide: function() {
            this.rootLayer.css("display", "none");
            $([window, document.body]).unbind("click", this.hideIfClickOutSide);
            this.input.focus(this.show);
        },

        //解析日期格式
        parseFormat: function(format) {
            var separator = ':',
                parts = format.split(/\W+/),
                length,
                i;
            if (!parts || parts.length === 0) {
                throw new Error("Invalid time format.");
            }

            format = {
                separator: separator,
                parts: parts
            };

            for (i = 0, length = parts.length; i < length; i++) {
                switch (parts[i]) {
                    case "mm":
                    case "m":
                        format.min = true;
                        break;

                    case "HH":
                    case "H":
                        format.meridian = true;
                        format.hour = true;
                        break;

                    case "hh":
                        format.meridian = false;
                        format.hour = true;
                        break;


                    case "ss":
                    case "s":
                        format.sec = true;
                        break;

                    default :
                        throw new Error("Invalid time format.");
                        break;
                    // No default
                }
            }

            return format;
        },

        parseTime: function(time){

        }
    }

    $.fn.time_input = function(opts) {
        return this.each(function() { new TimeInput(this, opts); });
    };

    return TimeInput;
})(jQuery);