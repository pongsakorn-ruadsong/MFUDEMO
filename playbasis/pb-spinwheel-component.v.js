"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function defineProperties(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(e, t, n) {
            return t && defineProperties(e.prototype, t), n && defineProperties(e, n), e
        }
    }(),
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    };
! function e(t, n, r) {
    function s(o, a) {
        if (!n[o]) {
            if (!t[o]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(o, !0);
                if (i) return i(o, !0);
                var h = new Error("Cannot find module '" + o + "'");
                throw h.code = "MODULE_NOT_FOUND", h
            }
            var c = n[o] = {
                exports: {}
            };
            t[o][0].call(c.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, c, c.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s
}({
    1: [function(e, t, n) {
        (function(e) {
            ! function() {
                function resolve() {
                    document.body.removeAttribute("unresolved")
                }
                window.WebComponents ? addEventListener("WebComponentsReady", resolve) : "interactive" === document.readyState || "complete" === document.readyState ? resolve() : addEventListener("DOMContentLoaded", resolve)
            }(), window.Polymer = {
                    Settings: function() {
                        var e = window.Polymer || {};
                        if (!e.noUrlSettings)
                            for (var t, n = location.search.slice(1).split("&"), r = 0; r < n.length && (t = n[r]); r++) t = t.split("="), t[0] && (e[t[0]] = t[1] || !0);
                        return e.wantShadow = "shadow" === e.dom, e.hasShadow = Boolean(Element.prototype.createShadowRoot), e.nativeShadow = e.hasShadow && !window.ShadowDOMPolyfill, e.useShadow = e.wantShadow && e.hasShadow, e.hasNativeImports = Boolean("import" in document.createElement("link")), e.useNativeImports = e.hasNativeImports, e.useNativeCustomElements = !window.CustomElements || window.CustomElements.useNative, e.useNativeShadow = e.useShadow && e.nativeShadow, e.usePolyfillProto = !e.useNativeCustomElements && !Object.__proto__, e.hasNativeCSSProperties = !navigator.userAgent.match("AppleWebKit/601") && window.CSS && CSS.supports && CSS.supports("box-shadow", "0 0 0 var(--foo)"), e.useNativeCSSProperties = e.hasNativeCSSProperties && e.lazyRegister && e.useNativeCSSProperties, e.isIE = navigator.userAgent.match("Trident"), e
                    }()
                },
                function() {
                    var e = window.Polymer;
                    window.Polymer = function(e) {
                        "function" == typeof e && (e = e.prototype), e || (e = {});
                        var n = t(e);
                        e = n.prototype;
                        var r = {
                            prototype: e
                        };
                        return e.extends && (r.extends = e.extends), Polymer.telemetry._registrate(e), document.registerElement(e.is, r), n
                    };
                    var t = function desugar(e) {
                        var t = Polymer.Base;
                        return e.extends && (t = Polymer.Base._getExtendedPrototype(e.extends)), e = Polymer.Base.chainObject(e, t), e.registerCallback(), e.constructor
                    };
                    if (e)
                        for (var n in e) Polymer[n] = e[n];
                    Polymer.Class = t
                }(), Polymer.telemetry = {
                    registrations: [],
                    _regLog: function _regLog(e) {
                        console.log("[" + e.is + "]: registered")
                    },
                    _registrate: function _registrate(e) {
                        this.registrations.push(e), Polymer.log && this._regLog(e)
                    },
                    dumpRegistrations: function dumpRegistrations() {
                        this.registrations.forEach(this._regLog)
                    }
                }, Object.defineProperty(window, "currentImport", {
                    enumerable: !0,
                    configurable: !0,
                    get: function get() {
                        return (document._currentScript || document.currentScript || {}).ownerDocument
                    }
                }), Polymer.RenderStatus = {
                    _ready: !1,
                    _callbacks: [],
                    whenReady: function whenReady(e) {
                        this._ready ? e() : this._callbacks.push(e)
                    },
                    _makeReady: function _makeReady() {
                        this._ready = !0;
                        for (var e = 0; e < this._callbacks.length; e++) this._callbacks[e]();
                        this._callbacks = []
                    },
                    _catchFirstRender: function _catchFirstRender() {
                        requestAnimationFrame(function() {
                            Polymer.RenderStatus._makeReady()
                        })
                    },
                    _afterNextRenderQueue: [],
                    _waitingNextRender: !1,
                    afterNextRender: function afterNextRender(e, t, n) {
                        this._watchNextRender(), this._afterNextRenderQueue.push([e, t, n])
                    },
                    hasRendered: function hasRendered() {
                        return this._ready
                    },
                    _watchNextRender: function _watchNextRender() {
                        if (!this._waitingNextRender) {
                            this._waitingNextRender = !0;
                            var e = function fn() {
                                Polymer.RenderStatus._flushNextRender()
                            };
                            this._ready ? requestAnimationFrame(e) : this.whenReady(e)
                        }
                    },
                    _flushNextRender: function _flushNextRender() {
                        var e = this;
                        setTimeout(function() {
                            e._flushRenderCallbacks(e._afterNextRenderQueue), e._afterNextRenderQueue = [], e._waitingNextRender = !1
                        })
                    },
                    _flushRenderCallbacks: function _flushRenderCallbacks(e) {
                        for (var t, n = 0; n < e.length; n++) t = e[n], t[1].apply(t[0], t[2] || Polymer.nar)
                    }
                }, window.HTMLImports ? HTMLImports.whenReady(function() {
                    Polymer.RenderStatus._catchFirstRender()
                }) : Polymer.RenderStatus._catchFirstRender(), Polymer.ImportStatus = Polymer.RenderStatus, Polymer.ImportStatus.whenLoaded = Polymer.ImportStatus.whenReady,
                function() {
                    var e = Polymer.Settings;
                    Polymer.Base = {
                        __isPolymerInstance__: !0,
                        _addFeature: function _addFeature(e) {
                            this.extend(this, e)
                        },
                        registerCallback: function registerCallback() {
                            "max" === e.lazyRegister ? this.beforeRegister && this.beforeRegister() : (this._desugarBehaviors(), this._doBehavior("beforeRegister")), this._registerFeatures(), e.lazyRegister || this.ensureRegisterFinished()
                        },
                        createdCallback: function createdCallback() {
                            this.__hasRegisterFinished || this._ensureRegisterFinished(this.__proto__), Polymer.telemetry.instanceCount++, this.root = this, this._doBehavior("created"), this._initFeatures()
                        },
                        ensureRegisterFinished: function ensureRegisterFinished() {
                            this._ensureRegisterFinished(this)
                        },
                        _ensureRegisterFinished: function _ensureRegisterFinished(t) {
                            t.__hasRegisterFinished === t.is && t.is || ("max" === e.lazyRegister && (t._desugarBehaviors(), t._doBehaviorOnly("beforeRegister")), t.__hasRegisterFinished = t.is, t._finishRegisterFeatures && t._finishRegisterFeatures(), t._doBehavior("registered"), e.usePolyfillProto && t !== this && t.extend(this, t))
                        },
                        attachedCallback: function attachedCallback() {
                            var e = this;
                            Polymer.RenderStatus.whenReady(function() {
                                e.isAttached = !0, e._doBehavior("attached")
                            })
                        },
                        detachedCallback: function detachedCallback() {
                            var e = this;
                            Polymer.RenderStatus.whenReady(function() {
                                e.isAttached = !1, e._doBehavior("detached")
                            })
                        },
                        attributeChangedCallback: function attributeChangedCallback(e, t, n) {
                            this._attributeChangedImpl(e), this._doBehavior("attributeChanged", [e, t, n])
                        },
                        _attributeChangedImpl: function _attributeChangedImpl(e) {
                            this._setAttributeToProperty(this, e)
                        },
                        extend: function extend(e, t) {
                            if (e && t)
                                for (var n, r = Object.getOwnPropertyNames(t), i = 0; i < r.length && (n = r[i]); i++) this.copyOwnProperty(n, t, e);
                            return e || t
                        },
                        mixin: function mixin(e, t) {
                            for (var n in t) e[n] = t[n];
                            return e
                        },
                        copyOwnProperty: function copyOwnProperty(e, t, n) {
                            var r = Object.getOwnPropertyDescriptor(t, e);
                            r && Object.defineProperty(n, e, r)
                        },
                        _logger: function _logger(e, t) {
                            switch (1 === t.length && Array.isArray(t[0]) && (t = t[0]), e) {
                                case "log":
                                case "warn":
                                case "error":
                                    console[e].apply(console, t)
                            }
                        },
                        _log: function _log() {
                            var e = Array.prototype.slice.call(arguments, 0);
                            this._logger("log", e)
                        },
                        _warn: function _warn() {
                            var e = Array.prototype.slice.call(arguments, 0);
                            this._logger("warn", e)
                        },
                        _error: function _error() {
                            var e = Array.prototype.slice.call(arguments, 0);
                            this._logger("error", e)
                        },
                        _logf: function _logf() {
                            return this._logPrefix.concat(this.is).concat(Array.prototype.slice.call(arguments, 0))
                        }
                    }, Polymer.Base._logPrefix = function() {
                        var e = window.chrome && !/edge/i.test(navigator.userAgent) || /firefox/i.test(navigator.userAgent);
                        return e ? ["%c[%s::%s]:", "font-weight: bold; background-color:#EEEE00;"] : ["[%s::%s]:"]
                    }(), Polymer.Base.chainObject = function(e, t) {
                        return e && t && e !== t && (Object.__proto__ || (e = Polymer.Base.extend(Object.create(t), e)), e.__proto__ = t), e
                    }, Polymer.Base = Polymer.Base.chainObject(Polymer.Base, HTMLElement.prototype), window.CustomElements ? Polymer.instanceof = CustomElements.instanceof : Polymer.instanceof = function(e, t) {
                        return e instanceof t
                    }, Polymer.isInstance = function(e) {
                        return Boolean(e && e.__isPolymerInstance__)
                    }, Polymer.telemetry.instanceCount = 0
                }(),
                function() {
                    function forceDomModulesUpgrade() {
                        if (i)
                            for (var e, t = document._currentScript || document.currentScript, n = t && t.ownerDocument || document, r = n.querySelectorAll("dom-module"), o = r.length - 1; o >= 0 && (e = r[o]); o--) {
                                if (e.__upgraded__) return;
                                CustomElements.upgrade(e)
                            }
                    }
                    var e = {},
                        t = {},
                        n = function findModule(n) {
                            return e[n] || t[n.toLowerCase()]
                        },
                        r = function DomModule() {
                            return document.createElement("dom-module")
                        };
                    r.prototype = Object.create(HTMLElement.prototype), Polymer.Base.extend(r.prototype, {
                        constructor: r,
                        createdCallback: function createdCallback() {
                            this.register()
                        },
                        register: function register(n) {
                            n = n || this.id || this.getAttribute("name") || this.getAttribute("is"), n && (this.id = n, e[n] = this, t[n.toLowerCase()] = this)
                        },
                        import: function _import(e, t) {
                            if (e) {
                                var r = n(e);
                                return r || (forceDomModulesUpgrade(), r = n(e)), r && t && (r = r.querySelector(t)), r
                            }
                        }
                    });
                    var i = window.CustomElements && !CustomElements.useNative;
                    document.registerElement("dom-module", r)
                }(), Polymer.Base._addFeature({
                    _prepIs: function _prepIs() {
                        if (!this.is) {
                            var e = (document._currentScript || document.currentScript).parentNode;
                            if ("dom-module" === e.localName) {
                                var t = e.id || e.getAttribute("name") || e.getAttribute("is");
                                this.is = t
                            }
                        }
                        this.is && (this.is = this.is.toLowerCase())
                    }
                }), Polymer.Base._addFeature({
                    behaviors: [],
                    _desugarBehaviors: function _desugarBehaviors() {
                        this.behaviors.length && (this.behaviors = this._desugarSomeBehaviors(this.behaviors))
                    },
                    _desugarSomeBehaviors: function _desugarSomeBehaviors(e) {
                        var t = [];
                        e = this._flattenBehaviorsList(e);
                        for (var n = e.length - 1; n >= 0; n--) {
                            var r = e[n];
                            t.indexOf(r) === -1 && (this._mixinBehavior(r), t.unshift(r))
                        }
                        return t
                    },
                    _flattenBehaviorsList: function _flattenBehaviorsList(e) {
                        for (var t = [], n = 0; n < e.length; n++) {
                            var r = e[n];
                            r instanceof Array ? t = t.concat(this._flattenBehaviorsList(r)) : r ? t.push(r) : this._warn(this._logf("_flattenBehaviorsList", "behavior is null, check for missing or 404 import"))
                        }
                        return t
                    },
                    _mixinBehavior: function _mixinBehavior(e) {
                        for (var t, n = Object.getOwnPropertyNames(e), r = 0; r < n.length && (t = n[r]); r++) Polymer.Base._behaviorProperties[t] || this.hasOwnProperty(t) || this.copyOwnProperty(t, e, this)
                    },
                    _prepBehaviors: function _prepBehaviors() {
                        this._prepFlattenedBehaviors(this.behaviors)
                    },
                    _prepFlattenedBehaviors: function _prepFlattenedBehaviors(e) {
                        for (var t = 0, n = e.length; t < n; t++) this._prepBehavior(e[t]);
                        this._prepBehavior(this)
                    },
                    _doBehavior: function _doBehavior(e, t) {
                        for (var n = 0; n < this.behaviors.length; n++) this._invokeBehavior(this.behaviors[n], e, t);
                        this._invokeBehavior(this, e, t)
                    },
                    _doBehaviorOnly: function _doBehaviorOnly(e, t) {
                        for (var n = 0; n < this.behaviors.length; n++) this._invokeBehavior(this.behaviors[n], e, t)
                    },
                    _invokeBehavior: function _invokeBehavior(e, t, n) {
                        var r = e[t];
                        r && r.apply(this, n || Polymer.nar)
                    },
                    _marshalBehaviors: function _marshalBehaviors() {
                        for (var e = 0; e < this.behaviors.length; e++) this._marshalBehavior(this.behaviors[e]);
                        this._marshalBehavior(this)
                    }
                }), Polymer.Base._behaviorProperties = {
                    hostAttributes: !0,
                    beforeRegister: !0,
                    registered: !0,
                    properties: !0,
                    observers: !0,
                    listeners: !0,
                    created: !0,
                    attached: !0,
                    detached: !0,
                    attributeChanged: !0,
                    ready: !0
                }, Polymer.Base._addFeature({
                    _getExtendedPrototype: function _getExtendedPrototype(e) {
                        return this._getExtendedNativePrototype(e)
                    },
                    _nativePrototypes: {},
                    _getExtendedNativePrototype: function _getExtendedNativePrototype(e) {
                        var t = this._nativePrototypes[e];
                        if (!t) {
                            var n = this.getNativePrototype(e);
                            t = this.extend(Object.create(n), Polymer.Base), this._nativePrototypes[e] = t
                        }
                        return t
                    },
                    getNativePrototype: function getNativePrototype(e) {
                        return Object.getPrototypeOf(document.createElement(e))
                    }
                }), Polymer.Base._addFeature({
                    _prepConstructor: function _prepConstructor() {
                        this._factoryArgs = this.extends ? [this.extends, this.is] : [this.is];
                        var e = function ctor() {
                            return this._factory(arguments)
                        };
                        this.hasOwnProperty("extends") && (e.extends = this.extends), Object.defineProperty(this, "constructor", {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }), e.prototype = this
                    },
                    _factory: function _factory(e) {
                        var t = document.createElement.apply(document, this._factoryArgs);
                        return this.factoryImpl && this.factoryImpl.apply(t, e), t
                    }
                }), Polymer.nob = Object.create(null), Polymer.Base._addFeature({
                    properties: {},
                    getPropertyInfo: function getPropertyInfo(e) {
                        var t = this._getPropertyInfo(e, this.properties);
                        if (!t)
                            for (var n = 0; n < this.behaviors.length; n++)
                                if (t = this._getPropertyInfo(e, this.behaviors[n].properties)) return t;
                        return t || Polymer.nob
                    },
                    _getPropertyInfo: function _getPropertyInfo(e, t) {
                        var n = t && t[e];
                        return "function" == typeof n && (n = t[e] = {
                            type: n
                        }), n && (n.defined = !0), n
                    },
                    _prepPropertyInfo: function _prepPropertyInfo() {
                        this._propertyInfo = {};
                        for (var e = 0; e < this.behaviors.length; e++) this._addPropertyInfo(this._propertyInfo, this.behaviors[e].properties);
                        this._addPropertyInfo(this._propertyInfo, this.properties), this._addPropertyInfo(this._propertyInfo, this._propertyEffects)
                    },
                    _addPropertyInfo: function _addPropertyInfo(e, t) {
                        if (t) {
                            var n, r;
                            for (var i in t) n = e[i], r = t[i], ("_" !== i[0] || r.readOnly) && (e[i] ? (n.type || (n.type = r.type), n.readOnly || (n.readOnly = r.readOnly)) : e[i] = {
                                type: "function" == typeof r ? r : r.type,
                                readOnly: r.readOnly,
                                attribute: Polymer.CaseMap.camelToDashCase(i)
                            })
                        }
                    }
                }), Polymer.CaseMap = {
                    _caseMap: {},
                    _rx: {
                        dashToCamel: /-[a-z]/g,
                        camelToDash: /([A-Z])/g
                    },
                    dashToCamelCase: function dashToCamelCase(e) {
                        return this._caseMap[e] || (this._caseMap[e] = e.indexOf("-") < 0 ? e : e.replace(this._rx.dashToCamel, function(e) {
                            return e[1].toUpperCase()
                        }))
                    },
                    camelToDashCase: function camelToDashCase(e) {
                        return this._caseMap[e] || (this._caseMap[e] = e.replace(this._rx.camelToDash, "-$1").toLowerCase())
                    }
                }, Polymer.Base._addFeature({
                    _addHostAttributes: function _addHostAttributes(e) {
                        this._aggregatedAttributes || (this._aggregatedAttributes = {}), e && this.mixin(this._aggregatedAttributes, e)
                    },
                    _marshalHostAttributes: function _marshalHostAttributes() {
                        this._aggregatedAttributes && this._applyAttributes(this, this._aggregatedAttributes)
                    },
                    _applyAttributes: function _applyAttributes(e, t) {
                        for (var n in t)
                            if (!this.hasAttribute(n) && "class" !== n) {
                                var r = t[n];
                                this.serializeValueToAttribute(r, n, this)
                            }
                    },
                    _marshalAttributes: function _marshalAttributes() {
                        this._takeAttributesToModel(this)
                    },
                    _takeAttributesToModel: function _takeAttributesToModel(e) {
                        if (this.hasAttributes())
                            for (var t in this._propertyInfo) {
                                var n = this._propertyInfo[t];
                                this.hasAttribute(n.attribute) && this._setAttributeToProperty(e, n.attribute, t, n)
                            }
                    },
                    _setAttributeToProperty: function _setAttributeToProperty(e, t, n, r) {
                        if (!this._serializing && (n = n || Polymer.CaseMap.dashToCamelCase(t), r = r || this._propertyInfo && this._propertyInfo[n], r && !r.readOnly)) {
                            var i = this.getAttribute(t);
                            e[n] = this.deserialize(i, r.type)
                        }
                    },
                    _serializing: !1,
                    reflectPropertyToAttribute: function reflectPropertyToAttribute(e, t, n) {
                        this._serializing = !0, n = void 0 === n ? this[e] : n, this.serializeValueToAttribute(n, t || Polymer.CaseMap.camelToDashCase(e)), this._serializing = !1
                    },
                    serializeValueToAttribute: function serializeValueToAttribute(e, t, n) {
                        var r = this.serialize(e);
                        n = n || this, void 0 === r ? n.removeAttribute(t) : n.setAttribute(t, r)
                    },
                    deserialize: function deserialize(e, t) {
                        switch (t) {
                            case Number:
                                e = Number(e);
                                break;
                            case Boolean:
                                e = null != e;
                                break;
                            case Object:
                                try {
                                    e = JSON.parse(e)
                                } catch (e) {}
                                break;
                            case Array:
                                try {
                                    e = JSON.parse(e)
                                } catch (t) {
                                    e = null, console.warn("Polymer::Attributes: couldn`t decode Array as JSON")
                                }
                                break;
                            case Date:
                                e = new Date(e);
                                break;
                            case String:
                        }
                        return e
                    },
                    serialize: function serialize(e) {
                        switch ("undefined" == typeof e ? "undefined" : _typeof(e)) {
                            case "boolean":
                                return e ? "" : void 0;
                            case "object":
                                if (e instanceof Date) return e.toString();
                                if (e) try {
                                    return JSON.stringify(e)
                                } catch (e) {
                                    return ""
                                }
                                default: return null != e ? e : void 0
                        }
                    }
                }), Polymer.version = "1.7.1", Polymer.Base._addFeature({
                    _registerFeatures: function _registerFeatures() {
                        this._prepIs(), this._prepBehaviors(), this._prepConstructor(), this._prepPropertyInfo()
                    },
                    _prepBehavior: function _prepBehavior(e) {
                        this._addHostAttributes(e.hostAttributes)
                    },
                    _marshalBehavior: function _marshalBehavior(e) {},
                    _initFeatures: function _initFeatures() {
                        this._marshalHostAttributes(), this._marshalBehaviors()
                    }
                }), Polymer.Base._addFeature({
                    _prepTemplate: function _prepTemplate() {
                        void 0 === this._template && (this._template = Polymer.DomModule.import(this.is, "template")), this._template && this._template.hasAttribute("is") && this._warn(this._logf("_prepTemplate", "top-level Polymer template must not be a type-extension, found", this._template, "Move inside simple <template>.")), this._template && !this._template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(this._template)
                    },
                    _stampTemplate: function _stampTemplate() {
                        this._template && (this.root = this.instanceTemplate(this._template))
                    },
                    instanceTemplate: function instanceTemplate(e) {
                        var t = document.importNode(e._content || e.content, !0);
                        return t
                    }
                }),
                function() {
                    var e = Polymer.Base.attachedCallback;
                    Polymer.Base._addFeature({
                        _hostStack: [],
                        ready: function ready() {},
                        _registerHost: function _registerHost(e) {
                            this.dataHost = e = e || Polymer.Base._hostStack[Polymer.Base._hostStack.length - 1], e && e._clients && e._clients.push(this), this._clients = null, this._clientsReadied = !1
                        },
                        _beginHosting: function _beginHosting() {
                            Polymer.Base._hostStack.push(this), this._clients || (this._clients = [])
                        },
                        _endHosting: function _endHosting() {
                            Polymer.Base._hostStack.pop()
                        },
                        _tryReady: function _tryReady() {
                            this._readied = !1, this._canReady() && this._ready()
                        },
                        _canReady: function _canReady() {
                            return !this.dataHost || this.dataHost._clientsReadied
                        },
                        _ready: function _ready() {
                            this._beforeClientsReady(), this._template && (this._setupRoot(), this._readyClients()), this._clientsReadied = !0, this._clients = null, this._afterClientsReady(), this._readySelf()
                        },
                        _readyClients: function _readyClients() {
                            this._beginDistribute();
                            var e = this._clients;
                            if (e)
                                for (var t, n = 0, r = e.length; n < r && (t = e[n]); n++) t._ready();
                            this._finishDistribute()
                        },
                        _readySelf: function _readySelf() {
                            this._doBehavior("ready"), this._readied = !0, this._attachedPending && (this._attachedPending = !1, this.attachedCallback())
                        },
                        _beforeClientsReady: function _beforeClientsReady() {},
                        _afterClientsReady: function _afterClientsReady() {},
                        _beforeAttached: function _beforeAttached() {},
                        attachedCallback: function attachedCallback() {
                            this._readied ? (this._beforeAttached(), e.call(this)) : this._attachedPending = !0
                        }
                    })
                }(), Polymer.ArraySplice = function() {
                    function newSplice(e, t, n) {
                        return {
                            index: e,
                            removed: t,
                            addedCount: n
                        }
                    }

                    function ArraySplice() {}
                    var e = 0,
                        t = 1,
                        n = 2,
                        r = 3;
                    return ArraySplice.prototype = {
                        calcEditDistances: function calcEditDistances(e, t, n, r, i, o) {
                            for (var s = o - i + 1, a = n - t + 1, l = new Array(s), h = 0; h < s; h++) l[h] = new Array(a), l[h][0] = h;
                            for (var c = 0; c < a; c++) l[0][c] = c;
                            for (h = 1; h < s; h++)
                                for (c = 1; c < a; c++)
                                    if (this.equals(e[t + c - 1], r[i + h - 1])) l[h][c] = l[h - 1][c - 1];
                                    else {
                                        var d = l[h - 1][c] + 1,
                                            u = l[h][c - 1] + 1;
                                        l[h][c] = d < u ? d : u
                                    }
                            return l
                        },
                        spliceOperationsFromEditDistances: function spliceOperationsFromEditDistances(i) {
                            for (var o = i.length - 1, s = i[0].length - 1, a = i[o][s], l = []; o > 0 || s > 0;)
                                if (0 != o)
                                    if (0 != s) {
                                        var h, c = i[o - 1][s - 1],
                                            d = i[o - 1][s],
                                            u = i[o][s - 1];
                                        h = d < u ? d < c ? d : c : u < c ? u : c, h == c ? (c == a ? l.push(e) : (l.push(t), a = c), o--, s--) : h == d ? (l.push(r), o--, a = d) : (l.push(n), s--, a = u)
                                    } else l.push(r), o--;
                            else l.push(n), s--;
                            return l.reverse(), l
                        },
                        calcSplices: function calcSplices(i, o, s, a, l, h) {
                            var c = 0,
                                d = 0,
                                u = Math.min(s - o, h - l);
                            if (0 == o && 0 == l && (c = this.sharedPrefix(i, a, u)), s == i.length && h == a.length && (d = this.sharedSuffix(i, a, u - c)), o += c, l += c, s -= d, h -= d, s - o == 0 && h - l == 0) return [];
                            if (o == s) {
                                for (var f = newSplice(o, [], 0); l < h;) f.removed.push(a[l++]);
                                return [f]
                            }
                            if (l == h) return [newSplice(o, [], s - o)];
                            var _ = this.spliceOperationsFromEditDistances(this.calcEditDistances(i, o, s, a, l, h));
                            f = void 0;
                            for (var p = [], m = o, y = l, v = 0; v < _.length; v++) switch (_[v]) {
                                case e:
                                    f && (p.push(f), f = void 0), m++, y++;
                                    break;
                                case t:
                                    f || (f = newSplice(m, [], 0)), f.addedCount++, m++, f.removed.push(a[y]), y++;
                                    break;
                                case n:
                                    f || (f = newSplice(m, [], 0)), f.addedCount++, m++;
                                    break;
                                case r:
                                    f || (f = newSplice(m, [], 0)), f.removed.push(a[y]), y++
                            }
                            return f && p.push(f), p
                        },
                        sharedPrefix: function sharedPrefix(e, t, n) {
                            for (var r = 0; r < n; r++)
                                if (!this.equals(e[r], t[r])) return r;
                            return n
                        },
                        sharedSuffix: function sharedSuffix(e, t, n) {
                            for (var r = e.length, i = t.length, o = 0; o < n && this.equals(e[--r], t[--i]);) o++;
                            return o
                        },
                        calculateSplices: function calculateSplices(e, t) {
                            return this.calcSplices(e, 0, e.length, t, 0, t.length)
                        },
                        equals: function equals(e, t) {
                            return e === t
                        }
                    }, new ArraySplice
                }(), Polymer.domInnerHTML = function() {
                    function escapeReplace(e) {
                        switch (e) {
                            case "&":
                                return "&amp;";
                            case "<":
                                return "&lt;";
                            case ">":
                                return "&gt;";
                            case '"':
                                return "&quot;";
                            case " ":
                                return "&nbsp;"
                        }
                    }

                    function escapeAttr(t) {
                        return t.replace(e, escapeReplace)
                    }

                    function escapeData(e) {
                        return e.replace(t, escapeReplace)
                    }

                    function makeSet(e) {
                        for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = !0;
                        return t
                    }

                    function getOuterHTML(e, t, i) {
                        switch (e.nodeType) {
                            case Node.ELEMENT_NODE:
                                for (var o, s = e.localName, a = "<" + s, l = e.attributes, h = 0; o = l[h]; h++) a += " " + o.name + '="' + escapeAttr(o.value) + '"';
                                return a += ">", n[s] ? a : a + getInnerHTML(e, i) + "</" + s + ">";
                            case Node.TEXT_NODE:
                                var c = e.data;
                                return t && r[t.localName] ? c : escapeData(c);
                            case Node.COMMENT_NODE:
                                return "<!--" + e.data + "-->";
                            default:
                                throw console.error(e), new Error("not implemented")
                        }
                    }

                    function getInnerHTML(e, t) {
                        e instanceof HTMLTemplateElement && (e = e.content);
                        for (var n, r = "", i = Polymer.dom(e).childNodes, o = 0, s = i.length; o < s && (n = i[o]); o++) r += getOuterHTML(n, e, t);
                        return r
                    }
                    var e = /[&\u00A0"]/g,
                        t = /[&\u00A0<>]/g,
                        n = makeSet(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]),
                        r = makeSet(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);
                    return {
                        getInnerHTML: getInnerHTML
                    }
                }(),
                function() {
                    var e = Element.prototype.insertBefore,
                        t = Element.prototype.appendChild,
                        n = Element.prototype.removeChild;
                    Polymer.TreeApi = {
                        arrayCopyChildNodes: function arrayCopyChildNodes(e) {
                            for (var t = [], n = 0, r = e.firstChild; r; r = r.nextSibling) t[n++] = r;
                            return t
                        },
                        arrayCopyChildren: function arrayCopyChildren(e) {
                            for (var t = [], n = 0, r = e.firstElementChild; r; r = r.nextElementSibling) t[n++] = r;
                            return t
                        },
                        arrayCopy: function arrayCopy(e) {
                            for (var t = e.length, n = new Array(t), r = 0; r < t; r++) n[r] = e[r];
                            return n
                        }
                    }, Polymer.TreeApi.Logical = {
                        hasParentNode: function hasParentNode(e) {
                            return Boolean(e.__dom && e.__dom.parentNode)
                        },
                        hasChildNodes: function hasChildNodes(e) {
                            return Boolean(e.__dom && void 0 !== e.__dom.childNodes)
                        },
                        getChildNodes: function getChildNodes(e) {
                            return this.hasChildNodes(e) ? this._getChildNodes(e) : e.childNodes
                        },
                        _getChildNodes: function _getChildNodes(e) {
                            if (!e.__dom.childNodes) {
                                e.__dom.childNodes = [];
                                for (var t = e.__dom.firstChild; t; t = t.__dom.nextSibling) e.__dom.childNodes.push(t)
                            }
                            return e.__dom.childNodes
                        },
                        getParentNode: function getParentNode(e) {
                            return e.__dom && void 0 !== e.__dom.parentNode ? e.__dom.parentNode : e.parentNode
                        },
                        getFirstChild: function getFirstChild(e) {
                            return e.__dom && void 0 !== e.__dom.firstChild ? e.__dom.firstChild : e.firstChild
                        },
                        getLastChild: function getLastChild(e) {
                            return e.__dom && void 0 !== e.__dom.lastChild ? e.__dom.lastChild : e.lastChild
                        },
                        getNextSibling: function getNextSibling(e) {
                            return e.__dom && void 0 !== e.__dom.nextSibling ? e.__dom.nextSibling : e.nextSibling
                        },
                        getPreviousSibling: function getPreviousSibling(e) {
                            return e.__dom && void 0 !== e.__dom.previousSibling ? e.__dom.previousSibling : e.previousSibling
                        },
                        getFirstElementChild: function getFirstElementChild(e) {
                            return e.__dom && void 0 !== e.__dom.firstChild ? this._getFirstElementChild(e) : e.firstElementChild
                        },
                        _getFirstElementChild: function _getFirstElementChild(e) {
                            for (var t = e.__dom.firstChild; t && t.nodeType !== Node.ELEMENT_NODE;) t = t.__dom.nextSibling;
                            return t
                        },
                        getLastElementChild: function getLastElementChild(e) {
                            return e.__dom && void 0 !== e.__dom.lastChild ? this._getLastElementChild(e) : e.lastElementChild
                        },
                        _getLastElementChild: function _getLastElementChild(e) {
                            for (var t = e.__dom.lastChild; t && t.nodeType !== Node.ELEMENT_NODE;) t = t.__dom.previousSibling;
                            return t
                        },
                        getNextElementSibling: function getNextElementSibling(e) {
                            return e.__dom && void 0 !== e.__dom.nextSibling ? this._getNextElementSibling(e) : e.nextElementSibling
                        },
                        _getNextElementSibling: function _getNextElementSibling(e) {
                            for (var t = e.__dom.nextSibling; t && t.nodeType !== Node.ELEMENT_NODE;) t = t.__dom.nextSibling;
                            return t
                        },
                        getPreviousElementSibling: function getPreviousElementSibling(e) {
                            return e.__dom && void 0 !== e.__dom.previousSibling ? this._getPreviousElementSibling(e) : e.previousElementSibling
                        },
                        _getPreviousElementSibling: function _getPreviousElementSibling(e) {
                            for (var t = e.__dom.previousSibling; t && t.nodeType !== Node.ELEMENT_NODE;) t = t.__dom.previousSibling;
                            return t
                        },
                        saveChildNodes: function saveChildNodes(e) {
                            if (!this.hasChildNodes(e)) {
                                e.__dom = e.__dom || {}, e.__dom.firstChild = e.firstChild, e.__dom.lastChild = e.lastChild, e.__dom.childNodes = [];
                                for (var t = e.firstChild; t; t = t.nextSibling) t.__dom = t.__dom || {}, t.__dom.parentNode = e, e.__dom.childNodes.push(t), t.__dom.nextSibling = t.nextSibling, t.__dom.previousSibling = t.previousSibling
                            }
                        },
                        recordInsertBefore: function recordInsertBefore(e, t, n) {
                            if (t.__dom.childNodes = null, e.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
                                for (var r = e.firstChild; r; r = r.nextSibling) this._linkNode(r, t, n);
                            else this._linkNode(e, t, n)
                        },
                        _linkNode: function _linkNode(e, t, n) {
                            e.__dom = e.__dom || {}, t.__dom = t.__dom || {}, n && (n.__dom = n.__dom || {}), e.__dom.previousSibling = n ? n.__dom.previousSibling : t.__dom.lastChild, e.__dom.previousSibling && (e.__dom.previousSibling.__dom.nextSibling = e), e.__dom.nextSibling = n || null, e.__dom.nextSibling && (e.__dom.nextSibling.__dom.previousSibling = e), e.__dom.parentNode = t, n ? n === t.__dom.firstChild && (t.__dom.firstChild = e) : (t.__dom.lastChild = e, t.__dom.firstChild || (t.__dom.firstChild = e)), t.__dom.childNodes = null
                        },
                        recordRemoveChild: function recordRemoveChild(e, t) {
                            e.__dom = e.__dom || {}, t.__dom = t.__dom || {}, e === t.__dom.firstChild && (t.__dom.firstChild = e.__dom.nextSibling), e === t.__dom.lastChild && (t.__dom.lastChild = e.__dom.previousSibling);
                            var n = e.__dom.previousSibling,
                                r = e.__dom.nextSibling;
                            n && (n.__dom.nextSibling = r), r && (r.__dom.previousSibling = n), e.__dom.parentNode = e.__dom.previousSibling = e.__dom.nextSibling = void 0, t.__dom.childNodes = null
                        }
                    }, Polymer.TreeApi.Composed = {
                        getChildNodes: function getChildNodes(e) {
                            return Polymer.TreeApi.arrayCopyChildNodes(e)
                        },
                        getParentNode: function getParentNode(e) {
                            return e.parentNode
                        },
                        clearChildNodes: function clearChildNodes(e) {
                            e.textContent = ""
                        },
                        insertBefore: function insertBefore(t, n, r) {
                            return e.call(t, n, r || null)
                        },
                        appendChild: function appendChild(e, n) {
                            return t.call(e, n)
                        },
                        removeChild: function removeChild(e, t) {
                            return n.call(e, t)
                        }
                    }
                }(), Polymer.DomApi = function() {
                    var e = Polymer.Settings,
                        t = Polymer.TreeApi,
                        n = function DomApi(e) {
                            this.node = r ? DomApi.wrap(e) : e
                        },
                        r = e.hasShadow && !e.nativeShadow;
                    n.wrap = window.wrap ? window.wrap : function(e) {
                        return e
                    }, n.prototype = {
                        flush: function flush() {
                            Polymer.dom.flush()
                        },
                        deepContains: function deepContains(e) {
                            if (this.node.contains(e)) return !0;
                            for (var t = e, n = e.ownerDocument; t && t !== n && t !== this.node;) t = Polymer.dom(t).parentNode || t.host;
                            return t === this.node
                        },
                        queryDistributedElements: function queryDistributedElements(e) {
                            for (var t, r = this.getEffectiveChildNodes(), i = [], o = 0, s = r.length; o < s && (t = r[o]); o++) t.nodeType === Node.ELEMENT_NODE && n.matchesSelector.call(t, e) && i.push(t);
                            return i
                        },
                        getEffectiveChildNodes: function getEffectiveChildNodes() {
                            for (var e, t = [], n = this.childNodes, r = 0, s = n.length; r < s && (e = n[r]); r++)
                                if (e.localName === i)
                                    for (var a = o(e).getDistributedNodes(), l = 0; l < a.length; l++) t.push(a[l]);
                                else t.push(e);
                            return t
                        },
                        observeNodes: function observeNodes(e) {
                            if (e) return this.observer || (this.observer = this.node.localName === i ? new n.DistributedNodesObserver(this) : new n.EffectiveNodesObserver(this)), this.observer.addListener(e)
                        },
                        unobserveNodes: function unobserveNodes(e) {
                            this.observer && this.observer.removeListener(e)
                        },
                        notifyObserver: function notifyObserver() {
                            this.observer && this.observer.notify()
                        },
                        _query: function _query(e, n, r) {
                            n = n || this.node;
                            var i = [];
                            return this._queryElements(t.Logical.getChildNodes(n), e, r, i), i
                        },
                        _queryElements: function _queryElements(e, t, n, r) {
                            for (var i, o = 0, s = e.length; o < s && (i = e[o]); o++)
                                if (i.nodeType === Node.ELEMENT_NODE && this._queryElement(i, t, n, r)) return !0
                        },
                        _queryElement: function _queryElement(e, n, r, i) {
                            var o = n(e);
                            return o && i.push(e), r && r(o) ? o : void this._queryElements(t.Logical.getChildNodes(e), n, r, i)
                        }
                    };
                    var i = n.CONTENT = "content",
                        o = n.factory = function(e) {
                            return e = e || document, e.__domApi || (e.__domApi = new n.ctor(e)), e.__domApi
                        };
                    n.hasApi = function(e) {
                        return Boolean(e.__domApi)
                    }, n.ctor = n, Polymer.dom = function(e, t) {
                        return e instanceof Event ? Polymer.EventApi.factory(e) : n.factory(e, t)
                    };
                    var s = Element.prototype;
                    return n.matchesSelector = s.matches || s.matchesSelector || s.mozMatchesSelector || s.msMatchesSelector || s.oMatchesSelector || s.webkitMatchesSelector, n
                }(),
                function() {
                    var e = Polymer.Settings,
                        t = Polymer.DomApi,
                        n = t.factory,
                        r = Polymer.TreeApi,
                        i = Polymer.domInnerHTML.getInnerHTML,
                        o = t.CONTENT;
                    if (!e.useShadow) {
                        var s = Element.prototype.cloneNode,
                            a = Document.prototype.importNode;
                        Polymer.Base.extend(t.prototype, {
                            _lazyDistribute: function _lazyDistribute(e) {
                                e.shadyRoot && e.shadyRoot._distributionClean && (e.shadyRoot._distributionClean = !1, Polymer.dom.addDebouncer(e.debounce("_distribute", e._distributeContent)))
                            },
                            appendChild: function appendChild(e) {
                                return this.insertBefore(e)
                            },
                            insertBefore: function insertBefore(e, i) {
                                if (i && r.Logical.getParentNode(i) !== this.node) throw Error("The ref_node to be inserted before is not a child of this node");
                                if (e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                                    var s = r.Logical.getParentNode(e);
                                    s ? (t.hasApi(s) && n(s).notifyObserver(), this._removeNode(e)) : this._removeOwnerShadyRoot(e)
                                }
                                if (!this._addNode(e, i)) {
                                    i && (i = i.localName === o ? this._firstComposedNode(i) : i);
                                    var a = this.node._isShadyRoot ? this.node.host : this.node;
                                    i ? r.Composed.insertBefore(a, e, i) : r.Composed.appendChild(a, e)
                                }
                                return this.notifyObserver(), e
                            },
                            _addNode: function _addNode(e, t) {
                                var n = this.getOwnerRoot();
                                if (n) {
                                    var i = this._maybeAddInsertionPoint(e, this.node);
                                    n._invalidInsertionPoints || (n._invalidInsertionPoints = i), this._addNodeToHost(n.host, e)
                                }
                                r.Logical.hasChildNodes(this.node) && r.Logical.recordInsertBefore(e, this.node, t);
                                var o = this._maybeDistribute(e) || this.node.shadyRoot;
                                if (o)
                                    if (e.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
                                        for (; e.firstChild;) r.Composed.removeChild(e, e.firstChild);
                                    else {
                                        var s = r.Composed.getParentNode(e);
                                        s && r.Composed.removeChild(s, e)
                                    }
                                return o
                            },
                            removeChild: function removeChild(e) {
                                if (r.Logical.getParentNode(e) !== this.node) throw Error("The node to be removed is not a child of this node: " + e);
                                if (!this._removeNode(e)) {
                                    var t = this.node._isShadyRoot ? this.node.host : this.node,
                                        n = r.Composed.getParentNode(e);
                                    t === n && r.Composed.removeChild(t, e)
                                }
                                return this.notifyObserver(), e
                            },
                            _removeNode: function _removeNode(e) {
                                var t, i = r.Logical.hasParentNode(e) && r.Logical.getParentNode(e),
                                    o = this._ownerShadyRootForNode(e);
                                return i && (t = n(e)._maybeDistributeParent(), r.Logical.recordRemoveChild(e, i), o && this._removeDistributedChildren(o, e) && (o._invalidInsertionPoints = !0, this._lazyDistribute(o.host))), this._removeOwnerShadyRoot(e), o && this._removeNodeFromHost(o.host, e), t
                            },
                            replaceChild: function replaceChild(e, t) {
                                return this.insertBefore(e, t), this.removeChild(t), e
                            },
                            _hasCachedOwnerRoot: function _hasCachedOwnerRoot(e) {
                                return Boolean(void 0 !== e._ownerShadyRoot)
                            },
                            getOwnerRoot: function getOwnerRoot() {
                                return this._ownerShadyRootForNode(this.node)
                            },
                            _ownerShadyRootForNode: function _ownerShadyRootForNode(e) {
                                if (e) {
                                    var t = e._ownerShadyRoot;
                                    if (void 0 === t) {
                                        if (e._isShadyRoot) t = e;
                                        else {
                                            var n = r.Logical.getParentNode(e);
                                            t = n ? n._isShadyRoot ? n : this._ownerShadyRootForNode(n) : null
                                        }(t || document.documentElement.contains(e)) && (e._ownerShadyRoot = t)
                                    }
                                    return t
                                }
                            },
                            _maybeDistribute: function _maybeDistribute(e) {
                                var t = e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !e.__noContent && n(e).querySelector(o),
                                    i = t && r.Logical.getParentNode(t).nodeType !== Node.DOCUMENT_FRAGMENT_NODE,
                                    s = t || e.localName === o;
                                if (s) {
                                    var a = this.getOwnerRoot();
                                    a && this._lazyDistribute(a.host)
                                }
                                var l = this._nodeNeedsDistribution(this.node);
                                return l && this._lazyDistribute(this.node), l || s && !i
                            },
                            _maybeAddInsertionPoint: function _maybeAddInsertionPoint(e, t) {
                                var i;
                                if (e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE || e.__noContent) e.localName === o && (r.Logical.saveChildNodes(t), r.Logical.saveChildNodes(e), i = !0);
                                else
                                    for (var s, a, l, h = n(e).querySelectorAll(o), c = 0; c < h.length && (s = h[c]); c++) a = r.Logical.getParentNode(s), a === e && (a = t), l = this._maybeAddInsertionPoint(s, a), i = i || l;
                                return i
                            },
                            _updateInsertionPoints: function _updateInsertionPoints(e) {
                                for (var t, i = e.shadyRoot._insertionPoints = n(e.shadyRoot).querySelectorAll(o), s = 0; s < i.length; s++) t = i[s], r.Logical.saveChildNodes(t), r.Logical.saveChildNodes(r.Logical.getParentNode(t))
                            },
                            _nodeNeedsDistribution: function _nodeNeedsDistribution(e) {
                                return e && e.shadyRoot && t.hasInsertionPoint(e.shadyRoot)
                            },
                            _addNodeToHost: function _addNodeToHost(e, t) {
                                e._elementAdd && e._elementAdd(t)
                            },
                            _removeNodeFromHost: function _removeNodeFromHost(e, t) {
                                e._elementRemove && e._elementRemove(t)
                            },
                            _removeDistributedChildren: function _removeDistributedChildren(e, t) {
                                for (var i, o = e._insertionPoints, s = 0; s < o.length; s++) {
                                    var a = o[s];
                                    if (this._contains(t, a))
                                        for (var l = n(a).getDistributedNodes(), h = 0; h < l.length; h++) {
                                            i = !0;
                                            var c = l[h],
                                                d = r.Composed.getParentNode(c);
                                            d && r.Composed.removeChild(d, c)
                                        }
                                }
                                return i
                            },
                            _contains: function _contains(e, t) {
                                for (; t;) {
                                    if (t == e) return !0;
                                    t = r.Logical.getParentNode(t)
                                }
                            },
                            _removeOwnerShadyRoot: function _removeOwnerShadyRoot(e) {
                                if (this._hasCachedOwnerRoot(e))
                                    for (var t, n = r.Logical.getChildNodes(e), i = 0, o = n.length; i < o && (t = n[i]); i++) this._removeOwnerShadyRoot(t);
                                e._ownerShadyRoot = void 0
                            },
                            _firstComposedNode: function _firstComposedNode(e) {
                                for (var t, r, i = n(e).getDistributedNodes(), o = 0, s = i.length; o < s && (t = i[o]); o++)
                                    if (r = n(t).getDestinationInsertionPoints(), r[r.length - 1] === e) return t
                            },
                            querySelector: function querySelector(e) {
                                var n = this._query(function(n) {
                                    return t.matchesSelector.call(n, e)
                                }, this.node, function(e) {
                                    return Boolean(e)
                                })[0];
                                return n || null
                            },
                            querySelectorAll: function querySelectorAll(e) {
                                return this._query(function(n) {
                                    return t.matchesSelector.call(n, e)
                                }, this.node)
                            },
                            getDestinationInsertionPoints: function getDestinationInsertionPoints() {
                                return this.node._destinationInsertionPoints || []
                            },
                            getDistributedNodes: function getDistributedNodes() {
                                return this.node._distributedNodes || []
                            },
                            _clear: function _clear() {
                                for (; this.childNodes.length;) this.removeChild(this.childNodes[0])
                            },
                            setAttribute: function setAttribute(e, t) {
                                this.node.setAttribute(e, t), this._maybeDistributeParent()
                            },
                            removeAttribute: function removeAttribute(e) {
                                this.node.removeAttribute(e), this._maybeDistributeParent()
                            },
                            _maybeDistributeParent: function _maybeDistributeParent() {
                                if (this._nodeNeedsDistribution(this.parentNode)) return this._lazyDistribute(this.parentNode), !0
                            },
                            cloneNode: function cloneNode(e) {
                                var t = s.call(this.node, !1);
                                if (e)
                                    for (var r, i = this.childNodes, o = n(t), a = 0; a < i.length; a++) r = n(i[a]).cloneNode(!0), o.appendChild(r);
                                return t
                            },
                            importNode: function importNode(e, t) {
                                var i = this.node instanceof Document ? this.node : this.node.ownerDocument,
                                    o = a.call(i, e, !1);
                                if (t)
                                    for (var s, l = r.Logical.getChildNodes(e), h = n(o), c = 0; c < l.length; c++) s = n(i).importNode(l[c], !0), h.appendChild(s);
                                return o
                            },
                            _getComposedInnerHTML: function _getComposedInnerHTML() {
                                return i(this.node, !0)
                            }
                        }), Object.defineProperties(t.prototype, {
                            activeElement: {
                                get: function get() {
                                    var e = document.activeElement;
                                    if (!e) return null;
                                    var t = !!this.node._isShadyRoot;
                                    if (this.node !== document) {
                                        if (!t) return null;
                                        if (this.node.host === e || !this.node.host.contains(e)) return null
                                    }
                                    for (var r = n(e).getOwnerRoot(); r && r !== this.node;) e = r.host, r = n(e).getOwnerRoot();
                                    return this.node === document ? r ? null : e : r === this.node ? e : null
                                },
                                configurable: !0
                            },
                            childNodes: {
                                get: function get() {
                                    var e = r.Logical.getChildNodes(this.node);
                                    return Array.isArray(e) ? e : r.arrayCopyChildNodes(this.node)
                                },
                                configurable: !0
                            },
                            children: {
                                get: function get() {
                                    return r.Logical.hasChildNodes(this.node) ? Array.prototype.filter.call(this.childNodes, function(e) {
                                        return e.nodeType === Node.ELEMENT_NODE
                                    }) : r.arrayCopyChildren(this.node)
                                },
                                configurable: !0
                            },
                            parentNode: {
                                get: function get() {
                                    return r.Logical.getParentNode(this.node)
                                },
                                configurable: !0
                            },
                            firstChild: {
                                get: function get() {
                                    return r.Logical.getFirstChild(this.node)
                                },
                                configurable: !0
                            },
                            lastChild: {
                                get: function get() {
                                    return r.Logical.getLastChild(this.node)
                                },
                                configurable: !0
                            },
                            nextSibling: {
                                get: function get() {
                                    return r.Logical.getNextSibling(this.node)
                                },
                                configurable: !0
                            },
                            previousSibling: {
                                get: function get() {
                                    return r.Logical.getPreviousSibling(this.node)
                                },
                                configurable: !0
                            },
                            firstElementChild: {
                                get: function get() {
                                    return r.Logical.getFirstElementChild(this.node)
                                },
                                configurable: !0
                            },
                            lastElementChild: {
                                get: function get() {
                                    return r.Logical.getLastElementChild(this.node)
                                },
                                configurable: !0
                            },
                            nextElementSibling: {
                                get: function get() {
                                    return r.Logical.getNextElementSibling(this.node)
                                },
                                configurable: !0
                            },
                            previousElementSibling: {
                                get: function get() {
                                    return r.Logical.getPreviousElementSibling(this.node)
                                },
                                configurable: !0
                            },
                            textContent: {
                                get: function get() {
                                    var e = this.node.nodeType;
                                    if (e === Node.TEXT_NODE || e === Node.COMMENT_NODE) return this.node.textContent;
                                    for (var t, n = [], r = 0, i = this.childNodes; t = i[r]; r++) t.nodeType !== Node.COMMENT_NODE && n.push(t.textContent);
                                    return n.join("")
                                },
                                set: function set(e) {
                                    var t = this.node.nodeType;
                                    t === Node.TEXT_NODE || t === Node.COMMENT_NODE ? this.node.textContent = e : (this._clear(), e && this.appendChild(document.createTextNode(e)))
                                },
                                configurable: !0
                            },
                            innerHTML: {
                                get: function get() {
                                    var e = this.node.nodeType;
                                    return e === Node.TEXT_NODE || e === Node.COMMENT_NODE ? null : i(this.node)
                                },
                                set: function set(e) {
                                    var t = this.node.nodeType;
                                    if (t !== Node.TEXT_NODE || t !== Node.COMMENT_NODE) {
                                        this._clear();
                                        var n = document.createElement("div");
                                        n.innerHTML = e;
                                        for (var i = r.arrayCopyChildNodes(n), o = 0; o < i.length; o++) this.appendChild(i[o])
                                    }
                                },
                                configurable: !0
                            }
                        }), t.hasInsertionPoint = function(e) {
                            return Boolean(e && e._insertionPoints.length)
                        }
                    }
                }(),
                function() {
                    var e = Polymer.Settings,
                        t = Polymer.TreeApi,
                        n = Polymer.DomApi;
                    if (e.useShadow) {
                        Polymer.Base.extend(n.prototype, {
                            querySelectorAll: function querySelectorAll(e) {
                                return t.arrayCopy(this.node.querySelectorAll(e))
                            },
                            getOwnerRoot: function getOwnerRoot() {
                                for (var e = this.node; e;) {
                                    if (e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host) return e;
                                    e = e.parentNode
                                }
                            },
                            importNode: function importNode(e, t) {
                                var n = this.node instanceof Document ? this.node : this.node.ownerDocument;
                                return n.importNode(e, t)
                            },
                            getDestinationInsertionPoints: function getDestinationInsertionPoints() {
                                var e = this.node.getDestinationInsertionPoints && this.node.getDestinationInsertionPoints();
                                return e ? t.arrayCopy(e) : []
                            },
                            getDistributedNodes: function getDistributedNodes() {
                                var e = this.node.getDistributedNodes && this.node.getDistributedNodes();
                                return e ? t.arrayCopy(e) : []
                            }
                        }), Object.defineProperties(n.prototype, {
                            activeElement: {
                                get: function get() {
                                    var e = n.wrap(this.node),
                                        t = e.activeElement;
                                    return e.contains(t) ? t : null
                                },
                                configurable: !0
                            },
                            childNodes: {
                                get: function get() {
                                    return t.arrayCopyChildNodes(this.node)
                                },
                                configurable: !0
                            },
                            children: {
                                get: function get() {
                                    return t.arrayCopyChildren(this.node)
                                },
                                configurable: !0
                            },
                            textContent: {
                                get: function get() {
                                    return this.node.textContent
                                },
                                set: function set(e) {
                                    return this.node.textContent = e
                                },
                                configurable: !0
                            },
                            innerHTML: {
                                get: function get() {
                                    return this.node.innerHTML
                                },
                                set: function set(e) {
                                    return this.node.innerHTML = e
                                },
                                configurable: !0
                            }
                        });
                        var r = function forwardMethods(e) {
                                for (var t = 0; t < e.length; t++) i(e[t])
                            },
                            i = function forwardMethod(e) {
                                n.prototype[e] = function() {
                                    return this.node[e].apply(this.node, arguments)
                                }
                            };
                        r(["cloneNode", "appendChild", "insertBefore", "removeChild", "replaceChild", "setAttribute", "removeAttribute", "querySelector"]);
                        var o = function forwardProperties(e) {
                                for (var t = 0; t < e.length; t++) s(e[t])
                            },
                            s = function forwardProperty(e) {
                                Object.defineProperty(n.prototype, e, {
                                    get: function get() {
                                        return this.node[e]
                                    },
                                    configurable: !0
                                })
                            };
                        o(["parentNode", "firstChild", "lastChild", "nextSibling", "previousSibling", "firstElementChild", "lastElementChild", "nextElementSibling", "previousElementSibling"])
                    }
                }(), Polymer.Base.extend(Polymer.dom, {
                    _flushGuard: 0,
                    _FLUSH_MAX: 100,
                    _needsTakeRecords: !Polymer.Settings.useNativeCustomElements,
                    _debouncers: [],
                    _staticFlushList: [],
                    _finishDebouncer: null,
                    flush: function flush() {
                        for (this._flushGuard = 0, this._prepareFlush(); this._debouncers.length && this._flushGuard < this._FLUSH_MAX;) {
                            for (; this._debouncers.length;) this._debouncers.shift().complete();
                            this._finishDebouncer && this._finishDebouncer.complete(), this._prepareFlush(), this._flushGuard++
                        }
                        this._flushGuard >= this._FLUSH_MAX && console.warn("Polymer.dom.flush aborted. Flush may not be complete.")
                    },
                    _prepareFlush: function _prepareFlush() {
                        this._needsTakeRecords && CustomElements.takeRecords();
                        for (var e = 0; e < this._staticFlushList.length; e++) this._staticFlushList[e]()
                    },
                    addStaticFlush: function addStaticFlush(e) {
                        this._staticFlushList.push(e)
                    },
                    removeStaticFlush: function removeStaticFlush(e) {
                        var t = this._staticFlushList.indexOf(e);
                        t >= 0 && this._staticFlushList.splice(t, 1)
                    },
                    addDebouncer: function addDebouncer(e) {
                        this._debouncers.push(e), this._finishDebouncer = Polymer.Debounce(this._finishDebouncer, this._finishFlush)
                    },
                    _finishFlush: function _finishFlush() {
                        Polymer.dom._debouncers = []
                    }
                }), Polymer.EventApi = function() {
                    var e = Polymer.DomApi.ctor,
                        t = Polymer.Settings;
                    e.Event = function(e) {
                        this.event = e
                    }, t.useShadow ? e.Event.prototype = {get rootTarget() {
                            return this.event.path[0]
                        },
                        get localTarget() {
                            return this.event.target
                        },
                        get path() {
                            var e = this.event.path;
                            return Array.isArray(e) || (e = Array.prototype.slice.call(e)), e
                        }
                    } : e.Event.prototype = {get rootTarget() {
                            return this.event.target
                        },
                        get localTarget() {
                            for (var e = this.event.currentTarget, t = e && Polymer.dom(e).getOwnerRoot(), n = this.path, r = 0; r < n.length; r++)
                                if (Polymer.dom(n[r]).getOwnerRoot() === t) return n[r]
                        },
                        get path() {
                            if (!this.event._path) {
                                for (var e = [], t = this.rootTarget; t;) {
                                    e.push(t);
                                    var n = Polymer.dom(t).getDestinationInsertionPoints();
                                    if (n.length) {
                                        for (var r = 0; r < n.length - 1; r++) e.push(n[r]);
                                        t = n[n.length - 1]
                                    } else t = Polymer.dom(t).parentNode || t.host
                                }
                                e.push(window), this.event._path = e
                            }
                            return this.event._path
                        }
                    };
                    var n = function factory(t) {
                        return t.__eventApi || (t.__eventApi = new e.Event(t)), t.__eventApi
                    };
                    return {
                        factory: n
                    }
                }(),
                function() {
                    var e = Polymer.DomApi.ctor,
                        t = Polymer.Settings.useShadow;
                    Object.defineProperty(e.prototype, "classList", {
                        get: function get() {
                            return this._classList || (this._classList = new e.ClassList(this)), this._classList
                        },
                        configurable: !0
                    }), e.ClassList = function(e) {
                        this.domApi = e, this.node = e.node
                    }, e.ClassList.prototype = {
                        add: function add() {
                            this.node.classList.add.apply(this.node.classList, arguments), this._distributeParent()
                        },
                        remove: function remove() {
                            this.node.classList.remove.apply(this.node.classList, arguments), this._distributeParent()
                        },
                        toggle: function toggle() {
                            this.node.classList.toggle.apply(this.node.classList, arguments), this._distributeParent()
                        },
                        _distributeParent: function _distributeParent() {
                            t || this.domApi._maybeDistributeParent()
                        },
                        contains: function contains() {
                            return this.node.classList.contains.apply(this.node.classList, arguments)
                        }
                    }
                }(),
                function() {
                    var e = Polymer.DomApi.ctor,
                        t = Polymer.Settings;
                    if (e.EffectiveNodesObserver = function(e) {
                            this.domApi = e, this.node = this.domApi.node, this._listeners = []
                        }, e.EffectiveNodesObserver.prototype = {
                            addListener: function addListener(e) {
                                this._isSetup || (this._setup(), this._isSetup = !0);
                                var t = {
                                    fn: e,
                                    _nodes: []
                                };
                                return this._listeners.push(t), this._scheduleNotify(), t
                            },
                            removeListener: function removeListener(e) {
                                var t = this._listeners.indexOf(e);
                                t >= 0 && (this._listeners.splice(t, 1), e._nodes = []), this._hasListeners() || (this._cleanup(), this._isSetup = !1)
                            },
                            _setup: function _setup() {
                                this._observeContentElements(this.domApi.childNodes)
                            },
                            _cleanup: function _cleanup() {
                                this._unobserveContentElements(this.domApi.childNodes)
                            },
                            _hasListeners: function _hasListeners() {
                                return Boolean(this._listeners.length)
                            },
                            _scheduleNotify: function _scheduleNotify() {
                                this._debouncer && this._debouncer.stop(), this._debouncer = Polymer.Debounce(this._debouncer, this._notify), this._debouncer.context = this, Polymer.dom.addDebouncer(this._debouncer)
                            },
                            notify: function notify() {
                                this._hasListeners() && this._scheduleNotify()
                            },
                            _notify: function _notify() {
                                this._beforeCallListeners(), this._callListeners()
                            },
                            _beforeCallListeners: function _beforeCallListeners() {
                                this._updateContentElements()
                            },
                            _updateContentElements: function _updateContentElements() {
                                this._observeContentElements(this.domApi.childNodes)
                            },
                            _observeContentElements: function _observeContentElements(e) {
                                for (var t, n = 0; n < e.length && (t = e[n]); n++) this._isContent(t) && (t.__observeNodesMap = t.__observeNodesMap || new WeakMap, t.__observeNodesMap.has(this) || t.__observeNodesMap.set(this, this._observeContent(t)))
                            },
                            _observeContent: function _observeContent(e) {
                                var t = this,
                                    n = Polymer.dom(e).observeNodes(function() {
                                        t._scheduleNotify()
                                    });
                                return n._avoidChangeCalculation = !0, n
                            },
                            _unobserveContentElements: function _unobserveContentElements(e) {
                                for (var t, n, r = 0; r < e.length && (t = e[r]); r++) this._isContent(t) && (n = t.__observeNodesMap.get(this), n && (Polymer.dom(t).unobserveNodes(n), t.__observeNodesMap.delete(this)))
                            },
                            _isContent: function _isContent(e) {
                                return "content" === e.localName
                            },
                            _callListeners: function _callListeners() {
                                for (var e, t = this._listeners, n = this._getEffectiveNodes(), r = 0; r < t.length && (e = t[r]); r++) {
                                    var i = this._generateListenerInfo(e, n);
                                    (i || e._alwaysNotify) && this._callListener(e, i)
                                }
                            },
                            _getEffectiveNodes: function _getEffectiveNodes() {
                                return this.domApi.getEffectiveChildNodes()
                            },
                            _generateListenerInfo: function _generateListenerInfo(e, t) {
                                if (e._avoidChangeCalculation) return !0;
                                for (var n, r = e._nodes, i = {
                                        target: this.node,
                                        addedNodes: [],
                                        removedNodes: []
                                    }, o = Polymer.ArraySplice.calculateSplices(t, r), s = 0; s < o.length && (n = o[s]); s++)
                                    for (var a, l = 0; l < n.removed.length && (a = n.removed[l]); l++) i.removedNodes.push(a);
                                for (s = 0, n; s < o.length && (n = o[s]); s++)
                                    for (l = n.index; l < n.index + n.addedCount; l++) i.addedNodes.push(t[l]);
                                return e._nodes = t, i.addedNodes.length || i.removedNodes.length ? i : void 0
                            },
                            _callListener: function _callListener(e, t) {
                                return e.fn.call(this.node, t)
                            },
                            enableShadowAttributeTracking: function enableShadowAttributeTracking() {}
                        }, t.useShadow) {
                        var n = e.EffectiveNodesObserver.prototype._setup,
                            r = e.EffectiveNodesObserver.prototype._cleanup;
                        Polymer.Base.extend(e.EffectiveNodesObserver.prototype, {
                            _setup: function _setup() {
                                if (!this._observer) {
                                    var e = this;
                                    this._mutationHandler = function(t) {
                                        t && t.length && e._scheduleNotify()
                                    }, this._observer = new MutationObserver(this._mutationHandler), this._boundFlush = function() {
                                        e._flush()
                                    }, Polymer.dom.addStaticFlush(this._boundFlush), this._observer.observe(this.node, {
                                        childList: !0
                                    })
                                }
                                n.call(this)
                            },
                            _cleanup: function _cleanup() {
                                this._observer.disconnect(), this._observer = null, this._mutationHandler = null, Polymer.dom.removeStaticFlush(this._boundFlush), r.call(this)
                            },
                            _flush: function _flush() {
                                this._observer && this._mutationHandler(this._observer.takeRecords())
                            },
                            enableShadowAttributeTracking: function enableShadowAttributeTracking() {
                                if (this._observer) {
                                    this._makeContentListenersAlwaysNotify(), this._observer.disconnect(), this._observer.observe(this.node, {
                                        childList: !0,
                                        attributes: !0,
                                        subtree: !0
                                    });
                                    var e = this.domApi.getOwnerRoot(),
                                        t = e && e.host;
                                    t && Polymer.dom(t).observer && Polymer.dom(t).observer.enableShadowAttributeTracking()
                                }
                            },
                            _makeContentListenersAlwaysNotify: function _makeContentListenersAlwaysNotify() {
                                for (var e, t = 0; t < this._listeners.length; t++) e = this._listeners[t], e._alwaysNotify = e._isContentListener
                            }
                        })
                    }
                }(),
                function() {
                    var e = Polymer.DomApi.ctor,
                        t = Polymer.Settings;
                    e.DistributedNodesObserver = function(t) {
                        e.EffectiveNodesObserver.call(this, t)
                    }, e.DistributedNodesObserver.prototype = Object.create(e.EffectiveNodesObserver.prototype), Polymer.Base.extend(e.DistributedNodesObserver.prototype, {
                        _setup: function _setup() {},
                        _cleanup: function _cleanup() {},
                        _beforeCallListeners: function _beforeCallListeners() {},
                        _getEffectiveNodes: function _getEffectiveNodes() {
                            return this.domApi.getDistributedNodes()
                        }
                    }), t.useShadow && Polymer.Base.extend(e.DistributedNodesObserver.prototype, {
                        _setup: function _setup() {
                            if (!this._observer) {
                                var e = this.domApi.getOwnerRoot(),
                                    t = e && e.host;
                                if (t) {
                                    var n = this;
                                    this._observer = Polymer.dom(t).observeNodes(function() {
                                        n._scheduleNotify()
                                    }), this._observer._isContentListener = !0, this._hasAttrSelect() && Polymer.dom(t).observer.enableShadowAttributeTracking()
                                }
                            }
                        },
                        _hasAttrSelect: function _hasAttrSelect() {
                            var e = this.node.getAttribute("select");
                            return e && e.match(/[[.]+/)
                        },
                        _cleanup: function _cleanup() {
                            var e = this.domApi.getOwnerRoot(),
                                t = e && e.host;
                            t && Polymer.dom(t).unobserveNodes(this._observer), this._observer = null
                        }
                    })
                }(),
                function() {
                    function distributeNodeInto(e, t) {
                        t._distributedNodes.push(e);
                        var n = e._destinationInsertionPoints;
                        n ? n.push(t) : e._destinationInsertionPoints = [t]
                    }

                    function clearDistributedDestinationInsertionPoints(e) {
                        var t = e._distributedNodes;
                        if (t)
                            for (var n = 0; n < t.length; n++) {
                                var r = t[n]._destinationInsertionPoints;
                                r && r.splice(r.indexOf(e) + 1, r.length)
                            }
                    }

                    function maybeRedistributeParent(n, r) {
                        var i = t.Logical.getParentNode(n);
                        i && i.shadyRoot && e.hasInsertionPoint(i.shadyRoot) && i.shadyRoot._distributionClean && (i.shadyRoot._distributionClean = !1, r.shadyRoot._dirtyRoots.push(i))
                    }

                    function isFinalDestination(e, t) {
                        var n = t._destinationInsertionPoints;
                        return n && n[n.length - 1] === e
                    }

                    function isInsertionPoint(e) {
                        return "content" == e.localName
                    }

                    function getTopDistributingHost(e) {
                        for (; e && hostNeedsRedistribution(e);) e = e.domHost;
                        return e
                    }

                    function hostNeedsRedistribution(e) {
                        for (var n, r = t.Logical.getChildNodes(e), i = 0; i < r.length; i++)
                            if (n = r[i], n.localName && "content" === n.localName) return e.domHost
                    }

                    function notifyContentObservers(t) {
                        for (var n, r = 0; r < t._insertionPoints.length; r++) n = t._insertionPoints[r], e.hasApi(n) && Polymer.dom(n).notifyObserver()
                    }

                    function notifyInitialDistribution(t) {
                        e.hasApi(t) && Polymer.dom(t).notifyObserver()
                    }

                    function upgradeLogicalChildren(e) {
                        if (n && e)
                            for (var t = 0; t < e.length; t++) CustomElements.upgrade(e[t])
                    }
                    var e = Polymer.DomApi,
                        t = Polymer.TreeApi;
                    Polymer.Base._addFeature({
                        _prepShady: function _prepShady() {
                            this._useContent = this._useContent || Boolean(this._template)
                        },
                        _setupShady: function _setupShady() {
                            this.shadyRoot = null, this.__domApi || (this.__domApi = null), this.__dom || (this.__dom = null), this._ownerShadyRoot || (this._ownerShadyRoot = void 0)
                        },
                        _poolContent: function _poolContent() {
                            this._useContent && t.Logical.saveChildNodes(this)
                        },
                        _setupRoot: function _setupRoot() {
                            this._useContent && (this._createLocalRoot(), this.dataHost || upgradeLogicalChildren(t.Logical.getChildNodes(this)))
                        },
                        _createLocalRoot: function _createLocalRoot() {
                            this.shadyRoot = this.root, this.shadyRoot._distributionClean = !1, this.shadyRoot._hasDistributed = !1, this.shadyRoot._isShadyRoot = !0, this.shadyRoot._dirtyRoots = [];
                            var e = this.shadyRoot._insertionPoints = !this._notes || this._notes._hasContent ? this.shadyRoot.querySelectorAll("content") : [];
                            t.Logical.saveChildNodes(this.shadyRoot);
                            for (var n, r = 0; r < e.length; r++) n = e[r], t.Logical.saveChildNodes(n), t.Logical.saveChildNodes(n.parentNode);
                            this.shadyRoot.host = this
                        },
                        get domHost() {
                            var e = Polymer.dom(this).getOwnerRoot();
                            return e && e.host
                        },
                        distributeContent: function distributeContent(e) {
                            if (this.shadyRoot) {
                                this.shadyRoot._invalidInsertionPoints = this.shadyRoot._invalidInsertionPoints || e;
                                var t = getTopDistributingHost(this);
                                Polymer.dom(this)._lazyDistribute(t)
                            }
                        },
                        _distributeContent: function _distributeContent() {
                            this._useContent && !this.shadyRoot._distributionClean && (this.shadyRoot._invalidInsertionPoints && (Polymer.dom(this)._updateInsertionPoints(this), this.shadyRoot._invalidInsertionPoints = !1), this._beginDistribute(), this._distributeDirtyRoots(), this._finishDistribute())
                        },
                        _beginDistribute: function _beginDistribute() {
                            this._useContent && e.hasInsertionPoint(this.shadyRoot) && (this._resetDistribution(), this._distributePool(this.shadyRoot, this._collectPool()))
                        },
                        _distributeDirtyRoots: function _distributeDirtyRoots() {
                            for (var e, t = this.shadyRoot._dirtyRoots, n = 0, r = t.length; n < r && (e = t[n]); n++) e._distributeContent();
                            this.shadyRoot._dirtyRoots = []
                        },
                        _finishDistribute: function _finishDistribute() {
                            if (this._useContent) {
                                if (this.shadyRoot._distributionClean = !0, e.hasInsertionPoint(this.shadyRoot)) this._composeTree(), notifyContentObservers(this.shadyRoot);
                                else if (this.shadyRoot._hasDistributed) {
                                    var n = this._composeNode(this);
                                    this._updateChildNodes(this, n)
                                } else t.Composed.clearChildNodes(this), this.appendChild(this.shadyRoot);
                                this.shadyRoot._hasDistributed || notifyInitialDistribution(this), this.shadyRoot._hasDistributed = !0
                            }
                        },
                        elementMatches: function elementMatches(t, n) {
                            return n = n || this, e.matchesSelector.call(n, t)
                        },
                        _resetDistribution: function _resetDistribution() {
                            for (var e = t.Logical.getChildNodes(this), n = 0; n < e.length; n++) {
                                var r = e[n];
                                r._destinationInsertionPoints && (r._destinationInsertionPoints = void 0), isInsertionPoint(r) && clearDistributedDestinationInsertionPoints(r)
                            }
                            for (var i = this.shadyRoot, o = i._insertionPoints, s = 0; s < o.length; s++) o[s]._distributedNodes = []
                        },
                        _collectPool: function _collectPool() {
                            for (var e = [], n = t.Logical.getChildNodes(this), r = 0; r < n.length; r++) {
                                var i = n[r];
                                isInsertionPoint(i) ? e.push.apply(e, i._distributedNodes) : e.push(i)
                            }
                            return e
                        },
                        _distributePool: function _distributePool(e, t) {
                            for (var n, r = e._insertionPoints, i = 0, o = r.length; i < o && (n = r[i]); i++) this._distributeInsertionPoint(n, t), maybeRedistributeParent(n, this)
                        },
                        _distributeInsertionPoint: function _distributeInsertionPoint(e, n) {
                            for (var r, i = !1, o = 0, s = n.length; o < s; o++) r = n[o], r && this._matchesContentSelect(r, e) && (distributeNodeInto(r, e), n[o] = void 0, i = !0);
                            if (!i)
                                for (var a = t.Logical.getChildNodes(e), l = 0; l < a.length; l++) distributeNodeInto(a[l], e)
                        },
                        _composeTree: function _composeTree() {
                            this._updateChildNodes(this, this._composeNode(this));
                            for (var e, n, r = this.shadyRoot._insertionPoints, i = 0, o = r.length; i < o && (e = r[i]); i++) n = t.Logical.getParentNode(e), n._useContent || n === this || n === this.shadyRoot || this._updateChildNodes(n, this._composeNode(n))
                        },
                        _composeNode: function _composeNode(e) {
                            for (var n = [], r = t.Logical.getChildNodes(e.shadyRoot || e), i = 0; i < r.length; i++) {
                                var o = r[i];
                                if (isInsertionPoint(o))
                                    for (var s = o._distributedNodes, a = 0; a < s.length; a++) {
                                        var l = s[a];
                                        isFinalDestination(o, l) && n.push(l)
                                    } else n.push(o)
                            }
                            return n
                        },
                        _updateChildNodes: function _updateChildNodes(e, n) {
                            for (var r, i = t.Composed.getChildNodes(e), o = Polymer.ArraySplice.calculateSplices(n, i), s = 0, a = 0; s < o.length && (r = o[s]); s++) {
                                for (var l, h = 0; h < r.removed.length && (l = r.removed[h]); h++) t.Composed.getParentNode(l) === e && t.Composed.removeChild(e, l), i.splice(r.index + a, 1);
                                a -= r.addedCount
                            }
                            for (var r, c, s = 0; s < o.length && (r = o[s]); s++)
                                for (c = i[r.index], h = r.index, l; h < r.index + r.addedCount; h++) l = n[h], t.Composed.insertBefore(e, l, c), i.splice(h, 0, l)
                        },
                        _matchesContentSelect: function _matchesContentSelect(e, t) {
                            var n = t.getAttribute("select");
                            if (!n) return !0;
                            if (n = n.trim(), !n) return !0;
                            if (!(e instanceof Element)) return !1;
                            var r = /^(:not\()?[*.#[a-zA-Z_|]/;
                            return !!r.test(n) && this.elementMatches(n, e)
                        },
                        _elementAdd: function _elementAdd() {},
                        _elementRemove: function _elementRemove() {}
                    });
                    var n = window.CustomElements && !CustomElements.useNative
                }(), Polymer.Settings.useShadow && Polymer.Base._addFeature({
                    _poolContent: function _poolContent() {},
                    _beginDistribute: function _beginDistribute() {},
                    distributeContent: function distributeContent() {},
                    _distributeContent: function _distributeContent() {},
                    _finishDistribute: function _finishDistribute() {},
                    _createLocalRoot: function _createLocalRoot() {
                        this.createShadowRoot(), this.shadowRoot.appendChild(this.root), this.root = this.shadowRoot
                    }
                }), Polymer.Async = {
                    _currVal: 0,
                    _lastVal: 0,
                    _callbacks: [],
                    _twiddleContent: 0,
                    _twiddle: document.createTextNode(""),
                    run: function run(e, t) {
                        return t > 0 ? ~setTimeout(e, t) : (this._twiddle.textContent = this._twiddleContent++, this._callbacks.push(e), this._currVal++)
                    },
                    cancel: function cancel(e) {
                        if (e < 0) clearTimeout(~e);
                        else {
                            var t = e - this._lastVal;
                            if (t >= 0) {
                                if (!this._callbacks[t]) throw "invalid async handle: " + e;
                                this._callbacks[t] = null
                            }
                        }
                    },
                    _atEndOfMicrotask: function _atEndOfMicrotask() {
                        for (var e = this._callbacks.length, t = 0; t < e; t++) {
                            var n = this._callbacks[t];
                            if (n) try {
                                n()
                            } catch (e) {
                                throw t++, this._callbacks.splice(0, t), this._lastVal += t, this._twiddle.textContent = this._twiddleContent++, e
                            }
                        }
                        this._callbacks.splice(0, e), this._lastVal += e
                    }
                }, new window.MutationObserver(function() {
                    Polymer.Async._atEndOfMicrotask()
                }).observe(Polymer.Async._twiddle, {
                    characterData: !0
                }), Polymer.Debounce = function() {
                    function debounce(e, n, r) {
                        return e ? e.stop() : e = new t(this), e.go(n, r), e
                    }
                    var e = Polymer.Async,
                        t = function Debouncer(e) {
                            this.context = e;
                            var t = this;
                            this.boundComplete = function() {
                                t.complete()
                            }
                        };
                    return t.prototype = {
                        go: function go(t, n) {
                            var r;
                            this.finish = function() {
                                e.cancel(r)
                            }, r = e.run(this.boundComplete, n), this.callback = t
                        },
                        stop: function stop() {
                            this.finish && (this.finish(), this.finish = null, this.callback = null)
                        },
                        complete: function complete() {
                            if (this.finish) {
                                var e = this.callback;
                                this.stop(), e.call(this.context)
                            }
                        }
                    }, debounce
                }(), Polymer.Base._addFeature({
                    _setupDebouncers: function _setupDebouncers() {
                        this._debouncers = {}
                    },
                    debounce: function debounce(e, t, n) {
                        return this._debouncers[e] = Polymer.Debounce.call(this, this._debouncers[e], t, n)
                    },
                    isDebouncerActive: function isDebouncerActive(e) {
                        var t = this._debouncers[e];
                        return !(!t || !t.finish)
                    },
                    flushDebouncer: function flushDebouncer(e) {
                        var t = this._debouncers[e];
                        t && t.complete()
                    },
                    cancelDebouncer: function cancelDebouncer(e) {
                        var t = this._debouncers[e];
                        t && t.stop()
                    }
                }), Polymer.DomModule = document.createElement("dom-module"), Polymer.Base._addFeature({
                    _registerFeatures: function _registerFeatures() {
                        this._prepIs(), this._prepBehaviors(), this._prepConstructor(), this._prepTemplate(), this._prepShady(), this._prepPropertyInfo()
                    },
                    _prepBehavior: function _prepBehavior(e) {
                        this._addHostAttributes(e.hostAttributes)
                    },
                    _initFeatures: function _initFeatures() {
                        this._registerHost(), this._template && (this._poolContent(), this._beginHosting(), this._stampTemplate(), this._endHosting()), this._marshalHostAttributes(), this._setupDebouncers(), this._marshalBehaviors(), this._tryReady()
                    },
                    _marshalBehavior: function _marshalBehavior(e) {}
                }), Polymer.nar = [], Polymer.Annotations = {
                    parseAnnotations: function parseAnnotations(e) {
                        var t = [],
                            n = e._content || e.content;
                        return this._parseNodeAnnotations(n, t, e.hasAttribute("strip-whitespace")), t
                    },
                    _parseNodeAnnotations: function _parseNodeAnnotations(e, t, n) {
                        return e.nodeType === Node.TEXT_NODE ? this._parseTextNodeAnnotation(e, t) : this._parseElementAnnotations(e, t, n)
                    },
                    _bindingRegex: function() {
                        var e = "(?:[a-zA-Z_$][\\w.:$\\-*]*)",
                            t = "(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)",
                            n = "(?:'(?:[^'\\\\]|\\\\.)*')",
                            r = '(?:"(?:[^"\\\\]|\\\\.)*")',
                            i = "(?:" + n + "|" + r + ")",
                            o = "(?:" + e + "|" + t + "|" + i + "\\s*)",
                            s = "(?:" + o + "(?:,\\s*" + o + ")*)",
                            a = "(?:\\(\\s*(?:" + s + "?)\\)\\s*)",
                            l = "(" + e + "\\s*" + a + "?)",
                            h = "(\\[\\[|{{)\\s*",
                            c = "(?:]]|}})",
                            d = "(?:(!)\\s*)?",
                            u = h + d + l + c;
                        return new RegExp(u, "g")
                    }(),
                    _parseBindings: function _parseBindings(e) {
                        for (var t, n = this._bindingRegex, r = [], i = 0; null !== (t = n.exec(e));) {
                            t.index > i && r.push({
                                literal: e.slice(i, t.index)
                            });
                            var o, s, a, l = t[1][0],
                                h = Boolean(t[2]),
                                c = t[3].trim();
                            "{" == l && (a = c.indexOf("::")) > 0 && (s = c.substring(a + 2), c = c.substring(0, a), o = !0), r.push({
                                compoundIndex: r.length,
                                value: c,
                                mode: l,
                                negate: h,
                                event: s,
                                customEvent: o
                            }), i = n.lastIndex
                        }
                        if (i && i < e.length) {
                            var d = e.substring(i);
                            d && r.push({
                                literal: d
                            })
                        }
                        if (r.length) return r
                    },
                    _literalFromParts: function _literalFromParts(e) {
                        for (var t = "", n = 0; n < e.length; n++) {
                            var r = e[n].literal;
                            t += r || ""
                        }
                        return t
                    },
                    _parseTextNodeAnnotation: function _parseTextNodeAnnotation(e, t) {
                        var n = this._parseBindings(e.textContent);
                        if (n) {
                            e.textContent = this._literalFromParts(n) || " ";
                            var r = {
                                bindings: [{
                                    kind: "text",
                                    name: "textContent",
                                    parts: n,
                                    isCompound: 1 !== n.length
                                }]
                            };
                            return t.push(r), r
                        }
                    },
                    _parseElementAnnotations: function _parseElementAnnotations(e, t, n) {
                        var r = {
                            bindings: [],
                            events: []
                        };
                        return "content" === e.localName && (t._hasContent = !0), this._parseChildNodesAnnotations(e, r, t, n), e.attributes && (this._parseNodeAttributeAnnotations(e, r, t), this.prepElement && this.prepElement(e)), (r.bindings.length || r.events.length || r.id) && t.push(r), r
                    },
                    _parseChildNodesAnnotations: function _parseChildNodesAnnotations(e, t, n, r) {
                        if (e.firstChild)
                            for (var i = e.firstChild, o = 0; i;) {
                                var s = i.nextSibling;
                                if ("template" !== i.localName || i.hasAttribute("preserve-content") || this._parseTemplate(i, o, n, t), "slot" == i.localName && (i = this._replaceSlotWithContent(i)), i.nodeType === Node.TEXT_NODE) {
                                    for (var a = s; a && a.nodeType === Node.TEXT_NODE;) i.textContent += a.textContent, s = a.nextSibling, e.removeChild(a), a = s;
                                    r && !i.textContent.trim() && (e.removeChild(i), o--)
                                }
                                if (i.parentNode) {
                                    var l = this._parseNodeAnnotations(i, n, r);
                                    l && (l.parent = t, l.index = o)
                                }
                                i = s, o++
                            }
                    },
                    _replaceSlotWithContent: function _replaceSlotWithContent(e) {
                        for (var t = e.ownerDocument.createElement("content"); e.firstChild;) t.appendChild(e.firstChild);
                        for (var n = e.attributes, r = 0; r < n.length; r++) {
                            var i = n[r];
                            t.setAttribute(i.name, i.value)
                        }
                        var o = e.getAttribute("name");
                        return o && t.setAttribute("select", "[slot='" + o + "']"), e.parentNode.replaceChild(t, e), t
                    },
                    _parseTemplate: function _parseTemplate(e, t, n, r) {
                        var i = document.createDocumentFragment();
                        i._notes = this.parseAnnotations(e), i.appendChild(e.content), n.push({
                            bindings: Polymer.nar,
                            events: Polymer.nar,
                            templateContent: i,
                            parent: r,
                            index: t
                        })
                    },
                    _parseNodeAttributeAnnotations: function _parseNodeAttributeAnnotations(e, t) {
                        for (var n, r = Array.prototype.slice.call(e.attributes), i = r.length - 1; n = r[i]; i--) {
                            var o, s = n.name,
                                a = n.value;
                            "on-" === s.slice(0, 3) ? (e.removeAttribute(s), t.events.push({
                                name: s.slice(3),
                                value: a
                            })) : (o = this._parseNodeAttributeAnnotation(e, s, a)) ? t.bindings.push(o) : "id" === s && (t.id = a)
                        }
                    },
                    _parseNodeAttributeAnnotation: function _parseNodeAttributeAnnotation(e, t, n) {
                        var r = this._parseBindings(n);
                        if (r) {
                            var i = t,
                                o = "property";
                            "$" == t[t.length - 1] && (t = t.slice(0, -1), o = "attribute");
                            var s = this._literalFromParts(r);
                            s && "attribute" == o && e.setAttribute(t, s), "input" === e.localName && "value" === i && e.setAttribute(i, ""), e.removeAttribute(i);
                            var a = Polymer.CaseMap.dashToCamelCase(t);
                            return "property" === o && (t = a), {
                                kind: o,
                                name: t,
                                propertyName: a,
                                parts: r,
                                literal: s,
                                isCompound: 1 !== r.length
                            }
                        }
                    },
                    findAnnotatedNode: function findAnnotatedNode(e, t) {
                        var n = t.parent && Polymer.Annotations.findAnnotatedNode(e, t.parent);
                        if (!n) return e;
                        for (var r = n.firstChild, i = 0; r; r = r.nextSibling)
                            if (t.index === i++) return r
                    }
                },
                function() {
                    function resolveCss(e, t) {
                        return e.replace(n, function(e, n, r, i) {
                            return n + "'" + resolve(r.replace(/["']/g, ""), t) + "'" + i
                        })
                    }

                    function resolveAttrs(e, t) {
                        for (var n in r)
                            for (var i, s, a, l = r[n], h = 0, c = l.length; h < c && (i = l[h]); h++) "*" !== n && e.localName !== n || (s = e.attributes[i], a = s && s.value, a && a.search(o) < 0 && (s.value = "style" === i ? resolveCss(a, t) : resolve(a, t)))
                    }

                    function resolve(e, t) {
                        if (e && i.test(e)) return e;
                        var n = getUrlResolver(t);
                        return n.href = e, n.href || e
                    }

                    function resolveUrl(n, r) {
                        return e || (e = document.implementation.createHTMLDocument("temp"), t = e.createElement("base"), e.head.appendChild(t)), t.href = r, resolve(n, e)
                    }

                    function getUrlResolver(e) {
                        return e.body.__urlResolver || (e.body.__urlResolver = e.createElement("a"))
                    }
                    var e, t, n = /(url\()([^)]*)(\))/g,
                        r = {
                            "*": ["href", "src", "style", "url"],
                            form: ["action"]
                        },
                        i = /(^\/)|(^#)|(^[\w-\d]*:)/,
                        o = /\{\{|\[\[/;
                    Polymer.ResolveUrl = {
                        resolveCss: resolveCss,
                        resolveAttrs: resolveAttrs,
                        resolveUrl: resolveUrl
                    }
                }(), Polymer.Path = {
                    root: function root(e) {
                        var t = e.indexOf(".");
                        return t === -1 ? e : e.slice(0, t)
                    },
                    isDeep: function isDeep(e) {
                        return e.indexOf(".") !== -1
                    },
                    isAncestor: function isAncestor(e, t) {
                        return 0 === e.indexOf(t + ".")
                    },
                    isDescendant: function isDescendant(e, t) {
                        return 0 === t.indexOf(e + ".")
                    },
                    translate: function translate(e, t, n) {
                        return t + n.slice(e.length)
                    },
                    matches: function matches(e, t, n) {
                        return e === n || this.isAncestor(e, n) || Boolean(t) && this.isDescendant(e, n)
                    }
                }, Polymer.Base._addFeature({
                    _prepAnnotations: function _prepAnnotations() {
                        if (this._template) {
                            var e = this;
                            Polymer.Annotations.prepElement = function(t) {
                                e._prepElement(t)
                            }, this._template._content && this._template._content._notes ? this._notes = this._template._content._notes : (this._notes = Polymer.Annotations.parseAnnotations(this._template), this._processAnnotations(this._notes)), Polymer.Annotations.prepElement = null
                        } else this._notes = []
                    },
                    _processAnnotations: function _processAnnotations(e) {
                        for (var t = 0; t < e.length; t++) {
                            for (var n = e[t], r = 0; r < n.bindings.length; r++)
                                for (var i = n.bindings[r], o = 0; o < i.parts.length; o++) {
                                    var s = i.parts[o];
                                    if (!s.literal) {
                                        var a = this._parseMethod(s.value);
                                        a ? s.signature = a : s.model = Polymer.Path.root(s.value)
                                    }
                                }
                            if (n.templateContent) {
                                this._processAnnotations(n.templateContent._notes);
                                var l = n.templateContent._parentProps = this._discoverTemplateParentProps(n.templateContent._notes),
                                    h = [];
                                for (var c in l) {
                                    var d = "_parent_" + c;
                                    h.push({
                                        index: n.index,
                                        kind: "property",
                                        name: d,
                                        propertyName: d,
                                        parts: [{
                                            mode: "{",
                                            model: c,
                                            value: c
                                        }]
                                    })
                                }
                                n.bindings = n.bindings.concat(h)
                            }
                        }
                    },
                    _discoverTemplateParentProps: function _discoverTemplateParentProps(e) {
                        for (var t, n = {}, r = 0; r < e.length && (t = e[r]); r++) {
                            for (var i, o = 0, s = t.bindings; o < s.length && (i = s[o]); o++)
                                for (var a, l = 0, h = i.parts; l < h.length && (a = h[l]); l++)
                                    if (a.signature) {
                                        for (var c = a.signature.args, d = 0; d < c.length; d++) {
                                            var u = c[d].model;
                                            u && (n[u] = !0)
                                        }
                                        a.signature.dynamicFn && (n[a.signature.method] = !0)
                                    } else a.model && (n[a.model] = !0);
                            if (t.templateContent) {
                                var f = t.templateContent._parentProps;
                                Polymer.Base.mixin(n, f)
                            }
                        }
                        return n
                    },
                    _prepElement: function _prepElement(e) {
                        Polymer.ResolveUrl.resolveAttrs(e, this._template.ownerDocument)
                    },
                    _findAnnotatedNode: Polymer.Annotations.findAnnotatedNode,
                    _marshalAnnotationReferences: function _marshalAnnotationReferences() {
                        this._template && (this._marshalIdNodes(), this._marshalAnnotatedNodes(), this._marshalAnnotatedListeners())
                    },
                    _configureAnnotationReferences: function _configureAnnotationReferences() {
                        for (var e = this._notes, t = this._nodes, n = 0; n < e.length; n++) {
                            var r = e[n],
                                i = t[n];
                            this._configureTemplateContent(r, i), this._configureCompoundBindings(r, i)
                        }
                    },
                    _configureTemplateContent: function _configureTemplateContent(e, t) {
                        e.templateContent && (t._content = e.templateContent)
                    },
                    _configureCompoundBindings: function _configureCompoundBindings(e, t) {
                        for (var n = e.bindings, r = 0; r < n.length; r++) {
                            var i = n[r];
                            if (i.isCompound) {
                                for (var o = t.__compoundStorage__ || (t.__compoundStorage__ = {}), s = i.parts, a = new Array(s.length), l = 0; l < s.length; l++) a[l] = s[l].literal;
                                var h = i.name;
                                o[h] = a, i.literal && "property" == i.kind && (t._configValue ? t._configValue(h, i.literal) : t[h] = i.literal)
                            }
                        }
                    },
                    _marshalIdNodes: function _marshalIdNodes() {
                        this.$ = {};
                        for (var e, t = 0, n = this._notes.length; t < n && (e = this._notes[t]); t++) e.id && (this.$[e.id] = this._findAnnotatedNode(this.root, e))
                    },
                    _marshalAnnotatedNodes: function _marshalAnnotatedNodes() {
                        if (this._notes && this._notes.length) {
                            for (var e = new Array(this._notes.length), t = 0; t < this._notes.length; t++) e[t] = this._findAnnotatedNode(this.root, this._notes[t]);
                            this._nodes = e
                        }
                    },
                    _marshalAnnotatedListeners: function _marshalAnnotatedListeners() {
                        for (var e, t = 0, n = this._notes.length; t < n && (e = this._notes[t]); t++)
                            if (e.events && e.events.length)
                                for (var r, i = this._findAnnotatedNode(this.root, e), o = 0, s = e.events; o < s.length && (r = s[o]); o++) this.listen(i, r.name, r.value)
                    }
                }), Polymer.Base._addFeature({
                    listeners: {},
                    _listenListeners: function _listenListeners(e) {
                        var t, n, r;
                        for (r in e) r.indexOf(".") < 0 ? (t = this, n = r) : (n = r.split("."), t = this.$[n[0]], n = n[1]), this.listen(t, n, e[r])
                    },
                    listen: function listen(e, t, n) {
                        var r = this._recallEventHandler(this, t, e, n);
                        r || (r = this._createEventHandler(e, t, n)), r._listening || (this._listen(e, t, r), r._listening = !0)
                    },
                    _boundListenerKey: function _boundListenerKey(e, t) {
                        return e + ":" + t
                    },
                    _recordEventHandler: function _recordEventHandler(e, t, n, r, i) {
                        var o = e.__boundListeners;
                        o || (o = e.__boundListeners = new WeakMap);
                        var s = o.get(n);
                        s || (s = {}, Polymer.Settings.isIE && n == window || o.set(n, s));
                        var a = this._boundListenerKey(t, r);
                        s[a] = i
                    },
                    _recallEventHandler: function _recallEventHandler(e, t, n, r) {
                        var i = e.__boundListeners;
                        if (i) {
                            var o = i.get(n);
                            if (o) {
                                var s = this._boundListenerKey(t, r);
                                return o[s]
                            }
                        }
                    },
                    _createEventHandler: function _createEventHandler(e, t, n) {
                        var r = this,
                            i = function handler(e) {
                                r[n] ? r[n](e, e.detail) : r._warn(r._logf("_createEventHandler", "listener method `" + n + "` not defined"))
                            };
                        return i._listening = !1, this._recordEventHandler(r, t, e, n, i), i
                    },
                    unlisten: function unlisten(e, t, n) {
                        var r = this._recallEventHandler(this, t, e, n);
                        r && (this._unlisten(e, t, r), r._listening = !1)
                    },
                    _listen: function _listen(e, t, n) {
                        e.addEventListener(t, n)
                    },
                    _unlisten: function _unlisten(e, t, n) {
                        e.removeEventListener(t, n)
                    }
                }),
                function() {
                    function setupTeardownMouseCanceller(e) {
                        for (var t, n = f ? ["click"] : h, r = 0; r < n.length; r++) t = n[r], e ? document.addEventListener(t, _, !0) : document.removeEventListener(t, _, !0)
                    }

                    function ignoreMouse(e) {
                        p.mouse.mouseIgnoreJob || setupTeardownMouseCanceller(!0);
                        var t = function unset() {
                            setupTeardownMouseCanceller(), p.mouse.target = null, p.mouse.mouseIgnoreJob = null
                        };
                        p.mouse.target = Polymer.dom(e).rootTarget, p.mouse.mouseIgnoreJob = Polymer.Debounce(p.mouse.mouseIgnoreJob, t, l)
                    }

                    function hasLeftMouseButton(e) {
                        var t = e.type;
                        if (h.indexOf(t) === -1) return !1;
                        if ("mousemove" === t) {
                            var n = void 0 === e.buttons ? 1 : e.buttons;
                            return e instanceof window.MouseEvent && !d && (n = c[e.which] || 0), Boolean(1 & n)
                        }
                        var r = void 0 === e.button ? 0 : e.button;
                        return 0 === r
                    }

                    function isSyntheticClick(e) {
                        if ("click" === e.type) {
                            if (0 === e.detail) return !0;
                            var t = m.findOriginalTarget(e),
                                n = t.getBoundingClientRect(),
                                r = e.pageX,
                                i = e.pageY;
                            return !(r >= n.left && r <= n.right && i >= n.top && i <= n.bottom)
                        }
                        return !1
                    }

                    function firstTouchAction(e) {
                        for (var t, n = Polymer.dom(e).path, r = "auto", o = 0; o < n.length; o++)
                            if (t = n[o], t[i]) {
                                r = t[i];
                                break
                            }
                        return r
                    }

                    function trackDocument(e, t, n) {
                        e.movefn = t, e.upfn = n, document.addEventListener("mousemove", t), document.addEventListener("mouseup", n)
                    }

                    function untrackDocument(e) {
                        document.removeEventListener("mousemove", e.movefn), document.removeEventListener("mouseup", e.upfn), e.movefn = null, e.upfn = null
                    }
                    var e = Polymer.DomApi.wrap,
                        t = "string" == typeof document.head.style.touchAction,
                        n = "__polymerGestures",
                        r = "__polymerGesturesHandled",
                        i = "__polymerGesturesTouchAction",
                        o = 25,
                        s = 5,
                        a = 2,
                        l = 2500,
                        h = ["mousedown", "mousemove", "mouseup", "click"],
                        c = [0, 1, 4, 2],
                        d = function() {
                            try {
                                return 1 === new MouseEvent("test", {
                                    buttons: 1
                                }).buttons
                            } catch (e) {
                                return !1
                            }
                        }(),
                        u = !1;
                    ! function() {
                        try {
                            var e = Object.defineProperty({}, "passive", {
                                get: function get() {
                                    u = !0
                                }
                            });
                            window.addEventListener("test", null, e), window.removeEventListener("test", null, e)
                        } catch (e) {}
                    }();
                    var f = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/),
                        _ = function mouseCanceller(e) {
                            var t = e.sourceCapabilities;
                            if ((!t || t.firesTouchEvents) && (e[r] = {
                                    skip: !0
                                }, "click" === e.type)) {
                                for (var n = Polymer.dom(e).path, i = 0; i < n.length; i++)
                                    if (n[i] === p.mouse.target) return;
                                e.preventDefault(), e.stopPropagation()
                            }
                        },
                        p = {
                            mouse: {
                                target: null,
                                mouseIgnoreJob: null
                            },
                            touch: {
                                x: 0,
                                y: 0,
                                id: -1,
                                scrollDecided: !1
                            }
                        };
                    document.addEventListener("touchend", ignoreMouse, !!u && {
                        passive: !0
                    });
                    var m = {
                        gestures: {},
                        recognizers: [],
                        deepTargetFind: function deepTargetFind(e, t) {
                            for (var n = document.elementFromPoint(e, t), r = n; r && r.shadowRoot;) r = r.shadowRoot.elementFromPoint(e, t), r && (n = r);
                            return n
                        },
                        findOriginalTarget: function findOriginalTarget(e) {
                            return e.path ? e.path[0] : e.target
                        },
                        handleNative: function handleNative(i) {
                            var o, s = i.type,
                                a = e(i.currentTarget),
                                l = a[n];
                            if (l) {
                                var h = l[s];
                                if (h) {
                                    if (!i[r] && (i[r] = {}, "touch" === s.slice(0, 5))) {
                                        var c = i.changedTouches[0];
                                        if ("touchstart" === s && 1 === i.touches.length && (p.touch.id = c.identifier), p.touch.id !== c.identifier) return;
                                        t || "touchstart" !== s && "touchmove" !== s || m.handleTouchAction(i)
                                    }
                                    if (o = i[r], !o.skip) {
                                        for (var d, u = m.recognizers, f = 0; f < u.length; f++) d = u[f], h[d.name] && !o[d.name] && d.flow && d.flow.start.indexOf(i.type) > -1 && d.reset && d.reset();
                                        for (f = 0, d; f < u.length; f++) d = u[f], h[d.name] && !o[d.name] && (o[d.name] = !0, d[s](i))
                                    }
                                }
                            }
                        },
                        handleTouchAction: function handleTouchAction(e) {
                            var t = e.changedTouches[0],
                                n = e.type;
                            if ("touchstart" === n) p.touch.x = t.clientX, p.touch.y = t.clientY, p.touch.scrollDecided = !1;
                            else if ("touchmove" === n) {
                                if (p.touch.scrollDecided) return;
                                p.touch.scrollDecided = !0;
                                var r = firstTouchAction(e),
                                    i = !1,
                                    o = Math.abs(p.touch.x - t.clientX),
                                    s = Math.abs(p.touch.y - t.clientY);
                                e.cancelable && ("none" === r ? i = !0 : "pan-x" === r ? i = s > o : "pan-y" === r && (i = o > s)), i ? e.preventDefault() : m.prevent("track")
                            }
                        },
                        add: function add(t, r, i) {
                            t = e(t);
                            var o = this.gestures[r],
                                s = o.deps,
                                a = o.name,
                                l = t[n];
                            l || (t[n] = l = {});
                            for (var c, d, u = 0; u < s.length; u++) c = s[u], f && h.indexOf(c) > -1 && "click" !== c || (d = l[c], d || (l[c] = d = {
                                _count: 0
                            }), 0 === d._count && t.addEventListener(c, this.handleNative), d[a] = (d[a] || 0) + 1, d._count = (d._count || 0) + 1);
                            t.addEventListener(r, i), o.touchAction && this.setTouchAction(t, o.touchAction)
                        },
                        remove: function remove(t, r, i) {
                            t = e(t);
                            var o = this.gestures[r],
                                s = o.deps,
                                a = o.name,
                                l = t[n];
                            if (l)
                                for (var h, c, d = 0; d < s.length; d++) h = s[d], c = l[h], c && c[a] && (c[a] = (c[a] || 1) - 1, c._count = (c._count || 1) - 1, 0 === c._count && t.removeEventListener(h, this.handleNative));
                            t.removeEventListener(r, i)
                        },
                        register: function register(e) {
                            this.recognizers.push(e);
                            for (var t = 0; t < e.emits.length; t++) this.gestures[e.emits[t]] = e
                        },
                        findRecognizerByEvent: function findRecognizerByEvent(e) {
                            for (var t, n = 0; n < this.recognizers.length; n++) {
                                t = this.recognizers[n];
                                for (var r, i = 0; i < t.emits.length; i++)
                                    if (r = t.emits[i], r === e) return t
                            }
                            return null
                        },
                        setTouchAction: function setTouchAction(e, n) {
                            t && (e.style.touchAction = n), e[i] = n
                        },
                        fire: function fire(e, t, n) {
                            var r = Polymer.Base.fire(t, n, {
                                node: e,
                                bubbles: !0,
                                cancelable: !0
                            });
                            if (r.defaultPrevented) {
                                var i = n.preventer || n.sourceEvent;
                                i && i.preventDefault && i.preventDefault()
                            }
                        },
                        prevent: function prevent(e) {
                            var t = this.findRecognizerByEvent(e);
                            t.info && (t.info.prevent = !0)
                        },
                        resetMouseCanceller: function resetMouseCanceller() {
                            p.mouse.mouseIgnoreJob && p.mouse.mouseIgnoreJob.complete()
                        }
                    };
                    m.register({
                        name: "downup",
                        deps: ["mousedown", "touchstart", "touchend"],
                        flow: {
                            start: ["mousedown", "touchstart"],
                            end: ["mouseup", "touchend"]
                        },
                        emits: ["down", "up"],
                        info: {
                            movefn: null,
                            upfn: null
                        },
                        reset: function reset() {
                            untrackDocument(this.info)
                        },
                        mousedown: function mousedown(e) {
                            if (hasLeftMouseButton(e)) {
                                var t = m.findOriginalTarget(e),
                                    n = this,
                                    r = function movefn(e) {
                                        hasLeftMouseButton(e) || (n.fire("up", t, e), untrackDocument(n.info))
                                    },
                                    i = function upfn(e) {
                                        hasLeftMouseButton(e) && n.fire("up", t, e), untrackDocument(n.info)
                                    };
                                trackDocument(this.info, r, i), this.fire("down", t, e)
                            }
                        },
                        touchstart: function touchstart(e) {
                            this.fire("down", m.findOriginalTarget(e), e.changedTouches[0], e)
                        },
                        touchend: function touchend(e) {
                            this.fire("up", m.findOriginalTarget(e), e.changedTouches[0], e)
                        },
                        fire: function fire(e, t, n, r) {
                            m.fire(t, e, {
                                x: n.clientX,
                                y: n.clientY,
                                sourceEvent: n,
                                preventer: r,
                                prevent: function prevent(e) {
                                    return m.prevent(e)
                                }
                            })
                        }
                    }), m.register({
                        name: "track",
                        touchAction: "none",
                        deps: ["mousedown", "touchstart", "touchmove", "touchend"],
                        flow: {
                            start: ["mousedown", "touchstart"],
                            end: ["mouseup", "touchend"]
                        },
                        emits: ["track"],
                        info: {
                            x: 0,
                            y: 0,
                            state: "start",
                            started: !1,
                            moves: [],
                            addMove: function addMove(e) {
                                this.moves.length > a && this.moves.shift(), this.moves.push(e)
                            },
                            movefn: null,
                            upfn: null,
                            prevent: !1
                        },
                        reset: function reset() {
                            this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, this.info.y = 0, this.info.prevent = !1, untrackDocument(this.info)
                        },
                        hasMovedEnough: function hasMovedEnough(e, t) {
                            if (this.info.prevent) return !1;
                            if (this.info.started) return !0;
                            var n = Math.abs(this.info.x - e),
                                r = Math.abs(this.info.y - t);
                            return n >= s || r >= s
                        },
                        mousedown: function mousedown(e) {
                            if (hasLeftMouseButton(e)) {
                                var t = m.findOriginalTarget(e),
                                    n = this,
                                    r = function movefn(e) {
                                        var r = e.clientX,
                                            i = e.clientY;
                                        n.hasMovedEnough(r, i) && (n.info.state = n.info.started ? "mouseup" === e.type ? "end" : "track" : "start", "start" === n.info.state && m.prevent("tap"), n.info.addMove({
                                            x: r,
                                            y: i
                                        }), hasLeftMouseButton(e) || (n.info.state = "end", untrackDocument(n.info)), n.fire(t, e), n.info.started = !0)
                                    },
                                    i = function upfn(e) {
                                        n.info.started && r(e), untrackDocument(n.info)
                                    };
                                trackDocument(this.info, r, i), this.info.x = e.clientX, this.info.y = e.clientY
                            }
                        },
                        touchstart: function touchstart(e) {
                            var t = e.changedTouches[0];
                            this.info.x = t.clientX, this.info.y = t.clientY
                        },
                        touchmove: function touchmove(e) {
                            var t = m.findOriginalTarget(e),
                                n = e.changedTouches[0],
                                r = n.clientX,
                                i = n.clientY;
                            this.hasMovedEnough(r, i) && ("start" === this.info.state && m.prevent("tap"), this.info.addMove({
                                x: r,
                                y: i
                            }), this.fire(t, n), this.info.state = "track", this.info.started = !0)
                        },
                        touchend: function touchend(e) {
                            var t = m.findOriginalTarget(e),
                                n = e.changedTouches[0];
                            this.info.started && (this.info.state = "end", this.info.addMove({
                                x: n.clientX,
                                y: n.clientY
                            }), this.fire(t, n, e))
                        },
                        fire: function fire(e, t, n) {
                            var r, i = this.info.moves[this.info.moves.length - 2],
                                o = this.info.moves[this.info.moves.length - 1],
                                s = o.x - this.info.x,
                                a = o.y - this.info.y,
                                l = 0;
                            return i && (r = o.x - i.x, l = o.y - i.y), m.fire(e, "track", {
                                state: this.info.state,
                                x: t.clientX,
                                y: t.clientY,
                                dx: s,
                                dy: a,
                                ddx: r,
                                ddy: l,
                                sourceEvent: t,
                                preventer: n,
                                hover: function hover() {
                                    return m.deepTargetFind(t.clientX, t.clientY)
                                }
                            })
                        }
                    }), m.register({
                        name: "tap",
                        deps: ["mousedown", "click", "touchstart", "touchend"],
                        flow: {
                            start: ["mousedown", "touchstart"],
                            end: ["click", "touchend"]
                        },
                        emits: ["tap"],
                        info: {
                            x: NaN,
                            y: NaN,
                            prevent: !1
                        },
                        reset: function reset() {
                            this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1
                        },
                        save: function save(e) {
                            this.info.x = e.clientX, this.info.y = e.clientY
                        },
                        mousedown: function mousedown(e) {
                            hasLeftMouseButton(e) && this.save(e)
                        },
                        click: function click(e) {
                            hasLeftMouseButton(e) && this.forward(e)
                        },
                        touchstart: function touchstart(e) {
                            this.save(e.changedTouches[0], e)
                        },
                        touchend: function touchend(e) {
                            this.forward(e.changedTouches[0], e)
                        },
                        forward: function forward(e, t) {
                            var n = Math.abs(e.clientX - this.info.x),
                                r = Math.abs(e.clientY - this.info.y),
                                i = m.findOriginalTarget(e);
                            (isNaN(n) || isNaN(r) || n <= o && r <= o || isSyntheticClick(e)) && (this.info.prevent || m.fire(i, "tap", {
                                x: e.clientX,
                                y: e.clientY,
                                sourceEvent: e,
                                preventer: t
                            }))
                        }
                    });
                    var y = {
                        x: "pan-x",
                        y: "pan-y",
                        none: "none",
                        all: "auto"
                    };
                    Polymer.Base._addFeature({
                        _setupGestures: function _setupGestures() {
                            this.__polymerGestures = null
                        },
                        _listen: function _listen(e, t, n) {
                            m.gestures[t] ? m.add(e, t, n) : e.addEventListener(t, n)
                        },
                        _unlisten: function _unlisten(e, t, n) {
                            m.gestures[t] ? m.remove(e, t, n) : e.removeEventListener(t, n)
                        },
                        setScrollDirection: function setScrollDirection(e, t) {
                            t = t || this, m.setTouchAction(t, y[e] || "auto")
                        }
                    }), Polymer.Gestures = m
                }(),
                function() {
                    if (Polymer.Base._addFeature({
                            $$: function $$(e) {
                                return Polymer.dom(this.root).querySelector(e)
                            },
                            toggleClass: function toggleClass(e, t, n) {
                                n = n || this, 1 == arguments.length && (t = !n.classList.contains(e)), t ? Polymer.dom(n).classList.add(e) : Polymer.dom(n).classList.remove(e)
                            },
                            toggleAttribute: function toggleAttribute(e, t, n) {
                                n = n || this, 1 == arguments.length && (t = !n.hasAttribute(e)), t ? Polymer.dom(n).setAttribute(e, "") : Polymer.dom(n).removeAttribute(e)
                            },
                            classFollows: function classFollows(e, t, n) {
                                n && Polymer.dom(n).classList.remove(e), t && Polymer.dom(t).classList.add(e)
                            },
                            attributeFollows: function attributeFollows(e, t, n) {
                                n && Polymer.dom(n).removeAttribute(e), t && Polymer.dom(t).setAttribute(e, "")
                            },
                            getEffectiveChildNodes: function getEffectiveChildNodes() {
                                return Polymer.dom(this).getEffectiveChildNodes()
                            },
                            getEffectiveChildren: function getEffectiveChildren() {
                                var e = Polymer.dom(this).getEffectiveChildNodes();
                                return e.filter(function(e) {
                                    return e.nodeType === Node.ELEMENT_NODE
                                })
                            },
                            getEffectiveTextContent: function getEffectiveTextContent() {
                                for (var e, t = this.getEffectiveChildNodes(), n = [], r = 0; e = t[r]; r++) e.nodeType !== Node.COMMENT_NODE && n.push(Polymer.dom(e).textContent);
                                return n.join("")
                            },
                            queryEffectiveChildren: function queryEffectiveChildren(e) {
                                var t = Polymer.dom(this).queryDistributedElements(e);
                                return t && t[0]
                            },
                            queryAllEffectiveChildren: function queryAllEffectiveChildren(e) {
                                return Polymer.dom(this).queryDistributedElements(e)
                            },
                            getContentChildNodes: function getContentChildNodes(e) {
                                var t = Polymer.dom(this.root).querySelector(e || "content");
                                return t ? Polymer.dom(t).getDistributedNodes() : []
                            },
                            getContentChildren: function getContentChildren(e) {
                                return this.getContentChildNodes(e).filter(function(e) {
                                    return e.nodeType === Node.ELEMENT_NODE
                                })
                            },
                            fire: function fire(e, t, n) {
                                n = n || Polymer.nob;
                                var r = n.node || this;
                                t = null === t || void 0 === t ? {} : t;
                                var i = void 0 === n.bubbles || n.bubbles,
                                    o = Boolean(n.cancelable),
                                    s = n._useCache,
                                    a = this._getEvent(e, i, o, s);
                                return a.detail = t, s && (this.__eventCache[e] = null), r.dispatchEvent(a), s && (this.__eventCache[e] = a), a
                            },
                            __eventCache: {},
                            _getEvent: function _getEvent(e, t, n, r) {
                                var i = r && this.__eventCache[e];
                                return i && i.bubbles == t && i.cancelable == n || (i = new Event(e, {
                                    bubbles: Boolean(t),
                                    cancelable: n
                                })), i
                            },
                            async: function async(e, t) {
                                var n = this;
                                return Polymer.Async.run(function() {
                                    e.call(n)
                                }, t)
                            },
                            cancelAsync: function cancelAsync(e) {
                                Polymer.Async.cancel(e)
                            },
                            arrayDelete: function arrayDelete(e, t) {
                                var n;
                                if (Array.isArray(e)) {
                                    if (n = e.indexOf(t), n >= 0) return e.splice(n, 1)
                                } else {
                                    var r = this._get(e);
                                    if (n = r.indexOf(t), n >= 0) return this.splice(e, n, 1)
                                }
                            },
                            transform: function transform(e, t) {
                                t = t || this, t.style.webkitTransform = e, t.style.transform = e
                            },
                            translate3d: function translate3d(e, t, n, r) {
                                r = r || this, this.transform("translate3d(" + e + "," + t + "," + n + ")", r)
                            },
                            importHref: function importHref(e, t, n, r) {
                                var i = document.createElement("link");
                                i.rel = "import", i.href = e;
                                var o = Polymer.Base.importHref.imported = Polymer.Base.importHref.imported || {},
                                    s = o[i.href],
                                    a = s || i,
                                    l = this,
                                    h = function loadListener(e) {
                                        return e.target.__firedLoad = !0, e.target.removeEventListener("load", loadListener), e.target.removeEventListener("error", c), t.call(l, e)
                                    },
                                    c = function errorListener(e) {
                                        return e.target.__firedError = !0, e.target.removeEventListener("load", h), e.target.removeEventListener("error", errorListener), n.call(l, e)
                                    };
                                return t && a.addEventListener("load", h), n && a.addEventListener("error", c), s ? (s.__firedLoad && s.dispatchEvent(new Event("load")), s.__firedError && s.dispatchEvent(new Event("error"))) : (o[i.href] = i, r = Boolean(r), r && i.setAttribute("async", ""), document.head.appendChild(i)), a
                            },
                            create: function create(e, t) {
                                var n = document.createElement(e);
                                if (t)
                                    for (var r in t) n[r] = t[r];
                                return n
                            },
                            isLightDescendant: function isLightDescendant(e) {
                                return this !== e && this.contains(e) && Polymer.dom(this).getOwnerRoot() === Polymer.dom(e).getOwnerRoot()
                            },
                            isLocalDescendant: function isLocalDescendant(e) {
                                return this.root === Polymer.dom(e).getOwnerRoot()
                            }
                        }), !Polymer.Settings.useNativeCustomElements) {
                        var e = Polymer.Base.importHref;
                        Polymer.Base.importHref = function(t, n, r, i) {
                            CustomElements.ready = !1;
                            var o = function loadFn(e) {
                                if (CustomElements.upgradeDocumentTree(document), CustomElements.ready = !0, n) return n.call(this, e)
                            };
                            return e.call(this, t, o, r, i)
                        }
                    }
                }(), Polymer.Bind = {
                    prepareModel: function prepareModel(e) {
                        Polymer.Base.mixin(e, this._modelApi)
                    },
                    _modelApi: {
                        _notifyChange: function _notifyChange(e, t, n) {
                            n = void 0 === n ? this[e] : n, t = t || Polymer.CaseMap.camelToDashCase(e) + "-changed", this.fire(t, {
                                value: n
                            }, {
                                bubbles: !1,
                                cancelable: !1,
                                _useCache: Polymer.Settings.eventDataCache || !Polymer.Settings.isIE
                            })
                        },
                        _propertySetter: function _propertySetter(e, t, n, r) {
                            var i = this.__data__[e];
                            return i === t || i !== i && t !== t || (this.__data__[e] = t, "object" == ("undefined" == typeof t ? "undefined" : _typeof(t)) && this._clearPath(e), this._propertyChanged && this._propertyChanged(e, t, i), n && this._effectEffects(e, t, n, i, r)), i
                        },
                        __setProperty: function __setProperty(e, t, n, r) {
                            r = r || this;
                            var i = r._propertyEffects && r._propertyEffects[e];
                            i ? r._propertySetter(e, t, i, n) : r[e] !== t && (r[e] = t)
                        },
                        _effectEffects: function _effectEffects(e, t, n, r, i) {
                            for (var o, s = 0, a = n.length; s < a && (o = n[s]); s++) o.fn.call(this, e, this[e], o.effect, r, i)
                        },
                        _clearPath: function _clearPath(e) {
                            for (var t in this.__data__) Polymer.Path.isDescendant(e, t) && (this.__data__[t] = void 0)
                        }
                    },
                    ensurePropertyEffects: function ensurePropertyEffects(e, t) {
                        e._propertyEffects || (e._propertyEffects = {});
                        var n = e._propertyEffects[t];
                        return n || (n = e._propertyEffects[t] = []), n
                    },
                    addPropertyEffect: function addPropertyEffect(e, t, n, r) {
                        var i = this.ensurePropertyEffects(e, t),
                            o = {
                                kind: n,
                                effect: r,
                                fn: Polymer.Bind["_" + n + "Effect"]
                            };
                        return i.push(o), o
                    },
                    createBindings: function createBindings(e) {
                        var t = e._propertyEffects;
                        if (t)
                            for (var n in t) {
                                var r = t[n];
                                r.sort(this._sortPropertyEffects), this._createAccessors(e, n, r)
                            }
                    },
                    _sortPropertyEffects: function() {
                        var e = {
                            compute: 0,
                            annotation: 1,
                            annotatedComputation: 2,
                            reflect: 3,
                            notify: 4,
                            observer: 5,
                            complexObserver: 6,
                            function: 7
                        };
                        return function(t, n) {
                            return e[t.kind] - e[n.kind]
                        }
                    }(),
                    _createAccessors: function _createAccessors(e, t, n) {
                        var r = {
                                get: function get() {
                                    return this.__data__[t]
                                }
                            },
                            i = function setter(e) {
                                this._propertySetter(t, e, n)
                            },
                            o = e.getPropertyInfo && e.getPropertyInfo(t);
                        o && o.readOnly ? o.computed || (e["_set" + this.upper(t)] = i) : r.set = i, Object.defineProperty(e, t, r)
                    },
                    upper: function upper(e) {
                        return e[0].toUpperCase() + e.substring(1)
                    },
                    _addAnnotatedListener: function _addAnnotatedListener(e, t, n, r, i, o) {
                        e._bindListeners || (e._bindListeners = []);
                        var s = this._notedListenerFactory(n, r, Polymer.Path.isDeep(r), o),
                            a = i || Polymer.CaseMap.camelToDashCase(n) + "-changed";
                        e._bindListeners.push({
                            index: t,
                            property: n,
                            path: r,
                            changedFn: s,
                            event: a
                        })
                    },
                    _isEventBogus: function _isEventBogus(e, t) {
                        return e.path && e.path[0] !== t
                    },
                    _notedListenerFactory: function _notedListenerFactory(e, t, n, r) {
                        return function(i, o, s) {
                            if (s) {
                                var a = Polymer.Path.translate(e, t, s);
                                this._notifyPath(a, o)
                            } else o = i[e], r && (o = !o), n ? this.__data__[t] != o && this.set(t, o) : this[t] = o
                        }
                    },
                    prepareInstance: function prepareInstance(e) {
                        e.__data__ = Object.create(null)
                    },
                    setupBindListeners: function setupBindListeners(e) {
                        for (var t, n = e._bindListeners, r = 0, i = n.length; r < i && (t = n[r]); r++) {
                            var o = e._nodes[t.index];
                            this._addNotifyListener(o, e, t.event, t.changedFn)
                        }
                    },
                    _addNotifyListener: function _addNotifyListener(e, t, n, r) {
                        e.addEventListener(n, function(e) {
                            return t._notifyListener(r, e)
                        })
                    }
                }, Polymer.Base.extend(Polymer.Bind, {
                    _shouldAddListener: function _shouldAddListener(e) {
                        return e.name && "attribute" != e.kind && "text" != e.kind && !e.isCompound && "{" === e.parts[0].mode
                    },
                    _annotationEffect: function _annotationEffect(e, t, n) {
                        e != n.value && (t = this._get(n.value), this.__data__[n.value] = t), this._applyEffectValue(n, t)
                    },
                    _reflectEffect: function _reflectEffect(e, t, n) {
                        this.reflectPropertyToAttribute(e, n.attribute, t)
                    },
                    _notifyEffect: function _notifyEffect(e, t, n, r, i) {
                        i || this._notifyChange(e, n.event, t)
                    },
                    _functionEffect: function _functionEffect(e, t, n, r, i) {
                        n.call(this, e, t, r, i)
                    },
                    _observerEffect: function _observerEffect(e, t, n, r) {
                        var i = this[n.method];
                        i ? i.call(this, t, r) : this._warn(this._logf("_observerEffect", "observer method `" + n.method + "` not defined"))
                    },
                    _complexObserverEffect: function _complexObserverEffect(e, t, n) {
                        var r = this[n.method];
                        if (r) {
                            var i = Polymer.Bind._marshalArgs(this.__data__, n, e, t);
                            i && r.apply(this, i)
                        } else n.dynamicFn || this._warn(this._logf("_complexObserverEffect", "observer method `" + n.method + "` not defined"))
                    },
                    _computeEffect: function _computeEffect(e, t, n) {
                        var r = this[n.method];
                        if (r) {
                            var i = Polymer.Bind._marshalArgs(this.__data__, n, e, t);
                            if (i) {
                                var o = r.apply(this, i);
                                this.__setProperty(n.name, o)
                            }
                        } else n.dynamicFn || this._warn(this._logf("_computeEffect", "compute method `" + n.method + "` not defined"))
                    },
                    _annotatedComputationEffect: function _annotatedComputationEffect(e, t, n) {
                        var r = this._rootDataHost || this,
                            i = r[n.method];
                        if (i) {
                            var o = Polymer.Bind._marshalArgs(this.__data__, n, e, t);
                            if (o) {
                                var s = i.apply(r, o);
                                this._applyEffectValue(n, s)
                            }
                        } else n.dynamicFn || r._warn(r._logf("_annotatedComputationEffect", "compute method `" + n.method + "` not defined"))
                    },
                    _marshalArgs: function _marshalArgs(e, t, n, r) {
                        for (var i = [], o = t.args, s = o.length > 1 || t.dynamicFn, a = 0, l = o.length; a < l; a++) {
                            var h, c = o[a],
                                d = c.name;
                            if (c.literal ? h = c.value : n === d ? h = r : (h = e[d], void 0 === h && c.structured && (h = Polymer.Base._get(d, e))), s && void 0 === h) return;
                            if (c.wildcard) {
                                var u = Polymer.Path.isAncestor(n, d);
                                i[a] = {
                                    path: u ? n : d,
                                    value: u ? r : h,
                                    base: h
                                }
                            } else i[a] = h
                        }
                        return i
                    }
                }), Polymer.Base._addFeature({
                    _addPropertyEffect: function _addPropertyEffect(e, t, n) {
                        var r = Polymer.Bind.addPropertyEffect(this, e, t, n);
                        r.pathFn = this["_" + r.kind + "PathEffect"]
                    },
                    _prepEffects: function _prepEffects() {
                        Polymer.Bind.prepareModel(this), this._addAnnotationEffects(this._notes)
                    },
                    _prepBindings: function _prepBindings() {
                        Polymer.Bind.createBindings(this)
                    },
                    _addPropertyEffects: function _addPropertyEffects(e) {
                        if (e)
                            for (var t in e) {
                                var n = e[t];
                                if (n.observer && this._addObserverEffect(t, n.observer), n.computed && (n.readOnly = !0, this._addComputedEffect(t, n.computed)), n.notify && this._addPropertyEffect(t, "notify", {
                                        event: Polymer.CaseMap.camelToDashCase(t) + "-changed"
                                    }), n.reflectToAttribute) {
                                    var r = Polymer.CaseMap.camelToDashCase(t);
                                    "-" === r[0] ? this._warn(this._logf("_addPropertyEffects", "Property " + t + " cannot be reflected to attribute " + r + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.')) : this._addPropertyEffect(t, "reflect", {
                                        attribute: r
                                    })
                                }
                                n.readOnly && Polymer.Bind.ensurePropertyEffects(this, t)
                            }
                    },
                    _addComputedEffect: function _addComputedEffect(e, t) {
                        for (var n, r = this._parseMethod(t), i = r.dynamicFn, o = 0; o < r.args.length && (n = r.args[o]); o++) this._addPropertyEffect(n.model, "compute", {
                            method: r.method,
                            args: r.args,
                            trigger: n,
                            name: e,
                            dynamicFn: i
                        });
                        i && this._addPropertyEffect(r.method, "compute", {
                            method: r.method,
                            args: r.args,
                            trigger: null,
                            name: e,
                            dynamicFn: i
                        })
                    },
                    _addObserverEffect: function _addObserverEffect(e, t) {
                        this._addPropertyEffect(e, "observer", {
                            method: t,
                            property: e
                        })
                    },
                    _addComplexObserverEffects: function _addComplexObserverEffects(e) {
                        if (e)
                            for (var t, n = 0; n < e.length && (t = e[n]); n++) this._addComplexObserverEffect(t)
                    },
                    _addComplexObserverEffect: function _addComplexObserverEffect(e) {
                        var t = this._parseMethod(e);
                        if (!t) throw new Error("Malformed observer expression '" + e + "'");
                        for (var n, r = t.dynamicFn, i = 0; i < t.args.length && (n = t.args[i]); i++) this._addPropertyEffect(n.model, "complexObserver", {
                            method: t.method,
                            args: t.args,
                            trigger: n,
                            dynamicFn: r
                        });
                        r && this._addPropertyEffect(t.method, "complexObserver", {
                            method: t.method,
                            args: t.args,
                            trigger: null,
                            dynamicFn: r
                        })
                    },
                    _addAnnotationEffects: function _addAnnotationEffects(e) {
                        for (var t, n = 0; n < e.length && (t = e[n]); n++)
                            for (var r, i = t.bindings, o = 0; o < i.length && (r = i[o]); o++) this._addAnnotationEffect(r, n)
                    },
                    _addAnnotationEffect: function _addAnnotationEffect(e, t) {
                        Polymer.Bind._shouldAddListener(e) && Polymer.Bind._addAnnotatedListener(this, t, e.name, e.parts[0].value, e.parts[0].event, e.parts[0].negate);
                        for (var n = 0; n < e.parts.length; n++) {
                            var r = e.parts[n];
                            r.signature ? this._addAnnotatedComputationEffect(e, r, t) : r.literal || ("attribute" === e.kind && "-" === e.name[0] ? this._warn(this._logf("_addAnnotationEffect", "Cannot set attribute " + e.name + ' because "-" is not a valid attribute starting character')) : this._addPropertyEffect(r.model, "annotation", {
                                kind: e.kind,
                                index: t,
                                name: e.name,
                                propertyName: e.propertyName,
                                value: r.value,
                                isCompound: e.isCompound,
                                compoundIndex: r.compoundIndex,
                                event: r.event,
                                customEvent: r.customEvent,
                                negate: r.negate
                            }))
                        }
                    },
                    _addAnnotatedComputationEffect: function _addAnnotatedComputationEffect(e, t, n) {
                        var r = t.signature;
                        if (r.static) this.__addAnnotatedComputationEffect("__static__", n, e, t, null);
                        else {
                            for (var i, o = 0; o < r.args.length && (i = r.args[o]); o++) i.literal || this.__addAnnotatedComputationEffect(i.model, n, e, t, i);
                            r.dynamicFn && this.__addAnnotatedComputationEffect(r.method, n, e, t, null)
                        }
                    },
                    __addAnnotatedComputationEffect: function __addAnnotatedComputationEffect(e, t, n, r, i) {
                        this._addPropertyEffect(e, "annotatedComputation", {
                            index: t,
                            isCompound: n.isCompound,
                            compoundIndex: r.compoundIndex,
                            kind: n.kind,
                            name: n.name,
                            negate: r.negate,
                            method: r.signature.method,
                            args: r.signature.args,
                            trigger: i,
                            dynamicFn: r.signature.dynamicFn
                        })
                    },
                    _parseMethod: function _parseMethod(e) {
                        var t = e.match(/([^\s]+?)\(([\s\S]*)\)/);
                        if (t) {
                            var n = {
                                method: t[1],
                                static: !0
                            };
                            if (this.getPropertyInfo(n.method) !== Polymer.nob && (n.static = !1, n.dynamicFn = !0), t[2].trim()) {
                                var r = t[2].replace(/\\,/g, "&comma;").split(",");
                                return this._parseArgs(r, n)
                            }
                            return n.args = Polymer.nar, n
                        }
                    },
                    _parseArgs: function _parseArgs(e, t) {
                        return t.args = e.map(function(e) {
                            var n = this._parseArg(e);
                            return n.literal || (t.static = !1), n
                        }, this), t
                    },
                    _parseArg: function _parseArg(e) {
                        var t = e.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"),
                            n = {
                                name: t
                            },
                            r = t[0];
                        switch ("-" === r && (r = t[1]), r >= "0" && r <= "9" && (r = "#"), r) {
                            case "'":
                            case '"':
                                n.value = t.slice(1, -1), n.literal = !0;
                                break;
                            case "#":
                                n.value = Number(t), n.literal = !0
                        }
                        return n.literal || (n.model = Polymer.Path.root(t), n.structured = Polymer.Path.isDeep(t), n.structured && (n.wildcard = ".*" == t.slice(-2), n.wildcard && (n.name = t.slice(0, -2)))), n
                    },
                    _marshalInstanceEffects: function _marshalInstanceEffects() {
                        Polymer.Bind.prepareInstance(this), this._bindListeners && Polymer.Bind.setupBindListeners(this)
                    },
                    _applyEffectValue: function _applyEffectValue(e, t) {
                        var n = this._nodes[e.index],
                            r = e.name;
                        if (t = this._computeFinalAnnotationValue(n, r, t, e), "attribute" == e.kind) this.serializeValueToAttribute(t, r, n);
                        else {
                            var i = n._propertyInfo && n._propertyInfo[r];
                            if (i && i.readOnly) return;
                            this.__setProperty(r, t, !1, n)
                        }
                    },
                    _computeFinalAnnotationValue: function _computeFinalAnnotationValue(e, t, n, r) {
                        if (r.negate && (n = !n), r.isCompound) {
                            var i = e.__compoundStorage__[t];
                            i[r.compoundIndex] = n, n = i.join("")
                        }
                        return "attribute" !== r.kind && ("className" === t && (n = this._scopeElementClass(e, n)), ("textContent" === t || "input" == e.localName && "value" == t) && (n = void 0 == n ? "" : n)), n
                    },
                    _executeStaticEffects: function _executeStaticEffects() {
                        this._propertyEffects && this._propertyEffects.__static__ && this._effectEffects("__static__", null, this._propertyEffects.__static__)
                    }
                }),
                function() {
                    var e = Polymer.Settings.usePolyfillProto;
                    Polymer.Base._addFeature({
                        _setupConfigure: function _setupConfigure(e) {
                            if (this._config = {}, this._handlers = [], this._aboveConfig = null, e)
                                for (var t in e) void 0 !== e[t] && (this._config[t] = e[t])
                        },
                        _marshalAttributes: function _marshalAttributes() {
                            this._takeAttributesToModel(this._config)
                        },
                        _attributeChangedImpl: function _attributeChangedImpl(e) {
                            var t = this._clientsReadied ? this : this._config;
                            this._setAttributeToProperty(t, e)
                        },
                        _configValue: function _configValue(e, t) {
                            var n = this._propertyInfo[e];
                            n && n.readOnly || (this._config[e] = t)
                        },
                        _beforeClientsReady: function _beforeClientsReady() {
                            this._configure()
                        },
                        _configure: function _configure() {
                            this._configureAnnotationReferences(), this._configureInstanceProperties(), this._aboveConfig = this.mixin({}, this._config);
                            for (var e = {}, t = 0; t < this.behaviors.length; t++) this._configureProperties(this.behaviors[t].properties, e);
                            this._configureProperties(this.properties, e), this.mixin(e, this._aboveConfig), this._config = e, this._clients && this._clients.length && this._distributeConfig(this._config)
                        },
                        _configureInstanceProperties: function _configureInstanceProperties() {
                            for (var t in this._propertyEffects) !e && this.hasOwnProperty(t) && (this._configValue(t, this[t]), delete this[t])
                        },
                        _configureProperties: function _configureProperties(e, t) {
                            for (var n in e) {
                                var r = e[n];
                                if (void 0 !== r.value) {
                                    var i = r.value;
                                    "function" == typeof i && (i = i.call(this, this._config)), t[n] = i
                                }
                            }
                        },
                        _distributeConfig: function _distributeConfig(e) {
                            var t = this._propertyEffects;
                            if (t)
                                for (var n in e) {
                                    var r = t[n];
                                    if (r)
                                        for (var i, o = 0, s = r.length; o < s && (i = r[o]); o++)
                                            if ("annotation" === i.kind) {
                                                var a = this._nodes[i.effect.index],
                                                    l = i.effect.propertyName,
                                                    h = "attribute" == i.effect.kind,
                                                    c = a._propertyEffects && a._propertyEffects[l];
                                                if (a._configValue && (c || !h)) {
                                                    var d = n === i.effect.value ? e[n] : this._get(i.effect.value, e);
                                                    d = this._computeFinalAnnotationValue(a, l, d, i.effect), h && (d = a.deserialize(this.serialize(d), a._propertyInfo[l].type)), a._configValue(l, d)
                                                }
                                            }
                                }
                        },
                        _afterClientsReady: function _afterClientsReady() {
                            this._executeStaticEffects(), this._applyConfig(this._config, this._aboveConfig), this._flushHandlers()
                        },
                        _applyConfig: function _applyConfig(e, t) {
                            for (var n in e) void 0 === this[n] && this.__setProperty(n, e[n], n in t)
                        },
                        _notifyListener: function _notifyListener(e, t) {
                            if (!Polymer.Bind._isEventBogus(t, t.target)) {
                                var n, r;
                                if (t.detail && (n = t.detail.value, r = t.detail.path), this._clientsReadied) return e.call(this, t.target, n, r);
                                this._queueHandler([e, t.target, n, r])
                            }
                        },
                        _queueHandler: function _queueHandler(e) {
                            this._handlers.push(e)
                        },
                        _flushHandlers: function _flushHandlers() {
                            for (var e, t = this._handlers, n = 0, r = t.length; n < r && (e = t[n]); n++) e[0].call(this, e[1], e[2], e[3]);
                            this._handlers = []
                        }
                    })
                }(),
                function() {
                    var e = Polymer.Path;
                    Polymer.Base._addFeature({
                        notifyPath: function notifyPath(e, t, n) {
                            var r = {},
                                i = this._get(e, this, r);
                            1 === arguments.length && (t = i), r.path && this._notifyPath(r.path, t, n)
                        },
                        _notifyPath: function _notifyPath(e, t, n) {
                            var r = this._propertySetter(e, t);
                            if (r !== t && (r === r || t === t)) return this._pathEffector(e, t), n || this._notifyPathUp(e, t), !0
                        },
                        _getPathParts: function _getPathParts(e) {
                            if (Array.isArray(e)) {
                                for (var t = [], n = 0; n < e.length; n++)
                                    for (var r = e[n].toString().split("."), i = 0; i < r.length; i++) t.push(r[i]);
                                return t
                            }
                            return e.toString().split(".")
                        },
                        set: function set(e, t, n) {
                            var r, i = n || this,
                                o = this._getPathParts(e),
                                s = o[o.length - 1];
                            if (o.length > 1) {
                                for (var a = 0; a < o.length - 1; a++) {
                                    var l = o[a];
                                    if (r && "#" == l[0] ? i = Polymer.Collection.get(r).getItem(l) : (i = i[l], r && parseInt(l, 10) == l && (o[a] = Polymer.Collection.get(r).getKey(i))), !i) return;
                                    r = Array.isArray(i) ? i : null
                                }
                                if (r) {
                                    var h, c, d = Polymer.Collection.get(r);
                                    "#" == s[0] ? (c = s, h = d.getItem(c), s = r.indexOf(h), d.setItem(c, t)) : parseInt(s, 10) == s && (h = i[s], c = d.getKey(h), o[a] = c, d.setItem(c, t))
                                }
                                i[s] = t, n || this._notifyPath(o.join("."), t)
                            } else i[e] = t
                        },
                        get: function get(e, t) {
                            return this._get(e, t)
                        },
                        _get: function _get(e, t, n) {
                            for (var r, i = t || this, o = this._getPathParts(e), s = 0; s < o.length; s++) {
                                if (!i) return;
                                var a = o[s];
                                r && "#" == a[0] ? i = Polymer.Collection.get(r).getItem(a) : (i = i[a], n && r && parseInt(a, 10) == a && (o[s] = Polymer.Collection.get(r).getKey(i))), r = Array.isArray(i) ? i : null
                            }
                            return n && (n.path = o.join(".")), i
                        },
                        _pathEffector: function _pathEffector(t, n) {
                            var r = e.root(t),
                                i = this._propertyEffects && this._propertyEffects[r];
                            if (i)
                                for (var o, s = 0; s < i.length && (o = i[s]); s++) {
                                    var a = o.pathFn;
                                    a && a.call(this, t, n, o.effect)
                                }
                            this._boundPaths && this._notifyBoundPaths(t, n)
                        },
                        _annotationPathEffect: function _annotationPathEffect(t, n, r) {
                            if (e.matches(r.value, !1, t)) Polymer.Bind._annotationEffect.call(this, t, n, r);
                            else if (!r.negate && e.isDescendant(r.value, t)) {
                                var i = this._nodes[r.index];
                                if (i && i._notifyPath) {
                                    var o = e.translate(r.value, r.name, t);
                                    i._notifyPath(o, n, !0)
                                }
                            }
                        },
                        _complexObserverPathEffect: function _complexObserverPathEffect(t, n, r) {
                            e.matches(r.trigger.name, r.trigger.wildcard, t) && Polymer.Bind._complexObserverEffect.call(this, t, n, r)
                        },
                        _computePathEffect: function _computePathEffect(t, n, r) {
                            e.matches(r.trigger.name, r.trigger.wildcard, t) && Polymer.Bind._computeEffect.call(this, t, n, r)
                        },
                        _annotatedComputationPathEffect: function _annotatedComputationPathEffect(t, n, r) {
                            e.matches(r.trigger.name, r.trigger.wildcard, t) && Polymer.Bind._annotatedComputationEffect.call(this, t, n, r)
                        },
                        linkPaths: function linkPaths(e, t) {
                            this._boundPaths = this._boundPaths || {},
                                t ? this._boundPaths[e] = t : this.unlinkPaths(e)
                        },
                        unlinkPaths: function unlinkPaths(e) {
                            this._boundPaths && delete this._boundPaths[e]
                        },
                        _notifyBoundPaths: function _notifyBoundPaths(t, n) {
                            for (var r in this._boundPaths) {
                                var i = this._boundPaths[r];
                                e.isDescendant(r, t) ? this._notifyPath(e.translate(r, i, t), n) : e.isDescendant(i, t) && this._notifyPath(e.translate(i, r, t), n)
                            }
                        },
                        _notifyPathUp: function _notifyPathUp(t, n) {
                            var r = e.root(t),
                                i = Polymer.CaseMap.camelToDashCase(r),
                                o = i + this._EVENT_CHANGED;
                            this.fire(o, {
                                path: t,
                                value: n
                            }, {
                                bubbles: !1,
                                _useCache: Polymer.Settings.eventDataCache || !Polymer.Settings.isIE
                            })
                        },
                        _EVENT_CHANGED: "-changed",
                        notifySplices: function notifySplices(e, t) {
                            var n = {},
                                r = this._get(e, this, n);
                            this._notifySplices(r, n.path, t)
                        },
                        _notifySplices: function _notifySplices(e, t, n) {
                            var r = {
                                    keySplices: Polymer.Collection.applySplices(e, n),
                                    indexSplices: n
                                },
                                i = t + ".splices";
                            this._notifyPath(i, r), this._notifyPath(t + ".length", e.length), this.__data__[i] = {
                                keySplices: null,
                                indexSplices: null
                            }
                        },
                        _notifySplice: function _notifySplice(e, t, n, r, i) {
                            this._notifySplices(e, t, [{
                                index: n,
                                addedCount: r,
                                removed: i,
                                object: e,
                                type: "splice"
                            }])
                        },
                        push: function push(e) {
                            var t = {},
                                n = this._get(e, this, t),
                                r = Array.prototype.slice.call(arguments, 1),
                                i = n.length,
                                o = n.push.apply(n, r);
                            return r.length && this._notifySplice(n, t.path, i, r.length, []), o
                        },
                        pop: function pop(e) {
                            var t = {},
                                n = this._get(e, this, t),
                                r = Boolean(n.length),
                                i = Array.prototype.slice.call(arguments, 1),
                                o = n.pop.apply(n, i);
                            return r && this._notifySplice(n, t.path, n.length, 0, [o]), o
                        },
                        splice: function splice(e, t) {
                            var n = {},
                                r = this._get(e, this, n);
                            t = t < 0 ? r.length - Math.floor(-t) : Math.floor(t), t || (t = 0);
                            var i = Array.prototype.slice.call(arguments, 1),
                                o = r.splice.apply(r, i),
                                s = Math.max(i.length - 2, 0);
                            return (s || o.length) && this._notifySplice(r, n.path, t, s, o), o
                        },
                        shift: function shift(e) {
                            var t = {},
                                n = this._get(e, this, t),
                                r = Boolean(n.length),
                                i = Array.prototype.slice.call(arguments, 1),
                                o = n.shift.apply(n, i);
                            return r && this._notifySplice(n, t.path, 0, 0, [o]), o
                        },
                        unshift: function unshift(e) {
                            var t = {},
                                n = this._get(e, this, t),
                                r = Array.prototype.slice.call(arguments, 1),
                                i = n.unshift.apply(n, r);
                            return r.length && this._notifySplice(n, t.path, 0, r.length, []), i
                        },
                        prepareModelNotifyPath: function prepareModelNotifyPath(e) {
                            this.mixin(e, {
                                fire: Polymer.Base.fire,
                                _getEvent: Polymer.Base._getEvent,
                                __eventCache: Polymer.Base.__eventCache,
                                notifyPath: Polymer.Base.notifyPath,
                                _get: Polymer.Base._get,
                                _EVENT_CHANGED: Polymer.Base._EVENT_CHANGED,
                                _notifyPath: Polymer.Base._notifyPath,
                                _notifyPathUp: Polymer.Base._notifyPathUp,
                                _pathEffector: Polymer.Base._pathEffector,
                                _annotationPathEffect: Polymer.Base._annotationPathEffect,
                                _complexObserverPathEffect: Polymer.Base._complexObserverPathEffect,
                                _annotatedComputationPathEffect: Polymer.Base._annotatedComputationPathEffect,
                                _computePathEffect: Polymer.Base._computePathEffect,
                                _notifyBoundPaths: Polymer.Base._notifyBoundPaths,
                                _getPathParts: Polymer.Base._getPathParts
                            })
                        }
                    })
                }(), Polymer.Base._addFeature({
                    resolveUrl: function resolveUrl(e) {
                        var t = Polymer.DomModule.import(this.is),
                            n = "";
                        if (t) {
                            var r = t.getAttribute("assetpath") || "";
                            n = Polymer.ResolveUrl.resolveUrl(r, t.ownerDocument.baseURI)
                        }
                        return Polymer.ResolveUrl.resolveUrl(e, n)
                    }
                }), Polymer.CssParse = function() {
                    return {
                        parse: function parse(e) {
                            return e = this._clean(e), this._parseCss(this._lex(e), e)
                        },
                        _clean: function _clean(e) {
                            return e.replace(this._rx.comments, "").replace(this._rx.port, "")
                        },
                        _lex: function _lex(e) {
                            for (var t = {
                                    start: 0,
                                    end: e.length
                                }, n = t, r = 0, i = e.length; r < i; r++) switch (e[r]) {
                                case this.OPEN_BRACE:
                                    n.rules || (n.rules = []);
                                    var o = n,
                                        s = o.rules[o.rules.length - 1];
                                    n = {
                                        start: r + 1,
                                        parent: o,
                                        previous: s
                                    }, o.rules.push(n);
                                    break;
                                case this.CLOSE_BRACE:
                                    n.end = r + 1, n = n.parent || t
                            }
                            return t
                        },
                        _parseCss: function _parseCss(e, t) {
                            var n = t.substring(e.start, e.end - 1);
                            if (e.parsedCssText = e.cssText = n.trim(), e.parent) {
                                var r = e.previous ? e.previous.end : e.parent.start;
                                n = t.substring(r, e.start - 1), n = this._expandUnicodeEscapes(n), n = n.replace(this._rx.multipleSpaces, " "), n = n.substring(n.lastIndexOf(";") + 1);
                                var i = e.parsedSelector = e.selector = n.trim();
                                e.atRule = 0 === i.indexOf(this.AT_START), e.atRule ? 0 === i.indexOf(this.MEDIA_START) ? e.type = this.types.MEDIA_RULE : i.match(this._rx.keyframesRule) && (e.type = this.types.KEYFRAMES_RULE, e.keyframesName = e.selector.split(this._rx.multipleSpaces).pop()) : 0 === i.indexOf(this.VAR_START) ? e.type = this.types.MIXIN_RULE : e.type = this.types.STYLE_RULE
                            }
                            var o = e.rules;
                            if (o)
                                for (var s, a = 0, l = o.length; a < l && (s = o[a]); a++) this._parseCss(s, t);
                            return e
                        },
                        _expandUnicodeEscapes: function _expandUnicodeEscapes(e) {
                            return e.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
                                for (var e = arguments[1], t = 6 - e.length; t--;) e = "0" + e;
                                return "\\" + e
                            })
                        },
                        stringify: function stringify(e, t, n) {
                            n = n || "";
                            var r = "";
                            if (e.cssText || e.rules) {
                                var i = e.rules;
                                if (i && !this._hasMixinRules(i))
                                    for (var o, s = 0, a = i.length; s < a && (o = i[s]); s++) r = this.stringify(o, t, r);
                                else r = t ? e.cssText : this.removeCustomProps(e.cssText), r = r.trim(), r && (r = "  " + r + "\n")
                            }
                            return r && (e.selector && (n += e.selector + " " + this.OPEN_BRACE + "\n"), n += r, e.selector && (n += this.CLOSE_BRACE + "\n\n")), n
                        },
                        _hasMixinRules: function _hasMixinRules(e) {
                            return 0 === e[0].selector.indexOf(this.VAR_START)
                        },
                        removeCustomProps: function removeCustomProps(e) {
                            return e = this.removeCustomPropAssignment(e), this.removeCustomPropApply(e)
                        },
                        removeCustomPropAssignment: function removeCustomPropAssignment(e) {
                            return e.replace(this._rx.customProp, "").replace(this._rx.mixinProp, "")
                        },
                        removeCustomPropApply: function removeCustomPropApply(e) {
                            return e.replace(this._rx.mixinApply, "").replace(this._rx.varApply, "")
                        },
                        types: {
                            STYLE_RULE: 1,
                            KEYFRAMES_RULE: 7,
                            MEDIA_RULE: 4,
                            MIXIN_RULE: 1e3
                        },
                        OPEN_BRACE: "{",
                        CLOSE_BRACE: "}",
                        _rx: {
                            comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
                            port: /@import[^;]*;/gim,
                            customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
                            mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
                            mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
                            varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
                            keyframesRule: /^@[^\s]*keyframes/,
                            multipleSpaces: /\s+/g
                        },
                        VAR_START: "--",
                        MEDIA_START: "@media",
                        AT_START: "@"
                    }
                }(), Polymer.StyleUtil = function() {
                    var e = Polymer.Settings;
                    return {
                        NATIVE_VARIABLES: Polymer.Settings.useNativeCSSProperties,
                        MODULE_STYLES_SELECTOR: "style, link[rel=import][type~=css], template",
                        INCLUDE_ATTR: "include",
                        toCssText: function toCssText(e, t) {
                            return "string" == typeof e && (e = this.parser.parse(e)), t && this.forEachRule(e, t), this.parser.stringify(e, this.NATIVE_VARIABLES)
                        },
                        forRulesInStyles: function forRulesInStyles(e, t, n) {
                            if (e)
                                for (var r, i = 0, o = e.length; i < o && (r = e[i]); i++) this.forEachRuleInStyle(r, t, n)
                        },
                        forActiveRulesInStyles: function forActiveRulesInStyles(e, t, n) {
                            if (e)
                                for (var r, i = 0, o = e.length; i < o && (r = e[i]); i++) this.forEachRuleInStyle(r, t, n, !0)
                        },
                        rulesForStyle: function rulesForStyle(e) {
                            return !e.__cssRules && e.textContent && (e.__cssRules = this.parser.parse(e.textContent)), e.__cssRules
                        },
                        isKeyframesSelector: function isKeyframesSelector(e) {
                            return e.parent && e.parent.type === this.ruleTypes.KEYFRAMES_RULE
                        },
                        forEachRuleInStyle: function forEachRuleInStyle(e, t, n, r) {
                            var i, o, s = this.rulesForStyle(e);
                            t && (i = function styleCallback(n) {
                                t(n, e)
                            }), n && (o = function keyframeCallback(t) {
                                n(t, e)
                            }), this.forEachRule(s, i, o, r)
                        },
                        forEachRule: function forEachRule(e, t, n, r) {
                            if (e) {
                                var i = !1;
                                if (r && e.type === this.ruleTypes.MEDIA_RULE) {
                                    var o = e.selector.match(this.rx.MEDIA_MATCH);
                                    o && (window.matchMedia(o[1]).matches || (i = !0))
                                }
                                e.type === this.ruleTypes.STYLE_RULE ? t(e) : n && e.type === this.ruleTypes.KEYFRAMES_RULE ? n(e) : e.type === this.ruleTypes.MIXIN_RULE && (i = !0);
                                var s = e.rules;
                                if (s && !i)
                                    for (var a, l = 0, h = s.length; l < h && (a = s[l]); l++) this.forEachRule(a, t, n, r)
                            }
                        },
                        applyCss: function applyCss(e, t, n, r) {
                            var i = this.createScopeStyle(e, t);
                            return this.applyStyle(i, n, r)
                        },
                        applyStyle: function applyStyle(e, t, n) {
                            t = t || document.head;
                            var r = n && n.nextSibling || t.firstChild;
                            return this.__lastHeadApplyNode = e, t.insertBefore(e, r)
                        },
                        createScopeStyle: function createScopeStyle(e, t) {
                            var n = document.createElement("style");
                            return t && n.setAttribute("scope", t), n.textContent = e, n
                        },
                        __lastHeadApplyNode: null,
                        applyStylePlaceHolder: function applyStylePlaceHolder(e) {
                            var t = document.createComment(" Shady DOM styles for " + e + " "),
                                n = this.__lastHeadApplyNode ? this.__lastHeadApplyNode.nextSibling : null,
                                r = document.head;
                            return r.insertBefore(t, n || r.firstChild), this.__lastHeadApplyNode = t, t
                        },
                        cssFromModules: function cssFromModules(e, t) {
                            for (var n = e.trim().split(" "), r = "", i = 0; i < n.length; i++) r += this.cssFromModule(n[i], t);
                            return r
                        },
                        cssFromModule: function cssFromModule(e, t) {
                            var n = Polymer.DomModule.import(e);
                            return n && !n._cssText && (n._cssText = this.cssFromElement(n)), !n && t && console.warn("Could not find style data in module named", e), n && n._cssText || ""
                        },
                        cssFromElement: function cssFromElement(e) {
                            for (var t, n = "", r = e.content || e, i = Polymer.TreeApi.arrayCopy(r.querySelectorAll(this.MODULE_STYLES_SELECTOR)), o = 0; o < i.length; o++)
                                if (t = i[o], "template" === t.localName) t.hasAttribute("preserve-content") || (n += this.cssFromElement(t));
                                else if ("style" === t.localName) {
                                var s = t.getAttribute(this.INCLUDE_ATTR);
                                s && (n += this.cssFromModules(s, !0)), t = t.__appliedElement || t, t.parentNode.removeChild(t), n += this.resolveCss(t.textContent, e.ownerDocument)
                            } else t.import && t.import.body && (n += this.resolveCss(t.import.body.textContent, t.import));
                            return n
                        },
                        isTargetedBuild: function isTargetedBuild(t) {
                            return e.useNativeShadow ? "shadow" === t : "shady" === t
                        },
                        cssBuildTypeForModule: function cssBuildTypeForModule(e) {
                            var t = Polymer.DomModule.import(e);
                            if (t) return this.getCssBuildType(t)
                        },
                        getCssBuildType: function getCssBuildType(e) {
                            return e.getAttribute("css-build")
                        },
                        _findMatchingParen: function _findMatchingParen(e, t) {
                            for (var n = 0, r = t, i = e.length; r < i; r++) switch (e[r]) {
                                case "(":
                                    n++;
                                    break;
                                case ")":
                                    if (0 === --n) return r
                            }
                            return -1
                        },
                        processVariableAndFallback: function processVariableAndFallback(e, t) {
                            var n = e.indexOf("var(");
                            if (n === -1) return t(e, "", "", "");
                            var r = this._findMatchingParen(e, n + 3),
                                i = e.substring(n + 4, r),
                                o = e.substring(0, n),
                                s = this.processVariableAndFallback(e.substring(r + 1), t),
                                a = i.indexOf(",");
                            if (a === -1) return t(o, i.trim(), "", s);
                            var l = i.substring(0, a).trim(),
                                h = i.substring(a + 1).trim();
                            return t(o, l, h, s)
                        },
                        rx: {
                            VAR_ASSIGN: /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi,
                            MIXIN_MATCH: /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
                            VAR_CONSUMED: /(--[\w-]+)\s*([:,;)]|$)/gi,
                            ANIMATION_MATCH: /(animation\s*:)|(animation-name\s*:)/,
                            MEDIA_MATCH: /@media[^(]*(\([^)]*\))/,
                            IS_VAR: /^--/,
                            BRACKETED: /\{[^}]*\}/g,
                            HOST_PREFIX: "(?:^|[^.#[:])",
                            HOST_SUFFIX: "($|[.:[\\s>+~])"
                        },
                        resolveCss: Polymer.ResolveUrl.resolveCss,
                        parser: Polymer.CssParse,
                        ruleTypes: Polymer.CssParse.types
                    }
                }(), Polymer.StyleTransformer = function() {
                    var e = Polymer.StyleUtil,
                        t = Polymer.Settings,
                        n = {
                            dom: function dom(e, t, n, r) {
                                this._transformDom(e, t || "", n, r)
                            },
                            _transformDom: function _transformDom(e, t, n, r) {
                                e.setAttribute && this.element(e, t, n, r);
                                for (var i = Polymer.dom(e).childNodes, o = 0; o < i.length; o++) this._transformDom(i[o], t, n, r)
                            },
                            element: function element(e, t, n, i) {
                                if (n) i ? e.removeAttribute(r) : e.setAttribute(r, t);
                                else if (t)
                                    if (e.classList) i ? (e.classList.remove(r), e.classList.remove(t)) : (e.classList.add(r), e.classList.add(t));
                                    else if (e.getAttribute) {
                                    var o = e.getAttribute(g);
                                    i ? o && e.setAttribute(g, o.replace(r, "").replace(t, "")) : e.setAttribute(g, (o ? o + " " : "") + r + " " + t)
                                }
                            },
                            elementStyles: function elementStyles(n, r) {
                                var i, o = n._styles,
                                    s = "",
                                    a = n.__cssBuild,
                                    l = t.useNativeShadow || "shady" === a;
                                if (l) {
                                    var c = this;
                                    i = function cb(e) {
                                        e.selector = c._slottedToContent(e.selector), e.selector = e.selector.replace(h, ":host > *"), r && r(e)
                                    }
                                }
                                for (var d, u = 0, f = o.length; u < f && (d = o[u]); u++) {
                                    var _ = e.rulesForStyle(d);
                                    s += l ? e.toCssText(_, i) : this.css(_, n.is, n.extends, r, n._scopeCssViaAttr) + "\n\n"
                                }
                                return s.trim()
                            },
                            css: function css(t, n, r, i, o) {
                                var s = this._calcHostScope(n, r);
                                n = this._calcElementScope(n, o);
                                var a = this;
                                return e.toCssText(t, function(e) {
                                    e.isScoped || (a.rule(e, n, s), e.isScoped = !0), i && i(e, n, s)
                                })
                            },
                            _calcElementScope: function _calcElementScope(e, t) {
                                return e ? t ? m + e + y : p + e : ""
                            },
                            _calcHostScope: function _calcHostScope(e, t) {
                                return t ? "[is=" + e + "]" : e
                            },
                            rule: function rule(e, t, n) {
                                this._transformRule(e, this._transformComplexSelector, t, n)
                            },
                            _transformRule: function _transformRule(e, t, n, r) {
                                e.selector = e.transformedSelector = this._transformRuleCss(e, t, n, r)
                            },
                            _transformRuleCss: function _transformRuleCss(t, n, r, i) {
                                var s = t.selector.split(o);
                                if (!e.isKeyframesSelector(t))
                                    for (var a, l = 0, h = s.length; l < h && (a = s[l]); l++) s[l] = n.call(this, a, r, i);
                                return s.join(o)
                            },
                            _transformComplexSelector: function _transformComplexSelector(e, t, n) {
                                var r = !1,
                                    i = !1,
                                    a = this;
                                return e = e.trim(), e = this._slottedToContent(e), e = e.replace(h, ":host > *"), e = e.replace(P, l + " $1"), e = e.replace(s, function(e, o, s) {
                                    if (r) s = s.replace(_, " ");
                                    else {
                                        var l = a._transformCompoundSelector(s, o, t, n);
                                        r = r || l.stop, i = i || l.hostContext, o = l.combinator, s = l.value
                                    }
                                    return o + s
                                }), i && (e = e.replace(u, function(e, t, r, i) {
                                    return t + r + " " + n + i + o + " " + t + n + r + i
                                })), e
                            },
                            _transformCompoundSelector: function _transformCompoundSelector(e, t, n, r) {
                                var i = e.search(_),
                                    o = !1;
                                e.indexOf(d) >= 0 ? o = !0 : e.indexOf(l) >= 0 ? e = this._transformHostSelector(e, r) : 0 !== i && (e = n ? this._transformSimpleSelector(e, n) : e), e.indexOf(f) >= 0 && (t = "");
                                var s;
                                return i >= 0 && (e = e.replace(_, " "), s = !0), {
                                    value: e,
                                    combinator: t,
                                    stop: s,
                                    hostContext: o
                                }
                            },
                            _transformSimpleSelector: function _transformSimpleSelector(e, t) {
                                var n = e.split(v);
                                return n[0] += t, n.join(v)
                            },
                            _transformHostSelector: function _transformHostSelector(e, t) {
                                var n = e.match(c),
                                    r = n && n[2].trim() || "";
                                if (r) {
                                    if (r[0].match(a)) return e.replace(c, function(e, n, r) {
                                        return t + r
                                    });
                                    var i = r.split(a)[0];
                                    return i === t ? r : b
                                }
                                return e.replace(l, t)
                            },
                            documentRule: function documentRule(e) {
                                e.selector = e.parsedSelector, this.normalizeRootSelector(e), t.useNativeShadow || this._transformRule(e, this._transformDocumentSelector)
                            },
                            normalizeRootSelector: function normalizeRootSelector(e) {
                                e.selector = e.selector.replace(h, "html")
                            },
                            _transformDocumentSelector: function _transformDocumentSelector(e) {
                                return e.match(_) ? this._transformComplexSelector(e, i) : this._transformSimpleSelector(e.trim(), i)
                            },
                            _slottedToContent: function _slottedToContent(e) {
                                return e.replace(C, f + "> $1")
                            },
                            SCOPE_NAME: "style-scope"
                        },
                        r = n.SCOPE_NAME,
                        i = ":not([" + r + "]):not(." + r + ")",
                        o = ",",
                        s = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g,
                        a = /[[.:#*]/,
                        l = ":host",
                        h = ":root",
                        c = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/,
                        d = ":host-context",
                        u = /(.*)(?::host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/,
                        f = "::content",
                        _ = /::content|::shadow|\/deep\//,
                        p = ".",
                        m = "[" + r + "~=",
                        y = "]",
                        v = ":",
                        g = "class",
                        P = new RegExp("^(" + f + ")"),
                        b = "should_not_match",
                        C = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g;
                    return n
                }(), Polymer.StyleExtends = function() {
                    var e = Polymer.StyleUtil;
                    return {
                        hasExtends: function hasExtends(e) {
                            return Boolean(e.match(this.rx.EXTEND))
                        },
                        transform: function transform(t) {
                            var n = e.rulesForStyle(t),
                                r = this;
                            return e.forEachRule(n, function(e) {
                                if (r._mapRuleOntoParent(e), e.parent)
                                    for (var t; t = r.rx.EXTEND.exec(e.cssText);) {
                                        var n = t[1],
                                            i = r._findExtendor(n, e);
                                        i && r._extendRule(e, i)
                                    }
                                e.cssText = e.cssText.replace(r.rx.EXTEND, "")
                            }), e.toCssText(n, function(e) {
                                e.selector.match(r.rx.STRIP) && (e.cssText = "")
                            }, !0)
                        },
                        _mapRuleOntoParent: function _mapRuleOntoParent(e) {
                            if (e.parent) {
                                for (var t, n = e.parent.map || (e.parent.map = {}), r = e.selector.split(","), i = 0; i < r.length; i++) t = r[i], n[t.trim()] = e;
                                return n
                            }
                        },
                        _findExtendor: function _findExtendor(e, t) {
                            return t.parent && t.parent.map && t.parent.map[e] || this._findExtendor(e, t.parent)
                        },
                        _extendRule: function _extendRule(e, t) {
                            e.parent !== t.parent && this._cloneAndAddRuleToParent(t, e.parent), e.extends = e.extends || [], e.extends.push(t), t.selector = t.selector.replace(this.rx.STRIP, ""), t.selector = (t.selector && t.selector + ",\n") + e.selector, t.extends && t.extends.forEach(function(t) {
                                this._extendRule(e, t)
                            }, this)
                        },
                        _cloneAndAddRuleToParent: function _cloneAndAddRuleToParent(e, t) {
                            e = Object.create(e), e.parent = t, e.extends && (e.extends = e.extends.slice()), t.rules.push(e)
                        },
                        rx: {
                            EXTEND: /@extends\(([^)]*)\)\s*?;/gim,
                            STRIP: /%[^,]*$/
                        }
                    }
                }(), Polymer.ApplyShim = function() {
                    function mapSet(e, t) {
                        e = e.trim(), a[e] = {
                            properties: t,
                            dependants: {}
                        }
                    }

                    function mapGet(e) {
                        return e = e.trim(), a[e]
                    }

                    function replaceInitialOrInherit(e, t) {
                        var n = o.exec(t);
                        return n && (t = n[1] ? l._getInitialValueForProperty(e) : "apply-shim-inherit"), t
                    }

                    function cssTextToMap(e) {
                        for (var t, n, r, i, o = e.split(";"), s = {}, a = 0; a < o.length; a++) r = o[a], r && (i = r.split(":"), i.length > 1 && (t = i[0].trim(), n = replaceInitialOrInherit(t, i.slice(1).join(":")), s[t] = n));
                        return s
                    }

                    function invalidateMixinEntry(e) {
                        var t = l.__currentElementProto,
                            n = t && t.is;
                        for (var r in e.dependants) r !== n && (e.dependants[r].__applyShimInvalid = !0)
                    }

                    function produceCssProperties(t, n, r, i) {
                        if (r && e.processVariableAndFallback(r, function(e, t) {
                                t && mapGet(t) && (i = "@apply " + t + ";")
                            }), !i) return t;
                        var o = consumeCssProperties(i),
                            a = t.slice(0, t.indexOf("--")),
                            l = cssTextToMap(o),
                            h = l,
                            c = mapGet(n),
                            d = c && c.properties;
                        d ? (h = Object.create(d), h = Polymer.Base.mixin(h, l)) : mapSet(n, h);
                        var u, f, _ = [],
                            p = !1;
                        for (u in h) f = l[u], void 0 === f && (f = "initial"), !d || u in d || (p = !0), _.push(n + s + u + ": " + f);
                        return p && invalidateMixinEntry(c), c && (c.properties = h), r && (a = t + ";" + a), a + _.join("; ") + ";"
                    }

                    function fixVars(e, t, n) {
                        return "var(" + t + ",var(" + n + "))"
                    }

                    function atApplyToCssProperties(e, t) {
                        e = e.replace(i, "");
                        var n = [],
                            r = mapGet(e);
                        if (r || (mapSet(e, {}), r = mapGet(e)), r) {
                            var o = l.__currentElementProto;
                            o && (r.dependants[o.is] = o);
                            var a, h, c;
                            for (a in r.properties) c = t && t[a], h = [a, ": var(", e, s, a], c && h.push(",", c), h.push(")"), n.push(h.join(""))
                        }
                        return n.join("; ")
                    }

                    function consumeCssProperties(e) {
                        for (var n; n = t.exec(e);) {
                            var r = n[0],
                                i = n[1],
                                o = n.index,
                                s = o + r.indexOf("@apply"),
                                a = o + r.length,
                                l = e.slice(0, s),
                                h = e.slice(a),
                                c = cssTextToMap(l),
                                d = atApplyToCssProperties(i, c);
                            e = [l, d, h].join(""), t.lastIndex = o + d.length
                        }
                        return e
                    }
                    var e = Polymer.StyleUtil,
                        t = e.rx.MIXIN_MATCH,
                        n = e.rx.VAR_ASSIGN,
                        r = /var\(\s*(--[^,]*),\s*(--[^)]*)\)/g,
                        i = /;\s*/m,
                        o = /^\s*(initial)|(inherit)\s*$/,
                        s = "_-_",
                        a = {},
                        l = {
                            _measureElement: null,
                            _map: a,
                            _separator: s,
                            transform: function transform(t, n) {
                                this.__currentElementProto = n, e.forRulesInStyles(t, this._boundFindDefinitions), e.forRulesInStyles(t, this._boundFindApplications), n && (n.__applyShimInvalid = !1), this.__currentElementProto = null
                            },
                            _findDefinitions: function _findDefinitions(e) {
                                var t = e.parsedCssText;
                                t = t.replace(r, fixVars), t = t.replace(n, produceCssProperties), e.cssText = t, ":root" === e.selector && (e.selector = ":host > *")
                            },
                            _findApplications: function _findApplications(e) {
                                e.cssText = consumeCssProperties(e.cssText)
                            },
                            transformRule: function transformRule(e) {
                                this._findDefinitions(e), this._findApplications(e)
                            },
                            _getInitialValueForProperty: function _getInitialValueForProperty(e) {
                                return this._measureElement || (this._measureElement = document.createElement("meta"), this._measureElement.style.all = "initial", document.head.appendChild(this._measureElement)), window.getComputedStyle(this._measureElement).getPropertyValue(e)
                            }
                        };
                    return l._boundTransformRule = l.transformRule.bind(l), l._boundFindDefinitions = l._findDefinitions.bind(l), l._boundFindApplications = l._findApplications.bind(l), l
                }(),
                function() {
                    var e = Polymer.Base._prepElement,
                        t = Polymer.Settings.useNativeShadow,
                        n = Polymer.StyleUtil,
                        r = Polymer.StyleTransformer,
                        i = Polymer.StyleExtends,
                        o = Polymer.ApplyShim,
                        s = Polymer.Settings;
                    Polymer.Base._addFeature({
                        _prepElement: function _prepElement(t) {
                            this._encapsulateStyle && "shady" !== this.__cssBuild && r.element(t, this.is, this._scopeCssViaAttr), e.call(this, t)
                        },
                        _prepStyles: function _prepStyles() {
                            void 0 === this._encapsulateStyle && (this._encapsulateStyle = !t), t || (this._scopeStyle = n.applyStylePlaceHolder(this.is)), this.__cssBuild = n.cssBuildTypeForModule(this.is)
                        },
                        _prepShimStyles: function _prepShimStyles() {
                            if (this._template) {
                                var e = n.isTargetedBuild(this.__cssBuild);
                                if (s.useNativeCSSProperties && "shadow" === this.__cssBuild && e) return;
                                this._styles = this._styles || this._collectStyles(), s.useNativeCSSProperties && !this.__cssBuild && o.transform(this._styles, this);
                                var i = s.useNativeCSSProperties && e ? this._styles.length && this._styles[0].textContent.trim() : r.elementStyles(this);
                                this._prepStyleProperties(), !this._needsStyleProperties() && i && n.applyCss(i, this.is, t ? this._template.content : null, this._scopeStyle)
                            } else this._styles = []
                        },
                        _collectStyles: function _collectStyles() {
                            var e = [],
                                t = "",
                                r = this.styleModules;
                            if (r)
                                for (var o, s = 0, a = r.length; s < a && (o = r[s]); s++) t += n.cssFromModule(o);
                            t += n.cssFromModule(this.is);
                            var l = this._template && this._template.parentNode;
                            if (!this._template || l && l.id.toLowerCase() === this.is || (t += n.cssFromElement(this._template)), t) {
                                var h = document.createElement("style");
                                h.textContent = t, i.hasExtends(h.textContent) && (t = i.transform(h)), e.push(h)
                            }
                            return e
                        },
                        _elementAdd: function _elementAdd(e) {
                            this._encapsulateStyle && (e.__styleScoped ? e.__styleScoped = !1 : r.dom(e, this.is, this._scopeCssViaAttr))
                        },
                        _elementRemove: function _elementRemove(e) {
                            this._encapsulateStyle && r.dom(e, this.is, this._scopeCssViaAttr, !0)
                        },
                        scopeSubtree: function scopeSubtree(e, n) {
                            if (!t) {
                                var r = this,
                                    i = function scopify(e) {
                                        if (e.nodeType === Node.ELEMENT_NODE) {
                                            var t = e.getAttribute("class");
                                            e.setAttribute("class", r._scopeElementClass(e, t));
                                            for (var n, i = e.querySelectorAll("*"), o = 0; o < i.length && (n = i[o]); o++) t = n.getAttribute("class"), n.setAttribute("class", r._scopeElementClass(n, t))
                                        }
                                    };
                                if (i(e), n) {
                                    var o = new MutationObserver(function(e) {
                                        for (var t, n = 0; n < e.length && (t = e[n]); n++)
                                            if (t.addedNodes)
                                                for (var r = 0; r < t.addedNodes.length; r++) i(t.addedNodes[r])
                                    });
                                    return o.observe(e, {
                                        childList: !0,
                                        subtree: !0
                                    }), o
                                }
                            }
                        }
                    })
                }(), Polymer.StyleProperties = function() {
                    function addToBitMask(e, t) {
                        var n = parseInt(e / 32),
                            r = 1 << e % 32;
                        t[n] = (t[n] || 0) | r
                    }
                    var e = Polymer.DomApi.matchesSelector,
                        t = Polymer.StyleUtil,
                        n = Polymer.StyleTransformer,
                        r = navigator.userAgent.match("Trident"),
                        i = Polymer.Settings;
                    return {
                        decorateStyles: function decorateStyles(e, r) {
                            var i = this,
                                o = {},
                                s = [],
                                a = 0,
                                l = n._calcHostScope(r.is, r.extends);
                            t.forRulesInStyles(e, function(e, n) {
                                i.decorateRule(e), e.index = a++, i.whenHostOrRootRule(r, e, n, function(n) {
                                    if (e.parent.type === t.ruleTypes.MEDIA_RULE && (r.__notStyleScopeCacheable = !0), n.isHost) {
                                        var i = n.selector.split(" ").some(function(e) {
                                            return 0 === e.indexOf(l) && e.length !== l.length
                                        });
                                        r.__notStyleScopeCacheable = r.__notStyleScopeCacheable || i
                                    }
                                }), i.collectPropertiesInCssText(e.propertyInfo.cssText, o)
                            }, function onKeyframesRule(e) {
                                s.push(e)
                            }), e._keyframes = s;
                            var h = [];
                            for (var c in o) h.push(c);
                            return h
                        },
                        decorateRule: function decorateRule(e) {
                            if (e.propertyInfo) return e.propertyInfo;
                            var t = {},
                                n = {},
                                r = this.collectProperties(e, n);
                            return r && (t.properties = n, e.rules = null), t.cssText = this.collectCssText(e), e.propertyInfo = t, t
                        },
                        collectProperties: function collectProperties(e, t) {
                            var n = e.propertyInfo;
                            if (!n) {
                                for (var r, i, o, s = this.rx.VAR_ASSIGN, a = e.parsedCssText; r = s.exec(a);) i = (r[2] || r[3]).trim(), "inherit" !== i && (t[r[1].trim()] = i), o = !0;
                                return o
                            }
                            if (n.properties) return Polymer.Base.mixin(t, n.properties), !0
                        },
                        collectCssText: function collectCssText(e) {
                            return this.collectConsumingCssText(e.parsedCssText)
                        },
                        collectConsumingCssText: function collectConsumingCssText(e) {
                            return e.replace(this.rx.BRACKETED, "").replace(this.rx.VAR_ASSIGN, "")
                        },
                        collectPropertiesInCssText: function collectPropertiesInCssText(e, t) {
                            for (var n; n = this.rx.VAR_CONSUMED.exec(e);) {
                                var r = n[1];
                                ":" !== n[2] && (t[r] = !0)
                            }
                        },
                        reify: function reify(e) {
                            for (var t, n = Object.getOwnPropertyNames(e), r = 0; r < n.length; r++) t = n[r], e[t] = this.valueForProperty(e[t], e)
                        },
                        valueForProperty: function valueForProperty(e, n) {
                            if (e)
                                if (e.indexOf(";") >= 0) e = this.valueForProperties(e, n);
                                else {
                                    var r = this,
                                        i = function fn(e, t, i, o) {
                                            var s = r.valueForProperty(n[t], n);
                                            return s && "initial" !== s ? "apply-shim-inherit" === s && (s = "inherit") : s = r.valueForProperty(n[i] || i, n) || i, e + (s || "") + o
                                        };
                                    e = t.processVariableAndFallback(e, i)
                                }
                            return e && e.trim() || ""
                        },
                        valueForProperties: function valueForProperties(e, t) {
                            for (var n, r, i = e.split(";"), o = 0; o < i.length; o++)
                                if (n = i[o]) {
                                    if (this.rx.MIXIN_MATCH.lastIndex = 0, r = this.rx.MIXIN_MATCH.exec(n)) n = this.valueForProperty(t[r[1]], t);
                                    else {
                                        var s = n.indexOf(":");
                                        if (s !== -1) {
                                            var a = n.substring(s);
                                            a = a.trim(), a = this.valueForProperty(a, t) || a, n = n.substring(0, s) + a
                                        }
                                    }
                                    i[o] = n && n.lastIndexOf(";") === n.length - 1 ? n.slice(0, -1) : n || ""
                                }
                            return i.join(";")
                        },
                        applyProperties: function applyProperties(e, t) {
                            var n = "";
                            e.propertyInfo || this.decorateRule(e), e.propertyInfo.cssText && (n = this.valueForProperties(e.propertyInfo.cssText, t)), e.cssText = n
                        },
                        applyKeyframeTransforms: function applyKeyframeTransforms(e, t) {
                            var n = e.cssText,
                                r = e.cssText;
                            if (null == e.hasAnimations && (e.hasAnimations = this.rx.ANIMATION_MATCH.test(n)), e.hasAnimations) {
                                var i;
                                if (null == e.keyframeNamesToTransform) {
                                    e.keyframeNamesToTransform = [];
                                    for (var o in t) i = t[o], r = i(n), n !== r && (n = r, e.keyframeNamesToTransform.push(o))
                                } else {
                                    for (var s = 0; s < e.keyframeNamesToTransform.length; ++s) i = t[e.keyframeNamesToTransform[s]], n = i(n);
                                    r = n
                                }
                            }
                            e.cssText = r
                        },
                        propertyDataFromStyles: function propertyDataFromStyles(n, r) {
                            var i = {},
                                o = this,
                                s = [];
                            return t.forActiveRulesInStyles(n, function(t) {
                                t.propertyInfo || o.decorateRule(t);
                                var n = t.transformedSelector || t.parsedSelector;
                                r && t.propertyInfo.properties && n && e.call(r, n) && (o.collectProperties(t, i), addToBitMask(t.index, s))
                            }), {
                                properties: i,
                                key: s
                            }
                        },
                        _rootSelector: /:root|:host\s*>\s*\*/,
                        _checkRoot: function _checkRoot(e, t) {
                            return Boolean(t.match(this._rootSelector)) || "html" === e && t.indexOf("html") > -1
                        },
                        whenHostOrRootRule: function whenHostOrRootRule(e, t, r, o) {
                            if (t.propertyInfo || self.decorateRule(t), t.propertyInfo.properties) {
                                var s = e.is ? n._calcHostScope(e.is, e.extends) : "html",
                                    a = t.parsedSelector,
                                    l = this._checkRoot(s, a),
                                    h = !l && 0 === a.indexOf(":host"),
                                    c = e.__cssBuild || r.__cssBuild;
                                if ("shady" === c && (l = a === s + " > *." + s || a.indexOf("html") > -1, h = !l && 0 === a.indexOf(s)), l || h) {
                                    var d = s;
                                    h && (i.useNativeShadow && !t.transformedSelector && (t.transformedSelector = n._transformRuleCss(t, n._transformComplexSelector, e.is, s)), d = t.transformedSelector || t.parsedSelector), l && "html" === s && (d = t.transformedSelector || t.parsedSelector), o({
                                        selector: d,
                                        isHost: h,
                                        isRoot: l
                                    })
                                }
                            }
                        },
                        hostAndRootPropertiesForScope: function hostAndRootPropertiesForScope(n) {
                            var r = {},
                                i = {},
                                o = this;
                            return t.forActiveRulesInStyles(n._styles, function(t, s) {
                                o.whenHostOrRootRule(n, t, s, function(s) {
                                    var a = n._element || n;
                                    e.call(a, s.selector) && (s.isHost ? o.collectProperties(t, r) : o.collectProperties(t, i))
                                })
                            }), {
                                rootProps: i,
                                hostProps: r
                            }
                        },
                        transformStyles: function transformStyles(e, t, r) {
                            var o = this,
                                s = n._calcHostScope(e.is, e.extends),
                                a = e.extends ? "\\" + s.slice(0, -1) + "\\]" : s,
                                l = new RegExp(this.rx.HOST_PREFIX + a + this.rx.HOST_SUFFIX),
                                h = this._elementKeyframeTransforms(e, r);
                            return n.elementStyles(e, function(n) {
                                o.applyProperties(n, t), i.useNativeShadow || Polymer.StyleUtil.isKeyframesSelector(n) || !n.cssText || (o.applyKeyframeTransforms(n, h), o._scopeSelector(n, l, s, e._scopeCssViaAttr, r))
                            })
                        },
                        _elementKeyframeTransforms: function _elementKeyframeTransforms(e, t) {
                            var n = e._styles._keyframes,
                                r = {};
                            if (!i.useNativeShadow && n)
                                for (var o = 0, s = n[o]; o < n.length; s = n[++o]) this._scopeKeyframes(s, t), r[s.keyframesName] = this._keyframesRuleTransformer(s);
                            return r
                        },
                        _keyframesRuleTransformer: function _keyframesRuleTransformer(e) {
                            return function(t) {
                                return t.replace(e.keyframesNameRx, e.transformedKeyframesName)
                            }
                        },
                        _scopeKeyframes: function _scopeKeyframes(e, t) {
                            e.keyframesNameRx = new RegExp(e.keyframesName, "g"), e.transformedKeyframesName = e.keyframesName + "-" + t, e.transformedSelector = e.transformedSelector || e.selector, e.selector = e.transformedSelector.replace(e.keyframesName, e.transformedKeyframesName)
                        },
                        _scopeSelector: function _scopeSelector(e, t, r, i, o) {
                            e.transformedSelector = e.transformedSelector || e.selector;
                            for (var s, a = e.transformedSelector, l = i ? "[" + n.SCOPE_NAME + "~=" + o + "]" : "." + o, h = a.split(","), c = 0, d = h.length; c < d && (s = h[c]); c++) h[c] = s.match(t) ? s.replace(r, l) : l + " " + s;
                            e.selector = h.join(",")
                        },
                        applyElementScopeSelector: function applyElementScopeSelector(e, t, r, i) {
                            var o = i ? e.getAttribute(n.SCOPE_NAME) : e.getAttribute("class") || "",
                                s = r ? o.replace(r, t) : (o ? o + " " : "") + this.XSCOPE_NAME + " " + t;
                            o !== s && (i ? e.setAttribute(n.SCOPE_NAME, s) : e.setAttribute("class", s))
                        },
                        applyElementStyle: function applyElementStyle(e, n, o, s) {
                            var a = s ? s.textContent || "" : this.transformStyles(e, n, o),
                                l = e._customStyle;
                            return l && !i.useNativeShadow && l !== s && (l._useCount--, l._useCount <= 0 && l.parentNode && l.parentNode.removeChild(l)), i.useNativeShadow ? e._customStyle ? (e._customStyle.textContent = a, s = e._customStyle) : a && (s = t.applyCss(a, o, e.root, e._scopeStyle)) : s ? s.parentNode || (r && a.indexOf("@media") > -1 && (s.textContent = a), t.applyStyle(s, null, e._scopeStyle)) : a && (s = t.applyCss(a, o, null, e._scopeStyle)), s && (s._useCount = s._useCount || 0, e._customStyle != s && s._useCount++, e._customStyle = s), s
                        },
                        mixinCustomStyle: function mixinCustomStyle(e, t) {
                            var n;
                            for (var r in t) n = t[r], (n || 0 === n) && (e[r] = n)
                        },
                        updateNativeStyleProperties: function updateNativeStyleProperties(e, t) {
                            var n = e.__customStyleProperties;
                            if (n)
                                for (var r = 0; r < n.length; r++) e.style.removeProperty(n[r]);
                            var i = [];
                            for (var o in t) null !== t[o] && (e.style.setProperty(o, t[o]), i.push(o));
                            e.__customStyleProperties = i
                        },
                        rx: t.rx,
                        XSCOPE_NAME: "x-scope"
                    }
                }(),
                function() {
                    Polymer.StyleCache = function() {
                        this.cache = {}
                    }, Polymer.StyleCache.prototype = {
                        MAX: 100,
                        store: function store(e, t, n, r) {
                            t.keyValues = n, t.styles = r;
                            var i = this.cache[e] = this.cache[e] || [];
                            i.push(t), i.length > this.MAX && i.shift()
                        },
                        retrieve: function retrieve(e, t, n) {
                            var r = this.cache[e];
                            if (r)
                                for (var i, o = r.length - 1; o >= 0; o--)
                                    if (i = r[o], n === i.styles && this._objectsEqual(t, i.keyValues)) return i
                        },
                        clear: function clear() {
                            this.cache = {}
                        },
                        _objectsEqual: function _objectsEqual(e, t) {
                            var n, r;
                            for (var i in e)
                                if (n = e[i], r = t[i], !("object" === ("undefined" == typeof n ? "undefined" : _typeof(n)) && n ? this._objectsStrictlyEqual(n, r) : n === r)) return !1;
                            return !Array.isArray(e) || e.length === t.length
                        },
                        _objectsStrictlyEqual: function _objectsStrictlyEqual(e, t) {
                            return this._objectsEqual(e, t) && this._objectsEqual(t, e)
                        }
                    }
                }(), Polymer.StyleDefaults = function() {
                    var e = Polymer.StyleProperties,
                        t = Polymer.StyleCache,
                        n = Polymer.Settings.useNativeCSSProperties,
                        r = {
                            _styles: [],
                            _properties: null,
                            customStyle: {},
                            _styleCache: new t,
                            _element: Polymer.DomApi.wrap(document.documentElement),
                            addStyle: function addStyle(e) {
                                this._styles.push(e), this._properties = null
                            },
                            get _styleProperties() {
                                return this._properties || (e.decorateStyles(this._styles, this), this._styles._scopeStyleProperties = null, this._properties = e.hostAndRootPropertiesForScope(this).rootProps, e.mixinCustomStyle(this._properties, this.customStyle), e.reify(this._properties)), this._properties
                            },
                            hasStyleProperties: function hasStyleProperties() {
                                return Boolean(this._properties)
                            },
                            _needsStyleProperties: function _needsStyleProperties() {},
                            _computeStyleProperties: function _computeStyleProperties() {
                                return this._styleProperties
                            },
                            updateStyles: function updateStyles(t) {
                                this._properties = null, t && Polymer.Base.mixin(this.customStyle, t), this._styleCache.clear();
                                for (var r, i = 0; i < this._styles.length; i++) r = this._styles[i], r = r.__importElement || r, r._apply();
                                n && e.updateNativeStyleProperties(document.documentElement, this.customStyle)
                            }
                        };
                    return r
                }(),
                function() {
                    var e = Polymer.Base.serializeValueToAttribute,
                        t = Polymer.StyleProperties,
                        n = Polymer.StyleTransformer,
                        r = Polymer.StyleDefaults,
                        i = Polymer.Settings.useNativeShadow,
                        o = Polymer.Settings.useNativeCSSProperties;
                    Polymer.Base._addFeature({
                        _prepStyleProperties: function _prepStyleProperties() {
                            o || (this._ownStylePropertyNames = this._styles && this._styles.length ? t.decorateStyles(this._styles, this) : null)
                        },
                        customStyle: null,
                        getComputedStyleValue: function getComputedStyleValue(e) {
                            return o || this._styleProperties || this._computeStyleProperties(), !o && this._styleProperties && this._styleProperties[e] || getComputedStyle(this).getPropertyValue(e)
                        },
                        _setupStyleProperties: function _setupStyleProperties() {
                            this.customStyle = {}, this._styleCache = null, this._styleProperties = null, this._scopeSelector = null, this._ownStyleProperties = null, this._customStyle = null
                        },
                        _needsStyleProperties: function _needsStyleProperties() {
                            return Boolean(!o && this._ownStylePropertyNames && this._ownStylePropertyNames.length)
                        },
                        _validateApplyShim: function _validateApplyShim() {
                            if (this.__applyShimInvalid) {
                                Polymer.ApplyShim.transform(this._styles, this.__proto__);
                                var e = n.elementStyles(this);
                                if (i) {
                                    var t = this._template.content.querySelector("style");
                                    t && (t.textContent = e)
                                } else {
                                    var r = this._scopeStyle && this._scopeStyle.nextSibling;
                                    r && (r.textContent = e)
                                }
                            }
                        },
                        _beforeAttached: function _beforeAttached() {
                            this._scopeSelector && !this.__stylePropertiesInvalid || !this._needsStyleProperties() || (this.__stylePropertiesInvalid = !1, this._updateStyleProperties())
                        },
                        _findStyleHost: function _findStyleHost() {
                            for (var e, t = this; e = Polymer.dom(t).getOwnerRoot();) {
                                if (Polymer.isInstance(e.host)) return e.host;
                                t = e.host
                            }
                            return r
                        },
                        _updateStyleProperties: function _updateStyleProperties() {
                            var e, n = this._findStyleHost();
                            n._styleProperties || n._computeStyleProperties(), n._styleCache || (n._styleCache = new Polymer.StyleCache);
                            var r = t.propertyDataFromStyles(n._styles, this),
                                o = !this.__notStyleScopeCacheable;
                            o && (r.key.customStyle = this.customStyle, e = n._styleCache.retrieve(this.is, r.key, this._styles));
                            var a = Boolean(e);
                            a ? this._styleProperties = e._styleProperties : this._computeStyleProperties(r.properties), this._computeOwnStyleProperties(), a || (e = s.retrieve(this.is, this._ownStyleProperties, this._styles));
                            var l = Boolean(e) && !a,
                                h = this._applyStyleProperties(e);
                            a || (h = h && i ? h.cloneNode(!0) : h, e = {
                                style: h,
                                _scopeSelector: this._scopeSelector,
                                _styleProperties: this._styleProperties
                            }, o && (r.key.customStyle = {}, this.mixin(r.key.customStyle, this.customStyle), n._styleCache.store(this.is, e, r.key, this._styles)), l || s.store(this.is, Object.create(e), this._ownStyleProperties, this._styles))
                        },
                        _computeStyleProperties: function _computeStyleProperties(e) {
                            var n = this._findStyleHost();
                            n._styleProperties || n._computeStyleProperties();
                            var r = Object.create(n._styleProperties),
                                i = t.hostAndRootPropertiesForScope(this);
                            this.mixin(r, i.hostProps), e = e || t.propertyDataFromStyles(n._styles, this).properties, this.mixin(r, e), this.mixin(r, i.rootProps), t.mixinCustomStyle(r, this.customStyle), t.reify(r), this._styleProperties = r
                        },
                        _computeOwnStyleProperties: function _computeOwnStyleProperties() {
                            for (var e, t = {}, n = 0; n < this._ownStylePropertyNames.length; n++) e = this._ownStylePropertyNames[n], t[e] = this._styleProperties[e];
                            this._ownStyleProperties = t
                        },
                        _scopeCount: 0,
                        _applyStyleProperties: function _applyStyleProperties(e) {
                            var n = this._scopeSelector;
                            this._scopeSelector = e ? e._scopeSelector : this.is + "-" + this.__proto__._scopeCount++;
                            var r = t.applyElementStyle(this, this._styleProperties, this._scopeSelector, e && e.style);
                            return i || t.applyElementScopeSelector(this, this._scopeSelector, n, this._scopeCssViaAttr), r
                        },
                        serializeValueToAttribute: function serializeValueToAttribute(t, n, r) {
                            if (r = r || this, "class" === n && !i) {
                                var o = r === this ? this.domHost || this.dataHost : this;
                                o && (t = o._scopeElementClass(r, t))
                            }
                            r = this.shadyRoot && this.shadyRoot._hasDistributed ? Polymer.dom(r) : r, e.call(this, t, n, r)
                        },
                        _scopeElementClass: function _scopeElementClass(e, t) {
                            return i || this._scopeCssViaAttr || (t = (t ? t + " " : "") + a + " " + this.is + (e._scopeSelector ? " " + l + " " + e._scopeSelector : "")), t
                        },
                        updateStyles: function updateStyles(e) {
                            e && this.mixin(this.customStyle, e), o ? t.updateNativeStyleProperties(this, this.customStyle) : (this.isAttached ? this._needsStyleProperties() ? this._updateStyleProperties() : this._styleProperties = null : this.__stylePropertiesInvalid = !0, this._styleCache && this._styleCache.clear(), this._updateRootStyles())
                        },
                        _updateRootStyles: function _updateRootStyles(e) {
                            e = e || this.root;
                            for (var t, n = Polymer.dom(e)._query(function(e) {
                                    return e.shadyRoot || e.shadowRoot
                                }), r = 0, i = n.length; r < i && (t = n[r]); r++) t.updateStyles && t.updateStyles()
                        }
                    }), Polymer.updateStyles = function(e) {
                        r.updateStyles(e), Polymer.Base._updateRootStyles(document)
                    };
                    var s = new Polymer.StyleCache;
                    Polymer.customStyleCache = s;
                    var a = n.SCOPE_NAME,
                        l = t.XSCOPE_NAME
                }(), Polymer.Base._addFeature({
                    _registerFeatures: function _registerFeatures() {
                        this._prepIs(), this._prepConstructor(), this._prepStyles()
                    },
                    _finishRegisterFeatures: function _finishRegisterFeatures() {
                        this._prepTemplate(), this._prepShimStyles(), this._prepAnnotations(), this._prepEffects(), this._prepBehaviors(), this._prepPropertyInfo(), this._prepBindings(), this._prepShady()
                    },
                    _prepBehavior: function _prepBehavior(e) {
                        this._addPropertyEffects(e.properties), this._addComplexObserverEffects(e.observers), this._addHostAttributes(e.hostAttributes)
                    },
                    _initFeatures: function _initFeatures() {
                        this._setupGestures(), this._setupConfigure(), this._setupStyleProperties(), this._setupDebouncers(), this._setupShady(), this._registerHost(), this._template && (this._validateApplyShim(), this._poolContent(), this._beginHosting(), this._stampTemplate(), this._endHosting(), this._marshalAnnotationReferences()), this._marshalInstanceEffects(), this._marshalBehaviors(), this._marshalHostAttributes(), this._marshalAttributes(), this._tryReady()
                    },
                    _marshalBehavior: function _marshalBehavior(e) {
                        e.listeners && this._listenListeners(e.listeners)
                    }
                }),
                function() {
                    var e, t = Polymer.StyleProperties,
                        n = Polymer.StyleUtil,
                        r = Polymer.CssParse,
                        i = Polymer.StyleDefaults,
                        o = Polymer.StyleTransformer,
                        s = Polymer.ApplyShim,
                        a = Polymer.Debounce,
                        l = Polymer.Settings;
                    Polymer({
                        is: "custom-style",
                        extends: "style",
                        _template: null,
                        properties: {
                            include: String
                        },
                        ready: function ready() {
                            this.__appliedElement = this.__appliedElement || this, this.__cssBuild = n.getCssBuildType(this), this.__appliedElement !== this && (this.__appliedElement.__cssBuild = this.__cssBuild), this._tryApply()
                        },
                        attached: function attached() {
                            this._tryApply()
                        },
                        _tryApply: function _tryApply() {
                            if (!this._appliesToDocument && this.parentNode && "dom-module" !== this.parentNode.localName) {
                                this._appliesToDocument = !0;
                                var e = this.__appliedElement;
                                if (l.useNativeCSSProperties || (this.__needsUpdateStyles = i.hasStyleProperties(), i.addStyle(e)), e.textContent || this.include) this._apply(!0);
                                else {
                                    var t = this,
                                        n = new MutationObserver(function() {
                                            n.disconnect(), t._apply(!0)
                                        });
                                    n.observe(e, {
                                        childList: !0
                                    })
                                }
                            }
                        },
                        _updateStyles: function _updateStyles() {
                            Polymer.updateStyles()
                        },
                        _apply: function _apply(e) {
                            var t = this.__appliedElement;
                            if (this.include && (t.textContent = n.cssFromModules(this.include, !0) + t.textContent), t.textContent) {
                                var r = this.__cssBuild,
                                    i = n.isTargetedBuild(r);
                                if (!l.useNativeCSSProperties || !i) {
                                    var a = n.rulesForStyle(t);
                                    if (i || (n.forEachRule(a, function(e) {
                                            o.documentRule(e)
                                        }), l.useNativeCSSProperties && !r && s.transform([t])), l.useNativeCSSProperties) t.textContent = n.toCssText(a);
                                    else {
                                        var h = this,
                                            c = function fn() {
                                                h._flushCustomProperties()
                                            };
                                        e ? Polymer.RenderStatus.whenReady(c) : c()
                                    }
                                }
                            }
                        },
                        _flushCustomProperties: function _flushCustomProperties() {
                            this.__needsUpdateStyles ? (this.__needsUpdateStyles = !1, e = a(e, this._updateStyles)) : this._applyCustomProperties()
                        },
                        _applyCustomProperties: function _applyCustomProperties() {
                            var e = this.__appliedElement;
                            this._computeStyleProperties();
                            var i = this._styleProperties,
                                o = n.rulesForStyle(e);
                            o && (e.textContent = n.toCssText(o, function(e) {
                                var n = e.cssText = e.parsedCssText;
                                e.propertyInfo && e.propertyInfo.cssText && (n = r.removeCustomPropAssignment(n), e.cssText = t.valueForProperties(n, i))
                            }))
                        }
                    })
                }(), Polymer.Templatizer = {
                    properties: {
                        __hideTemplateChildren__: {
                            observer: "_showHideChildren"
                        }
                    },
                    _instanceProps: Polymer.nob,
                    _parentPropPrefix: "_parent_",
                    templatize: function templatize(e) {
                        if (this._templatized = e, e._content || (e._content = e.content), e._content._ctor) return this.ctor = e._content._ctor, void this._prepParentProperties(this.ctor.prototype, e);
                        var t = Object.create(Polymer.Base);
                        this._customPrepAnnotations(t, e), this._prepParentProperties(t, e), t._prepEffects(), this._customPrepEffects(t), t._prepBehaviors(), t._prepPropertyInfo(), t._prepBindings(), t._notifyPathUp = this._notifyPathUpImpl, t._scopeElementClass = this._scopeElementClassImpl, t.listen = this._listenImpl, t._showHideChildren = this._showHideChildrenImpl, t.__setPropertyOrig = this.__setProperty, t.__setProperty = this.__setPropertyImpl;
                        var n = this._constructorImpl,
                            r = function TemplateInstance(e, t) {
                                n.call(this, e, t)
                            };
                        r.prototype = t, t.constructor = r, e._content._ctor = r, this.ctor = r
                    },
                    _getRootDataHost: function _getRootDataHost() {
                        return this.dataHost && this.dataHost._rootDataHost || this.dataHost
                    },
                    _showHideChildrenImpl: function _showHideChildrenImpl(e) {
                        for (var t = this._children, n = 0; n < t.length; n++) {
                            var r = t[n];
                            Boolean(e) != Boolean(r.__hideTemplateChildren__) && (r.nodeType === Node.TEXT_NODE ? e ? (r.__polymerTextContent__ = r.textContent, r.textContent = "") : r.textContent = r.__polymerTextContent__ : r.style && (e ? (r.__polymerDisplay__ = r.style.display, r.style.display = "none") : r.style.display = r.__polymerDisplay__)), r.__hideTemplateChildren__ = e
                        }
                    },
                    __setPropertyImpl: function __setPropertyImpl(e, t, n, r) {
                        r && r.__hideTemplateChildren__ && "textContent" == e && (e = "__polymerTextContent__"), this.__setPropertyOrig(e, t, n, r)
                    },
                    _debounceTemplate: function _debounceTemplate(e) {
                        Polymer.dom.addDebouncer(this.debounce("_debounceTemplate", e))
                    },
                    _flushTemplates: function _flushTemplates() {
                        Polymer.dom.flush()
                    },
                    _customPrepEffects: function _customPrepEffects(e) {
                        var t = e._parentProps;
                        for (var n in t) e._addPropertyEffect(n, "function", this._createHostPropEffector(n));
                        for (n in this._instanceProps) e._addPropertyEffect(n, "function", this._createInstancePropEffector(n))
                    },
                    _customPrepAnnotations: function _customPrepAnnotations(e, t) {
                        e._template = t;
                        var n = t._content;
                        if (!n._notes) {
                            var r = e._rootDataHost;
                            r && (Polymer.Annotations.prepElement = function() {
                                r._prepElement()
                            }), n._notes = Polymer.Annotations.parseAnnotations(t), Polymer.Annotations.prepElement = null, this._processAnnotations(n._notes)
                        }
                        e._notes = n._notes, e._parentProps = n._parentProps
                    },
                    _prepParentProperties: function _prepParentProperties(e, t) {
                        var n = this._parentProps = e._parentProps;
                        if (this._forwardParentProp && n) {
                            var r, i = e._parentPropProto;
                            if (!i) {
                                for (r in this._instanceProps) delete n[r];
                                i = e._parentPropProto = Object.create(null), t != this && (Polymer.Bind.prepareModel(i), Polymer.Base.prepareModelNotifyPath(i));
                                for (r in n) {
                                    var o = this._parentPropPrefix + r,
                                        s = [{
                                            kind: "function",
                                            effect: this._createForwardPropEffector(r),
                                            fn: Polymer.Bind._functionEffect
                                        }, {
                                            kind: "notify",
                                            fn: Polymer.Bind._notifyEffect,
                                            effect: {
                                                event: Polymer.CaseMap.camelToDashCase(o) + "-changed"
                                            }
                                        }];
                                    Polymer.Bind._createAccessors(i, o, s)
                                }
                            }
                            var a = this;
                            t != this && (Polymer.Bind.prepareInstance(t), t._forwardParentProp = function(e, t) {
                                a._forwardParentProp(e, t)
                            }), this._extendTemplate(t, i), t._pathEffector = function(e, t, n) {
                                return a._pathEffectorImpl(e, t, n)
                            }
                        }
                    },
                    _createForwardPropEffector: function _createForwardPropEffector(e) {
                        return function(t, n) {
                            this._forwardParentProp(e, n)
                        }
                    },
                    _createHostPropEffector: function _createHostPropEffector(e) {
                        var t = this._parentPropPrefix;
                        return function(n, r) {
                            this.dataHost._templatized[t + e] = r
                        }
                    },
                    _createInstancePropEffector: function _createInstancePropEffector(e) {
                        return function(t, n, r, i) {
                            i || this.dataHost._forwardInstanceProp(this, e, n)
                        }
                    },
                    _extendTemplate: function _extendTemplate(e, t) {
                        var n = Object.getOwnPropertyNames(t);
                        t._propertySetter && (e._propertySetter = t._propertySetter);
                        for (var r, i = 0; i < n.length && (r = n[i]); i++) {
                            var o = e[r],
                                s = Object.getOwnPropertyDescriptor(t, r);
                            Object.defineProperty(e, r, s), void 0 !== o && e._propertySetter(r, o)
                        }
                    },
                    _showHideChildren: function _showHideChildren(e) {},
                    _forwardInstancePath: function _forwardInstancePath(e, t, n) {},
                    _forwardInstanceProp: function _forwardInstanceProp(e, t, n) {},
                    _notifyPathUpImpl: function _notifyPathUpImpl(e, t) {
                        var n = this.dataHost,
                            r = Polymer.Path.root(e);
                        n._forwardInstancePath.call(n, this, e, t), r in n._parentProps && n._templatized._notifyPath(n._parentPropPrefix + e, t)
                    },
                    _pathEffectorImpl: function _pathEffectorImpl(e, t, n) {
                        if (this._forwardParentPath && 0 === e.indexOf(this._parentPropPrefix)) {
                            var r = e.substring(this._parentPropPrefix.length),
                                i = Polymer.Path.root(r);
                            i in this._parentProps && this._forwardParentPath(r, t)
                        }
                        Polymer.Base._pathEffector.call(this._templatized, e, t, n)
                    },
                    _constructorImpl: function _constructorImpl(e, t) {
                        this._rootDataHost = t._getRootDataHost(), this._setupConfigure(e), this._registerHost(t), this._beginHosting(), this.root = this.instanceTemplate(this._template), this.root.__noContent = !this._notes._hasContent, this.root.__styleScoped = !0, this._endHosting(), this._marshalAnnotatedNodes(), this._marshalInstanceEffects(), this._marshalAnnotatedListeners();
                        for (var n = [], r = this.root.firstChild; r; r = r.nextSibling) n.push(r), r._templateInstance = this;
                        this._children = n, t.__hideTemplateChildren__ && this._showHideChildren(!0), this._tryReady()
                    },
                    _listenImpl: function _listenImpl(e, t, n) {
                        var r = this,
                            i = this._rootDataHost,
                            o = i._createEventHandler(e, t, n),
                            s = function decorated(e) {
                                e.model = r, o(e)
                            };
                        i._listen(e, t, s)
                    },
                    _scopeElementClassImpl: function _scopeElementClassImpl(e, t) {
                        var n = this._rootDataHost;
                        return n ? n._scopeElementClass(e, t) : t
                    },
                    stamp: function stamp(e) {
                        if (e = e || {}, this._parentProps) {
                            var t = this._templatized;
                            for (var n in this._parentProps) void 0 === e[n] && (e[n] = t[this._parentPropPrefix + n])
                        }
                        return new this.ctor(e, this)
                    },
                    modelForElement: function modelForElement(e) {
                        for (var t; e;)
                            if (t = e._templateInstance) {
                                if (t.dataHost == this) return t;
                                e = t.dataHost
                            } else e = e.parentNode
                    }
                }, Polymer({
                    is: "dom-template",
                    extends: "template",
                    _template: null,
                    behaviors: [Polymer.Templatizer],
                    ready: function ready() {
                        this.templatize(this)
                    }
                }), Polymer._collections = new WeakMap, Polymer.Collection = function(e) {
                    Polymer._collections.set(e, this), this.userArray = e, this.store = e.slice(), this.initMap()
                }, Polymer.Collection.prototype = {
                    constructor: Polymer.Collection,
                    initMap: function initMap() {
                        for (var e = this.omap = new WeakMap, t = this.pmap = {}, n = this.store, r = 0; r < n.length; r++) {
                            var i = n[r];
                            i && "object" == ("undefined" == typeof i ? "undefined" : _typeof(i)) ? e.set(i, r) : t[i] = r
                        }
                    },
                    add: function add(e) {
                        var t = this.store.push(e) - 1;
                        return e && "object" == ("undefined" == typeof e ? "undefined" : _typeof(e)) ? this.omap.set(e, t) : this.pmap[e] = t, "#" + t
                    },
                    removeKey: function removeKey(e) {
                        (e = this._parseKey(e)) && (this._removeFromMap(this.store[e]), delete this.store[e])
                    },
                    _removeFromMap: function _removeFromMap(e) {
                        e && "object" == ("undefined" == typeof e ? "undefined" : _typeof(e)) ? this.omap.delete(e) : delete this.pmap[e]
                    },
                    remove: function remove(e) {
                        var t = this.getKey(e);
                        return this.removeKey(t), t
                    },
                    getKey: function getKey(e) {
                        var t;
                        if (t = e && "object" == ("undefined" == typeof e ? "undefined" : _typeof(e)) ? this.omap.get(e) : this.pmap[e], void 0 != t) return "#" + t
                    },
                    getKeys: function getKeys() {
                        return Object.keys(this.store).map(function(e) {
                            return "#" + e
                        })
                    },
                    _parseKey: function _parseKey(e) {
                        if (e && "#" == e[0]) return e.slice(1)
                    },
                    setItem: function setItem(e, t) {
                        if (e = this._parseKey(e)) {
                            var n = this.store[e];
                            n && this._removeFromMap(n), t && "object" == ("undefined" == typeof t ? "undefined" : _typeof(t)) ? this.omap.set(t, e) : this.pmap[t] = e, this.store[e] = t
                        }
                    },
                    getItem: function getItem(e) {
                        if (e = this._parseKey(e)) return this.store[e]
                    },
                    getItems: function getItems() {
                        var e = [],
                            t = this.store;
                        for (var n in t) e.push(t[n]);
                        return e
                    },
                    _applySplices: function _applySplices(e) {
                        for (var t, n, r = {}, i = 0; i < e.length && (n = e[i]); i++) {
                            n.addedKeys = [];
                            for (var o = 0; o < n.removed.length; o++) t = this.getKey(n.removed[o]), r[t] = r[t] ? null : -1;
                            for (o = 0; o < n.addedCount; o++) {
                                var s = this.userArray[n.index + o];
                                t = this.getKey(s), t = void 0 === t ? this.add(s) : t, r[t] = r[t] ? null : 1, n.addedKeys.push(t)
                            }
                        }
                        var a = [],
                            l = [];
                        for (t in r) r[t] < 0 && (this.removeKey(t), a.push(t)), r[t] > 0 && l.push(t);
                        return [{
                            removed: a,
                            added: l
                        }]
                    }
                }, Polymer.Collection.get = function(e) {
                    return Polymer._collections.get(e) || new Polymer.Collection(e)
                }, Polymer.Collection.applySplices = function(e, t) {
                    var n = Polymer._collections.get(e);
                    return n ? n._applySplices(t) : null
                }, Polymer({
                    is: "dom-repeat",
                    extends: "template",
                    _template: null,
                    properties: {
                        items: {
                            type: Array
                        },
                        as: {
                            type: String,
                            value: "item"
                        },
                        indexAs: {
                            type: String,
                            value: "index"
                        },
                        sort: {
                            type: Function,
                            observer: "_sortChanged"
                        },
                        filter: {
                            type: Function,
                            observer: "_filterChanged"
                        },
                        observe: {
                            type: String,
                            observer: "_observeChanged"
                        },
                        delay: Number,
                        renderedItemCount: {
                            type: Number,
                            notify: !0,
                            readOnly: !0
                        },
                        initialCount: {
                            type: Number,
                            observer: "_initializeChunking"
                        },
                        targetFramerate: {
                            type: Number,
                            value: 20
                        },
                        _targetFrameTime: {
                            type: Number,
                            computed: "_computeFrameTime(targetFramerate)"
                        }
                    },
                    behaviors: [Polymer.Templatizer],
                    observers: ["_itemsChanged(items.*)"],
                    created: function created() {
                        this._instances = [], this._pool = [], this._limit = 1 / 0;
                        var e = this;
                        this._boundRenderChunk = function() {
                            e._renderChunk()
                        }
                    },
                    detached: function detached() {
                        this.__isDetached = !0;
                        for (var e = 0; e < this._instances.length; e++) this._detachInstance(e)
                    },
                    attached: function attached() {
                        if (this.__isDetached) {
                            this.__isDetached = !1;
                            for (var e = Polymer.dom(Polymer.dom(this).parentNode), t = 0; t < this._instances.length; t++) this._attachInstance(t, e)
                        }
                    },
                    ready: function ready() {
                        this._instanceProps = {
                            __key__: !0
                        }, this._instanceProps[this.as] = !0, this._instanceProps[this.indexAs] = !0, this.ctor || this.templatize(this)
                    },
                    _sortChanged: function _sortChanged(e) {
                        var t = this._getRootDataHost();
                        this._sortFn = e && ("function" == typeof e ? e : function() {
                            return t[e].apply(t, arguments)
                        }), this._needFullRefresh = !0, this.items && this._debounceTemplate(this._render)
                    },
                    _filterChanged: function _filterChanged(e) {
                        var t = this._getRootDataHost();
                        this._filterFn = e && ("function" == typeof e ? e : function() {
                            return t[e].apply(t, arguments)
                        }), this._needFullRefresh = !0, this.items && this._debounceTemplate(this._render)
                    },
                    _computeFrameTime: function _computeFrameTime(e) {
                        return Math.ceil(1e3 / e)
                    },
                    _initializeChunking: function _initializeChunking() {
                        this.initialCount && (this._limit = this.initialCount, this._chunkCount = this.initialCount, this._lastChunkTime = performance.now())
                    },
                    _tryRenderChunk: function _tryRenderChunk() {
                        this.items && this._limit < this.items.length && this.debounce("renderChunk", this._requestRenderChunk)
                    },
                    _requestRenderChunk: function _requestRenderChunk() {
                        requestAnimationFrame(this._boundRenderChunk)
                    },
                    _renderChunk: function _renderChunk() {
                        var e = performance.now(),
                            t = this._targetFrameTime / (e - this._lastChunkTime);
                        this._chunkCount = Math.round(this._chunkCount * t) || 1, this._limit += this._chunkCount, this._lastChunkTime = e, this._debounceTemplate(this._render)
                    },
                    _observeChanged: function _observeChanged() {
                        this._observePaths = this.observe && this.observe.replace(".*", ".").split(" ")
                    },
                    _itemsChanged: function _itemsChanged(e) {
                        if ("items" == e.path) Array.isArray(this.items) ? this.collection = Polymer.Collection.get(this.items) : this.items ? this._error(this._logf("dom-repeat", "expected array for `items`, found", this.items)) : this.collection = null, this._keySplices = [], this._indexSplices = [], this._needFullRefresh = !0, this._initializeChunking(), this._debounceTemplate(this._render);
                        else if ("items.splices" == e.path) this._keySplices = this._keySplices.concat(e.value.keySplices), this._indexSplices = this._indexSplices.concat(e.value.indexSplices), this._debounceTemplate(this._render);
                        else {
                            var t = e.path.slice(6);
                            this._forwardItemPath(t, e.value), this._checkObservedPaths(t)
                        }
                    },
                    _checkObservedPaths: function _checkObservedPaths(e) {
                        if (this._observePaths) {
                            e = e.substring(e.indexOf(".") + 1);
                            for (var t = this._observePaths, n = 0; n < t.length; n++)
                                if (0 === e.indexOf(t[n])) return this._needFullRefresh = !0, void(this.delay ? this.debounce("render", this._render, this.delay) : this._debounceTemplate(this._render))
                        }
                    },
                    render: function render() {
                        this._needFullRefresh = !0, this._debounceTemplate(this._render), this._flushTemplates()
                    },
                    _render: function _render() {
                        this._needFullRefresh ? (this._applyFullRefresh(), this._needFullRefresh = !1) : this._keySplices.length && (this._sortFn ? this._applySplicesUserSort(this._keySplices) : this._filterFn ? this._applyFullRefresh() : this._applySplicesArrayOrder(this._indexSplices)), this._keySplices = [], this._indexSplices = [];
                        for (var e = this._keyToInstIdx = {}, t = this._instances.length - 1; t >= 0; t--) {
                            var n = this._instances[t];
                            n.isPlaceholder && t < this._limit ? n = this._insertInstance(t, n.__key__) : !n.isPlaceholder && t >= this._limit && (n = this._downgradeInstance(t, n.__key__)), e[n.__key__] = t, n.isPlaceholder || n.__setProperty(this.indexAs, t, !0)
                        }
                        this._pool.length = 0, this._setRenderedItemCount(this._instances.length), this.fire("dom-change"), this._tryRenderChunk()
                    },
                    _applyFullRefresh: function _applyFullRefresh() {
                        var e, t = this.collection;
                        if (this._sortFn) e = t ? t.getKeys() : [];
                        else {
                            e = [];
                            var n = this.items;
                            if (n)
                                for (var r = 0; r < n.length; r++) e.push(t.getKey(n[r]))
                        }
                        var i = this;
                        for (this._filterFn && (e = e.filter(function(e) {
                                return i._filterFn(t.getItem(e))
                            })), this._sortFn && e.sort(function(e, n) {
                                return i._sortFn(t.getItem(e), t.getItem(n))
                            }), r = 0; r < e.length; r++) {
                            var o = e[r],
                                s = this._instances[r];
                            s ? (s.__key__ = o, !s.isPlaceholder && r < this._limit && s.__setProperty(this.as, t.getItem(o), !0)) : r < this._limit ? this._insertInstance(r, o) : this._insertPlaceholder(r, o)
                        }
                        for (var a = this._instances.length - 1; a >= r; a--) this._detachAndRemoveInstance(a)
                    },
                    _numericSort: function _numericSort(e, t) {
                        return e - t
                    },
                    _applySplicesUserSort: function _applySplicesUserSort(e) {
                        for (var t, n, r = this.collection, i = {}, o = 0; o < e.length && (n = e[o]); o++) {
                            for (var s = 0; s < n.removed.length; s++) t = n.removed[s], i[t] = i[t] ? null : -1;
                            for (s = 0; s < n.added.length; s++) t = n.added[s], i[t] = i[t] ? null : 1
                        }
                        var a = [],
                            l = [];
                        for (t in i) i[t] === -1 && a.push(this._keyToInstIdx[t]), 1 === i[t] && l.push(t);
                        if (a.length)
                            for (a.sort(this._numericSort), o = a.length - 1; o >= 0; o--) {
                                var h = a[o];
                                void 0 !== h && this._detachAndRemoveInstance(h)
                            }
                        var c = this;
                        if (l.length) {
                            this._filterFn && (l = l.filter(function(e) {
                                return c._filterFn(r.getItem(e))
                            })), l.sort(function(e, t) {
                                return c._sortFn(r.getItem(e), r.getItem(t))
                            });
                            var d = 0;
                            for (o = 0; o < l.length; o++) d = this._insertRowUserSort(d, l[o])
                        }
                    },
                    _insertRowUserSort: function _insertRowUserSort(e, t) {
                        for (var n = this.collection, r = n.getItem(t), i = this._instances.length - 1, o = -1; e <= i;) {
                            var s = e + i >> 1,
                                a = this._instances[s].__key__,
                                l = this._sortFn(n.getItem(a), r);
                            if (l < 0) e = s + 1;
                            else {
                                if (!(l > 0)) {
                                    o = s;
                                    break
                                }
                                i = s - 1
                            }
                        }
                        return o < 0 && (o = i + 1), this._insertPlaceholder(o, t), o
                    },
                    _applySplicesArrayOrder: function _applySplicesArrayOrder(e) {
                        for (var t, n = 0; n < e.length && (t = e[n]); n++) {
                            for (var r = 0; r < t.removed.length; r++) this._detachAndRemoveInstance(t.index);
                            for (r = 0; r < t.addedKeys.length; r++) this._insertPlaceholder(t.index + r, t.addedKeys[r])
                        }
                    },
                    _detachInstance: function _detachInstance(e) {
                        var t = this._instances[e];
                        if (!t.isPlaceholder) {
                            for (var n = 0; n < t._children.length; n++) {
                                var r = t._children[n];
                                Polymer.dom(t.root).appendChild(r)
                            }
                            return t
                        }
                    },
                    _attachInstance: function _attachInstance(e, t) {
                        var n = this._instances[e];
                        n.isPlaceholder || t.insertBefore(n.root, this)
                    },
                    _detachAndRemoveInstance: function _detachAndRemoveInstance(e) {
                        var t = this._detachInstance(e);
                        t && this._pool.push(t), this._instances.splice(e, 1)
                    },
                    _insertPlaceholder: function _insertPlaceholder(e, t) {
                        this._instances.splice(e, 0, {
                            isPlaceholder: !0,
                            __key__: t
                        })
                    },
                    _stampInstance: function _stampInstance(e, t) {
                        var n = {
                            __key__: t
                        };
                        return n[this.as] = this.collection.getItem(t), n[this.indexAs] = e, this.stamp(n)
                    },
                    _insertInstance: function _insertInstance(e, t) {
                        var n = this._pool.pop();
                        n ? (n.__setProperty(this.as, this.collection.getItem(t), !0), n.__setProperty("__key__", t, !0)) : n = this._stampInstance(e, t);
                        var r = this._instances[e + 1],
                            i = r && !r.isPlaceholder ? r._children[0] : this,
                            o = Polymer.dom(this).parentNode;
                        return Polymer.dom(o).insertBefore(n.root, i), this._instances[e] = n, n
                    },
                    _downgradeInstance: function _downgradeInstance(e, t) {
                        var n = this._detachInstance(e);
                        return n && this._pool.push(n), n = {
                            isPlaceholder: !0,
                            __key__: t
                        }, this._instances[e] = n, n
                    },
                    _showHideChildren: function _showHideChildren(e) {
                        for (var t = 0; t < this._instances.length; t++) this._instances[t].isPlaceholder || this._instances[t]._showHideChildren(e)
                    },
                    _forwardInstanceProp: function _forwardInstanceProp(e, t, n) {
                        if (t == this.as) {
                            var r;
                            r = this._sortFn || this._filterFn ? this.items.indexOf(this.collection.getItem(e.__key__)) : e[this.indexAs], this.set("items." + r, n)
                        }
                    },
                    _forwardInstancePath: function _forwardInstancePath(e, t, n) {
                        0 === t.indexOf(this.as + ".") && this._notifyPath("items." + e.__key__ + "." + t.slice(this.as.length + 1), n)
                    },
                    _forwardParentProp: function _forwardParentProp(e, t) {
                        for (var n, r = this._instances, i = 0; i < r.length && (n = r[i]); i++) n.isPlaceholder || n.__setProperty(e, t, !0)
                    },
                    _forwardParentPath: function _forwardParentPath(e, t) {
                        for (var n, r = this._instances, i = 0; i < r.length && (n = r[i]); i++) n.isPlaceholder || n._notifyPath(e, t, !0)
                    },
                    _forwardItemPath: function _forwardItemPath(e, t) {
                        if (this._keyToInstIdx) {
                            var n = e.indexOf("."),
                                r = e.substring(0, n < 0 ? e.length : n),
                                i = this._keyToInstIdx[r],
                                o = this._instances[i];
                            o && !o.isPlaceholder && (n >= 0 ? (e = this.as + "." + e.substring(n + 1), o._notifyPath(e, t, !0)) : o.__setProperty(this.as, t, !0))
                        }
                    },
                    itemForElement: function itemForElement(e) {
                        var t = this.modelForElement(e);
                        return t && t[this.as]
                    },
                    keyForElement: function keyForElement(e) {
                        var t = this.modelForElement(e);
                        return t && t.__key__
                    },
                    indexForElement: function indexForElement(e) {
                        var t = this.modelForElement(e);
                        return t && t[this.indexAs]
                    }
                }), Polymer({
                    is: "array-selector",
                    _template: null,
                    properties: {
                        items: {
                            type: Array,
                            observer: "clearSelection"
                        },
                        multi: {
                            type: Boolean,
                            value: !1,
                            observer: "clearSelection"
                        },
                        selected: {
                            type: Object,
                            notify: !0
                        },
                        selectedItem: {
                            type: Object,
                            notify: !0
                        },
                        toggle: {
                            type: Boolean,
                            value: !1
                        }
                    },
                    clearSelection: function clearSelection() {
                        if (Array.isArray(this.selected))
                            for (var e = 0; e < this.selected.length; e++) this.unlinkPaths("selected." + e);
                        else this.unlinkPaths("selected"), this.unlinkPaths("selectedItem");
                        this.multi ? this.selected && !this.selected.length || (this.selected = [], this._selectedColl = Polymer.Collection.get(this.selected)) : (this.selected = null, this._selectedColl = null), this.selectedItem = null
                    },
                    isSelected: function isSelected(e) {
                        return this.multi ? void 0 !== this._selectedColl.getKey(e) : this.selected == e
                    },
                    deselect: function deselect(e) {
                        if (this.multi) {
                            if (this.isSelected(e)) {
                                var t = this._selectedColl.getKey(e);
                                this.arrayDelete("selected", e), this.unlinkPaths("selected." + t)
                            }
                        } else this.selected = null, this.selectedItem = null, this.unlinkPaths("selected"), this.unlinkPaths("selectedItem")
                    },
                    select: function select(e) {
                        var t = Polymer.Collection.get(this.items),
                            n = t.getKey(e);
                        if (this.multi)
                            if (this.isSelected(e)) this.toggle && this.deselect(e);
                            else {
                                this.push("selected", e);
                                var r = this._selectedColl.getKey(e);
                                this.linkPaths("selected." + r, "items." + n)
                            } else this.toggle && e == this.selected ? this.deselect() : (this.selected = e, this.selectedItem = e, this.linkPaths("selected", "items." + n), this.linkPaths("selectedItem", "items." + n))
                    }
                }), Polymer({
                    is: "dom-if",
                    extends: "template",
                    _template: null,
                    properties: {
                        if: {
                            type: Boolean,
                            value: !1,
                            observer: "_queueRender"
                        },
                        restamp: {
                            type: Boolean,
                            value: !1,
                            observer: "_queueRender"
                        }
                    },
                    behaviors: [Polymer.Templatizer],
                    _queueRender: function _queueRender() {
                        this._debounceTemplate(this._render)
                    },
                    detached: function detached() {
                        this.parentNode && (this.parentNode.nodeType != Node.DOCUMENT_FRAGMENT_NODE || Polymer.Settings.hasShadow && this.parentNode instanceof ShadowRoot) || this._teardownInstance()
                    },
                    attached: function attached() {
                        this.if && this.ctor && this.async(this._ensureInstance)
                    },
                    render: function render() {
                        this._flushTemplates()
                    },
                    _render: function _render() {
                        this.if ? (this.ctor || this.templatize(this), this._ensureInstance(), this._showHideChildren()) : this.restamp && this._teardownInstance(), !this.restamp && this._instance && this._showHideChildren(), this.if != this._lastIf && (this.fire("dom-change"), this._lastIf = this.if)
                    },
                    _ensureInstance: function _ensureInstance() {
                        var e = Polymer.dom(this).parentNode;
                        if (e) {
                            var t = Polymer.dom(e);
                            if (this._instance) {
                                var n = this._instance._children;
                                if (n && n.length) {
                                    var r = Polymer.dom(this).previousSibling;
                                    if (r !== n[n.length - 1])
                                        for (var i, o = 0; o < n.length && (i = n[o]); o++) t.insertBefore(i, this)
                                }
                            } else {
                                this._instance = this.stamp();
                                var s = this._instance.root;
                                t.insertBefore(s, this)
                            }
                        }
                    },
                    _teardownInstance: function _teardownInstance() {
                        if (this._instance) {
                            var e = this._instance._children;
                            if (e && e.length)
                                for (var t, n = Polymer.dom(Polymer.dom(e[0]).parentNode), r = 0; r < e.length && (t = e[r]); r++) n.removeChild(t);
                            this._instance = null
                        }
                    },
                    _showHideChildren: function _showHideChildren() {
                        var e = this.__hideTemplateChildren__ || !this.if;
                        this._instance && this._instance._showHideChildren(e)
                    },
                    _forwardParentProp: function _forwardParentProp(e, t) {
                        this._instance && this._instance.__setProperty(e, t, !0)
                    },
                    _forwardParentPath: function _forwardParentPath(e, t) {
                        this._instance && this._instance._notifyPath(e, t, !0)
                    }
                }), Polymer({
                    is: "dom-bind",
                    extends: "template",
                    _template: null,
                    created: function created() {
                        var e = this;
                        Polymer.RenderStatus.whenReady(function() {
                            "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", function() {
                                e._markImportsReady()
                            }) : e._markImportsReady()
                        })
                    },
                    _ensureReady: function _ensureReady() {
                        this._readied || this._readySelf()
                    },
                    _markImportsReady: function _markImportsReady() {
                        this._importsReady = !0, this._ensureReady()
                    },
                    _registerFeatures: function _registerFeatures() {
                        this._prepConstructor()
                    },
                    _insertChildren: function _insertChildren() {
                        var e = Polymer.dom(Polymer.dom(this).parentNode);
                        e.insertBefore(this.root, this)
                    },
                    _removeChildren: function _removeChildren() {
                        if (this._children)
                            for (var e = 0; e < this._children.length; e++) this.root.appendChild(this._children[e])
                    },
                    _initFeatures: function _initFeatures() {},
                    _scopeElementClass: function _scopeElementClass(e, t) {
                        return this.dataHost ? this.dataHost._scopeElementClass(e, t) : t
                    },
                    _configureInstanceProperties: function _configureInstanceProperties() {},
                    _prepConfigure: function _prepConfigure() {
                        var e = {};
                        for (var t in this._propertyEffects) e[t] = this[t];
                        var n = this._setupConfigure;
                        this._setupConfigure = function() {
                            n.call(this, e)
                        }
                    },
                    attached: function attached() {
                        this._importsReady && this.render()
                    },
                    detached: function detached() {
                        this._removeChildren()
                    },
                    render: function render() {
                        this._ensureReady(), this._children || (this._template = this, this._prepAnnotations(), this._prepEffects(), this._prepBehaviors(), this._prepConfigure(), this._prepBindings(), this._prepPropertyInfo(), Polymer.Base._initFeatures.call(this), this._children = Polymer.TreeApi.arrayCopyChildNodes(this.root)), this._insertChildren(), this.fire("dom-change")
                    }
                });
            var t = "undefined" != typeof window ? window.Playbasis : "undefined" != typeof e ? e.Playbasis : null,
                n = function() {
                    function PbSpinwheel() {
                        _classCallCheck(this, PbSpinwheel)
                    }
                    return _createClass(PbSpinwheel, [{
                        key: "beforeRegister",
                        value: function beforeRegister() {
                            var e = this.constructor.name.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
                            this.is = e, this.properties = {
                                kErrorCode: {
                                    type: Object,
                                    readOnly: !0,
                                    value: function value() {
                                        return {
                                            PLAYBASIS_NOT_BUILD: 1,
                                            NO_APPLICABLE_RULE: 2,
                                            PLAYER_ID_NOT_SET: 3
                                        }
                                    }
                                },
                                kSuccessEvent: {
                                    type: String,
                                    readOnly: !0,
                                    value: function value() {
                                        return "pb-spinwheel-success-event"
                                    }
                                },
                                kErrorEvent: {
                                    type: String,
                                    readOnly: !0,
                                    value: function value() {
                                        return "pb-spinwheel-error-event"
                                    }
                                },
                                isLoaded: {
                                    type: Boolean,
                                    value: function value() {
                                        return !1
                                    }
                                },
                                showDebugLog: {
                                    type: Boolean,
                                    value: function value() {
                                        return !1
                                    }
                                },
                                playerId: {
                                    type: String,
                                    value: function value() {
                                        return null
                                    }
                                },
                                envPointRewardLevels: {
                                    type: Object,
                                    value: function value() {
                                        return {
                                            level2: 10,
                                            level3: 30,
                                            level4: 60
                                        }
                                    }
                                },
                                envTargetAction: {
                                    type: String,
                                    value: function value() {
                                        return "click"
                                    }
                                },
                                envTargetTag: {
                                    type: String,
                                    value: function value() {
                                        return "spin-wheel"
                                    }
                                },
                                envCustomParamUrlValues: {
                                    type: Array,
                                    value: function value() {
                                        return ["spin-wheel1", "spin-wheel2", "spin-wheel3"]
                                    }
                                }
                            }, this.attached = function() {
                                if (this._innerWheelHtmlElement = document.getElementById("inner-wheel"), null != t.env.global.apiKey && null != t.env.global.apiSecret) this.loadSpinWheelRules();
                                else {
                                    var e = new Error("Playbasis environment is not built yet");
                                    e.code = this.kErrorCode.PLAYBASIS_NOT_BUILD, this.fireErrorEvent(e)
                                }
                            }, this.ready = function() {
                                this._degree = 1800, this._kOdds = [0, 1, 3, 5, 7, 9, 11, 13, 15,17], this._rewards = [], this._gotRewardItem = null, this._targetSelectionIndex, this._spinButtonDisabled = !0, this._kParamName = "url", this._innerWheelHtmlElement
                            }
                        }
                    }, {
                        key: "dlog",
                        value: function dlog(e, t) {
                            this.showDebugLog && (null != t ? console.log(e, t) : console.log(e))
                        }
                    }, {
                        key: "fireSuccessEvent",
                        value: function fireSuccessEvent(e) {
                            this.dlog("firing success event: " + this.kSuccessEvent, e);

                            var t = new CustomEvent(this.kSuccessEvent, {
                                detail: e
                            });
                            document.dispatchEvent(t)
                        }
                    }, {
                        key: "fireErrorEvent",
                        value: function fireErrorEvent(e) {
                            this.dlog("firing error event: " + this.kErrorEvent, e);
                            $('#pb-spinwheel-button').text('none')
                            var t = new CustomEvent(this.kErrorEvent, {
                                detail: e
                            });
                            document.dispatchEvent(t)
                        }
                    }, {
                        key: "loadSpinWheelRules",
                        value: function loadSpinWheelRules() {
                            var e = this;
                            t.engineApi.listRules({
                                action: this.envTargetAction
                            }).then(function(t) {
                                e.dlog("result: ", t);
                                var n = e.findRulesWithTargetTagAndHaveCustomUrlValuesThatPassedUrlValuesCriteria(t.response, e.envCustomParamUrlValues);
                                if (e._rule = e.getRandomRuleToPlay(n), e.dlog("got rule: ", e._rule), null == e._rule) {
                                    e.dlog("there's no rule to play with");
                                    var r = new Error("There is no applicable rule for spinwheel.");
                                    r.code = e.kErrorCode.NO_APPLICABLE_RULE, e.fireErrorEvent(r)
                                } else e.dlog("got rule to play with"), e.findAllRewardsFromRuleThenSave(e._rule), e.shuffleRewards(), e.dlog("shuffle"), e.dlog(e._rewards), e.generateAndAddRewardHTMLElement_to_spinWheelSection(), e._spinButtonDisabled = !1, e.isLoaded = !0
                            }, function(t) {
                                e.dlog("error fetching all rules. " + t.code + ", " + t.message), e.fireErrorEvent(t)
                            })
                        }
                    }, {
                        key: "beginSpinWheelFlow",
                        value: function beginSpinWheelFlow() {
                            var e = this;
                            console.log(this._spinButtonDisabled)
                            this.dlog("_spinButtonDisabled: " + this._spinButtonDisabled), this._spinButtonDisabled || (this.executeEngineRuleToGetRewardId().then(function(t) {
                                e._gotRewardItem = t.response.events[0], e.markTargetSectionIndex(), e.spinWheel(e.getRotationAngleForTargetSectionIndex(e._targetSectionIndex))
                            }, function(t) {
                                e.dlog(t), e.fireErrorEvent(t)
                            }), this.dlog("clicked to spin"), document.getElementById("pb-spinwheel-button").disabled = !0)
                        }
                    }, {
                        key: "getRotationAngleForTargetSectionIndex",
                        value: function getRotationAngleForTargetSectionIndex(e) {
                            var t = 360 / this._rewards.length / 2,
                                n = void 0,
                                r = void 0;
                            if (this.dlog("kOdds: ", this._kOdds), 0 == e) {
                                console.log('Here')
                                var i = 0 != Math.floor(2 * Math.random());
                                i ? (n = this._kOdds[this._rewards.length] * t, r = 360.01, this.dlog("target index at 0: go right"),
                                    this.dlog("minAngle: " + n + ", maxAngle: " + r)) : (n = 0, r = t, this.dlog("target index at 0: go left"), this.dlog("minAngle: " + n + ", maxAngle: " + r))
                            } else {n = this._kOdds[e] * t, r = this._kOdds[e + 1] * t, this.dlog("minAngle: " + n + ", maxAngle: " + r);}
                            if (n == NaN || r == NaN) {
                                console.log(n)
                                console.log(r)
                            }
                            var o = Math.floor(Math.random() * (r - n)) + n;
                            return this.dlog("spin to angle: " + o), o
                        }
                    }, {
                        key: "shuffleRewards",
                        value: function shuffleRewards() {
                            this.shuffle(this._rewards)
                        }
                    }, {
                        key: "shuffle",
                        value: function shuffle(e) {
                            var t = void 0,
                                n = void 0,
                                r = void 0;
                            for (r = e.length; r; r--) t = Math.floor(Math.random() * r), n = e[r - 1], e[r - 1] = e[t], e[t] = n
                        }
                    }, {
                        key: "executeEngineRuleToGetRewardId",
                        value: function executeEngineRuleToGetRewardId() {
                            var e = this,
                                n = this.playerId;
                            if (null == n || "" == n) {
                                var r = function() {
                                    var t = new Error("Player Id is not set prior to attaching " + e.is + " in the DOM. Set it by using 'player-id=<player-id>' as attribute in <pb-spinwheel> HTML element.");
                                    return t.code = e.kErrorCode.PLAYER_ID_NOT_SET, {
                                        v: new Promise(function(e, n) {
                                            return n(t)
                                        })
                                    }
                                }();
                                if ("object" === ("undefined" == typeof r ? "undefined" : _typeof(r))) return r.v
                            }
                            var i = this;
                            return new t.Promise(function(e, r) {
                                t.engineApi.rule(i.envTargetAction, n, {
                                    url: i._rule.urlValue
                                }).then(function(t) {
                                    return i.dlog("success rule for spin wheel"), i.dlog(t), e(t)
                                }, function(e) {
                                    return i.dlog(e), r(new t.Promise.OperationalError("failed on engine rule action: " + i.envTargetAction + ", for playerId: " + n + ", urlValue: " + i._rule.urlValue))
                                })
                            })
                        }
                    }, {
                        key: "markTargetSectionIndex",
                        value: function markTargetSectionIndex() {
                            var e, t = -1,
                                n = this._gotRewardItem.reward_type;
                            this.dlog("mark"), this.dlog(this._gotRewardItem), "point" == n ? (t = 1, e = this._gotRewardItem.value, this.dlog("mark: point type -> value: " + e)) : "goods" == n ? (t = 2, e = this._gotRewardItem.reward_data.goods_id, this.dlog("mark: goods type -> goods_id: " + e)) : "badge" == n ? (t = 3, e = this._gotRewardItem.reward_data.badge_id, this.dlog("mark: badge type -> badge_id: " + e)) : (t = 4, e = this._gotRewardItem.value, this.dlog("mark: point-based type -> value: " + e)), this.dlog("final"), this.dlog(this._rewards);
                            for (var r = 0; r < this._rewards.length; r++) {
                                var i = this._rewards[r];
                                if (1 == t && "point" == i.reward_name) {
                                    if (i.quantity == e) {
                                        this._targetSectionIndex = r, this.dlog("found target section index at: " + this._targetSectionIndex);
                                        break
                                    }
                                } else if (2 == t && "goods" == i.reward_name) {
                                    if (i.data.goods_id == e) {
                                        this._targetSectionIndex = r, this.dlog("found target section index at: " + this._targetSectionIndex);
                                        break
                                    }
                                } else if (3 == t && "badge" == i.reward_name) {
                                    if (i.data.badge_id == e) {
                                        this._targetSectionIndex = r, this.dlog("found target section index at: " + this._targetSectionIndex);
                                        break
                                    }
                                } else if (4 == t && i.quantity == e) {
                                    this._targetSectionIndex = r, this.dlog("found target section index at: " + this._targetSectionIndex);
                                    break
                                }
                            }
                            //null == this._targetSectionIndex ? (this.dlog("_targetSectionIndex is null"), this.dlog("type = " + t)) : this.dlog(this._targetSectionIndex)
                            if(null == this._targetSectionIndex ){
                                this.dlog("_targetSectionIndex is null"), this.dlog("type = " + t)
                            }else{
                                this.dlog(this._targetSectionIndex)
                            }
                        }
                    }, {
                        key: "getSpinWheelSectionCSSString",
                        value: function getSpinWheelSectionCSSString(e, t, n) {
                            var r = 360 - 360 / n * e;
                            return "transform: rotate(" + r + "deg); -webkit-transform: rotate(" + r + "deg); -moz-transform: rotate(" + r + "deg); -o-transform: rotate(" + r + "deg); -ms-transform: rotate(" + r + "deg); border-color: " + t + " transparent;"
                        }
                    }, {
                        key: "generateAndAddRewardHTMLElement_to_spinWheelSection",
                        value: function generateAndAddRewardHTMLElement_to_spinWheelSection() {
                            var colors = ['#007e85','#ece862','#f8db47','#f69e37','#ee5929','#e63323','#d9201e']
                            var lastColor = '#71b76a';
                            for (var e = this._innerWheelHtmlElement, t = 0; t < this._rewards.length; t++) {
                                var n = this._rewards[t],
                                    r = document.createElement("div");
                                r.className += "sec sec-" + this._rewards.length + " " + this.is;
                                let i = t == this._rewards.length-1 ? lastColor : colors[t%colors.length];
                                console.log(t)
                                r.setAttribute("style", this.getSpinWheelSectionCSSString(t, i, this._rewards.length)), r.setAttribute("data-index", t + "");
                                var o = document.createElement("span");
                                if (o.className += "fa flag-icon " + this.is, "goods" == n.reward_name || "badge" == n.reward_name) o.setAttribute("style", "background-image: url(" + n.data.image + ");");
                                else if ("point" == n.reward_name) {
                                    var s = n.quantity,
                                        a = this.envPointRewardLevels,
                                        l = void 0;
                                    l = s >= a.level4 ? "../assets/starpoint_4.png" : s >= a.level3 ? "../assets/starpoint_3.png" : s >= a.level2 ? "../assets/starpoint_2.png" : "../assets/starpoint_1.png", o.setAttribute("style", "background-image: url(" + l + ");")
                                } else {
                                    var h = "../assets/starpoint_1.png";
                                    o.setAttribute("style", "background-image: url(" + h + ");")
                                }
                                r.appendChild(o), e.appendChild(r)
                            }
                        }
                    }, {
                        key: "findAllRewardsFromRuleThenSave",
                        value: function findAllRewardsFromRuleThenSave(e) {
                            for (var t = e.rule.jigsaw_set, n = 0; n < t.length; n++) {
                                var r = t[n];
                                if ("GROUP" == r.category) {
                                    this._rewards = r.config.group_container, this.dlog("save all rewards. Reward count " + this._rewards.length);
                                    break
                                }
                            }
                        }
                    }, {
                        key: "findRulesWithTargetTagAndHaveCustomUrlValuesThatPassedUrlValuesCriteria",
                        value: function findRulesWithTargetTagAndHaveCustomUrlValuesThatPassedUrlValuesCriteria(e, t) {
                            for (var n = [], r = 0; r < e.length; r++) {
                                var i = e[r];
                                if (i.tags.search(this.envTargetTag) != -1 && null != i.jigsaw_set)
                                    for (var o = 0; o < i.jigsaw_set.length; o++) {
                                        var s = i.jigsaw_set[o];
                                        if ("customParameter" == s.name && "CONDITION" == s.category && s.config.param_name == this._kParamName && "=" == s.config.param_operation)
                                            for (var a = 0; a < t.length; a++) s.config.param_value != t[a] || (n.push({
                                                rule: i,
                                                urlValue: s.config.param_value
                                            }), this.dlog("save rule with urlValue: " + s.config.param_value))
                                    }
                            }
                            return n
                        }
                    }, {
                        key: "getRandomRuleToPlay",
                        value: function getRandomRuleToPlay(e) {
                            if (null == e) return null;
                            if (0 == e.length) return null;
                            var t = Math.floor(Math.random() * e.length);
                            return e[t]
                        }
                    }, {
                        key: "getCurrentRotation",
                        value: function getCurrentRotation(e) {
                            var t = window.getComputedStyle(e, null),
                                n = t.getPropertyValue("-webkit-transform") || t.getPropertyValue("-moz-transform") || t.getPropertyValue("-ms-transform") || t.getPropertyValue("-o-transform") || t.getPropertyValue("transform") || "fail...",
                                r = void 0;
                            if ("none" != n) {
                                var i = n.split("(")[1],
                                    o = i.split(")")[0],
                                    s = o.split(","),
                                    a = parseFloat(s[0]),
                                    l = parseFloat(s[1]),
                                    h = Math.atan2(l, a);
                                h < 0 && (h += 2 * Math.PI), r = Math.round(h * (180 / Math.PI))
                            } else r = 0;
                            return r
                        }
                    }, {
                        key: "addEventListenerOfTransitionEndToInnerWheelElement",
                        value: function addEventListenerOfTransitionEndToInnerWheelElement() {
                            for (var e = ["transitionend", "webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd"], t = this._innerWheelHtmlElement, n = this, r = 0; r < e.length; r++) t.addEventListener(e[r], function() {
                                n.dlog("spinning wheel completes for event: " + e[r]), n.dlog("rotation stopped at " + n.getCurrentRotation(t)), n.dlog("getRewardItem: ", n._gotRewardItem), n.fireSuccessEvent(n._gotRewardItem)
                            })
                        }
                    }, {
                        key: "spinWheel",
                        value: function spinWheel(e) {
                            this.dlog("spinning wheel");
                            var t = this._degree,
                                n = t + e;
                            this.addEventListenerOfTransitionEndToInnerWheelElement(), this._innerWheelHtmlElement.style.transform = "rotate(" + n + "deg)"
                        }
                    }]), PbSpinwheel
                }();
            Polymer(n)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}]
}, {}, [1]);