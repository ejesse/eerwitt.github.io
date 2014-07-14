Events = Matter.Events
World = Matter.World
Bodies = Matter.Bodies
Body = Matter.Body

window.runLevelActions = (engine) ->
  ticks = 0

  getBlockPosition = (tick, offset) ->
    {
      x: Math.sin(ticks + offset) * 400 + engine.render.options.width / 2
      y: Math.cos(ticks + offset) * 400 + engine.render.options.height / 2
    }

  greenBlockPosition = getBlockPosition(ticks, 0)
  greenBlock = Bodies.rectangle(
    greenBlockPosition.x,
    greenBlockPosition.y,
    51, 51,
    isStatic: true
    render:
      spriteSheet: "./img/kenny/Enemies/enemies_spritesheet.png"
      tile:
        rotation: 0
      texture:
        name: "blockerMad"
        x: 136
        y: 66
        width: 51
        height: 51
  )

  blocks = for i in [1..19]
    #continue if (i % 4) == 0
    position = getBlockPosition ticks, i
    Bodies.rectangle position.x,
      position.y,
      70, 70,
      isStatic: true
      render:
        spriteSheet: "./img/kenny/Tiles/tiles_spritesheet.png"
        tile:
          rotation: 0
        texture:
          name: "brickWall"
          x: 216
          y: 0
          width: 70
          height: 70

  blocks.unshift greenBlock
  World.add engine.world, blocks

  Events.on engine, "beforeTick", (e) ->
    ticks += 0.0005
    x = Math.sin(ticks)
    y = Math.cos(ticks)

    engine.world.gravity.x = Math.sin(ticks)
    engine.world.gravity.y = Math.cos(ticks)

    for block, i in blocks
      Body.setAngle block, Math.sin(ticks + i) * 400 * Math.PI / 180
      Body.setPosition block, getBlockPosition(ticks, i)
