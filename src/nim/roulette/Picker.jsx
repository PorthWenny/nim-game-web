import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";

const Picker = () => {
  const [option, setOption] = useState({
    speed: 10,
    duration: 3,
    stopImageNumber: 0,
  });
  const rouletteRef = useRef(null);

  useEffect(() => {
    const Roulette = function (options) {
      const defaultSettings = {
        maxPlayCount: null,
        speed: 10,
        stopImageNumber: null,
        rollCount: 3,
        duration: 3,
        stopCallback: function () {},
        startCallback: function () {},
        slowDownCallback: function () {},
      };
      const defaultProperty = {
        playCount: 0,
        $rouletteTarget: null,
        imageCount: null,
        $images: null,
        originalStopImageNumber: null,
        totalHeight: null,
        topPosition: 0,
        maxDistance: null,
        slowDownStartDistance: null,
        isRunUp: true,
        isSlowdown: false,
        isStop: false,
        distance: 0,
        runUpDistance: null,
        isIE: navigator.userAgent.toLowerCase().indexOf("msie") > -1,
      };
      let p = $.extend({}, defaultSettings, options, defaultProperty);

      const reset = function () {
        p.maxDistance = defaultProperty.maxDistance;
        p.slowDownStartDistance = defaultProperty.slowDownStartDistance;
        p.distance = defaultProperty.distance;
        p.isRunUp = defaultProperty.isRunUp;
        p.isSlowdown = defaultProperty.isSlowdown;
        p.isStop = defaultProperty.isStop;
        p.topPosition = defaultProperty.topPosition;
      };

      const slowDownSetup = function () {
        if (p.isSlowdown) {
          return;
        }
        p.slowDownCallback();
        p.isSlowdown = true;
        p.slowDownStartDistance = p.distance;
        p.maxDistance = p.distance + 2 * p.totalHeight;
        p.maxDistance += p.imageHeight - (p.topPosition % p.imageHeight);
        if (p.stopImageNumber != null) {
          p.maxDistance +=
            (p.totalHeight -
              (p.maxDistance % p.totalHeight) +
              p.stopImageNumber * p.imageHeight) %
            p.totalHeight;
        }
      };

      const roll = function () {
        let speed_ = p.speed;
        if (p.isRunUp) {
          if (p.distance <= p.runUpDistance) {
            const rate_ = ~~((p.distance / p.runUpDistance) * p.speed);
            speed_ = rate_ + 1;
          } else {
            p.isRunUp = false;
          }
        } else if (p.isSlowdown) {
          const rate_ = ~~(
            ((p.maxDistance - p.distance) /
              (p.maxDistance - p.slowDownStartDistance)) *
            p.speed
          );
          speed_ = rate_ + 1;
        }
        if (p.maxDistance && p.distance >= p.maxDistance) {
          p.isStop = true;
          reset();
          p.stopCallback(p.$rouletteTarget.find("img").eq(p.stopImageNumber));
          return;
        }
        p.distance += speed_;
        p.topPosition += speed_;
        if (p.topPosition >= p.totalHeight) {
          p.topPosition = p.topPosition - p.totalHeight;
        }
        if (p.isIE) {
          p.$rouletteTarget.css("top", "-" + p.topPosition + "px");
        } else {
          p.$rouletteTarget.css(
            "transform",
            "translate(0px, -" + p.topPosition + "px)"
          );
        }
        setTimeout(roll, 1);
      };

      const init = function ($roulette) {
        $roulette.css({ overflow: "hidden" });
        defaultProperty.originalStopImageNumber = p.stopImageNumber;
        if (!p.$images) {
          p.$images = $roulette.find("img").remove();
          p.imageCount = p.$images.length;
          p.$images
            .eq(0)
            .on("load", function () {
              p.imageHeight = $(this).height();
              $roulette.css({ height: p.imageHeight + "px" });
              p.totalHeight = p.imageCount * p.imageHeight;
              p.runUpDistance = 2 * p.imageHeight;
            })
            .each(function () {
              if (this.complete || this.complete === undefined) {
                const src = this.src;
                this.src =
                  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                this.src = src;
              }
            });
        }
        $roulette.find("div").remove();
        p.$images.css({ display: "block" });
        p.$rouletteTarget = $("<div>")
          .css({ position: "relative", top: "0" })
          .attr("class", "roulette-inner");
        $roulette.append(p.$rouletteTarget);
        p.$rouletteTarget.append(p.$images);
        p.$rouletteTarget.append(p.$images.eq(0).clone());
        $roulette.show();
      };

      const start = function () {
        p.playCount++;
        if (p.maxPlayCount && p.playCount > p.maxPlayCount) {
          return;
        }
        p.stopImageNumber =
          $.isNumeric(defaultProperty.originalStopImageNumber) &&
          Number(defaultProperty.originalStopImageNumber) >= 0
            ? Number(defaultProperty.originalStopImageNumber)
            : Math.floor(Math.random() * p.imageCount);
        p.startCallback();
        roll();
        setTimeout(function () {
          slowDownSetup();
        }, p.duration * 1e3);
      };

      const stop = function (option) {
        if (!p.isSlowdown) {
          if (option) {
            const stopImageNumber = Number(option.stopImageNumber);
            if (0 <= stopImageNumber && stopImageNumber <= p.imageCount - 1) {
              p.stopImageNumber = option.stopImageNumber;
            }
          }
          slowDownSetup();
        }
      };

      const setOption = function (options) {
        p = $.extend(p, options);
        p.speed = Number(p.speed);
        p.duration = Number(p.duration);
        p.duration = p.duration > 1 ? p.duration - 1 : 1;
        defaultProperty.originalStopImageNumber = options.stopImageNumber;
      };

      return { start, stop, init, option: setOption };
    };

    const pluginName = "roulette";
    $.fn[pluginName] = function (method, options) {
      return this.each(function () {
        const self = $(this);
        let roulette = self.data("plugin_" + pluginName);
        if (roulette) {
          if (roulette[method]) {
            roulette[method](options);
          } else {
            console &&
              console.error(
                "Method " + method + " does not exist on jQuery.roulette"
              );
          }
        } else {
          roulette = new Roulette(method);
          roulette.init(self, method);
          $(this).data("plugin_" + pluginName, roulette);
        }
      });
    };

    const $roulette = $(rouletteRef.current);
    $roulette.roulette(option);

    const handleClick = () => {
      const count = $roulette.find("img").length;
      const newOption = {
        ...option,
        stopImageNumber: Math.floor(Math.random() * count),
      };
      setOption(newOption);
      $("#config").text(JSON.stringify(newOption));
      $roulette.roulette("option", newOption).roulette("start");
    };

    $("#go").click(handleClick);

    return () => {
      $("#go").off("click", handleClick);
      $roulette.removeData("plugin_roulette");
    };
  }, [option]);

  return (
    <div>
      <h2>
        Config: <span id="config"></span>
      </h2>
      <div className="roulette" ref={rouletteRef} style={{ display: "none" }}>
        <img
          src="https://raw.githubusercontent.com/skryshtafovych/Lottery-html5/master/star.png"
          alt="star"
        />
        <img
          src="https://raw.githubusercontent.com/skryshtafovych/Lottery-html5/master/flower.png"
          alt="flower"
        />
      </div>
      <button id="go">Go</button>
    </div>
  );
};

export default Picker;
