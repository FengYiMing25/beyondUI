/* eslint-disable */
/* eslint-disable */
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var deepmerge = {exports: {}};

(function (module, exports) {
(function (root, factory) {
    {
        module.exports = factory();
    }
}(commonjsGlobal, function () {

function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object';

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var arrayMerge = options.arrayMerge || defaultArrayMerge;

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

return deepmerge

}));
}(deepmerge));

var merge = deepmerge.exports;

//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

var namespaces$1 = {exports: {}};

(function (module, exports) {
const namespaces = {
  svg: {
    name: 'xmlns',
    uri: 'http://www.w3.org/2000/svg'
  },
  xlink: {
    name: 'xmlns:xlink',
    uri: 'http://www.w3.org/1999/xlink'
  }
};

exports.default = namespaces;
module.exports = exports.default;
}(namespaces$1, namespaces$1.exports));

var namespaces = namespaces$1.exports;

/**
 * @param {Object} attrs
 * @return {string}
 */
function objectToAttrsString (attrs) {
  return Object.keys(attrs).map((attr) => {
    const value = attrs[attr].toString().replace(/"/g, '&quot;');
    return `${attr}="${value}"`;
  }).join(' ');
}

const { svg: svg$1, xlink: xlink$1 } = namespaces;

const defaultAttrs = {
  [svg$1.name]: svg$1.uri,
  [xlink$1.name]: xlink$1.uri
};

/**
 * @param {string} [content]
 * @param {Object} [attributes]
 * @return {string}
 */
function wrapInSvgString (content = '', attributes) {
  const attrs = merge(defaultAttrs, attributes || {});
  const attrsRendered = objectToAttrsString(attrs);
  return `<svg ${attrsRendered}>${content}</svg>`;
}

const { svg, xlink } = namespaces;

var defaultConfig$1 = {
  attrs: {
    [svg.name]: svg.uri,
    [xlink.name]: xlink.uri,
    style: ['position: absolute', 'width: 0', 'height: 0'].join('; '),
    'aria-hidden': 'true'
  }
};

class Sprite {
  /**
   * @param {Object} [config]
   */
  constructor(config) {
    this.config = merge(defaultConfig$1, config || {});
    this.symbols = [];
  }

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * @param {SpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  add(symbol) {
    const { symbols } = this;
    const existing = this.find(symbol.id);

    if (existing) {
      symbols[symbols.indexOf(existing)] = symbol;
      return false;
    }

    symbols.push(symbol);
    return true;
  }

  /**
   * Remove symbol & destroy it
   * @param {string} id
   * @return {boolean} `true` - symbol was found & successfully destroyed, `false` - otherwise
   */
  remove(id) {
    const { symbols } = this;
    const symbol = this.find(id);

    if (symbol) {
      symbols.splice(symbols.indexOf(symbol), 1);
      symbol.destroy();
      return true;
    }

    return false;
  }

  /**
   * @param {string} id
   * @return {SpriteSymbol|null}
   */
  find(id) {
    return this.symbols.filter(s => s.id === id)[0] || null;
  }

  /**
   * @param {string} id
   * @return {boolean}
   */
  has(id) {
    return this.find(id) !== null;
  }

  /**
   * @return {string}
   */
  stringify() {
    const { attrs } = this.config;
    const stringifiedSymbols = this.symbols.map(s => s.stringify()).join('');
    return wrapInSvgString(stringifiedSymbols, attrs);
  }

  /**
   * @return {string}
   */
  toString() {
    return this.stringify();
  }

  destroy() {
    this.symbols.forEach(s => s.destroy());
  }
}

class SpriteSymbol {
  constructor({ id, viewBox, content }) {
    this.id = id;
    this.viewBox = viewBox;
    this.content = content;
  }

  /**
   * @return {string}
   */
  stringify() {
    return this.content;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.stringify();
  }

  destroy() {
    ['id', 'viewBox', 'content'].forEach(prop => delete this[prop]);
  }
}

/**
 * @param {string} content
 * @return {Element}
 */
function parse (content) {
  const hasImportNode = !!document.importNode;
  const doc = new DOMParser().parseFromString(content, 'image/svg+xml').documentElement;

  /**
   * Fix for browser which are throwing WrongDocumentError
   * if you insert an element which is not part of the document
   * @see http://stackoverflow.com/a/7986519/4624403
   */
  if (hasImportNode) {
    return document.importNode(doc, true);
  }

  return doc;
}

class BrowserSpriteSymbol extends SpriteSymbol {
  get isMounted() {
    return !!this.node;
  }

  /**
   * @param {Element} node
   * @return {BrowserSpriteSymbol}
   */
  static createFromExistingNode(node) {
    return new BrowserSpriteSymbol({
      id: node.getAttribute('id'),
      viewBox: node.getAttribute('viewBox'),
      content: node.outerHTML
    });
  }

  destroy() {
    if (this.isMounted) {
      this.unmount();
    }
    super.destroy();
  }

  /**
   * @param {Element|string} target
   * @return {Element}
   */
  mount(target) {
    if (this.isMounted) {
      return this.node;
    }

    const mountTarget = typeof target === 'string' ? document.querySelector(target) : target;
    const node = this.render();
    this.node = node;

    mountTarget.appendChild(node);

    return node;
  }

  /**
   * @return {Element}
   */
  render() {
    const content = this.stringify();
    return parse(wrapInSvgString(content)).childNodes[0];
  }

  unmount() {
    this.node.parentNode.removeChild(this.node);
  }
}

var defaultConfig = {
  /**
   * Should following options be automatically configured:
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @type {boolean}
   */
  autoConfigure: true,

  /**
   * Default mounting selector
   * @type {string}
   */
  mountTo: 'body',

  /**
   * Fix disappearing SVG elements when <base href> exists.
   * Executes when sprite mounted.
   * @see http://stackoverflow.com/a/18265336/796152
   * @see https://github.com/everdimension/angular-svg-base-fix
   * @see https://github.com/angular/angular.js/issues/8934#issuecomment-56568466
   * @type {boolean}
   */
  syncUrlsWithBaseTag: false,

  /**
   * Should sprite listen custom location change event
   * @type {boolean}
   */
  listenLocationChangeEvent: true,

  /**
   * Custom window event name which should be emitted to update sprite urls
   * @type {string}
   */
  locationChangeEvent: 'locationChange',

  /**
   * Emit location change event in Angular automatically
   * @type {boolean}
   */
  locationChangeAngularEmitter: false,

  /**
   * Selector to find symbols usages when updating sprite urls
   * @type {string}
   */
  usagesToUpdate: 'use[*|href]',

  /**
   * Fix Firefox bug when gradients and patterns don't work if they are within a symbol.
   * Executes when sprite is rendered, but not mounted.
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=306674
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=353575
   * @see https://bugzilla.mozilla.org/show_bug.cgi?id=1235364
   * @type {boolean}
   */
  moveGradientsOutsideSymbol: false
};

/**
 * @param {*} arrayLike
 * @return {Array}
 */
function arrayFrom (arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
}

var browser = {
  isChrome: () => /chrome/i.test(navigator.userAgent),
  isFirefox: () => /firefox/i.test(navigator.userAgent),

  // https://msdn.microsoft.com/en-us/library/ms537503(v=vs.85).aspx
  isIE: () => /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent),
  isEdge: () => /edge/i.test(navigator.userAgent)
};

/**
 * @param {string} name
 * @param {*} data
 */
function dispatchEvent (name, data) {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(name, false, false, data);
  window.dispatchEvent(event);
}

/**
 * IE doesn't evaluate <style> tags in SVGs that are dynamically added to the page.
 * This trick will trigger IE to read and use any existing SVG <style> tags.
 * @see https://github.com/iconic/SVGInjector/issues/23
 * @see https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
 *
 * @param {Element} node DOM Element to search <style> tags in
 * @return {Array<HTMLStyleElement>}
 */
function evalStylesIEWorkaround (node) {
  const updatedNodes = [];

  arrayFrom(node.querySelectorAll('style'))
    .forEach((style) => {
      style.textContent += '';
      updatedNodes.push(style);
    });

  return updatedNodes;
}

/**
 * @param {string} [url] If not provided - current URL will be used
 * @return {string}
 */
function getUrlWithoutFragment (url) {
  return (url || window.location.href).split('#')[0];
}

/* global angular */

/**
 * @param {string} eventName
 */
function locationChangeAngularEmitter (eventName) {
  angular.module('ng').run(['$rootScope', ($rootScope) => {
    $rootScope.$on('$locationChangeSuccess', (e, newUrl, oldUrl) => {
      dispatchEvent(eventName, { oldUrl, newUrl });
    });
  }]);
}

const defaultSelector = 'linearGradient, radialGradient, pattern, mask, clipPath';

/**
 * @param {Element} svg
 * @param {string} [selector]
 * @return {Element}
 */
function moveGradientsOutsideSymbol (svg, selector = defaultSelector) {
  arrayFrom(svg.querySelectorAll('symbol')).forEach((symbol) => {
    arrayFrom(symbol.querySelectorAll(selector)).forEach((node) => {
      symbol.parentNode.insertBefore(node, symbol);
    });
  });
  return svg;
}

/**
 * @param {NodeList} nodes
 * @param {Function} [matcher]
 * @return {Attr[]}
 */
function selectAttributes(nodes, matcher) {
  const attrs = arrayFrom(nodes).reduce((acc, node) => {
    if (!node.attributes) {
      return acc;
    }

    const arrayfied = arrayFrom(node.attributes);
    const matched = matcher ? arrayfied.filter(matcher) : arrayfied;
    return acc.concat(matched);
  }, []);

  return attrs;
}

const xLinkNS = namespaces.xlink.uri;
const xLinkAttrName = 'xlink:href';

// eslint-disable-next-line no-useless-escape
const specialUrlCharsPattern = /[{}|\\\^\[\]`"<>]/g;

function encoder(url) {
  return url.replace(specialUrlCharsPattern, (match) => {
    return `%${match[0].charCodeAt(0).toString(16).toUpperCase()}`;
  });
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

/**
 * @param {NodeList} nodes
 * @param {string} startsWith
 * @param {string} replaceWith
 * @return {NodeList}
 */
function updateReferences(nodes, startsWith, replaceWith) {
  arrayFrom(nodes).forEach((node) => {
    const href = node.getAttribute(xLinkAttrName);
    if (href && href.indexOf(startsWith) === 0) {
      const newUrl = href.replace(startsWith, replaceWith);
      node.setAttributeNS(xLinkNS, xLinkAttrName, newUrl);
    }
  });

  return nodes;
}

/**
 * List of SVG attributes to update url() target in them
 */
const attList = [
  'clipPath',
  'colorProfile',
  'src',
  'cursor',
  'fill',
  'filter',
  'marker',
  'markerStart',
  'markerMid',
  'markerEnd',
  'mask',
  'stroke',
  'style'
];

const attSelector = attList.map(attr => `[${attr}]`).join(',');

/**
 * Update URLs in svg image (like `fill="url(...)"`) and update referencing elements
 * @param {Element} svg
 * @param {NodeList} references
 * @param {string|RegExp} startsWith
 * @param {string} replaceWith
 * @return {void}
 *
 * @example
 * const sprite = document.querySelector('svg.sprite');
 * const usages = document.querySelectorAll('use');
 * updateUrls(sprite, usages, '#', 'prefix#');
 */
function updateUrls (svg, references, startsWith, replaceWith) {
  const startsWithEncoded = encoder(startsWith);
  const replaceWithEncoded = encoder(replaceWith);

  const nodes = svg.querySelectorAll(attSelector);
  const attrs = selectAttributes(nodes, ({ localName, value }) => {
    return attList.indexOf(localName) !== -1 && value.indexOf(`url(${startsWithEncoded}`) !== -1;
  });

  attrs.forEach(attr => attr.value = attr.value.replace(new RegExp(escapeRegExp(startsWithEncoded), 'g'), replaceWithEncoded));
  updateReferences(references, startsWithEncoded, replaceWithEncoded);
}

/**
 * Internal emitter events
 * @enum
 * @private
 */
const Events = {
  MOUNT: 'mount',
  SYMBOL_MOUNT: 'symbol_mount'
};

class BrowserSprite extends Sprite {
  constructor(cfg = {}) {
    super(merge(defaultConfig, cfg));

    const emitter = mitt();
    this._emitter = emitter;
    this.node = null;

    const { config } = this;

    if (config.autoConfigure) {
      this._autoConfigure(cfg);
    }

    if (config.syncUrlsWithBaseTag) {
      const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
      emitter.on(Events.MOUNT, () => this.updateUrls('#', baseUrl));
    }

    const handleLocationChange = this._handleLocationChange.bind(this);
    this._handleLocationChange = handleLocationChange;

    // Provide way to update sprite urls externally via dispatching custom window event
    if (config.listenLocationChangeEvent) {
      window.addEventListener(config.locationChangeEvent, handleLocationChange);
    }

    // Emit location change event in Angular automatically
    if (config.locationChangeAngularEmitter) {
      locationChangeAngularEmitter(config.locationChangeEvent);
    }

    // After sprite mounted
    emitter.on(Events.MOUNT, (spriteNode) => {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(spriteNode);
      }
    });

    // After symbol mounted into sprite
    emitter.on(Events.SYMBOL_MOUNT, (symbolNode) => {
      if (config.moveGradientsOutsideSymbol) {
        moveGradientsOutsideSymbol(symbolNode.parentNode);
      }

      if (browser.isIE() || browser.isEdge()) {
        evalStylesIEWorkaround(symbolNode);
      }
    });
  }

  /**
   * @return {boolean}
   */
  get isMounted() {
    return !!this.node;
  }

  /**
   * Automatically configure following options
   * - `syncUrlsWithBaseTag`
   * - `locationChangeAngularEmitter`
   * - `moveGradientsOutsideSymbol`
   * @param {Object} cfg
   * @private
   */
  _autoConfigure(cfg) {
    const { config } = this;

    if (typeof cfg.syncUrlsWithBaseTag === 'undefined') {
      config.syncUrlsWithBaseTag = typeof document.getElementsByTagName('base')[0] !== 'undefined';
    }

    if (typeof cfg.locationChangeAngularEmitter === 'undefined') {
        config.locationChangeAngularEmitter = typeof window.angular !== 'undefined';
    }

    if (typeof cfg.moveGradientsOutsideSymbol === 'undefined') {
      config.moveGradientsOutsideSymbol = browser.isFirefox();
    }
  }

  /**
   * @param {Event} event
   * @param {Object} event.detail
   * @param {string} event.detail.oldUrl
   * @param {string} event.detail.newUrl
   * @private
   */
  _handleLocationChange(event) {
    const { oldUrl, newUrl } = event.detail;
    this.updateUrls(oldUrl, newUrl);
  }

  /**
   * Add new symbol. If symbol with the same id exists it will be replaced.
   * If sprite already mounted - `symbol.mount(sprite.node)` will be called.
   * @fires Events#SYMBOL_MOUNT
   * @param {BrowserSpriteSymbol} symbol
   * @return {boolean} `true` - symbol was added, `false` - replaced
   */
  add(symbol) {
    const sprite = this;
    const isNewSymbol = super.add(symbol);

    if (this.isMounted && isNewSymbol) {
      symbol.mount(sprite.node);
      this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    }

    return isNewSymbol;
  }

  /**
   * Attach to existing DOM node
   * @param {string|Element} target
   * @return {Element|null} attached DOM Element. null if node to attach not found.
   */
  attach(target) {
    const sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    /** @type Element */
    const node = typeof target === 'string' ? document.querySelector(target) : target;
    sprite.node = node;

    // Already added symbols needs to be mounted
    this.symbols.forEach((symbol) => {
      symbol.mount(sprite.node);
      this._emitter.emit(Events.SYMBOL_MOUNT, symbol.node);
    });

    // Create symbols from existing DOM nodes, add and mount them
    arrayFrom(node.querySelectorAll('symbol'))
      .forEach((symbolNode) => {
        const symbol = BrowserSpriteSymbol.createFromExistingNode(symbolNode);
        symbol.node = symbolNode; // hack to prevent symbol mounting to sprite when adding
        sprite.add(symbol);
      });

    this._emitter.emit(Events.MOUNT, node);

    return node;
  }

  destroy() {
    const { config, symbols, _emitter } = this;

    symbols.forEach(s => s.destroy());

    _emitter.off('*');
    window.removeEventListener(config.locationChangeEvent, this._handleLocationChange);

    if (this.isMounted) {
      this.unmount();
    }
  }

  /**
   * @fires Events#MOUNT
   * @param {string|Element} [target]
   * @param {boolean} [prepend=false]
   * @return {Element|null} rendered sprite node. null if mount node not found.
   */
  mount(target = this.config.mountTo, prepend = false) {
    const sprite = this;

    if (sprite.isMounted) {
      return sprite.node;
    }

    const mountNode = typeof target === 'string' ? document.querySelector(target) : target;
    const node = sprite.render();
    this.node = node;

    if (prepend && mountNode.childNodes[0]) {
      mountNode.insertBefore(node, mountNode.childNodes[0]);
    } else {
      mountNode.appendChild(node);
    }

    this._emitter.emit(Events.MOUNT, node);

    return node;
  }

  /**
   * @return {Element}
   */
  render() {
    return parse(this.stringify());
  }

  /**
   * Detach sprite from the DOM
   */
  unmount() {
    this.node.parentNode.removeChild(this.node);
  }

  /**
   * Update URLs in sprite and usage elements
   * @param {string} oldUrl
   * @param {string} newUrl
   * @return {boolean} `true` - URLs was updated, `false` - sprite is not mounted
   */
  updateUrls(oldUrl, newUrl) {
    if (!this.isMounted) {
      return false;
    }

    const usages = document.querySelectorAll(this.config.usagesToUpdate);

    updateUrls(
      this.node,
      usages,
      `${getUrlWithoutFragment(oldUrl)}#`,
      `${getUrlWithoutFragment(newUrl)}#`
    );

    return true;
  }

}

