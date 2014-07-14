// Generated by CoffeeScript 1.7.1
(function() {
  var Bodies, Body, Events, World;

  Events = Matter.Events;

  World = Matter.World;

  Bodies = Matter.Bodies;

  Body = Matter.Body;

  window.runLevelActions = function(engine) {
    var blocks, getBlockPosition, greenBlock, greenBlockPosition, i, position, ticks;
    ticks = 0;
    getBlockPosition = function(tick, offset) {
      return {
        x: Math.sin(ticks + offset) * 400 + engine.render.options.width / 2,
        y: Math.cos(ticks + offset) * 400 + engine.render.options.height / 2
      };
    };
    greenBlockPosition = getBlockPosition(ticks, 0);
    greenBlock = Bodies.rectangle(greenBlockPosition.x, greenBlockPosition.y, 51, 51, {
      isStatic: true,
      render: {
        spriteSheet: "/images/jump/img/kenny/Enemies/enemies_spritesheet.png",
        tile: {
          rotation: 0
        },
        texture: {
          name: "blockerMad",
          x: 136,
          y: 66,
          width: 51,
          height: 51
        }
      }
    });
    blocks = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 1; _i <= 19; i = ++_i) {
        position = getBlockPosition(ticks, i);
        _results.push(Bodies.rectangle(position.x, position.y, 70, 70, {
          isStatic: true,
          render: {
            spriteSheet: "/images/jump/img/kenny/Tiles/tiles_spritesheet.png",
            tile: {
              rotation: 0
            },
            texture: {
              name: "brickWall",
              x: 216,
              y: 0,
              width: 70,
              height: 70
            }
          }
        }));
      }
      return _results;
    })();
    blocks.unshift(greenBlock);
    World.add(engine.world, blocks);
    return Events.on(engine, "beforeTick", function(e) {
      var block, x, y, _i, _len, _results;
      ticks += 0.0005;
      x = Math.sin(ticks);
      y = Math.cos(ticks);
      engine.world.gravity.x = Math.sin(ticks);
      engine.world.gravity.y = Math.cos(ticks);
      _results = [];
      for (i = _i = 0, _len = blocks.length; _i < _len; i = ++_i) {
        block = blocks[i];
        Body.setAngle(block, Math.sin(ticks + i) * 400 * Math.PI / 180);
        _results.push(Body.setPosition(block, getBlockPosition(ticks, i)));
      }
      return _results;
    });
  };

}).call(this);
