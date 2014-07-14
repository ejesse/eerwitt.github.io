// Generated by CoffeeScript 1.7.1
(function() {
  var Bodies, Body, World;

  World = Matter.World;

  Body = Matter.Body;

  Bodies = Matter.Bodies;

  window.mapLoader = function(level, engine, onLoaded) {
    var currentBodiesRenderer, levelActions, levelLayout;
    window.scenery = [];
    currentBodiesRenderer = engine.render.controller.bodies;
    engine.render.controller.bodies = function(engine, bodies, context) {
      currentBodiesRenderer(engine, window.scenery, context);
      return currentBodiesRenderer(engine, bodies, context);
    };
    levelLayout = "/javascripts/jump/js/game/levels/layouts/" + level + ".js";
    levelActions = "/javascripts/jump/js/game/levels/actions/" + level + ".js";
    $.getScript(levelActions).done(function(script, textStatus) {
      return runLevelActions(engine);
    });
    return $.getJSON(levelLayout, function(levelData) {
      var body, foreGroundObjects, levelOffset, midGroundObjects, texture, tile;
      levelOffset = {
        x: 0,
        y: 0
      };
      if (levelData.midground != null) {
        midGroundObjects = (function() {
          var _i, _len, _ref, _results;
          _ref = levelData.midground.tiles;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tile = _ref[_i];
            console.debug("Creating midground tile");
            texture = levelData.midground.tileTextures[tile.type];
            body = {
              render: {
                spriteSheet: tile.spriteSheet,
                texture: texture,
                tile: {
                  rotation: tile.rotation
                }
              },
              position: {
                x: tile.x - levelOffset.x,
                y: tile.y - levelOffset.y
              }
            };
            if (tile.osilates) {
              body.render.tile.osilates = true;
              body.render.tile.osilation = Math.random(tile.osilation);
              body.render.tile.osilationAmount = Math.random(20) * 15;
            }
            _results.push(body);
          }
          return _results;
        })();
        window.scenery = midGroundObjects;
      }
      if (levelData.foreground != null) {
        foreGroundObjects = (function() {
          var _i, _len, _ref, _results;
          _ref = levelData.foreground.tiles;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tile = _ref[_i];
            console.debug("Creating foreground tile");
            texture = levelData.foreground.tileTextures[tile.type];
            body = Bodies.rectangle(tile.x - levelOffset.x, tile.y - levelOffset.y, texture.width, texture.height, {
              isStatic: true,
              render: {
                spriteSheet: tile.spriteSheet,
                texture: texture,
                tile: {
                  rotation: tile.rotation
                }
              }
            });
            body.label = tile.type;
            _results.push(body);
          }
          return _results;
        })();
        World.add(engine.world, foreGroundObjects);
      }
      return onLoaded();
    });
  };

}).call(this);