const spriteNodeId = '__SVG_SPRITE_NODE__';
const spriteGlobalVarName = '__SVG_SPRITE__';

const loadSprite = () => {
  /**
   * Check for page already contains sprite node
   * If found - attach to and reuse it's content
   * If not - render and mount the new sprite
   */
  const existing = document.getElementById(spriteNodeId);

  if (existing) {
    sprite.attach(existing);
  } else {
    sprite.mount(document.body, true);
  }
};

/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 */
const createDomReady = () => {
  var fns = [],
    listener,
    doc = document,
    hack = doc.documentElement.doScroll,
    domContentLoaded = 'DOMContentLoaded',
    loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded)
    doc.addEventListener(
      domContentLoaded,
      (listener = function () {
        doc.removeEventListener(domContentLoaded, listener);
        loaded = 1;
        while ((listener = fns.shift())) listener();
      })
    );

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  }
};

let sprite = new BrowserSprite({
  attrs: {
    id: spriteNodeId,
    'aria-hidden': 'true'
  },
  autoConfigure: typeof document !== 'undefined',
  listenLocationChangeEvent: typeof window !== 'undefined'
});

const init = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  if (window[spriteGlobalVarName]) {
    sprite = window[spriteGlobalVarName];
  } else {
    window[spriteGlobalVarName] = sprite;
  }

  if (document.body) {
    loadSprite();
  } else {
    createDomReady()(loadSprite);
  }
};

