// eslint-disable-next-line node/no-extraneous-import
import interact from '@interactjs/interactjs/index'

// Interactables
interact(document.body)
interact(document)
interact(window)

interact('.drag-and-resize')
  .draggable({
    modifiers: [
      interact.modifiers.snap({
        targets: [
          { x: 100, y: 200 },
          (x: number, y: number) => ({ x: x % 20, y }),
        ],
        offset: 'startCoords',
        relativePoints: [{ x: 0, y: 1 }],
        endOnly: true,
      }),
      interact.modifiers.snapSize({
        targets: [
          { x: 100, y: 200 },
          (x: number, y: number) => ({ x: x % 20, y }),
        ],
        endOnly: true,
      }),
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true,
      }),
      interact.modifiers.restrict({
        restriction: _ => ({ top: 0, left: 0, bottom: 1, right: 1 }),
      }),
      interact.modifiers.restrict({
        restriction: _ => document.body,
      }),
      interact.modifiers.restrictSize({
        min: document.body,
        max: 'parent',
      }),
      interact.modifiers.restrictEdges({
        inner: document.body,
        outer: 'parent',
      }),
    ],
  })
  .resizable({
    inertia: true,
  })

// Selector context
const myList: HTMLElement | SVGElement = document.querySelector('#my-list')

interact('li', {
  context: myList,
})
  .draggable({ /* ... */ })

// Action options
const target = 'li'
interact(target)
  .draggable({
    max          : 1,
    maxPerElement: 2,
    manualStart  : true,
    modifiers    : [],
    inertia      : {/* ... */},
    autoScroll   : {/* ... */},

    lockAxis     : 'x' || 'y' || 'start',
    startAxis    : 'x' || 'y',
  })
  .resizable({
    max          : 1,
    maxPerElement: 2,
    manualStart  : true,
    modifiers    : [],
    inertia      : {/* ... */},
    autoScroll   : {/* ... */},
    margin       : 50,

    square       : true || false,
    axis         : 'x' || 'y',
  })
  .gesturable({
    max          : 1,
    maxPerElement: 2,
    manualStart  : true,
    modifiers    : [],
  })

// autoscroll
const element = 'li'
interact(element)
  .draggable({
    autoScroll: true,
  })
  .resizable({
    autoScroll: {
      container: document.body,
      margin: 50,
      distance: 5,
      interval: 10,
    },
  })

// axis
interact(target).draggable({
  startAxis: 'x',
  lockAxis: 'y',
}).draggable({
  startAxis: 'xy',
  lockAxis: 'x',
})

interact(target).resizable({
  axis: 'x',
})

const handleEl = 'li'
interact(target).resizable({
  edges: {
    top   : true,       // Use pointer coords to check for resize.
    left  : false,      // Disable resizing from left edge.
    bottom: '.resize-s', // Resize if pointer target matches selector
    right : handleEl,    // Resize if pointer target is the given Element
  },
})

// resize invert
interact(target).resizable({
  edges: { bottom: true, right: true },
  invert: 'reposition',
})

// resize square
interact(target).resizable({
  squareResize: true,
})

// dropzone  accept
interact(target).dropzone({
  accept: '.drag0, .drag1',
})

// dropzone overlap
interact(target).dropzone({
  overlap: 0.25,
})

// dropzone checker
interact(target).dropzone({
  checker (
    _dragEvent: Interact.Element,           // related dragmove or dragend
    _event: Event,                          // Touch, Pointer or Mouse Event
    dropped: boolean,                       // bool default checker result
    _dropzone: Interact.Interactable,       // dropzone Interactable
    dropElement: Interact.Element,          // dropzone elemnt
    _draggable: Interact.Interactable,      // draggable Interactable
    _draggableElement: Interact.Element) {  // draggable element
    // only allow drops into empty dropzone elements
    return dropped && !dropElement.hasChildNodes()
  },
})

interact.dynamicDrop()
interact.dynamicDrop(false)

// Events
function listener (event) {
  const { type, pageX, pageY } = event
  alert({ type, pageX, pageY })
}

interact(target)
  .on('dragstart', listener)
  .on('dragmove dragend', listener)
  .on(['resizemove', 'resizeend'], listener)
  .on({
    gesturestart: listener,
    gestureend: listener,
  })

interact.on('resize', (event: Interact.ResizeEvent) => {
  const { rect, deltaRect } = event
  alert(JSON.stringify({ rect, deltaRect }))
})

interact(target).resizable({
  listeners: [
    { start: listener, move: listener },
  ],
})

interact(target).draggable({
  listeners: { start: listener, end: listener },
})

interact(target).draggable({
  onstart: listener,
  onmove: listener,
  onend: listener,
})

interact.on(['dragmove', 'resizestart'], listener)

const dropTarget = 'div'
// Drop Events
interact(dropTarget)
  .dropzone({
    ondrop (event) {
      alert(event.relatedTarget.id +
            ' was dropped into ' +
            event.target.id)
    },
  })
  .on('dropactivate', event => {
    event.target.classList.add('drop-activated')
  })

interact(target).on('up', _event => {})

// fast click
interact('a[href]').on('tap', event => {
  window.location.href = event.currentTarget.href

  event.preventDefault()
})
