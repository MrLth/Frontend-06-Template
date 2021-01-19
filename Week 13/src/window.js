/*
 * @Author: mrlthf11
 * @LastEditors: mrlthf11
 * @Date: 2021-01-19 08:46:10
 * @LastEditTime: 2021-01-20 00:11:47
 * @Description: file content
 */
let names = new Set(Object.getOwnPropertyNames(window))

let filter = el => {
    const text = el?.innerText
    if (!text) return false
    const rst = /^[_$A-Za-z][_$A-Za-z0-9]*(?:\.([_$A-Za-z0-9]*))*$/.exec(text)

    return rst
        ? rst[1]
            ? rst[1]
            : text
        : false
}

let rst = {
    ecma: ["Object", "Function", "Array", "Number", "parseFloat", "parseInt", "Infinity", "NaN", "undefined", "Boolean", "String", "Symbol", "Date", "Promise", "RegExp", "Error", "AggregateError", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "globalThis", "JSON", "Math", "ArrayBuffer", "Uint8Array", "Int8Array", "Uint16Array", "Int16Array", "Uint32Array", "Int32Array", "Float32Array", "Float64Array", "Uint8ClampedArray", "BigUint64Array", "BigInt64Array", "DataView", "Map", "BigInt", "Set", "WeakMap", "WeakSet", "Proxy", "Reflect", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape", "eval", "isFinite", "isNaN", "window", "name", "length", "find", "postMessage", "SharedArrayBuffer", "Atomics", "FinalizationRegistry", "WeakRef", "keys", "values", "$", "$$"/**/],
    node: [],
    events: [],
    webkit: [],
    whatwg: {
        html: ["XMLHttpRequest", "Worker", "Window", "WebSocket", "WebGLRenderingContext", "WebGL2RenderingContext", "ValidityState", "VTTCue", "URL", "UIEvent", "TrackEvent", "Touch", "TimeRanges", "TextTrackList", "TextTrackCueList", "TextTrackCue", "TextTrack", "TextMetrics", "SubmitEvent", "StyleSheet", "StorageEvent", "Storage", "Selection", "Screen", "ReportingObserver", "Range", "RadioNodeList", "PromiseRejectionEvent", "ProgressEvent", "PopStateEvent", "PointerEvent", "PluginArray", "Plugin", "Path2D", "PageTransitionEvent", "NodeList", "Node", "Navigator", "MutationObserver", "MouseEvent", "MimeTypeArray", "MimeType", "MessagePort", "MessageEvent", "MessageChannel", "MediaStream", "MediaError", "Location", "IntersectionObserver", "ImageData", "ImageBitmapRenderingContext", "ImageBitmap", "History", "HashChangeEvent", "HTMLOptionsCollection", "HTMLFormControlsCollection", "HTMLCollection", "HTMLAllCollection", "FormDataEvent", "FormData", "FontFace", "FocusEvent", "FileList", "File", "External", "EventTarget", "EventSource", "Event", "ErrorEvent", "ElementInternals", "DragEvent", "DataTransferItemList", "DataTransferItem", "DataTransfer", "DOMTokenList", "DOMStringMap", "DOMStringList", "DOMParser", "DOMMatrix", "DOMImplementation", "DOMException", "CustomElementRegistry", "CloseEvent", "CanvasRenderingContext2D", "CanvasPattern", "CanvasGradient", "CSSStyleDeclaration", "BroadcastChannel", "Blob", "BeforeUnloadEvent", "BarProp", "self", "document", "location", "customElements", "history", "locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar", "status", "closed", "frames", "top", "opener", "parent", "frameElement", "navigator", "origin", "external", "screenX", "screenY", "event", "isSecureContext", "sessionStorage", "localStorage", "alert", "atob", "blur", "btoa", "cancelAnimationFrame", "captureEvents", "clearInterval", "clearTimeout", "close", "confirm", "createImageBitmap", "fetch", "focus", "moveTo", "open", "print", "prompt", "queueMicrotask", "releaseEvents", "requestAnimationFrame", "scroll", "setInterval", "setTimeout", "stop", "ServiceWorker", "ServiceWorkerContainer", "Worklet", "PaymentRequest", "crossOriginIsolated", "XSLTProcessor", "SharedWorker", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "MediaSource", "profile", "clear", "table", "copy",],
        compat: ["ScreenOrientation"],
        console: ["console"],
        dom: ["XPathResult", "XPathExpression", "XPathEvaluator", "TreeWalker", "StaticRange", "NodeIterator", "NodeFilter", "NamedNodeMap", "MutationRecord", "MutationEvent", "KeyboardEvent", "DOMError", "CustomEvent", "CompositionEvent", "AbortSignal", "AbortController", "DeviceMotionEvent", "DeviceOrientationEvent", "TouchEvent", "debug",],
        encoding: ["TransformStream", "TextEncoderStream", "TextEncoder", "TextDecoderStream", "TextDecoder", "ReadableStream",],
        fetch: ["XMLHttpRequestUpload", "URLSearchParams", "Response", "Request", "Headers",],
        notifications: ["ServiceWorkerRegistration", "Notification", "dir"],
        quirks: ["CSS"],
        storage: ["StorageManager", "Permissions"],
        streams: ["WritableStreamDefaultWriter", "WritableStream", "ReadableStreamDefaultReader", "CountQueuingStrategy", "CompressionStream", "ByteLengthQueuingStrategy"],
        xhr: ["XMLHttpRequestEventTarget"]
    },
    webGL: ["WebGLVertexArrayObject", "WebGLTransformFeedback", "WebGLSync", "WebGLSampler", "WebGLQuery", "WebGLBuffer", "WebGLVertexArrayObject", "WebGLUniformLocation", "WebGLTransformFeedback", "WebGLTexture", "WebGLSync", "WebGLShaderPrecisionFormat", "WebGLShader", "WebGLSampler", "WebGLRenderbuffer", "WebGLQuery", "WebGLProgram", "WebGLFramebuffer", "WebGLContextEvent", "WebGLBuffer", "WebGLActiveInfo",],
    w3c: {
        webAudio: ["WaveShaperNode", "StereoPannerNode", "ScriptProcessorNode", "PeriodicWave", "PannerNode", "OscillatorNode", "OfflineAudioContext", "MediaStreamTrack", "MediaStreamAudioSourceNode", "MediaStreamAudioDestinationNode", "MediaElementAudioSourceNode", "IIRFilterNode", "GainNode", "DynamicsCompressorNode", "DelayNode", "ConvolverNode", "ConstantSourceNode", "ChannelSplitterNode", "ChannelMergerNode", "BiquadFilterNode", "AudioWorkletNode", "AudioScheduledSourceNode", "AudioProcessingEvent", "AudioParam", "AudioNode", "AudioListener", "AudioDestinationNode", "AudioContext", "AudioBufferSourceNode", "AudioBuffer", "AnalyserNode", "AudioWorklet", "value",],
        svg: ["SVGTransformList", "SVGTransform", "SVGPreserveAspectRatio", "SVGPointList", "SVGPoint", "SVGMatrix", "SVGAnimatedTransformList", "SVGAnimatedPreserveAspectRatio"]
    }
}

/**
 * ECMAScript
 *
let ecmaSet = new Set([...document.querySelectorAll('code')].map(filter))

for (const name of names) {
    if (ecmaSet.has(name)) {
        rst.ecma.push(name)
    }
}
/**/

for (const name of rst.ecma) {
    names.delete(name)
}

/**
 * Node
 */
for (const name of names) {
    try {
        if (window[name].prototype instanceof Node) {
            rst.node.push(name)
            names.delete(name)
        }
    } catch (e) {
        // name.match(/^on/)
        if (name.startsWith('on')) {
            rst.events.push(name)
            names.delete(name)
        }
    }

}

/**
 * webkit
 */
for (const name of names) {
    if (name.toLowerCase().startsWith('webkit')) {
        rst.webkit.push(name)
        names.delete(name)
    }
}


/**
 * whatwg html
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.html.push(name)
    }
}
/**/

for (const name of rst.whatwg.html) {
    names.delete(name)
}


/**
 * whatwg compat
 * https://compat.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.compat.push(name)
    }
}
/**/

for (const name of rst.whatwg.compat) {
    names.delete(name)
}

/**
 * whatwg console
 * https://console.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.console.push(name)
    }
}
/**/

for (const name of rst.whatwg.console) {
    names.delete(name)
}

/**
 * whatwg dom
 * https://dom.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.dom.push(name)
    }
}
/**/

for (const name of rst.whatwg.dom) {
    names.delete(name)
}

/**
 * whatwg encoding
 * https://encoding.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.encoding.push(name)
    }
}
/**/

for (const name of rst.whatwg.encoding) {
    names.delete(name)
}

/**
 * whatwg fetch
 * https://fetch.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.fetch.push(name)
    }
}
/**/

for (const name of rst.whatwg.fetch) {
    names.delete(name)
}

/**
 * whatwg notifications
 * https://notifications.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.notifications.push(name)
    }
}
/**/

for (const name of rst.whatwg.notifications) {
    names.delete(name)
}

/**
 * whatwg quirks
 * https://quirks.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.quirks.push(name)
    }
}
/**/

for (const name of rst.whatwg.quirks) {
    names.delete(name)
}

/**
 * whatwg storage
 * https://storage.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.storage.push(name)
    }
}
/**/

for (const name of rst.whatwg.storage) {
    names.delete(name)
}


/**
 * whatwg streams
 * https://streams.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.streams.push(name)
    }
}
/**/

for (const name of rst.whatwg.streams) {
    names.delete(name)
}

/**
 * whatwg url
 * https://url.spec.whatwg.org/
 *
let whatwgSet = new Set([...document.querySelectorAll('code,a')].map(filter))

for (const name of names) {
    if (whatwgSet.has(name)) {
        rst.whatwg.xhr.push(name)
    }
}
/**/

for (const name of rst.whatwg.xhr) {
    names.delete(name)
}


/**
 * webGL
 * https://www.khronos.org/registry/webgl/specs
 *
let webGLSet = new Set([...document.querySelectorAll('code,a,dfn')].map(filter))

for (const name of names) {
    if (webGLSet.has(name)) {
        rst.webGL.push(name)
    }
}
/**/

for (const name of names) {
    if (name.toLowerCase().startsWith('webgl')) {
        rst.webGL.push(name)
    }
}

for (const name of rst.webGL) {
    names.delete(name)
}

/**
 * w3c webAudio
 * https://www.w3.org/TR/webaudio/#APIOverview
 *
let w3cSet = new Set([...document.querySelectorAll('ul li code a')].map(filter))

for (const name of names) {
    if (w3cSet.has(name)) {
        rst.w3c.webAudio.push(name)
    }
}
/**/

for (const name of rst.w3c.webAudio) {
    names.delete(name)
}

/**
 * w3c svg
 * https://www.w3.org/TR/SVG11/expanded-toc.html
 *
let w3cSet = new Set(
    [...document.querySelectorAll('a[href$="#DOMInterfaces"]')]
        .reduce((a, c) => a.concat(Array.from(c.nextSibling?.children)), [])
        .map(el => {
            const rst = /(?<=\s)\S*$/.exec(el.innerText)
            return rst ? rst[0] : false
        })
)

for (const name of names) {
    if (w3cSet.has(name)) {
        rst.w3c.svg.push(name)
    }
}
/**/

for (const name of rst.w3c.svg) {
    names.delete(name)
}


console.log(rst, names)