init();

const symbol$5 = new BrowserSpriteSymbol({"id":"alipay","content":"<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"alipay\"><defs><style type=\"text/css\">@font-face { font-family: feedback-iconfont; src: url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944\") format(\"woff2\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944\") format(\"truetype\"); }\r\n</style></defs><path d=\"M998.912 694.23616 998.912 215.06048c0-103.296-83.82464-187.12064-187.18208-187.12064L212.72064 27.93984C109.42976 27.93984 25.6 111.76448 25.6 215.06048l0 599.00928c0 103.29088 83.7632 187.11552 187.12064 187.11552l599.00928 0c92.03712 0 168.6272-66.54976 184.25856-154.08128-49.6384-21.4784-264.73984-114.37056-376.79616-167.84384-85.27872 103.30112-174.58688 165.28896-309.20704 165.28896s-224.47104-82.9184-213.70368-184.38656c7.1168-66.6112 52.80256-175.49824 251.23328-156.8256 104.57088 9.79456 152.448 29.32736 237.73696 57.48736 22.07744-40.44288 40.38144-84.98176 54.31296-132.36736L261.38624 428.45696l0-37.47328 187.11552 0L448.50176 323.70176 220.2624 323.70176l0-41.2416 228.23936 0L448.50176 185.37472c0 0 2.06848-15.21152 18.86208-15.21152l93.55776 0 0 112.29696 243.31776 0 0 41.2416-243.31776 0 0 67.28192 198.49728 0c-18.2528 74.27584-45.93152 142.52544-80.60416 202.14272C736.48128 613.9904 998.912 694.23616 998.912 694.23616L998.912 694.23616 998.912 694.23616 998.912 694.23616zM295.08608 780.30336c-142.22336 0-164.73088-89.7792-157.18912-127.31904 7.48032-37.3504 48.6656-86.07232 127.74912-86.07232 90.88 0 172.27264 23.23456 269.96736 70.79936C466.9952 727.08096 382.68416 780.30336 295.08608 780.30336L295.08608 780.30336 295.08608 780.30336z\" p-id=\"1911\" /></symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$5);

const symbol$4 = new BrowserSpriteSymbol({"id":"beyond","content":"<symbol class=\"icon\" viewBox=\"0 0 1280 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"beyond\"><defs><style type=\"text/css\">@font-face { font-family: feedback-iconfont; src: url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944\") format(\"woff2\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944\") format(\"truetype\"); }\r\n</style></defs><path d=\"M627.6 483c27.6 0 42-20.2 49.6-35.8-2-2.2-10-8.4-14.8-13.2-4.8 8.6-16.4 21.4-27.8 21.4-20.4 0-30.8-29.4-6.4-53.2-1-0.4-8.6-3.6-16 4.8 0-6 2-10.2 4.2-13.2-7 2.6-19.6 11.2-22.8 15.8 0.4-11.6 3.2-15 1.2-18l-0.4-0.4s-17 11.2-18.6 29.4c0 0 2.2-3.2 4.2-3.8 1.2-0.6 2.6 0 1.2 3.8-0.4 1.2-11.6 31.4 10.2 52-1.2-3.2-3.8-15.2 4.8-3.8-0.6 0.2 11.6 14.2 31.4 14.2z m104.8-42.2c0-8-9.8-8.8-11.2-9 4 7.8 1.8 15 0.4 18 5-0.8 10.8-3.2 10.8-9z m20.6 10.4c0-12.8-12.4-22.8-27-21.4 16 2.6 11.2 27.6-10 22.8 7.4-5.2 6.4-19.8-2.6-25 2.8 8.4-6 16.4-14.8 9.2-4.8-3.8-16-13.2-21.2-17.2-4.8-4.2-11-2-13.2-3.6-2.6-2.2-1-7.6-4.4-10-3.2-1.6-6-0.6-9.6-2-3.2-1.2-5.4-3.8-5.2-7-5 8.8 6.8 12.6 9 17 2 3.8-1.6 9.6 8 17 29.6 23.2 18.2 16 20.8 36.2 1.2 8.6 8.4 13.4 12.8 14.8-4.2-3.8-5.8-12.8 0-18.6 0 27.8 38.4 26.6 46.2 12.8-4.8 2.2-14-0.4-18-3.8 15.4 2 28.4-8.2 29.2-21.2z m-78.8-36.8c4 1.6 3.2 1.4 12.8 9 20.4-49 43.4-31.4 44-31 4.4-3.8 19.6-7.6 27.6-5.4-4.8-5.4-15-12.4-26.6-12.4-9.4 0-14.8 4.4-16 2.6-1.6-2.8 6.4-6.8 6.4-6.8-10.8 0.4-19.2 13.4-22.4 11.8-2.2-1 2.8-7.4 2.8-7.4-10.2 5.8-18.6 18.2-20.4 26 9.2-11.6 27.6-19.6 39.4-18-21 1-39 19.4-47.6 31.6z m485 103.8c-41.4 0-80 2.6-100.6 4.2l14.8 16.4v154.4l-14.8 16.4c20.8 1.6 61.8 4.2 103.2 4.2 84.2 0 118.2-41.4 118.2-97.8 0-58.6-46.4-97.8-120.8-97.8z m-30.2 151.2v-106.6c60.2-6.6 93.6 7.6 93.6 52.6 0 51.2-42.8 60.4-93.6 54zM603.2 362c-2-6.8-0.4-13.8 2.2-18.8 2 6 5.2 12.8 15 18-1-4.8-0.4-11.2 1-16-2.8-10.8 4.2-19.8 12.8-19.8 13.8 0 17 17.6 9.4 28.8 4.2 6.4 11 11.2 15.4 15.6 6.4-7.4 11-19 11-27.6 0-16.4-11-31.8-33.4-33-40-1.8-40.4 33.2-40 37.8 1 10.4 6.8 15.6 6.6 15z m-0.8 12c-1 3.6-14 7.4-20.4 13.8 9.6-2 14-0.4 15.6 3.6 1 2.8-0.4 6.8-1 11.2 3.2-3.6 14-11 22-12.4-2-0.6-6.8-1.6-8.6-1.6 5.8-6.8 18.6-9 25.6-7.4-4.4-0.4-13.4 2.2-17 5.2 3.2 0.6 6 1.2 8.6 2.2-4.2 1.6-9.6 6.8-11.6 12.2 14-10 26.2 10.4 14 16.4 1.6 0.4 5.4 0 7-1-0.6 2.2-3.8 6-6 6.8 5.8 0 14-3.8 16.4-9.2 0 0-3.6 1.2-5.2-0.4s0.6-8.6 0.6-8.6c-4.6 5.8-6.8-2.6-2.6-8.4-2-0.6-7-1.2-9.2-1 6.4-2.2 20.8-3.6 22.4-0.6 1.2 2.2-2 6.8-2 6.8 8-1 16.6 2.2 13.4 10.2 5.8-2.8 11-11.8 9.6-20.8-0.6 2-3.2 4.8-5.8 5.4 0.4-2.8-2-4.4-3.8-5.2 3.4-19.2-29.2-28.4-28.2-47.8-2 2.6-3.6 10-1.6 14.2 5.4 6.4 17.4 13.4 20.2 24.4-5.2-12.8-30.2-22.8-29.2-40.4-3.2 3.2-5.2 15.6-2.6 22 4.8 2.8 9 7.6 9.6 12.2-4.4-10.2-22.8-12.2-27.8-24.4-1.2 4.4-0.6 10 2 13.4 0 0-4.4-1.6-14-1.2 3.4 1.2 10.2 7 9.6 10.4z m51.8 14.8c-5.4 0-7-4.2-8.4-8.6 6.6 2.6 8.4 8.6 8.4 8.6z m77.8 7.4l-2-1.2c-2.2-2-5.8-2.8-9.4-2.8-5.8 0-11.6 2.6-15 6.8-1.6 1.6-2.8 3.6-4.2 5.2v31.4c7 5.2 14.2-5.8 6-14.4 3 0.6 9.2 5.4 10.2 6.4 0 0 5.2-1 10-1 4.2 0 7.8 0.6 11.2 2.2V392c-2.2 1-4.4 2-5.4 2.8zM159.8 611.8c34.4-9.2 32.4-36 32.4-39.8 0-41.2-48.2-50-74-50H6l16.6 17.2v59H0l22.8 29.2V692L6 709.2c123.4 0 147.6 3 172.8-11.8 13.4-8 19.8-19.6 19.8-35.2 0-10.2 5.2-37.6-38.8-50.4z m-82.6-55c40 0 59.2-1.6 59.2 18.2v6c0 24.2-38 17.6-59.2 17.6z m0 118.4V630c24.4 0 65.4-4.6 65.4 17.6v9h0.4c0 22.4-25 18.6-65.8 18.6z m202.4-38.6l46.2 0.4v-0.4l28.2-42.4h-74.4v-29.8h104.8l-28.2-42v-0.4l-147 0.4 14.8 16.4v154.2l-14.8 16.4h162.4l28.2-42.4-120.2 0.4z m429.4-120.2c-147.8 0-155 198.6-0.6 198.6 155.8 0 148.2-198.6 0.6-198.6z m-0.6 155c-74.8 0-73.8-110.6 0.4-110.6 73.6 0.2 77.6 110.6-0.4 110.6z m-182.6-16.6l88.2-132.4h-83.4l12.2 14.4-41 74.4h-0.6l-42-74.4 12.8-14.4h-89.8l88.2 131.6 0.4 38.8-15.4 16.4h85.2l-14.4-16.4z m-56.8-302.6c3.2 2.6 5.8 4.8 5.8 13.2v77.6c0 8.4-1.6 10.6-5.4 12.8-0.2 0.2-15 9-15.8 9.2h70.2c20 0 34.8-3 52-17.2-1.2-10 0.4-19 1.6-24 0-0.4-3.6 2.8-5.4 7 0-11.4 3.2-30.8 19.2-41-0.2 0-7.4-1.6-18 2.2 4-6.2 20-15.8 20.8-15.8-16.4-52-76-45.8-64.4-45.8-61.8 0-65.2 0.6-79.8-8 0.2 1.6 1 16.4 19.2 29.8z m43 11c9.2 0 46.2-6.6 46.2 34.6 0 41.4-36.8 34.6-46.2 34.6z m457.8 159.2l14 16.6V624h-0.6c-10.8-28.8-84.6-83-90.4-101.8h-63.2l14.8 17v153.8l-14.4 16.6h78l-14.8-16.4v-94.8h0.6c7.4 21.2 89 85.8 97 111.2h42.6v-170.4l14.8-16.6z m-213.4-192.2c-64.4 0-65.6 0.4-79.8-8 0.2 1.4 1 16.6 19.2 29.8 6.2 4 5.8 8.6 5.8 19 3.6-2.2 7.6-4.4 12.2-6-2.2 2.2-5.4 5.4-7 9 2-2.2 15-10.2 29.2-7-3.2 0.6-8 2.2-12.2 5.8 0.2 0 4.2-2.2 15-0.6v-8.6c9.4 0 46.2-6.8 46.2 34.6 0 41-37 34.6-39.4 34.6 11.4 8.8 11.6 24 4.4 32.6h0.6c66.8 0 73.4-54.6 73.4-68 0-7.6-2.2-64-67.6-67.2z\" p-id=\"1806\" /></symbol>","viewBox":"0 0 1280 1024"});
sprite.add(symbol$4);

const symbol$3 = new BrowserSpriteSymbol({"id":"close","content":"<symbol class=\"icon\" viewBox=\"0 0 1045 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"close\"><defs><style type=\"text/css\">@font-face { font-family: feedback-iconfont; src: url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944\") format(\"woff2\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944\") format(\"truetype\"); }\r\n</style></defs><path d=\"M282.517333 213.376l-45.354666 45.162667L489.472 512 237.162667 765.461333l45.354666 45.162667L534.613333 557.354667l252.096 253.269333 45.354667-45.162667-252.288-253.44 252.288-253.482666-45.354667-45.162667L534.613333 466.624l-252.096-253.226667z\" p-id=\"2131\" /></symbol>","viewBox":"0 0 1045 1024"});
sprite.add(symbol$3);

const symbol$2 = new BrowserSpriteSymbol({"id":"happy","content":"<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"happy\"><defs><style type=\"text/css\">@font-face { font-family: feedback-iconfont; src: url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944\") format(\"woff2\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944\") format(\"truetype\"); }\r\n</style></defs><path d=\"M512 512m-362.666667 0a362.666667 362.666667 0 1 0 725.333334 0 362.666667 362.666667 0 1 0-725.333334 0Z\" fill=\"#FF6D00\" p-id=\"4656\" /><path d=\"M512 149.333333l6.890667 0.064C716.010667 153.066667 874.666667 314.005333 874.666667 512c0 28.757333-3.349333 56.704-9.664 83.541333C806.229333 709.504 670.293333 789.333333 512 789.333333s-294.229333-79.829333-352.981333-193.792A362.794667 362.794667 0 0 1 149.333333 512c0-200.298667 162.368-362.666667 362.666667-362.666667z\" fill=\"#FB8B18\" p-id=\"4657\" /><path d=\"M512 149.333333c157.12 0 290.901333 99.904 341.269333 239.658667C849.706667 528.085333 698.282667 640 512 640c-188.522667 0-341.333333-114.624-341.333333-256l0.042666 5.013333C221.077333 249.258667 354.88 149.333333 512 149.333333z\" fill=\"#FFA243\" p-id=\"4658\" /><path d=\"M277.333333 288a234.666667 138.666667 0 1 0 469.333334 0 234.666667 138.666667 0 1 0-469.333334 0Z\" fill=\"#FFB468\" p-id=\"4659\" /><path d=\"M405.333333 213.333333a106.666667 64 0 1 0 213.333334 0 106.666667 64 0 1 0-213.333334 0Z\" fill=\"#FFD3A5\" p-id=\"4660\" /><path d=\"M392.576 413.589333l-12.586667 114.645334-68.245333-92.992-114.645333-12.586667 92.992-68.245333 12.586666-114.645334 68.245334 92.992 114.645333 12.586667zM610.090667 413.589333l12.586666 114.645334 68.245334-92.992 114.645333-12.586667-92.992-68.245333-12.586667-114.645334-68.245333 92.992-114.645333 12.586667z\" fill=\"#C30000\" p-id=\"4661\" /><path d=\"M392.576 392.256l-12.586667 114.645333-68.245333-92.992-114.645333-12.586666 92.992-68.245334 12.586666-114.645333 68.245334 92.992 114.645333 12.586667zM610.090667 392.256l12.586666 114.645333 68.245334-92.992 114.645333-12.586666-92.992-68.245334-12.586667-114.645333-68.245333 92.992-114.645333 12.586667z\" fill=\"#FF4D37\" p-id=\"4662\" /><path d=\"M512 746.666667c94.72 0.042667 150.912-59.52 167.061333-138.730667 0.938667-4.544 1.728-12.608 2.410667-24.170667a21.333333 21.333333 0 0 0-25.536-22.144c-34.666667 6.997333-82.666667 10.496-143.936 10.496-61.290667 0-109.269333-3.498667-143.957333-10.496a21.333333 21.333333 0 0 0-25.514667 22.122667c0.661333 11.52 1.450667 19.52 2.368 24.042667 16.106667 79.296 72.362667 138.837333 167.104 138.88z\" fill=\"#C50B0B\" p-id=\"4663\" /><path d=\"M322.005333 574.08a42.666667 42.666667 0 0 0-0.768 10.88l0.554667 8.682667c0.618667 8 1.322667 14.037333 2.197333 18.389333 19.242667 94.72 88.106667 155.925333 188.010667 155.968 99.84 0.042667 168.661333-61.077333 187.968-155.797333 0.917333-4.437333 1.621333-10.538667 2.24-18.645334l0.554667-8.490666a42.666667 42.666667 0 0 0-51.050667-44.373334c-33.066667 6.677333-79.722667 10.090667-139.712 10.090667-56.512 0-101.205333-3.008-133.866667-8.96l-6.058666-1.173333a42.602667 42.602667 0 0 0-49.322667 30.336l-0.746667 3.093333z m20.906667 4.224a21.333333 21.333333 0 0 1 22.677333-17.045333l2.453334 0.362666 6.272 1.194667c34.112 6.186667 80 9.301333 137.685333 9.301333 61.269333 0 109.269333-3.498667 143.936-10.496a21.333333 21.333333 0 0 1 25.536 19.626667v2.517333l-0.256 4.16a168.832 168.832 0 0 1-2.133333 20.010667C662.890667 687.168 606.72 746.709333 512 746.666667c-94.72-0.042667-150.997333-59.584-167.104-138.88l-0.661333-4.053334c-0.64-4.693333-1.216-11.349333-1.706667-19.989333a21.333333 21.333333 0 0 1 0.384-5.44z\" fill=\"#FFB468\" p-id=\"4664\" /><path d=\"M512 661.333333c53.866667 0 99.946667 16.64 118.848 40.192C602.453333 729.6 562.773333 746.666667 512 746.666667c-50.709333-0.021333-90.410667-17.109333-118.826667-45.141334C412.074667 677.973333 458.154667 661.333333 512 661.333333z\" fill=\"#FF2A00\" p-id=\"4665\" /></symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$2);

const symbol$1 = new BrowserSpriteSymbol({"id":"QQ","content":"<symbol class=\"icon\" viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"QQ\"><defs><style type=\"text/css\">@font-face { font-family: feedback-iconfont; src: url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944\") format(\"woff2\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944\") format(\"truetype\"); }\r\n</style></defs><path d=\"M824.8 613.2c-16-51.4-34.4-94.6-62.7-165.3C766.5 262.2 689.3 112 511.5 112 331.7 112 256.2 265.2 261 447.9c-28.4 70.8-46.7 113.7-62.7 165.3-34 109.5-23 154.8-14.6 155.8 18 2.2 70.1-82.4 70.1-82.4 0 49 25.2 112.9 79.8 159-26.4 8.1-85.7 29.9-71.6 53.8 11.4 19.3 196.2 12.3 249.5 6.3 53.3 6 238.1 13 249.5-6.3 14.1-23.8-45.3-45.7-71.6-53.8 54.6-46.2 79.8-110.1 79.8-159 0 0 52.1 84.6 70.1 82.4 8.5-1.1 19.5-46.4-14.5-155.8z\" p-id=\"2708\" /></symbol>","viewBox":"0 0 1024 1024"});
sprite.add(symbol$1);

const symbol = new BrowserSpriteSymbol({"id":"wechat","content":"<symbol class=\"icon\" viewBox=\"0 0 1296 1024\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" id=\"wechat\"><defs><style type=\"text/css\">@font-face { font-family: feedback-iconfont; src: url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944\") format(\"woff2\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944\") format(\"woff\"), url(\"//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944\") format(\"truetype\"); }\r\n</style></defs><path d=\"M919.674688 272.371008C860.301264 114.602384 681.577376 0 470.322576 0 210.570592 0 0 173.259968 0 386.986992 0 504.45832 63.612528 609.70472 164.04024 680.677008L97.373616 827.717696 275.38408 739.271872C334.774896 761.557408 400.786464 773.973968 470.322576 773.973968 485.96576 773.973968 501.43056 773.345584 516.681744 772.117808 493.610048 728.00832 480.774192 679.107168 480.774192 627.546464 480.774192 430.27608 668.66736 271.9368 898.838704 271.9368 905.824336 271.9368 912.771008 272.082656 919.674688 272.371008L919.674688 272.371008 919.674688 272.371008ZM271.741936 235.32992C271.741936 209.336096 292.617904 188.263936 318.774192 188.263936 344.749392 188.263936 365.806448 209.15488 365.806448 235.32992 365.806448 261.323744 344.93048 282.395904 318.774192 282.395904 292.798992 282.395904 271.741936 261.504976 271.741936 235.32992L271.741936 235.32992 271.741936 235.32992ZM564.387104 235.32992C564.387104 209.336096 585.263056 188.263936 611.41936 188.263936 637.39456 188.263936 658.451616 209.15488 658.451616 235.32992 658.451616 261.323744 637.575648 282.395904 611.41936 282.395904 585.44416 282.395904 564.387104 261.504976 564.387104 235.32992L564.387104 235.32992ZM1028.70016 943.937488C988.008016 955.796576 944.315984 962.23792 898.838704 962.23792 679.492592 962.23792 501.677424 812.391456 501.677424 627.546464 501.677424 442.701488 679.492592 292.855024 898.838704 292.855024 1118.184832 292.855024 1296 442.701488 1296 627.546464 1296 738.522352 1231.906976 836.88312 1133.213232 897.775344L1182.756336 1024 1028.70016 943.937488 1028.70016 943.937488 1028.70016 943.937488ZM752.516128 543.8736C775.6052 543.8736 794.322576 525.1428 794.322576 502.037168 794.322576 478.931552 775.6052 460.200736 752.516128 460.200736 729.427056 460.200736 710.70968 478.931552 710.70968 502.037168 710.70968 525.1428 729.427056 543.8736 752.516128 543.8736L752.516128 543.8736ZM1024.258064 543.8736C1047.347136 543.8736 1066.064512 525.1428 1066.064512 502.037168 1066.064512 478.931552 1047.347136 460.200736 1024.258064 460.200736 1001.168992 460.200736 982.451616 478.931552 982.451616 502.037168 982.451616 525.1428 1001.168992 543.8736 1024.258064 543.8736L1024.258064 543.8736Z\" p-id=\"1906\" /></symbol>","viewBox":"0 0 1296 1024"});
sprite.add(symbol);

const req = 
  (function() {
    var map = {
      './alipay.svg': symbol$5,
'./beyond.svg': symbol$4,
'./close.svg': symbol$3,
'./happy.svg': symbol$2,
'./QQ.svg': symbol$1,
'./wechat.svg': symbol,

    };
    var req = function req(key) {
      return map[key] || (function() { throw new Error("Cannot find module '" + key + "'.") }());
    };
    req.keys = function() {
      return Object.keys(map);
    };
    return req;
  })();

export { req as default };
