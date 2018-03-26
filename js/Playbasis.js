"use strict";var _typeof2=typeof Symbol==="function"&&typeof(typeof Symbol==="function"?Symbol.iterator:"@@iterator")==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==="function"?Symbol.prototype:"@@prototype")?"symbol":typeof obj;};








(function(f){if((typeof exports==="undefined"?"undefined":_typeof2(exports))==="object"&&typeof module!=="undefined"){module.exports=f();}else if(typeof define==="function"&&define.amd){define([],f);}else{var g;if(typeof window!=="undefined"){g=window;}else if(typeof global!=="undefined"){g=global;}else if(typeof self!=="undefined"){g=self;}else{g=this;}g.Playbasis=f();}})(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(require,module,exports){
'use strict';

exports.byteLength=byteLength;
exports.toByteArray=toByteArray;
exports.fromByteArray=fromByteArray;

var lookup=[];
var revLookup=[];
var Arr=typeof Uint8Array!=='undefined'?Uint8Array:Array;

var code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i=0,len=code.length;i<len;++i){
lookup[i]=code[i];
revLookup[code.charCodeAt(i)]=i;
}

revLookup['-'.charCodeAt(0)]=62;
revLookup['_'.charCodeAt(0)]=63;

function placeHoldersCount(b64){
var len=b64.length;
if(len%4>0){
throw new Error('Invalid string. Length must be a multiple of 4');
}






return b64[len-2]==='='?2:b64[len-1]==='='?1:0;
}

function byteLength(b64){

return b64.length*3/4-placeHoldersCount(b64);
}

function toByteArray(b64){
var i,j,l,tmp,placeHolders,arr;
var len=b64.length;
placeHolders=placeHoldersCount(b64);

arr=new Arr(len*3/4-placeHolders);


l=placeHolders>0?len-4:len;

var L=0;

for(i=0,j=0;i<l;i+=4,j+=3){
tmp=revLookup[b64.charCodeAt(i)]<<18|revLookup[b64.charCodeAt(i+1)]<<12|revLookup[b64.charCodeAt(i+2)]<<6|revLookup[b64.charCodeAt(i+3)];
arr[L++]=tmp>>16&0xFF;
arr[L++]=tmp>>8&0xFF;
arr[L++]=tmp&0xFF;
}

if(placeHolders===2){
tmp=revLookup[b64.charCodeAt(i)]<<2|revLookup[b64.charCodeAt(i+1)]>>4;
arr[L++]=tmp&0xFF;
}else if(placeHolders===1){
tmp=revLookup[b64.charCodeAt(i)]<<10|revLookup[b64.charCodeAt(i+1)]<<4|revLookup[b64.charCodeAt(i+2)]>>2;
arr[L++]=tmp>>8&0xFF;
arr[L++]=tmp&0xFF;
}

return arr;
}

function tripletToBase64(num){
return lookup[num>>18&0x3F]+lookup[num>>12&0x3F]+lookup[num>>6&0x3F]+lookup[num&0x3F];
}

function encodeChunk(uint8,start,end){
var tmp;
var output=[];
for(var i=start;i<end;i+=3){
tmp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];
output.push(tripletToBase64(tmp));
}
return output.join('');
}

function fromByteArray(uint8){
var tmp;
var len=uint8.length;
var extraBytes=len%3;
var output='';
var parts=[];
var maxChunkLength=16383;


for(var i=0,len2=len-extraBytes;i<len2;i+=maxChunkLength){
parts.push(encodeChunk(uint8,i,i+maxChunkLength>len2?len2:i+maxChunkLength));
}


if(extraBytes===1){
tmp=uint8[len-1];
output+=lookup[tmp>>2];
output+=lookup[tmp<<4&0x3F];
output+='==';
}else if(extraBytes===2){
tmp=(uint8[len-2]<<8)+uint8[len-1];
output+=lookup[tmp>>10];
output+=lookup[tmp>>4&0x3F];
output+=lookup[tmp<<2&0x3F];
output+='=';
}

parts.push(output);

return parts.join('');
}

},{}],2:[function(require,module,exports){
(function(process,global){
/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */




!function(e){if("object"==(typeof exports==="undefined"?"undefined":_typeof2(exports))&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Promise=e();}}(function(){var define,module,exports;return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof _dereq_=="function"&&_dereq_;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f;}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e);},l,l.exports,e,t,n,r);}return n[o].exports;}var i=typeof _dereq_=="function"&&_dereq_;for(var o=0;o<r.length;o++){s(r[o]);}return s;}({1:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise){
var SomePromiseArray=Promise._SomePromiseArray;
function any(promises){
var ret=new SomePromiseArray(promises);
var promise=ret.promise();
ret.setHowMany(1);
ret.setUnwrap();
ret.init();
return promise;
}

Promise.any=function(promises){
return any(promises);
};

Promise.prototype.any=function(){
return any(this);
};

};

},{}],2:[function(_dereq_,module,exports){
"use strict";
var firstLineError;
try{throw new Error();}catch(e){firstLineError=e;}
var schedule=_dereq_("./schedule");
var Queue=_dereq_("./queue");
var util=_dereq_("./util");

function Async(){
this._customScheduler=false;
this._isTickUsed=false;
this._lateQueue=new Queue(16);
this._normalQueue=new Queue(16);
this._haveDrainedQueues=false;
this._trampolineEnabled=true;
var self=this;
this.drainQueues=function(){
self._drainQueues();
};
this._schedule=schedule;
}

Async.prototype.setScheduler=function(fn){
var prev=this._schedule;
this._schedule=fn;
this._customScheduler=true;
return prev;
};

Async.prototype.hasCustomScheduler=function(){
return this._customScheduler;
};

Async.prototype.enableTrampoline=function(){
this._trampolineEnabled=true;
};

Async.prototype.disableTrampolineIfNecessary=function(){
if(util.hasDevTools){
this._trampolineEnabled=false;
}
};

Async.prototype.haveItemsQueued=function(){
return this._isTickUsed||this._haveDrainedQueues;
};


Async.prototype.fatalError=function(e,isNode){
if(isNode){
process.stderr.write("Fatal "+(e instanceof Error?e.stack:e)+
"\n");
process.exit(2);
}else{
this.throwLater(e);
}
};

Async.prototype.throwLater=function(fn,arg){
if(arguments.length===1){
arg=fn;
fn=function fn(){throw arg;};
}
if(typeof setTimeout!=="undefined"){
setTimeout(function(){
fn(arg);
},0);
}else try{
this._schedule(function(){
fn(arg);
});
}catch(e){
throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
}
};

function AsyncInvokeLater(fn,receiver,arg){
this._lateQueue.push(fn,receiver,arg);
this._queueTick();
}

function AsyncInvoke(fn,receiver,arg){
this._normalQueue.push(fn,receiver,arg);
this._queueTick();
}

function AsyncSettlePromises(promise){
this._normalQueue._pushOne(promise);
this._queueTick();
}

if(!util.hasDevTools){
Async.prototype.invokeLater=AsyncInvokeLater;
Async.prototype.invoke=AsyncInvoke;
Async.prototype.settlePromises=AsyncSettlePromises;
}else{
Async.prototype.invokeLater=function(fn,receiver,arg){
if(this._trampolineEnabled){
AsyncInvokeLater.call(this,fn,receiver,arg);
}else{
this._schedule(function(){
setTimeout(function(){
fn.call(receiver,arg);
},100);
});
}
};

Async.prototype.invoke=function(fn,receiver,arg){
if(this._trampolineEnabled){
AsyncInvoke.call(this,fn,receiver,arg);
}else{
this._schedule(function(){
fn.call(receiver,arg);
});
}
};

Async.prototype.settlePromises=function(promise){
if(this._trampolineEnabled){
AsyncSettlePromises.call(this,promise);
}else{
this._schedule(function(){
promise._settlePromises();
});
}
};
}

Async.prototype._drainQueue=function(queue){
while(queue.length()>0){
var fn=queue.shift();
if(typeof fn!=="function"){
fn._settlePromises();
continue;
}
var receiver=queue.shift();
var arg=queue.shift();
fn.call(receiver,arg);
}
};

Async.prototype._drainQueues=function(){
this._drainQueue(this._normalQueue);
this._reset();
this._haveDrainedQueues=true;
this._drainQueue(this._lateQueue);
};

Async.prototype._queueTick=function(){
if(!this._isTickUsed){
this._isTickUsed=true;
this._schedule(this.drainQueues);
}
};

Async.prototype._reset=function(){
this._isTickUsed=false;
};

module.exports=Async;
module.exports.firstLineError=firstLineError;

},{"./queue":26,"./schedule":29,"./util":36}],3:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,INTERNAL,tryConvertToPromise,debug){
var calledBind=false;
var rejectThis=function rejectThis(_,e){
this._reject(e);
};

var targetRejected=function targetRejected(e,context){
context.promiseRejectionQueued=true;
context.bindingPromise._then(rejectThis,rejectThis,null,this,e);
};

var bindingResolved=function bindingResolved(thisArg,context){
if((this._bitField&50397184)===0){
this._resolveCallback(context.target);
}
};

var bindingRejected=function bindingRejected(e,context){
if(!context.promiseRejectionQueued)this._reject(e);
};

Promise.prototype.bind=function(thisArg){
if(!calledBind){
calledBind=true;
Promise.prototype._propagateFrom=debug.propagateFromFunction();
Promise.prototype._boundValue=debug.boundValueFunction();
}
var maybePromise=tryConvertToPromise(thisArg);
var ret=new Promise(INTERNAL);
ret._propagateFrom(this,1);
var target=this._target();
ret._setBoundTo(maybePromise);
if(maybePromise instanceof Promise){
var context={
promiseRejectionQueued:false,
promise:ret,
target:target,
bindingPromise:maybePromise};

target._then(INTERNAL,targetRejected,undefined,ret,context);
maybePromise._then(
bindingResolved,bindingRejected,undefined,ret,context);
ret._setOnCancel(maybePromise);
}else{
ret._resolveCallback(target);
}
return ret;
};

Promise.prototype._setBoundTo=function(obj){
if(obj!==undefined){
this._bitField=this._bitField|2097152;
this._boundTo=obj;
}else{
this._bitField=this._bitField&~2097152;
}
};

Promise.prototype._isBound=function(){
return(this._bitField&2097152)===2097152;
};

Promise.bind=function(thisArg,value){
return Promise.resolve(value).bind(thisArg);
};
};

},{}],4:[function(_dereq_,module,exports){
"use strict";
var old;
if(typeof Promise!=="undefined")old=Promise;
function noConflict(){
try{if(Promise===bluebird)Promise=old;}
catch(e){}
return bluebird;
}
var bluebird=_dereq_("./promise")();
bluebird.noConflict=noConflict;
module.exports=bluebird;

},{"./promise":22}],5:[function(_dereq_,module,exports){
"use strict";
var cr=Object.create;
if(cr){
var callerCache=cr(null);
var getterCache=cr(null);
callerCache[" size"]=getterCache[" size"]=0;
}

module.exports=function(Promise){
var util=_dereq_("./util");
var canEvaluate=util.canEvaluate;
var isIdentifier=util.isIdentifier;

var getMethodCaller;
var getGetter;
if(!true){
var makeMethodCaller=function makeMethodCaller(methodName){
return new Function("ensureMethod","                                    \n\
        return function(obj) {                                               \n\
            'use strict'                                                     \n\
            var len = this.length;                                           \n\
            ensureMethod(obj, 'methodName');                                 \n\
            switch(len) {                                                    \n\
                case 1: return obj.methodName(this[0]);                      \n\
                case 2: return obj.methodName(this[0], this[1]);             \n\
                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
                case 0: return obj.methodName();                             \n\
                default:                                                     \n\
                    return obj.methodName.apply(obj, this);                  \n\
            }                                                                \n\
        };                                                                   \n\
        ".replace(/methodName/g,methodName))(ensureMethod);
};

var makeGetter=function makeGetter(propertyName){
return new Function("obj","                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName",propertyName));
};

var getCompiled=function getCompiled(name,compiler,cache){
var ret=cache[name];
if(typeof ret!=="function"){
if(!isIdentifier(name)){
return null;
}
ret=compiler(name);
cache[name]=ret;
cache[" size"]++;
if(cache[" size"]>512){
var keys=Object.keys(cache);
for(var i=0;i<256;++i){delete cache[keys[i]];}
cache[" size"]=keys.length-256;
}
}
return ret;
};

getMethodCaller=function getMethodCaller(name){
return getCompiled(name,makeMethodCaller,callerCache);
};

getGetter=function getGetter(name){
return getCompiled(name,makeGetter,getterCache);
};
}

function ensureMethod(obj,methodName){
var fn;
if(obj!=null)fn=obj[methodName];
if(typeof fn!=="function"){
var message="Object "+util.classString(obj)+" has no method '"+
util.toString(methodName)+"'";
throw new Promise.TypeError(message);
}
return fn;
}

function caller(obj){
var methodName=this.pop();
var fn=ensureMethod(obj,methodName);
return fn.apply(obj,this);
}
Promise.prototype.call=function(methodName){
var args=[].slice.call(arguments,1);;
if(!true){
if(canEvaluate){
var maybeCaller=getMethodCaller(methodName);
if(maybeCaller!==null){
return this._then(
maybeCaller,undefined,undefined,args,undefined);
}
}
}
args.push(methodName);
return this._then(caller,undefined,undefined,args,undefined);
};

function namedGetter(obj){
return obj[this];
}
function indexedGetter(obj){
var index=+this;
if(index<0)index=Math.max(0,index+obj.length);
return obj[index];
}
Promise.prototype.get=function(propertyName){
var isIndex=typeof propertyName==="number";
var getter;
if(!isIndex){
if(canEvaluate){
var maybeGetter=getGetter(propertyName);
getter=maybeGetter!==null?maybeGetter:namedGetter;
}else{
getter=namedGetter;
}
}else{
getter=indexedGetter;
}
return this._then(getter,undefined,undefined,propertyName,undefined);
};
};

},{"./util":36}],6:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,PromiseArray,apiRejection,debug){
var util=_dereq_("./util");
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
var async=Promise._async;

Promise.prototype["break"]=Promise.prototype.cancel=function(){
if(!debug.cancellation())return this._warn("cancellation is disabled");

var promise=this;
var child=promise;
while(promise._isCancellable()){
if(!promise._cancelBy(child)){
if(child._isFollowing()){
child._followee().cancel();
}else{
child._cancelBranched();
}
break;
}

var parent=promise._cancellationParent;
if(parent==null||!parent._isCancellable()){
if(promise._isFollowing()){
promise._followee().cancel();
}else{
promise._cancelBranched();
}
break;
}else{
if(promise._isFollowing())promise._followee().cancel();
promise._setWillBeCancelled();
child=promise;
promise=parent;
}
}
};

Promise.prototype._branchHasCancelled=function(){
this._branchesRemainingToCancel--;
};

Promise.prototype._enoughBranchesHaveCancelled=function(){
return this._branchesRemainingToCancel===undefined||
this._branchesRemainingToCancel<=0;
};

Promise.prototype._cancelBy=function(canceller){
if(canceller===this){
this._branchesRemainingToCancel=0;
this._invokeOnCancel();
return true;
}else{
this._branchHasCancelled();
if(this._enoughBranchesHaveCancelled()){
this._invokeOnCancel();
return true;
}
}
return false;
};

Promise.prototype._cancelBranched=function(){
if(this._enoughBranchesHaveCancelled()){
this._cancel();
}
};

Promise.prototype._cancel=function(){
if(!this._isCancellable())return;
this._setCancelled();
async.invoke(this._cancelPromises,this,undefined);
};

Promise.prototype._cancelPromises=function(){
if(this._length()>0)this._settlePromises();
};

Promise.prototype._unsetOnCancel=function(){
this._onCancelField=undefined;
};

Promise.prototype._isCancellable=function(){
return this.isPending()&&!this._isCancelled();
};

Promise.prototype.isCancellable=function(){
return this.isPending()&&!this.isCancelled();
};

Promise.prototype._doInvokeOnCancel=function(onCancelCallback,internalOnly){
if(util.isArray(onCancelCallback)){
for(var i=0;i<onCancelCallback.length;++i){
this._doInvokeOnCancel(onCancelCallback[i],internalOnly);
}
}else if(onCancelCallback!==undefined){
if(typeof onCancelCallback==="function"){
if(!internalOnly){
var e=tryCatch(onCancelCallback).call(this._boundValue());
if(e===errorObj){
this._attachExtraTrace(e.e);
async.throwLater(e.e);
}
}
}else{
onCancelCallback._resultCancelled(this);
}
}
};

Promise.prototype._invokeOnCancel=function(){
var onCancelCallback=this._onCancel();
this._unsetOnCancel();
async.invoke(this._doInvokeOnCancel,this,onCancelCallback);
};

Promise.prototype._invokeInternalOnCancel=function(){
if(this._isCancellable()){
this._doInvokeOnCancel(this._onCancel(),true);
this._unsetOnCancel();
}
};

Promise.prototype._resultCancelled=function(){
this.cancel();
};

};

},{"./util":36}],7:[function(_dereq_,module,exports){
"use strict";
module.exports=function(NEXT_FILTER){
var util=_dereq_("./util");
var getKeys=_dereq_("./es5").keys;
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;

function catchFilter(instances,cb,promise){
return function(e){
var boundTo=promise._boundValue();
predicateLoop:for(var i=0;i<instances.length;++i){
var item=instances[i];

if(item===Error||
item!=null&&item.prototype instanceof Error){
if(e instanceof item){
return tryCatch(cb).call(boundTo,e);
}
}else if(typeof item==="function"){
var matchesPredicate=tryCatch(item).call(boundTo,e);
if(matchesPredicate===errorObj){
return matchesPredicate;
}else if(matchesPredicate){
return tryCatch(cb).call(boundTo,e);
}
}else if(util.isObject(e)){
var keys=getKeys(item);
for(var j=0;j<keys.length;++j){
var key=keys[j];
if(item[key]!=e[key]){
continue predicateLoop;
}
}
return tryCatch(cb).call(boundTo,e);
}
}
return NEXT_FILTER;
};
}

return catchFilter;
};

},{"./es5":13,"./util":36}],8:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise){
var longStackTraces=false;
var contextStack=[];

Promise.prototype._promiseCreated=function(){};
Promise.prototype._pushContext=function(){};
Promise.prototype._popContext=function(){return null;};
Promise._peekContext=Promise.prototype._peekContext=function(){};

function Context(){
this._trace=new Context.CapturedTrace(peekContext());
}
Context.prototype._pushContext=function(){
if(this._trace!==undefined){
this._trace._promiseCreated=null;
contextStack.push(this._trace);
}
};

Context.prototype._popContext=function(){
if(this._trace!==undefined){
var trace=contextStack.pop();
var ret=trace._promiseCreated;
trace._promiseCreated=null;
return ret;
}
return null;
};

function createContext(){
if(longStackTraces)return new Context();
}

function peekContext(){
var lastIndex=contextStack.length-1;
if(lastIndex>=0){
return contextStack[lastIndex];
}
return undefined;
}
Context.CapturedTrace=null;
Context.create=createContext;
Context.deactivateLongStackTraces=function(){};
Context.activateLongStackTraces=function(){
var Promise_pushContext=Promise.prototype._pushContext;
var Promise_popContext=Promise.prototype._popContext;
var Promise_PeekContext=Promise._peekContext;
var Promise_peekContext=Promise.prototype._peekContext;
var Promise_promiseCreated=Promise.prototype._promiseCreated;
Context.deactivateLongStackTraces=function(){
Promise.prototype._pushContext=Promise_pushContext;
Promise.prototype._popContext=Promise_popContext;
Promise._peekContext=Promise_PeekContext;
Promise.prototype._peekContext=Promise_peekContext;
Promise.prototype._promiseCreated=Promise_promiseCreated;
longStackTraces=false;
};
longStackTraces=true;
Promise.prototype._pushContext=Context.prototype._pushContext;
Promise.prototype._popContext=Context.prototype._popContext;
Promise._peekContext=Promise.prototype._peekContext=peekContext;
Promise.prototype._promiseCreated=function(){
var ctx=this._peekContext();
if(ctx&&ctx._promiseCreated==null)ctx._promiseCreated=this;
};
};
return Context;
};

},{}],9:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,Context){
var getDomain=Promise._getDomain;
var async=Promise._async;
var Warning=_dereq_("./errors").Warning;
var util=_dereq_("./util");
var canAttachTrace=util.canAttachTrace;
var unhandledRejectionHandled;
var possiblyUnhandledRejection;
var bluebirdFramePattern=
/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
var nodeFramePattern=/\((?:timers\.js):\d+:\d+\)/;
var parseLinePattern=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/;
var stackFramePattern=null;
var formatStack=null;
var indentStackFrames=false;
var printWarning;
var debugging=!!(util.env("BLUEBIRD_DEBUG")!=0&&(
true||
util.env("BLUEBIRD_DEBUG")||
util.env("NODE_ENV")==="development"));

var warnings=!!(util.env("BLUEBIRD_WARNINGS")!=0&&(
debugging||util.env("BLUEBIRD_WARNINGS")));

var longStackTraces=!!(util.env("BLUEBIRD_LONG_STACK_TRACES")!=0&&(
debugging||util.env("BLUEBIRD_LONG_STACK_TRACES")));

var wForgottenReturn=util.env("BLUEBIRD_W_FORGOTTEN_RETURN")!=0&&(
warnings||!!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

Promise.prototype.suppressUnhandledRejections=function(){
var target=this._target();
target._bitField=target._bitField&~1048576|
524288;
};

Promise.prototype._ensurePossibleRejectionHandled=function(){
if((this._bitField&524288)!==0)return;
this._setRejectionIsUnhandled();
async.invokeLater(this._notifyUnhandledRejection,this,undefined);
};

Promise.prototype._notifyUnhandledRejectionIsHandled=function(){
fireRejectionEvent("rejectionHandled",
unhandledRejectionHandled,undefined,this);
};

Promise.prototype._setReturnedNonUndefined=function(){
this._bitField=this._bitField|268435456;
};

Promise.prototype._returnedNonUndefined=function(){
return(this._bitField&268435456)!==0;
};

Promise.prototype._notifyUnhandledRejection=function(){
if(this._isRejectionUnhandled()){
var reason=this._settledValue();
this._setUnhandledRejectionIsNotified();
fireRejectionEvent("unhandledRejection",
possiblyUnhandledRejection,reason,this);
}
};

Promise.prototype._setUnhandledRejectionIsNotified=function(){
this._bitField=this._bitField|262144;
};

Promise.prototype._unsetUnhandledRejectionIsNotified=function(){
this._bitField=this._bitField&~262144;
};

Promise.prototype._isUnhandledRejectionNotified=function(){
return(this._bitField&262144)>0;
};

Promise.prototype._setRejectionIsUnhandled=function(){
this._bitField=this._bitField|1048576;
};

Promise.prototype._unsetRejectionIsUnhandled=function(){
this._bitField=this._bitField&~1048576;
if(this._isUnhandledRejectionNotified()){
this._unsetUnhandledRejectionIsNotified();
this._notifyUnhandledRejectionIsHandled();
}
};

Promise.prototype._isRejectionUnhandled=function(){
return(this._bitField&1048576)>0;
};

Promise.prototype._warn=function(message,shouldUseOwnTrace,promise){
return warn(message,shouldUseOwnTrace,promise||this);
};

Promise.onPossiblyUnhandledRejection=function(fn){
var domain=getDomain();
possiblyUnhandledRejection=
typeof fn==="function"?domain===null?
fn:util.domainBind(domain,fn):
undefined;
};

Promise.onUnhandledRejectionHandled=function(fn){
var domain=getDomain();
unhandledRejectionHandled=
typeof fn==="function"?domain===null?
fn:util.domainBind(domain,fn):
undefined;
};

var disableLongStackTraces=function disableLongStackTraces(){};
Promise.longStackTraces=function(){
if(async.haveItemsQueued()&&!config.longStackTraces){
throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
}
if(!config.longStackTraces&&longStackTracesIsSupported()){
var Promise_captureStackTrace=Promise.prototype._captureStackTrace;
var Promise_attachExtraTrace=Promise.prototype._attachExtraTrace;
config.longStackTraces=true;
disableLongStackTraces=function disableLongStackTraces(){
if(async.haveItemsQueued()&&!config.longStackTraces){
throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
}
Promise.prototype._captureStackTrace=Promise_captureStackTrace;
Promise.prototype._attachExtraTrace=Promise_attachExtraTrace;
Context.deactivateLongStackTraces();
async.enableTrampoline();
config.longStackTraces=false;
};
Promise.prototype._captureStackTrace=longStackTracesCaptureStackTrace;
Promise.prototype._attachExtraTrace=longStackTracesAttachExtraTrace;
Context.activateLongStackTraces();
async.disableTrampolineIfNecessary();
}
};

Promise.hasLongStackTraces=function(){
return config.longStackTraces&&longStackTracesIsSupported();
};

var fireDomEvent=function(){
try{
if(typeof CustomEvent==="function"){
var event=new CustomEvent("CustomEvent");
util.global.dispatchEvent(event);
return function(name,event){
var domEvent=new CustomEvent(name.toLowerCase(),{
detail:event,
cancelable:true});

return!util.global.dispatchEvent(domEvent);
};
}else if(typeof Event==="function"){
var event=new Event("CustomEvent");
util.global.dispatchEvent(event);
return function(name,event){
var domEvent=new Event(name.toLowerCase(),{
cancelable:true});

domEvent.detail=event;
return!util.global.dispatchEvent(domEvent);
};
}else{
var event=document.createEvent("CustomEvent");
event.initCustomEvent("testingtheevent",false,true,{});
util.global.dispatchEvent(event);
return function(name,event){
var domEvent=document.createEvent("CustomEvent");
domEvent.initCustomEvent(name.toLowerCase(),false,true,
event);
return!util.global.dispatchEvent(domEvent);
};
}
}catch(e){}
return function(){
return false;
};
}();

var fireGlobalEvent=function(){
if(util.isNode){
return function(){
return process.emit.apply(process,arguments);
};
}else{
if(!util.global){
return function(){
return false;
};
}
return function(name){
var methodName="on"+name.toLowerCase();
var method=util.global[methodName];
if(!method)return false;
method.apply(util.global,[].slice.call(arguments,1));
return true;
};
}
}();

function generatePromiseLifecycleEventObject(name,promise){
return{promise:promise};
}

var eventToObjectGenerator={
promiseCreated:generatePromiseLifecycleEventObject,
promiseFulfilled:generatePromiseLifecycleEventObject,
promiseRejected:generatePromiseLifecycleEventObject,
promiseResolved:generatePromiseLifecycleEventObject,
promiseCancelled:generatePromiseLifecycleEventObject,
promiseChained:function promiseChained(name,promise,child){
return{promise:promise,child:child};
},
warning:function warning(name,_warning){
return{warning:_warning};
},
unhandledRejection:function unhandledRejection(name,reason,promise){
return{reason:reason,promise:promise};
},
rejectionHandled:generatePromiseLifecycleEventObject};


var activeFireEvent=function activeFireEvent(name){
var globalEventFired=false;
try{
globalEventFired=fireGlobalEvent.apply(null,arguments);
}catch(e){
async.throwLater(e);
globalEventFired=true;
}

var domEventFired=false;
try{
domEventFired=fireDomEvent(name,
eventToObjectGenerator[name].apply(null,arguments));
}catch(e){
async.throwLater(e);
domEventFired=true;
}

return domEventFired||globalEventFired;
};

Promise.config=function(opts){
opts=Object(opts);
if("longStackTraces"in opts){
if(opts.longStackTraces){
Promise.longStackTraces();
}else if(!opts.longStackTraces&&Promise.hasLongStackTraces()){
disableLongStackTraces();
}
}
if("warnings"in opts){
var warningsOption=opts.warnings;
config.warnings=!!warningsOption;
wForgottenReturn=config.warnings;

if(util.isObject(warningsOption)){
if("wForgottenReturn"in warningsOption){
wForgottenReturn=!!warningsOption.wForgottenReturn;
}
}
}
if("cancellation"in opts&&opts.cancellation&&!config.cancellation){
if(async.haveItemsQueued()){
throw new Error(
"cannot enable cancellation after promises are in use");
}
Promise.prototype._clearCancellationData=
cancellationClearCancellationData;
Promise.prototype._propagateFrom=cancellationPropagateFrom;
Promise.prototype._onCancel=cancellationOnCancel;
Promise.prototype._setOnCancel=cancellationSetOnCancel;
Promise.prototype._attachCancellationCallback=
cancellationAttachCancellationCallback;
Promise.prototype._execute=cancellationExecute;
_propagateFromFunction=cancellationPropagateFrom;
config.cancellation=true;
}
if("monitoring"in opts){
if(opts.monitoring&&!config.monitoring){
config.monitoring=true;
Promise.prototype._fireEvent=activeFireEvent;
}else if(!opts.monitoring&&config.monitoring){
config.monitoring=false;
Promise.prototype._fireEvent=defaultFireEvent;
}
}
return Promise;
};

function defaultFireEvent(){return false;}

Promise.prototype._fireEvent=defaultFireEvent;
Promise.prototype._execute=function(executor,resolve,reject){
try{
executor(resolve,reject);
}catch(e){
return e;
}
};
Promise.prototype._onCancel=function(){};
Promise.prototype._setOnCancel=function(handler){;};
Promise.prototype._attachCancellationCallback=function(onCancel){
;
};
Promise.prototype._captureStackTrace=function(){};
Promise.prototype._attachExtraTrace=function(){};
Promise.prototype._clearCancellationData=function(){};
Promise.prototype._propagateFrom=function(parent,flags){
;
;
};

function cancellationExecute(executor,resolve,reject){
var promise=this;
try{
executor(resolve,reject,function(onCancel){
if(typeof onCancel!=="function"){
throw new TypeError("onCancel must be a function, got: "+
util.toString(onCancel));
}
promise._attachCancellationCallback(onCancel);
});
}catch(e){
return e;
}
}

function cancellationAttachCancellationCallback(onCancel){
if(!this._isCancellable())return this;

var previousOnCancel=this._onCancel();
if(previousOnCancel!==undefined){
if(util.isArray(previousOnCancel)){
previousOnCancel.push(onCancel);
}else{
this._setOnCancel([previousOnCancel,onCancel]);
}
}else{
this._setOnCancel(onCancel);
}
}

function cancellationOnCancel(){
return this._onCancelField;
}

function cancellationSetOnCancel(onCancel){
this._onCancelField=onCancel;
}

function cancellationClearCancellationData(){
this._cancellationParent=undefined;
this._onCancelField=undefined;
}

function cancellationPropagateFrom(parent,flags){
if((flags&1)!==0){
this._cancellationParent=parent;
var branchesRemainingToCancel=parent._branchesRemainingToCancel;
if(branchesRemainingToCancel===undefined){
branchesRemainingToCancel=0;
}
parent._branchesRemainingToCancel=branchesRemainingToCancel+1;
}
if((flags&2)!==0&&parent._isBound()){
this._setBoundTo(parent._boundTo);
}
}

function bindingPropagateFrom(parent,flags){
if((flags&2)!==0&&parent._isBound()){
this._setBoundTo(parent._boundTo);
}
}
var _propagateFromFunction=bindingPropagateFrom;

function _boundValueFunction(){
var ret=this._boundTo;
if(ret!==undefined){
if(ret instanceof Promise){
if(ret.isFulfilled()){
return ret.value();
}else{
return undefined;
}
}
}
return ret;
}

function longStackTracesCaptureStackTrace(){
this._trace=new CapturedTrace(this._peekContext());
}

function longStackTracesAttachExtraTrace(error,ignoreSelf){
if(canAttachTrace(error)){
var trace=this._trace;
if(trace!==undefined){
if(ignoreSelf)trace=trace._parent;
}
if(trace!==undefined){
trace.attachExtraTrace(error);
}else if(!error.__stackCleaned__){
var parsed=parseStackAndMessage(error);
util.notEnumerableProp(error,"stack",
parsed.message+"\n"+parsed.stack.join("\n"));
util.notEnumerableProp(error,"__stackCleaned__",true);
}
}
}

function checkForgottenReturns(returnValue,promiseCreated,name,promise,
parent){
if(returnValue===undefined&&promiseCreated!==null&&
wForgottenReturn){
if(parent!==undefined&&parent._returnedNonUndefined())return;
if((promise._bitField&65535)===0)return;

if(name)name=name+" ";
var handlerLine="";
var creatorLine="";
if(promiseCreated._trace){
var traceLines=promiseCreated._trace.stack.split("\n");
var stack=cleanStack(traceLines);
for(var i=stack.length-1;i>=0;--i){
var line=stack[i];
if(!nodeFramePattern.test(line)){
var lineMatches=line.match(parseLinePattern);
if(lineMatches){
handlerLine="at "+lineMatches[1]+
":"+lineMatches[2]+":"+lineMatches[3]+" ";
}
break;
}
}

if(stack.length>0){
var firstUserLine=stack[0];
for(var i=0;i<traceLines.length;++i){

if(traceLines[i]===firstUserLine){
if(i>0){
creatorLine="\n"+traceLines[i-1];
}
break;
}
}

}
}
var msg="a promise was created in a "+name+
"handler "+handlerLine+"but was not returned from it, "+
"see http://goo.gl/rRqMUw"+
creatorLine;
promise._warn(msg,true,promiseCreated);
}
}

function deprecated(name,replacement){
var message=name+
" is deprecated and will be removed in a future version.";
if(replacement)message+=" Use "+replacement+" instead.";
return warn(message);
}

function warn(message,shouldUseOwnTrace,promise){
if(!config.warnings)return;
var warning=new Warning(message);
var ctx;
if(shouldUseOwnTrace){
promise._attachExtraTrace(warning);
}else if(config.longStackTraces&&(ctx=Promise._peekContext())){
ctx.attachExtraTrace(warning);
}else{
var parsed=parseStackAndMessage(warning);
warning.stack=parsed.message+"\n"+parsed.stack.join("\n");
}

if(!activeFireEvent("warning",warning)){
formatAndLogError(warning,"",true);
}
}

function reconstructStack(message,stacks){
for(var i=0;i<stacks.length-1;++i){
stacks[i].push("From previous event:");
stacks[i]=stacks[i].join("\n");
}
if(i<stacks.length){
stacks[i]=stacks[i].join("\n");
}
return message+"\n"+stacks.join("\n");
}

function removeDuplicateOrEmptyJumps(stacks){
for(var i=0;i<stacks.length;++i){
if(stacks[i].length===0||
i+1<stacks.length&&stacks[i][0]===stacks[i+1][0]){
stacks.splice(i,1);
i--;
}
}
}

function removeCommonRoots(stacks){
var current=stacks[0];
for(var i=1;i<stacks.length;++i){
var prev=stacks[i];
var currentLastIndex=current.length-1;
var currentLastLine=current[currentLastIndex];
var commonRootMeetPoint=-1;

for(var j=prev.length-1;j>=0;--j){
if(prev[j]===currentLastLine){
commonRootMeetPoint=j;
break;
}
}

for(var j=commonRootMeetPoint;j>=0;--j){
var line=prev[j];
if(current[currentLastIndex]===line){
current.pop();
currentLastIndex--;
}else{
break;
}
}
current=prev;
}
}

function cleanStack(stack){
var ret=[];
for(var i=0;i<stack.length;++i){
var line=stack[i];
var isTraceLine="    (No stack trace)"===line||
stackFramePattern.test(line);
var isInternalFrame=isTraceLine&&shouldIgnore(line);
if(isTraceLine&&!isInternalFrame){
if(indentStackFrames&&line.charAt(0)!==" "){
line="    "+line;
}
ret.push(line);
}
}
return ret;
}

function stackFramesAsArray(error){
var stack=error.stack.replace(/\s+$/g,"").split("\n");
for(var i=0;i<stack.length;++i){
var line=stack[i];
if("    (No stack trace)"===line||stackFramePattern.test(line)){
break;
}
}
if(i>0&&error.name!="SyntaxError"){
stack=stack.slice(i);
}
return stack;
}

function parseStackAndMessage(error){
var stack=error.stack;
var message=error.toString();
stack=typeof stack==="string"&&stack.length>0?
stackFramesAsArray(error):["    (No stack trace)"];
return{
message:message,
stack:error.name=="SyntaxError"?stack:cleanStack(stack)};

}

function formatAndLogError(error,title,isSoft){
if(typeof console!=="undefined"){
var message;
if(util.isObject(error)){
var stack=error.stack;
message=title+formatStack(stack,error);
}else{
message=title+String(error);
}
if(typeof printWarning==="function"){
printWarning(message,isSoft);
}else if(typeof console.log==="function"||
_typeof2(console.log)==="object"){
console.log(message);
}
}
}

function fireRejectionEvent(name,localHandler,reason,promise){
var localEventFired=false;
try{
if(typeof localHandler==="function"){
localEventFired=true;
if(name==="rejectionHandled"){
localHandler(promise);
}else{
localHandler(reason,promise);
}
}
}catch(e){
async.throwLater(e);
}

if(name==="unhandledRejection"){
if(!activeFireEvent(name,reason,promise)&&!localEventFired){
formatAndLogError(reason,"Unhandled rejection ");
}
}else{
activeFireEvent(name,promise);
}
}

function formatNonError(obj){
var str;
if(typeof obj==="function"){
str="[function "+(
obj.name||"anonymous")+
"]";
}else{
str=obj&&typeof obj.toString==="function"?
obj.toString():util.toString(obj);
var ruselessToString=/\[object [a-zA-Z0-9$_]+\]/;
if(ruselessToString.test(str)){
try{
var newStr=JSON.stringify(obj);
str=newStr;
}
catch(e){

}
}
if(str.length===0){
str="(empty array)";
}
}
return"(<"+snip(str)+">, no stack trace)";
}

function snip(str){
var maxChars=41;
if(str.length<maxChars){
return str;
}
return str.substr(0,maxChars-3)+"...";
}

function longStackTracesIsSupported(){
return typeof captureStackTrace==="function";
}

var shouldIgnore=function shouldIgnore(){return false;};
var parseLineInfoRegex=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
function parseLineInfo(line){
var matches=line.match(parseLineInfoRegex);
if(matches){
return{
fileName:matches[1],
line:parseInt(matches[2],10)};

}
}

function setBounds(firstLineError,lastLineError){
if(!longStackTracesIsSupported())return;
var firstStackLines=firstLineError.stack.split("\n");
var lastStackLines=lastLineError.stack.split("\n");
var firstIndex=-1;
var lastIndex=-1;
var firstFileName;
var lastFileName;
for(var i=0;i<firstStackLines.length;++i){
var result=parseLineInfo(firstStackLines[i]);
if(result){
firstFileName=result.fileName;
firstIndex=result.line;
break;
}
}
for(var i=0;i<lastStackLines.length;++i){
var result=parseLineInfo(lastStackLines[i]);
if(result){
lastFileName=result.fileName;
lastIndex=result.line;
break;
}
}
if(firstIndex<0||lastIndex<0||!firstFileName||!lastFileName||
firstFileName!==lastFileName||firstIndex>=lastIndex){
return;
}

shouldIgnore=function shouldIgnore(line){
if(bluebirdFramePattern.test(line))return true;
var info=parseLineInfo(line);
if(info){
if(info.fileName===firstFileName&&
firstIndex<=info.line&&info.line<=lastIndex){
return true;
}
}
return false;
};
}

function CapturedTrace(parent){
this._parent=parent;
this._promisesCreated=0;
var length=this._length=1+(parent===undefined?0:parent._length);
captureStackTrace(this,CapturedTrace);
if(length>32)this.uncycle();
}
util.inherits(CapturedTrace,Error);
Context.CapturedTrace=CapturedTrace;

CapturedTrace.prototype.uncycle=function(){
var length=this._length;
if(length<2)return;
var nodes=[];
var stackToIndex={};

for(var i=0,node=this;node!==undefined;++i){
nodes.push(node);
node=node._parent;
}
length=this._length=i;
for(var i=length-1;i>=0;--i){
var stack=nodes[i].stack;
if(stackToIndex[stack]===undefined){
stackToIndex[stack]=i;
}
}
for(var i=0;i<length;++i){
var currentStack=nodes[i].stack;
var index=stackToIndex[currentStack];
if(index!==undefined&&index!==i){
if(index>0){
nodes[index-1]._parent=undefined;
nodes[index-1]._length=1;
}
nodes[i]._parent=undefined;
nodes[i]._length=1;
var cycleEdgeNode=i>0?nodes[i-1]:this;

if(index<length-1){
cycleEdgeNode._parent=nodes[index+1];
cycleEdgeNode._parent.uncycle();
cycleEdgeNode._length=
cycleEdgeNode._parent._length+1;
}else{
cycleEdgeNode._parent=undefined;
cycleEdgeNode._length=1;
}
var currentChildLength=cycleEdgeNode._length+1;
for(var j=i-2;j>=0;--j){
nodes[j]._length=currentChildLength;
currentChildLength++;
}
return;
}
}
};

CapturedTrace.prototype.attachExtraTrace=function(error){
if(error.__stackCleaned__)return;
this.uncycle();
var parsed=parseStackAndMessage(error);
var message=parsed.message;
var stacks=[parsed.stack];

var trace=this;
while(trace!==undefined){
stacks.push(cleanStack(trace.stack.split("\n")));
trace=trace._parent;
}
removeCommonRoots(stacks);
removeDuplicateOrEmptyJumps(stacks);
util.notEnumerableProp(error,"stack",reconstructStack(message,stacks));
util.notEnumerableProp(error,"__stackCleaned__",true);
};

var captureStackTrace=function stackDetection(){
var v8stackFramePattern=/^\s*at\s*/;
var v8stackFormatter=function v8stackFormatter(stack,error){
if(typeof stack==="string")return stack;

if(error.name!==undefined&&
error.message!==undefined){
return error.toString();
}
return formatNonError(error);
};

if(typeof Error.stackTraceLimit==="number"&&
typeof Error.captureStackTrace==="function"){
Error.stackTraceLimit+=6;
stackFramePattern=v8stackFramePattern;
formatStack=v8stackFormatter;
var captureStackTrace=Error.captureStackTrace;

shouldIgnore=function shouldIgnore(line){
return bluebirdFramePattern.test(line);
};
return function(receiver,ignoreUntil){
Error.stackTraceLimit+=6;
captureStackTrace(receiver,ignoreUntil);
Error.stackTraceLimit-=6;
};
}
var err=new Error();

if(typeof err.stack==="string"&&
err.stack.split("\n")[0].indexOf("stackDetection@")>=0){
stackFramePattern=/@/;
formatStack=v8stackFormatter;
indentStackFrames=true;
return function captureStackTrace(o){
o.stack=new Error().stack;
};
}

var hasStackAfterThrow;
try{throw new Error();}
catch(e){
hasStackAfterThrow="stack"in e;
}
if(!("stack"in err)&&hasStackAfterThrow&&
typeof Error.stackTraceLimit==="number"){
stackFramePattern=v8stackFramePattern;
formatStack=v8stackFormatter;
return function captureStackTrace(o){
Error.stackTraceLimit+=6;
try{throw new Error();}
catch(e){o.stack=e.stack;}
Error.stackTraceLimit-=6;
};
}

formatStack=function formatStack(stack,error){
if(typeof stack==="string")return stack;

if(((typeof error==="undefined"?"undefined":_typeof2(error))==="object"||
typeof error==="function")&&
error.name!==undefined&&
error.message!==undefined){
return error.toString();
}
return formatNonError(error);
};

return null;

}([]);

if(typeof console!=="undefined"&&typeof console.warn!=="undefined"){
printWarning=function printWarning(message){
console.warn(message);
};
if(util.isNode&&process.stderr.isTTY){
printWarning=function printWarning(message,isSoft){
var color=isSoft?"\x1B[33m":"\x1B[31m";
console.warn(color+message+"\x1B[0m\n");
};
}else if(!util.isNode&&typeof new Error().stack==="string"){
printWarning=function printWarning(message,isSoft){
console.warn("%c"+message,
isSoft?"color: darkorange":"color: red");
};
}
}

var config={
warnings:warnings,
longStackTraces:false,
cancellation:false,
monitoring:false};


if(longStackTraces)Promise.longStackTraces();

return{
longStackTraces:function longStackTraces(){
return config.longStackTraces;
},
warnings:function warnings(){
return config.warnings;
},
cancellation:function cancellation(){
return config.cancellation;
},
monitoring:function monitoring(){
return config.monitoring;
},
propagateFromFunction:function propagateFromFunction(){
return _propagateFromFunction;
},
boundValueFunction:function boundValueFunction(){
return _boundValueFunction;
},
checkForgottenReturns:checkForgottenReturns,
setBounds:setBounds,
warn:warn,
deprecated:deprecated,
CapturedTrace:CapturedTrace,
fireDomEvent:fireDomEvent,
fireGlobalEvent:fireGlobalEvent};

};

},{"./errors":12,"./util":36}],10:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise){
function returner(){
return this.value;
}
function thrower(){
throw this.reason;
}

Promise.prototype["return"]=
Promise.prototype.thenReturn=function(value){
if(value instanceof Promise)value.suppressUnhandledRejections();
return this._then(
returner,undefined,undefined,{value:value},undefined);
};

Promise.prototype["throw"]=
Promise.prototype.thenThrow=function(reason){
return this._then(
thrower,undefined,undefined,{reason:reason},undefined);
};

Promise.prototype.catchThrow=function(reason){
if(arguments.length<=1){
return this._then(
undefined,thrower,undefined,{reason:reason},undefined);
}else{
var _reason=arguments[1];
var handler=function handler(){throw _reason;};
return this.caught(reason,handler);
}
};

Promise.prototype.catchReturn=function(value){
if(arguments.length<=1){
if(value instanceof Promise)value.suppressUnhandledRejections();
return this._then(
undefined,returner,undefined,{value:value},undefined);
}else{
var _value=arguments[1];
if(_value instanceof Promise)_value.suppressUnhandledRejections();
var handler=function handler(){return _value;};
return this.caught(value,handler);
}
};
};

},{}],11:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,INTERNAL){
var PromiseReduce=Promise.reduce;
var PromiseAll=Promise.all;

function promiseAllThis(){
return PromiseAll(this);
}

function PromiseMapSeries(promises,fn){
return PromiseReduce(promises,fn,INTERNAL,INTERNAL);
}

Promise.prototype.each=function(fn){
return PromiseReduce(this,fn,INTERNAL,0).
_then(promiseAllThis,undefined,undefined,this,undefined);
};

Promise.prototype.mapSeries=function(fn){
return PromiseReduce(this,fn,INTERNAL,INTERNAL);
};

Promise.each=function(promises,fn){
return PromiseReduce(promises,fn,INTERNAL,0).
_then(promiseAllThis,undefined,undefined,promises,undefined);
};

Promise.mapSeries=PromiseMapSeries;
};


},{}],12:[function(_dereq_,module,exports){
"use strict";
var es5=_dereq_("./es5");
var Objectfreeze=es5.freeze;
var util=_dereq_("./util");
var inherits=util.inherits;
var notEnumerableProp=util.notEnumerableProp;

function subError(nameProperty,defaultMessage){
function SubError(message){
if(!(this instanceof SubError))return new SubError(message);
notEnumerableProp(this,"message",
typeof message==="string"?message:defaultMessage);
notEnumerableProp(this,"name",nameProperty);
if(Error.captureStackTrace){
Error.captureStackTrace(this,this.constructor);
}else{
Error.call(this);
}
}
inherits(SubError,Error);
return SubError;
}

var _TypeError,_RangeError;
var Warning=subError("Warning","warning");
var CancellationError=subError("CancellationError","cancellation error");
var TimeoutError=subError("TimeoutError","timeout error");
var AggregateError=subError("AggregateError","aggregate error");
try{
_TypeError=TypeError;
_RangeError=RangeError;
}catch(e){
_TypeError=subError("TypeError","type error");
_RangeError=subError("RangeError","range error");
}

var methods=("join pop push shift unshift slice filter forEach some "+
"every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for(var i=0;i<methods.length;++i){
if(typeof Array.prototype[methods[i]]==="function"){
AggregateError.prototype[methods[i]]=Array.prototype[methods[i]];
}
}

es5.defineProperty(AggregateError.prototype,"length",{
value:0,
configurable:false,
writable:true,
enumerable:true});

AggregateError.prototype["isOperational"]=true;
var level=0;
AggregateError.prototype.toString=function(){
var indent=Array(level*4+1).join(" ");
var ret="\n"+indent+"AggregateError of:"+"\n";
level++;
indent=Array(level*4+1).join(" ");
for(var i=0;i<this.length;++i){
var str=this[i]===this?"[Circular AggregateError]":this[i]+"";
var lines=str.split("\n");
for(var j=0;j<lines.length;++j){
lines[j]=indent+lines[j];
}
str=lines.join("\n");
ret+=str+"\n";
}
level--;
return ret;
};

function OperationalError(message){
if(!(this instanceof OperationalError))
return new OperationalError(message);
notEnumerableProp(this,"name","OperationalError");
notEnumerableProp(this,"message",message);
this.cause=message;
this["isOperational"]=true;

if(message instanceof Error){
notEnumerableProp(this,"message",message.message);
notEnumerableProp(this,"stack",message.stack);
}else if(Error.captureStackTrace){
Error.captureStackTrace(this,this.constructor);
}

}
inherits(OperationalError,Error);

var errorTypes=Error["__BluebirdErrorTypes__"];
if(!errorTypes){
errorTypes=Objectfreeze({
CancellationError:CancellationError,
TimeoutError:TimeoutError,
OperationalError:OperationalError,
RejectionError:OperationalError,
AggregateError:AggregateError});

es5.defineProperty(Error,"__BluebirdErrorTypes__",{
value:errorTypes,
writable:false,
enumerable:false,
configurable:false});

}

module.exports={
Error:Error,
TypeError:_TypeError,
RangeError:_RangeError,
CancellationError:errorTypes.CancellationError,
OperationalError:errorTypes.OperationalError,
TimeoutError:errorTypes.TimeoutError,
AggregateError:errorTypes.AggregateError,
Warning:Warning};


},{"./es5":13,"./util":36}],13:[function(_dereq_,module,exports){
var isES5=function(){
"use strict";
return this===undefined;
}();

if(isES5){
module.exports={
freeze:Object.freeze,
defineProperty:Object.defineProperty,
getDescriptor:Object.getOwnPropertyDescriptor,
keys:Object.keys,
names:Object.getOwnPropertyNames,
getPrototypeOf:Object.getPrototypeOf,
isArray:Array.isArray,
isES5:isES5,
propertyIsWritable:function propertyIsWritable(obj,prop){
var descriptor=Object.getOwnPropertyDescriptor(obj,prop);
return!!(!descriptor||descriptor.writable||descriptor.set);
}};

}else{
var has={}.hasOwnProperty;
var str={}.toString;
var proto={}.constructor.prototype;

var ObjectKeys=function ObjectKeys(o){
var ret=[];
for(var key in o){
if(has.call(o,key)){
ret.push(key);
}
}
return ret;
};

var ObjectGetDescriptor=function ObjectGetDescriptor(o,key){
return{value:o[key]};
};

var ObjectDefineProperty=function ObjectDefineProperty(o,key,desc){
o[key]=desc.value;
return o;
};

var ObjectFreeze=function ObjectFreeze(obj){
return obj;
};

var ObjectGetPrototypeOf=function ObjectGetPrototypeOf(obj){
try{
return Object(obj).constructor.prototype;
}
catch(e){
return proto;
}
};

var ArrayIsArray=function ArrayIsArray(obj){
try{
return str.call(obj)==="[object Array]";
}
catch(e){
return false;
}
};

module.exports={
isArray:ArrayIsArray,
keys:ObjectKeys,
names:ObjectKeys,
defineProperty:ObjectDefineProperty,
getDescriptor:ObjectGetDescriptor,
freeze:ObjectFreeze,
getPrototypeOf:ObjectGetPrototypeOf,
isES5:isES5,
propertyIsWritable:function propertyIsWritable(){
return true;
}};

}

},{}],14:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,INTERNAL){
var PromiseMap=Promise.map;

Promise.prototype.filter=function(fn,options){
return PromiseMap(this,fn,options,INTERNAL);
};

Promise.filter=function(promises,fn,options){
return PromiseMap(promises,fn,options,INTERNAL);
};
};

},{}],15:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,tryConvertToPromise,NEXT_FILTER){
var util=_dereq_("./util");
var CancellationError=Promise.CancellationError;
var errorObj=util.errorObj;
var catchFilter=_dereq_("./catch_filter")(NEXT_FILTER);

function PassThroughHandlerContext(promise,type,handler){
this.promise=promise;
this.type=type;
this.handler=handler;
this.called=false;
this.cancelPromise=null;
}

PassThroughHandlerContext.prototype.isFinallyHandler=function(){
return this.type===0;
};

function FinallyHandlerCancelReaction(finallyHandler){
this.finallyHandler=finallyHandler;
}

FinallyHandlerCancelReaction.prototype._resultCancelled=function(){
checkCancel(this.finallyHandler);
};

function checkCancel(ctx,reason){
if(ctx.cancelPromise!=null){
if(arguments.length>1){
ctx.cancelPromise._reject(reason);
}else{
ctx.cancelPromise._cancel();
}
ctx.cancelPromise=null;
return true;
}
return false;
}

function succeed(){
return finallyHandler.call(this,this.promise._target()._settledValue());
}
function fail(reason){
if(checkCancel(this,reason))return;
errorObj.e=reason;
return errorObj;
}
function finallyHandler(reasonOrValue){
var promise=this.promise;
var handler=this.handler;

if(!this.called){
this.called=true;
var ret=this.isFinallyHandler()?
handler.call(promise._boundValue()):
handler.call(promise._boundValue(),reasonOrValue);
if(ret===NEXT_FILTER){
return ret;
}else if(ret!==undefined){
promise._setReturnedNonUndefined();
var maybePromise=tryConvertToPromise(ret,promise);
if(maybePromise instanceof Promise){
if(this.cancelPromise!=null){
if(maybePromise._isCancelled()){
var reason=
new CancellationError("late cancellation observer");
promise._attachExtraTrace(reason);
errorObj.e=reason;
return errorObj;
}else if(maybePromise.isPending()){
maybePromise._attachCancellationCallback(
new FinallyHandlerCancelReaction(this));
}
}
return maybePromise._then(
succeed,fail,undefined,this,undefined);
}
}
}

if(promise.isRejected()){
checkCancel(this);
errorObj.e=reasonOrValue;
return errorObj;
}else{
checkCancel(this);
return reasonOrValue;
}
}

Promise.prototype._passThrough=function(handler,type,success,fail){
if(typeof handler!=="function")return this.then();
return this._then(success,
fail,
undefined,
new PassThroughHandlerContext(this,type,handler),
undefined);
};

Promise.prototype.lastly=
Promise.prototype["finally"]=function(handler){
return this._passThrough(handler,
0,
finallyHandler,
finallyHandler);
};


Promise.prototype.tap=function(handler){
return this._passThrough(handler,1,finallyHandler);
};

Promise.prototype.tapCatch=function(handlerOrPredicate){
var len=arguments.length;
if(len===1){
return this._passThrough(handlerOrPredicate,
1,
undefined,
finallyHandler);
}else{
var catchInstances=new Array(len-1),
j=0,i;
for(i=0;i<len-1;++i){
var item=arguments[i];
if(util.isObject(item)){
catchInstances[j++]=item;
}else{
return Promise.reject(new TypeError(
"tapCatch statement predicate: "+
"expecting an object but got "+util.classString(item)));

}
}
catchInstances.length=j;
var handler=arguments[i];
return this._passThrough(catchFilter(catchInstances,handler,this),
1,
undefined,
finallyHandler);
}

};

return PassThroughHandlerContext;
};

},{"./catch_filter":7,"./util":36}],16:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,
apiRejection,
INTERNAL,
tryConvertToPromise,
Proxyable,
debug){
var errors=_dereq_("./errors");
var TypeError=errors.TypeError;
var util=_dereq_("./util");
var errorObj=util.errorObj;
var tryCatch=util.tryCatch;
var yieldHandlers=[];

function promiseFromYieldHandler(value,yieldHandlers,traceParent){
for(var i=0;i<yieldHandlers.length;++i){
traceParent._pushContext();
var result=tryCatch(yieldHandlers[i])(value);
traceParent._popContext();
if(result===errorObj){
traceParent._pushContext();
var ret=Promise.reject(errorObj.e);
traceParent._popContext();
return ret;
}
var maybePromise=tryConvertToPromise(result,traceParent);
if(maybePromise instanceof Promise)return maybePromise;
}
return null;
}

function PromiseSpawn(generatorFunction,receiver,yieldHandler,stack){
if(debug.cancellation()){
var internal=new Promise(INTERNAL);
var _finallyPromise=this._finallyPromise=new Promise(INTERNAL);
this._promise=internal.lastly(function(){
return _finallyPromise;
});
internal._captureStackTrace();
internal._setOnCancel(this);
}else{
var promise=this._promise=new Promise(INTERNAL);
promise._captureStackTrace();
}
this._stack=stack;
this._generatorFunction=generatorFunction;
this._receiver=receiver;
this._generator=undefined;
this._yieldHandlers=typeof yieldHandler==="function"?
[yieldHandler].concat(yieldHandlers):
yieldHandlers;
this._yieldedPromise=null;
this._cancellationPhase=false;
}
util.inherits(PromiseSpawn,Proxyable);

PromiseSpawn.prototype._isResolved=function(){
return this._promise===null;
};

PromiseSpawn.prototype._cleanup=function(){
this._promise=this._generator=null;
if(debug.cancellation()&&this._finallyPromise!==null){
this._finallyPromise._fulfill();
this._finallyPromise=null;
}
};

PromiseSpawn.prototype._promiseCancelled=function(){
if(this._isResolved())return;
var implementsReturn=typeof this._generator["return"]!=="undefined";

var result;
if(!implementsReturn){
var reason=new Promise.CancellationError(
"generator .return() sentinel");
Promise.coroutine.returnSentinel=reason;
this._promise._attachExtraTrace(reason);
this._promise._pushContext();
result=tryCatch(this._generator["throw"]).call(this._generator,
reason);
this._promise._popContext();
}else{
this._promise._pushContext();
result=tryCatch(this._generator["return"]).call(this._generator,
undefined);
this._promise._popContext();
}
this._cancellationPhase=true;
this._yieldedPromise=null;
this._continue(result);
};

PromiseSpawn.prototype._promiseFulfilled=function(value){
this._yieldedPromise=null;
this._promise._pushContext();
var result=tryCatch(this._generator.next).call(this._generator,value);
this._promise._popContext();
this._continue(result);
};

PromiseSpawn.prototype._promiseRejected=function(reason){
this._yieldedPromise=null;
this._promise._attachExtraTrace(reason);
this._promise._pushContext();
var result=tryCatch(this._generator["throw"]).
call(this._generator,reason);
this._promise._popContext();
this._continue(result);
};

PromiseSpawn.prototype._resultCancelled=function(){
if(this._yieldedPromise instanceof Promise){
var promise=this._yieldedPromise;
this._yieldedPromise=null;
promise.cancel();
}
};

PromiseSpawn.prototype.promise=function(){
return this._promise;
};

PromiseSpawn.prototype._run=function(){
this._generator=this._generatorFunction.call(this._receiver);
this._receiver=
this._generatorFunction=undefined;
this._promiseFulfilled(undefined);
};

PromiseSpawn.prototype._continue=function(result){
var promise=this._promise;
if(result===errorObj){
this._cleanup();
if(this._cancellationPhase){
return promise.cancel();
}else{
return promise._rejectCallback(result.e,false);
}
}

var value=result.value;
if(result.done===true){
this._cleanup();
if(this._cancellationPhase){
return promise.cancel();
}else{
return promise._resolveCallback(value);
}
}else{
var maybePromise=tryConvertToPromise(value,this._promise);
if(!(maybePromise instanceof Promise)){
maybePromise=
promiseFromYieldHandler(maybePromise,
this._yieldHandlers,
this._promise);
if(maybePromise===null){
this._promiseRejected(
new TypeError(
"A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s",String(value))+
"From coroutine:\n"+
this._stack.split("\n").slice(1,-7).join("\n")));


return;
}
}
maybePromise=maybePromise._target();
var bitField=maybePromise._bitField;
;
if((bitField&50397184)===0){
this._yieldedPromise=maybePromise;
maybePromise._proxy(this,null);
}else if((bitField&33554432)!==0){
Promise._async.invoke(
this._promiseFulfilled,this,maybePromise._value());

}else if((bitField&16777216)!==0){
Promise._async.invoke(
this._promiseRejected,this,maybePromise._reason());

}else{
this._promiseCancelled();
}
}
};

Promise.coroutine=function(generatorFunction,options){
if(typeof generatorFunction!=="function"){
throw new TypeError("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
}
var yieldHandler=Object(options).yieldHandler;
var PromiseSpawn$=PromiseSpawn;
var stack=new Error().stack;
return function(){
var generator=generatorFunction.apply(this,arguments);
var spawn=new PromiseSpawn$(undefined,undefined,yieldHandler,
stack);
var ret=spawn.promise();
spawn._generator=generator;
spawn._promiseFulfilled(undefined);
return ret;
};
};

Promise.coroutine.addYieldHandler=function(fn){
if(typeof fn!=="function"){
throw new TypeError("expecting a function but got "+util.classString(fn));
}
yieldHandlers.push(fn);
};

Promise.spawn=function(generatorFunction){
debug.deprecated("Promise.spawn()","Promise.coroutine()");
if(typeof generatorFunction!=="function"){
return apiRejection("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
}
var spawn=new PromiseSpawn(generatorFunction,this);
var ret=spawn.promise();
spawn._run(Promise.spawn);
return ret;
};
};

},{"./errors":12,"./util":36}],17:[function(_dereq_,module,exports){
"use strict";
module.exports=
function(Promise,PromiseArray,tryConvertToPromise,INTERNAL,async,
getDomain){
var util=_dereq_("./util");
var canEvaluate=util.canEvaluate;
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
var reject;

if(!true){
if(canEvaluate){
var thenCallback=function thenCallback(i){
return new Function("value","holder","                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g,i));
};

var promiseSetter=function promiseSetter(i){
return new Function("promise","holder","                           \n\
            'use strict';                                                    \n\
            holder.pIndex = promise;                                         \n\
            ".replace(/Index/g,i));
};

var generateHolderClass=function generateHolderClass(total){
var props=new Array(total);
for(var i=0;i<props.length;++i){
props[i]="this.p"+(i+1);
}
var assignment=props.join(" = ")+" = null;";
var cancellationCode="var promise;\n"+props.map(function(prop){
return"                                                         \n\
                promise = "+prop+";                                      \n\
                if (promise instanceof Promise) {                            \n\
                    promise.cancel();                                        \n\
                }                                                            \n\
            ";
}).join("\n");
var passedArguments=props.join(", ");
var name="Holder$"+total;


var code="return function(tryCatch, errorObj, Promise, async) {    \n\
            'use strict';                                                    \n\
            function [TheName](fn) {                                         \n\
                [TheProperties]                                              \n\
                this.fn = fn;                                                \n\
                this.asyncNeeded = true;                                     \n\
                this.now = 0;                                                \n\
            }                                                                \n\
                                                                             \n\
            [TheName].prototype._callFunction = function(promise) {          \n\
                promise._pushContext();                                      \n\
                var ret = tryCatch(this.fn)([ThePassedArguments]);           \n\
                promise._popContext();                                       \n\
                if (ret === errorObj) {                                      \n\
                    promise._rejectCallback(ret.e, false);                   \n\
                } else {                                                     \n\
                    promise._resolveCallback(ret);                           \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype.checkFulfillment = function(promise) {       \n\
                var now = ++this.now;                                        \n\
                if (now === [TheTotal]) {                                    \n\
                    if (this.asyncNeeded) {                                  \n\
                        async.invoke(this._callFunction, this, promise);     \n\
                    } else {                                                 \n\
                        this._callFunction(promise);                         \n\
                    }                                                        \n\
                                                                             \n\
                }                                                            \n\
            };                                                               \n\
                                                                             \n\
            [TheName].prototype._resultCancelled = function() {              \n\
                [CancellationCode]                                           \n\
            };                                                               \n\
                                                                             \n\
            return [TheName];                                                \n\
        }(tryCatch, errorObj, Promise, async);                               \n\
        ";

code=code.replace(/\[TheName\]/g,name).
replace(/\[TheTotal\]/g,total).
replace(/\[ThePassedArguments\]/g,passedArguments).
replace(/\[TheProperties\]/g,assignment).
replace(/\[CancellationCode\]/g,cancellationCode);

return new Function("tryCatch","errorObj","Promise","async",code)(
tryCatch,errorObj,Promise,async);
};

var holderClasses=[];
var thenCallbacks=[];
var promiseSetters=[];

for(var i=0;i<8;++i){
holderClasses.push(generateHolderClass(i+1));
thenCallbacks.push(thenCallback(i+1));
promiseSetters.push(promiseSetter(i+1));
}

reject=function reject(reason){
this._reject(reason);
};
}}

Promise.join=function(){
var last=arguments.length-1;
var fn;
if(last>0&&typeof arguments[last]==="function"){
fn=arguments[last];
if(!true){
if(last<=8&&canEvaluate){
var ret=new Promise(INTERNAL);
ret._captureStackTrace();
var HolderClass=holderClasses[last-1];
var holder=new HolderClass(fn);
var callbacks=thenCallbacks;

for(var i=0;i<last;++i){
var maybePromise=tryConvertToPromise(arguments[i],ret);
if(maybePromise instanceof Promise){
maybePromise=maybePromise._target();
var bitField=maybePromise._bitField;
;
if((bitField&50397184)===0){
maybePromise._then(callbacks[i],reject,
undefined,ret,holder);
promiseSetters[i](maybePromise,holder);
holder.asyncNeeded=false;
}else if((bitField&33554432)!==0){
callbacks[i].call(ret,
maybePromise._value(),holder);
}else if((bitField&16777216)!==0){
ret._reject(maybePromise._reason());
}else{
ret._cancel();
}
}else{
callbacks[i].call(ret,maybePromise,holder);
}
}

if(!ret._isFateSealed()){
if(holder.asyncNeeded){
var domain=getDomain();
if(domain!==null){
holder.fn=util.domainBind(domain,holder.fn);
}
}
ret._setAsyncGuaranteed();
ret._setOnCancel(holder);
}
return ret;
}
}
}
var args=[].slice.call(arguments);;
if(fn)args.pop();
var ret=new PromiseArray(args).promise();
return fn!==undefined?ret.spread(fn):ret;
};

};

},{"./util":36}],18:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,
PromiseArray,
apiRejection,
tryConvertToPromise,
INTERNAL,
debug){
var getDomain=Promise._getDomain;
var util=_dereq_("./util");
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;
var async=Promise._async;

function MappingPromiseArray(promises,fn,limit,_filter){
this.constructor$(promises);
this._promise._captureStackTrace();
var domain=getDomain();
this._callback=domain===null?fn:util.domainBind(domain,fn);
this._preservedValues=_filter===INTERNAL?
new Array(this.length()):
null;
this._limit=limit;
this._inFlight=0;
this._queue=[];
async.invoke(this._asyncInit,this,undefined);
}
util.inherits(MappingPromiseArray,PromiseArray);

MappingPromiseArray.prototype._asyncInit=function(){
this._init$(undefined,-2);
};

MappingPromiseArray.prototype._init=function(){};

MappingPromiseArray.prototype._promiseFulfilled=function(value,index){
var values=this._values;
var length=this.length();
var preservedValues=this._preservedValues;
var limit=this._limit;

if(index<0){
index=index*-1-1;
values[index]=value;
if(limit>=1){
this._inFlight--;
this._drainQueue();
if(this._isResolved())return true;
}
}else{
if(limit>=1&&this._inFlight>=limit){
values[index]=value;
this._queue.push(index);
return false;
}
if(preservedValues!==null)preservedValues[index]=value;

var promise=this._promise;
var callback=this._callback;
var receiver=promise._boundValue();
promise._pushContext();
var ret=tryCatch(callback).call(receiver,value,index,length);
var promiseCreated=promise._popContext();
debug.checkForgottenReturns(
ret,
promiseCreated,
preservedValues!==null?"Promise.filter":"Promise.map",
promise);

if(ret===errorObj){
this._reject(ret.e);
return true;
}

var maybePromise=tryConvertToPromise(ret,this._promise);
if(maybePromise instanceof Promise){
maybePromise=maybePromise._target();
var bitField=maybePromise._bitField;
;
if((bitField&50397184)===0){
if(limit>=1)this._inFlight++;
values[index]=maybePromise;
maybePromise._proxy(this,(index+1)*-1);
return false;
}else if((bitField&33554432)!==0){
ret=maybePromise._value();
}else if((bitField&16777216)!==0){
this._reject(maybePromise._reason());
return true;
}else{
this._cancel();
return true;
}
}
values[index]=ret;
}
var totalResolved=++this._totalResolved;
if(totalResolved>=length){
if(preservedValues!==null){
this._filter(values,preservedValues);
}else{
this._resolve(values);
}
return true;
}
return false;
};

MappingPromiseArray.prototype._drainQueue=function(){
var queue=this._queue;
var limit=this._limit;
var values=this._values;
while(queue.length>0&&this._inFlight<limit){
if(this._isResolved())return;
var index=queue.pop();
this._promiseFulfilled(values[index],index);
}
};

MappingPromiseArray.prototype._filter=function(booleans,values){
var len=values.length;
var ret=new Array(len);
var j=0;
for(var i=0;i<len;++i){
if(booleans[i])ret[j++]=values[i];
}
ret.length=j;
this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues=function(){
return this._preservedValues;
};

function map(promises,fn,options,_filter){
if(typeof fn!=="function"){
return apiRejection("expecting a function but got "+util.classString(fn));
}

var limit=0;
if(options!==undefined){
if((typeof options==="undefined"?"undefined":_typeof2(options))==="object"&&options!==null){
if(typeof options.concurrency!=="number"){
return Promise.reject(
new TypeError("'concurrency' must be a number but it is "+
util.classString(options.concurrency)));
}
limit=options.concurrency;
}else{
return Promise.reject(new TypeError(
"options argument must be an object but it is "+
util.classString(options)));
}
}
limit=typeof limit==="number"&&
isFinite(limit)&&limit>=1?limit:0;
return new MappingPromiseArray(promises,fn,limit,_filter).promise();
}

Promise.prototype.map=function(fn,options){
return map(this,fn,options,null);
};

Promise.map=function(promises,fn,options,_filter){
return map(promises,fn,options,_filter);
};


};

},{"./util":36}],19:[function(_dereq_,module,exports){
"use strict";
module.exports=
function(Promise,INTERNAL,tryConvertToPromise,apiRejection,debug){
var util=_dereq_("./util");
var tryCatch=util.tryCatch;

Promise.method=function(fn){
if(typeof fn!=="function"){
throw new Promise.TypeError("expecting a function but got "+util.classString(fn));
}
return function(){
var ret=new Promise(INTERNAL);
ret._captureStackTrace();
ret._pushContext();
var value=tryCatch(fn).apply(this,arguments);
var promiseCreated=ret._popContext();
debug.checkForgottenReturns(
value,promiseCreated,"Promise.method",ret);
ret._resolveFromSyncValue(value);
return ret;
};
};

Promise.attempt=Promise["try"]=function(fn){
if(typeof fn!=="function"){
return apiRejection("expecting a function but got "+util.classString(fn));
}
var ret=new Promise(INTERNAL);
ret._captureStackTrace();
ret._pushContext();
var value;
if(arguments.length>1){
debug.deprecated("calling Promise.try with more than 1 argument");
var arg=arguments[1];
var ctx=arguments[2];
value=util.isArray(arg)?tryCatch(fn).apply(ctx,arg):
tryCatch(fn).call(ctx,arg);
}else{
value=tryCatch(fn)();
}
var promiseCreated=ret._popContext();
debug.checkForgottenReturns(
value,promiseCreated,"Promise.try",ret);
ret._resolveFromSyncValue(value);
return ret;
};

Promise.prototype._resolveFromSyncValue=function(value){
if(value===util.errorObj){
this._rejectCallback(value.e,false);
}else{
this._resolveCallback(value,true);
}
};
};

},{"./util":36}],20:[function(_dereq_,module,exports){
"use strict";
var util=_dereq_("./util");
var maybeWrapAsError=util.maybeWrapAsError;
var errors=_dereq_("./errors");
var OperationalError=errors.OperationalError;
var es5=_dereq_("./es5");

function isUntypedError(obj){
return obj instanceof Error&&
es5.getPrototypeOf(obj)===Error.prototype;
}

var rErrorKey=/^(?:name|message|stack|cause)$/;
function wrapAsOperationalError(obj){
var ret;
if(isUntypedError(obj)){
ret=new OperationalError(obj);
ret.name=obj.name;
ret.message=obj.message;
ret.stack=obj.stack;
var keys=es5.keys(obj);
for(var i=0;i<keys.length;++i){
var key=keys[i];
if(!rErrorKey.test(key)){
ret[key]=obj[key];
}
}
return ret;
}
util.markAsOriginatingFromRejection(obj);
return obj;
}

function nodebackForPromise(promise,multiArgs){
return function(err,value){
if(promise===null)return;
if(err){
var wrapped=wrapAsOperationalError(maybeWrapAsError(err));
promise._attachExtraTrace(wrapped);
promise._reject(wrapped);
}else if(!multiArgs){
promise._fulfill(value);
}else{
var args=[].slice.call(arguments,1);;
promise._fulfill(args);
}
promise=null;
};
}

module.exports=nodebackForPromise;

},{"./errors":12,"./es5":13,"./util":36}],21:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise){
var util=_dereq_("./util");
var async=Promise._async;
var tryCatch=util.tryCatch;
var errorObj=util.errorObj;

function spreadAdapter(val,nodeback){
var promise=this;
if(!util.isArray(val))return successAdapter.call(promise,val,nodeback);
var ret=
tryCatch(nodeback).apply(promise._boundValue(),[null].concat(val));
if(ret===errorObj){
async.throwLater(ret.e);
}
}

function successAdapter(val,nodeback){
var promise=this;
var receiver=promise._boundValue();
var ret=val===undefined?
tryCatch(nodeback).call(receiver,null):
tryCatch(nodeback).call(receiver,null,val);
if(ret===errorObj){
async.throwLater(ret.e);
}
}
function errorAdapter(reason,nodeback){
var promise=this;
if(!reason){
var newReason=new Error(reason+"");
newReason.cause=reason;
reason=newReason;
}
var ret=tryCatch(nodeback).call(promise._boundValue(),reason);
if(ret===errorObj){
async.throwLater(ret.e);
}
}

Promise.prototype.asCallback=Promise.prototype.nodeify=function(nodeback,
options){
if(typeof nodeback=="function"){
var adapter=successAdapter;
if(options!==undefined&&Object(options).spread){
adapter=spreadAdapter;
}
this._then(
adapter,
errorAdapter,
undefined,
this,
nodeback);

}
return this;
};
};

},{"./util":36}],22:[function(_dereq_,module,exports){
"use strict";
module.exports=function(){
var makeSelfResolutionError=function makeSelfResolutionError(){
return new TypeError("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
};
var reflectHandler=function reflectHandler(){
return new Promise.PromiseInspection(this._target());
};
var apiRejection=function apiRejection(msg){
return Promise.reject(new TypeError(msg));
};
function Proxyable(){}
var UNDEFINED_BINDING={};
var util=_dereq_("./util");

var getDomain;
if(util.isNode){
getDomain=function getDomain(){
var ret=process.domain;
if(ret===undefined)ret=null;
return ret;
};
}else{
getDomain=function getDomain(){
return null;
};
}
util.notEnumerableProp(Promise,"_getDomain",getDomain);

var es5=_dereq_("./es5");
var Async=_dereq_("./async");
var async=new Async();
es5.defineProperty(Promise,"_async",{value:async});
var errors=_dereq_("./errors");
var TypeError=Promise.TypeError=errors.TypeError;
Promise.RangeError=errors.RangeError;
var CancellationError=Promise.CancellationError=errors.CancellationError;
Promise.TimeoutError=errors.TimeoutError;
Promise.OperationalError=errors.OperationalError;
Promise.RejectionError=errors.OperationalError;
Promise.AggregateError=errors.AggregateError;
var INTERNAL=function INTERNAL(){};
var APPLY={};
var NEXT_FILTER={};
var tryConvertToPromise=_dereq_("./thenables")(Promise,INTERNAL);
var PromiseArray=
_dereq_("./promise_array")(Promise,INTERNAL,
tryConvertToPromise,apiRejection,Proxyable);
var Context=_dereq_("./context")(Promise);

var createContext=Context.create;
var debug=_dereq_("./debuggability")(Promise,Context);
var CapturedTrace=debug.CapturedTrace;
var PassThroughHandlerContext=
_dereq_("./finally")(Promise,tryConvertToPromise,NEXT_FILTER);
var catchFilter=_dereq_("./catch_filter")(NEXT_FILTER);
var nodebackForPromise=_dereq_("./nodeback");
var errorObj=util.errorObj;
var tryCatch=util.tryCatch;
function check(self,executor){
if(self==null||self.constructor!==Promise){
throw new TypeError("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
}
if(typeof executor!=="function"){
throw new TypeError("expecting a function but got "+util.classString(executor));
}

}

function Promise(executor){
if(executor!==INTERNAL){
check(this,executor);
}
this._bitField=0;
this._fulfillmentHandler0=undefined;
this._rejectionHandler0=undefined;
this._promise0=undefined;
this._receiver0=undefined;
this._resolveFromExecutor(executor);
this._promiseCreated();
this._fireEvent("promiseCreated",this);
}

Promise.prototype.toString=function(){
return"[object Promise]";
};

Promise.prototype.caught=Promise.prototype["catch"]=function(fn){
var len=arguments.length;
if(len>1){
var catchInstances=new Array(len-1),
j=0,i;
for(i=0;i<len-1;++i){
var item=arguments[i];
if(util.isObject(item)){
catchInstances[j++]=item;
}else{
return apiRejection("Catch statement predicate: "+
"expecting an object but got "+util.classString(item));
}
}
catchInstances.length=j;
fn=arguments[i];
return this.then(undefined,catchFilter(catchInstances,fn,this));
}
return this.then(undefined,fn);
};

Promise.prototype.reflect=function(){
return this._then(reflectHandler,
reflectHandler,undefined,this,undefined);
};

Promise.prototype.then=function(didFulfill,didReject){
if(debug.warnings()&&arguments.length>0&&
typeof didFulfill!=="function"&&
typeof didReject!=="function"){
var msg=".then() only accepts functions but was passed: "+
util.classString(didFulfill);
if(arguments.length>1){
msg+=", "+util.classString(didReject);
}
this._warn(msg);
}
return this._then(didFulfill,didReject,undefined,undefined,undefined);
};

Promise.prototype.done=function(didFulfill,didReject){
var promise=
this._then(didFulfill,didReject,undefined,undefined,undefined);
promise._setIsFinal();
};

Promise.prototype.spread=function(fn){
if(typeof fn!=="function"){
return apiRejection("expecting a function but got "+util.classString(fn));
}
return this.all()._then(fn,undefined,undefined,APPLY,undefined);
};

Promise.prototype.toJSON=function(){
var ret={
isFulfilled:false,
isRejected:false,
fulfillmentValue:undefined,
rejectionReason:undefined};

if(this.isFulfilled()){
ret.fulfillmentValue=this.value();
ret.isFulfilled=true;
}else if(this.isRejected()){
ret.rejectionReason=this.reason();
ret.isRejected=true;
}
return ret;
};

Promise.prototype.all=function(){
if(arguments.length>0){
this._warn(".all() was passed arguments but it does not take any");
}
return new PromiseArray(this).promise();
};

Promise.prototype.error=function(fn){
return this.caught(util.originatesFromRejection,fn);
};

Promise.getNewLibraryCopy=module.exports;

Promise.is=function(val){
return val instanceof Promise;
};

Promise.fromNode=Promise.fromCallback=function(fn){
var ret=new Promise(INTERNAL);
ret._captureStackTrace();
var multiArgs=arguments.length>1?!!Object(arguments[1]).multiArgs:
false;
var result=tryCatch(fn)(nodebackForPromise(ret,multiArgs));
if(result===errorObj){
ret._rejectCallback(result.e,true);
}
if(!ret._isFateSealed())ret._setAsyncGuaranteed();
return ret;
};

Promise.all=function(promises){
return new PromiseArray(promises).promise();
};

Promise.cast=function(obj){
var ret=tryConvertToPromise(obj);
if(!(ret instanceof Promise)){
ret=new Promise(INTERNAL);
ret._captureStackTrace();
ret._setFulfilled();
ret._rejectionHandler0=obj;
}
return ret;
};

Promise.resolve=Promise.fulfilled=Promise.cast;

Promise.reject=Promise.rejected=function(reason){
var ret=new Promise(INTERNAL);
ret._captureStackTrace();
ret._rejectCallback(reason,true);
return ret;
};

Promise.setScheduler=function(fn){
if(typeof fn!=="function"){
throw new TypeError("expecting a function but got "+util.classString(fn));
}
return async.setScheduler(fn);
};

Promise.prototype._then=function(
didFulfill,
didReject,
_,receiver,
internalData)
{
var haveInternalData=internalData!==undefined;
var promise=haveInternalData?internalData:new Promise(INTERNAL);
var target=this._target();
var bitField=target._bitField;

if(!haveInternalData){
promise._propagateFrom(this,3);
promise._captureStackTrace();
if(receiver===undefined&&
(this._bitField&2097152)!==0){
if(!((bitField&50397184)===0)){
receiver=this._boundValue();
}else{
receiver=target===this?undefined:this._boundTo;
}
}
this._fireEvent("promiseChained",this,promise);
}

var domain=getDomain();
if(!((bitField&50397184)===0)){
var handler,value,settler=target._settlePromiseCtx;
if((bitField&33554432)!==0){
value=target._rejectionHandler0;
handler=didFulfill;
}else if((bitField&16777216)!==0){
value=target._fulfillmentHandler0;
handler=didReject;
target._unsetRejectionIsUnhandled();
}else{
settler=target._settlePromiseLateCancellationObserver;
value=new CancellationError("late cancellation observer");
target._attachExtraTrace(value);
handler=didReject;
}

async.invoke(settler,target,{
handler:domain===null?handler:
typeof handler==="function"&&
util.domainBind(domain,handler),
promise:promise,
receiver:receiver,
value:value});

}else{
target._addCallbacks(didFulfill,didReject,promise,receiver,domain);
}

return promise;
};

Promise.prototype._length=function(){
return this._bitField&65535;
};

Promise.prototype._isFateSealed=function(){
return(this._bitField&117506048)!==0;
};

Promise.prototype._isFollowing=function(){
return(this._bitField&67108864)===67108864;
};

Promise.prototype._setLength=function(len){
this._bitField=this._bitField&-65536|
len&65535;
};

Promise.prototype._setFulfilled=function(){
this._bitField=this._bitField|33554432;
this._fireEvent("promiseFulfilled",this);
};

Promise.prototype._setRejected=function(){
this._bitField=this._bitField|16777216;
this._fireEvent("promiseRejected",this);
};

Promise.prototype._setFollowing=function(){
this._bitField=this._bitField|67108864;
this._fireEvent("promiseResolved",this);
};

Promise.prototype._setIsFinal=function(){
this._bitField=this._bitField|4194304;
};

Promise.prototype._isFinal=function(){
return(this._bitField&4194304)>0;
};

Promise.prototype._unsetCancelled=function(){
this._bitField=this._bitField&~65536;
};

Promise.prototype._setCancelled=function(){
this._bitField=this._bitField|65536;
this._fireEvent("promiseCancelled",this);
};

Promise.prototype._setWillBeCancelled=function(){
this._bitField=this._bitField|8388608;
};

Promise.prototype._setAsyncGuaranteed=function(){
if(async.hasCustomScheduler())return;
this._bitField=this._bitField|134217728;
};

Promise.prototype._receiverAt=function(index){
var ret=index===0?this._receiver0:this[
index*4-4+3];
if(ret===UNDEFINED_BINDING){
return undefined;
}else if(ret===undefined&&this._isBound()){
return this._boundValue();
}
return ret;
};

Promise.prototype._promiseAt=function(index){
return this[
index*4-4+2];
};

Promise.prototype._fulfillmentHandlerAt=function(index){
return this[
index*4-4+0];
};

Promise.prototype._rejectionHandlerAt=function(index){
return this[
index*4-4+1];
};

Promise.prototype._boundValue=function(){};

Promise.prototype._migrateCallback0=function(follower){
var bitField=follower._bitField;
var fulfill=follower._fulfillmentHandler0;
var reject=follower._rejectionHandler0;
var promise=follower._promise0;
var receiver=follower._receiverAt(0);
if(receiver===undefined)receiver=UNDEFINED_BINDING;
this._addCallbacks(fulfill,reject,promise,receiver,null);
};

Promise.prototype._migrateCallbackAt=function(follower,index){
var fulfill=follower._fulfillmentHandlerAt(index);
var reject=follower._rejectionHandlerAt(index);
var promise=follower._promiseAt(index);
var receiver=follower._receiverAt(index);
if(receiver===undefined)receiver=UNDEFINED_BINDING;
this._addCallbacks(fulfill,reject,promise,receiver,null);
};

Promise.prototype._addCallbacks=function(
fulfill,
reject,
promise,
receiver,
domain)
{
var index=this._length();

if(index>=65535-4){
index=0;
this._setLength(0);
}

if(index===0){
this._promise0=promise;
this._receiver0=receiver;
if(typeof fulfill==="function"){
this._fulfillmentHandler0=
domain===null?fulfill:util.domainBind(domain,fulfill);
}
if(typeof reject==="function"){
this._rejectionHandler0=
domain===null?reject:util.domainBind(domain,reject);
}
}else{
var base=index*4-4;
this[base+2]=promise;
this[base+3]=receiver;
if(typeof fulfill==="function"){
this[base+0]=
domain===null?fulfill:util.domainBind(domain,fulfill);
}
if(typeof reject==="function"){
this[base+1]=
domain===null?reject:util.domainBind(domain,reject);
}
}
this._setLength(index+1);
return index;
};

Promise.prototype._proxy=function(proxyable,arg){
this._addCallbacks(undefined,undefined,arg,proxyable,null);
};

Promise.prototype._resolveCallback=function(value,shouldBind){
if((this._bitField&117506048)!==0)return;
if(value===this)
return this._rejectCallback(makeSelfResolutionError(),false);
var maybePromise=tryConvertToPromise(value,this);
if(!(maybePromise instanceof Promise))return this._fulfill(value);

if(shouldBind)this._propagateFrom(maybePromise,2);

var promise=maybePromise._target();

if(promise===this){
this._reject(makeSelfResolutionError());
return;
}

var bitField=promise._bitField;
if((bitField&50397184)===0){
var len=this._length();
if(len>0)promise._migrateCallback0(this);
for(var i=1;i<len;++i){
promise._migrateCallbackAt(this,i);
}
this._setFollowing();
this._setLength(0);
this._setFollowee(promise);
}else if((bitField&33554432)!==0){
this._fulfill(promise._value());
}else if((bitField&16777216)!==0){
this._reject(promise._reason());
}else{
var reason=new CancellationError("late cancellation observer");
promise._attachExtraTrace(reason);
this._reject(reason);
}
};

Promise.prototype._rejectCallback=
function(reason,synchronous,ignoreNonErrorWarnings){
var trace=util.ensureErrorObject(reason);
var hasStack=trace===reason;
if(!hasStack&&!ignoreNonErrorWarnings&&debug.warnings()){
var message="a promise was rejected with a non-error: "+
util.classString(reason);
this._warn(message,true);
}
this._attachExtraTrace(trace,synchronous?hasStack:false);
this._reject(reason);
};

Promise.prototype._resolveFromExecutor=function(executor){
if(executor===INTERNAL)return;
var promise=this;
this._captureStackTrace();
this._pushContext();
var synchronous=true;
var r=this._execute(executor,function(value){
promise._resolveCallback(value);
},function(reason){
promise._rejectCallback(reason,synchronous);
});
synchronous=false;
this._popContext();

if(r!==undefined){
promise._rejectCallback(r,true);
}
};

Promise.prototype._settlePromiseFromHandler=function(
handler,receiver,value,promise)
{
var bitField=promise._bitField;
if((bitField&65536)!==0)return;
promise._pushContext();
var x;
if(receiver===APPLY){
if(!value||typeof value.length!=="number"){
x=errorObj;
x.e=new TypeError("cannot .spread() a non-array: "+
util.classString(value));
}else{
x=tryCatch(handler).apply(this._boundValue(),value);
}
}else{
x=tryCatch(handler).call(receiver,value);
}
var promiseCreated=promise._popContext();
bitField=promise._bitField;
if((bitField&65536)!==0)return;

if(x===NEXT_FILTER){
promise._reject(value);
}else if(x===errorObj){
promise._rejectCallback(x.e,false);
}else{
debug.checkForgottenReturns(x,promiseCreated,"",promise,this);
promise._resolveCallback(x);
}
};

Promise.prototype._target=function(){
var ret=this;
while(ret._isFollowing()){ret=ret._followee();}
return ret;
};

Promise.prototype._followee=function(){
return this._rejectionHandler0;
};

Promise.prototype._setFollowee=function(promise){
this._rejectionHandler0=promise;
};

Promise.prototype._settlePromise=function(promise,handler,receiver,value){
var isPromise=promise instanceof Promise;
var bitField=this._bitField;
var asyncGuaranteed=(bitField&134217728)!==0;
if((bitField&65536)!==0){
if(isPromise)promise._invokeInternalOnCancel();

if(receiver instanceof PassThroughHandlerContext&&
receiver.isFinallyHandler()){
receiver.cancelPromise=promise;
if(tryCatch(handler).call(receiver,value)===errorObj){
promise._reject(errorObj.e);
}
}else if(handler===reflectHandler){
promise._fulfill(reflectHandler.call(receiver));
}else if(receiver instanceof Proxyable){
receiver._promiseCancelled(promise);
}else if(isPromise||promise instanceof PromiseArray){
promise._cancel();
}else{
receiver.cancel();
}
}else if(typeof handler==="function"){
if(!isPromise){
handler.call(receiver,value,promise);
}else{
if(asyncGuaranteed)promise._setAsyncGuaranteed();
this._settlePromiseFromHandler(handler,receiver,value,promise);
}
}else if(receiver instanceof Proxyable){
if(!receiver._isResolved()){
if((bitField&33554432)!==0){
receiver._promiseFulfilled(value,promise);
}else{
receiver._promiseRejected(value,promise);
}
}
}else if(isPromise){
if(asyncGuaranteed)promise._setAsyncGuaranteed();
if((bitField&33554432)!==0){
promise._fulfill(value);
}else{
promise._reject(value);
}
}
};

Promise.prototype._settlePromiseLateCancellationObserver=function(ctx){
var handler=ctx.handler;
var promise=ctx.promise;
var receiver=ctx.receiver;
var value=ctx.value;
if(typeof handler==="function"){
if(!(promise instanceof Promise)){
handler.call(receiver,value,promise);
}else{
this._settlePromiseFromHandler(handler,receiver,value,promise);
}
}else if(promise instanceof Promise){
promise._reject(value);
}
};

Promise.prototype._settlePromiseCtx=function(ctx){
this._settlePromise(ctx.promise,ctx.handler,ctx.receiver,ctx.value);
};

Promise.prototype._settlePromise0=function(handler,value,bitField){
var promise=this._promise0;
var receiver=this._receiverAt(0);
this._promise0=undefined;
this._receiver0=undefined;
this._settlePromise(promise,handler,receiver,value);
};

Promise.prototype._clearCallbackDataAtIndex=function(index){
var base=index*4-4;
this[base+2]=
this[base+3]=
this[base+0]=
this[base+1]=undefined;
};

Promise.prototype._fulfill=function(value){
var bitField=this._bitField;
if((bitField&117506048)>>>16)return;
if(value===this){
var err=makeSelfResolutionError();
this._attachExtraTrace(err);
return this._reject(err);
}
this._setFulfilled();
this._rejectionHandler0=value;

if((bitField&65535)>0){
if((bitField&134217728)!==0){
this._settlePromises();
}else{
async.settlePromises(this);
}
}
};

Promise.prototype._reject=function(reason){
var bitField=this._bitField;
if((bitField&117506048)>>>16)return;
this._setRejected();
this._fulfillmentHandler0=reason;

if(this._isFinal()){
return async.fatalError(reason,util.isNode);
}

if((bitField&65535)>0){
async.settlePromises(this);
}else{
this._ensurePossibleRejectionHandled();
}
};

Promise.prototype._fulfillPromises=function(len,value){
for(var i=1;i<len;i++){
var handler=this._fulfillmentHandlerAt(i);
var promise=this._promiseAt(i);
var receiver=this._receiverAt(i);
this._clearCallbackDataAtIndex(i);
this._settlePromise(promise,handler,receiver,value);
}
};

Promise.prototype._rejectPromises=function(len,reason){
for(var i=1;i<len;i++){
var handler=this._rejectionHandlerAt(i);
var promise=this._promiseAt(i);
var receiver=this._receiverAt(i);
this._clearCallbackDataAtIndex(i);
this._settlePromise(promise,handler,receiver,reason);
}
};

Promise.prototype._settlePromises=function(){
var bitField=this._bitField;
var len=bitField&65535;

if(len>0){
if((bitField&16842752)!==0){
var reason=this._fulfillmentHandler0;
this._settlePromise0(this._rejectionHandler0,reason,bitField);
this._rejectPromises(len,reason);
}else{
var value=this._rejectionHandler0;
this._settlePromise0(this._fulfillmentHandler0,value,bitField);
this._fulfillPromises(len,value);
}
this._setLength(0);
}
this._clearCancellationData();
};

Promise.prototype._settledValue=function(){
var bitField=this._bitField;
if((bitField&33554432)!==0){
return this._rejectionHandler0;
}else if((bitField&16777216)!==0){
return this._fulfillmentHandler0;
}
};

function deferResolve(v){this.promise._resolveCallback(v);}
function deferReject(v){this.promise._rejectCallback(v,false);}

Promise.defer=Promise.pending=function(){
debug.deprecated("Promise.defer","new Promise");
var promise=new Promise(INTERNAL);
return{
promise:promise,
resolve:deferResolve,
reject:deferReject};

};

util.notEnumerableProp(Promise,
"_makeSelfResolutionError",
makeSelfResolutionError);

_dereq_("./method")(Promise,INTERNAL,tryConvertToPromise,apiRejection,
debug);
_dereq_("./bind")(Promise,INTERNAL,tryConvertToPromise,debug);
_dereq_("./cancel")(Promise,PromiseArray,apiRejection,debug);
_dereq_("./direct_resolve")(Promise);
_dereq_("./synchronous_inspection")(Promise);
_dereq_("./join")(
Promise,PromiseArray,tryConvertToPromise,INTERNAL,async,getDomain);
Promise.Promise=Promise;
Promise.version="3.5.0";
_dereq_('./map.js')(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug);
_dereq_('./call_get.js')(Promise);
_dereq_('./using.js')(Promise,apiRejection,tryConvertToPromise,createContext,INTERNAL,debug);
_dereq_('./timers.js')(Promise,INTERNAL,debug);
_dereq_('./generators.js')(Promise,apiRejection,INTERNAL,tryConvertToPromise,Proxyable,debug);
_dereq_('./nodeify.js')(Promise);
_dereq_('./promisify.js')(Promise,INTERNAL);
_dereq_('./props.js')(Promise,PromiseArray,tryConvertToPromise,apiRejection);
_dereq_('./race.js')(Promise,INTERNAL,tryConvertToPromise,apiRejection);
_dereq_('./reduce.js')(Promise,PromiseArray,apiRejection,tryConvertToPromise,INTERNAL,debug);
_dereq_('./settle.js')(Promise,PromiseArray,debug);
_dereq_('./some.js')(Promise,PromiseArray,apiRejection);
_dereq_('./filter.js')(Promise,INTERNAL);
_dereq_('./each.js')(Promise,INTERNAL);
_dereq_('./any.js')(Promise);

util.toFastProperties(Promise);
util.toFastProperties(Promise.prototype);
function fillTypes(value){
var p=new Promise(INTERNAL);
p._fulfillmentHandler0=value;
p._rejectionHandler0=value;
p._promise0=value;
p._receiver0=value;
}


fillTypes({a:1});
fillTypes({b:2});
fillTypes({c:3});
fillTypes(1);
fillTypes(function(){});
fillTypes(undefined);
fillTypes(false);
fillTypes(new Promise(INTERNAL));
debug.setBounds(Async.firstLineError,util.lastLineError);
return Promise;

};

},{"./any.js":1,"./async":2,"./bind":3,"./call_get.js":5,"./cancel":6,"./catch_filter":7,"./context":8,"./debuggability":9,"./direct_resolve":10,"./each.js":11,"./errors":12,"./es5":13,"./filter.js":14,"./finally":15,"./generators.js":16,"./join":17,"./map.js":18,"./method":19,"./nodeback":20,"./nodeify.js":21,"./promise_array":23,"./promisify.js":24,"./props.js":25,"./race.js":27,"./reduce.js":28,"./settle.js":30,"./some.js":31,"./synchronous_inspection":32,"./thenables":33,"./timers.js":34,"./using.js":35,"./util":36}],23:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,INTERNAL,tryConvertToPromise,
apiRejection,Proxyable){
var util=_dereq_("./util");
var isArray=util.isArray;

function toResolutionValue(val){
switch(val){
case-2:return[];
case-3:return{};
case-6:return new Map();}

}

function PromiseArray(values){
var promise=this._promise=new Promise(INTERNAL);
if(values instanceof Promise){
promise._propagateFrom(values,3);
}
promise._setOnCancel(this);
this._values=values;
this._length=0;
this._totalResolved=0;
this._init(undefined,-2);
}
util.inherits(PromiseArray,Proxyable);

PromiseArray.prototype.length=function(){
return this._length;
};

PromiseArray.prototype.promise=function(){
return this._promise;
};

PromiseArray.prototype._init=function init(_,resolveValueIfEmpty){
var values=tryConvertToPromise(this._values,this._promise);
if(values instanceof Promise){
values=values._target();
var bitField=values._bitField;
;
this._values=values;

if((bitField&50397184)===0){
this._promise._setAsyncGuaranteed();
return values._then(
init,
this._reject,
undefined,
this,
resolveValueIfEmpty);

}else if((bitField&33554432)!==0){
values=values._value();
}else if((bitField&16777216)!==0){
return this._reject(values._reason());
}else{
return this._cancel();
}
}
values=util.asArray(values);
if(values===null){
var err=apiRejection(
"expecting an array or an iterable object but got "+util.classString(values)).reason();
this._promise._rejectCallback(err,false);
return;
}

if(values.length===0){
if(resolveValueIfEmpty===-5){
this._resolveEmptyArray();
}else
{
this._resolve(toResolutionValue(resolveValueIfEmpty));
}
return;
}
this._iterate(values);
};

PromiseArray.prototype._iterate=function(values){
var len=this.getActualLength(values.length);
this._length=len;
this._values=this.shouldCopyValues()?new Array(len):this._values;
var result=this._promise;
var isResolved=false;
var bitField=null;
for(var i=0;i<len;++i){
var maybePromise=tryConvertToPromise(values[i],result);

if(maybePromise instanceof Promise){
maybePromise=maybePromise._target();
bitField=maybePromise._bitField;
}else{
bitField=null;
}

if(isResolved){
if(bitField!==null){
maybePromise.suppressUnhandledRejections();
}
}else if(bitField!==null){
if((bitField&50397184)===0){
maybePromise._proxy(this,i);
this._values[i]=maybePromise;
}else if((bitField&33554432)!==0){
isResolved=this._promiseFulfilled(maybePromise._value(),i);
}else if((bitField&16777216)!==0){
isResolved=this._promiseRejected(maybePromise._reason(),i);
}else{
isResolved=this._promiseCancelled(i);
}
}else{
isResolved=this._promiseFulfilled(maybePromise,i);
}
}
if(!isResolved)result._setAsyncGuaranteed();
};

PromiseArray.prototype._isResolved=function(){
return this._values===null;
};

PromiseArray.prototype._resolve=function(value){
this._values=null;
this._promise._fulfill(value);
};

PromiseArray.prototype._cancel=function(){
if(this._isResolved()||!this._promise._isCancellable())return;
this._values=null;
this._promise._cancel();
};

PromiseArray.prototype._reject=function(reason){
this._values=null;
this._promise._rejectCallback(reason,false);
};

PromiseArray.prototype._promiseFulfilled=function(value,index){
this._values[index]=value;
var totalResolved=++this._totalResolved;
if(totalResolved>=this._length){
this._resolve(this._values);
return true;
}
return false;
};

PromiseArray.prototype._promiseCancelled=function(){
this._cancel();
return true;
};

PromiseArray.prototype._promiseRejected=function(reason){
this._totalResolved++;
this._reject(reason);
return true;
};

PromiseArray.prototype._resultCancelled=function(){
if(this._isResolved())return;
var values=this._values;
this._cancel();
if(values instanceof Promise){
values.cancel();
}else{
for(var i=0;i<values.length;++i){
if(values[i]instanceof Promise){
values[i].cancel();
}
}
}
};

PromiseArray.prototype.shouldCopyValues=function(){
return true;
};

PromiseArray.prototype.getActualLength=function(len){
return len;
};

return PromiseArray;
};

},{"./util":36}],24:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,INTERNAL){
var THIS={};
var util=_dereq_("./util");
var nodebackForPromise=_dereq_("./nodeback");
var withAppended=util.withAppended;
var maybeWrapAsError=util.maybeWrapAsError;
var canEvaluate=util.canEvaluate;
var TypeError=_dereq_("./errors").TypeError;
var defaultSuffix="Async";
var defaultPromisified={__isPromisified__:true};
var noCopyProps=[
"arity","length",
"name",
"arguments",
"caller",
"callee",
"prototype",
"__isPromisified__"];

var noCopyPropsPattern=new RegExp("^(?:"+noCopyProps.join("|")+")$");

var defaultFilter=function defaultFilter(name){
return util.isIdentifier(name)&&
name.charAt(0)!=="_"&&
name!=="constructor";
};

function propsFilter(key){
return!noCopyPropsPattern.test(key);
}

function isPromisified(fn){
try{
return fn.__isPromisified__===true;
}
catch(e){
return false;
}
}

function hasPromisified(obj,key,suffix){
var val=util.getDataPropertyOrDefault(obj,key+suffix,
defaultPromisified);
return val?isPromisified(val):false;
}
function checkValid(ret,suffix,suffixRegexp){
for(var i=0;i<ret.length;i+=2){
var key=ret[i];
if(suffixRegexp.test(key)){
var keyWithoutAsyncSuffix=key.replace(suffixRegexp,"");
for(var j=0;j<ret.length;j+=2){
if(ret[j]===keyWithoutAsyncSuffix){
throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".
replace("%s",suffix));
}
}
}
}
}

function promisifiableMethods(obj,suffix,suffixRegexp,filter){
var keys=util.inheritedDataKeys(obj);
var ret=[];
for(var i=0;i<keys.length;++i){
var key=keys[i];
var value=obj[key];
var passesDefaultFilter=filter===defaultFilter?
true:defaultFilter(key,value,obj);
if(typeof value==="function"&&
!isPromisified(value)&&
!hasPromisified(obj,key,suffix)&&
filter(key,value,obj,passesDefaultFilter)){
ret.push(key,value);
}
}
checkValid(ret,suffix,suffixRegexp);
return ret;
}

var escapeIdentRegex=function escapeIdentRegex(str){
return str.replace(/([$])/,"\\$");
};

var makeNodePromisifiedEval;
if(!true){
var switchCaseArgumentOrder=function switchCaseArgumentOrder(likelyArgumentCount){
var ret=[likelyArgumentCount];
var min=Math.max(0,likelyArgumentCount-1-3);
for(var i=likelyArgumentCount-1;i>=min;--i){
ret.push(i);
}
for(var i=likelyArgumentCount+1;i<=3;++i){
ret.push(i);
}
return ret;
};

var argumentSequence=function argumentSequence(argumentCount){
return util.filledRange(argumentCount,"_arg","");
};

var parameterDeclaration=function parameterDeclaration(parameterCount){
return util.filledRange(
Math.max(parameterCount,3),"_arg","");
};

var parameterCount=function parameterCount(fn){
if(typeof fn.length==="number"){
return Math.max(Math.min(fn.length,1023+1),0);
}
return 0;
};

makeNodePromisifiedEval=
function makeNodePromisifiedEval(callback,receiver,originalName,fn,_,multiArgs){
var newParameterCount=Math.max(0,parameterCount(fn)-1);
var argumentOrder=switchCaseArgumentOrder(newParameterCount);
var shouldProxyThis=typeof callback==="string"||receiver===THIS;

function generateCallForArgumentCount(count){
var args=argumentSequence(count).join(", ");
var comma=count>0?", ":"";
var ret;
if(shouldProxyThis){
ret="ret = callback.call(this, {{args}}, nodeback); break;\n";
}else{
ret=receiver===undefined?
"ret = callback({{args}}, nodeback); break;\n":
"ret = callback.call(receiver, {{args}}, nodeback); break;\n";
}
return ret.replace("{{args}}",args).replace(", ",comma);
}

function generateArgumentSwitchCase(){
var ret="";
for(var i=0;i<argumentOrder.length;++i){
ret+="case "+argumentOrder[i]+":"+
generateCallForArgumentCount(argumentOrder[i]);
}

ret+="                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = nodeback;                                              \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]",shouldProxyThis?
"ret = callback.apply(this, args);\n":
"ret = callback.apply(receiver, args);\n");
return ret;
}

var getFunctionCode=typeof callback==="string"?
"this != null ? this['"+callback+"'] : fn":
"fn";
var body="'use strict';                                                \n\
        var ret = function (Parameters) {                                    \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._captureStackTrace();                                    \n\
            var nodeback = nodebackForPromise(promise, "+multiArgs+");   \n\
            var ret;                                                         \n\
            var callback = tryCatch([GetFunctionCode]);                      \n\
            switch(len) {                                                    \n\
                [CodeForSwitchCase]                                          \n\
            }                                                                \n\
            if (ret === errorObj) {                                          \n\
                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
            }                                                                \n\
            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
            return promise;                                                  \n\
        };                                                                   \n\
        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
        return ret;                                                          \n\
    ".replace("[CodeForSwitchCase]",generateArgumentSwitchCase()).
replace("[GetFunctionCode]",getFunctionCode);
body=body.replace("Parameters",parameterDeclaration(newParameterCount));
return new Function("Promise",
"fn",
"receiver",
"withAppended",
"maybeWrapAsError",
"nodebackForPromise",
"tryCatch",
"errorObj",
"notEnumerableProp",
"INTERNAL",
body)(
Promise,
fn,
receiver,
withAppended,
maybeWrapAsError,
nodebackForPromise,
util.tryCatch,
util.errorObj,
util.notEnumerableProp,
INTERNAL);
};
}

function makeNodePromisifiedClosure(callback,receiver,_,fn,__,multiArgs){
var defaultThis=function(){return this;}();
var method=callback;
if(typeof method==="string"){
callback=fn;
}
function promisified(){
var _receiver=receiver;
if(receiver===THIS)_receiver=this;
var promise=new Promise(INTERNAL);
promise._captureStackTrace();
var cb=typeof method==="string"&&this!==defaultThis?
this[method]:callback;
var fn=nodebackForPromise(promise,multiArgs);
try{
cb.apply(_receiver,withAppended(arguments,fn));
}catch(e){
promise._rejectCallback(maybeWrapAsError(e),true,true);
}
if(!promise._isFateSealed())promise._setAsyncGuaranteed();
return promise;
}
util.notEnumerableProp(promisified,"__isPromisified__",true);
return promisified;
}

var makeNodePromisified=canEvaluate?
makeNodePromisifiedEval:
makeNodePromisifiedClosure;

function promisifyAll(obj,suffix,filter,promisifier,multiArgs){
var suffixRegexp=new RegExp(escapeIdentRegex(suffix)+"$");
var methods=
promisifiableMethods(obj,suffix,suffixRegexp,filter);

for(var i=0,len=methods.length;i<len;i+=2){
var key=methods[i];
var fn=methods[i+1];
var promisifiedKey=key+suffix;
if(promisifier===makeNodePromisified){
obj[promisifiedKey]=
makeNodePromisified(key,THIS,key,fn,suffix,multiArgs);
}else{
var promisified=promisifier(fn,function(){
return makeNodePromisified(key,THIS,key,
fn,suffix,multiArgs);
});
util.notEnumerableProp(promisified,"__isPromisified__",true);
obj[promisifiedKey]=promisified;
}
}
util.toFastProperties(obj);
return obj;
}

function promisify(callback,receiver,multiArgs){
return makeNodePromisified(callback,receiver,undefined,
callback,null,multiArgs);
}

Promise.promisify=function(fn,options){
if(typeof fn!=="function"){
throw new TypeError("expecting a function but got "+util.classString(fn));
}
if(isPromisified(fn)){
return fn;
}
options=Object(options);
var receiver=options.context===undefined?THIS:options.context;
var multiArgs=!!options.multiArgs;
var ret=promisify(fn,receiver,multiArgs);
util.copyDescriptors(fn,ret,propsFilter);
return ret;
};

Promise.promisifyAll=function(target,options){
if(typeof target!=="function"&&(typeof target==="undefined"?"undefined":_typeof2(target))!=="object"){
throw new TypeError("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
}
options=Object(options);
var multiArgs=!!options.multiArgs;
var suffix=options.suffix;
if(typeof suffix!=="string")suffix=defaultSuffix;
var filter=options.filter;
if(typeof filter!=="function")filter=defaultFilter;
var promisifier=options.promisifier;
if(typeof promisifier!=="function")promisifier=makeNodePromisified;

if(!util.isIdentifier(suffix)){
throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
}

var keys=util.inheritedDataKeys(target);
for(var i=0;i<keys.length;++i){
var value=target[keys[i]];
if(keys[i]!=="constructor"&&
util.isClass(value)){
promisifyAll(value.prototype,suffix,filter,promisifier,
multiArgs);
promisifyAll(value,suffix,filter,promisifier,multiArgs);
}
}

return promisifyAll(target,suffix,filter,promisifier,multiArgs);
};
};


},{"./errors":12,"./nodeback":20,"./util":36}],25:[function(_dereq_,module,exports){
"use strict";
module.exports=function(
Promise,PromiseArray,tryConvertToPromise,apiRejection){
var util=_dereq_("./util");
var isObject=util.isObject;
var es5=_dereq_("./es5");
var Es6Map;
if(typeof Map==="function")Es6Map=Map;

var mapToEntries=function(){
var index=0;
var size=0;

function extractEntry(value,key){
this[index]=value;
this[index+size]=key;
index++;
}

return function mapToEntries(map){
size=map.size;
index=0;
var ret=new Array(map.size*2);
map.forEach(extractEntry,ret);
return ret;
};
}();

var entriesToMap=function entriesToMap(entries){
var ret=new Es6Map();
var length=entries.length/2|0;
for(var i=0;i<length;++i){
var key=entries[length+i];
var value=entries[i];
ret.set(key,value);
}
return ret;
};

function PropertiesPromiseArray(obj){
var isMap=false;
var entries;
if(Es6Map!==undefined&&obj instanceof Es6Map){
entries=mapToEntries(obj);
isMap=true;
}else{
var keys=es5.keys(obj);
var len=keys.length;
entries=new Array(len*2);
for(var i=0;i<len;++i){
var key=keys[i];
entries[i]=obj[key];
entries[i+len]=key;
}
}
this.constructor$(entries);
this._isMap=isMap;
this._init$(undefined,isMap?-6:-3);
}
util.inherits(PropertiesPromiseArray,PromiseArray);

PropertiesPromiseArray.prototype._init=function(){};

PropertiesPromiseArray.prototype._promiseFulfilled=function(value,index){
this._values[index]=value;
var totalResolved=++this._totalResolved;
if(totalResolved>=this._length){
var val;
if(this._isMap){
val=entriesToMap(this._values);
}else{
val={};
var keyOffset=this.length();
for(var i=0,len=this.length();i<len;++i){
val[this._values[i+keyOffset]]=this._values[i];
}
}
this._resolve(val);
return true;
}
return false;
};

PropertiesPromiseArray.prototype.shouldCopyValues=function(){
return false;
};

PropertiesPromiseArray.prototype.getActualLength=function(len){
return len>>1;
};

function props(promises){
var ret;
var castValue=tryConvertToPromise(promises);

if(!isObject(castValue)){
return apiRejection("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
}else if(castValue instanceof Promise){
ret=castValue._then(
Promise.props,undefined,undefined,undefined,undefined);
}else{
ret=new PropertiesPromiseArray(castValue).promise();
}

if(castValue instanceof Promise){
ret._propagateFrom(castValue,2);
}
return ret;
}

Promise.prototype.props=function(){
return props(this);
};

Promise.props=function(promises){
return props(promises);
};
};

},{"./es5":13,"./util":36}],26:[function(_dereq_,module,exports){
"use strict";
function arrayMove(src,srcIndex,dst,dstIndex,len){
for(var j=0;j<len;++j){
dst[j+dstIndex]=src[j+srcIndex];
src[j+srcIndex]=void 0;
}
}

function Queue(capacity){
this._capacity=capacity;
this._length=0;
this._front=0;
}

Queue.prototype._willBeOverCapacity=function(size){
return this._capacity<size;
};

Queue.prototype._pushOne=function(arg){
var length=this.length();
this._checkCapacity(length+1);
var i=this._front+length&this._capacity-1;
this[i]=arg;
this._length=length+1;
};

Queue.prototype.push=function(fn,receiver,arg){
var length=this.length()+3;
if(this._willBeOverCapacity(length)){
this._pushOne(fn);
this._pushOne(receiver);
this._pushOne(arg);
return;
}
var j=this._front+length-3;
this._checkCapacity(length);
var wrapMask=this._capacity-1;
this[j+0&wrapMask]=fn;
this[j+1&wrapMask]=receiver;
this[j+2&wrapMask]=arg;
this._length=length;
};

Queue.prototype.shift=function(){
var front=this._front,
ret=this[front];

this[front]=undefined;
this._front=front+1&this._capacity-1;
this._length--;
return ret;
};

Queue.prototype.length=function(){
return this._length;
};

Queue.prototype._checkCapacity=function(size){
if(this._capacity<size){
this._resizeTo(this._capacity<<1);
}
};

Queue.prototype._resizeTo=function(capacity){
var oldCapacity=this._capacity;
this._capacity=capacity;
var front=this._front;
var length=this._length;
var moveItemsCount=front+length&oldCapacity-1;
arrayMove(this,0,this,oldCapacity,moveItemsCount);
};

module.exports=Queue;

},{}],27:[function(_dereq_,module,exports){
"use strict";
module.exports=function(
Promise,INTERNAL,tryConvertToPromise,apiRejection){
var util=_dereq_("./util");

var raceLater=function raceLater(promise){
return promise.then(function(array){
return race(array,promise);
});
};

function race(promises,parent){
var maybePromise=tryConvertToPromise(promises);

if(maybePromise instanceof Promise){
return raceLater(maybePromise);
}else{
promises=util.asArray(promises);
if(promises===null)
return apiRejection("expecting an array or an iterable object but got "+util.classString(promises));
}

var ret=new Promise(INTERNAL);
if(parent!==undefined){
ret._propagateFrom(parent,3);
}
var fulfill=ret._fulfill;
var reject=ret._reject;
for(var i=0,len=promises.length;i<len;++i){
var val=promises[i];

if(val===undefined&&!(i in promises)){
continue;
}

Promise.cast(val)._then(fulfill,reject,undefined,ret,null);
}
return ret;
}

Promise.race=function(promises){
return race(promises,undefined);
};

Promise.prototype.race=function(){
return race(this,undefined);
};

};

},{"./util":36}],28:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,
PromiseArray,
apiRejection,
tryConvertToPromise,
INTERNAL,
debug){
var getDomain=Promise._getDomain;
var util=_dereq_("./util");
var tryCatch=util.tryCatch;

function ReductionPromiseArray(promises,fn,initialValue,_each){
this.constructor$(promises);
var domain=getDomain();
this._fn=domain===null?fn:util.domainBind(domain,fn);
if(initialValue!==undefined){
initialValue=Promise.resolve(initialValue);
initialValue._attachCancellationCallback(this);
}
this._initialValue=initialValue;
this._currentCancellable=null;
if(_each===INTERNAL){
this._eachValues=Array(this._length);
}else if(_each===0){
this._eachValues=null;
}else{
this._eachValues=undefined;
}
this._promise._captureStackTrace();
this._init$(undefined,-5);
}
util.inherits(ReductionPromiseArray,PromiseArray);

ReductionPromiseArray.prototype._gotAccum=function(accum){
if(this._eachValues!==undefined&&
this._eachValues!==null&&
accum!==INTERNAL){
this._eachValues.push(accum);
}
};

ReductionPromiseArray.prototype._eachComplete=function(value){
if(this._eachValues!==null){
this._eachValues.push(value);
}
return this._eachValues;
};

ReductionPromiseArray.prototype._init=function(){};

ReductionPromiseArray.prototype._resolveEmptyArray=function(){
this._resolve(this._eachValues!==undefined?this._eachValues:
this._initialValue);
};

ReductionPromiseArray.prototype.shouldCopyValues=function(){
return false;
};

ReductionPromiseArray.prototype._resolve=function(value){
this._promise._resolveCallback(value);
this._values=null;
};

ReductionPromiseArray.prototype._resultCancelled=function(sender){
if(sender===this._initialValue)return this._cancel();
if(this._isResolved())return;
this._resultCancelled$();
if(this._currentCancellable instanceof Promise){
this._currentCancellable.cancel();
}
if(this._initialValue instanceof Promise){
this._initialValue.cancel();
}
};

ReductionPromiseArray.prototype._iterate=function(values){
this._values=values;
var value;
var i;
var length=values.length;
if(this._initialValue!==undefined){
value=this._initialValue;
i=0;
}else{
value=Promise.resolve(values[0]);
i=1;
}

this._currentCancellable=value;

if(!value.isRejected()){
for(;i<length;++i){
var ctx={
accum:null,
value:values[i],
index:i,
length:length,
array:this};

value=value._then(gotAccum,undefined,undefined,ctx,undefined);
}
}

if(this._eachValues!==undefined){
value=value.
_then(this._eachComplete,undefined,undefined,this,undefined);
}
value._then(completed,completed,undefined,value,this);
};

Promise.prototype.reduce=function(fn,initialValue){
return reduce(this,fn,initialValue,null);
};

Promise.reduce=function(promises,fn,initialValue,_each){
return reduce(promises,fn,initialValue,_each);
};

function completed(valueOrReason,array){
if(this.isFulfilled()){
array._resolve(valueOrReason);
}else{
array._reject(valueOrReason);
}
}

function reduce(promises,fn,initialValue,_each){
if(typeof fn!=="function"){
return apiRejection("expecting a function but got "+util.classString(fn));
}
var array=new ReductionPromiseArray(promises,fn,initialValue,_each);
return array.promise();
}

function gotAccum(accum){
this.accum=accum;
this.array._gotAccum(accum);
var value=tryConvertToPromise(this.value,this.array._promise);
if(value instanceof Promise){
this.array._currentCancellable=value;
return value._then(gotValue,undefined,undefined,this,undefined);
}else{
return gotValue.call(this,value);
}
}

function gotValue(value){
var array=this.array;
var promise=array._promise;
var fn=tryCatch(array._fn);
promise._pushContext();
var ret;
if(array._eachValues!==undefined){
ret=fn.call(promise._boundValue(),value,this.index,this.length);
}else{
ret=fn.call(promise._boundValue(),
this.accum,value,this.index,this.length);
}
if(ret instanceof Promise){
array._currentCancellable=ret;
}
var promiseCreated=promise._popContext();
debug.checkForgottenReturns(
ret,
promiseCreated,
array._eachValues!==undefined?"Promise.each":"Promise.reduce",
promise);

return ret;
}
};

},{"./util":36}],29:[function(_dereq_,module,exports){
"use strict";
var util=_dereq_("./util");
var schedule;
var noAsyncScheduler=function noAsyncScheduler(){
throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
};
var NativePromise=util.getNativePromise();
if(util.isNode&&typeof MutationObserver==="undefined"){
var GlobalSetImmediate=global.setImmediate;
var ProcessNextTick=process.nextTick;
schedule=util.isRecentNode?
function(fn){GlobalSetImmediate.call(global,fn);}:
function(fn){ProcessNextTick.call(process,fn);};
}else if(typeof NativePromise==="function"&&
typeof NativePromise.resolve==="function"){
var nativePromise=NativePromise.resolve();
schedule=function schedule(fn){
nativePromise.then(fn);
};
}else if(typeof MutationObserver!=="undefined"&&
!(typeof window!=="undefined"&&
window.navigator&&(
window.navigator.standalone||window.cordova))){
schedule=function(){
var div=document.createElement("div");
var opts={attributes:true};
var toggleScheduled=false;
var div2=document.createElement("div");
var o2=new MutationObserver(function(){
div.classList.toggle("foo");
toggleScheduled=false;
});
o2.observe(div2,opts);

var scheduleToggle=function scheduleToggle(){
if(toggleScheduled)return;
toggleScheduled=true;
div2.classList.toggle("foo");
};

return function schedule(fn){
var o=new MutationObserver(function(){
o.disconnect();
fn();
});
o.observe(div,opts);
scheduleToggle();
};
}();
}else if(typeof setImmediate!=="undefined"){
schedule=function schedule(fn){
setImmediate(fn);
};
}else if(typeof setTimeout!=="undefined"){
schedule=function schedule(fn){
setTimeout(fn,0);
};
}else{
schedule=noAsyncScheduler;
}
module.exports=schedule;

},{"./util":36}],30:[function(_dereq_,module,exports){
"use strict";
module.exports=
function(Promise,PromiseArray,debug){
var PromiseInspection=Promise.PromiseInspection;
var util=_dereq_("./util");

function SettledPromiseArray(values){
this.constructor$(values);
}
util.inherits(SettledPromiseArray,PromiseArray);

SettledPromiseArray.prototype._promiseResolved=function(index,inspection){
this._values[index]=inspection;
var totalResolved=++this._totalResolved;
if(totalResolved>=this._length){
this._resolve(this._values);
return true;
}
return false;
};

SettledPromiseArray.prototype._promiseFulfilled=function(value,index){
var ret=new PromiseInspection();
ret._bitField=33554432;
ret._settledValueField=value;
return this._promiseResolved(index,ret);
};
SettledPromiseArray.prototype._promiseRejected=function(reason,index){
var ret=new PromiseInspection();
ret._bitField=16777216;
ret._settledValueField=reason;
return this._promiseResolved(index,ret);
};

Promise.settle=function(promises){
debug.deprecated(".settle()",".reflect()");
return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle=function(){
return Promise.settle(this);
};
};

},{"./util":36}],31:[function(_dereq_,module,exports){
"use strict";
module.exports=
function(Promise,PromiseArray,apiRejection){
var util=_dereq_("./util");
var RangeError=_dereq_("./errors").RangeError;
var AggregateError=_dereq_("./errors").AggregateError;
var isArray=util.isArray;
var CANCELLATION={};


function SomePromiseArray(values){
this.constructor$(values);
this._howMany=0;
this._unwrap=false;
this._initialized=false;
}
util.inherits(SomePromiseArray,PromiseArray);

SomePromiseArray.prototype._init=function(){
if(!this._initialized){
return;
}
if(this._howMany===0){
this._resolve([]);
return;
}
this._init$(undefined,-5);
var isArrayResolved=isArray(this._values);
if(!this._isResolved()&&
isArrayResolved&&
this._howMany>this._canPossiblyFulfill()){
this._reject(this._getRangeError(this.length()));
}
};

SomePromiseArray.prototype.init=function(){
this._initialized=true;
this._init();
};

SomePromiseArray.prototype.setUnwrap=function(){
this._unwrap=true;
};

SomePromiseArray.prototype.howMany=function(){
return this._howMany;
};

SomePromiseArray.prototype.setHowMany=function(count){
this._howMany=count;
};

SomePromiseArray.prototype._promiseFulfilled=function(value){
this._addFulfilled(value);
if(this._fulfilled()===this.howMany()){
this._values.length=this.howMany();
if(this.howMany()===1&&this._unwrap){
this._resolve(this._values[0]);
}else{
this._resolve(this._values);
}
return true;
}
return false;

};
SomePromiseArray.prototype._promiseRejected=function(reason){
this._addRejected(reason);
return this._checkOutcome();
};

SomePromiseArray.prototype._promiseCancelled=function(){
if(this._values instanceof Promise||this._values==null){
return this._cancel();
}
this._addRejected(CANCELLATION);
return this._checkOutcome();
};

SomePromiseArray.prototype._checkOutcome=function(){
if(this.howMany()>this._canPossiblyFulfill()){
var e=new AggregateError();
for(var i=this.length();i<this._values.length;++i){
if(this._values[i]!==CANCELLATION){
e.push(this._values[i]);
}
}
if(e.length>0){
this._reject(e);
}else{
this._cancel();
}
return true;
}
return false;
};

SomePromiseArray.prototype._fulfilled=function(){
return this._totalResolved;
};

SomePromiseArray.prototype._rejected=function(){
return this._values.length-this.length();
};

SomePromiseArray.prototype._addRejected=function(reason){
this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled=function(value){
this._values[this._totalResolved++]=value;
};

SomePromiseArray.prototype._canPossiblyFulfill=function(){
return this.length()-this._rejected();
};

SomePromiseArray.prototype._getRangeError=function(count){
var message="Input array must contain at least "+
this._howMany+" items but contains only "+count+" items";
return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray=function(){
this._reject(this._getRangeError(0));
};

function some(promises,howMany){
if((howMany|0)!==howMany||howMany<0){
return apiRejection("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n");
}
var ret=new SomePromiseArray(promises);
var promise=ret.promise();
ret.setHowMany(howMany);
ret.init();
return promise;
}

Promise.some=function(promises,howMany){
return some(promises,howMany);
};

Promise.prototype.some=function(howMany){
return some(this,howMany);
};

Promise._SomePromiseArray=SomePromiseArray;
};

},{"./errors":12,"./util":36}],32:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise){
function PromiseInspection(promise){
if(promise!==undefined){
promise=promise._target();
this._bitField=promise._bitField;
this._settledValueField=promise._isFateSealed()?
promise._settledValue():undefined;
}else
{
this._bitField=0;
this._settledValueField=undefined;
}
}

PromiseInspection.prototype._settledValue=function(){
return this._settledValueField;
};

var value=PromiseInspection.prototype.value=function(){
if(!this.isFulfilled()){
throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
}
return this._settledValue();
};

var reason=PromiseInspection.prototype.error=
PromiseInspection.prototype.reason=function(){
if(!this.isRejected()){
throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
}
return this._settledValue();
};

var isFulfilled=PromiseInspection.prototype.isFulfilled=function(){
return(this._bitField&33554432)!==0;
};

var isRejected=PromiseInspection.prototype.isRejected=function(){
return(this._bitField&16777216)!==0;
};

var isPending=PromiseInspection.prototype.isPending=function(){
return(this._bitField&50397184)===0;
};

var isResolved=PromiseInspection.prototype.isResolved=function(){
return(this._bitField&50331648)!==0;
};

PromiseInspection.prototype.isCancelled=function(){
return(this._bitField&8454144)!==0;
};

Promise.prototype.__isCancelled=function(){
return(this._bitField&65536)===65536;
};

Promise.prototype._isCancelled=function(){
return this._target().__isCancelled();
};

Promise.prototype.isCancelled=function(){
return(this._target()._bitField&8454144)!==0;
};

Promise.prototype.isPending=function(){
return isPending.call(this._target());
};

Promise.prototype.isRejected=function(){
return isRejected.call(this._target());
};

Promise.prototype.isFulfilled=function(){
return isFulfilled.call(this._target());
};

Promise.prototype.isResolved=function(){
return isResolved.call(this._target());
};

Promise.prototype.value=function(){
return value.call(this._target());
};

Promise.prototype.reason=function(){
var target=this._target();
target._unsetRejectionIsUnhandled();
return reason.call(target);
};

Promise.prototype._value=function(){
return this._settledValue();
};

Promise.prototype._reason=function(){
this._unsetRejectionIsUnhandled();
return this._settledValue();
};

Promise.PromiseInspection=PromiseInspection;
};

},{}],33:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,INTERNAL){
var util=_dereq_("./util");
var errorObj=util.errorObj;
var isObject=util.isObject;

function tryConvertToPromise(obj,context){
if(isObject(obj)){
if(obj instanceof Promise)return obj;
var then=getThen(obj);
if(then===errorObj){
if(context)context._pushContext();
var ret=Promise.reject(then.e);
if(context)context._popContext();
return ret;
}else if(typeof then==="function"){
if(isAnyBluebirdPromise(obj)){
var ret=new Promise(INTERNAL);
obj._then(
ret._fulfill,
ret._reject,
undefined,
ret,
null);

return ret;
}
return doThenable(obj,then,context);
}
}
return obj;
}

function doGetThen(obj){
return obj.then;
}

function getThen(obj){
try{
return doGetThen(obj);
}catch(e){
errorObj.e=e;
return errorObj;
}
}

var hasProp={}.hasOwnProperty;
function isAnyBluebirdPromise(obj){
try{
return hasProp.call(obj,"_promise0");
}catch(e){
return false;
}
}

function doThenable(x,then,context){
var promise=new Promise(INTERNAL);
var ret=promise;
if(context)context._pushContext();
promise._captureStackTrace();
if(context)context._popContext();
var synchronous=true;
var result=util.tryCatch(then).call(x,resolve,reject);
synchronous=false;

if(promise&&result===errorObj){
promise._rejectCallback(result.e,true,true);
promise=null;
}

function resolve(value){
if(!promise)return;
promise._resolveCallback(value);
promise=null;
}

function reject(reason){
if(!promise)return;
promise._rejectCallback(reason,synchronous,true);
promise=null;
}
return ret;
}

return tryConvertToPromise;
};

},{"./util":36}],34:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,INTERNAL,debug){
var util=_dereq_("./util");
var TimeoutError=Promise.TimeoutError;

function HandleWrapper(handle){
this.handle=handle;
}

HandleWrapper.prototype._resultCancelled=function(){
clearTimeout(this.handle);
};

var afterValue=function afterValue(value){return delay(+this).thenReturn(value);};
var delay=Promise.delay=function(ms,value){
var ret;
var handle;
if(value!==undefined){
ret=Promise.resolve(value).
_then(afterValue,null,null,ms,undefined);
if(debug.cancellation()&&value instanceof Promise){
ret._setOnCancel(value);
}
}else{
ret=new Promise(INTERNAL);
handle=setTimeout(function(){ret._fulfill();},+ms);
if(debug.cancellation()){
ret._setOnCancel(new HandleWrapper(handle));
}
ret._captureStackTrace();
}
ret._setAsyncGuaranteed();
return ret;
};

Promise.prototype.delay=function(ms){
return delay(ms,this);
};

var afterTimeout=function afterTimeout(promise,message,parent){
var err;
if(typeof message!=="string"){
if(message instanceof Error){
err=message;
}else{
err=new TimeoutError("operation timed out");
}
}else{
err=new TimeoutError(message);
}
util.markAsOriginatingFromRejection(err);
promise._attachExtraTrace(err);
promise._reject(err);

if(parent!=null){
parent.cancel();
}
};

function successClear(value){
clearTimeout(this.handle);
return value;
}

function failureClear(reason){
clearTimeout(this.handle);
throw reason;
}

Promise.prototype.timeout=function(ms,message){
ms=+ms;
var ret,parent;

var handleWrapper=new HandleWrapper(setTimeout(function timeoutTimeout(){
if(ret.isPending()){
afterTimeout(ret,message,parent);
}
},ms));

if(debug.cancellation()){
parent=this.then();
ret=parent._then(successClear,failureClear,
undefined,handleWrapper,undefined);
ret._setOnCancel(handleWrapper);
}else{
ret=this._then(successClear,failureClear,
undefined,handleWrapper,undefined);
}

return ret;
};

};

},{"./util":36}],35:[function(_dereq_,module,exports){
"use strict";
module.exports=function(Promise,apiRejection,tryConvertToPromise,
createContext,INTERNAL,debug){
var util=_dereq_("./util");
var TypeError=_dereq_("./errors").TypeError;
var inherits=_dereq_("./util").inherits;
var errorObj=util.errorObj;
var tryCatch=util.tryCatch;
var NULL={};

function thrower(e){
setTimeout(function(){throw e;},0);
}

function castPreservingDisposable(thenable){
var maybePromise=tryConvertToPromise(thenable);
if(maybePromise!==thenable&&
typeof thenable._isDisposable==="function"&&
typeof thenable._getDisposer==="function"&&
thenable._isDisposable()){
maybePromise._setDisposable(thenable._getDisposer());
}
return maybePromise;
}
function dispose(resources,inspection){
var i=0;
var len=resources.length;
var ret=new Promise(INTERNAL);
function iterator(){
if(i>=len)return ret._fulfill();
var maybePromise=castPreservingDisposable(resources[i++]);
if(maybePromise instanceof Promise&&
maybePromise._isDisposable()){
try{
maybePromise=tryConvertToPromise(
maybePromise._getDisposer().tryDispose(inspection),
resources.promise);
}catch(e){
return thrower(e);
}
if(maybePromise instanceof Promise){
return maybePromise._then(iterator,thrower,
null,null,null);
}
}
iterator();
}
iterator();
return ret;
}

function Disposer(data,promise,context){
this._data=data;
this._promise=promise;
this._context=context;
}

Disposer.prototype.data=function(){
return this._data;
};

Disposer.prototype.promise=function(){
return this._promise;
};

Disposer.prototype.resource=function(){
if(this.promise().isFulfilled()){
return this.promise().value();
}
return NULL;
};

Disposer.prototype.tryDispose=function(inspection){
var resource=this.resource();
var context=this._context;
if(context!==undefined)context._pushContext();
var ret=resource!==NULL?
this.doDispose(resource,inspection):null;
if(context!==undefined)context._popContext();
this._promise._unsetDisposable();
this._data=null;
return ret;
};

Disposer.isDisposer=function(d){
return d!=null&&
typeof d.resource==="function"&&
typeof d.tryDispose==="function";
};

function FunctionDisposer(fn,promise,context){
this.constructor$(fn,promise,context);
}
inherits(FunctionDisposer,Disposer);

FunctionDisposer.prototype.doDispose=function(resource,inspection){
var fn=this.data();
return fn.call(resource,resource,inspection);
};

function maybeUnwrapDisposer(value){
if(Disposer.isDisposer(value)){
this.resources[this.index]._setDisposable(value);
return value.promise();
}
return value;
}

function ResourceList(length){
this.length=length;
this.promise=null;
this[length-1]=null;
}

ResourceList.prototype._resultCancelled=function(){
var len=this.length;
for(var i=0;i<len;++i){
var item=this[i];
if(item instanceof Promise){
item.cancel();
}
}
};

Promise.using=function(){
var len=arguments.length;
if(len<2)return apiRejection(
"you must pass at least 2 arguments to Promise.using");
var fn=arguments[len-1];
if(typeof fn!=="function"){
return apiRejection("expecting a function but got "+util.classString(fn));
}
var input;
var spreadArgs=true;
if(len===2&&Array.isArray(arguments[0])){
input=arguments[0];
len=input.length;
spreadArgs=false;
}else{
input=arguments;
len--;
}
var resources=new ResourceList(len);
for(var i=0;i<len;++i){
var resource=input[i];
if(Disposer.isDisposer(resource)){
var disposer=resource;
resource=resource.promise();
resource._setDisposable(disposer);
}else{
var maybePromise=tryConvertToPromise(resource);
if(maybePromise instanceof Promise){
resource=
maybePromise._then(maybeUnwrapDisposer,null,null,{
resources:resources,
index:i},
undefined);
}
}
resources[i]=resource;
}

var reflectedResources=new Array(resources.length);
for(var i=0;i<reflectedResources.length;++i){
reflectedResources[i]=Promise.resolve(resources[i]).reflect();
}

var resultPromise=Promise.all(reflectedResources).
then(function(inspections){
for(var i=0;i<inspections.length;++i){
var inspection=inspections[i];
if(inspection.isRejected()){
errorObj.e=inspection.error();
return errorObj;
}else if(!inspection.isFulfilled()){
resultPromise.cancel();
return;
}
inspections[i]=inspection.value();
}
promise._pushContext();

fn=tryCatch(fn);
var ret=spreadArgs?
fn.apply(undefined,inspections):fn(inspections);
var promiseCreated=promise._popContext();
debug.checkForgottenReturns(
ret,promiseCreated,"Promise.using",promise);
return ret;
});

var promise=resultPromise.lastly(function(){
var inspection=new Promise.PromiseInspection(resultPromise);
return dispose(resources,inspection);
});
resources.promise=promise;
promise._setOnCancel(resources);
return promise;
};

Promise.prototype._setDisposable=function(disposer){
this._bitField=this._bitField|131072;
this._disposer=disposer;
};

Promise.prototype._isDisposable=function(){
return(this._bitField&131072)>0;
};

Promise.prototype._getDisposer=function(){
return this._disposer;
};

Promise.prototype._unsetDisposable=function(){
this._bitField=this._bitField&~131072;
this._disposer=undefined;
};

Promise.prototype.disposer=function(fn){
if(typeof fn==="function"){
return new FunctionDisposer(fn,this,createContext());
}
throw new TypeError();
};

};

},{"./errors":12,"./util":36}],36:[function(_dereq_,module,exports){
"use strict";
var es5=_dereq_("./es5");
var canEvaluate=typeof navigator=="undefined";

var errorObj={e:{}};
var tryCatchTarget;
var globalObject=typeof self!=="undefined"?self:
typeof window!=="undefined"?window:
typeof global!=="undefined"?global:
this!==undefined?this:null;

function tryCatcher(){
try{
var target=tryCatchTarget;
tryCatchTarget=null;
return target.apply(this,arguments);
}catch(e){
errorObj.e=e;
return errorObj;
}
}
function tryCatch(fn){
tryCatchTarget=fn;
return tryCatcher;
}

var inherits=function inherits(Child,Parent){
var hasProp={}.hasOwnProperty;

function T(){
this.constructor=Child;
this.constructor$=Parent;
for(var propertyName in Parent.prototype){
if(hasProp.call(Parent.prototype,propertyName)&&
propertyName.charAt(propertyName.length-1)!=="$")
{
this[propertyName+"$"]=Parent.prototype[propertyName];
}
}
}
T.prototype=Parent.prototype;
Child.prototype=new T();
return Child.prototype;
};


function isPrimitive(val){
return val==null||val===true||val===false||
typeof val==="string"||typeof val==="number";

}

function isObject(value){
return typeof value==="function"||
(typeof value==="undefined"?"undefined":_typeof2(value))==="object"&&value!==null;
}

function maybeWrapAsError(maybeError){
if(!isPrimitive(maybeError))return maybeError;

return new Error(safeToString(maybeError));
}

function withAppended(target,appendee){
var len=target.length;
var ret=new Array(len+1);
var i;
for(i=0;i<len;++i){
ret[i]=target[i];
}
ret[i]=appendee;
return ret;
}

function getDataPropertyOrDefault(obj,key,defaultValue){
if(es5.isES5){
var desc=Object.getOwnPropertyDescriptor(obj,key);

if(desc!=null){
return desc.get==null&&desc.set==null?
desc.value:
defaultValue;
}
}else{
return{}.hasOwnProperty.call(obj,key)?obj[key]:undefined;
}
}

function notEnumerableProp(obj,name,value){
if(isPrimitive(obj))return obj;
var descriptor={
value:value,
configurable:true,
enumerable:false,
writable:true};

es5.defineProperty(obj,name,descriptor);
return obj;
}

function thrower(r){
throw r;
}

var inheritedDataKeys=function(){
var excludedPrototypes=[
Array.prototype,
Object.prototype,
Function.prototype];


var isExcludedProto=function isExcludedProto(val){
for(var i=0;i<excludedPrototypes.length;++i){
if(excludedPrototypes[i]===val){
return true;
}
}
return false;
};

if(es5.isES5){
var getKeys=Object.getOwnPropertyNames;
return function(obj){
var ret=[];
var visitedKeys=Object.create(null);
while(obj!=null&&!isExcludedProto(obj)){
var keys;
try{
keys=getKeys(obj);
}catch(e){
return ret;
}
for(var i=0;i<keys.length;++i){
var key=keys[i];
if(visitedKeys[key])continue;
visitedKeys[key]=true;
var desc=Object.getOwnPropertyDescriptor(obj,key);
if(desc!=null&&desc.get==null&&desc.set==null){
ret.push(key);
}
}
obj=es5.getPrototypeOf(obj);
}
return ret;
};
}else{
var hasProp={}.hasOwnProperty;
return function(obj){
if(isExcludedProto(obj))return[];
var ret=[];


enumeration:for(var key in obj){
if(hasProp.call(obj,key)){
ret.push(key);
}else{
for(var i=0;i<excludedPrototypes.length;++i){
if(hasProp.call(excludedPrototypes[i],key)){
continue enumeration;
}
}
ret.push(key);
}
}
return ret;
};
}

}();

var thisAssignmentPattern=/this\s*\.\s*\S+\s*=/;
function isClass(fn){
try{
if(typeof fn==="function"){
var keys=es5.names(fn.prototype);

var hasMethods=es5.isES5&&keys.length>1;
var hasMethodsOtherThanConstructor=keys.length>0&&
!(keys.length===1&&keys[0]==="constructor");
var hasThisAssignmentAndStaticMethods=
thisAssignmentPattern.test(fn+"")&&es5.names(fn).length>0;

if(hasMethods||hasMethodsOtherThanConstructor||
hasThisAssignmentAndStaticMethods){
return true;
}
}
return false;
}catch(e){
return false;
}
}

function toFastProperties(obj){

function FakeConstructor(){}
FakeConstructor.prototype=obj;
var l=8;
while(l--){new FakeConstructor();}
return obj;
eval(obj);
}

var rident=/^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str){
return rident.test(str);
}

function filledRange(count,prefix,suffix){
var ret=new Array(count);
for(var i=0;i<count;++i){
ret[i]=prefix+i+suffix;
}
return ret;
}

function safeToString(obj){
try{
return obj+"";
}catch(e){
return"[no string representation]";
}
}

function isError(obj){
return obj!==null&&
(typeof obj==="undefined"?"undefined":_typeof2(obj))==="object"&&
typeof obj.message==="string"&&
typeof obj.name==="string";
}

function markAsOriginatingFromRejection(e){
try{
notEnumerableProp(e,"isOperational",true);
}
catch(ignore){}
}

function originatesFromRejection(e){
if(e==null)return false;
return e instanceof Error["__BluebirdErrorTypes__"].OperationalError||
e["isOperational"]===true;
}

function canAttachTrace(obj){
return isError(obj)&&es5.propertyIsWritable(obj,"stack");
}

var ensureErrorObject=function(){
if(!("stack"in new Error())){
return function(value){
if(canAttachTrace(value))return value;
try{throw new Error(safeToString(value));}
catch(err){return err;}
};
}else{
return function(value){
if(canAttachTrace(value))return value;
return new Error(safeToString(value));
};
}
}();

function classString(obj){
return{}.toString.call(obj);
}

function copyDescriptors(from,to,filter){
var keys=es5.names(from);
for(var i=0;i<keys.length;++i){
var key=keys[i];
if(filter(key)){
try{
es5.defineProperty(to,key,es5.getDescriptor(from,key));
}catch(ignore){}
}
}
}

var asArray=function asArray(v){
if(es5.isArray(v)){
return v;
}
return null;
};

if(typeof Symbol!=="undefined"&&(typeof Symbol==="function"?Symbol.iterator:"@@iterator")){
var ArrayFrom=typeof Array.from==="function"?function(v){
return Array.from(v);
}:function(v){
var ret=[];
var it=v[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();
var itResult;
while(!(itResult=it.next()).done){
ret.push(itResult.value);
}
return ret;
};

asArray=function asArray(v){
if(es5.isArray(v)){
return v;
}else if(v!=null&&typeof v[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]==="function"){
return ArrayFrom(v);
}
return null;
};
}

var isNode=typeof process!=="undefined"&&
classString(process).toLowerCase()==="[object process]";

var hasEnvVariables=typeof process!=="undefined"&&
typeof process.env!=="undefined";

function env(key){
return hasEnvVariables?process.env[key]:undefined;
}

function getNativePromise(){
if(typeof Promise==="function"){
try{
var promise=new Promise(function(){});
if({}.toString.call(promise)==="[object Promise]"){
return Promise;
}
}catch(e){}
}
}

function domainBind(self,cb){
return self.bind(cb);
}

var ret={
isClass:isClass,
isIdentifier:isIdentifier,
inheritedDataKeys:inheritedDataKeys,
getDataPropertyOrDefault:getDataPropertyOrDefault,
thrower:thrower,
isArray:es5.isArray,
asArray:asArray,
notEnumerableProp:notEnumerableProp,
isPrimitive:isPrimitive,
isObject:isObject,
isError:isError,
canEvaluate:canEvaluate,
errorObj:errorObj,
tryCatch:tryCatch,
inherits:inherits,
withAppended:withAppended,
maybeWrapAsError:maybeWrapAsError,
toFastProperties:toFastProperties,
filledRange:filledRange,
toString:safeToString,
canAttachTrace:canAttachTrace,
ensureErrorObject:ensureErrorObject,
originatesFromRejection:originatesFromRejection,
markAsOriginatingFromRejection:markAsOriginatingFromRejection,
classString:classString,
copyDescriptors:copyDescriptors,
hasDevTools:typeof chrome!=="undefined"&&chrome&&
typeof chrome.loadTimes==="function",
isNode:isNode,
hasEnvVariables:hasEnvVariables,
env:env,
global:globalObject,
getNativePromise:getNativePromise,
domainBind:domainBind};

ret.isRecentNode=ret.isNode&&function(){
var version=process.versions.node.split(".").map(Number);
return version[0]===0&&version[1]>10||version[0]>0;
}();

if(ret.isNode)ret.toFastProperties(process);

try{throw new Error();}catch(e){ret.lastLineError=e;}
module.exports=ret;

},{"./es5":13}]},{},[4])(4);
});;if(typeof window!=='undefined'&&window!==null){window.P=window.Promise;}else if(typeof self!=='undefined'&&self!==null){self.P=self.Promise;}
}).call(this,require(58),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});
},{"58":58}],3:[function(require,module,exports){

},{}],4:[function(require,module,exports){
(function(global){
'use strict';

var buffer=require(5);
var Buffer=buffer.Buffer;
var SlowBuffer=buffer.SlowBuffer;
var MAX_LEN=buffer.kMaxLength||2147483647;
exports.alloc=function alloc(size,fill,encoding){
if(typeof Buffer.alloc==='function'){
return Buffer.alloc(size,fill,encoding);
}
if(typeof encoding==='number'){
throw new TypeError('encoding must not be number');
}
if(typeof size!=='number'){
throw new TypeError('size must be a number');
}
if(size>MAX_LEN){
throw new RangeError('size is too large');
}
var enc=encoding;
var _fill=fill;
if(_fill===undefined){
enc=undefined;
_fill=0;
}
var buf=new Buffer(size);
if(typeof _fill==='string'){
var fillBuf=new Buffer(_fill,enc);
var flen=fillBuf.length;
var i=-1;
while(++i<size){
buf[i]=fillBuf[i%flen];
}
}else{
buf.fill(_fill);
}
return buf;
};
exports.allocUnsafe=function allocUnsafe(size){
if(typeof Buffer.allocUnsafe==='function'){
return Buffer.allocUnsafe(size);
}
if(typeof size!=='number'){
throw new TypeError('size must be a number');
}
if(size>MAX_LEN){
throw new RangeError('size is too large');
}
return new Buffer(size);
};
exports.from=function from(value,encodingOrOffset,length){
if(typeof Buffer.from==='function'&&(!global.Uint8Array||Uint8Array.from!==Buffer.from)){
return Buffer.from(value,encodingOrOffset,length);
}
if(typeof value==='number'){
throw new TypeError('"value" argument must not be a number');
}
if(typeof value==='string'){
return new Buffer(value,encodingOrOffset);
}
if(typeof ArrayBuffer!=='undefined'&&value instanceof ArrayBuffer){
var offset=encodingOrOffset;
if(arguments.length===1){
return new Buffer(value);
}
if(typeof offset==='undefined'){
offset=0;
}
var len=length;
if(typeof len==='undefined'){
len=value.byteLength-offset;
}
if(offset>=value.byteLength){
throw new RangeError('\'offset\' is out of bounds');
}
if(len>value.byteLength-offset){
throw new RangeError('\'length\' is out of bounds');
}
return new Buffer(value.slice(offset,offset+len));
}
if(Buffer.isBuffer(value)){
var out=new Buffer(value.length);
value.copy(out,0,0,value.length);
return out;
}
if(value){
if(Array.isArray(value)||typeof ArrayBuffer!=='undefined'&&value.buffer instanceof ArrayBuffer||'length'in value){
return new Buffer(value);
}
if(value.type==='Buffer'&&Array.isArray(value.data)){
return new Buffer(value.data);
}
}

throw new TypeError('First argument must be a string, Buffer, '+'ArrayBuffer, Array, or array-like object.');
};
exports.allocUnsafeSlow=function allocUnsafeSlow(size){
if(typeof Buffer.allocUnsafeSlow==='function'){
return Buffer.allocUnsafeSlow(size);
}
if(typeof size!=='number'){
throw new TypeError('size must be a number');
}
if(size>=MAX_LEN){
throw new RangeError('size is too large');
}
return new SlowBuffer(size);
};

}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});
},{"5":5}],5:[function(require,module,exports){
(function(global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


'use strict';

var base64=require(1);
var ieee754=require(10);
var isArray=require(13);

exports.Buffer=Buffer;
exports.SlowBuffer=SlowBuffer;
exports.INSPECT_MAX_BYTES=50;

























Buffer.TYPED_ARRAY_SUPPORT=global.TYPED_ARRAY_SUPPORT!==undefined?
global.TYPED_ARRAY_SUPPORT:
typedArraySupport();




exports.kMaxLength=kMaxLength();

function typedArraySupport(){
try{
var arr=new Uint8Array(1);
arr.__proto__={__proto__:Uint8Array.prototype,foo:function foo(){return 42;}};
return arr.foo()===42&&
typeof arr.subarray==='function'&&
arr.subarray(1,1).byteLength===0;
}catch(e){
return false;
}
}

function kMaxLength(){
return Buffer.TYPED_ARRAY_SUPPORT?
0x7fffffff:
0x3fffffff;
}

function createBuffer(that,length){
if(kMaxLength()<length){
throw new RangeError('Invalid typed array length');
}
if(Buffer.TYPED_ARRAY_SUPPORT){

that=new Uint8Array(length);
that.__proto__=Buffer.prototype;
}else{

if(that===null){
that=new Buffer(length);
}
that.length=length;
}

return that;
}











function Buffer(arg,encodingOrOffset,length){
if(!Buffer.TYPED_ARRAY_SUPPORT&&!(this instanceof Buffer)){
return new Buffer(arg,encodingOrOffset,length);
}


if(typeof arg==='number'){
if(typeof encodingOrOffset==='string'){
throw new Error(
'If encoding is specified then the first argument must be a string');

}
return allocUnsafe(this,arg);
}
return from(this,arg,encodingOrOffset,length);
}

Buffer.poolSize=8192;


Buffer._augment=function(arr){
arr.__proto__=Buffer.prototype;
return arr;
};

function from(that,value,encodingOrOffset,length){
if(typeof value==='number'){
throw new TypeError('"value" argument must not be a number');
}

if(typeof ArrayBuffer!=='undefined'&&value instanceof ArrayBuffer){
return fromArrayBuffer(that,value,encodingOrOffset,length);
}

if(typeof value==='string'){
return fromString(that,value,encodingOrOffset);
}

return fromObject(that,value);
}









Buffer.from=function(value,encodingOrOffset,length){
return from(null,value,encodingOrOffset,length);
};

if(Buffer.TYPED_ARRAY_SUPPORT){
Buffer.prototype.__proto__=Uint8Array.prototype;
Buffer.__proto__=Uint8Array;
if(typeof Symbol!=='undefined'&&(typeof Symbol==="function"?Symbol.species:"@@species")&&
Buffer[typeof Symbol==="function"?Symbol.species:"@@species"]===Buffer){

Object.defineProperty(Buffer,typeof Symbol==="function"?Symbol.species:"@@species",{
value:null,
configurable:true});

}
}

function assertSize(size){
if(typeof size!=='number'){
throw new TypeError('"size" argument must be a number');
}else if(size<0){
throw new RangeError('"size" argument must not be negative');
}
}

function alloc(that,size,fill,encoding){
assertSize(size);
if(size<=0){
return createBuffer(that,size);
}
if(fill!==undefined){



return typeof encoding==='string'?
createBuffer(that,size).fill(fill,encoding):
createBuffer(that,size).fill(fill);
}
return createBuffer(that,size);
}





Buffer.alloc=function(size,fill,encoding){
return alloc(null,size,fill,encoding);
};

function allocUnsafe(that,size){
assertSize(size);
that=createBuffer(that,size<0?0:checked(size)|0);
if(!Buffer.TYPED_ARRAY_SUPPORT){
for(var i=0;i<size;++i){
that[i]=0;
}
}
return that;
}




Buffer.allocUnsafe=function(size){
return allocUnsafe(null,size);
};



Buffer.allocUnsafeSlow=function(size){
return allocUnsafe(null,size);
};

function fromString(that,string,encoding){
if(typeof encoding!=='string'||encoding===''){
encoding='utf8';
}

if(!Buffer.isEncoding(encoding)){
throw new TypeError('"encoding" must be a valid string encoding');
}

var length=byteLength(string,encoding)|0;
that=createBuffer(that,length);

var actual=that.write(string,encoding);

if(actual!==length){



that=that.slice(0,actual);
}

return that;
}

function fromArrayLike(that,array){
var length=array.length<0?0:checked(array.length)|0;
that=createBuffer(that,length);
for(var i=0;i<length;i+=1){
that[i]=array[i]&255;
}
return that;
}

function fromArrayBuffer(that,array,byteOffset,length){
array.byteLength;

if(byteOffset<0||array.byteLength<byteOffset){
throw new RangeError('\'offset\' is out of bounds');
}

if(array.byteLength<byteOffset+(length||0)){
throw new RangeError('\'length\' is out of bounds');
}

if(byteOffset===undefined&&length===undefined){
array=new Uint8Array(array);
}else if(length===undefined){
array=new Uint8Array(array,byteOffset);
}else{
array=new Uint8Array(array,byteOffset,length);
}

if(Buffer.TYPED_ARRAY_SUPPORT){

that=array;
that.__proto__=Buffer.prototype;
}else{

that=fromArrayLike(that,array);
}
return that;
}

function fromObject(that,obj){
if(Buffer.isBuffer(obj)){
var len=checked(obj.length)|0;
that=createBuffer(that,len);

if(that.length===0){
return that;
}

obj.copy(that,0,0,len);
return that;
}

if(obj){
if(typeof ArrayBuffer!=='undefined'&&
obj.buffer instanceof ArrayBuffer||'length'in obj){
if(typeof obj.length!=='number'||isnan(obj.length)){
return createBuffer(that,0);
}
return fromArrayLike(that,obj);
}

if(obj.type==='Buffer'&&isArray(obj.data)){
return fromArrayLike(that,obj.data);
}
}

throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length){


if(length>=kMaxLength()){
throw new RangeError('Attempt to allocate Buffer larger than maximum '+
'size: 0x'+kMaxLength().toString(16)+' bytes');
}
return length|0;
}

function SlowBuffer(length){
if(+length!=length){
length=0;
}
return Buffer.alloc(+length);
}

Buffer.isBuffer=function isBuffer(b){
return!!(b!=null&&b._isBuffer);
};

Buffer.compare=function compare(a,b){
if(!Buffer.isBuffer(a)||!Buffer.isBuffer(b)){
throw new TypeError('Arguments must be Buffers');
}

if(a===b)return 0;

var x=a.length;
var y=b.length;

for(var i=0,len=Math.min(x,y);i<len;++i){
if(a[i]!==b[i]){
x=a[i];
y=b[i];
break;
}
}

if(x<y)return-1;
if(y<x)return 1;
return 0;
};

Buffer.isEncoding=function isEncoding(encoding){
switch(String(encoding).toLowerCase()){
case'hex':
case'utf8':
case'utf-8':
case'ascii':
case'latin1':
case'binary':
case'base64':
case'ucs2':
case'ucs-2':
case'utf16le':
case'utf-16le':
return true;
default:
return false;}

};

Buffer.concat=function concat(list,length){
if(!isArray(list)){
throw new TypeError('"list" argument must be an Array of Buffers');
}

if(list.length===0){
return Buffer.alloc(0);
}

var i;
if(length===undefined){
length=0;
for(i=0;i<list.length;++i){
length+=list[i].length;
}
}

var buffer=Buffer.allocUnsafe(length);
var pos=0;
for(i=0;i<list.length;++i){
var buf=list[i];
if(!Buffer.isBuffer(buf)){
throw new TypeError('"list" argument must be an Array of Buffers');
}
buf.copy(buffer,pos);
pos+=buf.length;
}
return buffer;
};

function byteLength(string,encoding){
if(Buffer.isBuffer(string)){
return string.length;
}
if(typeof ArrayBuffer!=='undefined'&&typeof ArrayBuffer.isView==='function'&&(
ArrayBuffer.isView(string)||string instanceof ArrayBuffer)){
return string.byteLength;
}
if(typeof string!=='string'){
string=''+string;
}

var len=string.length;
if(len===0)return 0;


var loweredCase=false;
for(;;){
switch(encoding){
case'ascii':
case'latin1':
case'binary':
return len;
case'utf8':
case'utf-8':
case undefined:
return utf8ToBytes(string).length;
case'ucs2':
case'ucs-2':
case'utf16le':
case'utf-16le':
return len*2;
case'hex':
return len>>>1;
case'base64':
return base64ToBytes(string).length;
default:
if(loweredCase)return utf8ToBytes(string).length;
encoding=(''+encoding).toLowerCase();
loweredCase=true;}

}
}
Buffer.byteLength=byteLength;

function slowToString(encoding,start,end){
var loweredCase=false;








if(start===undefined||start<0){
start=0;
}


if(start>this.length){
return'';
}

if(end===undefined||end>this.length){
end=this.length;
}

if(end<=0){
return'';
}


end>>>=0;
start>>>=0;

if(end<=start){
return'';
}

if(!encoding)encoding='utf8';

while(true){
switch(encoding){
case'hex':
return hexSlice(this,start,end);

case'utf8':
case'utf-8':
return utf8Slice(this,start,end);

case'ascii':
return asciiSlice(this,start,end);

case'latin1':
case'binary':
return latin1Slice(this,start,end);

case'base64':
return base64Slice(this,start,end);

case'ucs2':
case'ucs-2':
case'utf16le':
case'utf-16le':
return utf16leSlice(this,start,end);

default:
if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);
encoding=(encoding+'').toLowerCase();
loweredCase=true;}

}
}



Buffer.prototype._isBuffer=true;

function swap(b,n,m){
var i=b[n];
b[n]=b[m];
b[m]=i;
}

Buffer.prototype.swap16=function swap16(){
var len=this.length;
if(len%2!==0){
throw new RangeError('Buffer size must be a multiple of 16-bits');
}
for(var i=0;i<len;i+=2){
swap(this,i,i+1);
}
return this;
};

Buffer.prototype.swap32=function swap32(){
var len=this.length;
if(len%4!==0){
throw new RangeError('Buffer size must be a multiple of 32-bits');
}
for(var i=0;i<len;i+=4){
swap(this,i,i+3);
swap(this,i+1,i+2);
}
return this;
};

Buffer.prototype.swap64=function swap64(){
var len=this.length;
if(len%8!==0){
throw new RangeError('Buffer size must be a multiple of 64-bits');
}
for(var i=0;i<len;i+=8){
swap(this,i,i+7);
swap(this,i+1,i+6);
swap(this,i+2,i+5);
swap(this,i+3,i+4);
}
return this;
};

Buffer.prototype.toString=function toString(){
var length=this.length|0;
if(length===0)return'';
if(arguments.length===0)return utf8Slice(this,0,length);
return slowToString.apply(this,arguments);
};

Buffer.prototype.equals=function equals(b){
if(!Buffer.isBuffer(b))throw new TypeError('Argument must be a Buffer');
if(this===b)return true;
return Buffer.compare(this,b)===0;
};

Buffer.prototype.inspect=function inspect(){
var str='';
var max=exports.INSPECT_MAX_BYTES;
if(this.length>0){
str=this.toString('hex',0,max).match(/.{2}/g).join(' ');
if(this.length>max)str+=' ... ';
}
return'<Buffer '+str+'>';
};

Buffer.prototype.compare=function compare(target,start,end,thisStart,thisEnd){
if(!Buffer.isBuffer(target)){
throw new TypeError('Argument must be a Buffer');
}

if(start===undefined){
start=0;
}
if(end===undefined){
end=target?target.length:0;
}
if(thisStart===undefined){
thisStart=0;
}
if(thisEnd===undefined){
thisEnd=this.length;
}

if(start<0||end>target.length||thisStart<0||thisEnd>this.length){
throw new RangeError('out of range index');
}

if(thisStart>=thisEnd&&start>=end){
return 0;
}
if(thisStart>=thisEnd){
return-1;
}
if(start>=end){
return 1;
}

start>>>=0;
end>>>=0;
thisStart>>>=0;
thisEnd>>>=0;

if(this===target)return 0;

var x=thisEnd-thisStart;
var y=end-start;
var len=Math.min(x,y);

var thisCopy=this.slice(thisStart,thisEnd);
var targetCopy=target.slice(start,end);

for(var i=0;i<len;++i){
if(thisCopy[i]!==targetCopy[i]){
x=thisCopy[i];
y=targetCopy[i];
break;
}
}

if(x<y)return-1;
if(y<x)return 1;
return 0;
};










function bidirectionalIndexOf(buffer,val,byteOffset,encoding,dir){

if(buffer.length===0)return-1;


if(typeof byteOffset==='string'){
encoding=byteOffset;
byteOffset=0;
}else if(byteOffset>0x7fffffff){
byteOffset=0x7fffffff;
}else if(byteOffset<-0x80000000){
byteOffset=-0x80000000;
}
byteOffset=+byteOffset;
if(isNaN(byteOffset)){

byteOffset=dir?0:buffer.length-1;
}


if(byteOffset<0)byteOffset=buffer.length+byteOffset;
if(byteOffset>=buffer.length){
if(dir)return-1;else
byteOffset=buffer.length-1;
}else if(byteOffset<0){
if(dir)byteOffset=0;else
return-1;
}


if(typeof val==='string'){
val=Buffer.from(val,encoding);
}


if(Buffer.isBuffer(val)){

if(val.length===0){
return-1;
}
return arrayIndexOf(buffer,val,byteOffset,encoding,dir);
}else if(typeof val==='number'){
val=val&0xFF;
if(Buffer.TYPED_ARRAY_SUPPORT&&
typeof Uint8Array.prototype.indexOf==='function'){
if(dir){
return Uint8Array.prototype.indexOf.call(buffer,val,byteOffset);
}else{
return Uint8Array.prototype.lastIndexOf.call(buffer,val,byteOffset);
}
}
return arrayIndexOf(buffer,[val],byteOffset,encoding,dir);
}

throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr,val,byteOffset,encoding,dir){
var indexSize=1;
var arrLength=arr.length;
var valLength=val.length;

if(encoding!==undefined){
encoding=String(encoding).toLowerCase();
if(encoding==='ucs2'||encoding==='ucs-2'||
encoding==='utf16le'||encoding==='utf-16le'){
if(arr.length<2||val.length<2){
return-1;
}
indexSize=2;
arrLength/=2;
valLength/=2;
byteOffset/=2;
}
}

function read(buf,i){
if(indexSize===1){
return buf[i];
}else{
return buf.readUInt16BE(i*indexSize);
}
}

var i;
if(dir){
var foundIndex=-1;
for(i=byteOffset;i<arrLength;i++){
if(read(arr,i)===read(val,foundIndex===-1?0:i-foundIndex)){
if(foundIndex===-1)foundIndex=i;
if(i-foundIndex+1===valLength)return foundIndex*indexSize;
}else{
if(foundIndex!==-1)i-=i-foundIndex;
foundIndex=-1;
}
}
}else{
if(byteOffset+valLength>arrLength)byteOffset=arrLength-valLength;
for(i=byteOffset;i>=0;i--){
var found=true;
for(var j=0;j<valLength;j++){
if(read(arr,i+j)!==read(val,j)){
found=false;
break;
}
}
if(found)return i;
}
}

return-1;
}

Buffer.prototype.includes=function includes(val,byteOffset,encoding){
return this.indexOf(val,byteOffset,encoding)!==-1;
};

Buffer.prototype.indexOf=function indexOf(val,byteOffset,encoding){
return bidirectionalIndexOf(this,val,byteOffset,encoding,true);
};

Buffer.prototype.lastIndexOf=function lastIndexOf(val,byteOffset,encoding){
return bidirectionalIndexOf(this,val,byteOffset,encoding,false);
};

function hexWrite(buf,string,offset,length){
offset=Number(offset)||0;
var remaining=buf.length-offset;
if(!length){
length=remaining;
}else{
length=Number(length);
if(length>remaining){
length=remaining;
}
}


var strLen=string.length;
if(strLen%2!==0)throw new TypeError('Invalid hex string');

if(length>strLen/2){
length=strLen/2;
}
for(var i=0;i<length;++i){
var parsed=parseInt(string.substr(i*2,2),16);
if(isNaN(parsed))return i;
buf[offset+i]=parsed;
}
return i;
}

function utf8Write(buf,string,offset,length){
return blitBuffer(utf8ToBytes(string,buf.length-offset),buf,offset,length);
}

function asciiWrite(buf,string,offset,length){
return blitBuffer(asciiToBytes(string),buf,offset,length);
}

function latin1Write(buf,string,offset,length){
return asciiWrite(buf,string,offset,length);
}

function base64Write(buf,string,offset,length){
return blitBuffer(base64ToBytes(string),buf,offset,length);
}

function ucs2Write(buf,string,offset,length){
return blitBuffer(utf16leToBytes(string,buf.length-offset),buf,offset,length);
}

Buffer.prototype.write=function write(string,offset,length,encoding){

if(offset===undefined){
encoding='utf8';
length=this.length;
offset=0;

}else if(length===undefined&&typeof offset==='string'){
encoding=offset;
length=this.length;
offset=0;

}else if(isFinite(offset)){
offset=offset|0;
if(isFinite(length)){
length=length|0;
if(encoding===undefined)encoding='utf8';
}else{
encoding=length;
length=undefined;
}

}else{
throw new Error(
'Buffer.write(string, encoding, offset[, length]) is no longer supported');

}

var remaining=this.length-offset;
if(length===undefined||length>remaining)length=remaining;

if(string.length>0&&(length<0||offset<0)||offset>this.length){
throw new RangeError('Attempt to write outside buffer bounds');
}

if(!encoding)encoding='utf8';

var loweredCase=false;
for(;;){
switch(encoding){
case'hex':
return hexWrite(this,string,offset,length);

case'utf8':
case'utf-8':
return utf8Write(this,string,offset,length);

case'ascii':
return asciiWrite(this,string,offset,length);

case'latin1':
case'binary':
return latin1Write(this,string,offset,length);

case'base64':

return base64Write(this,string,offset,length);

case'ucs2':
case'ucs-2':
case'utf16le':
case'utf-16le':
return ucs2Write(this,string,offset,length);

default:
if(loweredCase)throw new TypeError('Unknown encoding: '+encoding);
encoding=(''+encoding).toLowerCase();
loweredCase=true;}

}
};

Buffer.prototype.toJSON=function toJSON(){
return{
type:'Buffer',
data:Array.prototype.slice.call(this._arr||this,0)};

};

function base64Slice(buf,start,end){
if(start===0&&end===buf.length){
return base64.fromByteArray(buf);
}else{
return base64.fromByteArray(buf.slice(start,end));
}
}

function utf8Slice(buf,start,end){
end=Math.min(buf.length,end);
var res=[];

var i=start;
while(i<end){
var firstByte=buf[i];
var codePoint=null;
var bytesPerSequence=firstByte>0xEF?4:
firstByte>0xDF?3:
firstByte>0xBF?2:
1;

if(i+bytesPerSequence<=end){
var secondByte,thirdByte,fourthByte,tempCodePoint;

switch(bytesPerSequence){
case 1:
if(firstByte<0x80){
codePoint=firstByte;
}
break;
case 2:
secondByte=buf[i+1];
if((secondByte&0xC0)===0x80){
tempCodePoint=(firstByte&0x1F)<<0x6|secondByte&0x3F;
if(tempCodePoint>0x7F){
codePoint=tempCodePoint;
}
}
break;
case 3:
secondByte=buf[i+1];
thirdByte=buf[i+2];
if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80){
tempCodePoint=(firstByte&0xF)<<0xC|(secondByte&0x3F)<<0x6|thirdByte&0x3F;
if(tempCodePoint>0x7FF&&(tempCodePoint<0xD800||tempCodePoint>0xDFFF)){
codePoint=tempCodePoint;
}
}
break;
case 4:
secondByte=buf[i+1];
thirdByte=buf[i+2];
fourthByte=buf[i+3];
if((secondByte&0xC0)===0x80&&(thirdByte&0xC0)===0x80&&(fourthByte&0xC0)===0x80){
tempCodePoint=(firstByte&0xF)<<0x12|(secondByte&0x3F)<<0xC|(thirdByte&0x3F)<<0x6|fourthByte&0x3F;
if(tempCodePoint>0xFFFF&&tempCodePoint<0x110000){
codePoint=tempCodePoint;
}
}}

}

if(codePoint===null){


codePoint=0xFFFD;
bytesPerSequence=1;
}else if(codePoint>0xFFFF){

codePoint-=0x10000;
res.push(codePoint>>>10&0x3FF|0xD800);
codePoint=0xDC00|codePoint&0x3FF;
}

res.push(codePoint);
i+=bytesPerSequence;
}

return decodeCodePointsArray(res);
}




var MAX_ARGUMENTS_LENGTH=0x1000;

function decodeCodePointsArray(codePoints){
var len=codePoints.length;
if(len<=MAX_ARGUMENTS_LENGTH){
return String.fromCharCode.apply(String,codePoints);
}


var res='';
var i=0;
while(i<len){
res+=String.fromCharCode.apply(
String,
codePoints.slice(i,i+=MAX_ARGUMENTS_LENGTH));

}
return res;
}

function asciiSlice(buf,start,end){
var ret='';
end=Math.min(buf.length,end);

for(var i=start;i<end;++i){
ret+=String.fromCharCode(buf[i]&0x7F);
}
return ret;
}

function latin1Slice(buf,start,end){
var ret='';
end=Math.min(buf.length,end);

for(var i=start;i<end;++i){
ret+=String.fromCharCode(buf[i]);
}
return ret;
}

function hexSlice(buf,start,end){
var len=buf.length;

if(!start||start<0)start=0;
if(!end||end<0||end>len)end=len;

var out='';
for(var i=start;i<end;++i){
out+=toHex(buf[i]);
}
return out;
}

function utf16leSlice(buf,start,end){
var bytes=buf.slice(start,end);
var res='';
for(var i=0;i<bytes.length;i+=2){
res+=String.fromCharCode(bytes[i]+bytes[i+1]*256);
}
return res;
}

Buffer.prototype.slice=function slice(start,end){
var len=this.length;
start=~~start;
end=end===undefined?len:~~end;

if(start<0){
start+=len;
if(start<0)start=0;
}else if(start>len){
start=len;
}

if(end<0){
end+=len;
if(end<0)end=0;
}else if(end>len){
end=len;
}

if(end<start)end=start;

var newBuf;
if(Buffer.TYPED_ARRAY_SUPPORT){
newBuf=this.subarray(start,end);
newBuf.__proto__=Buffer.prototype;
}else{
var sliceLen=end-start;
newBuf=new Buffer(sliceLen,undefined);
for(var i=0;i<sliceLen;++i){
newBuf[i]=this[i+start];
}
}

return newBuf;
};




function checkOffset(offset,ext,length){
if(offset%1!==0||offset<0)throw new RangeError('offset is not uint');
if(offset+ext>length)throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE=function readUIntLE(offset,byteLength,noAssert){
offset=offset|0;
byteLength=byteLength|0;
if(!noAssert)checkOffset(offset,byteLength,this.length);

var val=this[offset];
var mul=1;
var i=0;
while(++i<byteLength&&(mul*=0x100)){
val+=this[offset+i]*mul;
}

return val;
};

Buffer.prototype.readUIntBE=function readUIntBE(offset,byteLength,noAssert){
offset=offset|0;
byteLength=byteLength|0;
if(!noAssert){
checkOffset(offset,byteLength,this.length);
}

var val=this[offset+--byteLength];
var mul=1;
while(byteLength>0&&(mul*=0x100)){
val+=this[offset+--byteLength]*mul;
}

return val;
};

Buffer.prototype.readUInt8=function readUInt8(offset,noAssert){
if(!noAssert)checkOffset(offset,1,this.length);
return this[offset];
};

Buffer.prototype.readUInt16LE=function readUInt16LE(offset,noAssert){
if(!noAssert)checkOffset(offset,2,this.length);
return this[offset]|this[offset+1]<<8;
};

Buffer.prototype.readUInt16BE=function readUInt16BE(offset,noAssert){
if(!noAssert)checkOffset(offset,2,this.length);
return this[offset]<<8|this[offset+1];
};

Buffer.prototype.readUInt32LE=function readUInt32LE(offset,noAssert){
if(!noAssert)checkOffset(offset,4,this.length);

return(this[offset]|
this[offset+1]<<8|
this[offset+2]<<16)+
this[offset+3]*0x1000000;
};

Buffer.prototype.readUInt32BE=function readUInt32BE(offset,noAssert){
if(!noAssert)checkOffset(offset,4,this.length);

return this[offset]*0x1000000+(
this[offset+1]<<16|
this[offset+2]<<8|
this[offset+3]);
};

Buffer.prototype.readIntLE=function readIntLE(offset,byteLength,noAssert){
offset=offset|0;
byteLength=byteLength|0;
if(!noAssert)checkOffset(offset,byteLength,this.length);

var val=this[offset];
var mul=1;
var i=0;
while(++i<byteLength&&(mul*=0x100)){
val+=this[offset+i]*mul;
}
mul*=0x80;

if(val>=mul)val-=Math.pow(2,8*byteLength);

return val;
};

Buffer.prototype.readIntBE=function readIntBE(offset,byteLength,noAssert){
offset=offset|0;
byteLength=byteLength|0;
if(!noAssert)checkOffset(offset,byteLength,this.length);

var i=byteLength;
var mul=1;
var val=this[offset+--i];
while(i>0&&(mul*=0x100)){
val+=this[offset+--i]*mul;
}
mul*=0x80;

if(val>=mul)val-=Math.pow(2,8*byteLength);

return val;
};

Buffer.prototype.readInt8=function readInt8(offset,noAssert){
if(!noAssert)checkOffset(offset,1,this.length);
if(!(this[offset]&0x80))return this[offset];
return(0xff-this[offset]+1)*-1;
};

Buffer.prototype.readInt16LE=function readInt16LE(offset,noAssert){
if(!noAssert)checkOffset(offset,2,this.length);
var val=this[offset]|this[offset+1]<<8;
return val&0x8000?val|0xFFFF0000:val;
};

Buffer.prototype.readInt16BE=function readInt16BE(offset,noAssert){
if(!noAssert)checkOffset(offset,2,this.length);
var val=this[offset+1]|this[offset]<<8;
return val&0x8000?val|0xFFFF0000:val;
};

Buffer.prototype.readInt32LE=function readInt32LE(offset,noAssert){
if(!noAssert)checkOffset(offset,4,this.length);

return this[offset]|
this[offset+1]<<8|
this[offset+2]<<16|
this[offset+3]<<24;
};

Buffer.prototype.readInt32BE=function readInt32BE(offset,noAssert){
if(!noAssert)checkOffset(offset,4,this.length);

return this[offset]<<24|
this[offset+1]<<16|
this[offset+2]<<8|
this[offset+3];
};

Buffer.prototype.readFloatLE=function readFloatLE(offset,noAssert){
if(!noAssert)checkOffset(offset,4,this.length);
return ieee754.read(this,offset,true,23,4);
};

Buffer.prototype.readFloatBE=function readFloatBE(offset,noAssert){
if(!noAssert)checkOffset(offset,4,this.length);
return ieee754.read(this,offset,false,23,4);
};

Buffer.prototype.readDoubleLE=function readDoubleLE(offset,noAssert){
if(!noAssert)checkOffset(offset,8,this.length);
return ieee754.read(this,offset,true,52,8);
};

Buffer.prototype.readDoubleBE=function readDoubleBE(offset,noAssert){
if(!noAssert)checkOffset(offset,8,this.length);
return ieee754.read(this,offset,false,52,8);
};

function checkInt(buf,value,offset,ext,max,min){
if(!Buffer.isBuffer(buf))throw new TypeError('"buffer" argument must be a Buffer instance');
if(value>max||value<min)throw new RangeError('"value" argument is out of bounds');
if(offset+ext>buf.length)throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE=function writeUIntLE(value,offset,byteLength,noAssert){
value=+value;
offset=offset|0;
byteLength=byteLength|0;
if(!noAssert){
var maxBytes=Math.pow(2,8*byteLength)-1;
checkInt(this,value,offset,byteLength,maxBytes,0);
}

var mul=1;
var i=0;
this[offset]=value&0xFF;
while(++i<byteLength&&(mul*=0x100)){
this[offset+i]=value/mul&0xFF;
}

return offset+byteLength;
};

Buffer.prototype.writeUIntBE=function writeUIntBE(value,offset,byteLength,noAssert){
value=+value;
offset=offset|0;
byteLength=byteLength|0;
if(!noAssert){
var maxBytes=Math.pow(2,8*byteLength)-1;
checkInt(this,value,offset,byteLength,maxBytes,0);
}

var i=byteLength-1;
var mul=1;
this[offset+i]=value&0xFF;
while(--i>=0&&(mul*=0x100)){
this[offset+i]=value/mul&0xFF;
}

return offset+byteLength;
};

Buffer.prototype.writeUInt8=function writeUInt8(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,1,0xff,0);
if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);
this[offset]=value&0xff;
return offset+1;
};

function objectWriteUInt16(buf,value,offset,littleEndian){
if(value<0)value=0xffff+value+1;
for(var i=0,j=Math.min(buf.length-offset,2);i<j;++i){
buf[offset+i]=(value&0xff<<8*(littleEndian?i:1-i))>>>
(littleEndian?i:1-i)*8;
}
}

Buffer.prototype.writeUInt16LE=function writeUInt16LE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,2,0xffff,0);
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset]=value&0xff;
this[offset+1]=value>>>8;
}else{
objectWriteUInt16(this,value,offset,true);
}
return offset+2;
};

Buffer.prototype.writeUInt16BE=function writeUInt16BE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,2,0xffff,0);
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset]=value>>>8;
this[offset+1]=value&0xff;
}else{
objectWriteUInt16(this,value,offset,false);
}
return offset+2;
};

function objectWriteUInt32(buf,value,offset,littleEndian){
if(value<0)value=0xffffffff+value+1;
for(var i=0,j=Math.min(buf.length-offset,4);i<j;++i){
buf[offset+i]=value>>>(littleEndian?i:3-i)*8&0xff;
}
}

Buffer.prototype.writeUInt32LE=function writeUInt32LE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset+3]=value>>>24;
this[offset+2]=value>>>16;
this[offset+1]=value>>>8;
this[offset]=value&0xff;
}else{
objectWriteUInt32(this,value,offset,true);
}
return offset+4;
};

Buffer.prototype.writeUInt32BE=function writeUInt32BE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,4,0xffffffff,0);
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset]=value>>>24;
this[offset+1]=value>>>16;
this[offset+2]=value>>>8;
this[offset+3]=value&0xff;
}else{
objectWriteUInt32(this,value,offset,false);
}
return offset+4;
};

Buffer.prototype.writeIntLE=function writeIntLE(value,offset,byteLength,noAssert){
value=+value;
offset=offset|0;
if(!noAssert){
var limit=Math.pow(2,8*byteLength-1);

checkInt(this,value,offset,byteLength,limit-1,-limit);
}

var i=0;
var mul=1;
var sub=0;
this[offset]=value&0xFF;
while(++i<byteLength&&(mul*=0x100)){
if(value<0&&sub===0&&this[offset+i-1]!==0){
sub=1;
}
this[offset+i]=(value/mul>>0)-sub&0xFF;
}

return offset+byteLength;
};

Buffer.prototype.writeIntBE=function writeIntBE(value,offset,byteLength,noAssert){
value=+value;
offset=offset|0;
if(!noAssert){
var limit=Math.pow(2,8*byteLength-1);

checkInt(this,value,offset,byteLength,limit-1,-limit);
}

var i=byteLength-1;
var mul=1;
var sub=0;
this[offset+i]=value&0xFF;
while(--i>=0&&(mul*=0x100)){
if(value<0&&sub===0&&this[offset+i+1]!==0){
sub=1;
}
this[offset+i]=(value/mul>>0)-sub&0xFF;
}

return offset+byteLength;
};

Buffer.prototype.writeInt8=function writeInt8(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,1,0x7f,-0x80);
if(!Buffer.TYPED_ARRAY_SUPPORT)value=Math.floor(value);
if(value<0)value=0xff+value+1;
this[offset]=value&0xff;
return offset+1;
};

Buffer.prototype.writeInt16LE=function writeInt16LE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset]=value&0xff;
this[offset+1]=value>>>8;
}else{
objectWriteUInt16(this,value,offset,true);
}
return offset+2;
};

Buffer.prototype.writeInt16BE=function writeInt16BE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,2,0x7fff,-0x8000);
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset]=value>>>8;
this[offset+1]=value&0xff;
}else{
objectWriteUInt16(this,value,offset,false);
}
return offset+2;
};

Buffer.prototype.writeInt32LE=function writeInt32LE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset]=value&0xff;
this[offset+1]=value>>>8;
this[offset+2]=value>>>16;
this[offset+3]=value>>>24;
}else{
objectWriteUInt32(this,value,offset,true);
}
return offset+4;
};

Buffer.prototype.writeInt32BE=function writeInt32BE(value,offset,noAssert){
value=+value;
offset=offset|0;
if(!noAssert)checkInt(this,value,offset,4,0x7fffffff,-0x80000000);
if(value<0)value=0xffffffff+value+1;
if(Buffer.TYPED_ARRAY_SUPPORT){
this[offset]=value>>>24;
this[offset+1]=value>>>16;
this[offset+2]=value>>>8;
this[offset+3]=value&0xff;
}else{
objectWriteUInt32(this,value,offset,false);
}
return offset+4;
};

function checkIEEE754(buf,value,offset,ext,max,min){
if(offset+ext>buf.length)throw new RangeError('Index out of range');
if(offset<0)throw new RangeError('Index out of range');
}

function writeFloat(buf,value,offset,littleEndian,noAssert){
if(!noAssert){
checkIEEE754(buf,value,offset,4,3.4028234663852886e+38,-3.4028234663852886e+38);
}
ieee754.write(buf,value,offset,littleEndian,23,4);
return offset+4;
}

Buffer.prototype.writeFloatLE=function writeFloatLE(value,offset,noAssert){
return writeFloat(this,value,offset,true,noAssert);
};

Buffer.prototype.writeFloatBE=function writeFloatBE(value,offset,noAssert){
return writeFloat(this,value,offset,false,noAssert);
};

function writeDouble(buf,value,offset,littleEndian,noAssert){
if(!noAssert){
checkIEEE754(buf,value,offset,8,1.7976931348623157E+308,-1.7976931348623157E+308);
}
ieee754.write(buf,value,offset,littleEndian,52,8);
return offset+8;
}

Buffer.prototype.writeDoubleLE=function writeDoubleLE(value,offset,noAssert){
return writeDouble(this,value,offset,true,noAssert);
};

Buffer.prototype.writeDoubleBE=function writeDoubleBE(value,offset,noAssert){
return writeDouble(this,value,offset,false,noAssert);
};


Buffer.prototype.copy=function copy(target,targetStart,start,end){
if(!start)start=0;
if(!end&&end!==0)end=this.length;
if(targetStart>=target.length)targetStart=target.length;
if(!targetStart)targetStart=0;
if(end>0&&end<start)end=start;


if(end===start)return 0;
if(target.length===0||this.length===0)return 0;


if(targetStart<0){
throw new RangeError('targetStart out of bounds');
}
if(start<0||start>=this.length)throw new RangeError('sourceStart out of bounds');
if(end<0)throw new RangeError('sourceEnd out of bounds');


if(end>this.length)end=this.length;
if(target.length-targetStart<end-start){
end=target.length-targetStart+start;
}

var len=end-start;
var i;

if(this===target&&start<targetStart&&targetStart<end){

for(i=len-1;i>=0;--i){
target[i+targetStart]=this[i+start];
}
}else if(len<1000||!Buffer.TYPED_ARRAY_SUPPORT){

for(i=0;i<len;++i){
target[i+targetStart]=this[i+start];
}
}else{
Uint8Array.prototype.set.call(
target,
this.subarray(start,start+len),
targetStart);

}

return len;
};





Buffer.prototype.fill=function fill(val,start,end,encoding){

if(typeof val==='string'){
if(typeof start==='string'){
encoding=start;
start=0;
end=this.length;
}else if(typeof end==='string'){
encoding=end;
end=this.length;
}
if(val.length===1){
var code=val.charCodeAt(0);
if(code<256){
val=code;
}
}
if(encoding!==undefined&&typeof encoding!=='string'){
throw new TypeError('encoding must be a string');
}
if(typeof encoding==='string'&&!Buffer.isEncoding(encoding)){
throw new TypeError('Unknown encoding: '+encoding);
}
}else if(typeof val==='number'){
val=val&255;
}


if(start<0||this.length<start||this.length<end){
throw new RangeError('Out of range index');
}

if(end<=start){
return this;
}

start=start>>>0;
end=end===undefined?this.length:end>>>0;

if(!val)val=0;

var i;
if(typeof val==='number'){
for(i=start;i<end;++i){
this[i]=val;
}
}else{
var bytes=Buffer.isBuffer(val)?
val:
utf8ToBytes(new Buffer(val,encoding).toString());
var len=bytes.length;
for(i=0;i<end-start;++i){
this[i+start]=bytes[i%len];
}
}

return this;
};




var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;

function base64clean(str){

str=stringtrim(str).replace(INVALID_BASE64_RE,'');

if(str.length<2)return'';

while(str.length%4!==0){
str=str+'=';
}
return str;
}

function stringtrim(str){
if(str.trim)return str.trim();
return str.replace(/^\s+|\s+$/g,'');
}

function toHex(n){
if(n<16)return'0'+n.toString(16);
return n.toString(16);
}

function utf8ToBytes(string,units){
units=units||Infinity;
var codePoint;
var length=string.length;
var leadSurrogate=null;
var bytes=[];

for(var i=0;i<length;++i){
codePoint=string.charCodeAt(i);


if(codePoint>0xD7FF&&codePoint<0xE000){

if(!leadSurrogate){

if(codePoint>0xDBFF){

if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);
continue;
}else if(i+1===length){

if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);
continue;
}


leadSurrogate=codePoint;

continue;
}


if(codePoint<0xDC00){
if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);
leadSurrogate=codePoint;
continue;
}


codePoint=(leadSurrogate-0xD800<<10|codePoint-0xDC00)+0x10000;
}else if(leadSurrogate){

if((units-=3)>-1)bytes.push(0xEF,0xBF,0xBD);
}

leadSurrogate=null;


if(codePoint<0x80){
if((units-=1)<0)break;
bytes.push(codePoint);
}else if(codePoint<0x800){
if((units-=2)<0)break;
bytes.push(
codePoint>>0x6|0xC0,
codePoint&0x3F|0x80);

}else if(codePoint<0x10000){
if((units-=3)<0)break;
bytes.push(
codePoint>>0xC|0xE0,
codePoint>>0x6&0x3F|0x80,
codePoint&0x3F|0x80);

}else if(codePoint<0x110000){
if((units-=4)<0)break;
bytes.push(
codePoint>>0x12|0xF0,
codePoint>>0xC&0x3F|0x80,
codePoint>>0x6&0x3F|0x80,
codePoint&0x3F|0x80);

}else{
throw new Error('Invalid code point');
}
}

return bytes;
}

function asciiToBytes(str){
var byteArray=[];
for(var i=0;i<str.length;++i){

byteArray.push(str.charCodeAt(i)&0xFF);
}
return byteArray;
}

function utf16leToBytes(str,units){
var c,hi,lo;
var byteArray=[];
for(var i=0;i<str.length;++i){
if((units-=2)<0)break;

c=str.charCodeAt(i);
hi=c>>8;
lo=c%256;
byteArray.push(lo);
byteArray.push(hi);
}

return byteArray;
}

function base64ToBytes(str){
return base64.toByteArray(base64clean(str));
}

function blitBuffer(src,dst,offset,length){
for(var i=0;i<length;++i){
if(i+offset>=dst.length||i>=src.length)break;
dst[i+offset]=src[i];
}
return i;
}

function isnan(val){
return val!==val;
}

}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});
},{"1":1,"10":10,"13":13}],6:[function(require,module,exports){
module.exports={
"100":"Continue",
"101":"Switching Protocols",
"102":"Processing",
"200":"OK",
"201":"Created",
"202":"Accepted",
"203":"Non-Authoritative Information",
"204":"No Content",
"205":"Reset Content",
"206":"Partial Content",
"207":"Multi-Status",
"208":"Already Reported",
"226":"IM Used",
"300":"Multiple Choices",
"301":"Moved Permanently",
"302":"Found",
"303":"See Other",
"304":"Not Modified",
"305":"Use Proxy",
"307":"Temporary Redirect",
"308":"Permanent Redirect",
"400":"Bad Request",
"401":"Unauthorized",
"402":"Payment Required",
"403":"Forbidden",
"404":"Not Found",
"405":"Method Not Allowed",
"406":"Not Acceptable",
"407":"Proxy Authentication Required",
"408":"Request Timeout",
"409":"Conflict",
"410":"Gone",
"411":"Length Required",
"412":"Precondition Failed",
"413":"Payload Too Large",
"414":"URI Too Long",
"415":"Unsupported Media Type",
"416":"Range Not Satisfiable",
"417":"Expectation Failed",
"418":"I'm a teapot",
"421":"Misdirected Request",
"422":"Unprocessable Entity",
"423":"Locked",
"424":"Failed Dependency",
"425":"Unordered Collection",
"426":"Upgrade Required",
"428":"Precondition Required",
"429":"Too Many Requests",
"431":"Request Header Fields Too Large",
"451":"Unavailable For Legal Reasons",
"500":"Internal Server Error",
"501":"Not Implemented",
"502":"Bad Gateway",
"503":"Service Unavailable",
"504":"Gateway Timeout",
"505":"HTTP Version Not Supported",
"506":"Variant Also Negotiates",
"507":"Insufficient Storage",
"508":"Loop Detected",
"509":"Bandwidth Limit Exceeded",
"510":"Not Extended",
"511":"Network Authentication Required"};


},{}],7:[function(require,module,exports){
(function(Buffer){
























function isArray(arg){
if(Array.isArray){
return Array.isArray(arg);
}
return objectToString(arg)==='[object Array]';
}
exports.isArray=isArray;

function isBoolean(arg){
return typeof arg==='boolean';
}
exports.isBoolean=isBoolean;

function isNull(arg){
return arg===null;
}
exports.isNull=isNull;

function isNullOrUndefined(arg){
return arg==null;
}
exports.isNullOrUndefined=isNullOrUndefined;

function isNumber(arg){
return typeof arg==='number';
}
exports.isNumber=isNumber;

function isString(arg){
return typeof arg==='string';
}
exports.isString=isString;

function isSymbol(arg){
return(typeof arg==="undefined"?"undefined":_typeof2(arg))==='symbol';
}
exports.isSymbol=isSymbol;

function isUndefined(arg){
return arg===void 0;
}
exports.isUndefined=isUndefined;

function isRegExp(re){
return objectToString(re)==='[object RegExp]';
}
exports.isRegExp=isRegExp;

function isObject(arg){
return(typeof arg==="undefined"?"undefined":_typeof2(arg))==='object'&&arg!==null;
}
exports.isObject=isObject;

function isDate(d){
return objectToString(d)==='[object Date]';
}
exports.isDate=isDate;

function isError(e){
return objectToString(e)==='[object Error]'||e instanceof Error;
}
exports.isError=isError;

function isFunction(arg){
return typeof arg==='function';
}
exports.isFunction=isFunction;

function isPrimitive(arg){
return arg===null||
typeof arg==='boolean'||
typeof arg==='number'||
typeof arg==='string'||
(typeof arg==="undefined"?"undefined":_typeof2(arg))==='symbol'||
typeof arg==='undefined';
}
exports.isPrimitive=isPrimitive;

exports.isBuffer=Buffer.isBuffer;

function objectToString(o){
return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require(12)});
},{"12":12}],8:[function(require,module,exports){





















function EventEmitter(){
this._events=this._events||{};
this._maxListeners=this._maxListeners||undefined;
}
module.exports=EventEmitter;


EventEmitter.EventEmitter=EventEmitter;

EventEmitter.prototype._events=undefined;
EventEmitter.prototype._maxListeners=undefined;



EventEmitter.defaultMaxListeners=10;



EventEmitter.prototype.setMaxListeners=function(n){
if(!isNumber(n)||n<0||isNaN(n))
throw TypeError('n must be a positive number');
this._maxListeners=n;
return this;
};

EventEmitter.prototype.emit=function(type){
var er,handler,len,args,i,listeners;

if(!this._events)
this._events={};


if(type==='error'){
if(!this._events.error||
isObject(this._events.error)&&!this._events.error.length){
er=arguments[1];
if(er instanceof Error){
throw er;
}else{

var err=new Error('Uncaught, unspecified "error" event. ('+er+')');
err.context=er;
throw err;
}
}
}

handler=this._events[type];

if(isUndefined(handler))
return false;

if(isFunction(handler)){
switch(arguments.length){

case 1:
handler.call(this);
break;
case 2:
handler.call(this,arguments[1]);
break;
case 3:
handler.call(this,arguments[1],arguments[2]);
break;

default:
args=Array.prototype.slice.call(arguments,1);
handler.apply(this,args);}

}else if(isObject(handler)){
args=Array.prototype.slice.call(arguments,1);
listeners=handler.slice();
len=listeners.length;
for(i=0;i<len;i++){
listeners[i].apply(this,args);}
}

return true;
};

EventEmitter.prototype.addListener=function(type,listener){
var m;

if(!isFunction(listener))
throw TypeError('listener must be a function');

if(!this._events)
this._events={};



if(this._events.newListener)
this.emit('newListener',type,
isFunction(listener.listener)?
listener.listener:listener);

if(!this._events[type])

this._events[type]=listener;else
if(isObject(this._events[type]))

this._events[type].push(listener);else


this._events[type]=[this._events[type],listener];


if(isObject(this._events[type])&&!this._events[type].warned){
if(!isUndefined(this._maxListeners)){
m=this._maxListeners;
}else{
m=EventEmitter.defaultMaxListeners;
}

if(m&&m>0&&this._events[type].length>m){
this._events[type].warned=true;
console.error('(node) warning: possible EventEmitter memory '+
'leak detected. %d listeners added. '+
'Use emitter.setMaxListeners() to increase limit.',
this._events[type].length);
if(typeof console.trace==='function'){

console.trace();
}
}
}

return this;
};

EventEmitter.prototype.on=EventEmitter.prototype.addListener;

EventEmitter.prototype.once=function(type,listener){
if(!isFunction(listener))
throw TypeError('listener must be a function');

var fired=false;

function g(){
this.removeListener(type,g);

if(!fired){
fired=true;
listener.apply(this,arguments);
}
}

g.listener=listener;
this.on(type,g);

return this;
};


EventEmitter.prototype.removeListener=function(type,listener){
var list,position,length,i;

if(!isFunction(listener))
throw TypeError('listener must be a function');

if(!this._events||!this._events[type])
return this;

list=this._events[type];
length=list.length;
position=-1;

if(list===listener||
isFunction(list.listener)&&list.listener===listener){
delete this._events[type];
if(this._events.removeListener)
this.emit('removeListener',type,listener);

}else if(isObject(list)){
for(i=length;i-->0;){
if(list[i]===listener||
list[i].listener&&list[i].listener===listener){
position=i;
break;
}
}

if(position<0)
return this;

if(list.length===1){
list.length=0;
delete this._events[type];
}else{
list.splice(position,1);
}

if(this._events.removeListener)
this.emit('removeListener',type,listener);
}

return this;
};

EventEmitter.prototype.removeAllListeners=function(type){
var key,listeners;

if(!this._events)
return this;


if(!this._events.removeListener){
if(arguments.length===0)
this._events={};else
if(this._events[type])
delete this._events[type];
return this;
}


if(arguments.length===0){
for(key in this._events){
if(key==='removeListener')continue;
this.removeAllListeners(key);
}
this.removeAllListeners('removeListener');
this._events={};
return this;
}

listeners=this._events[type];

if(isFunction(listeners)){
this.removeListener(type,listeners);
}else if(listeners){

while(listeners.length){
this.removeListener(type,listeners[listeners.length-1]);}
}
delete this._events[type];

return this;
};

EventEmitter.prototype.listeners=function(type){
var ret;
if(!this._events||!this._events[type])
ret=[];else
if(isFunction(this._events[type]))
ret=[this._events[type]];else

ret=this._events[type].slice();
return ret;
};

EventEmitter.prototype.listenerCount=function(type){
if(this._events){
var evlistener=this._events[type];

if(isFunction(evlistener))
return 1;else
if(evlistener)
return evlistener.length;
}
return 0;
};

EventEmitter.listenerCount=function(emitter,type){
return emitter.listenerCount(type);
};

function isFunction(arg){
return typeof arg==='function';
}

function isNumber(arg){
return typeof arg==='number';
}

function isObject(arg){
return(typeof arg==="undefined"?"undefined":_typeof2(arg))==='object'&&arg!==null;
}

function isUndefined(arg){
return arg===void 0;
}

},{}],9:[function(require,module,exports){
var http=require(72);

var https=module.exports;

for(var key in http){
if(http.hasOwnProperty(key))https[key]=http[key];
};

https.request=function(params,cb){
if(!params)params={};
params.scheme='https';
params.protocol='https:';
return http.request.call(this,params,cb);
};

},{"72":72}],10:[function(require,module,exports){
exports.read=function(buffer,offset,isLE,mLen,nBytes){
var e,m;
var eLen=nBytes*8-mLen-1;
var eMax=(1<<eLen)-1;
var eBias=eMax>>1;
var nBits=-7;
var i=isLE?nBytes-1:0;
var d=isLE?-1:1;
var s=buffer[offset+i];

i+=d;

e=s&(1<<-nBits)-1;
s>>=-nBits;
nBits+=eLen;
for(;nBits>0;e=e*256+buffer[offset+i],i+=d,nBits-=8){}

m=e&(1<<-nBits)-1;
e>>=-nBits;
nBits+=mLen;
for(;nBits>0;m=m*256+buffer[offset+i],i+=d,nBits-=8){}

if(e===0){
e=1-eBias;
}else if(e===eMax){
return m?NaN:(s?-1:1)*Infinity;
}else{
m=m+Math.pow(2,mLen);
e=e-eBias;
}
return(s?-1:1)*m*Math.pow(2,e-mLen);
};

exports.write=function(buffer,value,offset,isLE,mLen,nBytes){
var e,m,c;
var eLen=nBytes*8-mLen-1;
var eMax=(1<<eLen)-1;
var eBias=eMax>>1;
var rt=mLen===23?Math.pow(2,-24)-Math.pow(2,-77):0;
var i=isLE?0:nBytes-1;
var d=isLE?1:-1;
var s=value<0||value===0&&1/value<0?1:0;

value=Math.abs(value);

if(isNaN(value)||value===Infinity){
m=isNaN(value)?1:0;
e=eMax;
}else{
e=Math.floor(Math.log(value)/Math.LN2);
if(value*(c=Math.pow(2,-e))<1){
e--;
c*=2;
}
if(e+eBias>=1){
value+=rt/c;
}else{
value+=rt*Math.pow(2,1-eBias);
}
if(value*c>=2){
e++;
c/=2;
}

if(e+eBias>=eMax){
m=0;
e=eMax;
}else if(e+eBias>=1){
m=(value*c-1)*Math.pow(2,mLen);
e=e+eBias;
}else{
m=value*Math.pow(2,eBias-1)*Math.pow(2,mLen);
e=0;
}
}

for(;mLen>=8;buffer[offset+i]=m&0xff,i+=d,m/=256,mLen-=8){}

e=e<<mLen|m;
eLen+=mLen;
for(;eLen>0;buffer[offset+i]=e&0xff,i+=d,e/=256,eLen-=8){}

buffer[offset+i-d]|=s*128;
};

},{}],11:[function(require,module,exports){
if(typeof Object.create==='function'){

module.exports=function inherits(ctor,superCtor){
ctor.super_=superCtor;
ctor.prototype=Object.create(superCtor.prototype,{
constructor:{
value:ctor,
enumerable:false,
writable:true,
configurable:true}});


};
}else{

module.exports=function inherits(ctor,superCtor){
ctor.super_=superCtor;
var TempCtor=function TempCtor(){};
TempCtor.prototype=superCtor.prototype;
ctor.prototype=new TempCtor();
ctor.prototype.constructor=ctor;
};
}

},{}],12:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */



module.exports=function(obj){
return obj!=null&&(isBuffer(obj)||isSlowBuffer(obj)||!!obj._isBuffer);
};

function isBuffer(obj){
return!!obj.constructor&&typeof obj.constructor.isBuffer==='function'&&obj.constructor.isBuffer(obj);
}


function isSlowBuffer(obj){
return typeof obj.readFloatLE==='function'&&typeof obj.slice==='function'&&isBuffer(obj.slice(0,0));
}

},{}],13:[function(require,module,exports){
var toString={}.toString;

module.exports=Array.isArray||function(arr){
return toString.call(arr)=='[object Array]';
};

},{}],14:[function(require,module,exports){
'use strict';

var _barcodes=require(41);

var _barcodes2=_interopRequireDefault(_barcodes);

var _merge=require(49);

var _merge2=_interopRequireDefault(_merge);

var _linearizeEncodings=require(48);

var _linearizeEncodings2=_interopRequireDefault(_linearizeEncodings);

var _fixOptions=require(45);

var _fixOptions2=_interopRequireDefault(_fixOptions);

var _getRenderProperties=require(47);

var _getRenderProperties2=_interopRequireDefault(_getRenderProperties);

var _optionsFromStrings=require(50);

var _optionsFromStrings2=_interopRequireDefault(_optionsFromStrings);

var _ErrorHandler=require(43);

var _ErrorHandler2=_interopRequireDefault(_ErrorHandler);

var _exceptions=require(44);

var _defaults=require(51);

var _defaults2=_interopRequireDefault(_defaults);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}





var API=function API(){};











var JsBarcode=function JsBarcode(element,text,options){
var api=new API();

if(typeof element==="undefined"){
throw Error("No element to render on was provided.");
}


api._renderProperties=(0,_getRenderProperties2.default)(element);
api._encodings=[];
api._options=_defaults2.default;
api._errorHandler=new _ErrorHandler2.default(api);


if(typeof text!=="undefined"){
options=options||{};

if(!options.format){
options.format=autoSelectBarcode();
}

api.options(options)[options.format](text,options).render();
}

return api;
};


JsBarcode.getModule=function(name){
return _barcodes2.default[name];
};


for(var name in _barcodes2.default){
if(_barcodes2.default.hasOwnProperty(name)){

registerBarcode(_barcodes2.default,name);
}
}
function registerBarcode(barcodes,name){
API.prototype[name]=API.prototype[name.toUpperCase()]=API.prototype[name.toLowerCase()]=function(text,options){
var api=this;
return api._errorHandler.wrapBarcodeCall(function(){

options.text=typeof options.text==='undefined'?undefined:''+options.text;

var newOptions=(0,_merge2.default)(api._options,options);
newOptions=(0,_optionsFromStrings2.default)(newOptions);
var Encoder=barcodes[name];
var encoded=encode(text,Encoder,newOptions);
api._encodings.push(encoded);

return api;
});
};
}


function encode(text,Encoder,options){

text=""+text;

var encoder=new Encoder(text,options);



if(!encoder.valid()){
throw new _exceptions.InvalidInputException(encoder.constructor.name,text);
}


var encoded=encoder.encode();



encoded=(0,_linearizeEncodings2.default)(encoded);


for(var i=0;i<encoded.length;i++){
encoded[i].options=(0,_merge2.default)(options,encoded[i].options);
}

return encoded;
}

function autoSelectBarcode(){

if(_barcodes2.default["CODE128"]){
return"CODE128";
}


return Object.keys(_barcodes2.default)[0];
}



API.prototype.options=function(options){
this._options=(0,_merge2.default)(this._options,options);
return this;
};


API.prototype.blank=function(size){
var zeroes="0".repeat(size);
this._encodings.push({data:zeroes});
return this;
};


API.prototype.init=function(){

if(!this._renderProperties){
return;
}


if(!Array.isArray(this._renderProperties)){
this._renderProperties=[this._renderProperties];
}

var renderProperty;
for(var i in this._renderProperties){
renderProperty=this._renderProperties[i];
var options=(0,_merge2.default)(this._options,renderProperty.options);

if(options.format=="auto"){
options.format=autoSelectBarcode();
}

this._errorHandler.wrapBarcodeCall(function(){
var text=options.value;
var Encoder=_barcodes2.default[options.format.toUpperCase()];
var encoded=encode(text,Encoder,options);

render(renderProperty,encoded,options);
});
}
};


API.prototype.render=function(){
if(!this._renderProperties){
throw new _exceptions.NoElementException();
}

if(Array.isArray(this._renderProperties)){
for(var i=0;i<this._renderProperties.length;i++){
render(this._renderProperties[i],this._encodings,this._options);
}
}else{
render(this._renderProperties,this._encodings,this._options);
}

return this;
};

API.prototype._defaults=_defaults2.default;


function render(renderProperties,encodings,options){
encodings=(0,_linearizeEncodings2.default)(encodings);

for(var i=0;i<encodings.length;i++){
encodings[i].options=(0,_merge2.default)(options,encodings[i].options);
(0,_fixOptions2.default)(encodings[i].options);
}

(0,_fixOptions2.default)(options);

var Renderer=renderProperties.renderer;
var renderer=new Renderer(renderProperties.element,encodings,options);
renderer.render();

if(renderProperties.afterRender){
renderProperties.afterRender();
}
}


if(typeof window!=="undefined"){
window.JsBarcode=JsBarcode;
}



if(typeof jQuery!=='undefined'){
jQuery.fn.JsBarcode=function(content,options){
var elementArray=[];
jQuery(this).each(function(){
elementArray.push(this);
});
return JsBarcode(elementArray,content,options);
};
}


module.exports=JsBarcode;
},{"41":41,"43":43,"44":44,"45":45,"47":47,"48":48,"49":49,"50":50,"51":51}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var Barcode=function Barcode(data,options){
_classCallCheck(this,Barcode);

this.data=data;
this.text=options.text||data;
this.options=options;
};

exports.default=Barcode;
},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var CODE128=function(_Barcode){
_inherits(CODE128,_Barcode);

function CODE128(data,options){
_classCallCheck(this,CODE128);


var _this=_possibleConstructorReturn(this,_Barcode.call(this,data.substring(1),options));

_this.bytes=[];
for(var i=0;i<data.length;++i){
_this.bytes.push(data.charCodeAt(i));
}



_this.encodings=[
740,644,638,176,164,100,224,220,124,608,604,572,436,244,230,484,260,254,650,628,614,764,652,902,868,836,830,892,844,842,752,734,590,304,112,94,416,128,122,672,576,570,464,422,134,496,478,142,910,678,582,768,762,774,880,862,814,896,890,818,914,602,930,328,292,200,158,68,62,424,412,232,218,76,74,554,616,978,556,146,340,212,182,508,268,266,956,940,938,758,782,974,400,310,118,512,506,960,954,502,518,886,966,668,680,692,5379];
return _this;
}




CODE128.prototype.encode=function encode(){
var encodingResult;
var bytes=this.bytes;

var startIndex=bytes.shift()-105;


if(startIndex===103){
encodingResult=this.nextA(bytes,1);
}else if(startIndex===104){
encodingResult=this.nextB(bytes,1);
}else if(startIndex===105){
encodingResult=this.nextC(bytes,1);
}else{
throw new InvalidStartCharacterException();
}

return{
text:this.text==this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,
data:

this.getEncoding(startIndex)+

encodingResult.result+

this.getEncoding((encodingResult.checksum+startIndex)%103)+

this.getEncoding(106)};

};

CODE128.prototype.getEncoding=function getEncoding(n){
return this.encodings[n]?(this.encodings[n]+1000).toString(2):'';
};




CODE128.prototype.valid=function valid(){

return this.data.search(/^[\x00-\x7F\xC8-\xD3]+$/)!==-1;
};

CODE128.prototype.nextA=function nextA(bytes,depth){
if(bytes.length<=0){
return{"result":"","checksum":0};
}

var next,index;


if(bytes[0]>=200){
index=bytes[0]-105;


bytes.shift();


if(index===99){
next=this.nextC(bytes,depth+1);
}else

if(index===100){
next=this.nextB(bytes,depth+1);
}else

if(index===98){

bytes[0]=bytes[0]>95?bytes[0]-96:bytes[0];
next=this.nextA(bytes,depth+1);
}else

{
next=this.nextA(bytes,depth+1);
}
}else

{
var charCode=bytes[0];
index=charCode<32?charCode+64:charCode-32;


bytes.shift();

next=this.nextA(bytes,depth+1);
}


var enc=this.getEncoding(index);
var weight=index*depth;

return{
"result":enc+next.result,
"checksum":weight+next.checksum};

};

CODE128.prototype.nextB=function nextB(bytes,depth){
if(bytes.length<=0){
return{"result":"","checksum":0};
}

var next,index;


if(bytes[0]>=200){
index=bytes[0]-105;


bytes.shift();


if(index===99){
next=this.nextC(bytes,depth+1);
}else

if(index===101){
next=this.nextA(bytes,depth+1);
}else

if(index===98){

bytes[0]=bytes[0]<32?bytes[0]+96:bytes[0];
next=this.nextB(bytes,depth+1);
}else

{
next=this.nextB(bytes,depth+1);
}
}else

{
index=bytes[0]-32;
bytes.shift();
next=this.nextB(bytes,depth+1);
}


var enc=this.getEncoding(index);
var weight=index*depth;

return{"result":enc+next.result,"checksum":weight+next.checksum};
};

CODE128.prototype.nextC=function nextC(bytes,depth){
if(bytes.length<=0){
return{"result":"","checksum":0};
}

var next,index;


if(bytes[0]>=200){
index=bytes[0]-105;


bytes.shift();


if(index===100){
next=this.nextB(bytes,depth+1);
}else

if(index===101){
next=this.nextA(bytes,depth+1);
}else

{
next=this.nextC(bytes,depth+1);
}
}else

{
index=(bytes[0]-48)*10+bytes[1]-48;
bytes.shift();
bytes.shift();
next=this.nextC(bytes,depth+1);
}


var enc=this.getEncoding(index);
var weight=index*depth;

return{"result":enc+next.result,"checksum":weight+next.checksum};
};

return CODE128;
}(_Barcode3.default);

var InvalidStartCharacterException=function(_Error){
_inherits(InvalidStartCharacterException,_Error);

function InvalidStartCharacterException(){
_classCallCheck(this,InvalidStartCharacterException);

var _this2=_possibleConstructorReturn(this,_Error.call(this));

_this2.name="InvalidStartCharacterException";
_this2.message="The encoding does not start with a start character.";
return _this2;
}

return InvalidStartCharacterException;
}(Error);

exports.default=CODE128;
},{"15":15}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _CODE2=require(16);

var _CODE3=_interopRequireDefault(_CODE2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var CODE128A=function(_CODE){
_inherits(CODE128A,_CODE);

function CODE128A(string,options){
_classCallCheck(this,CODE128A);

return _possibleConstructorReturn(this,_CODE.call(this,String.fromCharCode(208)+string,options));
}

CODE128A.prototype.valid=function valid(){
return this.data.search(/^[\x00-\x5F\xC8-\xCF]+$/)!==-1;
};

return CODE128A;
}(_CODE3.default);

exports.default=CODE128A;
},{"16":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _CODE2=require(16);

var _CODE3=_interopRequireDefault(_CODE2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var CODE128B=function(_CODE){
_inherits(CODE128B,_CODE);

function CODE128B(string,options){
_classCallCheck(this,CODE128B);

return _possibleConstructorReturn(this,_CODE.call(this,String.fromCharCode(209)+string,options));
}

CODE128B.prototype.valid=function valid(){
return this.data.search(/^[\x20-\x7F\xC8-\xCF]+$/)!==-1;
};

return CODE128B;
}(_CODE3.default);

exports.default=CODE128B;
},{"16":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _CODE2=require(16);

var _CODE3=_interopRequireDefault(_CODE2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var CODE128C=function(_CODE){
_inherits(CODE128C,_CODE);

function CODE128C(string,options){
_classCallCheck(this,CODE128C);

return _possibleConstructorReturn(this,_CODE.call(this,String.fromCharCode(210)+string,options));
}

CODE128C.prototype.valid=function valid(){
return this.data.search(/^(\xCF*[0-9]{2}\xCF*)+$/)!==-1;
};

return CODE128C;
}(_CODE3.default);

exports.default=CODE128C;
},{"16":16}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _CODE2=require(16);

var _CODE3=_interopRequireDefault(_CODE2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var CODE128AUTO=function(_CODE){
_inherits(CODE128AUTO,_CODE);

function CODE128AUTO(data,options){
_classCallCheck(this,CODE128AUTO);


if(data.search(/^[\x00-\x7F\xC8-\xD3]+$/)!==-1){
var _this=_possibleConstructorReturn(this,_CODE.call(this,autoSelectModes(data),options));
}else{
var _this=_possibleConstructorReturn(this,_CODE.call(this,data,options));
}
return _possibleConstructorReturn(_this);
}

return CODE128AUTO;
}(_CODE3.default);

function autoSelectModes(string){

var aLength=string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;

var bLength=string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;

var cLength=string.match(/^(\xCF*[0-9]{2}\xCF*)*/)[0].length;

var newString;

if(cLength>=2){
newString=String.fromCharCode(210)+autoSelectFromC(string);
}else

if(aLength>bLength){
newString=String.fromCharCode(208)+autoSelectFromA(string);
}else{
newString=String.fromCharCode(209)+autoSelectFromB(string);
}

newString=newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(match,char){
return String.fromCharCode(203)+char;
});

return newString;
}

function autoSelectFromA(string){
var untilC=string.match(/^([\x00-\x5F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

if(untilC){
return untilC[1]+String.fromCharCode(204)+autoSelectFromC(string.substring(untilC[1].length));
}

var aChars=string.match(/^[\x00-\x5F\xC8-\xCF]+/);
if(aChars[0].length===string.length){
return string;
}

return aChars[0]+String.fromCharCode(205)+autoSelectFromB(string.substring(aChars[0].length));
}

function autoSelectFromB(string){
var untilC=string.match(/^([\x20-\x7F\xC8-\xCF]+?)(([0-9]{2}){2,})([^0-9]|$)/);

if(untilC){
return untilC[1]+String.fromCharCode(204)+autoSelectFromC(string.substring(untilC[1].length));
}

var bChars=string.match(/^[\x20-\x7F\xC8-\xCF]+/);
if(bChars[0].length===string.length){
return string;
}

return bChars[0]+String.fromCharCode(206)+autoSelectFromA(string.substring(bChars[0].length));
}

function autoSelectFromC(string){
var cMatch=string.match(/^(\xCF*[0-9]{2}\xCF*)+/)[0];
var length=cMatch.length;

if(length===string.length){
return string;
}

string=string.substring(length);


var aLength=string.match(/^[\x00-\x5F\xC8-\xCF]*/)[0].length;
var bLength=string.match(/^[\x20-\x7F\xC8-\xCF]*/)[0].length;
if(aLength>=bLength){
return cMatch+String.fromCharCode(206)+autoSelectFromA(string);
}else{
return cMatch+String.fromCharCode(205)+autoSelectFromB(string);
}
}

exports.default=CODE128AUTO;
},{"16":16}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.CODE128C=exports.CODE128B=exports.CODE128A=exports.CODE128=undefined;

var _CODE128_AUTO=require(20);

var _CODE128_AUTO2=_interopRequireDefault(_CODE128_AUTO);

var _CODE128A=require(17);

var _CODE128A2=_interopRequireDefault(_CODE128A);

var _CODE128B=require(18);

var _CODE128B2=_interopRequireDefault(_CODE128B);

var _CODE128C=require(19);

var _CODE128C2=_interopRequireDefault(_CODE128C);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

exports.CODE128=_CODE128_AUTO2.default;
exports.CODE128A=_CODE128A2.default;
exports.CODE128B=_CODE128B2.default;
exports.CODE128C=_CODE128C2.default;
},{"17":17,"18":18,"19":19,"20":20}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.CODE39=undefined;

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var CODE39=function(_Barcode){
_inherits(CODE39,_Barcode);

function CODE39(data,options){
_classCallCheck(this,CODE39);

data=data.toUpperCase();


if(options.mod43){
data+=getCharacter(mod43checksum(data));
}

return _possibleConstructorReturn(this,_Barcode.call(this,data,options));
}

CODE39.prototype.encode=function encode(){

var result=getEncoding("*");


for(var i=0;i<this.data.length;i++){
result+=getEncoding(this.data[i])+"0";
}


result+=getEncoding("*");

return{
data:result,
text:this.text};

};

CODE39.prototype.valid=function valid(){
return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)!==-1;
};

return CODE39;
}(_Barcode3.default);




var characters=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"];



var encodings=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];



function getEncoding(character){
return getBinary(characterValue(character));
}

function getBinary(characterValue){
return encodings[characterValue].toString(2);
}

function getCharacter(characterValue){
return characters[characterValue];
}

function characterValue(character){
return characters.indexOf(character);
}

function mod43checksum(data){
var checksum=0;
for(var i=0;i<data.length;i++){
checksum+=characterValue(data[i]);
}

checksum=checksum%43;
return checksum;
}

exports.CODE39=CODE39;
},{"15":15}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _ean_encoder=require(28);

var _ean_encoder2=_interopRequireDefault(_ean_encoder);

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var EAN13=function(_Barcode){
_inherits(EAN13,_Barcode);

function EAN13(data,options){
_classCallCheck(this,EAN13);


if(data.search(/^[0-9]{12}$/)!==-1){
data+=checksum(data);
}


var _this=_possibleConstructorReturn(this,_Barcode.call(this,data,options));

if(!options.flat&&options.fontSize>options.width*10){
_this.fontSize=options.width*10;
}else{
_this.fontSize=options.fontSize;
}


_this.guardHeight=options.height+_this.fontSize/2+options.textMargin;


_this.lastChar=options.lastChar;
return _this;
}

EAN13.prototype.valid=function valid(){
return this.data.search(/^[0-9]{13}$/)!==-1&&this.data[12]==checksum(this.data);
};

EAN13.prototype.encode=function encode(){
if(this.options.flat){
return this.flatEncoding();
}else{
return this.guardedEncoding();
}
};




EAN13.prototype.getStructure=function getStructure(){
return["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];
};




EAN13.prototype.guardedEncoding=function guardedEncoding(){
var encoder=new _ean_encoder2.default();
var result=[];

var structure=this.getStructure()[this.data[0]];


var leftSide=this.data.substr(1,6);


var rightSide=this.data.substr(7,6);


if(this.options.displayValue){
result.push({
data:"000000000000",
text:this.text.substr(0,1),
options:{textAlign:"left",fontSize:this.fontSize}});

}


result.push({
data:"101",
options:{height:this.guardHeight}});



result.push({
data:encoder.encode(leftSide,structure),
text:this.text.substr(1,6),
options:{fontSize:this.fontSize}});



result.push({
data:"01010",
options:{height:this.guardHeight}});



result.push({
data:encoder.encode(rightSide,"RRRRRR"),
text:this.text.substr(7,6),
options:{fontSize:this.fontSize}});



result.push({
data:"101",
options:{height:this.guardHeight}});


if(this.options.lastChar&&this.options.displayValue){
result.push({data:"00"});

result.push({
data:"00000",
text:this.options.lastChar,
options:{fontSize:this.fontSize}});

}
return result;
};

EAN13.prototype.flatEncoding=function flatEncoding(){
var encoder=new _ean_encoder2.default();
var result="";

var structure=this.getStructure()[this.data[0]];

result+="101";
result+=encoder.encode(this.data.substr(1,6),structure);
result+="01010";
result+=encoder.encode(this.data.substr(7,6),"RRRRRR");
result+="101";

return{
data:result,
text:this.text};

};

return EAN13;
}(_Barcode3.default);





function checksum(number){
var result=0;

var i;
for(i=0;i<12;i+=2){
result+=parseInt(number[i]);
}
for(i=1;i<12;i+=2){
result+=parseInt(number[i])*3;
}

return(10-result%10)%10;
}

exports.default=EAN13;
},{"15":15,"28":28}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _ean_encoder=require(28);

var _ean_encoder2=_interopRequireDefault(_ean_encoder);

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var EAN2=function(_Barcode){
_inherits(EAN2,_Barcode);

function EAN2(data,options){
_classCallCheck(this,EAN2);

var _this=_possibleConstructorReturn(this,_Barcode.call(this,data,options));

_this.structure=["LL","LG","GL","GG"];
return _this;
}

EAN2.prototype.valid=function valid(){
return this.data.search(/^[0-9]{2}$/)!==-1;
};

EAN2.prototype.encode=function encode(){
var encoder=new _ean_encoder2.default();


var structure=this.structure[parseInt(this.data)%4];


var result="1011";


result+=encoder.encode(this.data,structure,"01");

return{
data:result,
text:this.text};

};

return EAN2;
}(_Barcode3.default);

exports.default=EAN2;
},{"15":15,"28":28}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _ean_encoder=require(28);

var _ean_encoder2=_interopRequireDefault(_ean_encoder);

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var EAN5=function(_Barcode){
_inherits(EAN5,_Barcode);

function EAN5(data,options){
_classCallCheck(this,EAN5);


var _this=_possibleConstructorReturn(this,_Barcode.call(this,data,options));

_this.structure=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"];
return _this;
}

EAN5.prototype.valid=function valid(){
return this.data.search(/^[0-9]{5}$/)!==-1;
};

EAN5.prototype.encode=function encode(){
var encoder=new _ean_encoder2.default();
var checksum=this.checksum();


var result="1011";


result+=encoder.encode(this.data,this.structure[checksum],"01");

return{
data:result,
text:this.text};

};

EAN5.prototype.checksum=function checksum(){
var result=0;

result+=parseInt(this.data[0])*3;
result+=parseInt(this.data[1])*9;
result+=parseInt(this.data[2])*3;
result+=parseInt(this.data[3])*9;
result+=parseInt(this.data[4])*3;

return result%10;
};

return EAN5;
}(_Barcode3.default);

exports.default=EAN5;
},{"15":15,"28":28}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _ean_encoder=require(28);

var _ean_encoder2=_interopRequireDefault(_ean_encoder);

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var EAN8=function(_Barcode){
_inherits(EAN8,_Barcode);

function EAN8(data,options){
_classCallCheck(this,EAN8);


if(data.search(/^[0-9]{7}$/)!==-1){
data+=checksum(data);
}

return _possibleConstructorReturn(this,_Barcode.call(this,data,options));
}

EAN8.prototype.valid=function valid(){
return this.data.search(/^[0-9]{8}$/)!==-1&&this.data[7]==checksum(this.data);
};

EAN8.prototype.encode=function encode(){
var encoder=new _ean_encoder2.default();


var result="";


var leftSide=this.data.substr(0,4);


var rightSide=this.data.substr(4,4);


result+=encoder.startBin;


result+=encoder.encode(leftSide,"LLLL");


result+=encoder.middleBin;


result+=encoder.encode(rightSide,"RRRR");


result+=encoder.endBin;

return{
data:result,
text:this.text};

};

return EAN8;
}(_Barcode3.default);




function checksum(number){
var result=0;

var i;
for(i=0;i<7;i+=2){
result+=parseInt(number[i])*3;
}

for(i=1;i<7;i+=2){
result+=parseInt(number[i]);
}

return(10-result%10)%10;
}

exports.default=EAN8;
},{"15":15,"28":28}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _ean_encoder=require(28);

var _ean_encoder2=_interopRequireDefault(_ean_encoder);

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var UPC=function(_Barcode){
_inherits(UPC,_Barcode);

function UPC(data,options){
_classCallCheck(this,UPC);


if(data.search(/^[0-9]{11}$/)!==-1){
data+=checksum(data);
}

var _this=_possibleConstructorReturn(this,_Barcode.call(this,data,options));

_this.displayValue=options.displayValue;


if(options.fontSize>options.width*10){
_this.fontSize=options.width*10;
}else{
_this.fontSize=options.fontSize;
}


_this.guardHeight=options.height+_this.fontSize/2+options.textMargin;
return _this;
}

UPC.prototype.valid=function valid(){
return this.data.search(/^[0-9]{12}$/)!==-1&&this.data[11]==checksum(this.data);
};

UPC.prototype.encode=function encode(){
if(this.options.flat){
return this.flatEncoding();
}else{
return this.guardedEncoding();
}
};

UPC.prototype.flatEncoding=function flatEncoding(){
var encoder=new _ean_encoder2.default();
var result="";

result+="101";
result+=encoder.encode(this.data.substr(0,6),"LLLLLL");
result+="01010";
result+=encoder.encode(this.data.substr(6,6),"RRRRRR");
result+="101";

return{
data:result,
text:this.text};

};

UPC.prototype.guardedEncoding=function guardedEncoding(){
var encoder=new _ean_encoder2.default();
var result=[];


if(this.displayValue){
result.push({
data:"00000000",
text:this.text.substr(0,1),
options:{textAlign:"left",fontSize:this.fontSize}});

}


result.push({
data:"101"+encoder.encode(this.data[0],"L"),
options:{height:this.guardHeight}});



result.push({
data:encoder.encode(this.data.substr(1,5),"LLLLL"),
text:this.text.substr(1,5),
options:{fontSize:this.fontSize}});



result.push({
data:"01010",
options:{height:this.guardHeight}});



result.push({
data:encoder.encode(this.data.substr(6,5),"RRRRR"),
text:this.text.substr(6,5),
options:{fontSize:this.fontSize}});



result.push({
data:encoder.encode(this.data[11],"R")+"101",
options:{height:this.guardHeight}});



if(this.displayValue){
result.push({
data:"00000000",
text:this.text.substr(11,1),
options:{textAlign:"right",fontSize:this.fontSize}});

}

return result;
};

return UPC;
}(_Barcode3.default);





function checksum(number){
var result=0;

var i;
for(i=1;i<11;i+=2){
result+=parseInt(number[i]);
}
for(i=0;i<11;i+=2){
result+=parseInt(number[i])*3;
}

return(10-result%10)%10;
}

exports.default=UPC;
},{"15":15,"28":28}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var EANencoder=function(){
function EANencoder(){
_classCallCheck(this,EANencoder);


this.startBin="101";
this.endBin="101";
this.middleBin="01010";


this.Lbinary=["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];


this.Gbinary=["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];


this.Rbinary=["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
}




EANencoder.prototype.encode=function encode(number,structure,separator){

var result="";


separator=separator||"";


for(var i=0;i<number.length;i++){

if(structure[i]=="L"){
result+=this.Lbinary[number[i]];
}else if(structure[i]=="G"){
result+=this.Gbinary[number[i]];
}else if(structure[i]=="R"){
result+=this.Rbinary[number[i]];
}


if(i<number.length-1){
result+=separator;
}
}
return result;
};

return EANencoder;
}();

exports.default=EANencoder;
},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.UPC=exports.EAN2=exports.EAN5=exports.EAN8=exports.EAN13=undefined;

var _EAN=require(23);

var _EAN2=_interopRequireDefault(_EAN);

var _EAN3=require(26);

var _EAN4=_interopRequireDefault(_EAN3);

var _EAN5=require(25);

var _EAN6=_interopRequireDefault(_EAN5);

var _EAN7=require(24);

var _EAN8=_interopRequireDefault(_EAN7);

var _UPC=require(27);

var _UPC2=_interopRequireDefault(_UPC);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

exports.EAN13=_EAN2.default;
exports.EAN8=_EAN4.default;
exports.EAN5=_EAN6.default;
exports.EAN2=_EAN8.default;
exports.UPC=_UPC2.default;
},{"23":23,"24":24,"25":25,"26":26,"27":27}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.GenericBarcode=undefined;

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var GenericBarcode=function(_Barcode){
_inherits(GenericBarcode,_Barcode);

function GenericBarcode(data,options){
_classCallCheck(this,GenericBarcode);

return _possibleConstructorReturn(this,_Barcode.call(this,data,options));
}




GenericBarcode.prototype.encode=function encode(){
return{
data:"10101010101010101010101010101010101010101",
text:this.text};

};




GenericBarcode.prototype.valid=function valid(){
return true;
};

return GenericBarcode;
}(_Barcode3.default);

exports.GenericBarcode=GenericBarcode;
},{"15":15}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.ITF=undefined;

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var ITF=function(_Barcode){
_inherits(ITF,_Barcode);

function ITF(data,options){
_classCallCheck(this,ITF);

var _this=_possibleConstructorReturn(this,_Barcode.call(this,data,options));

_this.binaryRepresentation={
"0":"00110",
"1":"10001",
"2":"01001",
"3":"11000",
"4":"00101",
"5":"10100",
"6":"01100",
"7":"00011",
"8":"10010",
"9":"01010"};

return _this;
}

ITF.prototype.valid=function valid(){
return this.data.search(/^([0-9]{2})+$/)!==-1;
};

ITF.prototype.encode=function encode(){

var result="1010";


for(var i=0;i<this.data.length;i+=2){
result+=this.calculatePair(this.data.substr(i,2));
}


result+="11101";

return{
data:result,
text:this.text};

};




ITF.prototype.calculatePair=function calculatePair(numberPair){
var result="";

var number1Struct=this.binaryRepresentation[numberPair[0]];
var number2Struct=this.binaryRepresentation[numberPair[1]];


for(var i=0;i<5;i++){
result+=number1Struct[i]=="1"?"111":"1";
result+=number2Struct[i]=="1"?"000":"0";
}

return result;
};

return ITF;
}(_Barcode3.default);

exports.ITF=ITF;
},{"15":15}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.ITF14=undefined;

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var ITF14=function(_Barcode){
_inherits(ITF14,_Barcode);

function ITF14(data,options){
_classCallCheck(this,ITF14);


if(data.search(/^[0-9]{13}$/)!==-1){
data+=checksum(data);
}

var _this=_possibleConstructorReturn(this,_Barcode.call(this,data,options));

_this.binaryRepresentation={
"0":"00110",
"1":"10001",
"2":"01001",
"3":"11000",
"4":"00101",
"5":"10100",
"6":"01100",
"7":"00011",
"8":"10010",
"9":"01010"};

return _this;
}

ITF14.prototype.valid=function valid(){
return this.data.search(/^[0-9]{14}$/)!==-1&&this.data[13]==checksum(this.data);
};

ITF14.prototype.encode=function encode(){
var result="1010";


for(var i=0;i<14;i+=2){
result+=this.calculatePair(this.data.substr(i,2));
}


result+="11101";

return{
data:result,
text:this.text};

};




ITF14.prototype.calculatePair=function calculatePair(numberPair){
var result="";

var number1Struct=this.binaryRepresentation[numberPair[0]];
var number2Struct=this.binaryRepresentation[numberPair[1]];


for(var i=0;i<5;i++){
result+=number1Struct[i]=="1"?"111":"1";
result+=number2Struct[i]=="1"?"000":"0";
}

return result;
};

return ITF14;
}(_Barcode3.default);




function checksum(data){
var result=0;

for(var i=0;i<13;i++){
result+=parseInt(data[i])*(3-i%2*2);
}

return Math.ceil(result/10)*10-result;
}

exports.ITF14=ITF14;
},{"15":15}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var MSI=function(_Barcode){
_inherits(MSI,_Barcode);

function MSI(data,options){
_classCallCheck(this,MSI);

return _possibleConstructorReturn(this,_Barcode.call(this,data,options));
}

MSI.prototype.encode=function encode(){

var ret="110";

for(var i=0;i<this.data.length;i++){

var digit=parseInt(this.data[i]);
var bin=digit.toString(2);
bin=addZeroes(bin,4-bin.length);


for(var b=0;b<bin.length;b++){
ret+=bin[b]=="0"?"100":"110";
}
}


ret+="1001";

return{
data:ret,
text:this.text};

};

MSI.prototype.valid=function valid(){
return this.data.search(/^[0-9]+$/)!==-1;
};

return MSI;
}(_Barcode3.default);

function addZeroes(number,n){
for(var i=0;i<n;i++){
number="0"+number;
}
return number;
}

exports.default=MSI;
},{"15":15}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _MSI2=require(33);

var _MSI3=_interopRequireDefault(_MSI2);

var _checksums=require(38);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var MSI10=function(_MSI){
_inherits(MSI10,_MSI);

function MSI10(data,options){
_classCallCheck(this,MSI10);

return _possibleConstructorReturn(this,_MSI.call(this,data+(0,_checksums.mod10)(data),options));
}

return MSI10;
}(_MSI3.default);

exports.default=MSI10;
},{"33":33,"38":38}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _MSI2=require(33);

var _MSI3=_interopRequireDefault(_MSI2);

var _checksums=require(38);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var MSI1010=function(_MSI){
_inherits(MSI1010,_MSI);

function MSI1010(data,options){
_classCallCheck(this,MSI1010);

data+=(0,_checksums.mod10)(data);
data+=(0,_checksums.mod10)(data);
return _possibleConstructorReturn(this,_MSI.call(this,data,options));
}

return MSI1010;
}(_MSI3.default);

exports.default=MSI1010;
},{"33":33,"38":38}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _MSI2=require(33);

var _MSI3=_interopRequireDefault(_MSI2);

var _checksums=require(38);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var MSI11=function(_MSI){
_inherits(MSI11,_MSI);

function MSI11(data,options){
_classCallCheck(this,MSI11);

return _possibleConstructorReturn(this,_MSI.call(this,data+(0,_checksums.mod11)(data),options));
}

return MSI11;
}(_MSI3.default);

exports.default=MSI11;
},{"33":33,"38":38}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _MSI2=require(33);

var _MSI3=_interopRequireDefault(_MSI2);

var _checksums=require(38);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var MSI1110=function(_MSI){
_inherits(MSI1110,_MSI);

function MSI1110(data,options){
_classCallCheck(this,MSI1110);

data+=(0,_checksums.mod11)(data);
data+=(0,_checksums.mod10)(data);
return _possibleConstructorReturn(this,_MSI.call(this,data,options));
}

return MSI1110;
}(_MSI3.default);

exports.default=MSI1110;
},{"33":33,"38":38}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.mod10=mod10;
exports.mod11=mod11;
function mod10(number){
var sum=0;
for(var i=0;i<number.length;i++){
var n=parseInt(number[i]);
if((i+number.length)%2===0){
sum+=n;
}else{
sum+=n*2%10+Math.floor(n*2/10);
}
}
return(10-sum%10)%10;
}

function mod11(number){
var sum=0;
var weights=[2,3,4,5,6,7];
for(var i=0;i<number.length;i++){
var n=parseInt(number[number.length-1-i]);
sum+=weights[i%weights.length]*n;
}
return(11-sum%11)%11;
}
},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.MSI1110=exports.MSI1010=exports.MSI11=exports.MSI10=exports.MSI=undefined;

var _MSI=require(33);

var _MSI2=_interopRequireDefault(_MSI);

var _MSI3=require(34);

var _MSI4=_interopRequireDefault(_MSI3);

var _MSI5=require(36);

var _MSI6=_interopRequireDefault(_MSI5);

var _MSI7=require(35);

var _MSI8=_interopRequireDefault(_MSI7);

var _MSI9=require(37);

var _MSI10=_interopRequireDefault(_MSI9);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

exports.MSI=_MSI2.default;
exports.MSI10=_MSI4.default;
exports.MSI11=_MSI6.default;
exports.MSI1010=_MSI8.default;
exports.MSI1110=_MSI10.default;
},{"33":33,"34":34,"35":35,"36":36,"37":37}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.codabar=undefined;

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var codabar=function(_Barcode){
_inherits(codabar,_Barcode);

function codabar(data,options){
_classCallCheck(this,codabar);

if(data.search(/^[0-9\-\$\:\.\+\/]+$/)===0){
data="A"+data+"A";
}

var _this=_possibleConstructorReturn(this,_Barcode.call(this,data.toUpperCase(),options));

_this.text=_this.options.text||_this.text.replace(/[A-D]/g,'');
return _this;
}

codabar.prototype.valid=function valid(){
return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)!==-1;
};

codabar.prototype.encode=function encode(){
var result=[];
var encodings=this.getEncodings();
for(var i=0;i<this.data.length;i++){
result.push(encodings[this.data.charAt(i)]);

if(i!==this.data.length-1){
result.push("0");
}
}
return{
text:this.text,
data:result.join('')};

};

codabar.prototype.getEncodings=function getEncodings(){
return{
"0":"101010011",
"1":"101011001",
"2":"101001011",
"3":"110010101",
"4":"101101001",
"5":"110101001",
"6":"100101011",
"7":"100101101",
"8":"100110101",
"9":"110100101",
"-":"101001101",
"$":"101100101",
":":"1101011011",
"/":"1101101011",
".":"1101101101",
"+":"101100110011",
"A":"1011001001",
"B":"1010010011",
"C":"1001001011",
"D":"1010011001"};

};

return codabar;
}(_Barcode3.default);

exports.codabar=codabar;
},{"15":15}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _CODE=require(22);

var _CODE2=require(21);

var _EAN_UPC=require(29);

var _ITF=require(32);

var _ITF2=require(31);

var _MSI=require(39);

var _pharmacode=require(42);

var _codabar=require(40);

var _GenericBarcode=require(30);

exports.default={
CODE39:_CODE.CODE39,
CODE128:_CODE2.CODE128,CODE128A:_CODE2.CODE128A,CODE128B:_CODE2.CODE128B,CODE128C:_CODE2.CODE128C,
EAN13:_EAN_UPC.EAN13,EAN8:_EAN_UPC.EAN8,EAN5:_EAN_UPC.EAN5,EAN2:_EAN_UPC.EAN2,UPC:_EAN_UPC.UPC,
ITF14:_ITF.ITF14,
ITF:_ITF2.ITF,
MSI:_MSI.MSI,MSI10:_MSI.MSI10,MSI11:_MSI.MSI11,MSI1010:_MSI.MSI1010,MSI1110:_MSI.MSI1110,
pharmacode:_pharmacode.pharmacode,
codabar:_codabar.codabar,
GenericBarcode:_GenericBarcode.GenericBarcode};

},{"21":21,"22":22,"29":29,"30":30,"31":31,"32":32,"39":39,"40":40,"42":42}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.pharmacode=undefined;

var _Barcode2=require(15);

var _Barcode3=_interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}


var pharmacode=function(_Barcode){
_inherits(pharmacode,_Barcode);

function pharmacode(data,options){
_classCallCheck(this,pharmacode);

var _this=_possibleConstructorReturn(this,_Barcode.call(this,data,options));

_this.number=parseInt(data,10);
return _this;
}

pharmacode.prototype.encode=function encode(){
var z=this.number;
var result="";



while(!isNaN(z)&&z!=0){
if(z%2===0){

result="11100"+result;
z=(z-2)/2;
}else{

result="100"+result;
z=(z-1)/2;
}
}


result=result.slice(0,-2);

return{
data:result,
text:this.text};

};

pharmacode.prototype.valid=function valid(){
return this.number>=3&&this.number<=131070;
};

return pharmacode;
}(_Barcode3.default);

exports.pharmacode=pharmacode;
},{"15":15}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}



var ErrorHandler=function(){
function ErrorHandler(api){
_classCallCheck(this,ErrorHandler);

this.api=api;
}

ErrorHandler.prototype.handleCatch=function handleCatch(e){

if(e.name==="InvalidInputException"){
if(this.api._options.valid!==this.api._defaults.valid){
this.api._options.valid(false);
}else{
throw e.message;
}
}else{
throw e;
}

this.api.render=function(){};
};

ErrorHandler.prototype.wrapBarcodeCall=function wrapBarcodeCall(func){
try{
var result=func.apply(undefined,arguments);
this.api._options.valid(true);
return result;
}catch(e){
this.handleCatch(e);

return this.api;
}
};

return ErrorHandler;
}();

exports.default=ErrorHandler;
},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&((typeof call==="undefined"?"undefined":_typeof2(call))==="object"||typeof call==="function")?call:self;}

function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+(typeof superClass==="undefined"?"undefined":_typeof2(superClass)));}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var InvalidInputException=function(_Error){
_inherits(InvalidInputException,_Error);

function InvalidInputException(symbology,input){
_classCallCheck(this,InvalidInputException);

var _this=_possibleConstructorReturn(this,_Error.call(this));

_this.name="InvalidInputException";

_this.symbology=symbology;
_this.input=input;

_this.message='"'+_this.input+'" is not a valid input for '+_this.symbology;
return _this;
}

return InvalidInputException;
}(Error);

var InvalidElementException=function(_Error2){
_inherits(InvalidElementException,_Error2);

function InvalidElementException(){
_classCallCheck(this,InvalidElementException);

var _this2=_possibleConstructorReturn(this,_Error2.call(this));

_this2.name="InvalidElementException";
_this2.message="Not supported type to render on";
return _this2;
}

return InvalidElementException;
}(Error);

var NoElementException=function(_Error3){
_inherits(NoElementException,_Error3);

function NoElementException(){
_classCallCheck(this,NoElementException);

var _this3=_possibleConstructorReturn(this,_Error3.call(this));

_this3.name="NoElementException";
_this3.message="No element to render on.";
return _this3;
}

return NoElementException;
}(Error);

exports.InvalidInputException=InvalidInputException;
exports.InvalidElementException=InvalidElementException;
exports.NoElementException=NoElementException;
},{}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=fixOptions;


function fixOptions(options){

options.marginTop=options.marginTop||options.margin;
options.marginBottom=options.marginBottom||options.margin;
options.marginRight=options.marginRight||options.margin;
options.marginLeft=options.marginLeft||options.margin;

return options;
}
},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _optionsFromStrings=require(50);

var _optionsFromStrings2=_interopRequireDefault(_optionsFromStrings);

var _defaults=require(51);

var _defaults2=_interopRequireDefault(_defaults);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function getOptionsFromElement(element){
var options={};
for(var property in _defaults2.default){
if(_defaults2.default.hasOwnProperty(property)){

if(element.hasAttribute("jsbarcode-"+property.toLowerCase())){
options[property]=element.getAttribute("jsbarcode-"+property.toLowerCase());
}


if(element.hasAttribute("data-"+property.toLowerCase())){
options[property]=element.getAttribute("data-"+property.toLowerCase());
}
}
}

options["value"]=element.getAttribute("jsbarcode-value")||element.getAttribute("data-value");


options=(0,_optionsFromStrings2.default)(options);

return options;
}

exports.default=getOptionsFromElement;
},{"50":50,"51":51}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _typeof=typeof Symbol==="function"&&_typeof2(typeof Symbol==="function"?Symbol.iterator:"@@iterator")==="symbol"?function(obj){return typeof obj==="undefined"?"undefined":_typeof2(obj);}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol?"symbol":typeof obj==="undefined"?"undefined":_typeof2(obj);};



var _getOptionsFromElement=require(46);

var _getOptionsFromElement2=_interopRequireDefault(_getOptionsFromElement);

var _renderers=require(53);

var _renderers2=_interopRequireDefault(_renderers);

var _exceptions=require(44);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}












function getRenderProperties(element){

if(typeof element==="string"){
return querySelectedRenderProperties(element);
}else

if(Array.isArray(element)){
var returnArray=[];
for(var i=0;i<element.length;i++){
returnArray.push(getRenderProperties(element[i]));
}
return returnArray;
}else

if(typeof HTMLCanvasElement!=='undefined'&&element instanceof HTMLImageElement){
return newCanvasRenderProperties(element);
}else

if(typeof SVGElement!=='undefined'&&element instanceof SVGElement){
return{
element:element,
options:(0,_getOptionsFromElement2.default)(element),
renderer:_renderers2.default.SVGRenderer};

}else

if(typeof HTMLCanvasElement!=='undefined'&&element instanceof HTMLCanvasElement){
return{
element:element,
options:(0,_getOptionsFromElement2.default)(element),
renderer:_renderers2.default.CanvasRenderer};

}else

if(element&&element.getContext){
return{
element:element,
renderer:_renderers2.default.CanvasRenderer};

}else if(element&&(typeof element==="undefined"?"undefined":_typeof(element))==='object'&&!element.nodeName){
return{
element:element,
renderer:_renderers2.default.ObjectRenderer};

}else{
throw new _exceptions.InvalidElementException();
}
}

function querySelectedRenderProperties(string){
var selector=document.querySelectorAll(string);
if(selector.length===0){
return undefined;
}else{
var returnArray=[];
for(var i=0;i<selector.length;i++){
returnArray.push(getRenderProperties(selector[i]));
}
return returnArray;
}
}

function newCanvasRenderProperties(imgElement){
var canvas=document.createElement('canvas');
return{
element:canvas,
options:(0,_getOptionsFromElement2.default)(imgElement),
renderer:_renderers2.default.CanvasRenderer,
afterRender:function afterRender(){
imgElement.setAttribute("src",canvas.toDataURL());
}};

}

exports.default=getRenderProperties;
},{"44":44,"46":46,"53":53}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=linearizeEncodings;




function linearizeEncodings(encodings){
var linearEncodings=[];
function nextLevel(encoded){
if(Array.isArray(encoded)){
for(var i=0;i<encoded.length;i++){
nextLevel(encoded[i]);
}
}else{
encoded.text=encoded.text||"";
encoded.data=encoded.data||"";
linearEncodings.push(encoded);
}
}
nextLevel(encodings);

return linearEncodings;
}
},{}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=merge;


function merge(old,replaceObj){
var newMerge={};
var k;
for(k in old){
if(old.hasOwnProperty(k)){
newMerge[k]=old[k];
}
}
for(k in replaceObj){
if(replaceObj.hasOwnProperty(k)&&typeof replaceObj[k]!=="undefined"){
newMerge[k]=replaceObj[k];
}
}
return newMerge;
}
},{}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.default=optionsFromStrings;



function optionsFromStrings(options){
var intOptions=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];

for(var intOption in intOptions){
if(intOptions.hasOwnProperty(intOption)){
intOption=intOptions[intOption];
if(typeof options[intOption]==="string"){
options[intOption]=parseInt(options[intOption],10);
}
}
}

if(typeof options["displayValue"]==="string"){
options["displayValue"]=options["displayValue"]!="false";
}

return options;
}
},{}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

var defaults={
width:2,
height:100,
format:"auto",
displayValue:true,
fontOptions:"",
font:"monospace",
text:undefined,
textAlign:"center",
textPosition:"bottom",
textMargin:2,
fontSize:20,
background:"#ffffff",
lineColor:"#000000",
margin:10,
marginTop:undefined,
marginBottom:undefined,
marginLeft:undefined,
marginRight:undefined,
valid:function valid(){}};


exports.default=defaults;
},{}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _merge=require(49);

var _merge2=_interopRequireDefault(_merge);

var _shared=require(55);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var CanvasRenderer=function(){
function CanvasRenderer(canvas,encodings,options){
_classCallCheck(this,CanvasRenderer);

this.canvas=canvas;
this.encodings=encodings;
this.options=options;
}

CanvasRenderer.prototype.render=function render(){

if(!this.canvas.getContext){
throw new Error('The browser does not support canvas.');
}

this.prepareCanvas();
for(var i=0;i<this.encodings.length;i++){
var encodingOptions=(0,_merge2.default)(this.options,this.encodings[i].options);

this.drawCanvasBarcode(encodingOptions,this.encodings[i]);
this.drawCanvasText(encodingOptions,this.encodings[i]);

this.moveCanvasDrawing(this.encodings[i]);
}

this.restoreCanvas();
};

CanvasRenderer.prototype.prepareCanvas=function prepareCanvas(){

var ctx=this.canvas.getContext("2d");

ctx.save();

(0,_shared.calculateEncodingAttributes)(this.encodings,this.options,ctx);
var totalWidth=(0,_shared.getTotalWidthOfEncodings)(this.encodings);
var maxHeight=(0,_shared.getMaximumHeightOfEncodings)(this.encodings);

this.canvas.width=totalWidth+this.options.marginLeft+this.options.marginRight;

this.canvas.height=maxHeight;


ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
if(this.options.background){
ctx.fillStyle=this.options.background;
ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
}

ctx.translate(this.options.marginLeft,0);
};

CanvasRenderer.prototype.drawCanvasBarcode=function drawCanvasBarcode(options,encoding){

var ctx=this.canvas.getContext("2d");

var binary=encoding.data;


var yFrom;
if(options.textPosition=="top"){
yFrom=options.marginTop+options.fontSize+options.textMargin;
}else{
yFrom=options.marginTop;
}

ctx.fillStyle=options.lineColor;

for(var b=0;b<binary.length;b++){
var x=b*options.width+encoding.barcodePadding;

if(binary[b]==="1"){
ctx.fillRect(x,yFrom,options.width,options.height);
}else if(binary[b]){
ctx.fillRect(x,yFrom,options.width,options.height*binary[b]);
}
}
};

CanvasRenderer.prototype.drawCanvasText=function drawCanvasText(options,encoding){

var ctx=this.canvas.getContext("2d");

var font=options.fontOptions+" "+options.fontSize+"px "+options.font;


if(options.displayValue){
var x,y;

if(options.textPosition=="top"){
y=options.marginTop+options.fontSize-options.textMargin;
}else{
y=options.height+options.textMargin+options.marginTop+options.fontSize;
}

ctx.font=font;


if(options.textAlign=="left"||encoding.barcodePadding>0){
x=0;
ctx.textAlign='left';
}else if(options.textAlign=="right"){
x=encoding.width-1;
ctx.textAlign='right';
}else

{
x=encoding.width/2;
ctx.textAlign='center';
}

ctx.fillText(encoding.text,x,y);
}
};

CanvasRenderer.prototype.moveCanvasDrawing=function moveCanvasDrawing(encoding){
var ctx=this.canvas.getContext("2d");

ctx.translate(encoding.width,0);
};

CanvasRenderer.prototype.restoreCanvas=function restoreCanvas(){

var ctx=this.canvas.getContext("2d");

ctx.restore();
};

return CanvasRenderer;
}();

exports.default=CanvasRenderer;
},{"49":49,"55":55}],53:[function(require,module,exports){
'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});


var _canvas=require(52);

var _canvas2=_interopRequireDefault(_canvas);

var _svg=require(56);

var _svg2=_interopRequireDefault(_svg);

var _object=require(54);

var _object2=_interopRequireDefault(_object);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

exports.default={CanvasRenderer:_canvas2.default,SVGRenderer:_svg2.default,ObjectRenderer:_object2.default};
},{"52":52,"54":54,"56":56}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var ObjectRenderer=function(){
function ObjectRenderer(object,encodings,options){
_classCallCheck(this,ObjectRenderer);

this.object=object;
this.encodings=encodings;
this.options=options;
}

ObjectRenderer.prototype.render=function render(){
this.object.encodings=this.encodings;
};

return ObjectRenderer;
}();

exports.default=ObjectRenderer;
},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});

exports.getTotalWidthOfEncodings=exports.calculateEncodingAttributes=exports.getBarcodePadding=exports.getEncodingHeight=exports.getMaximumHeightOfEncodings=undefined;

var _merge=require(49);

var _merge2=_interopRequireDefault(_merge);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function getEncodingHeight(encoding,options){
return options.height+(options.displayValue&&encoding.text.length>0?options.fontSize+options.textMargin:0)+options.marginTop+options.marginBottom;
}

function getBarcodePadding(textWidth,barcodeWidth,options){
if(options.displayValue&&barcodeWidth<textWidth){
if(options.textAlign=="center"){
return Math.floor((textWidth-barcodeWidth)/2);
}else if(options.textAlign=="left"){
return 0;
}else if(options.textAlign=="right"){
return Math.floor(textWidth-barcodeWidth);
}
}
return 0;
}

function calculateEncodingAttributes(encodings,barcodeOptions,context){
for(var i=0;i<encodings.length;i++){
var encoding=encodings[i];
var options=(0,_merge2.default)(barcodeOptions,encoding.options);


var textWidth;
if(options.displayValue){
textWidth=messureText(encoding.text,options,context);
}else{
textWidth=0;
}

var barcodeWidth=encoding.data.length*options.width;
encoding.width=Math.ceil(Math.max(textWidth,barcodeWidth));

encoding.height=getEncodingHeight(encoding,options);

encoding.barcodePadding=getBarcodePadding(textWidth,barcodeWidth,options);
}
}

function getTotalWidthOfEncodings(encodings){
var totalWidth=0;
for(var i=0;i<encodings.length;i++){
totalWidth+=encodings[i].width;
}
return totalWidth;
}

function getMaximumHeightOfEncodings(encodings){
var maxHeight=0;
for(var i=0;i<encodings.length;i++){
if(encodings[i].height>maxHeight){
maxHeight=encodings[i].height;
}
}
return maxHeight;
}

function messureText(string,options,context){
var ctx;
if(typeof context==="undefined"){
ctx=document.createElement("canvas").getContext("2d");
}else{
ctx=context;
}

ctx.font=options.fontOptions+" "+options.fontSize+"px "+options.font;


var size=ctx.measureText(string).width;

return size;
}

exports.getMaximumHeightOfEncodings=getMaximumHeightOfEncodings;
exports.getEncodingHeight=getEncodingHeight;
exports.getBarcodePadding=getBarcodePadding;
exports.calculateEncodingAttributes=calculateEncodingAttributes;
exports.getTotalWidthOfEncodings=getTotalWidthOfEncodings;
},{"49":49}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports,"__esModule",{
value:true});


var _merge=require(49);

var _merge2=_interopRequireDefault(_merge);

var _shared=require(55);

function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}

var svgns="http://www.w3.org/2000/svg";

var SVGRenderer=function(){
function SVGRenderer(svg,encodings,options){
_classCallCheck(this,SVGRenderer);

this.svg=svg;
this.encodings=encodings;
this.options=options;
}

SVGRenderer.prototype.render=function render(){
var currentX=this.options.marginLeft;

this.prepareSVG();
for(var i=0;i<this.encodings.length;i++){
var encoding=this.encodings[i];
var encodingOptions=(0,_merge2.default)(this.options,encoding.options);

var group=createGroup(currentX,encodingOptions.marginTop,this.svg);

setGroupOptions(group,encodingOptions);

this.drawSvgBarcode(group,encodingOptions,encoding);
this.drawSVGText(group,encodingOptions,encoding);

currentX+=encoding.width;
}
};

SVGRenderer.prototype.prepareSVG=function prepareSVG(){

while(this.svg.firstChild){
this.svg.removeChild(this.svg.firstChild);
}

(0,_shared.calculateEncodingAttributes)(this.encodings,this.options);
var totalWidth=(0,_shared.getTotalWidthOfEncodings)(this.encodings);
var maxHeight=(0,_shared.getMaximumHeightOfEncodings)(this.encodings);

var width=totalWidth+this.options.marginLeft+this.options.marginRight;
this.setSvgAttributes(width,maxHeight);

if(this.options.background){
drawRect(0,0,width,maxHeight,this.svg).setAttribute("style","fill:"+this.options.background+";");
}
};

SVGRenderer.prototype.drawSvgBarcode=function drawSvgBarcode(parent,options,encoding){
var binary=encoding.data;


var yFrom;
if(options.textPosition=="top"){
yFrom=options.fontSize+options.textMargin;
}else{
yFrom=0;
}

var barWidth=0;
var x=0;
for(var b=0;b<binary.length;b++){
x=b*options.width+encoding.barcodePadding;

if(binary[b]==="1"){
barWidth++;
}else if(barWidth>0){
drawRect(x-options.width*barWidth,yFrom,options.width*barWidth,options.height,parent);
barWidth=0;
}
}


if(barWidth>0){
drawRect(x-options.width*(barWidth-1),yFrom,options.width*barWidth,options.height,parent);
}
};

SVGRenderer.prototype.drawSVGText=function drawSVGText(parent,options,encoding){
var textElem=document.createElementNS(svgns,'text');


if(options.displayValue){
var x,y;

textElem.setAttribute("style","font:"+options.fontOptions+" "+options.fontSize+"px "+options.font);

if(options.textPosition=="top"){
y=options.fontSize-options.textMargin;
}else{
y=options.height+options.textMargin+options.fontSize;
}


if(options.textAlign=="left"||encoding.barcodePadding>0){
x=0;
textElem.setAttribute("text-anchor","start");
}else if(options.textAlign=="right"){
x=encoding.width-1;
textElem.setAttribute("text-anchor","end");
}else

{
x=encoding.width/2;
textElem.setAttribute("text-anchor","middle");
}

textElem.setAttribute("x",x);
textElem.setAttribute("y",y);

textElem.appendChild(document.createTextNode(encoding.text));

parent.appendChild(textElem);
}
};

SVGRenderer.prototype.setSvgAttributes=function setSvgAttributes(width,height){
var svg=this.svg;
svg.setAttribute("width",width+"px");
svg.setAttribute("height",height+"px");
svg.setAttribute("x","0px");
svg.setAttribute("y","0px");
svg.setAttribute("viewBox","0 0 "+width+" "+height);

svg.setAttribute("xmlns",svgns);
svg.setAttribute("version","1.1");

svg.style.transform="translate(0,0)";
};

return SVGRenderer;
}();

function createGroup(x,y,parent){
var group=document.createElementNS(svgns,'g');

group.setAttribute("transform","translate("+x+", "+y+")");

parent.appendChild(group);

return group;
}

function setGroupOptions(group,options){
group.setAttribute("style","fill:"+options.lineColor+";");
}

function drawRect(x,y,width,height,parent){
var rect=document.createElementNS(svgns,'rect');

rect.setAttribute("x",x);
rect.setAttribute("y",y);
rect.setAttribute("width",width);
rect.setAttribute("height",height);

parent.appendChild(rect);

return rect;
}

exports.default=SVGRenderer;
},{"49":49,"55":55}],57:[function(require,module,exports){
(function(process){
'use strict';

if(!process.version||
process.version.indexOf('v0.')===0||
process.version.indexOf('v1.')===0&&process.version.indexOf('v1.8.')!==0){
module.exports=nextTick;
}else{
module.exports=process.nextTick;
}

function nextTick(fn,arg1,arg2,arg3){
if(typeof fn!=='function'){
throw new TypeError('"callback" argument must be a function');
}
var len=arguments.length;
var args,i;
switch(len){
case 0:
case 1:
return process.nextTick(fn);
case 2:
return process.nextTick(function afterTickOne(){
fn.call(null,arg1);
});
case 3:
return process.nextTick(function afterTickTwo(){
fn.call(null,arg1,arg2);
});
case 4:
return process.nextTick(function afterTickThree(){
fn.call(null,arg1,arg2,arg3);
});
default:
args=new Array(len-1);
i=0;
while(i<args.length){
args[i++]=arguments[i];
}
return process.nextTick(function afterTick(){
fn.apply(null,args);
});}

}

}).call(this,require(58));
},{"58":58}],58:[function(require,module,exports){

var process=module.exports={};






var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout(){
throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout(){
throw new Error('clearTimeout has not been defined');
}
(function(){
try{
if(typeof setTimeout==='function'){
cachedSetTimeout=setTimeout;
}else{
cachedSetTimeout=defaultSetTimout;
}
}catch(e){
cachedSetTimeout=defaultSetTimout;
}
try{
if(typeof clearTimeout==='function'){
cachedClearTimeout=clearTimeout;
}else{
cachedClearTimeout=defaultClearTimeout;
}
}catch(e){
cachedClearTimeout=defaultClearTimeout;
}
})();
function runTimeout(fun){
if(cachedSetTimeout===setTimeout){

return setTimeout(fun,0);
}

if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){
cachedSetTimeout=setTimeout;
return setTimeout(fun,0);
}
try{

return cachedSetTimeout(fun,0);
}catch(e){
try{

return cachedSetTimeout.call(null,fun,0);
}catch(e){

return cachedSetTimeout.call(this,fun,0);
}
}


}
function runClearTimeout(marker){
if(cachedClearTimeout===clearTimeout){

return clearTimeout(marker);
}

if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){
cachedClearTimeout=clearTimeout;
return clearTimeout(marker);
}
try{

return cachedClearTimeout(marker);
}catch(e){
try{

return cachedClearTimeout.call(null,marker);
}catch(e){


return cachedClearTimeout.call(this,marker);
}
}



}
var queue=[];
var draining=false;
var currentQueue;
var queueIndex=-1;

function cleanUpNextTick(){
if(!draining||!currentQueue){
return;
}
draining=false;
if(currentQueue.length){
queue=currentQueue.concat(queue);
}else{
queueIndex=-1;
}
if(queue.length){
drainQueue();
}
}

function drainQueue(){
if(draining){
return;
}
var timeout=runTimeout(cleanUpNextTick);
draining=true;

var len=queue.length;
while(len){
currentQueue=queue;
queue=[];
while(++queueIndex<len){
if(currentQueue){
currentQueue[queueIndex].run();
}
}
queueIndex=-1;
len=queue.length;
}
currentQueue=null;
draining=false;
runClearTimeout(timeout);
}

process.nextTick=function(fun){
var args=new Array(arguments.length-1);
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args[i-1]=arguments[i];
}
}
queue.push(new Item(fun,args));
if(queue.length===1&&!draining){
runTimeout(drainQueue);
}
};


function Item(fun,array){
this.fun=fun;
this.array=array;
}
Item.prototype.run=function(){
this.fun.apply(null,this.array);
};
process.title='browser';
process.browser=true;
process.env={};
process.argv=[];
process.version='';
process.versions={};

function noop(){}

process.on=noop;
process.addListener=noop;
process.once=noop;
process.off=noop;
process.removeListener=noop;
process.removeAllListeners=noop;
process.emit=noop;
process.prependListener=noop;
process.prependOnceListener=noop;

process.listeners=function(name){return[];};

process.binding=function(name){
throw new Error('process.binding is not supported');
};

process.cwd=function(){return'/';};
process.chdir=function(dir){
throw new Error('process.chdir is not supported');
};
process.umask=function(){return 0;};

},{}],59:[function(require,module,exports){
(function(global){

;(function(root){


var freeExports=(typeof exports==="undefined"?"undefined":_typeof2(exports))=='object'&&exports&&
!exports.nodeType&&exports;
var freeModule=(typeof module==="undefined"?"undefined":_typeof2(module))=='object'&&module&&
!module.nodeType&&module;
var freeGlobal=(typeof global==="undefined"?"undefined":_typeof2(global))=='object'&&global;
if(
freeGlobal.global===freeGlobal||
freeGlobal.window===freeGlobal||
freeGlobal.self===freeGlobal)
{
root=freeGlobal;
}






var punycode,


maxInt=2147483647,


base=36,
tMin=1,
tMax=26,
skew=38,
damp=700,
initialBias=72,
initialN=128,
delimiter='-',


regexPunycode=/^xn--/,
regexNonASCII=/[^\x20-\x7E]/,
regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,


errors={
'overflow':'Overflow: input needs wider integers to process',
'not-basic':'Illegal input >= 0x80 (not a basic code point)',
'invalid-input':'Invalid input'},



baseMinusTMin=base-tMin,
floor=Math.floor,
stringFromCharCode=String.fromCharCode,


key;









function error(type){
throw new RangeError(errors[type]);
}









function map(array,fn){
var length=array.length;
var result=[];
while(length--){
result[length]=fn(array[length]);
}
return result;
}











function mapDomain(string,fn){
var parts=string.split('@');
var result='';
if(parts.length>1){


result=parts[0]+'@';
string=parts[1];
}

string=string.replace(regexSeparators,'\x2E');
var labels=string.split('.');
var encoded=map(labels,fn).join('.');
return result+encoded;
}














function ucs2decode(string){
var output=[],
counter=0,
length=string.length,
value,
extra;
while(counter<length){
value=string.charCodeAt(counter++);
if(value>=0xD800&&value<=0xDBFF&&counter<length){

extra=string.charCodeAt(counter++);
if((extra&0xFC00)==0xDC00){
output.push(((value&0x3FF)<<10)+(extra&0x3FF)+0x10000);
}else{


output.push(value);
counter--;
}
}else{
output.push(value);
}
}
return output;
}









function ucs2encode(array){
return map(array,function(value){
var output='';
if(value>0xFFFF){
value-=0x10000;
output+=stringFromCharCode(value>>>10&0x3FF|0xD800);
value=0xDC00|value&0x3FF;
}
output+=stringFromCharCode(value);
return output;
}).join('');
}










function basicToDigit(codePoint){
if(codePoint-48<10){
return codePoint-22;
}
if(codePoint-65<26){
return codePoint-65;
}
if(codePoint-97<26){
return codePoint-97;
}
return base;
}












function digitToBasic(digit,flag){


return digit+22+75*(digit<26)-((flag!=0)<<5);
}






function adapt(delta,numPoints,firstTime){
var k=0;
delta=firstTime?floor(delta/damp):delta>>1;
delta+=floor(delta/numPoints);
for(;delta>baseMinusTMin*tMax>>1;k+=base){
delta=floor(delta/baseMinusTMin);
}
return floor(k+(baseMinusTMin+1)*delta/(delta+skew));
}








function decode(input){

var output=[],
inputLength=input.length,
out,
i=0,
n=initialN,
bias=initialBias,
basic,
j,
index,
oldi,
w,
k,
digit,
t,

baseMinusT;





basic=input.lastIndexOf(delimiter);
if(basic<0){
basic=0;
}

for(j=0;j<basic;++j){

if(input.charCodeAt(j)>=0x80){
error('not-basic');
}
output.push(input.charCodeAt(j));
}




for(index=basic>0?basic+1:0;index<inputLength;){






for(oldi=i,w=1,k=base;;k+=base){

if(index>=inputLength){
error('invalid-input');
}

digit=basicToDigit(input.charCodeAt(index++));

if(digit>=base||digit>floor((maxInt-i)/w)){
error('overflow');
}

i+=digit*w;
t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;

if(digit<t){
break;
}

baseMinusT=base-t;
if(w>floor(maxInt/baseMinusT)){
error('overflow');
}

w*=baseMinusT;

}

out=output.length+1;
bias=adapt(i-oldi,out,oldi==0);



if(floor(i/out)>maxInt-n){
error('overflow');
}

n+=floor(i/out);
i%=out;


output.splice(i++,0,n);

}

return ucs2encode(output);
}








function encode(input){
var n,
delta,
handledCPCount,
basicLength,
bias,
j,
m,
q,
k,
t,
currentValue,
output=[],

inputLength,

handledCPCountPlusOne,
baseMinusT,
qMinusT;


input=ucs2decode(input);


inputLength=input.length;


n=initialN;
delta=0;
bias=initialBias;


for(j=0;j<inputLength;++j){
currentValue=input[j];
if(currentValue<0x80){
output.push(stringFromCharCode(currentValue));
}
}

handledCPCount=basicLength=output.length;





if(basicLength){
output.push(delimiter);
}


while(handledCPCount<inputLength){



for(m=maxInt,j=0;j<inputLength;++j){
currentValue=input[j];
if(currentValue>=n&&currentValue<m){
m=currentValue;
}
}



handledCPCountPlusOne=handledCPCount+1;
if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){
error('overflow');
}

delta+=(m-n)*handledCPCountPlusOne;
n=m;

for(j=0;j<inputLength;++j){
currentValue=input[j];

if(currentValue<n&&++delta>maxInt){
error('overflow');
}

if(currentValue==n){

for(q=delta,k=base;;k+=base){
t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;
if(q<t){
break;
}
qMinusT=q-t;
baseMinusT=base-t;
output.push(
stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));

q=floor(qMinusT/baseMinusT);
}

output.push(stringFromCharCode(digitToBasic(q,0)));
bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);
delta=0;
++handledCPCount;
}
}

++delta;
++n;

}
return output.join('');
}












function toUnicode(input){
return mapDomain(input,function(string){
return regexPunycode.test(string)?
decode(string.slice(4).toLowerCase()):
string;
});
}












function toASCII(input){
return mapDomain(input,function(string){
return regexNonASCII.test(string)?
'xn--'+encode(string):
string;
});
}




punycode={





'version':'1.4.1',







'ucs2':{
'decode':ucs2decode,
'encode':ucs2encode},

'decode':decode,
'encode':encode,
'toASCII':toASCII,
'toUnicode':toUnicode};





if(
typeof define=='function'&&
_typeof2(define.amd)=='object'&&
define.amd)
{
define('punycode',function(){
return punycode;
});
}else if(freeExports&&freeModule){
if(module.exports==freeExports){

freeModule.exports=punycode;
}else{

for(key in punycode){
punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key]);
}
}
}else{

root.punycode=punycode;
}

})(this);

}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});
},{}],60:[function(require,module,exports){

















var qrcode=function(){










var qrcode=function qrcode(typeNumber,errorCorrectionLevel){

var PAD0=0xEC;
var PAD1=0x11;

var _typeNumber=typeNumber;
var _errorCorrectionLevel=QRErrorCorrectionLevel[errorCorrectionLevel];
var _modules=null;
var _moduleCount=0;
var _dataCache=null;
var _dataList=new Array();

var _this={};

var makeImpl=function makeImpl(test,maskPattern){

_moduleCount=_typeNumber*4+17;
_modules=function(moduleCount){
var modules=new Array(moduleCount);
for(var row=0;row<moduleCount;row+=1){
modules[row]=new Array(moduleCount);
for(var col=0;col<moduleCount;col+=1){
modules[row][col]=null;
}
}
return modules;
}(_moduleCount);

setupPositionProbePattern(0,0);
setupPositionProbePattern(_moduleCount-7,0);
setupPositionProbePattern(0,_moduleCount-7);
setupPositionAdjustPattern();
setupTimingPattern();
setupTypeInfo(test,maskPattern);

if(_typeNumber>=7){
setupTypeNumber(test);
}

if(_dataCache==null){
_dataCache=createData(_typeNumber,_errorCorrectionLevel,_dataList);
}

mapData(_dataCache,maskPattern);
};

var setupPositionProbePattern=function setupPositionProbePattern(row,col){

for(var r=-1;r<=7;r+=1){

if(row+r<=-1||_moduleCount<=row+r)continue;

for(var c=-1;c<=7;c+=1){

if(col+c<=-1||_moduleCount<=col+c)continue;

if(0<=r&&r<=6&&(c==0||c==6)||
0<=c&&c<=6&&(r==0||r==6)||
2<=r&&r<=4&&2<=c&&c<=4){
_modules[row+r][col+c]=true;
}else{
_modules[row+r][col+c]=false;
}
}
}
};

var getBestMaskPattern=function getBestMaskPattern(){

var minLostPoint=0;
var pattern=0;

for(var i=0;i<8;i+=1){

makeImpl(true,i);

var lostPoint=QRUtil.getLostPoint(_this);

if(i==0||minLostPoint>lostPoint){
minLostPoint=lostPoint;
pattern=i;
}
}

return pattern;
};

var setupTimingPattern=function setupTimingPattern(){

for(var r=8;r<_moduleCount-8;r+=1){
if(_modules[r][6]!=null){
continue;
}
_modules[r][6]=r%2==0;
}

for(var c=8;c<_moduleCount-8;c+=1){
if(_modules[6][c]!=null){
continue;
}
_modules[6][c]=c%2==0;
}
};

var setupPositionAdjustPattern=function setupPositionAdjustPattern(){

var pos=QRUtil.getPatternPosition(_typeNumber);

for(var i=0;i<pos.length;i+=1){

for(var j=0;j<pos.length;j+=1){

var row=pos[i];
var col=pos[j];

if(_modules[row][col]!=null){
continue;
}

for(var r=-2;r<=2;r+=1){

for(var c=-2;c<=2;c+=1){

if(r==-2||r==2||c==-2||c==2||
r==0&&c==0){
_modules[row+r][col+c]=true;
}else{
_modules[row+r][col+c]=false;
}
}
}
}
}
};

var setupTypeNumber=function setupTypeNumber(test){

var bits=QRUtil.getBCHTypeNumber(_typeNumber);

for(var i=0;i<18;i+=1){
var mod=!test&&(bits>>i&1)==1;
_modules[Math.floor(i/3)][i%3+_moduleCount-8-3]=mod;
}

for(var i=0;i<18;i+=1){
var mod=!test&&(bits>>i&1)==1;
_modules[i%3+_moduleCount-8-3][Math.floor(i/3)]=mod;
}
};

var setupTypeInfo=function setupTypeInfo(test,maskPattern){

var data=_errorCorrectionLevel<<3|maskPattern;
var bits=QRUtil.getBCHTypeInfo(data);


for(var i=0;i<15;i+=1){

var mod=!test&&(bits>>i&1)==1;

if(i<6){
_modules[i][8]=mod;
}else if(i<8){
_modules[i+1][8]=mod;
}else{
_modules[_moduleCount-15+i][8]=mod;
}
}


for(var i=0;i<15;i+=1){

var mod=!test&&(bits>>i&1)==1;

if(i<8){
_modules[8][_moduleCount-i-1]=mod;
}else if(i<9){
_modules[8][15-i-1+1]=mod;
}else{
_modules[8][15-i-1]=mod;
}
}


_modules[_moduleCount-8][8]=!test;
};

var mapData=function mapData(data,maskPattern){

var inc=-1;
var row=_moduleCount-1;
var bitIndex=7;
var byteIndex=0;
var maskFunc=QRUtil.getMaskFunction(maskPattern);

for(var col=_moduleCount-1;col>0;col-=2){

if(col==6)col-=1;

while(true){

for(var c=0;c<2;c+=1){

if(_modules[row][col-c]==null){

var dark=false;

if(byteIndex<data.length){
dark=(data[byteIndex]>>>bitIndex&1)==1;
}

var mask=maskFunc(row,col-c);

if(mask){
dark=!dark;
}

_modules[row][col-c]=dark;
bitIndex-=1;

if(bitIndex==-1){
byteIndex+=1;
bitIndex=7;
}
}
}

row+=inc;

if(row<0||_moduleCount<=row){
row-=inc;
inc=-inc;
break;
}
}
}
};

var createBytes=function createBytes(buffer,rsBlocks){

var offset=0;

var maxDcCount=0;
var maxEcCount=0;

var dcdata=new Array(rsBlocks.length);
var ecdata=new Array(rsBlocks.length);

for(var r=0;r<rsBlocks.length;r+=1){

var dcCount=rsBlocks[r].dataCount;
var ecCount=rsBlocks[r].totalCount-dcCount;

maxDcCount=Math.max(maxDcCount,dcCount);
maxEcCount=Math.max(maxEcCount,ecCount);

dcdata[r]=new Array(dcCount);

for(var i=0;i<dcdata[r].length;i+=1){
dcdata[r][i]=0xff&buffer.getBuffer()[i+offset];
}
offset+=dcCount;

var rsPoly=QRUtil.getErrorCorrectPolynomial(ecCount);
var rawPoly=qrPolynomial(dcdata[r],rsPoly.getLength()-1);

var modPoly=rawPoly.mod(rsPoly);
ecdata[r]=new Array(rsPoly.getLength()-1);
for(var i=0;i<ecdata[r].length;i+=1){
var modIndex=i+modPoly.getLength()-ecdata[r].length;
ecdata[r][i]=modIndex>=0?modPoly.getAt(modIndex):0;
}
}

var totalCodeCount=0;
for(var i=0;i<rsBlocks.length;i+=1){
totalCodeCount+=rsBlocks[i].totalCount;
}

var data=new Array(totalCodeCount);
var index=0;

for(var i=0;i<maxDcCount;i+=1){
for(var r=0;r<rsBlocks.length;r+=1){
if(i<dcdata[r].length){
data[index]=dcdata[r][i];
index+=1;
}
}
}

for(var i=0;i<maxEcCount;i+=1){
for(var r=0;r<rsBlocks.length;r+=1){
if(i<ecdata[r].length){
data[index]=ecdata[r][i];
index+=1;
}
}
}

return data;
};

var createData=function createData(typeNumber,errorCorrectionLevel,dataList){

var rsBlocks=QRRSBlock.getRSBlocks(typeNumber,errorCorrectionLevel);

var buffer=qrBitBuffer();

for(var i=0;i<dataList.length;i+=1){
var data=dataList[i];
buffer.put(data.getMode(),4);
buffer.put(data.getLength(),QRUtil.getLengthInBits(data.getMode(),typeNumber));
data.write(buffer);
}


var totalDataCount=0;
for(var i=0;i<rsBlocks.length;i+=1){
totalDataCount+=rsBlocks[i].dataCount;
}

if(buffer.getLengthInBits()>totalDataCount*8){
throw new Error('code length overflow. ('+
buffer.getLengthInBits()+
'>'+
totalDataCount*8+
')');
}


if(buffer.getLengthInBits()+4<=totalDataCount*8){
buffer.put(0,4);
}


while(buffer.getLengthInBits()%8!=0){
buffer.putBit(false);
}


while(true){

if(buffer.getLengthInBits()>=totalDataCount*8){
break;
}
buffer.put(PAD0,8);

if(buffer.getLengthInBits()>=totalDataCount*8){
break;
}
buffer.put(PAD1,8);
}

return createBytes(buffer,rsBlocks);
};

_this.addData=function(data,mode){

mode=mode||'Byte';

var newData=null;

switch(mode){
case'Numeric':
newData=qrNumber(data);
break;
case'Alphanumeric':
newData=qrAlphaNum(data);
break;
case'Byte':
newData=qr8BitByte(data);
break;
case'Kanji':
newData=qrKanji(data);
break;
default:
throw'mode:'+mode;}


_dataList.push(newData);
_dataCache=null;
};

_this.isDark=function(row,col){
if(row<0||_moduleCount<=row||col<0||_moduleCount<=col){
throw new Error(row+','+col);
}
return _modules[row][col];
};

_this.getModuleCount=function(){
return _moduleCount;
};

_this.make=function(){
makeImpl(false,getBestMaskPattern());
};

_this.createTableTag=function(cellSize,margin){

cellSize=cellSize||2;
margin=typeof margin=='undefined'?cellSize*4:margin;

var qrHtml='';

qrHtml+='<table style="';
qrHtml+=' border-width: 0px; border-style: none;';
qrHtml+=' border-collapse: collapse;';
qrHtml+=' padding: 0px; margin: '+margin+'px;';
qrHtml+='">';
qrHtml+='<tbody>';

for(var r=0;r<_this.getModuleCount();r+=1){

qrHtml+='<tr>';

for(var c=0;c<_this.getModuleCount();c+=1){
qrHtml+='<td style="';
qrHtml+=' border-width: 0px; border-style: none;';
qrHtml+=' border-collapse: collapse;';
qrHtml+=' padding: 0px; margin: 0px;';
qrHtml+=' width: '+cellSize+'px;';
qrHtml+=' height: '+cellSize+'px;';
qrHtml+=' background-color: ';
qrHtml+=_this.isDark(r,c)?'#000000':'#ffffff';
qrHtml+=';';
qrHtml+='"/>';
}

qrHtml+='</tr>';
}

qrHtml+='</tbody>';
qrHtml+='</table>';

return qrHtml;
};

_this.createSvgTag=function(cellSize,margin){

cellSize=cellSize||2;
margin=typeof margin=='undefined'?cellSize*4:margin;
var size=_this.getModuleCount()*cellSize+margin*2;
var c,mc,r,mr,qrSvg='',rect;

rect='l'+cellSize+',0 0,'+cellSize+
' -'+cellSize+',0 0,-'+cellSize+'z ';

qrSvg+='<svg';
qrSvg+=' width="'+size+'px"';
qrSvg+=' height="'+size+'px"';
qrSvg+=' xmlns="http://www.w3.org/2000/svg"';
qrSvg+='>';
qrSvg+='<path d="';

for(r=0;r<_this.getModuleCount();r+=1){
mr=r*cellSize+margin;
for(c=0;c<_this.getModuleCount();c+=1){
if(_this.isDark(r,c)){
mc=c*cellSize+margin;
qrSvg+='M'+mc+','+mr+rect;
}
}
}

qrSvg+='" stroke="transparent" fill="black"/>';
qrSvg+='</svg>';

return qrSvg;
};

_this.createImgTag=function(cellSize,margin){

cellSize=cellSize||2;
margin=typeof margin=='undefined'?cellSize*4:margin;

var size=_this.getModuleCount()*cellSize+margin*2;
var min=margin;
var max=size-margin;

return createImgTag(size,size,function(x,y){
if(min<=x&&x<max&&min<=y&&y<max){
var c=Math.floor((x-min)/cellSize);
var r=Math.floor((y-min)/cellSize);
return _this.isDark(r,c)?0:1;
}else{
return 1;
}
});
};

return _this;
};





qrcode.stringToBytesFuncs={
'default':function _default(s){
var bytes=[];
for(var i=0;i<s.length;i+=1){
var c=s.charCodeAt(i);
bytes.push(c&0xff);
}
return bytes;
}};


qrcode.stringToBytes=qrcode.stringToBytesFuncs['default'];










qrcode.createStringToBytes=function(unicodeData,numChars){



var unicodeMap=function(){

var bin=base64DecodeInputStream(unicodeData);
var read=function read(){
var b=bin.read();
if(b==-1)throw new Error();
return b;
};

var count=0;
var unicodeMap={};
while(true){
var b0=bin.read();
if(b0==-1)break;
var b1=read();
var b2=read();
var b3=read();
var k=String.fromCharCode(b0<<8|b1);
var v=b2<<8|b3;
unicodeMap[k]=v;
count+=1;
}
if(count!=numChars){
throw new Error(count+' != '+numChars);
}

return unicodeMap;
}();

var unknownChar='?'.charCodeAt(0);

return function(s){
var bytes=new Array();
for(var i=0;i<s.length;i+=1){
var c=s.charCodeAt(i);
if(c<128){
bytes.push(c);
}else{
var b=unicodeMap[s.charAt(i)];
if(typeof b=='number'){
if((b&0xff)==b){

bytes.push(b);
}else{

bytes.push(b>>>8);
bytes.push(b&0xff);
}
}else{
bytes.push(unknownChar);
}
}
}
return bytes;
};
};





var QRMode={
MODE_NUMBER:1<<0,
MODE_ALPHA_NUM:1<<1,
MODE_8BIT_BYTE:1<<2,
MODE_KANJI:1<<3};






var QRErrorCorrectionLevel={
L:1,
M:0,
Q:3,
H:2};






var QRMaskPattern={
PATTERN000:0,
PATTERN001:1,
PATTERN010:2,
PATTERN011:3,
PATTERN100:4,
PATTERN101:5,
PATTERN110:6,
PATTERN111:7};






var QRUtil=function(){

var PATTERN_POSITION_TABLE=[
[],
[6,18],
[6,22],
[6,26],
[6,30],
[6,34],
[6,22,38],
[6,24,42],
[6,26,46],
[6,28,50],
[6,30,54],
[6,32,58],
[6,34,62],
[6,26,46,66],
[6,26,48,70],
[6,26,50,74],
[6,30,54,78],
[6,30,56,82],
[6,30,58,86],
[6,34,62,90],
[6,28,50,72,94],
[6,26,50,74,98],
[6,30,54,78,102],
[6,28,54,80,106],
[6,32,58,84,110],
[6,30,58,86,114],
[6,34,62,90,118],
[6,26,50,74,98,122],
[6,30,54,78,102,126],
[6,26,52,78,104,130],
[6,30,56,82,108,134],
[6,34,60,86,112,138],
[6,30,58,86,114,142],
[6,34,62,90,118,146],
[6,30,54,78,102,126,150],
[6,24,50,76,102,128,154],
[6,28,54,80,106,132,158],
[6,32,58,84,110,136,162],
[6,26,54,82,110,138,166],
[6,30,58,86,114,142,170]];

var G15=1<<10|1<<8|1<<5|1<<4|1<<2|1<<1|1<<0;
var G18=1<<12|1<<11|1<<10|1<<9|1<<8|1<<5|1<<2|1<<0;
var G15_MASK=1<<14|1<<12|1<<10|1<<4|1<<1;

var _this={};

var getBCHDigit=function getBCHDigit(data){
var digit=0;
while(data!=0){
digit+=1;
data>>>=1;
}
return digit;
};

_this.getBCHTypeInfo=function(data){
var d=data<<10;
while(getBCHDigit(d)-getBCHDigit(G15)>=0){
d^=G15<<getBCHDigit(d)-getBCHDigit(G15);
}
return(data<<10|d)^G15_MASK;
};

_this.getBCHTypeNumber=function(data){
var d=data<<12;
while(getBCHDigit(d)-getBCHDigit(G18)>=0){
d^=G18<<getBCHDigit(d)-getBCHDigit(G18);
}
return data<<12|d;
};

_this.getPatternPosition=function(typeNumber){
return PATTERN_POSITION_TABLE[typeNumber-1];
};

_this.getMaskFunction=function(maskPattern){

switch(maskPattern){

case QRMaskPattern.PATTERN000:
return function(i,j){return(i+j)%2==0;};
case QRMaskPattern.PATTERN001:
return function(i,j){return i%2==0;};
case QRMaskPattern.PATTERN010:
return function(i,j){return j%3==0;};
case QRMaskPattern.PATTERN011:
return function(i,j){return(i+j)%3==0;};
case QRMaskPattern.PATTERN100:
return function(i,j){return(Math.floor(i/2)+Math.floor(j/3))%2==0;};
case QRMaskPattern.PATTERN101:
return function(i,j){return i*j%2+i*j%3==0;};
case QRMaskPattern.PATTERN110:
return function(i,j){return(i*j%2+i*j%3)%2==0;};
case QRMaskPattern.PATTERN111:
return function(i,j){return(i*j%3+(i+j)%2)%2==0;};

default:
throw new Error('bad maskPattern:'+maskPattern);}

};

_this.getErrorCorrectPolynomial=function(errorCorrectLength){
var a=qrPolynomial([1],0);
for(var i=0;i<errorCorrectLength;i+=1){
a=a.multiply(qrPolynomial([1,QRMath.gexp(i)],0));
}
return a;
};

_this.getLengthInBits=function(mode,type){

if(1<=type&&type<10){



switch(mode){
case QRMode.MODE_NUMBER:return 10;
case QRMode.MODE_ALPHA_NUM:return 9;
case QRMode.MODE_8BIT_BYTE:return 8;
case QRMode.MODE_KANJI:return 8;
default:
throw new Error('mode:'+mode);}


}else if(type<27){



switch(mode){
case QRMode.MODE_NUMBER:return 12;
case QRMode.MODE_ALPHA_NUM:return 11;
case QRMode.MODE_8BIT_BYTE:return 16;
case QRMode.MODE_KANJI:return 10;
default:
throw new Error('mode:'+mode);}


}else if(type<41){



switch(mode){
case QRMode.MODE_NUMBER:return 14;
case QRMode.MODE_ALPHA_NUM:return 13;
case QRMode.MODE_8BIT_BYTE:return 16;
case QRMode.MODE_KANJI:return 12;
default:
throw new Error('mode:'+mode);}


}else{
throw new Error('type:'+type);
}
};

_this.getLostPoint=function(qrcode){

var moduleCount=qrcode.getModuleCount();

var lostPoint=0;



for(var row=0;row<moduleCount;row+=1){
for(var col=0;col<moduleCount;col+=1){

var sameCount=0;
var dark=qrcode.isDark(row,col);

for(var r=-1;r<=1;r+=1){

if(row+r<0||moduleCount<=row+r){
continue;
}

for(var c=-1;c<=1;c+=1){

if(col+c<0||moduleCount<=col+c){
continue;
}

if(r==0&&c==0){
continue;
}

if(dark==qrcode.isDark(row+r,col+c)){
sameCount+=1;
}
}
}

if(sameCount>5){
lostPoint+=3+sameCount-5;
}
}
};



for(var row=0;row<moduleCount-1;row+=1){
for(var col=0;col<moduleCount-1;col+=1){
var count=0;
if(qrcode.isDark(row,col))count+=1;
if(qrcode.isDark(row+1,col))count+=1;
if(qrcode.isDark(row,col+1))count+=1;
if(qrcode.isDark(row+1,col+1))count+=1;
if(count==0||count==4){
lostPoint+=3;
}
}
}



for(var row=0;row<moduleCount;row+=1){
for(var col=0;col<moduleCount-6;col+=1){
if(qrcode.isDark(row,col)&&
!qrcode.isDark(row,col+1)&&
qrcode.isDark(row,col+2)&&
qrcode.isDark(row,col+3)&&
qrcode.isDark(row,col+4)&&
!qrcode.isDark(row,col+5)&&
qrcode.isDark(row,col+6)){
lostPoint+=40;
}
}
}

for(var col=0;col<moduleCount;col+=1){
for(var row=0;row<moduleCount-6;row+=1){
if(qrcode.isDark(row,col)&&
!qrcode.isDark(row+1,col)&&
qrcode.isDark(row+2,col)&&
qrcode.isDark(row+3,col)&&
qrcode.isDark(row+4,col)&&
!qrcode.isDark(row+5,col)&&
qrcode.isDark(row+6,col)){
lostPoint+=40;
}
}
}



var darkCount=0;

for(var col=0;col<moduleCount;col+=1){
for(var row=0;row<moduleCount;row+=1){
if(qrcode.isDark(row,col)){
darkCount+=1;
}
}
}

var ratio=Math.abs(100*darkCount/moduleCount/moduleCount-50)/5;
lostPoint+=ratio*10;

return lostPoint;
};

return _this;
}();





var QRMath=function(){

var EXP_TABLE=new Array(256);
var LOG_TABLE=new Array(256);


for(var i=0;i<8;i+=1){
EXP_TABLE[i]=1<<i;
}
for(var i=8;i<256;i+=1){
EXP_TABLE[i]=EXP_TABLE[i-4]^
EXP_TABLE[i-5]^
EXP_TABLE[i-6]^
EXP_TABLE[i-8];
}
for(var i=0;i<255;i+=1){
LOG_TABLE[EXP_TABLE[i]]=i;
}

var _this={};

_this.glog=function(n){

if(n<1){
throw new Error('glog('+n+')');
}

return LOG_TABLE[n];
};

_this.gexp=function(n){

while(n<0){
n+=255;
}

while(n>=256){
n-=255;
}

return EXP_TABLE[n];
};

return _this;
}();





function qrPolynomial(num,shift){

if(typeof num.length=='undefined'){
throw new Error(num.length+'/'+shift);
}

var _num=function(){
var offset=0;
while(offset<num.length&&num[offset]==0){
offset+=1;
}
var _num=new Array(num.length-offset+shift);
for(var i=0;i<num.length-offset;i+=1){
_num[i]=num[i+offset];
}
return _num;
}();

var _this={};

_this.getAt=function(index){
return _num[index];
};

_this.getLength=function(){
return _num.length;
};

_this.multiply=function(e){

var num=new Array(_this.getLength()+e.getLength()-1);

for(var i=0;i<_this.getLength();i+=1){
for(var j=0;j<e.getLength();j+=1){
num[i+j]^=QRMath.gexp(QRMath.glog(_this.getAt(i))+QRMath.glog(e.getAt(j)));
}
}

return qrPolynomial(num,0);
};

_this.mod=function(e){

if(_this.getLength()-e.getLength()<0){
return _this;
}

var ratio=QRMath.glog(_this.getAt(0))-QRMath.glog(e.getAt(0));

var num=new Array(_this.getLength());
for(var i=0;i<_this.getLength();i+=1){
num[i]=_this.getAt(i);
}

for(var i=0;i<e.getLength();i+=1){
num[i]^=QRMath.gexp(QRMath.glog(e.getAt(i))+ratio);
}


return qrPolynomial(num,0).mod(e);
};

return _this;
};





var QRRSBlock=function(){

var RS_BLOCK_TABLE=[







[1,26,19],
[1,26,16],
[1,26,13],
[1,26,9],


[1,44,34],
[1,44,28],
[1,44,22],
[1,44,16],


[1,70,55],
[1,70,44],
[2,35,17],
[2,35,13],


[1,100,80],
[2,50,32],
[2,50,24],
[4,25,9],


[1,134,108],
[2,67,43],
[2,33,15,2,34,16],
[2,33,11,2,34,12],


[2,86,68],
[4,43,27],
[4,43,19],
[4,43,15],


[2,98,78],
[4,49,31],
[2,32,14,4,33,15],
[4,39,13,1,40,14],


[2,121,97],
[2,60,38,2,61,39],
[4,40,18,2,41,19],
[4,40,14,2,41,15],


[2,146,116],
[3,58,36,2,59,37],
[4,36,16,4,37,17],
[4,36,12,4,37,13],


[2,86,68,2,87,69],
[4,69,43,1,70,44],
[6,43,19,2,44,20],
[6,43,15,2,44,16],


[4,101,81],
[1,80,50,4,81,51],
[4,50,22,4,51,23],
[3,36,12,8,37,13],


[2,116,92,2,117,93],
[6,58,36,2,59,37],
[4,46,20,6,47,21],
[7,42,14,4,43,15],


[4,133,107],
[8,59,37,1,60,38],
[8,44,20,4,45,21],
[12,33,11,4,34,12],


[3,145,115,1,146,116],
[4,64,40,5,65,41],
[11,36,16,5,37,17],
[11,36,12,5,37,13],


[5,109,87,1,110,88],
[5,65,41,5,66,42],
[5,54,24,7,55,25],
[11,36,12,7,37,13],


[5,122,98,1,123,99],
[7,73,45,3,74,46],
[15,43,19,2,44,20],
[3,45,15,13,46,16],


[1,135,107,5,136,108],
[10,74,46,1,75,47],
[1,50,22,15,51,23],
[2,42,14,17,43,15],


[5,150,120,1,151,121],
[9,69,43,4,70,44],
[17,50,22,1,51,23],
[2,42,14,19,43,15],


[3,141,113,4,142,114],
[3,70,44,11,71,45],
[17,47,21,4,48,22],
[9,39,13,16,40,14],


[3,135,107,5,136,108],
[3,67,41,13,68,42],
[15,54,24,5,55,25],
[15,43,15,10,44,16],


[4,144,116,4,145,117],
[17,68,42],
[17,50,22,6,51,23],
[19,46,16,6,47,17],


[2,139,111,7,140,112],
[17,74,46],
[7,54,24,16,55,25],
[34,37,13],


[4,151,121,5,152,122],
[4,75,47,14,76,48],
[11,54,24,14,55,25],
[16,45,15,14,46,16],


[6,147,117,4,148,118],
[6,73,45,14,74,46],
[11,54,24,16,55,25],
[30,46,16,2,47,17],


[8,132,106,4,133,107],
[8,75,47,13,76,48],
[7,54,24,22,55,25],
[22,45,15,13,46,16],


[10,142,114,2,143,115],
[19,74,46,4,75,47],
[28,50,22,6,51,23],
[33,46,16,4,47,17],


[8,152,122,4,153,123],
[22,73,45,3,74,46],
[8,53,23,26,54,24],
[12,45,15,28,46,16],


[3,147,117,10,148,118],
[3,73,45,23,74,46],
[4,54,24,31,55,25],
[11,45,15,31,46,16],


[7,146,116,7,147,117],
[21,73,45,7,74,46],
[1,53,23,37,54,24],
[19,45,15,26,46,16],


[5,145,115,10,146,116],
[19,75,47,10,76,48],
[15,54,24,25,55,25],
[23,45,15,25,46,16],


[13,145,115,3,146,116],
[2,74,46,29,75,47],
[42,54,24,1,55,25],
[23,45,15,28,46,16],


[17,145,115],
[10,74,46,23,75,47],
[10,54,24,35,55,25],
[19,45,15,35,46,16],


[17,145,115,1,146,116],
[14,74,46,21,75,47],
[29,54,24,19,55,25],
[11,45,15,46,46,16],


[13,145,115,6,146,116],
[14,74,46,23,75,47],
[44,54,24,7,55,25],
[59,46,16,1,47,17],


[12,151,121,7,152,122],
[12,75,47,26,76,48],
[39,54,24,14,55,25],
[22,45,15,41,46,16],


[6,151,121,14,152,122],
[6,75,47,34,76,48],
[46,54,24,10,55,25],
[2,45,15,64,46,16],


[17,152,122,4,153,123],
[29,74,46,14,75,47],
[49,54,24,10,55,25],
[24,45,15,46,46,16],


[4,152,122,18,153,123],
[13,74,46,32,75,47],
[48,54,24,14,55,25],
[42,45,15,32,46,16],


[20,147,117,4,148,118],
[40,75,47,7,76,48],
[43,54,24,22,55,25],
[10,45,15,67,46,16],


[19,148,118,6,149,119],
[18,75,47,31,76,48],
[34,54,24,34,55,25],
[20,45,15,61,46,16]];


var qrRSBlock=function qrRSBlock(totalCount,dataCount){
var _this={};
_this.totalCount=totalCount;
_this.dataCount=dataCount;
return _this;
};

var _this={};

var getRsBlockTable=function getRsBlockTable(typeNumber,errorCorrectionLevel){

switch(errorCorrectionLevel){
case QRErrorCorrectionLevel.L:
return RS_BLOCK_TABLE[(typeNumber-1)*4+0];
case QRErrorCorrectionLevel.M:
return RS_BLOCK_TABLE[(typeNumber-1)*4+1];
case QRErrorCorrectionLevel.Q:
return RS_BLOCK_TABLE[(typeNumber-1)*4+2];
case QRErrorCorrectionLevel.H:
return RS_BLOCK_TABLE[(typeNumber-1)*4+3];
default:
return undefined;}

};

_this.getRSBlocks=function(typeNumber,errorCorrectionLevel){

var rsBlock=getRsBlockTable(typeNumber,errorCorrectionLevel);

if(typeof rsBlock=='undefined'){
throw new Error('bad rs block @ typeNumber:'+typeNumber+
'/errorCorrectionLevel:'+errorCorrectionLevel);
}

var length=rsBlock.length/3;

var list=new Array();

for(var i=0;i<length;i+=1){

var count=rsBlock[i*3+0];
var totalCount=rsBlock[i*3+1];
var dataCount=rsBlock[i*3+2];

for(var j=0;j<count;j+=1){
list.push(qrRSBlock(totalCount,dataCount));
}
}

return list;
};

return _this;
}();





var qrBitBuffer=function qrBitBuffer(){

var _buffer=new Array();
var _length=0;

var _this={};

_this.getBuffer=function(){
return _buffer;
};

_this.getAt=function(index){
var bufIndex=Math.floor(index/8);
return(_buffer[bufIndex]>>>7-index%8&1)==1;
};

_this.put=function(num,length){
for(var i=0;i<length;i+=1){
_this.putBit((num>>>length-i-1&1)==1);
}
};

_this.getLengthInBits=function(){
return _length;
};

_this.putBit=function(bit){

var bufIndex=Math.floor(_length/8);
if(_buffer.length<=bufIndex){
_buffer.push(0);
}

if(bit){
_buffer[bufIndex]|=0x80>>>_length%8;
}

_length+=1;
};

return _this;
};





var qrNumber=function qrNumber(data){

var _mode=QRMode.MODE_NUMBER;
var _data=data;

var _this={};

_this.getMode=function(){
return _mode;
};

_this.getLength=function(buffer){
return _data.length;
};

_this.write=function(buffer){

var data=_data;

var i=0;

while(i+2<data.length){
buffer.put(strToNum(data.substring(i,i+3)),10);
i+=3;
}

if(i<data.length){
if(data.length-i==1){
buffer.put(strToNum(data.substring(i,i+1)),4);
}else if(data.length-i==2){
buffer.put(strToNum(data.substring(i,i+2)),7);
}
}
};

var strToNum=function strToNum(s){
var num=0;
for(var i=0;i<s.length;i+=1){
num=num*10+chatToNum(s.charAt(i));
}
return num;
};

var chatToNum=function chatToNum(c){
if('0'<=c&&c<='9'){
return c.charCodeAt(0)-'0'.charCodeAt(0);
}
throw'illegal char :'+c;
};

return _this;
};





var qrAlphaNum=function qrAlphaNum(data){

var _mode=QRMode.MODE_ALPHA_NUM;
var _data=data;

var _this={};

_this.getMode=function(){
return _mode;
};

_this.getLength=function(buffer){
return _data.length;
};

_this.write=function(buffer){

var s=_data;

var i=0;

while(i+1<s.length){
buffer.put(
getCode(s.charAt(i))*45+
getCode(s.charAt(i+1)),11);
i+=2;
}

if(i<s.length){
buffer.put(getCode(s.charAt(i)),6);
}
};

var getCode=function getCode(c){

if('0'<=c&&c<='9'){
return c.charCodeAt(0)-'0'.charCodeAt(0);
}else if('A'<=c&&c<='Z'){
return c.charCodeAt(0)-'A'.charCodeAt(0)+10;
}else{
switch(c){
case' ':return 36;
case'$':return 37;
case'%':return 38;
case'*':return 39;
case'+':return 40;
case'-':return 41;
case'.':return 42;
case'/':return 43;
case':':return 44;
default:
throw'illegal char :'+c;}

}
};

return _this;
};





var qr8BitByte=function qr8BitByte(data){

var _mode=QRMode.MODE_8BIT_BYTE;
var _data=data;
var _bytes=qrcode.stringToBytes(data);

var _this={};

_this.getMode=function(){
return _mode;
};

_this.getLength=function(buffer){
return _bytes.length;
};

_this.write=function(buffer){
for(var i=0;i<_bytes.length;i+=1){
buffer.put(_bytes[i],8);
}
};

return _this;
};





var qrKanji=function qrKanji(data){

var _mode=QRMode.MODE_KANJI;
var _data=data;
var _bytes=qrcode.stringToBytesFuncs['SJIS'];

!function(c,code){

var test=qrcode.stringToBytes(c);
if(test.length!=2||(test[0]<<8|test[1])!=code){
throw'sjis not supported.';
}
}("\u53CB",0x9746);

var _this={};

_this.getMode=function(){
return _mode;
};

_this.getLength=function(buffer){
return~~(_bytes.length/2);
};

_this.write=function(buffer){

var data=_bytes;

var i=0;

while(i+1<data.length){

var c=(0xff&data[i])<<8|0xff&data[i+1];

if(0x8140<=c&&c<=0x9FFC){
c-=0x8140;
}else if(0xE040<=c&&c<=0xEBBF){
c-=0xC140;
}else{
throw'illegal char at '+(i+1)+'/'+c;
}

c=(c>>>8&0xff)*0xC0+(c&0xff);

buffer.put(c,13);

i+=2;
}

if(i<data.length){
throw'illegal char at '+(i+1);
}
};

return _this;
};









var byteArrayOutputStream=function byteArrayOutputStream(){

var _bytes=new Array();

var _this={};

_this.writeByte=function(b){
_bytes.push(b&0xff);
};

_this.writeShort=function(i){
_this.writeByte(i);
_this.writeByte(i>>>8);
};

_this.writeBytes=function(b,off,len){
off=off||0;
len=len||b.length;
for(var i=0;i<len;i+=1){
_this.writeByte(b[i+off]);
}
};

_this.writeString=function(s){
for(var i=0;i<s.length;i+=1){
_this.writeByte(s.charCodeAt(i));
}
};

_this.toByteArray=function(){
return _bytes;
};

_this.toString=function(){
var s='';
s+='[';
for(var i=0;i<_bytes.length;i+=1){
if(i>0){
s+=',';
}
s+=_bytes[i];
}
s+=']';
return s;
};

return _this;
};





var base64EncodeOutputStream=function base64EncodeOutputStream(){

var _buffer=0;
var _buflen=0;
var _length=0;
var _base64='';

var _this={};

var writeEncoded=function writeEncoded(b){
_base64+=String.fromCharCode(encode(b&0x3f));
};

var encode=function encode(n){
if(n<0){

}else if(n<26){
return 0x41+n;
}else if(n<52){
return 0x61+(n-26);
}else if(n<62){
return 0x30+(n-52);
}else if(n==62){
return 0x2b;
}else if(n==63){
return 0x2f;
}
throw new Error('n:'+n);
};

_this.writeByte=function(n){

_buffer=_buffer<<8|n&0xff;
_buflen+=8;
_length+=1;

while(_buflen>=6){
writeEncoded(_buffer>>>_buflen-6);
_buflen-=6;
}
};

_this.flush=function(){

if(_buflen>0){
writeEncoded(_buffer<<6-_buflen);
_buffer=0;
_buflen=0;
}

if(_length%3!=0){

var padlen=3-_length%3;
for(var i=0;i<padlen;i+=1){
_base64+='=';
}
}
};

_this.toString=function(){
return _base64;
};

return _this;
};





var base64DecodeInputStream=function base64DecodeInputStream(str){

var _str=str;
var _pos=0;
var _buffer=0;
var _buflen=0;

var _this={};

_this.read=function(){

while(_buflen<8){

if(_pos>=_str.length){
if(_buflen==0){
return-1;
}
throw new Error('unexpected end of file./'+_buflen);
}

var c=_str.charAt(_pos);
_pos+=1;

if(c=='='){
_buflen=0;
return-1;
}else if(c.match(/^\s$/)){

continue;
}

_buffer=_buffer<<6|decode(c.charCodeAt(0));
_buflen+=6;
}

var n=_buffer>>>_buflen-8&0xff;
_buflen-=8;
return n;
};

var decode=function decode(c){
if(0x41<=c&&c<=0x5a){
return c-0x41;
}else if(0x61<=c&&c<=0x7a){
return c-0x61+26;
}else if(0x30<=c&&c<=0x39){
return c-0x30+52;
}else if(c==0x2b){
return 62;
}else if(c==0x2f){
return 63;
}else{
throw new Error('c:'+c);
}
};

return _this;
};





var gifImage=function gifImage(width,height){

var _width=width;
var _height=height;
var _data=new Array(width*height);

var _this={};

_this.setPixel=function(x,y,pixel){
_data[y*_width+x]=pixel;
};

_this.write=function(out){




out.writeString('GIF87a');




out.writeShort(_width);
out.writeShort(_height);

out.writeByte(0x80);
out.writeByte(0);
out.writeByte(0);





out.writeByte(0x00);
out.writeByte(0x00);
out.writeByte(0x00);


out.writeByte(0xff);
out.writeByte(0xff);
out.writeByte(0xff);




out.writeString(',');
out.writeShort(0);
out.writeShort(0);
out.writeShort(_width);
out.writeShort(_height);
out.writeByte(0);







var lzwMinCodeSize=2;
var raster=getLZWRaster(lzwMinCodeSize);

out.writeByte(lzwMinCodeSize);

var offset=0;

while(raster.length-offset>255){
out.writeByte(255);
out.writeBytes(raster,offset,255);
offset+=255;
}

out.writeByte(raster.length-offset);
out.writeBytes(raster,offset,raster.length-offset);
out.writeByte(0x00);



out.writeString(';');
};

var bitOutputStream=function bitOutputStream(out){

var _out=out;
var _bitLength=0;
var _bitBuffer=0;

var _this={};

_this.write=function(data,length){

if(data>>>length!=0){
throw new Error('length over');
}

while(_bitLength+length>=8){
_out.writeByte(0xff&(data<<_bitLength|_bitBuffer));
length-=8-_bitLength;
data>>>=8-_bitLength;
_bitBuffer=0;
_bitLength=0;
}

_bitBuffer=data<<_bitLength|_bitBuffer;
_bitLength=_bitLength+length;
};

_this.flush=function(){
if(_bitLength>0){
_out.writeByte(_bitBuffer);
}
};

return _this;
};

var getLZWRaster=function getLZWRaster(lzwMinCodeSize){

var clearCode=1<<lzwMinCodeSize;
var endCode=(1<<lzwMinCodeSize)+1;
var bitLength=lzwMinCodeSize+1;


var table=lzwTable();

for(var i=0;i<clearCode;i+=1){
table.add(String.fromCharCode(i));
}
table.add(String.fromCharCode(clearCode));
table.add(String.fromCharCode(endCode));

var byteOut=byteArrayOutputStream();
var bitOut=bitOutputStream(byteOut);


bitOut.write(clearCode,bitLength);

var dataIndex=0;

var s=String.fromCharCode(_data[dataIndex]);
dataIndex+=1;

while(dataIndex<_data.length){

var c=String.fromCharCode(_data[dataIndex]);
dataIndex+=1;

if(table.contains(s+c)){

s=s+c;

}else{

bitOut.write(table.indexOf(s),bitLength);

if(table.size()<0xfff){

if(table.size()==1<<bitLength){
bitLength+=1;
}

table.add(s+c);
}

s=c;
}
}

bitOut.write(table.indexOf(s),bitLength);


bitOut.write(endCode,bitLength);

bitOut.flush();

return byteOut.toByteArray();
};

var lzwTable=function lzwTable(){

var _map={};
var _size=0;

var _this={};

_this.add=function(key){
if(_this.contains(key)){
throw new Error('dup key:'+key);
}
_map[key]=_size;
_size+=1;
};

_this.size=function(){
return _size;
};

_this.indexOf=function(key){
return _map[key];
};

_this.contains=function(key){
return typeof _map[key]!='undefined';
};

return _this;
};

return _this;
};

var createImgTag=function createImgTag(width,height,getPixel,alt){

var gif=gifImage(width,height);
for(var y=0;y<height;y+=1){
for(var x=0;x<width;x+=1){
gif.setPixel(x,y,getPixel(x,y));
}
}

var b=byteArrayOutputStream();
gif.write(b);

var base64=base64EncodeOutputStream();
var bytes=b.toByteArray();
for(var i=0;i<bytes.length;i+=1){
base64.writeByte(bytes[i]);
}
base64.flush();

var img='';
img+='<img';
img+=" src=\"";
img+='data:image/gif;base64,';
img+=base64;
img+='"';
img+=" width=\"";
img+=width;
img+='"';
img+=" height=\"";
img+=height;
img+='"';
if(alt){
img+=" alt=\"";
img+=alt;
img+='"';
}
img+='/>';

return img;
};




return qrcode;
}();


!function(){

qrcode.stringToBytesFuncs['SJIS']=qrcode.createStringToBytes(
'AAAAAAABAAEAAgACAAMAAwAEAAQABQAFAAYABgAHAAcACAAIAAkACQAKAAoACwALAAwADAANAA0ADgAOAA8ADwAQABAAEQARABIAEgATABMAFAAUABUAFQAWABYAFwAXABgAGAAZABkAGgAaABsAGwAcABwAHQAdAB4AHgAfAB8AIAAgACEAIQAiACIAIwAjACQAJAAlACUAJgAmACcAJwAoACgAKQApACoAKgArACsALAAsAC0ALQAuAC4ALwAvADAAMAAxADEAMgAyADMAMwA0ADQANQA1ADYANgA3ADcAOAA4ADkAOQA6ADoAOwA7ADwAPAA9AD0APgA+AD8APwBAAEAAQQBBAEIAQgBDAEMARABEAEUARQBGAEYARwBHAEgASABJAEkASgBKAEsASwBMAEwATQBNAE4ATgBPAE8AUABQAFEAUQBSAFIAUwBTAFQAVABVAFUAVgBWAFcAVwBYAFgAWQBZAFoAWgBbAFsAXABcAF0AXQBeAF4AXwBfAGAAYABhAGEAYgBiAGMAYwBkAGQAZQBlAGYAZgBnAGcAaABoAGkAaQBqAGoAawBrAGwAbABtAG0AbgBuAG8AbwBwAHAAcQBxAHIAcgBzAHMAdAB0AHUAdQB2AHYAdwB3AHgAeAB5AHkAegB6AHsAewB8AHwAfQB9AH4AfgB\/AH8AooGRAKOBkgCngZgAqIFOAKyBygCwgYsAsYF9ALSBTAC2gfcA14F+APeBgAORg58DkoOgA5ODoQOUg6IDlYOjA5aDpAOXg6UDmIOmA5mDpwOag6gDm4OpA5yDqgOdg6sDnoOsA5+DrQOgg64DoYOvA6ODsAOkg7EDpYOyA6aDswOng7QDqIO1A6mDtgOxg78DsoPAA7ODwQO0g8IDtYPDA7aDxAO3g8UDuIPGA7mDxwO6g8gDu4PJA7yDygO9g8sDvoPMA7+DzQPAg84DwYPPA8OD0APEg9EDxYPSA8aD0wPHg9QDyIPVA8mD1gQBhEYEEIRABBGEQQQShEIEE4RDBBSERAQVhEUEFoRHBBeESAQYhEkEGYRKBBqESwQbhEwEHIRNBB2ETgQehE8EH4RQBCCEUQQhhFIEIoRTBCOEVAQkhFUEJYRWBCaEVwQnhFgEKIRZBCmEWgQqhFsEK4RcBCyEXQQthF4ELoRfBC+EYAQwhHAEMYRxBDKEcgQzhHMENIR0BDWEdQQ2hHcEN4R4BDiEeQQ5hHoEOoR7BDuEfAQ8hH0EPYR+BD6EgAQ\/hIEEQISCBEGEgwRChIQEQ4SFBESEhgRFhIcERoSIBEeEiQRIhIoESYSLBEqEjARLhI0ETISOBE2EjwROhJAET4SRBFGEdiAQgV0gFIFcIBaBYSAYgWUgGYFmIByBZyAdgWggIIH1ICGB9iAlgWQgJoFjIDCB8SAygYwgM4GNIDuBpiEDgY4hK4HwIZCBqSGRgaohkoGoIZOBqyHSgcsh1IHMIgCBzSICgd0iA4HOIgeB3iIIgbgiC4G5IhKBfCIageMiHYHlIh6BhyIggdoiJ4HIIiiBySIpgb8iKoG+IiuB5yIsgegiNIGIIjWB5iI9geQiUoHgImCBgiJhgd8iZoGFImeBhiJqgeEia4HiIoKBvCKDgb0ihoG6IoeBuyKlgdsjEoHcJQCEnyUBhKolAoSgJQOEqyUMhKElD4SsJRCEoiUThK0lFISkJReEryUYhKMlG4SuJRyEpSUdhLolIIS1JSOEsCUkhKclJYS8JSiEtyUrhLIlLISmJS+EtiUwhLslM4SxJTSEqCU3hLglOIS9JTuEsyU8hKklP4S5JUKEviVLhLQloIGhJaGBoCWygaMls4GiJbyBpSW9gaQlxoGfJceBniXLgZslzoGdJc+BnCXvgfwmBYGaJgaBmSZAgYomQoGJJmqB9CZtgfMmb4HyMACBQDABgUEwAoFCMAOBVjAFgVgwBoFZMAeBWjAIgXEwCYFyMAqBczALgXQwDIF1MA2BdjAOgXcwD4F4MBCBeTARgXowEoGnMBOBrDAUgWswFYFsMByBYDBBgp8wQoKgMEOCoTBEgqIwRYKjMEaCpDBHgqUwSIKmMEmCpzBKgqgwS4KpMEyCqjBNgqswToKsME+CrTBQgq4wUYKvMFKCsDBTgrEwVIKyMFWCszBWgrQwV4K1MFiCtjBZgrcwWoK4MFuCuTBcgrowXYK7MF6CvDBfgr0wYIK+MGGCvzBigsAwY4LBMGSCwjBlgsMwZoLEMGeCxTBogsYwaYLHMGqCyDBrgskwbILKMG2CyzBugswwb4LNMHCCzjBxgs8wcoLQMHOC0TB0gtIwdYLTMHaC1DB3gtUweILWMHmC1zB6gtgwe4LZMHyC2jB9gtswfoLcMH+C3TCAgt4wgYLfMIKC4DCDguEwhILiMIWC4zCGguQwh4LlMIiC5jCJgucwioLoMIuC6TCMguowjYLrMI6C7DCPgu0wkILuMJGC7zCSgvAwk4LxMJuBSjCcgUswnYFUMJ6BVTChg0AwooNBMKODQjCkg0MwpYNEMKaDRTCng0YwqINHMKmDSDCqg0kwq4NKMKyDSzCtg0wwroNNMK+DTjCwg08wsYNQMLKDUTCzg1IwtINTMLWDVDC2g1Uwt4NWMLiDVzC5g1gwuoNZMLuDWjC8g1swvYNcML6DXTC\/g14wwINfMMGDYDDCg2Eww4NiMMSDYzDFg2QwxoNlMMeDZjDIg2cwyYNoMMqDaTDLg2owzINrMM2DbDDOg20wz4NuMNCDbzDRg3Aw0oNxMNODcjDUg3Mw1YN0MNaDdTDXg3Yw2IN3MNmDeDDag3kw24N6MNyDezDdg3ww3oN9MN+DfjDgg4Aw4YOBMOKDgjDjg4Mw5IOEMOWDhTDmg4Yw54OHMOiDiDDpg4kw6oOKMOuDizDsg4ww7YONMO6DjjDvg48w8IOQMPGDkTDyg5Iw84OTMPSDlDD1g5Uw9oOWMPuBRTD8gVsw\/YFSMP6BU04AiOpOAZKaTgOOtU4HlpxOCI\/kTgmOT04Kj+NOC4m6Tg2Vc04Ol15OEJigThGJTk4Uio5OFZihThaQok4XmcBOGIt1ThmVuE4ej+VOIZe8TiaVwE4qmKJOLZKGTjGYo04yi\/hONpikTjiK2045kk9OO47lTjyYpU4\/mKZOQpinTkOUVE5Fi3ZOS5RWTk2T4U5OjMFOT5ZSTlXlaE5WmKhOV4\/mTliYqU5ZibNOXYvjTl6M7k5fludOYpukTnGXkE5zk\/tOfoqjToCLVE6CmKpOhZirToaXuU6Il1xOiZGIToqYrU6LjpZOjJPxTo6YsE6RiV1OkozdTpSM3E6ViOROmJhqTpmYaU6bjbFOnIifTp6YsU6fmLJOoJizTqGWU06imLROpIzwTqWI5U6mlpJOqIucTquLnU6si55OrZLgTq6Xuk6wmLVOs5i2TraYt066kGxOwI9ZTsGQbU7CmLxOxJi6TsaYu07Hi3dOyo2hTsuJ7k7NmLlOzpi4Ts+Vp07UjmVO1Y5kTtaRvE7XmL1O2JV0TtmQ5U7dgVdO3pi+Tt+YwE7jkeNO5JffTuWIyE7tmL9O7om8TvCLwk7ykodO9oyPTveYwU77lENPAYrpTwmYwk8KiMlPDYzeTw6K6k8PlZpPEJSwTxGLeE8aie9PHJjlTx2TYE8vlIxPMJjETzSUuk82l+BPOJBMTzqOZk88jpdPPYm+T0OSz09GkkFPR5jIT02Iyk9OkuFPT49aT1CNsk9Rl0NPU5HMT1WJvU9XmMdPWZddT1qYw09bmMVPXI3sT12Yxk9em0NPaZjOT2+Y0U9wmM9Pc4nAT3WVuU92mMlPe5jNT3yM8U9\/jmdPg4qkT4aY0k+ImMpPi5fhT42OmE+PmMtPkZjQT5aY00+YmMxPm4ufT52Iy0+gi6BPoYm\/T6ubRE+tlplPrpWOT6+M8k+1kE5Ptpe1T7+V1k\/CjFdPw5GjT8SJ4k\/Kj3JPzpjXT9CY3E\/RmNpP1JjVT9eRrU\/YmNhP2pjbT9uY2U\/dldtP35jWT+GQTU\/jlpNP5JjdT+WY3k\/uj0NP75jrT\/OUb0\/1lVVP9pjmT\/iV7k\/6ibRP\/pjqUAWY5FAGmO1QCZFxUAuMwlANlHtQD+DFUBGY7FASk3xQFJjhUBaM9FAZjPNQGpjfUB+O2FAhmOdQI5XtUCSSbFAlmONQJoyRUCiY4FApmOhQKpjiUCuXz1AsmOlQLZhgUDaL5FA5jJBQQ5juUEeY71BImPNQSYjMUE+VzlBQmPJQVZjxUFaY9VBamPRQXJLiUGWMklBsmPZQco7DUHSRpFB1kuNQdov0UHiY91B9i1VQgJj4UIWY+lCNllRQkYyGUJiOUFCZlPVQmpj5UKyNw1Ctl2JQspj8ULOZQlC0mPtQtY3CULePnVC+jFhQwplDUMWLzVDJmUBQyplBUM2TrVDPkZxQ0YuhUNWWbFDWmURQ2pe7UN6ZRVDjmUhQ5ZlGUOeRbVDtmUdQ7plJUPWZS1D5mUpQ+5XGUQCLVlEBmU1RAplOUQSJrVEJmUxREo7yURSZUVEVmVBRFplPURiY1FEamVJRH4+eUSGZU1Eql0RRMpbXUTeZVVE6mVRRO5lXUTyZVlE\/mVhRQJlZUUGI8lFDjLNRRIxaUUWPW1FGkptRR4uiUUiQ5lFJjPVRS42OUUyZW1FNlsZRTpNlUVCOmVFSmVpRVJlcUVqTfVFcipVRYpldUWWT\/FFokVNRaZlfUWqZYFFrlKpRbIz2UW2YWlFumWFRcYukUXWVulF2kbRRd4vvUXiTVFF8jJNRgJliUYKZY1GFk+BRhol+UYmZZlGKjftRjJllUY2NxFGPmWdRkOPsUZGZaFGSlmBRk5lpUZWZalGWmWtRl4\/nUZmOylGgiqVRopluUaSZbFGllrtRppltUaiVeVGpmW9RqplwUauZcVGsk35RsJl1UbGZc1GymXRRs5lyUbSN4VG1mXZRtpboUbeX4lG9mXdRxJCmUcWZeFHGj3lRyZl5UcuSnFHMl71RzZOAUdaZw1HbmXpR3OqjUd2Lw1HgmXtR4ZZ9UeaPiFHnkfpR6Zl9UeqT4lHtmX5R8JmAUfGKTVH1mYFR9oulUfiTylH5iZpR+o9vUf2Un1H+mYJSAJOBUgOQblIEmYNSBpWqUgeQ2FIIiqBSCoqnUguZhFIOmYZSEYxZUhSZhVIXl\/FSHY+JUiSUu1IllcpSJ5mHUimXmFIqmYhSLpmJUjCTnlIzmYpSNpCnUjeN\/FI4jJRSOZmLUjqOaFI7jY9SQ5LkUkSZjVJHkaVSSo3tUkuZjlJMmY9STZFPUk+ZjFJUmZFSVpZVUluNhFJemZBSY4yVUmSN3FJllI1SaZmUUmqZklJvlZtScI\/oUnGZm1JyioRSc5mVUnSZk1J1kW5SfZmXUn+ZllKDimNSh4yAUoiZnFKJl6tSjZmYUpGZnVKSmZpSlJmZUpuXzVKfjPdSoInBUqOX8lKpj5VSqpN3UquNhVKsmaBSrZmhUrGX41K0mEpStZmjUrmM+FK8maJSvopOUsGZpFLDlnVSxZK6UseXRVLJlddSzZmlUtLo01LVk65S15mmUtiKqFLZlrFS3Y+fUt6Zp1LfleVS4JmrUuKQqFLjmahS5IvOUuaZqVLniqlS8oxNUvOZrFL1ma1S+JmuUvmZr1L6jtlS\/oz5Uv+W3FMBluZTApP1UwWV71MGmbBTCJmxUw2Zs1MPmbVTEJm0UxWZtlMWibtTF5ZrUxmN+lMambdTHZF4UyCPoFMhi6dTI5m4UyqU2VMvmblTMZm6UzOZu1M4mbxTOZVDUzqL5lM7iONTP5O9U0CZvVNBj1xTQ5DnU0WZv1NGmb5TR4+hU0iM31NJmcFTSpS8U02ZwlNRlNpTUpGyU1OR7FNUi6ZTV5PsU1iSUFNalI5TXJZtU16ZxFNgkOhTZoxUU2mZxVNumcZTb4lLU3CI81NxiutTc5GmU3SLcFN1l5FTd5nJU3iJtVN7mchTf4uoU4KZylOElu9TlpnLU5iX0FOajPpTn4y0U6CZzFOlmc5TppnNU6iQflOpiVhTrYl9U66Zz1OwmdBTs4y1U7aZ0VO7i45Two5RU8OZ0lPIlpRTyY2zU8qLeVPLl0ZTzJFvU82UvVPOjvtT1I9mU9aO5lPXjvNT2Y+WU9uUvlPfmdVT4YliU+KRcFPjjPtT5IzDU+WL5VPomdlT6ZJAU+qR\/FPri6lT7I+iU+2Z2lPumdhT74nCU\/CR5FPxjrZT8o5qU\/OJRVP2ipBT942GU\/iOaVP6mdtUAZncVAOLaFQEimVUCI2HVAmLZ1QKkt1UC4lEVAyTr1QNlrxUDo1AVA+XmVQQk2ZUEYz8VBuMTlQdmeVUH4vhVCCWaVQmlNtUKZnkVCuK3FQsmd9ULZngVC6Z4lQ2meNUOIt6VDmQgVQ7latUPJnhVD2Z3VQ+jOFUQJneVEKYQ1RGlfBUSJLmVEmM4FRKjZBUTpnmVFGT21RfmepUaI78VGqO9FRwme1UcZnrVHOWoVR1mehUdpnxVHeZ7FR7me9UfIzEVH2WvVSAmfBUhJnyVIaZ9FSLje5UjJhhVI6Z6VSPmedUkJnzVJKZ7lSimfZUpJpCVKWZ+FSomfxUq5pAVKyZ+VSvml1Uso3nVLOKUFS4mfdUvJpEVL2I9FS+mkNUwIijVMGVaVTCmkFUxJn6VMeZ9VTImftUyY3GVNiaRVThiPVU4ppOVOWaRlTmmkdU6I+jVOmWiVTtmkxU7ppLVPKTTlT6mk1U\/ZpKVQSJU1UGjbRVB5BPVQ+aSFUQk4JVFJpJVRaIoFUumlNVL5dCVTGPpVUzmllVOJpYVTmaT1U+kcFVQJpQVUSR7VVFmlVVRo+kVUyaUlVPluJVU4xbVVaaVlVXmldVXJpUVV2aWlVjmlFVe5pgVXyaZVV+mmFVgJpcVYOaZlWEkVBVh5poVYmNQVWKml5Vi5KdVZiaYlWZmltVmoqrVZyK7FWdioVVnppjVZ+aX1WnjJZVqJppVamaZ1WqkXJVq4tpVayLqlWummRVsIvyVbaJY1XEmm1VxZprVceapVXUmnBV2ppqVdyablXfmmxV445rVeSab1X3mnJV+Zp3Vf2adVX+mnRWBpJRVgmJw1YUmnFWFppzVhePplYYiVJWG5p2VimJ3FYvmoJWMY\/6VjKafVY0mntWNpp8VjiaflZCiVxWTJFYVk6aeFZQmnlWW4qaVmSagVZoiu1WapqEVmuagFZsmoNWdJWsVniT01Z6lLZWgJqGVoaahVaHimRWipqHVo+ailaUmolWoJqIVqKUWFalmotWrpqMVrSajla2mo1WvJqQVsCak1bBmpFWwpqPVsOaklbImpRWzpqVVtGallbTmpdW15qYVtiZZFbajvpW245sVt6J8VbgiPZW45JjVu6amVbwjaJW8ojNVvOQfVb5mppW+ozFVv2NkVb\/mpxXAJqbVwOV3lcEmp1XCJqfVwmanlcLmqBXDZqhVw+Ml1cSiYBXE5qiVxaapFcYmqNXHJqmVx+TeVcmmqdXJ4izVyiN3VctjFxXMJJuVzeaqFc4mqlXO5qrV0CarFdCjeJXR4vPV0qWVldOmqpXT5qtV1CNv1dRjUJXYZqxV2SNo1dmklJXaZquV2qS2Fd\/mrJXgpCCV4iasFeJmrNXi4xeV5OatFegmrVXoo1DV6OKX1ekmrdXqpq4V7CauVezmrZXwJqvV8OaulfGmrtXy5aEV86P6VfSmr1X05q+V9SavFfWmsBX3JRXV9+I5lfglXVX45rBV\/SP+1f3jrdX+ZR8V\/qK7lf8jelYAJZ4WAKTsFgFjJhYBpHNWAqav1gLmsJYFZHCWBmaw1gdmsRYIZrGWCSS51gqiqxYL+qfWDCJgVgxlfFYNI\/qWDWTZ1g6jeRYPZrMWECVu1hBl9tYSonyWEuayFhRkVlYUprLWFSTg1hXk2hYWJOEWFmUt1hakstYXo3HWGKax1hpiZZYa5NVWHCayVhymsVYdZBvWHmazVh+j21Yg4urWIWazliTleZYl5GdWJySxFifmtBYqJZuWKua0ViumtZYs5WtWLia1Vi5ms9YuprSWLua1Fi+jaRYwZXHWMWa11jHkmRYyonzWMyP61jRmtlY05rYWNWNiFjXmtpY2JrcWNma21jcmt5Y3prTWN+a4Fjkmt9Y5ZrdWOuObVjskHBY7pFzWO+a4VjwkLpY8YjrWPKUhFj3ktlY+ZrjWPqa4lj7muRY\/JrlWP2a5lkCmudZCZXPWQqa6FkPicRZEJrpWRWXW1kWik9ZGJnHWRmPZ1kakb1ZG5rqWRyW6VkilrJZJZrsWSeR5Vkpk1ZZKpG+WSuVdlksmu1ZLZruWS6Jm1kxjrhZMprvWTeIzlk4mvBZPprxWUSJgllHiu9ZSJPeWUmV8llOmvVZT5F0WVCa9FlRjF9ZVJZ6WVWa81lXk4VZWJr3WVqa9llgmvlZYpr4WWWJnFlnmvpZaI+nWWma\/FlqkkRZbJr7WW6VsVlzj5dZdJN6WXibQFl9jURZgZtBWYKUQFmDlNxZhJbPWYqURFmNm0pZk4tXWZaXZFmZlq1Zm5uqWZ2bQlmjm0VZpZHDWaiWV1msk2lZsptGWbmWhVm7jchZvo+oWcabR1nJjm9Zy45uWdCIt1nRjMZZ05CpWdSIz1nZm0tZ2ptMWdybSVnliVdZ5oqtWeibSFnqlsNZ65VQWfaIpln7iPdZ\/45wWgGI0FoDiKFaCZtRWhGbT1oYlrpaGptSWhybUFofm05aIJBQWiWbTVopldhaL4ziWjWbVlo2m1daPI+pWkCbU1pBmEtaRpRrWkmbVVpajaVaYptYWmaVd1pqm1labJtUWn+WuVqSlH1amptaWpuVUVq8m1tavZtfWr6bXFrBicVawpteWsmOuVrLm11azIyZWtCba1rWm2Ra15thWuGShFrjm2Ba5ptiWumbY1r6m2Va+5tmWwmK8FsLm2hbDJtnWxabaVsij+xbKptsWyyS2lswiWRbMptqWzabbVs+m25bQJtxW0Obb1tFm3BbUI5xW1GbcltUjUVbVZtzW1eOmltYkbZbWpt0W1ubdVtcjnlbXY1GW1+W0Ftji0dbZIzHW2WbdltmindbaZt3W2uRt1twm3hbcZuhW3ObeVt1m3pbeJt7W3qbfVuAm35bg5uAW4WR7luHiUZbiI7nW4mIwFuLkXZbjIquW42Os1uPjUdblZOGW5ePQFuYiq9bmZKIW5qS6FubiLZbnItYW52V81ufjsBbootxW6OQ6VukjrpbpZdHW6abgVuui3tbsI3JW7OKUVu0iYNbtY+qW7aJxlu4m4JbuZdlW7+PaFvCjuJbw5uDW8SK8VvFk9BbxpanW8ebhFvJm4VbzJV4W9Cbh1vSiqZb04v1W9SbhlvbirBb3ZBRW96bi1vfjkBb4YnHW+Kbilvkm4hb5ZuMW+abiVvnlEpb6J7LW+mQUlvrm41b7pe+W\/Cbjlvzm5Bb9ZKeW\/abj1v4kKFb+o6bW\/6Rzlv\/jvVcAZWVXAKQ6lwEjstcBZuRXAaPq1wHm5JcCJuTXAmI0VwKkbhcC5BxXA2blFwOk7FcD4+sXBGPrVwTm5VcFpDrXBqPrlwgm5ZcIpuXXCSW3lwom5hcLYvEXDGPQVw4m5lcOZuaXDqO2lw7kEtcPJPyXD2Qc1w+lPZcP5RBXECLx1xBm5tcRYuPXEabnFxIi\/xcSpPNXEuJrlxNjnJcTpudXE+boFxQm59cUYv7XFObnlxVk1dcXpGuXGCTalxhjsZcZJF3XGWXmlxsm6JcbpujXG+T1FxxjlJcdpulXHmbplyMm6dckIryXJGbqFyUm6lcoYmqXKiRWlypiuJcq5urXKyWplyxkdBcs4p4XLabrVy3m69cuIrdXLubrFy8m65cvpuxXMWbsFzHm7Jc2ZuzXOCTu1zhi6xc6InjXOmbtFzqm7lc7Zu3XO+V9VzwlfRc9pOHXPqbtlz7j3Nc\/Zu1XQeQkl0Lm7pdDo3oXRGbwF0Um8FdFZu7XRaKUl0Xm7xdGJvFXRmbxF0am8NdG5u\/XR+bvl0im8JdKZX2XUubyV1Mm8ZdTpvIXVCXkl1Sm8ddXJu9XWmQk11sm8pdb421XXOby112m8xdgpvPXYSbzl2Hm81di5OIXYybuF2Qm9VdnZvRXaKb0F2sm9JdrpvTXbeb1l26l+RdvJvXXb2b1F3Jm9hdzIreXc2b2V3Sm9td05vaXdab3F3bm91d3ZDsXd6PQl3hj4Rd45GDXeWNSF3mjbZd541JXeiLkF3rm95d7o23XfGMyF3ym99d85akXfSUYl31m+Bd941KXfuKql39kkZd\/ovQXgKOc14DlXpeBpS\/Xgub4V4MivNeEZvkXhaSn14Zm+NeGpviXhub5V4dkuleJZCDXiuOdF4tkMheL5HRXjCLQV4zkqBeNpvmXjeb5144j+1ePZZYXkCb6l5Dm+leRJvoXkWVnV5Hm\/FeTJZ5Xk6b615Um+1eVZaLXleb7F5fm+5eYZSmXmKb715jlbxeZJvwXnKKsV5zlb1edJROXnWb8l52m\/NeeI1LXnmKsl56m\/Ree4y2XnyXY159l0hefor0Xn+b9l6BkqFeg41MXoSPr16HlN1eio+wXo+PmF6VkupelpX3XpeTWF6ajU1enJV7XqCb916mk3hep43AXquMyV6tkutetYjBXraPjl63jU5euJdmXsGb+F7Cm\/lew5RwXsib+l7Jl\/VeyphMXs+b\/F7Qm\/te04pmXtacQF7anENe25xEXt2cQl7flV9e4I+xXuGcRl7inEVe45xBXuicR17pnEhe7JxJXvCcTF7xnEpe85xLXvScTV72iYRe95LsXvicTl76jJpe+4n0XvyUVV7+nE9e\/5P5XwGV2V8DnFBfBJhNXwmcUV8Klb5fC5xUXwyYn18NmK9fD46uXxCT818RnFVfE4t8XxSSol8ViPhfFpxWXxeVpF8YjU9fG5JvXx+S7V8llu1fJoy3XyeMyl8pnFdfLZxYXy+cXl8xjuNfNZKjXzeLrV84nFlfPJVKXz6SZV9BnFpfSJxbX0qLrl9MnFxfTpxdX1GcX19Tk5ZfVpxgX1ecYV9ZnGJfXJxTX12cUl9hnGNfYoxgX2aVRl9pjcpfapVWX2uSpF9slWpfbZxkX3CPsl9xiWVfc5xlX3ecZl95lvBffJTeX3+caV+AiZ1fgZCqX4KcaF+DnGdfhIxhX4WR0l+HnG1fiJxrX4qcal+Ll6VfjIzjX5CPmV+RnGxfkpNrX5OPXV+Xk75fmJxwX5mcb1+enG5foJxxX6GM5F+onHJfqZWcX6qPel+tnHNfrpT3X7OTv1+0kqVfuZNPX7ycdF+9i0pfw5BTX8WVS1\/MivVfzZRFX9acdV\/XjnVf2JZZX9mWWl\/ciZ5f3Zx6X+CSiV\/knHdf64n1X\/Ccq1\/xnHlf9ZRPX\/iceF\/7nHZf\/Y2aX\/+cfGAOnINgD5yJYBCcgWASk3tgFZyGYBaVfGAZnIBgG5yFYByX5WAdjnZgIJHTYCGcfWAli31gJpyIYCeQq2AoiYVgKZyCYCqJ9mArnIdgL4uvYDGchGA6nIpgQZyMYEKclmBDnJRgRpyRYEqckGBLl\/ZgTZySYFCLsGBSjVBgVY+aYFmcmWBanItgX5yPYGCcfmBiifhgY5yTYGSclWBlknBgaI2mYGmJtmBqnI1ga5yYYGycl2Bti7Fgb5GnYHCKhmB1jGJgd5yOYIGcmmCDnJ1ghJyfYImOu2CLnKVgjJLuYI2cm2CSnKNglIn3YJacoWCXnKJgmpyeYJucoGCfjOVgoJdJYKOKs2CmiXhgp5ykYKmUWWCqiKtgspTfYLOce2C0nKpgtZyuYLaW42C4nKdgvJOJYL2crGDFj+5gxpytYMeT1WDRmGZg05ypYNicr2DajZtg3JDJYN+I0mDgnKhg4ZymYOOReWDnnJxg6I5TYPCRxGDxnLtg85F6YPSctmD2nLNg95y0YPmO5GD6nLdg+5y6YQCctWEBj0RhA5y4YQacsmEIlvphCZb5YQ2cvGEOnL1hD4jTYRWcsWEai\/BhG4ikYR+KtGEhnLlhJ5zBYSicwGEsnMVhNJzGYTycxGE9nMdhPpy\/YT+cw2FCnMhhRJzJYUecvmFIjpxhSpzCYUuR1GFMjVFhTZywYU6QVGFTnNZhVZXnYViczGFZnM1hWpzOYV2c1WFfnNRhYpadYWOKtWFlnNJhZ4xkYWiKU2FrnM9hbpe2YW+c0WFwiNRhcZzTYXOcymF0nNBhdZzXYXaMY2F3nMthfpd8YYKXSmGHnNphipzeYY6RnmGQl\/dhkZzfYZSc3GGWnNlhmZzYYZqc3WGkla5hp5OyYamMZWGrnOBhrJzbYa6c4WGyjJthtomvYbqc6WG+irZhw5znYcac6GHHjadhyJzmYcmc5GHKnONhy5zqYcyc4mHNnOxh0In5YeOc7mHmnO1h8pKmYfSc8WH2nO9h95zlYfiMnGH6nPBh\/Jz0Yf2c82H+nPVh\/5zyYgCc9mIInPdiCZz4YgqV6GIMnPpiDZz5Yg6PXmIQkKxiEYnkYhKJ+mIUnPtiFoi9YhqQymIbnPxiHebBYh6dQGIfjIFiIZ1BYiaQ7WIqnUJiLp1DYi+LWWIwnURiMp1FYjOdRmI0kdViOIzLYjuW32I\/lltiQI+KYkGdR2JHkO5iSOe7YkmU4GJLjuhiTY3LYk6dSGJTkcViVZWlYliR72JbnUtiXp1JYmCdTGJjnUpiaJ1NYm6Vr2JxiLVidpV9YnmU4WJ8nU5ifp1RYn+Ps2KAi1pigp1PYoOdVmKEj7RiiZ1QYoqUY2KRl31ikp1SYpOdU2KUnVdilZOKYpadVGKXjVJimJDcYpudZWKclLJinpHwYquU4mKsnatisZX4YrWS72K5lpViu51aYryJn2K9kopiwp1jYsWSU2LGnV1ix51kYsidX2LJnWZiyp1iYsydYWLNlI9iz51bYtCJ+2LRnVli0ouRYtOR8WLUnVVi151YYtiNU2LZkNli24+1YtydYGLdlHFi4IuSYuGKZ2Lsiodi7ZBAYu6daGLvnW1i8Z1pYvOMnWL1nW5i9o5BYveNiWL+j0Vi\/51cYwGOnWMCnWtjB453YwidbGMJiMJjDJ1nYxGSp2MZi5NjH4uyYyedamMoiKVjK43BYy+QVWM6kvBjPZTSYz6dcGM\/kX1jSZGoY0yOSmNNnXFjT51zY1Cdb2NVld9jV5K7Y1yRe2NnlfljaI7MY2mdgGNrnX5jbpCYY3KMnmN2nXhjd4+3Y3qT5mN7lFBjgJ12Y4ORfGOIjvZjiZ17Y4yPtmOOnXVjj516Y5KUcmOWnXRjmIxAY5uKfGOfnXxjoJepY6GNzGOiklRjo515Y6WQ2mOnjVRjqJCEY6mJhmOqkVtjq513Y6yLZGOyjGZjtJLNY7WdfWO7kX5jvp2BY8Cdg2PDkbVjxJ2JY8adhGPJnYZjz5VgY9CS8WPSnYdj1pdLY9qXZ2Pbirdj4YisY+OdhWPpnYJj7or2Y\/SJh2P2nYhj+pdoZAadjGQNkblkD52TZBOdjWQWnYpkF52RZBydcmQmnY5kKJ2SZCyUwGQtk4tkNJ2LZDadj2Q6jGdkPo3vZEKQ22ROnZdkWJNFZGedlGRploBkb52VZHadlmR4lsxkepCgZIOMgmSInZ1kko5UZJOdmmSVnZlkmpRRZJ6Ts2Skk1BkpZ2bZKmdnGSrlY9krZRkZK6OQmSwkO9kspZvZLmKaGS7naNkvJ2eZMGXaWTCnaVkxZ2hZMedomTNkYBk0p2gZNSdXmTYnaRk2p2fZOCdqWThnapk4pNGZOOdrGTmjkNk552nZOyLW2Tvna1k8Z2mZPKdsWT0nbBk9p2vZPqdsmT9nbRk\/o\/vZQCds2UFnbdlGJ21ZRydtmUdnZBlI525ZSSduGUqnZhlK526ZSydrmUvjnhlNJ27ZTWdvGU2nb5lN529ZTidv2U5ifxlO41VZT6V+mU\/kK1lRYzMZUidwWVNncRlT5VxZVGLfmVVncNlVp3CZVeUc2VYncVlWYuzZV2dx2VencZlYoq4ZWOOVWVmk9ZlbIxoZXCQlGVynchldJCuZXWTR2V3lX5leJ3JZYKdymWDnctlh5W2ZYibfGWJkMRljJVrZY6N1mWQlONlkZTBZZeTbGWZl79lm53NZZyOzmWfnc5loYi0ZaSL0mWlkMtlp5WAZaudz2WsjmFlrZJmZa+OemWwkFZlt53QZbmV+2W8iZdlvY57ZcGd02XDndFlxJ3UZcWXt2XGndJly5D5Zcyd1WXPkbBl0p3WZdeK+GXZndhl253XZeCd2WXhndpl4or5ZeWT+mXmklVl54uMZeiOfGXpkYFl7I97Ze2IrmXxndtl+omgZfud32YCjVZmA53eZgaNqWYHj7hmCp3dZgyPuWYOlr5mD42oZhOI1WYUkMxmHJ3kZh+Qr2YgiWZmJY90ZieWhmYojfBmLY+6Zi+QpWY0neNmNZ3hZjad4mY8kotmP55FZkGd6GZCjp5mQ41XZkSd5mZJnedmS5BXZk+d5WZSjk5mXZ3qZl6d6WZfne5mYp3vZmSd62ZmikFmZ53sZmid7WZplNNmbpWBZm+MaWZwnfBmdJCwZnaPu2Z6knFmgYvFZoOd8WaEnfVmh4nJZoid8maJnfRmjp3zZpGPi2aWkmdml4jDZpid9madnfdmopKoZqaX72arjmJmrpXpZrSWXGa4nkFmuZ35Zryd\/Ga+nftmwZ34ZsSeQGbHk9xmyZ36ZtaeQmbZj4xm2p5DZtyXambdlJhm4J5EZuaeRmbpnkdm8J5IZvKLyGbziWdm9I1YZvWeSWb3nkpm+I+RZvmRgmb8mdZm\/ZFdZv6RXGb\/kdZnAI3FZwOY8GcIjI5nCZdMZwuV\/GcNlZ5nD55LZxSN8WcVkr1nFp5MZxeYTmcbll1nHZKpZx6eTWcfivpnJp5OZyeeT2colthnKpaiZyuWlmcslntnLY5EZy6eUWcxjulnNJZwZzaeU2c3nlZnOJ5VZzqK92c9i4BnP55SZ0GeVGdGnldnSZCZZ06Xm2dPiMdnUI3eZ1GRumdTjttnVo\/xZ1meWmdck21nXp5YZ1+RqWdgnllnYY\/wZ2KW22djnltnZJ5cZ2WXiGdqnmFnbY1ZZ2+UdGdwnl5ncZOMZ3Kd3GdzneBndYtuZ3eUZmd8nmBnfo+8Z3+UwmeFnmZnh5T4Z4meXWeLnmNnjJ5iZ5CQzWeVlo1nl5fRZ5qWh2ecicpnnY59Z6CYZ2ehnmVnopCVZ6aeZGepnl9nr4zNZ7Oea2e0nmlntonLZ7eeZ2e4nm1nuZ5zZ8GRxmfElb9nxp51Z8qVQWfOnnRnz5SQZ9CWXmfRirln05D1Z9SPX2fYktFn2pdNZ92ecGfenm9n4p5xZ+SebmfnnnZn6Z5sZ+yeamfunnJn755oZ\/GSjGfzlvZn9I7EZ\/WN8mf7jbhn\/paPZ\/+KYGgCksxoA5PIaASJaGgTkPBoFpCyaBeMSWgennhoIY1aaCKKnGgpnnpoKoqUaCuegWgynn1oNJDxaDiKamg5japoPIppaD2NzWhAnntoQYyFaEKMamhDk41oRp55aEiIxGhNnnxoTp5+aFCLy2hRjEtoU4q6aFSLamhZnoJoXI33aF2WkWhfjlZoY56DaGeVT2h0no9odomxaHeehGh+npVof56FaIGXwGiDnoxohZR+aI2elGiPnodok4iyaJSeiWiXjVtom56LaJ2eimifnoZooJ6RaKKPvWimmutop4zmaKiXnGitnohor5LyaLCKQmixjatos56AaLWekGi2ioFouZ6OaLqekmi8k45oxIr8aMaesGjJlsdoyp6XaMuK+2jNnp5o0pZfaNSen2jVnqFo156laNiemWjakklo35OPaOCeqWjhnpxo456maOeeoGjukFho756qaPKQsWj5nqho+oq7aQCYb2kBnpZpBJ6kaQWI1mkInphpC5a4aQyenWkNkEFpDpLFaQ+ek2kSnqNpGZCaaRqerWkbipFpHIyfaSGer2kinpppI56uaSWep2kmnptpKJ6raSqerGkwnr1pNJPMaTaeomk5nrlpPZ67aT+S1mlKl2tpU5WWaVSetmlVkchpWZ68aVqRXmlcnrNpXZ7AaV6ev2lgk+1pYZ6+aWKT6GlqnsJpa561aW2Lxmlunrhpb498aXOUgGl0nrppdYvJaXeesml4nrRpeZ6xaXyYT2l9inlpfp63aYGewWmCilRpio3laY6JfGmRntJplJhQaZWe1WmbkFlpnJ7UaaCe02mnntBprp7EabGe4WmynsNptJ7Wabuezmm+nslpv57GacGex2nDns9px+qgacqezGnLjVxpzJLGac2RhGnOnspp0J7FadOeyGnYl2xp2ZaKad2ezWnentdp557faeie2GnrnuVp7Z7jafKe3mn5nt1p+5LOaf2RhWn\/nttqAp7ZagWe4GoKnuZqC5Tzagye7GoSnudqE57qahSe5GoXkpRqGZVXahue2moenuJqH4++aiGWzWoinvZqI57paimMoGoqiaFqK4p+ai6e0Wo1j79qNp7uajie9Wo5jvdqOoqSaj2STWpEnutqR57wakie9GpLi7RqWItralme8mpfi0BqYZPJamKe8WpmnvNqcp7tanie72p\/ioBqgJJoaoSe+mqNnvhqjoznapCe92qXn0BqnJ53aqCe+Wqinvtqo578aqqfS2qsn0dqrp6NarOfRmq4n0Vqu59CasGe6GrCn0Rqw59DatGfSWrTmEVq2p9MatuL+Wren0hq359KauiUpWrqn01q+p9RavufTmsEl5NrBZ9Pawqe3GsSn1JrFp9Tax2JVGsfn1VrIIyHayGOn2sji9NrJ4miazKXfms3n1drOJ9WazmfWWs6i1xrPYvUaz6KvGtDn1xrR59ba0mfXWtMicxrTpJWa1CfXmtTir1rVJ9ga1mfX2tbn2FrX59ia2GfY2tijn5rY5Cza2SNn2tmlZBraZXga2qYY2tvjpVrc43Oa3SX8Gt4n2RreZ9la3uOgGt\/n2ZrgJ9na4OfaWuEn2hrhpZ3a4mPfWuKjupri45ja42famuVn2xrlpBCa5ifa2uen21rpJ9ua6qfb2urn3Brr59xa7Gfc2uyn3Jrs590a7SJo2u1kmlrt591a7qORWu7imtrvJ92a7+TYWvAmsprxYtCa8afd2vLn3hrzZXqa86WiGvSk8Vr0595a9SU5GvYlPlr25bRa9+femvrn3xr7J97a++ffmvzn31sCJ+BbA+OgWwRlq9sE5+CbBSfg2wXi0NsG5+EbCOfhmwkn4VsNJCFbDeVWGw4iWlsPpTDbECS82xBj2BsQouBbE6UxGxQjqxsVZ+IbFeKvmxaiZhsXZPwbF6fh2xfjV1sYJJybGKfiWxon5Fsap+KbHCRv2xyi4Jsc5+SbHqMiGx9i0Rsfp+QbIGfjmyCn4tsg5eAbIiSvmyMk9dsjZ+MbJCflGySn5Nsk4xCbJaJq2yZjblsmp+NbJufj2yhlnZsopHybKuWl2yun5xssZ+dbLOJzWy4laZsuZb7bLqfn2y7jqFsvI\/AbL2fmGy+n55sv4mIbMGLtWzEn5VsxZ+abMmQ8mzKlJFszJTlbNOfl2zVlkBs15+ZbNmfomzbn6Bs3Z+bbOGWQWzilGds44uDbOWTRGzoko1s6p+jbO+foWzwkdds8Z+WbPOJam0Ll21tDJ+ubRKfrW0XkPRtGZ+qbRuXjG0ek7RtH5+kbSWSw20piWttKo1ebSufp20yj0ZtM5+sbTWfq202n6ZtOJ+pbTuKiG09n6htPpRobUGXrG1Ej\/JtRZDzbVmftG1an7JtXJVsbWOfr21kn7FtZolZbWmNX21qmFFtbIpcbW6Vgm10l4Ftd4pDbXiQWm15n7NthZ+4bYiPwW2Ml09tjp+1bZOfsG2Vn7ZtmZfcbZuTk22ck8Btr4pVbbKJdG21n7xtuJ+\/bbyXwW3Al4RtxZ\/GbcafwG3Hn71ty5fSbcyfw23Rj2lt0p\/FbdWfym3Yk5Ft2Z\/Ibd6fwm3hkldt5J\/Jbeafvm3on8Rt6p\/LbeuI+m3sn8Ft7p\/MbfGQW23zj35t9ZWjbfeNrG35n7lt+p\/HbfuTWW4FkLRuB4qJbgiNz24Jj8JuCp+7bguPYW4TjGtuFZ+6bhmf0G4aj41uG4y4bh2f324fn9luIIuUbiGTbm4jn9RuJJ\/dbiWIrW4miVFuKYm3biuf1m4skapuLZ\/Nbi6fz24vjWBuOJ\/gbjqf224+n9NuQ5\/abkqWqW5Nn9huTp\/cblaMzm5Yj8NuW5JYbl+f0m5nl05ua5\/Vbm6fzm5vk5Jucp\/Rbnaf125+mHBuf468boCWnm6Cn+FujJSsbo+f7W6QjLlulo+Abpif426cl61unY1hbp+f8G6iiOxupZ\/ubqqf4m6vn+husp\/qbraXbm63n+VuupNNbr2f527Cn+9uxJ\/pbsWWxW7Jn+Ruy46gbsyf\/G7Riopu05\/mbtSf627Vn+xu3ZHqbt6R2G7sn\/Ru75\/6bvKf+G70k0hu9+BCbvif9W7+n\/Zu\/5\/ebwGLmW8ClVlvBo69bwmNl28PmFJvEZ\/ybxPgQW8UiYlvFZGGbyCUmW8iir9vI5f4byuWn28sktBvMZ\/5bzKf+284kVFvPuBAbz+f929Bn\/FvRYrBb1SMiW9Y4E5vW+BJb1yQ9m9fioNvZI+Bb2bgUm9t4EtvbpKqb2\/gSG9wktdvdOBrb3jgRW964ERvfOBNb4DgR2+B4EZvguBMb4SQn2+G4ENvjuBPb5HgUG+XisBvoeBVb6PgVG+k4FZvquBZb7GTYm+z4FNvueBXb8CMg2\/BkfdvwuBRb8OUWm\/G4Fhv1OBdb9XgW2\/Y4F5v2+Bhb9\/gWm\/gjYpv4ZRHb+Sft2\/rl5Rv7OBcb+7gYG\/vkfNv8eBfb\/PgSm\/26Ilv+uBkb\/7gaHAB4GZwCeBicAvgY3AP4GdwEeBlcBWVbXAY4G1wGuBqcBvgaXAd4GxwHpPScB\/gbnAmkpVwJ5HrcCyQo3Aw4G9wMuBxcD7gcHBMn\/NwUeBycFiT5XBj4HNwa4nOcG+TlHBwikRweIuEcHyO3HB9jdBwiZhGcIqQhnCOiYpwkuB1cJngdHCs4HhwrZJZcK7ge3Cv4HZws+B6cLjgeXC5k19wuojXcMiX83DL4H1wz4lHcNnggHDd4H5w3+B8cPHgd3D5lkJw\/eCCcQnggXEUiYtxGeCEcRqVsHEc4INxIZazcSaPxXE2kVJxPI\/EcUmX+XFM4IpxTpD3cVXghnFW4ItxWYmMcWLgiXFklIFxZeCFcWbgiHFnj8ZxaZTPcWzgjHFujs9xfZD4cYTgj3GI4IdxioxGcY\/gjXGUl29xleCQcZnqpHGfj25xqOCRcazgknGxlE1xueCUcb7glXHDlFJxyJOVccngl3HO4Jlx0JfTcdLglnHU4Jhx1YmNcdfgk3Hfmnpx4OCaceWRh3Hmjldx5+Cccezgm3HtkENx7pnXcfXgnXH54J9x++COcfzgnnH\/4KByBpSacg3goXIQ4KJyG+CjcijgpHIqktxyLOCmci3gpXIw4KdyMuCocjWO3XI2lYNyOpbqcjvgqXI84KpyPZF1cj6OonI\/4KtyQOCsckbgrXJHldBySJTFckvgrnJMlHZyUpKrcljgr3JZieVyW4uNcl2WxHJflrRyYYmycmKYU3JnlnFyaZWocnKQtXJ04LByeZPBcn2MoXJ+4LFygI3ScoHgs3KC4LJyh+C0cpLgtXKW4LZyoItdcqLgt3Kn4LhyrIyicq+UxnKy4Lpyto\/zcrnguXLCi7Zyw+C7csTgvXLG4LxyzuC+ctCMz3LS4L9y14vnctmRX3LbjZ1y4ODBcuHgwnLi4MBy6Y7rcuyTxnLti7dy9+DEcviSS3L54MNy\/JhUcv2UgnMK4MdzFuDJcxfgxnMbltJzHODIcx3gynMfl8JzJeDOcyngzXMqkpZzK5RMcy6Mo3Mv4MxzNODLczaXUHM3l1FzPuDPcz+JjnNEjZZzRY6Cc07g0HNP4NFzV+DTc2OPYnNo4NVzauDUc3Dg1nNyimxzdeDYc3jg13N64Npze+DZc4SMunOHl6ZziYvKc4uJpHOWi+hzqYrfc7KX5nOz4Nxzu+Dec8Dg33PCic9zyODbc8qOWHPNkr9zzuDdc97g4nPgjuxz5eDgc+qMXXPtlMdz7uDhc\/Hg\/HP44Odz\/oy7dAOLhXQF4OR0BpeddAmXrnQikfR0JeDmdDLg6HQzl9R0NIvVdDWU+nQ2lGl0OuDpdD\/g63RB4O50VeDqdFng7XRajOh0W4lsdFzg73RekJB0X+DsdGCX2nRj4PJ0ZOqidGng8HRq4PN0b+DldHDg8XRzjbp0duD0dH7g9XSDl550i+D2dJ7g93Si4ON0p+D4dLCKwnS9jqN0yuD5dM\/g+nTU4Pt03IladODhQHTilVp04+FBdOaKonTn4UJ06eFDdO7hRHTw4UZ08eFHdPLhRXT2lXJ09+FJdPjhSHUD4Ut1BOFKdQXhTHUM4U11DeFPdQ7hTnURjZl1E+FRdRXhUHUYisN1GpBydRyTW3Ue4VJ1H5C2dSOOWXUliZl1JuFTdSiXcHUrleF1LOFUdTCTY3Uxl1J1Mo1idTOQXHU3kmp1OJmydTqSrHU7ieZ1POFVdUThVnVG4Vt1SeFZdUrhWHVLncB1TIpFdU3hV3VPiNh1UZSodVSUyHVZl691WuFcdVvhWnVcknt1XZCkdWCUqXVilUx1ZOFedWWXqnVmjGx1Z+FfdWnhXXVqlNR1a+FgdW3hYXVwiNl1c4\/0dXThZnV24WN1d5PrdXjhYnV\/i0V1guFpdYbhZHWH4WV1ieFodYrhZ3WLlUR1jpFhdY+RYHWRi151lOFqdZrha3Wd4Wx1o+FudaXhbXWriXV1seF2dbKU5nWz4XB1teFydbjhdHW5kF11vOF1db3hc3W+jr51wuFvdcPhcXXFlWF1x4\/HdcrheHXN4Xd10uF5ddSOpHXVja112JOXddnhenXbksl13uF8deKXn3Xj4Xt16ZGJdfDhgnXy4YR18+GFdfSSc3X64YN1\/OGAdf7hfXX\/4X52AeGBdgnhiHYL4YZ2DeGHdh\/hiXYg4Yt2IeGMdiLhjXYk4Y52J+GKdjDhkHY04Y92O+GRdkKXw3ZG4ZR2R+GSdkjhk3ZMiuB2Upb8dlaVyHZY4ZZ2XOGVdmHhl3Zi4Zh2Z+GcdmjhmXZp4Zp2auGbdmzhnXZw4Z52cuGfdnbhoHZ44aF2epStdnuTb3Z84aJ2fZSSdn6VU3aA4aN2g+GkdoSTSXaGikZ2h41jdojhpXaL4aZ2juGndpCOSHaT4al2luGodpnhqnaa4at2rpTndrDhrHa04a12t+qJdrjhrna54a92uuGwdr+OTXbC4bF2w5R1dsaWfnbIiW12yol2ds3hsnbS4bR21uGzdteTkHbbkLd23J9Ydt7htXbflr924eG2duOKxHbklNV25eG3dufhuHbq4bl27pbadvKW03b0krx2+JGKdvvhu3b+j4J3AY\/IdwThvncH4b13COG8dwmU+3cLisV3DIyndxvhxHce4cF3H5BedyCWsHck4cB3JeHCdybhw3cp4b93N+HFdzjhxnc6kq13PIrhd0CShXdH4cd3WuHId1vhy3dhkId3Y5PCd2XhzHdmlnJ3aOHJd2vhynd54c93fuHOd3\/hzXeL4dF3juHQd5Hh0nee4dR3oOHTd6WVy3esj3V3rZfEd7Dh1Xezk7V3tuHWd7nh13e74dt3vOHZd73h2ne\/4dh3x+Hcd83h3XfX4d532uHfd9uWtXfc4eB34pbud+Ph4Xflkm1355SKd+mL6Xftklp37uHid++LuHfzkM53\/OHjeAKNu3gM4eR4EuHleBSMpHgVjdN4IOHneCWTdXgmjdR4J4tteDKWQ3g0lGp4OpN2eD+Ne3hF4el4XY\/JeGuXsHhsjWR4b4yleHKUoXh04et4fOHteIGM6XiG4ex4h5L0eIzh73iNilZ4juHqeJGU6HiTiU94lY3qeJeYcXia4e54o+HweKeVyXipkNd4quHyeK\/h83i14fF4uopteLzh+Xi+4fh4wY6leMXh+njG4fV4yuH7eMvh9njQlNZ40eH0eNTh93ja4kF45+JAeOiWgXjs4fx474jpePTiQ3j94kJ5AY\/KeQfiRHkOkWJ5EeJGeRLiRXkZ4kd5JuHmeSrh6Hkr4kl5LOJIeTqOpnk8l+d5Po7QeUDiSnlBjFZ5R4tfeUiLRnlJjoN5UJdTeVPiUHlV4k95VpFjeVfiTHla4k55XY9qeV6QX3lf4k15YOJLeWKUSXllj8t5aJVbeW2N1Xl3k5h5euJReX\/iUnmA4mh5gYvWeYSYXHmFkVR5iuJTeY2J0HmOkvV5j5WfeZ3iVHmmi5p5p+JVeariV3mu4lh5sJRIebPiWXm54lp5uuJbeb2L13m+idF5v5PDecCPR3nBjoR5yeJcecuPSHnRich50pViedXiXXnYlOl535FkeeHiYHnj4mF55JSJeeaQYHnn4l556ZKBeeziX3nwj8x5+4jaegCLSHoI4mJ6C5L2eg3iY3oOkMV6FJareheVQnoY4mR6GeJlehqSdHocl8V6H+JneiDiZnouju16MeJpejKI7no34mx6O+JqejyJ0no9jG16PuJrej+NZXpAjZJ6QpXkekPibXpGlnN6SeJvek2Qz3pOiW56T4m4elCIqnpX4m56YeJwemLicXpjj\/V6aeJyemuKbnpw4nR6dIyKenaLhnp54nV6eovzen3idnp\/kPp6gZPLeoOQ3nqEjfN6iOJ3epKSgnqTkYt6leJ5epbie3qX4nh6mOJ6ep+MQXqp4nx6qoxFeq6Lh3qvl3F6sOJ+erbigHq6iU16v+KDesOKlnrE4oJ6xeKBesfihXrI4n16yuKGesuXp3rN4od6z+KIetKa8nrT4op61eKJetnii3ra4ox63Jezet3ijXrf6O164I\/NeuHijnri4o964492euWTtnrm4pB66pJHeu3ikXrvklt68OKSevaLo3r4mV56+ZJ8evqOsXr\/isZ7AuKTewTioHsG4pZ7CIuIewrilXsL4qJ7D+KUexGPznsY4ph7GeKZexuTSnse4pp7IIp9eyWQeXsmlYR7KOKceyyR5nsz4pd7NeKbezbinXs5jfl7ReKke0aVTXtIlKR7SZOZe0uL2HtM4qN7TeKhe0+Us3tQ4p57UZJ9e1KTm3tUk5p7Vo30e13itntl4qZ7Z+Koe2ziq3tu4qx7cOKpe3Hiqnt04qd7deKle3rin3uGlc17h4nTe4vis3uN4rB7j+K1e5LitHuUlJN7lZale5eOWnuY4q57meK3e5risnuc4rF7neKte5\/ir3uhisd7qpJce62Q+3uxlKB7tOK8e7iUonvAkN97weK5e8SUzXvG4r17x5XRe8mSenvL4rh7zOK6e8\/iu3vd4r574I7Ce+STxHvl4sN75uLCe+niv3vtmFV78+LIe\/bizHv34sl8AOLFfAfixnwN4st8EeLAfBKZ03wT4sd8FOLBfBfiynwf4tB8IYrIfCPizXwn4s58KuLPfCvi0nw34tF8OJT0fD3i03w+l\/p8P5XrfEDi2HxD4tV8TOLUfE2Q0HxP4td8UOLZfFTi1nxW4t18WOLafF\/i23xg4sR8ZOLcfGXi3nxs4t98c5XEfHXi4Hx+luB8gYvMfIKMSHyD4uF8iZWyfIuQiHyNlq58kOLifJKXsXyVlJR8l5FlfJiUU3ybj2x8n4i+fKHi53yi4uV8pOLjfKWKn3ynj898qOLofKvi5nyt4uR8ruLsfLHi63yy4up8s+LpfLni7Xy94u58vpC4fMDi73zC4vF8xeLwfMqM0HzOkVd80uLzfNaTnHzY4vJ83OL0fN6Vs3zfkYx84I1mfOLi9Xznl8Z87+L3fPLi+Hz04vl89uL6fPiOhXz64vt8+4xufP6Lin0Ai0l9AuNAfQSW8X0FjWd9BuL8fQrjQ30LluR9DZRbfRCVUn0Uj4N9FeNCfReO0X0YjWh9GY6GfRqLiX0blbR9HONBfSCRZn0hlmF9Io31fSuOh30sktt9LuNGfS+X3X0wjdd9MuNHfTOQYX0140l9OY\/QfTqNrn0\/40h9Qo9JfUOMvH1EkWd9ReNEfUbjSn1L40V9TIxvfU7jTX1P41F9UIyLfVbjTH1b41V9Xo1pfWGXjX1iiLp9Y+NSfWaLi31o4099buNQfXGTnX1y4059c+NLfXWKR312kOJ9eYymfX3jV32J41R9j+NWfZPjU32ZjHB9mpGxfZvjWH2ckY59n+NlfaLjYX2j41t9q+NffayO+H2tiNt9ruNafa\/jYn2w42Z9sY1qfbKW1H20ktR9teNcfbjjZH2641l9u5Jdfb3jXn2+iLt9v5bIfcfjXX3Ki9l9y5Tqfc+RjX3Rl8590o+PfdXjjn3Y42d92pD8fdzjY33d42h93uNqfeCS933h42195ONpfeiV0n3pisl97JbJfe+I3H3y42x99Jf7ffvja34BiY9+BJPqfgXjbn4J43V+CuNvfgvjdn4S43J+G5Sbfh6OyH4f43R+IeNxfiLjd34j43B+Jo9jfiuWRH4uj2t+MeNzfjLjgH4143t+N+N+fjnjfH4644F+O+N6fj3jYH4+kNF+QZTJfkPjfX5G43h+SpFAfkuMcX5Nj0p+VJBEflWRVX5W44R+WeOGflrjh35d44N+XuOFfmbjeX5n44J+aeOKfmrjiX5tlpp+cIxKfnnjiH5744x+fOOLfn3jj35\/45F+go5bfoPjjX6I45J+ieOTfozjlH6O45p+j5NafpDjln6S45V+k+OXfpTjmH6W45l+m+ObfpzjnH82isp\/OOOdfzrjnn9F459\/TOOgf03joX9O46J\/UOOjf1HjpH9U46Z\/VeOlf1jjp39f46h\/YOOpf2fjrH9o46p\/aeOrf2qN339rjHJ\/bpJ1f3CUsX9yj5B\/dZRsf3eU6394461\/eZzrf4Ljrn+D47B\/hZeFf4bjr3+H47J\/iOOxf4qXcn+M47N\/jpT8f5TjtH+a47d\/neO2f57jtX+j47h\/pIxRf6iRQX+pi2B\/ruO8f6\/juX+y47p\/tuO9f7jjvn+547t\/vYlIf8GJpX\/F48B\/xuPBf8rjwn\/Ml4J\/0o9Lf9TjxH\/V48N\/4JCJf+HjxX\/m48Z\/6ePHf+uK43\/wist\/8+PIf\/njyX\/7lnx\/\/JeDgACXc4ABmFaAA41sgATjzIAFjtKABuPLgAvjzYAMjqeAEJHPgBLjzoAVjWuAF5bVgBjjz4AZ49CAHOPRgCHj0oAo49OAM46ogDaW64A749WAPZJegD\/j1IBG49eASuPWgFLj2IBWkLmAWOPZgFrj2oBelbeAX+PbgGGRj4Bi49yAaOPdgG+X\/IBw4+CAcuPfgHPj3oB0kq6AduPhgHeQRYB54+KAfePjgH6YV4B\/4+SAhOPlgIXj54CG4+aAh5SjgImT94CLmF2AjJSngJPj6YCWj9GAmJVJgJrj6oCb4+iAnYrMgKGM0oCijoiApZTsgKmMqICqlmKArOPtgK3j64CvjW2AsY1ugLKI54C0jeaAupR4gMOI3YDE4\/KAxpJfgMyUd4DOkdmA1uP0gNnj8IDa4\/OA2+PugN3j8YDelkWA4YzTgOSI+4Dl4++A7+P2gPHj94D0k7eA+Iu5gPzkRYD9lFyBAo6JgQWLuoEGkMaBB5hlgQiWrIEJ4\/WBCpDSgRqLcoEb4\/iBI+P6gSnj+YEv4\/uBMZJFgTOUXYE5kq+BPuRCgUbkQYFL4\/yBTpB0gVCVhYFR5ESBU+RDgVSNb4FVmHKBX+RUgWXkSIFm5EmBa47ugW7kR4FwjZiBceRGgXTkSoF4krCBeZWggXqRQoF\/kdqBgOROgYLkT4GD5EuBiORMgYrkTYGPjXCBk+RVgZXkUYGalYaBnJaMgZ2VR4Gg5FCBo+RTgaTkUoGolmOBqeRWgbDkV4GzkVaBteRYgbjkWoG65F6BveRbgb7kWYG\/lF6BwORcgcLkXYHGibCByORkgcnkX4HN5GCB0eRhgdORn4HY5GOB2eRigdrkZYHf5GaB4ORngeOQYoHlieeB5+RogeiX1YHqjqmB7Y9MgfOOioH0knaB+uRpgfvkaoH8iVCB\/uRrggHkbIIC5G2CBeRuggfkb4IIi7uCCZ2oggrkcIIMkOOCDeRxgg6OyYIQ5HKCEpiughbkc4IXldyCGIraghuRQ4Icj3eCHpWRgh+PTYIp5HSCKo1xgivkdYIslMqCLuSEgjPkd4I1kceCNpSVgjeMvYI45HaCOZFEgkDkeIJHkviCWOR6glnkeYJa5HyCXeR7gl\/kfYJi5ICCZOR+gmaKzYJo5IGCauSCgmvkg4Juja+Cb5fHgnHkhYJykEaCdomQgnfkhoJ45IeCfuSIgouI8IKN5ImCkuSKgpmVh4KdjsWCn+SMgqWKSIKmiLCCq+SLgqzkjoKtlG2Cr5BjgrGJ1IKzlkaCuIx8grmL2oK75I2CvYnogsWKoYLRiZGC0uSSgtOX6ILUkduC15VjgtnknoLbidWC3OScgt7kmoLf5JGC4eSPguPkkILljuGC5ovqgueSl4Lrk8+C8YlwgvPklIL05JOC+eSZgvrklYL75JiDApbOgwPkl4MEidaDBYqdgwbkm4MJ5J2DDoxzgxbkoYMX5KqDGOSrgxyIqYMj5LKDKIjvgyvkqYMv5KiDMeSjgzLkooM05KCDNeSfgzaSg4M4kfmDOeSlg0DkpINF5KeDSZGQg0qMdINPiWCDUOSmg1KNcoNYkZGDc+S4g3XkuYN3ideDe4msg3zktoOF5KyDh+S0g4nku4OK5LWDjuSzg5PkloOW5LGDmuStg56KzoOf5K+DoOS6g6LksIOo5LyDquSug6uUnIOxl4mDteS3g73kzYPB5MWDxZCbg8qLZYPMi9uDzuTAg9OJ2YPWj9KD2OTDg9yN2IPfk3CD4OTIg+mV7IPr5L+D74nYg\/CM1IPxlUiD8uTJg\/TkvYP35MaD++TQg\/3kwYQD5MKEBJO4hAfkx4QL5MSEDJZHhA3kyoQOiN6EE+S+hCDkzIQi5MuEKZSLhCrk0oQs5N2EMYqehDXk4IQ45M6EPOTThD2XjoRG5NyESZd0hE6XqIRXkpiEW4qLhGGVkoRi5OKEY5OfhGaIr4Rp5NuEa+TXhGyRkoRt5NGEbuTZhG\/k3oRxlEuEdYiohHfk1oR55N+EepWYhILk2oSE5NWEi4\/ThJCPToSUjqqEmZbWhJyVZoSf5OWEoeTuhK3k2ISyipeEuI\/2hLnk44S75OiEvJGThL\/k5ITB5OuExJJ+hMbk7ITJl3WEyuThhMuKV4TN5OeE0OTqhNGWqoTW5O2E2eTmhNrk6YTslkiE7phAhPTk8YT85PiE\/+TwhQCOwYUG5M+FEZXMhROWoIUU5PeFFeT2hRfk8oUY5POFGolVhR\/k9YUh5O+FJpLThSzk9IUtiPyFNZGghT2VwYVA5PmFQeVAhUOU14VI5PyFSY\/UhUqOx4VL5UKFTou8hVXlQ4VXlZmFWOT7hVrk1IVj5PqFaJhuhWmToIVqlZOFbeVKhXflUIV+5VGFgOVEhYSUloWH5U6FiOVGhYrlSIWQ5VKFkeVHhZTlS4WXiZKFmZPjhZvlTIWc5U+FpOVFhaaRRYWo5UmFqY5GhaqQZIWrjE+FrJbyha6W94Wvj5KFueVWhbrlVIXBmG2FyeVThc2XlYXP5VWF0OVXhdXlWIXc5VuF3eVZheSToYXl5VqF6ZTLherlTYX3j5OF+eVchfrlYYX7kZSF\/uVghgLlQYYG5WKGB5FohgrlXYYL5V+GE+VehhafUIYXn0GGGuVkhiLlY4Ytl5aGL+G6hjDlZYY\/5WaGTeVnhk6M1YZQi3OGVOVphlWZfIZai5WGXJe4hl6L8YZf5WqGZ+VrhmuSjoZx5WyGeZP4hnuIuIaKieGGi+VxhozlcoaT5W2GlY5chqPlboaklGGGqeVvhqrlcIar5XqGr+V0hrDld4a25XOGxOV1hsbldobHjtaGyeV4hsuSYIbNjHWGzophhtTle4bZil6G2+WBht7lfIbf5YCG5JS4hunlfYbs5X6G7ZVnhu6U2Ibv5YKG+JH7hvnljIb75YiG\/onphwDlhocClkmHA+WHhwblhIcI5YWHCeWKhwrljYcN5YuHEeWJhxLlg4cYkneHGuWUhxyWqIcl5ZKHKeWThzTljoc35ZCHO+WRhz\/lj4dJkOSHS5hYh0zlmIdO5ZmHU+Wfh1WQSYdX5ZuHWeWeh1\/llodg5ZWHY+Wgh2aJ2odo5ZyHauWhh27lnYd05ZqHdpKxh3jll4d\/lIiHguWlh42XWoef5aSHouWjh6vlrIev5aaHs+Wuh7qXhoe75bGHveWoh8DlqYfE5a2HxuWwh8flr4fL5aeH0OWqh9Llu4fg5bSH7+Wyh\/Lls4f25biH9+W5h\/mKSYf7i2GH\/uW3iAXloogN5baIDuW6iA\/ltYgR5byIFeW+iBblvYgh5cCIIuW\/iCPleYgn5cSIMeXBiDblwog55cOIO+XFiECMjIhC5ceIROXGiEaPT4hMjXOITZ+liFLlyIhTj3CIV4pYiFnlyYhbiXGIXY\/ViF7lyohhjXSIYuXLiGOI34holVyIa+XMiHCQiohy5dOIdeXQiHeSj4h95dGIfuXOiH+L3IiB5c2IguXUiIiMVYiLkdyIjeXaiJLl1oiWkbOIl+XViJnl2Iie5c+IouXZiKTl24irlO2IruXXiLDl3Iix5d6ItIzRiLXl0oi3iL+Iv+XdiMGN2YjCl\/SIw+XfiMTl4IjFkZWIz5egiNTl4YjVl1SI2OXiiNnl44jcleKI3eXkiN+Nvojhl6GI6OXpiPLl6ojzj9aI9OXoiPiXh4j55eWI\/OXniP2Qu4j+kJ6JAuXmiQTl64kHlaGJCuXtiQzl7IkQioyJEpZKiRPl7okd5fqJHuXwiSXl8Ykq5fKJK+XziTbl94k45fiJO+X2iUHl9IlD5e+JROX1iUzl+YlN6LWJVommiV7l\/Ilfi92JYOX7iWTmQYlm5kCJauZDiW3mQolv5kSJco9QiXTmRYl35kaJfuZHiX+QvImBl3aJg+ZIiYaVoomHlGWJiOZJiYrmSomLjKmJj4tLiZPmS4mWjouJl5RgiZjmTImaim+JoeZNiabmT4mnl5eJqeZOiaqQZYms5lCJr+ZRibLmUomzis+JuuZTib3mVIm\/5lWJwOZWidKKcIna5leJ3OZYid3mWYnjifCJ5pBHiefmWon05luJ+OZcigCMvooCkvmKA+ZdigiMdooKkHWKDOZgig6ToooQ5l+KE4xQihbmXooXkfWKGItMihvmYYod5mKKH4\/XiiOMjYol5mOKKpZLii2Q3Yoxi5aKM5bzijSRaYo25mSKOpBmijuSkIo8j9iKQeZlikbmaIpI5mmKUI28ilGRwIpS5meKVI\/ZilWVXYpb5maKXo6MimCJcopi5m2KY4x3imaOjoppjo2Ka5hsimzmbIpt5muKbpFGinCLbIpxmGKKcopZinOP2op85mqKguZvioTmcIqF5m6Kh4zWiomXX4qMjo+KjZRGipHmc4qTkL6KlZJhipiXVYqa5naKnozqiqCQvYqh5nKKo+Z3iqSM64ql5nSKpuZ1iqjmcYqskOCKrZPHirCSToqyiduKuZTuiryLYoq\/krKKwuZ6isTmeIrHkmuKy5C\/isyK0IrN5nmKz5B6itKXyIrWmF+K2uZ7itvmh4rckrOK3uaGiuDmg4rh5ouK4uaEiuTmgIrmkvqK5+Z+iuvmfIrtl0CK7o6QivHmgYrz5n2K9+aFiviPlIr6jL+K\/pH4iwCWZIsBiXmLAojgiwSTo4sH5omLDOaIiw6T5IsQ5o2LFOaCixbmjIsX5o6LGYyqixrmiosbjXWLHY7TiyDmj4shl3eLJuaSiyjmlYsr5pOLLJVUizPmkIs5i96LPuaUi0HmlotJ5pqLTOaXi07mmYtP5piLVuabi1iOr4ta5p2LW+aci1yViItf5p+LZox4i2vmnots5qCLb+ahi3CLY4tx47+Lco\/3i3Tmoot3jOyLfeaji4DmpIuDjl2Lip3Mi4zmpYuO5qaLkI9Ri5Lmp4uT5qiLluapi5nmqoua5quMN5JKjDrmrIw\/5q6MQeatjEaTpIxI5q+MSpZMjEzmsIxO5rGMUOayjFXms4xak9iMYY\/bjGLmtIxqjYuMa5isjGzmtYx45raMeZVejHrmt4x85r+Mgua4jIXmuoyJ5rmMiua7jIyWZYyN5ryMjua9jJTmvoyY5sCMnYpMjJ6S5YyglYmMoY3gjKKNdoynlW6MqIndjKmUzIyq5sOMq4rRjKyQ04yt5sKMrubHjK+SmYywluGMsubFjLPmxoy0i02MtubIjLeUg4y4kd2Mu5TvjLyTXIy95sSMv5ZmjMCJ6ozB5sqMwphHjMOSwIzEmGSMx46RjMjmyYzKka+MzebajM6RR4zRk\/aM05VvjNrmzYzbjl6M3I6SjN6P3IzglIWM4oyrjOPmzIzk5suM5pWKjOqOv4ztk3GM+ubPjPvm0Iz8jXeM\/ebOjQTm0Y0F5tKNB+bUjQiRoY0K5tONC4rkjQ3m1o0P5tWNEObXjRPm2Y0U5tuNFubcjWSQ1I1mjs2NZ+bdjWuKcY1t5t6NcJGWjXHm341z5uCNdJWLjXeLTo2B5uGNhZK0jYqJeo2Z5uKNo47vjaiQlo2zkauNuubljb7m5I3C5uONy+brjczm6Y3P5uaN1ubojdrm543b5uqN3YuXjd\/m7o3hkNWN4+bvjeiM143q5uyN6+btje+YSI3zkrWN9ZFIjfzm8I3\/5vOOCObxjgnm8o4Kl3iOD5OljhDm9o4d5vSOHub1jh\/m944q50iOMOb6jjTm+4415vmOQub4jkSS+45H50COSOdEjknnQY5K5vyOTOdCjlDnQ45V50qOWedFjl+Q1o5g50eOY+dJjmTnRo5y50yOdI9SjnbnS458502OgedOjoTnUY6F51COh+dPjornU46L51KOjZb0jpHnVY6T51SOlOdWjpnnV46h51mOqudYjquQZ46s51qOr4vrjrDnW46x512OvudejsXnX47G51yOyOdgjsqO1I7L52GOzItPjs2MUo7SjKyO2+dijt+T7o7ik12O4+djjuvnZo74jrKO++dljvznZI79jHmO\/udnjwOKco8F52mPCY3ajwrnaI8M53GPEudrjxPnbY8UleOPFedqjxnnbI8b53CPHOdujx2LUI8f52+PJudyjymUeY8ql9aPL49TjzPnc484l0GPOed1jzvndI8+53iPP5dgj0Lnd49Eio2PRed2j0bne49J53qPTOd5j02TUY9O53yPV+d9j1znfo9fjYyPYYxEj2LngI9j54GPZOeCj5uQaI+c54OPno6rj5\/nhI+j54WPp5mfj6iZno+t54aPruOQj6\/nh4+wkkOPsZBKj7KUX4+354iPupXTj7uS0o+8jZ6Pv5JIj8KJSY\/ElpiPxZB2j86MfY\/Ri9+P1JXUj9rniY\/i54uP5eeKj+aJ3o\/pk\/SP6ueMj+uUl4\/tk1KP7+eNj\/CPcY\/054+P95bAj\/jnno\/555GP+ueSj\/2Sx5AAkd6QAZGXkAOTppAF55CQBot0kAvnmZAN55aQDuejkA+Tp5AQkoCQEeeTkBOS\/JAUk3KQFeeUkBbnmJAXkICQGZSHkBqSypAdkMCQHueXkB+RrJAgkaKQIeeVkCKIp5AjmEGQJ+eakC6R35Axj1SQMpBpkDXnnJA255uQOIjtkDnnnZA8lU6QPuelkEGT2ZBCkIuQRZJ4kEeL9pBJ56SQSpdWkEuJXpBNldWQTonfkE\/nn5BQ56CQUeehkFLnopBTk7mQVJJCkFWI4ZBW56aQWOenkFnqoZBckbuQXueokGCJk5BhkWuQY4ytkGWXeZBo56mQaZNLkG2RmJBujtWQb+eqkHLnrZB1j4WQduerkHeRSpB4kUmQeojikHyXyZB956+Qf5TwkIDnsZCB57CQgueukIPihJCEitKQh+eOkInns5CK57KQj+e0kJGXV5Cjk9+QppZNkKjntZCqjteQr+e2kLHnt5C157iQuJNAkMGI6JDKjXiQzphZkNvnvJDhjFOQ4ue5kOTnupDolZSQ7YpzkPWXWJD3i72Q\/ZNzkQLnvZES576RGee\/kS2TQZEw58GRMufAkUmT0ZFK58KRS49VkUyO3pFNlHqRTpKRkVKO8JFUkIyRVufDkVjnxJFikHyRY+fFkWXnxpFp58eRapePkWyPVpFy58mRc+fIkXWNeZF3jZOReI5fkYLnzJGHj4aRiefLkYvnypGNkeeRkIztkZKQwZGXlK6RnI9YkaLnzZGkj92RqufQkavnzpGv58+RtOfSkbXn0ZG4j\/iRuufTkcDn1JHB59WRxpTOkceN0ZHIjt+RyefWkcvn15HMl6KRzY9kkc6W7JHPl8qR0OfYkdGL4JHW59mR2JNCkdvn3JHcipiR3ZBqkd\/n2pHh59uR45LekeaWdJHni\/qR9efekfbn35H8592R\/+fhkg2T3ZIOimKSEeflkhTn4pIV5+SSHufgkinobpIs5+OSNJfpkjeM2JI\/5+2SRJNTkkXn6JJI5+uSSefpkkvn7pJQ5++SV+fnklrn9JJbiZSSXufmkmKUq5Jk5+qSZo\/eknGNepJ+lmeSgIvikoOPZZKFk7qSkZFMkpPn8pKV5+ySlufxkpiWwZKakraSm+fzkpzn8JKtkUuSt+f3krnn9pLP5\/WS0pZOkuSPm5Lp5\/iS6pXdku2Jc5LylWWS85KSkviLmJL65\/qS\/I18kwaOS5MP5\/mTEJCNkxiQjpMZ6ECTGuhCkyCP+ZMi6EGTI+hDkyaL0ZMolWSTK47gkyyYQpMu5\/yTL432kzKYXpM16EWTOuhEkzvoRpNE5\/uTS5Pnk02TdJNUktWTVuhLk1uSYpNc6EeTYOhIk2yMTJNu6EqTdYyuk3zoSZN+j9+TjIqZk5ToT5OWjb2Tl5GZk5qSyJOnilqTrOhNk63oTpOuksGTsOhMk7noUJPD6FaTyOhZk9DoWJPRk0yT1uhRk9foUpPY6FWT3ehXk+GLvpPk6FqT5ehUk+joU5QD6F6UB+hflBDoYJQT6F2UFOhclBiP4JQZk6iUGuhblCHoZJQr6GKUNehjlDboYZQ4kfaUOuhllEHoZpRE6GiUUYrTlFLoZ5RTlviUWuhzlFvoaZRe6GyUYOhqlGLoa5Rq6G2UcOhvlHXocJR36HGUfOh0lH3ocpR+6HWUf+h3lIHodpV3kreVgJbllYLoeJWDkU2Vh+h5lYmVwpWK6HqVi4pKlY+JW5WRitWVk4rUlZToe5WW6HyVmOh9lZnofpWg6ICVoorWlaOKdJWkjX2VpZS0lafogpWo6IGVreiDlbKJe5W56IaVu+iFlbzohJW+6IeVw+iKlceIxZXK6IiVzOiMlc3oi5XU6I6V1eiNldboj5XYk6yV3OiQleHokZXi6JOV5eiSlhyVjJYh6JSWKOiVliqN45Yu6JaWL+iXljKWaJY7kWqWP4iilkCRyZZC6JiWRJWNlkvom5ZM6JmWTY1+lk\/ompZQjMCWW5XDllzonZZd6J+WXuiell\/ooJZiiUCWY5B3lmSPnJZliteWZuihlmqUhpZs6KOWcIlBlnLoopZzksKWdZfLlnaTqZZ36JyWeJeklnqMr5Z9l3qWhYv3loaXspaIjEeWipHglovkQJaN6KSWjopLlo+Qj5aUinWWleimlpfop5aY6KWWmYyElpuN25acj+GWoIlClqOX15an6KmWqOeslqroqJaw6KyWseiqlrLoq5a06K2WtuiulreX6pa46K+WueiwlruQx5a8lLmWwJCdlsGK5ZbEl1mWxYnrlsaPV5bHjNmWyeizlsvospbMjpOWzei0ls7osZbRjkeW1ei4ltblq5bZmdSW25CXltzotpbil6OW45PvluiJSpbqkOGW6460lvCVtZbyiV+W9pfrlveXi5b56LmW+5NklwCO+ZcE6LqXBui7lweQa5cI6LyXCpfslw3ot5cO6L6XD+jAlxHov5cT6L2XFujBlxnowpcckZqXHonglyTow5cnlraXKujElzDoxZcymEmXOJ5Qlznoxpc96MeXPujIl0LozJdE6MmXRujKl0joy5dJ6M2XUpDCl1aW9ZdZkMOXXOjOl16U8Zdg6M+XYepyl2KWypdk6NCXZujRl2jo0pdpinaXa+jUl22QeJdx6NWXdIxDl3no1pd66NqXfOjYl4Ho2ZeEipOXhejXl4bo25eL6NyXjYjGl4\/o3ZeQ6N6XmI\/il5zo35egi2aXo+jil6bo4Zeo6OCXq+aRl62V2pez6OOXtOjkl8Po5ZfG6OaXyOjnl8vo6JfTitiX3Ojpl+3o6pfulEKX8ujsl\/OJuZf16O+X9ujul\/uJQ5f\/i7+YAZXFmAKSuJgDjaCYBY2AmAaPh5gIkHuYDOjxmA\/o8JgQl2GYEYrmmBKU0JgTk9qYF5CcmBiXzJgajHqYIej0mCTo85gslmqYLZOqmDSJb5g36PWYOOjymDuVcJg8l4qYPej2mEbo95hL6PmYTJHomE2KephOinuYT+j4mFSK55hVjLCYWIromFuTXphel96YZ4zamGvo+phv6PuYcOj8mHHpQJhz6UKYdOlBmKiVl5iq6UOYr+lEmLHpRZi26UaYw+lImMTpR5jG6UmY25TymNzjypjfkEiY4otRmOnpSpjr6UuY7ZmqmO6fWpjvlNGY8oj5mPSIuZj8jpSY\/ZZPmP6P\/JkD6UyZBZbdmQnpTZkKl3uZDIlhmRCOYJkS6U6ZE4nsmRTpT5kY6VCZHelSmR7pU5kg6VWZIelRmSTpVJkoitmZLOlWmS7pV5k96ViZPulZmULpWplF6VyZSelbmUvpXplM6WGZUOldmVHpX5lS6WCZVelimVeLwJmWjvGZl+ljmZjpZJmZjYGZpellmaiKXZmslG6Zrelmma7pZ5mzknmZtJPpmbzpaJnBlJ2ZxJHKmcWJd5nGi+yZyIvtmdCSk5nR6W2Z0ovumdWJ7ZnY6WyZ2+lqmd3pa5nf6WmZ4ul3me3pbpnu6W+Z8elwmfLpcZn46XOZ++lymf+PeJoB6XSaBel2mg6LUpoP6XWaEpGbmhOMsZoZ6XiaKJHLmivpeZowk6uaN+l6mj7pgJpA6X2aQul8mkPpfppF6XuaTemCmlXpgZpX6YSaWovBmlvpg5pf6YWaYumGmmTpiJpl6YeaaemJmmrpi5pr6YqaqI2cmq3pjJqw6Y2auIpbmrzpjprA6Y+axJCRms\/pkJrR6ZGa0+mSmtTpk5rYjYKa3umUmt\/plZri6Zaa4+mXmubpmJrqlK+a6+mamu2VRZru6Zua7+mZmvHpnZr06Zya9+memvvpn5sG6aCbGOmhmxrpopsf6aObIumkmyPppZsl6aabJ+mnmyjpqJsp6ambKumqmy7pq5sv6aybMZ9UmzLprZs74vabPItTm0GKQJtCjbCbQ+mvm0TprptFlqObTemxm07psptP6bCbUemzm1SWgptY6bSbWoubm2+YRJt06bWbg+m3m46IvJuR6bibkpWpm5PptpuW6bmbl+m6m5\/pu5ug6bybqOm9m6qWjpurjkybrY34m66RTpu06b6buenBm8Dpv5vG6cKbyYzvm8rpwJvP6cOb0enEm9LpxZvU6cmb1o5Jm9uR4pvh6cqb4unHm+Ppxpvk6cib6Ix+m\/Dpzpvx6c2b8unMm\/WIsZwE6dicBunUnAjp1ZwJ6dGcCunXnAzp05wNioKcEJhrnBLp1pwT6dKcFOnQnBXpz5wb6dqcIendnCTp3Jwl6ducLZVonC7p2ZwviPGcMOnenDLp4Jw5io+cOunLnDuJVpw+6eKcRunhnEfp35xIkkycUpaQnFeX2Jxa6eOcYOnknGfp5Zx26eaceOnnnOWSuZzn6eic6ZS1nOvp7Zzs6emc8OnqnPOWUJz0lsKc9pPOnQPp7p0G6e+dB5O8nQjp7J0J6eudDomonRLp950V6fadG4mVnR\/p9J0j6fOdJunxnSiKm50q6fCdK46wnSyJp507jYOdPun6nT\/p+Z1B6fidROn1nUbp+51I6fydUOpEnVHqQ51Z6kWdXIlMnV3qQJ1e6kGdYI2UnWGWt51k6kKdbJZRnW\/qSp1y6kadeupLnYfqSJ2J6kedj4x7nZrqTJ2k6k2dqepOnavqSZ2v6fKdsupPnbSS35246lOduupUnbvqUp3B6lGdwupXncTqUJ3G6lWdz+pWndPqWZ3Z6lid5upbne3qXJ3v6l2d8phonfjqWp35kemd+o3rnf3qXp4a6l+eG+pgnh7qYZ516mKeeIyynnnqY5596mSef46tnoHqZZ6I6maei+pnnozqaJ6R6muekuppnpOYW56V6mqel5ftnp3qbJ6fl9mepeptnqaUnp6p6m6equpwnq3qcZ646m+euY2NnrqWy567loOevJv1nr6fgJ6\/lpuexImpnszqc57Ni2+ezup0ns\/qdZ7Q6nae0o2VntTqd57Y4NKe2ZbZntuR4Z7c6nie3ep6nt7qeZ7g6nue5ep8nujqfZ7v6n6e9OqAnvbqgZ736oKe+eqDnvvqhJ786oWe\/eqGnwfqh58I6oifDpNDnxOM258V6oqfIJFsnyHqi58s6oyfO5VAnz7qjZ9K6o6fS+JWn07m2J9P6OufUuqPn1TqkJ9f6pKfYOqTn2HqlJ9il+6fY+qRn2bqlZ9n6pafauqYn2zql59y6pqfduqbn3fqmZ+Nl7Sfleqcn5zqnZ+d4nOfoOqe\/wGBSf8DgZT\/BIGQ\/wWBk\/8GgZX\/CIFp\/wmBav8KgZb\/C4F7\/wyBQ\/8OgUT\/D4Fe\/xCCT\/8RglD\/EoJR\/xOCUv8UglP\/FYJU\/xaCVf8Xglb\/GIJX\/xmCWP8agUb\/G4FH\/xyBg\/8dgYH\/HoGE\/x+BSP8ggZf\/IYJg\/yKCYf8jgmL\/JIJj\/yWCZP8mgmX\/J4Jm\/yiCZ\/8pgmj\/KoJp\/yuCav8sgmv\/LYJs\/y6Cbf8vgm7\/MIJv\/zGCcP8ygnH\/M4Jy\/zSCc\/81gnT\/NoJ1\/zeCdv84gnf\/OYJ4\/zqCef87gW3\/PIFf\/z2Bbv8+gU\/\/P4FR\/0CBTf9BgoH\/QoKC\/0OCg\/9EgoT\/RYKF\/0aChv9Hgof\/SIKI\/0mCif9Kgor\/S4KL\/0yCjP9Ngo3\/ToKO\/0+Cj\/9QgpD\/UYKR\/1KCkv9TgpP\/VIKU\/1WClf9Wgpb\/V4KX\/1iCmP9Zgpn\/WoKa\/1uBb\/9cgWL\/XYFw\/2EAof9iAKL\/YwCj\/2QApP9lAKX\/ZgCm\/2cAp\/9oAKj\/aQCp\/2oAqv9rAKv\/bACs\/20Arf9uAK7\/bwCv\/3AAsP9xALH\/cgCy\/3MAs\/90ALT\/dQC1\/3YAtv93ALf\/eAC4\/3kAuf96ALr\/ewC7\/3wAvP99AL3\/fgC+\/38Av\/+AAMD\/gQDB\/4IAwv+DAMP\/hADE\/4UAxf+GAMb\/hwDH\/4gAyP+JAMn\/igDK\/4sAy\/+MAMz\/jQDN\/44Azv+PAM\/\/kADQ\/5EA0f+SANL\/kwDT\/5QA1P+VANX\/lgDW\/5cA1\/+YANj\/mQDZ\/5oA2v+bANv\/nADc\/50A3f+eAN7\/nwDf\/+OBUP\/lgY8=',
7070);


qrcode.stringToBytesFuncs['UTF-8']=function(s){

function toUTF8Array(str){
var utf8=[];
for(var i=0;i<str.length;i++){
var charcode=str.charCodeAt(i);
if(charcode<0x80)utf8.push(charcode);else
if(charcode<0x800){
utf8.push(0xc0|charcode>>6,
0x80|charcode&0x3f);
}else
if(charcode<0xd800||charcode>=0xe000){
utf8.push(0xe0|charcode>>12,
0x80|charcode>>6&0x3f,
0x80|charcode&0x3f);
}else

{
i++;



charcode=0x10000+((charcode&0x3ff)<<10|
str.charCodeAt(i)&0x3ff);
utf8.push(0xf0|charcode>>18,
0x80|charcode>>12&0x3f,
0x80|charcode>>6&0x3f,
0x80|charcode&0x3f);
}
}
return utf8;
}
return toUTF8Array(s);
};

}();

(function(factory){
if(typeof define==='function'&&define.amd){
define([],factory);
}else if((typeof exports==="undefined"?"undefined":_typeof2(exports))==='object'){
module.exports=factory();
}
})(function(){
return qrcode;
});

},{}],61:[function(require,module,exports){





















'use strict';




function hasOwnProperty(obj,prop){
return Object.prototype.hasOwnProperty.call(obj,prop);
}

module.exports=function(qs,sep,eq,options){
sep=sep||'&';
eq=eq||'=';
var obj={};

if(typeof qs!=='string'||qs.length===0){
return obj;
}

var regexp=/\+/g;
qs=qs.split(sep);

var maxKeys=1000;
if(options&&typeof options.maxKeys==='number'){
maxKeys=options.maxKeys;
}

var len=qs.length;

if(maxKeys>0&&len>maxKeys){
len=maxKeys;
}

for(var i=0;i<len;++i){
var x=qs[i].replace(regexp,'%20'),
idx=x.indexOf(eq),
kstr,vstr,k,v;

if(idx>=0){
kstr=x.substr(0,idx);
vstr=x.substr(idx+1);
}else{
kstr=x;
vstr='';
}

k=decodeURIComponent(kstr);
v=decodeURIComponent(vstr);

if(!hasOwnProperty(obj,k)){
obj[k]=v;
}else if(isArray(obj[k])){
obj[k].push(v);
}else{
obj[k]=[obj[k],v];
}
}

return obj;
};

var isArray=Array.isArray||function(xs){
return Object.prototype.toString.call(xs)==='[object Array]';
};

},{}],62:[function(require,module,exports){





















'use strict';

var stringifyPrimitive=function stringifyPrimitive(v){
switch(typeof v==="undefined"?"undefined":_typeof2(v)){
case'string':
return v;

case'boolean':
return v?'true':'false';

case'number':
return isFinite(v)?v:'';

default:
return'';}

};

module.exports=function(obj,sep,eq,name){
sep=sep||'&';
eq=eq||'=';
if(obj===null){
obj=undefined;
}

if((typeof obj==="undefined"?"undefined":_typeof2(obj))==='object'){
return map(objectKeys(obj),function(k){
var ks=encodeURIComponent(stringifyPrimitive(k))+eq;
if(isArray(obj[k])){
return map(obj[k],function(v){
return ks+encodeURIComponent(stringifyPrimitive(v));
}).join(sep);
}else{
return ks+encodeURIComponent(stringifyPrimitive(obj[k]));
}
}).join(sep);

}

if(!name)return'';
return encodeURIComponent(stringifyPrimitive(name))+eq+
encodeURIComponent(stringifyPrimitive(obj));
};

var isArray=Array.isArray||function(xs){
return Object.prototype.toString.call(xs)==='[object Array]';
};

function map(xs,f){
if(xs.map)return xs.map(f);
var res=[];
for(var i=0;i<xs.length;i++){
res.push(f(xs[i],i));
}
return res;
}

var objectKeys=Object.keys||function(obj){
var res=[];
for(var key in obj){
if(Object.prototype.hasOwnProperty.call(obj,key))res.push(key);
}
return res;
};

},{}],63:[function(require,module,exports){
'use strict';

exports.decode=exports.parse=require(61);
exports.encode=exports.stringify=require(62);

},{"61":61,"62":62}],64:[function(require,module,exports){





'use strict';



var objectKeys=Object.keys||function(obj){
var keys=[];
for(var key in obj){
keys.push(key);
}return keys;
};


module.exports=Duplex;


var processNextTick=require(57);



var util=require(7);
util.inherits=require(11);


var Readable=require(66);
var Writable=require(68);

util.inherits(Duplex,Readable);

var keys=objectKeys(Writable.prototype);
for(var v=0;v<keys.length;v++){
var method=keys[v];
if(!Duplex.prototype[method])Duplex.prototype[method]=Writable.prototype[method];
}

function Duplex(options){
if(!(this instanceof Duplex))return new Duplex(options);

Readable.call(this,options);
Writable.call(this,options);

if(options&&options.readable===false)this.readable=false;

if(options&&options.writable===false)this.writable=false;

this.allowHalfOpen=true;
if(options&&options.allowHalfOpen===false)this.allowHalfOpen=false;

this.once('end',onend);
}


function onend(){


if(this.allowHalfOpen||this._writableState.ended)return;



processNextTick(onEndNT,this);
}

function onEndNT(self){
self.end();
}

function forEach(xs,f){
for(var i=0,l=xs.length;i<l;i++){
f(xs[i],i);
}
}
},{"11":11,"57":57,"66":66,"68":68,"7":7}],65:[function(require,module,exports){




'use strict';

module.exports=PassThrough;

var Transform=require(67);


var util=require(7);
util.inherits=require(11);


util.inherits(PassThrough,Transform);

function PassThrough(options){
if(!(this instanceof PassThrough))return new PassThrough(options);

Transform.call(this,options);
}

PassThrough.prototype._transform=function(chunk,encoding,cb){
cb(null,chunk);
};
},{"11":11,"67":67,"7":7}],66:[function(require,module,exports){
(function(process){
'use strict';

module.exports=Readable;


var processNextTick=require(57);



var isArray=require(13);



var Duplex;


Readable.ReadableState=ReadableState;


var EE=require(8).EventEmitter;

var EElistenerCount=function EElistenerCount(emitter,type){
return emitter.listeners(type).length;
};



var Stream=require(70);


var Buffer=require(5).Buffer;

var bufferShim=require(4);



var util=require(7);
util.inherits=require(11);



var debugUtil=require(3);
var debug=void 0;
if(debugUtil&&debugUtil.debuglog){
debug=debugUtil.debuglog('stream');
}else{
debug=function debug(){};
}


var BufferList=require(69);
var StringDecoder;

util.inherits(Readable,Stream);

var kProxyEvents=['error','close','destroy','pause','resume'];

function prependListener(emitter,event,fn){


if(typeof emitter.prependListener==='function'){
return emitter.prependListener(event,fn);
}else{




if(!emitter._events||!emitter._events[event])emitter.on(event,fn);else if(isArray(emitter._events[event]))emitter._events[event].unshift(fn);else emitter._events[event]=[fn,emitter._events[event]];
}
}

function ReadableState(options,stream){
Duplex=Duplex||require(64);

options=options||{};



this.objectMode=!!options.objectMode;

if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.readableObjectMode;



var hwm=options.highWaterMark;
var defaultHwm=this.objectMode?16:16*1024;
this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;


this.highWaterMark=~~this.highWaterMark;




this.buffer=new BufferList();
this.length=0;
this.pipes=null;
this.pipesCount=0;
this.flowing=null;
this.ended=false;
this.endEmitted=false;
this.reading=false;





this.sync=true;



this.needReadable=false;
this.emittedReadable=false;
this.readableListening=false;
this.resumeScheduled=false;




this.defaultEncoding=options.defaultEncoding||'utf8';



this.ranOut=false;


this.awaitDrain=0;


this.readingMore=false;

this.decoder=null;
this.encoding=null;
if(options.encoding){
if(!StringDecoder)StringDecoder=require(76).StringDecoder;
this.decoder=new StringDecoder(options.encoding);
this.encoding=options.encoding;
}
}

function Readable(options){
Duplex=Duplex||require(64);

if(!(this instanceof Readable))return new Readable(options);

this._readableState=new ReadableState(options,this);


this.readable=true;

if(options&&typeof options.read==='function')this._read=options.read;

Stream.call(this);
}





Readable.prototype.push=function(chunk,encoding){
var state=this._readableState;

if(!state.objectMode&&typeof chunk==='string'){
encoding=encoding||state.defaultEncoding;
if(encoding!==state.encoding){
chunk=bufferShim.from(chunk,encoding);
encoding='';
}
}

return readableAddChunk(this,state,chunk,encoding,false);
};


Readable.prototype.unshift=function(chunk){
var state=this._readableState;
return readableAddChunk(this,state,chunk,'',true);
};

Readable.prototype.isPaused=function(){
return this._readableState.flowing===false;
};

function readableAddChunk(stream,state,chunk,encoding,addToFront){
var er=chunkInvalid(state,chunk);
if(er){
stream.emit('error',er);
}else if(chunk===null){
state.reading=false;
onEofChunk(stream,state);
}else if(state.objectMode||chunk&&chunk.length>0){
if(state.ended&&!addToFront){
var e=new Error('stream.push() after EOF');
stream.emit('error',e);
}else if(state.endEmitted&&addToFront){
var _e=new Error('stream.unshift() after end event');
stream.emit('error',_e);
}else{
var skipAdd;
if(state.decoder&&!addToFront&&!encoding){
chunk=state.decoder.write(chunk);
skipAdd=!state.objectMode&&chunk.length===0;
}

if(!addToFront)state.reading=false;



if(!skipAdd){

if(state.flowing&&state.length===0&&!state.sync){
stream.emit('data',chunk);
stream.read(0);
}else{

state.length+=state.objectMode?1:chunk.length;
if(addToFront)state.buffer.unshift(chunk);else state.buffer.push(chunk);

if(state.needReadable)emitReadable(stream);
}
}

maybeReadMore(stream,state);
}
}else if(!addToFront){
state.reading=false;
}

return needMoreData(state);
}








function needMoreData(state){
return!state.ended&&(state.needReadable||state.length<state.highWaterMark||state.length===0);
}


Readable.prototype.setEncoding=function(enc){
if(!StringDecoder)StringDecoder=require(76).StringDecoder;
this._readableState.decoder=new StringDecoder(enc);
this._readableState.encoding=enc;
return this;
};


var MAX_HWM=0x800000;
function computeNewHighWaterMark(n){
if(n>=MAX_HWM){
n=MAX_HWM;
}else{


n--;
n|=n>>>1;
n|=n>>>2;
n|=n>>>4;
n|=n>>>8;
n|=n>>>16;
n++;
}
return n;
}



function howMuchToRead(n,state){
if(n<=0||state.length===0&&state.ended)return 0;
if(state.objectMode)return 1;
if(n!==n){

if(state.flowing&&state.length)return state.buffer.head.data.length;else return state.length;
}

if(n>state.highWaterMark)state.highWaterMark=computeNewHighWaterMark(n);
if(n<=state.length)return n;

if(!state.ended){
state.needReadable=true;
return 0;
}
return state.length;
}


Readable.prototype.read=function(n){
debug('read',n);
n=parseInt(n,10);
var state=this._readableState;
var nOrig=n;

if(n!==0)state.emittedReadable=false;




if(n===0&&state.needReadable&&(state.length>=state.highWaterMark||state.ended)){
debug('read: emitReadable',state.length,state.ended);
if(state.length===0&&state.ended)endReadable(this);else emitReadable(this);
return null;
}

n=howMuchToRead(n,state);


if(n===0&&state.ended){
if(state.length===0)endReadable(this);
return null;
}
























var doRead=state.needReadable;
debug('need readable',doRead);


if(state.length===0||state.length-n<state.highWaterMark){
doRead=true;
debug('length less than watermark',doRead);
}



if(state.ended||state.reading){
doRead=false;
debug('reading or ended',doRead);
}else if(doRead){
debug('do read');
state.reading=true;
state.sync=true;

if(state.length===0)state.needReadable=true;

this._read(state.highWaterMark);
state.sync=false;


if(!state.reading)n=howMuchToRead(nOrig,state);
}

var ret;
if(n>0)ret=fromList(n,state);else ret=null;

if(ret===null){
state.needReadable=true;
n=0;
}else{
state.length-=n;
}

if(state.length===0){


if(!state.ended)state.needReadable=true;


if(nOrig!==n&&state.ended)endReadable(this);
}

if(ret!==null)this.emit('data',ret);

return ret;
};

function chunkInvalid(state,chunk){
var er=null;
if(!Buffer.isBuffer(chunk)&&typeof chunk!=='string'&&chunk!==null&&chunk!==undefined&&!state.objectMode){
er=new TypeError('Invalid non-string/buffer chunk');
}
return er;
}

function onEofChunk(stream,state){
if(state.ended)return;
if(state.decoder){
var chunk=state.decoder.end();
if(chunk&&chunk.length){
state.buffer.push(chunk);
state.length+=state.objectMode?1:chunk.length;
}
}
state.ended=true;


emitReadable(stream);
}




function emitReadable(stream){
var state=stream._readableState;
state.needReadable=false;
if(!state.emittedReadable){
debug('emitReadable',state.flowing);
state.emittedReadable=true;
if(state.sync)processNextTick(emitReadable_,stream);else emitReadable_(stream);
}
}

function emitReadable_(stream){
debug('emit readable');
stream.emit('readable');
flow(stream);
}







function maybeReadMore(stream,state){
if(!state.readingMore){
state.readingMore=true;
processNextTick(maybeReadMore_,stream,state);
}
}

function maybeReadMore_(stream,state){
var len=state.length;
while(!state.reading&&!state.flowing&&!state.ended&&state.length<state.highWaterMark){
debug('maybeReadMore read 0');
stream.read(0);
if(len===state.length)

break;else len=state.length;
}
state.readingMore=false;
}





Readable.prototype._read=function(n){
this.emit('error',new Error('_read() is not implemented'));
};

Readable.prototype.pipe=function(dest,pipeOpts){
var src=this;
var state=this._readableState;

switch(state.pipesCount){
case 0:
state.pipes=dest;
break;
case 1:
state.pipes=[state.pipes,dest];
break;
default:
state.pipes.push(dest);
break;}

state.pipesCount+=1;
debug('pipe count=%d opts=%j',state.pipesCount,pipeOpts);

var doEnd=(!pipeOpts||pipeOpts.end!==false)&&dest!==process.stdout&&dest!==process.stderr;

var endFn=doEnd?onend:cleanup;
if(state.endEmitted)processNextTick(endFn);else src.once('end',endFn);

dest.on('unpipe',onunpipe);
function onunpipe(readable){
debug('onunpipe');
if(readable===src){
cleanup();
}
}

function onend(){
debug('onend');
dest.end();
}





var ondrain=pipeOnDrain(src);
dest.on('drain',ondrain);

var cleanedUp=false;
function cleanup(){
debug('cleanup');

dest.removeListener('close',onclose);
dest.removeListener('finish',onfinish);
dest.removeListener('drain',ondrain);
dest.removeListener('error',onerror);
dest.removeListener('unpipe',onunpipe);
src.removeListener('end',onend);
src.removeListener('end',cleanup);
src.removeListener('data',ondata);

cleanedUp=true;






if(state.awaitDrain&&(!dest._writableState||dest._writableState.needDrain))ondrain();
}





var increasedAwaitDrain=false;
src.on('data',ondata);
function ondata(chunk){
debug('ondata');
increasedAwaitDrain=false;
var ret=dest.write(chunk);
if(false===ret&&!increasedAwaitDrain){




if((state.pipesCount===1&&state.pipes===dest||state.pipesCount>1&&indexOf(state.pipes,dest)!==-1)&&!cleanedUp){
debug('false write response, pause',src._readableState.awaitDrain);
src._readableState.awaitDrain++;
increasedAwaitDrain=true;
}
src.pause();
}
}



function onerror(er){
debug('onerror',er);
unpipe();
dest.removeListener('error',onerror);
if(EElistenerCount(dest,'error')===0)dest.emit('error',er);
}


prependListener(dest,'error',onerror);


function onclose(){
dest.removeListener('finish',onfinish);
unpipe();
}
dest.once('close',onclose);
function onfinish(){
debug('onfinish');
dest.removeListener('close',onclose);
unpipe();
}
dest.once('finish',onfinish);

function unpipe(){
debug('unpipe');
src.unpipe(dest);
}


dest.emit('pipe',src);


if(!state.flowing){
debug('pipe resume');
src.resume();
}

return dest;
};

function pipeOnDrain(src){
return function(){
var state=src._readableState;
debug('pipeOnDrain',state.awaitDrain);
if(state.awaitDrain)state.awaitDrain--;
if(state.awaitDrain===0&&EElistenerCount(src,'data')){
state.flowing=true;
flow(src);
}
};
}

Readable.prototype.unpipe=function(dest){
var state=this._readableState;


if(state.pipesCount===0)return this;


if(state.pipesCount===1){

if(dest&&dest!==state.pipes)return this;

if(!dest)dest=state.pipes;


state.pipes=null;
state.pipesCount=0;
state.flowing=false;
if(dest)dest.emit('unpipe',this);
return this;
}



if(!dest){

var dests=state.pipes;
var len=state.pipesCount;
state.pipes=null;
state.pipesCount=0;
state.flowing=false;

for(var i=0;i<len;i++){
dests[i].emit('unpipe',this);
}return this;
}


var index=indexOf(state.pipes,dest);
if(index===-1)return this;

state.pipes.splice(index,1);
state.pipesCount-=1;
if(state.pipesCount===1)state.pipes=state.pipes[0];

dest.emit('unpipe',this);

return this;
};



Readable.prototype.on=function(ev,fn){
var res=Stream.prototype.on.call(this,ev,fn);

if(ev==='data'){

if(this._readableState.flowing!==false)this.resume();
}else if(ev==='readable'){
var state=this._readableState;
if(!state.endEmitted&&!state.readableListening){
state.readableListening=state.needReadable=true;
state.emittedReadable=false;
if(!state.reading){
processNextTick(nReadingNextTick,this);
}else if(state.length){
emitReadable(this,state);
}
}
}

return res;
};
Readable.prototype.addListener=Readable.prototype.on;

function nReadingNextTick(self){
debug('readable nexttick read 0');
self.read(0);
}



Readable.prototype.resume=function(){
var state=this._readableState;
if(!state.flowing){
debug('resume');
state.flowing=true;
resume(this,state);
}
return this;
};

function resume(stream,state){
if(!state.resumeScheduled){
state.resumeScheduled=true;
processNextTick(resume_,stream,state);
}
}

function resume_(stream,state){
if(!state.reading){
debug('resume read 0');
stream.read(0);
}

state.resumeScheduled=false;
state.awaitDrain=0;
stream.emit('resume');
flow(stream);
if(state.flowing&&!state.reading)stream.read(0);
}

Readable.prototype.pause=function(){
debug('call pause flowing=%j',this._readableState.flowing);
if(false!==this._readableState.flowing){
debug('pause');
this._readableState.flowing=false;
this.emit('pause');
}
return this;
};

function flow(stream){
var state=stream._readableState;
debug('flow',state.flowing);
while(state.flowing&&stream.read()!==null){}
}




Readable.prototype.wrap=function(stream){
var state=this._readableState;
var paused=false;

var self=this;
stream.on('end',function(){
debug('wrapped end');
if(state.decoder&&!state.ended){
var chunk=state.decoder.end();
if(chunk&&chunk.length)self.push(chunk);
}

self.push(null);
});

stream.on('data',function(chunk){
debug('wrapped data');
if(state.decoder)chunk=state.decoder.write(chunk);


if(state.objectMode&&(chunk===null||chunk===undefined))return;else if(!state.objectMode&&(!chunk||!chunk.length))return;

var ret=self.push(chunk);
if(!ret){
paused=true;
stream.pause();
}
});



for(var i in stream){
if(this[i]===undefined&&typeof stream[i]==='function'){
this[i]=function(method){
return function(){
return stream[method].apply(stream,arguments);
};
}(i);
}
}


for(var n=0;n<kProxyEvents.length;n++){
stream.on(kProxyEvents[n],self.emit.bind(self,kProxyEvents[n]));
}



self._read=function(n){
debug('wrapped _read',n);
if(paused){
paused=false;
stream.resume();
}
};

return self;
};


Readable._fromList=fromList;





function fromList(n,state){

if(state.length===0)return null;

var ret;
if(state.objectMode)ret=state.buffer.shift();else if(!n||n>=state.length){

if(state.decoder)ret=state.buffer.join('');else if(state.buffer.length===1)ret=state.buffer.head.data;else ret=state.buffer.concat(state.length);
state.buffer.clear();
}else{

ret=fromListPartial(n,state.buffer,state.decoder);
}

return ret;
}




function fromListPartial(n,list,hasStrings){
var ret;
if(n<list.head.data.length){

ret=list.head.data.slice(0,n);
list.head.data=list.head.data.slice(n);
}else if(n===list.head.data.length){

ret=list.shift();
}else{

ret=hasStrings?copyFromBufferString(n,list):copyFromBuffer(n,list);
}
return ret;
}





function copyFromBufferString(n,list){
var p=list.head;
var c=1;
var ret=p.data;
n-=ret.length;
while(p=p.next){
var str=p.data;
var nb=n>str.length?str.length:n;
if(nb===str.length)ret+=str;else ret+=str.slice(0,n);
n-=nb;
if(n===0){
if(nb===str.length){
++c;
if(p.next)list.head=p.next;else list.head=list.tail=null;
}else{
list.head=p;
p.data=str.slice(nb);
}
break;
}
++c;
}
list.length-=c;
return ret;
}




function copyFromBuffer(n,list){
var ret=bufferShim.allocUnsafe(n);
var p=list.head;
var c=1;
p.data.copy(ret);
n-=p.data.length;
while(p=p.next){
var buf=p.data;
var nb=n>buf.length?buf.length:n;
buf.copy(ret,ret.length-n,0,nb);
n-=nb;
if(n===0){
if(nb===buf.length){
++c;
if(p.next)list.head=p.next;else list.head=list.tail=null;
}else{
list.head=p;
p.data=buf.slice(nb);
}
break;
}
++c;
}
list.length-=c;
return ret;
}

function endReadable(stream){
var state=stream._readableState;



if(state.length>0)throw new Error('"endReadable()" called on non-empty stream');

if(!state.endEmitted){
state.ended=true;
processNextTick(endReadableNT,state,stream);
}
}

function endReadableNT(state,stream){

if(!state.endEmitted&&state.length===0){
state.endEmitted=true;
stream.readable=false;
stream.emit('end');
}
}

function forEach(xs,f){
for(var i=0,l=xs.length;i<l;i++){
f(xs[i],i);
}
}

function indexOf(xs,x){
for(var i=0,l=xs.length;i<l;i++){
if(xs[i]===x)return i;
}
return-1;
}
}).call(this,require(58));
},{"11":11,"13":13,"3":3,"4":4,"5":5,"57":57,"58":58,"64":64,"69":69,"7":7,"70":70,"76":76,"8":8}],67:[function(require,module,exports){










































'use strict';

module.exports=Transform;

var Duplex=require(64);


var util=require(7);
util.inherits=require(11);


util.inherits(Transform,Duplex);

function TransformState(stream){
this.afterTransform=function(er,data){
return afterTransform(stream,er,data);
};

this.needTransform=false;
this.transforming=false;
this.writecb=null;
this.writechunk=null;
this.writeencoding=null;
}

function afterTransform(stream,er,data){
var ts=stream._transformState;
ts.transforming=false;

var cb=ts.writecb;

if(!cb)return stream.emit('error',new Error('no writecb in Transform class'));

ts.writechunk=null;
ts.writecb=null;

if(data!==null&&data!==undefined)stream.push(data);

cb(er);

var rs=stream._readableState;
rs.reading=false;
if(rs.needReadable||rs.length<rs.highWaterMark){
stream._read(rs.highWaterMark);
}
}

function Transform(options){
if(!(this instanceof Transform))return new Transform(options);

Duplex.call(this,options);

this._transformState=new TransformState(this);

var stream=this;


this._readableState.needReadable=true;




this._readableState.sync=false;

if(options){
if(typeof options.transform==='function')this._transform=options.transform;

if(typeof options.flush==='function')this._flush=options.flush;
}


this.once('prefinish',function(){
if(typeof this._flush==='function')this._flush(function(er,data){
done(stream,er,data);
});else done(stream);
});
}

Transform.prototype.push=function(chunk,encoding){
this._transformState.needTransform=false;
return Duplex.prototype.push.call(this,chunk,encoding);
};











Transform.prototype._transform=function(chunk,encoding,cb){
throw new Error('_transform() is not implemented');
};

Transform.prototype._write=function(chunk,encoding,cb){
var ts=this._transformState;
ts.writecb=cb;
ts.writechunk=chunk;
ts.writeencoding=encoding;
if(!ts.transforming){
var rs=this._readableState;
if(ts.needTransform||rs.needReadable||rs.length<rs.highWaterMark)this._read(rs.highWaterMark);
}
};




Transform.prototype._read=function(n){
var ts=this._transformState;

if(ts.writechunk!==null&&ts.writecb&&!ts.transforming){
ts.transforming=true;
this._transform(ts.writechunk,ts.writeencoding,ts.afterTransform);
}else{


ts.needTransform=true;
}
};

function done(stream,er,data){
if(er)return stream.emit('error',er);

if(data!==null&&data!==undefined)stream.push(data);



var ws=stream._writableState;
var ts=stream._transformState;

if(ws.length)throw new Error('Calling transform done when ws.length != 0');

if(ts.transforming)throw new Error('Calling transform done when still transforming');

return stream.push(null);
}
},{"11":11,"64":64,"7":7}],68:[function(require,module,exports){
(function(process){




'use strict';

module.exports=Writable;


var processNextTick=require(57);



var asyncWrite=!process.browser&&['v0.10','v0.9.'].indexOf(process.version.slice(0,5))>-1?setImmediate:processNextTick;



var Duplex;


Writable.WritableState=WritableState;


var util=require(7);
util.inherits=require(11);



var internalUtil={
deprecate:require(80)};




var Stream=require(70);


var Buffer=require(5).Buffer;

var bufferShim=require(4);


util.inherits(Writable,Stream);

function nop(){}

function WriteReq(chunk,encoding,cb){
this.chunk=chunk;
this.encoding=encoding;
this.callback=cb;
this.next=null;
}

function WritableState(options,stream){
Duplex=Duplex||require(64);

options=options||{};



this.objectMode=!!options.objectMode;

if(stream instanceof Duplex)this.objectMode=this.objectMode||!!options.writableObjectMode;




var hwm=options.highWaterMark;
var defaultHwm=this.objectMode?16:16*1024;
this.highWaterMark=hwm||hwm===0?hwm:defaultHwm;


this.highWaterMark=~~this.highWaterMark;


this.needDrain=false;

this.ending=false;

this.ended=false;

this.finished=false;




var noDecode=options.decodeStrings===false;
this.decodeStrings=!noDecode;




this.defaultEncoding=options.defaultEncoding||'utf8';




this.length=0;


this.writing=false;


this.corked=0;





this.sync=true;




this.bufferProcessing=false;


this.onwrite=function(er){
onwrite(stream,er);
};


this.writecb=null;


this.writelen=0;

this.bufferedRequest=null;
this.lastBufferedRequest=null;



this.pendingcb=0;



this.prefinished=false;


this.errorEmitted=false;


this.bufferedRequestCount=0;



this.corkedRequestsFree=new CorkedRequest(this);
}

WritableState.prototype.getBuffer=function getBuffer(){
var current=this.bufferedRequest;
var out=[];
while(current){
out.push(current);
current=current.next;
}
return out;
};

(function(){
try{
Object.defineProperty(WritableState.prototype,'buffer',{
get:internalUtil.deprecate(function(){
return this.getBuffer();
},'_writableState.buffer is deprecated. Use _writableState.getBuffer '+'instead.')});

}catch(_){}
})();



var realHasInstance;
if(typeof Symbol==='function'&&(typeof Symbol==="function"?Symbol.hasInstance:"@@hasInstance")&&typeof Function.prototype[typeof Symbol==="function"?Symbol.hasInstance:"@@hasInstance"]==='function'){
realHasInstance=Function.prototype[typeof Symbol==="function"?Symbol.hasInstance:"@@hasInstance"];
Object.defineProperty(Writable,typeof Symbol==="function"?Symbol.hasInstance:"@@hasInstance",{
value:function(object){
if(realHasInstance.call(this,object))return true;

return object&&object._writableState instanceof WritableState;
}});

}else{
realHasInstance=function realHasInstance(object){
return object instanceof this;
};
}

function Writable(options){
Duplex=Duplex||require(64);








if(!realHasInstance.call(Writable,this)&&!(this instanceof Duplex)){
return new Writable(options);
}

this._writableState=new WritableState(options,this);


this.writable=true;

if(options){
if(typeof options.write==='function')this._write=options.write;

if(typeof options.writev==='function')this._writev=options.writev;
}

Stream.call(this);
}


Writable.prototype.pipe=function(){
this.emit('error',new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream,cb){
var er=new Error('write after end');

stream.emit('error',er);
processNextTick(cb,er);
}




function validChunk(stream,state,chunk,cb){
var valid=true;
var er=false;

if(chunk===null){
er=new TypeError('May not write null values to stream');
}else if(typeof chunk!=='string'&&chunk!==undefined&&!state.objectMode){
er=new TypeError('Invalid non-string/buffer chunk');
}
if(er){
stream.emit('error',er);
processNextTick(cb,er);
valid=false;
}
return valid;
}

Writable.prototype.write=function(chunk,encoding,cb){
var state=this._writableState;
var ret=false;
var isBuf=Buffer.isBuffer(chunk);

if(typeof encoding==='function'){
cb=encoding;
encoding=null;
}

if(isBuf)encoding='buffer';else if(!encoding)encoding=state.defaultEncoding;

if(typeof cb!=='function')cb=nop;

if(state.ended)writeAfterEnd(this,cb);else if(isBuf||validChunk(this,state,chunk,cb)){
state.pendingcb++;
ret=writeOrBuffer(this,state,isBuf,chunk,encoding,cb);
}

return ret;
};

Writable.prototype.cork=function(){
var state=this._writableState;

state.corked++;
};

Writable.prototype.uncork=function(){
var state=this._writableState;

if(state.corked){
state.corked--;

if(!state.writing&&!state.corked&&!state.finished&&!state.bufferProcessing&&state.bufferedRequest)clearBuffer(this,state);
}
};

Writable.prototype.setDefaultEncoding=function setDefaultEncoding(encoding){

if(typeof encoding==='string')encoding=encoding.toLowerCase();
if(!(['hex','utf8','utf-8','ascii','binary','base64','ucs2','ucs-2','utf16le','utf-16le','raw'].indexOf((encoding+'').toLowerCase())>-1))throw new TypeError('Unknown encoding: '+encoding);
this._writableState.defaultEncoding=encoding;
return this;
};

function decodeChunk(state,chunk,encoding){
if(!state.objectMode&&state.decodeStrings!==false&&typeof chunk==='string'){
chunk=bufferShim.from(chunk,encoding);
}
return chunk;
}




function writeOrBuffer(stream,state,isBuf,chunk,encoding,cb){
if(!isBuf){
chunk=decodeChunk(state,chunk,encoding);
if(Buffer.isBuffer(chunk))encoding='buffer';
}
var len=state.objectMode?1:chunk.length;

state.length+=len;

var ret=state.length<state.highWaterMark;

if(!ret)state.needDrain=true;

if(state.writing||state.corked){
var last=state.lastBufferedRequest;
state.lastBufferedRequest=new WriteReq(chunk,encoding,cb);
if(last){
last.next=state.lastBufferedRequest;
}else{
state.bufferedRequest=state.lastBufferedRequest;
}
state.bufferedRequestCount+=1;
}else{
doWrite(stream,state,false,len,chunk,encoding,cb);
}

return ret;
}

function doWrite(stream,state,writev,len,chunk,encoding,cb){
state.writelen=len;
state.writecb=cb;
state.writing=true;
state.sync=true;
if(writev)stream._writev(chunk,state.onwrite);else stream._write(chunk,encoding,state.onwrite);
state.sync=false;
}

function onwriteError(stream,state,sync,er,cb){
--state.pendingcb;
if(sync)processNextTick(cb,er);else cb(er);

stream._writableState.errorEmitted=true;
stream.emit('error',er);
}

function onwriteStateUpdate(state){
state.writing=false;
state.writecb=null;
state.length-=state.writelen;
state.writelen=0;
}

function onwrite(stream,er){
var state=stream._writableState;
var sync=state.sync;
var cb=state.writecb;

onwriteStateUpdate(state);

if(er)onwriteError(stream,state,sync,er,cb);else{

var finished=needFinish(state);

if(!finished&&!state.corked&&!state.bufferProcessing&&state.bufferedRequest){
clearBuffer(stream,state);
}

if(sync){

asyncWrite(afterWrite,stream,state,finished,cb);

}else{
afterWrite(stream,state,finished,cb);
}
}
}

function afterWrite(stream,state,finished,cb){
if(!finished)onwriteDrain(stream,state);
state.pendingcb--;
cb();
finishMaybe(stream,state);
}




function onwriteDrain(stream,state){
if(state.length===0&&state.needDrain){
state.needDrain=false;
stream.emit('drain');
}
}


function clearBuffer(stream,state){
state.bufferProcessing=true;
var entry=state.bufferedRequest;

if(stream._writev&&entry&&entry.next){

var l=state.bufferedRequestCount;
var buffer=new Array(l);
var holder=state.corkedRequestsFree;
holder.entry=entry;

var count=0;
while(entry){
buffer[count]=entry;
entry=entry.next;
count+=1;
}

doWrite(stream,state,true,state.length,buffer,'',holder.finish);



state.pendingcb++;
state.lastBufferedRequest=null;
if(holder.next){
state.corkedRequestsFree=holder.next;
holder.next=null;
}else{
state.corkedRequestsFree=new CorkedRequest(state);
}
}else{

while(entry){
var chunk=entry.chunk;
var encoding=entry.encoding;
var cb=entry.callback;
var len=state.objectMode?1:chunk.length;

doWrite(stream,state,false,len,chunk,encoding,cb);
entry=entry.next;




if(state.writing){
break;
}
}

if(entry===null)state.lastBufferedRequest=null;
}

state.bufferedRequestCount=0;
state.bufferedRequest=entry;
state.bufferProcessing=false;
}

Writable.prototype._write=function(chunk,encoding,cb){
cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev=null;

Writable.prototype.end=function(chunk,encoding,cb){
var state=this._writableState;

if(typeof chunk==='function'){
cb=chunk;
chunk=null;
encoding=null;
}else if(typeof encoding==='function'){
cb=encoding;
encoding=null;
}

if(chunk!==null&&chunk!==undefined)this.write(chunk,encoding);


if(state.corked){
state.corked=1;
this.uncork();
}


if(!state.ending&&!state.finished)endWritable(this,state,cb);
};

function needFinish(state){
return state.ending&&state.length===0&&state.bufferedRequest===null&&!state.finished&&!state.writing;
}

function prefinish(stream,state){
if(!state.prefinished){
state.prefinished=true;
stream.emit('prefinish');
}
}

function finishMaybe(stream,state){
var need=needFinish(state);
if(need){
if(state.pendingcb===0){
prefinish(stream,state);
state.finished=true;
stream.emit('finish');
}else{
prefinish(stream,state);
}
}
return need;
}

function endWritable(stream,state,cb){
state.ending=true;
finishMaybe(stream,state);
if(cb){
if(state.finished)processNextTick(cb);else stream.once('finish',cb);
}
state.ended=true;
stream.writable=false;
}



function CorkedRequest(state){
var _this=this;

this.next=null;
this.entry=null;
this.finish=function(err){
var entry=_this.entry;
_this.entry=null;
while(entry){
var cb=entry.callback;
state.pendingcb--;
cb(err);
entry=entry.next;
}
if(state.corkedRequestsFree){
state.corkedRequestsFree.next=_this;
}else{
state.corkedRequestsFree=_this;
}
};
}
}).call(this,require(58));
},{"11":11,"4":4,"5":5,"57":57,"58":58,"64":64,"7":7,"70":70,"80":80}],69:[function(require,module,exports){
'use strict';

var Buffer=require(5).Buffer;

var bufferShim=require(4);


module.exports=BufferList;

function BufferList(){
this.head=null;
this.tail=null;
this.length=0;
}

BufferList.prototype.push=function(v){
var entry={data:v,next:null};
if(this.length>0)this.tail.next=entry;else this.head=entry;
this.tail=entry;
++this.length;
};

BufferList.prototype.unshift=function(v){
var entry={data:v,next:this.head};
if(this.length===0)this.tail=entry;
this.head=entry;
++this.length;
};

BufferList.prototype.shift=function(){
if(this.length===0)return;
var ret=this.head.data;
if(this.length===1)this.head=this.tail=null;else this.head=this.head.next;
--this.length;
return ret;
};

BufferList.prototype.clear=function(){
this.head=this.tail=null;
this.length=0;
};

BufferList.prototype.join=function(s){
if(this.length===0)return'';
var p=this.head;
var ret=''+p.data;
while(p=p.next){
ret+=s+p.data;
}return ret;
};

BufferList.prototype.concat=function(n){
if(this.length===0)return bufferShim.alloc(0);
if(this.length===1)return this.head.data;
var ret=bufferShim.allocUnsafe(n>>>0);
var p=this.head;
var i=0;
while(p){
p.data.copy(ret,i);
i+=p.data.length;
p=p.next;
}
return ret;
};
},{"4":4,"5":5}],70:[function(require,module,exports){
module.exports=require(8).EventEmitter;

},{"8":8}],71:[function(require,module,exports){
exports=module.exports=require(66);
exports.Stream=exports;
exports.Readable=exports;
exports.Writable=require(68);
exports.Duplex=require(64);
exports.Transform=require(67);
exports.PassThrough=require(65);

},{"64":64,"65":65,"66":66,"67":67,"68":68}],72:[function(require,module,exports){
(function(global){
var ClientRequest=require(74);
var extend=require(81);
var statusCodes=require(6);
var url=require(78);

var http=exports;

http.request=function(opts,cb){
if(typeof opts==='string')
opts=url.parse(opts);else

opts=extend(opts);




var defaultProtocol=global.location.protocol.search(/^https?:$/)===-1?'http:':'';

var protocol=opts.protocol||defaultProtocol;
var host=opts.hostname||opts.host;
var port=opts.port;
var path=opts.path||'/';


if(host&&host.indexOf(':')!==-1)
host='['+host+']';


opts.url=(host?protocol+'//'+host:'')+(port?':'+port:'')+path;
opts.method=(opts.method||'GET').toUpperCase();
opts.headers=opts.headers||{};



var req=new ClientRequest(opts);
if(cb)
req.on('response',cb);
return req;
};

http.get=function get(opts,cb){
var req=http.request(opts,cb);
req.end();
return req;
};

http.Agent=function(){};
http.Agent.defaultMaxSockets=4;

http.STATUS_CODES=statusCodes;

http.METHODS=[
'CHECKOUT',
'CONNECT',
'COPY',
'DELETE',
'GET',
'HEAD',
'LOCK',
'M-SEARCH',
'MERGE',
'MKACTIVITY',
'MKCOL',
'MOVE',
'NOTIFY',
'OPTIONS',
'PATCH',
'POST',
'PROPFIND',
'PROPPATCH',
'PURGE',
'PUT',
'REPORT',
'SEARCH',
'SUBSCRIBE',
'TRACE',
'UNLOCK',
'UNSUBSCRIBE'];

}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});
},{"6":6,"74":74,"78":78,"81":81}],73:[function(require,module,exports){
(function(global){
exports.fetch=isFunction(global.fetch)&&isFunction(global.ReadableStream);

exports.blobConstructor=false;
try{
new Blob([new ArrayBuffer(1)]);
exports.blobConstructor=true;
}catch(e){}




var xhr;
function getXHR(){

if(xhr!==undefined)return xhr;

if(global.XMLHttpRequest){
xhr=new global.XMLHttpRequest();



try{
xhr.open('GET',global.XDomainRequest?'/':'https://example.com');
}catch(e){
xhr=null;
}
}else{

xhr=null;
}
return xhr;
}

function checkTypeSupport(type){
var xhr=getXHR();
if(!xhr)return false;
try{
xhr.responseType=type;
return xhr.responseType===type;
}catch(e){}
return false;
}



var haveArrayBuffer=typeof global.ArrayBuffer!=='undefined';
var haveSlice=haveArrayBuffer&&isFunction(global.ArrayBuffer.prototype.slice);



exports.arraybuffer=exports.fetch||haveArrayBuffer&&checkTypeSupport('arraybuffer');



exports.msstream=!exports.fetch&&haveSlice&&checkTypeSupport('ms-stream');
exports.mozchunkedarraybuffer=!exports.fetch&&haveArrayBuffer&&
checkTypeSupport('moz-chunked-arraybuffer');



exports.overrideMimeType=exports.fetch||(getXHR()?isFunction(getXHR().overrideMimeType):false);

exports.vbArray=isFunction(global.VBArray);

function isFunction(value){
return typeof value==='function';
}

xhr=null;

}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});
},{}],74:[function(require,module,exports){
(function(process,global,Buffer){
var capability=require(73);
var inherits=require(11);
var response=require(75);
var stream=require(71);
var toArrayBuffer=require(77);

var IncomingMessage=response.IncomingMessage;
var rStates=response.readyStates;

function decideMode(preferBinary,useFetch){
if(capability.fetch&&useFetch){
return'fetch';
}else if(capability.mozchunkedarraybuffer){
return'moz-chunked-arraybuffer';
}else if(capability.msstream){
return'ms-stream';
}else if(capability.arraybuffer&&preferBinary){
return'arraybuffer';
}else if(capability.vbArray&&preferBinary){
return'text:vbarray';
}else{
return'text';
}
}

var ClientRequest=module.exports=function(opts){
var self=this;
stream.Writable.call(self);

self._opts=opts;
self._body=[];
self._headers={};
if(opts.auth)
self.setHeader('Authorization','Basic '+new Buffer(opts.auth).toString('base64'));
Object.keys(opts.headers).forEach(function(name){
self.setHeader(name,opts.headers[name]);
});

var preferBinary;
var useFetch=true;
if(opts.mode==='disable-fetch'||'timeout'in opts){


useFetch=false;
preferBinary=true;
}else if(opts.mode==='prefer-streaming'){


preferBinary=false;
}else if(opts.mode==='allow-wrong-content-type'){

preferBinary=!capability.overrideMimeType;
}else if(!opts.mode||opts.mode==='default'||opts.mode==='prefer-fast'){

preferBinary=true;
}else{
throw new Error('Invalid value for opts.mode');
}
self._mode=decideMode(preferBinary,useFetch);

self.on('finish',function(){
self._onFinish();
});
};

inherits(ClientRequest,stream.Writable);

ClientRequest.prototype.setHeader=function(name,value){
var self=this;
var lowerName=name.toLowerCase();



if(unsafeHeaders.indexOf(lowerName)!==-1)
return;

self._headers[lowerName]={
name:name,
value:value};

};

ClientRequest.prototype.getHeader=function(name){
var self=this;
return self._headers[name.toLowerCase()].value;
};

ClientRequest.prototype.removeHeader=function(name){
var self=this;
delete self._headers[name.toLowerCase()];
};

ClientRequest.prototype._onFinish=function(){
var self=this;

if(self._destroyed)
return;
var opts=self._opts;

var headersObj=self._headers;
var body=null;
if(opts.method!=='GET'&&opts.method!=='HEAD'){
if(capability.blobConstructor){
body=new global.Blob(self._body.map(function(buffer){
return toArrayBuffer(buffer);
}),{
type:(headersObj['content-type']||{}).value||''});

}else{

body=Buffer.concat(self._body).toString();
}
}


var headersList=[];
Object.keys(headersObj).forEach(function(keyName){
var name=headersObj[keyName].name;
var value=headersObj[keyName].value;
if(Array.isArray(value)){
value.forEach(function(v){
headersList.push([name,v]);
});
}else{
headersList.push([name,value]);
}
});

if(self._mode==='fetch'){
global.fetch(self._opts.url,{
method:self._opts.method,
headers:headersList,
body:body||undefined,
mode:'cors',
credentials:opts.withCredentials?'include':'same-origin'}).
then(function(response){
self._fetchResponse=response;
self._connect();
},function(reason){
self.emit('error',reason);
});
}else{
var xhr=self._xhr=new global.XMLHttpRequest();
try{
xhr.open(self._opts.method,self._opts.url,true);
}catch(err){
process.nextTick(function(){
self.emit('error',err);
});
return;
}


if('responseType'in xhr)
xhr.responseType=self._mode.split(':')[0];

if('withCredentials'in xhr)
xhr.withCredentials=!!opts.withCredentials;

if(self._mode==='text'&&'overrideMimeType'in xhr)
xhr.overrideMimeType('text/plain; charset=x-user-defined');

if('timeout'in opts){
xhr.timeout=opts.timeout;
xhr.ontimeout=function(){
self.emit('timeout');
};
}

headersList.forEach(function(header){
xhr.setRequestHeader(header[0],header[1]);
});

self._response=null;
xhr.onreadystatechange=function(){
switch(xhr.readyState){
case rStates.LOADING:
case rStates.DONE:
self._onXHRProgress();
break;}

};


if(self._mode==='moz-chunked-arraybuffer'){
xhr.onprogress=function(){
self._onXHRProgress();
};
}

xhr.onerror=function(){
if(self._destroyed)
return;
self.emit('error',new Error('XHR error'));
};

try{
xhr.send(body);
}catch(err){
process.nextTick(function(){
self.emit('error',err);
});
return;
}
}
};






function statusValid(xhr){
try{
var status=xhr.status;
return status!==null&&status!==0;
}catch(e){
return false;
}
}

ClientRequest.prototype._onXHRProgress=function(){
var self=this;

if(!statusValid(self._xhr)||self._destroyed)
return;

if(!self._response)
self._connect();

self._response._onXHRProgress();
};

ClientRequest.prototype._connect=function(){
var self=this;

if(self._destroyed)
return;

self._response=new IncomingMessage(self._xhr,self._fetchResponse,self._mode);
self._response.on('error',function(err){
self.emit('error',err);
});

self.emit('response',self._response);
};

ClientRequest.prototype._write=function(chunk,encoding,cb){
var self=this;

self._body.push(chunk);
cb();
};

ClientRequest.prototype.abort=ClientRequest.prototype.destroy=function(){
var self=this;
self._destroyed=true;
if(self._response)
self._response._destroyed=true;
if(self._xhr)
self._xhr.abort();


};

ClientRequest.prototype.end=function(data,encoding,cb){
var self=this;
if(typeof data==='function'){
cb=data;
data=undefined;
}

stream.Writable.prototype.end.call(self,data,encoding,cb);
};

ClientRequest.prototype.flushHeaders=function(){};
ClientRequest.prototype.setTimeout=function(){};
ClientRequest.prototype.setNoDelay=function(){};
ClientRequest.prototype.setSocketKeepAlive=function(){};


var unsafeHeaders=[
'accept-charset',
'accept-encoding',
'access-control-request-headers',
'access-control-request-method',
'connection',
'content-length',
'cookie',
'cookie2',
'date',
'dnt',
'expect',
'host',
'keep-alive',
'origin',
'referer',
'te',
'trailer',
'transfer-encoding',
'upgrade',
'user-agent',
'via'];


}).call(this,require(58),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require(5).Buffer);
},{"11":11,"5":5,"58":58,"71":71,"73":73,"75":75,"77":77}],75:[function(require,module,exports){
(function(process,global,Buffer){
var capability=require(73);
var inherits=require(11);
var stream=require(71);

var rStates=exports.readyStates={
UNSENT:0,
OPENED:1,
HEADERS_RECEIVED:2,
LOADING:3,
DONE:4};


var IncomingMessage=exports.IncomingMessage=function(xhr,response,mode){
var self=this;
stream.Readable.call(self);

self._mode=mode;
self.headers={};
self.rawHeaders=[];
self.trailers={};
self.rawTrailers=[];


self.on('end',function(){

process.nextTick(function(){
self.emit('close');
});
});

if(mode==='fetch'){var














read=function read(){
reader.read().then(function(result){
if(self._destroyed)
return;
if(result.done){
self.push(null);
return;
}
self.push(new Buffer(result.value));
read();
}).catch(function(err){
self.emit('error',err);
});
};self._fetchResponse=response;self.url=response.url;self.statusCode=response.status;self.statusMessage=response.statusText;response.headers.forEach(function(header,key){self.headers[key.toLowerCase()]=header;self.rawHeaders.push(key,header);});var reader=response.body.getReader();
read();

}else{
self._xhr=xhr;
self._pos=0;

self.url=xhr.responseURL;
self.statusCode=xhr.status;
self.statusMessage=xhr.statusText;
var headers=xhr.getAllResponseHeaders().split(/\r?\n/);
headers.forEach(function(header){
var matches=header.match(/^([^:]+):\s*(.*)/);
if(matches){
var key=matches[1].toLowerCase();
if(key==='set-cookie'){
if(self.headers[key]===undefined){
self.headers[key]=[];
}
self.headers[key].push(matches[2]);
}else if(self.headers[key]!==undefined){
self.headers[key]+=', '+matches[2];
}else{
self.headers[key]=matches[2];
}
self.rawHeaders.push(matches[1],matches[2]);
}
});

self._charset='x-user-defined';
if(!capability.overrideMimeType){
var mimeType=self.rawHeaders['mime-type'];
if(mimeType){
var charsetMatch=mimeType.match(/;\s*charset=([^;])(;|$)/);
if(charsetMatch){
self._charset=charsetMatch[1].toLowerCase();
}
}
if(!self._charset)
self._charset='utf-8';
}
}
};

inherits(IncomingMessage,stream.Readable);

IncomingMessage.prototype._read=function(){};

IncomingMessage.prototype._onXHRProgress=function(){
var self=this;

var xhr=self._xhr;

var response=null;
switch(self._mode){
case'text:vbarray':
if(xhr.readyState!==rStates.DONE)
break;
try{

response=new global.VBArray(xhr.responseBody).toArray();
}catch(e){}
if(response!==null){
self.push(new Buffer(response));
break;
}

case'text':
try{
response=xhr.responseText;
}catch(e){
self._mode='text:vbarray';
break;
}
if(response.length>self._pos){
var newData=response.substr(self._pos);
if(self._charset==='x-user-defined'){
var buffer=new Buffer(newData.length);
for(var i=0;i<newData.length;i++){
buffer[i]=newData.charCodeAt(i)&0xff;}

self.push(buffer);
}else{
self.push(newData,self._charset);
}
self._pos=response.length;
}
break;
case'arraybuffer':
if(xhr.readyState!==rStates.DONE||!xhr.response)
break;
response=xhr.response;
self.push(new Buffer(new Uint8Array(response)));
break;
case'moz-chunked-arraybuffer':
response=xhr.response;
if(xhr.readyState!==rStates.LOADING||!response)
break;
self.push(new Buffer(new Uint8Array(response)));
break;
case'ms-stream':
response=xhr.response;
if(xhr.readyState!==rStates.LOADING)
break;
var reader=new global.MSStreamReader();
reader.onprogress=function(){
if(reader.result.byteLength>self._pos){
self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))));
self._pos=reader.result.byteLength;
}
};
reader.onload=function(){
self.push(null);
};

reader.readAsArrayBuffer(response);
break;}



if(self._xhr.readyState===rStates.DONE&&self._mode!=='ms-stream'){
self.push(null);
}
};

}).call(this,require(58),typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{},require(5).Buffer);
},{"11":11,"5":5,"58":58,"71":71,"73":73}],76:[function(require,module,exports){
'use strict';

var Buffer=require(5).Buffer;
var bufferShim=require(4);

var isEncoding=Buffer.isEncoding||function(encoding){
encoding=''+encoding;
switch(encoding&&encoding.toLowerCase()){
case'hex':case'utf8':case'utf-8':case'ascii':case'binary':case'base64':case'ucs2':case'ucs-2':case'utf16le':case'utf-16le':case'raw':
return true;
default:
return false;}

};

function _normalizeEncoding(enc){
if(!enc)return'utf8';
var retried;
while(true){
switch(enc){
case'utf8':
case'utf-8':
return'utf8';
case'ucs2':
case'ucs-2':
case'utf16le':
case'utf-16le':
return'utf16le';
case'latin1':
case'binary':
return'latin1';
case'base64':
case'ascii':
case'hex':
return enc;
default:
if(retried)return;
enc=(''+enc).toLowerCase();
retried=true;}

}
};



function normalizeEncoding(enc){
var nenc=_normalizeEncoding(enc);
if(typeof nenc!=='string'&&(Buffer.isEncoding===isEncoding||!isEncoding(enc)))throw new Error('Unknown encoding: '+enc);
return nenc||enc;
}




exports.StringDecoder=StringDecoder;
function StringDecoder(encoding){
this.encoding=normalizeEncoding(encoding);
var nb;
switch(this.encoding){
case'utf16le':
this.text=utf16Text;
this.end=utf16End;
nb=4;
break;
case'utf8':
this.fillLast=utf8FillLast;
nb=4;
break;
case'base64':
this.text=base64Text;
this.end=base64End;
nb=3;
break;
default:
this.write=simpleWrite;
this.end=simpleEnd;
return;}

this.lastNeed=0;
this.lastTotal=0;
this.lastChar=bufferShim.allocUnsafe(nb);
}

StringDecoder.prototype.write=function(buf){
if(buf.length===0)return'';
var r;
var i;
if(this.lastNeed){
r=this.fillLast(buf);
if(r===undefined)return'';
i=this.lastNeed;
this.lastNeed=0;
}else{
i=0;
}
if(i<buf.length)return r?r+this.text(buf,i):this.text(buf,i);
return r||'';
};

StringDecoder.prototype.end=utf8End;


StringDecoder.prototype.text=utf8Text;


StringDecoder.prototype.fillLast=function(buf){
if(this.lastNeed<=buf.length){
buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed);
return this.lastChar.toString(this.encoding,0,this.lastTotal);
}
buf.copy(this.lastChar,this.lastTotal-this.lastNeed,0,buf.length);
this.lastNeed-=buf.length;
};



function utf8CheckByte(byte){
if(byte<=0x7F)return 0;else if(byte>>5===0x06)return 2;else if(byte>>4===0x0E)return 3;else if(byte>>3===0x1E)return 4;
return-1;
}




function utf8CheckIncomplete(self,buf,i){
var j=buf.length-1;
if(j<i)return 0;
var nb=utf8CheckByte(buf[j]);
if(nb>=0){
if(nb>0)self.lastNeed=nb-1;
return nb;
}
if(--j<i)return 0;
nb=utf8CheckByte(buf[j]);
if(nb>=0){
if(nb>0)self.lastNeed=nb-2;
return nb;
}
if(--j<i)return 0;
nb=utf8CheckByte(buf[j]);
if(nb>=0){
if(nb>0){
if(nb===2)nb=0;else self.lastNeed=nb-3;
}
return nb;
}
return 0;
}









function utf8CheckExtraBytes(self,buf,p){
if((buf[0]&0xC0)!==0x80){
self.lastNeed=0;
return"\uFFFD".repeat(p);
}
if(self.lastNeed>1&&buf.length>1){
if((buf[1]&0xC0)!==0x80){
self.lastNeed=1;
return"\uFFFD".repeat(p+1);
}
if(self.lastNeed>2&&buf.length>2){
if((buf[2]&0xC0)!==0x80){
self.lastNeed=2;
return"\uFFFD".repeat(p+2);
}
}
}
}


function utf8FillLast(buf){
var p=this.lastTotal-this.lastNeed;
var r=utf8CheckExtraBytes(this,buf,p);
if(r!==undefined)return r;
if(this.lastNeed<=buf.length){
buf.copy(this.lastChar,p,0,this.lastNeed);
return this.lastChar.toString(this.encoding,0,this.lastTotal);
}
buf.copy(this.lastChar,p,0,buf.length);
this.lastNeed-=buf.length;
}




function utf8Text(buf,i){
var total=utf8CheckIncomplete(this,buf,i);
if(!this.lastNeed)return buf.toString('utf8',i);
this.lastTotal=total;
var end=buf.length-(total-this.lastNeed);
buf.copy(this.lastChar,0,end);
return buf.toString('utf8',i,end);
}



function utf8End(buf){
var r=buf&&buf.length?this.write(buf):'';
if(this.lastNeed)return r+"\uFFFD".repeat(this.lastTotal-this.lastNeed);
return r;
}





function utf16Text(buf,i){
if((buf.length-i)%2===0){
var r=buf.toString('utf16le',i);
if(r){
var c=r.charCodeAt(r.length-1);
if(c>=0xD800&&c<=0xDBFF){
this.lastNeed=2;
this.lastTotal=4;
this.lastChar[0]=buf[buf.length-2];
this.lastChar[1]=buf[buf.length-1];
return r.slice(0,-1);
}
}
return r;
}
this.lastNeed=1;
this.lastTotal=2;
this.lastChar[0]=buf[buf.length-1];
return buf.toString('utf16le',i,buf.length-1);
}



function utf16End(buf){
var r=buf&&buf.length?this.write(buf):'';
if(this.lastNeed){
var end=this.lastTotal-this.lastNeed;
return r+this.lastChar.toString('utf16le',0,end);
}
return r;
}

function base64Text(buf,i){
var n=(buf.length-i)%3;
if(n===0)return buf.toString('base64',i);
this.lastNeed=3-n;
this.lastTotal=3;
if(n===1){
this.lastChar[0]=buf[buf.length-1];
}else{
this.lastChar[0]=buf[buf.length-2];
this.lastChar[1]=buf[buf.length-1];
}
return buf.toString('base64',i,buf.length-n);
}

function base64End(buf){
var r=buf&&buf.length?this.write(buf):'';
if(this.lastNeed)return r+this.lastChar.toString('base64',0,3-this.lastNeed);
return r;
}


function simpleWrite(buf){
return buf.toString(this.encoding);
}

function simpleEnd(buf){
return buf&&buf.length?this.write(buf):'';
}
},{"4":4,"5":5}],77:[function(require,module,exports){
var Buffer=require(5).Buffer;

module.exports=function(buf){

if(buf instanceof Uint8Array){

if(buf.byteOffset===0&&buf.byteLength===buf.buffer.byteLength){
return buf.buffer;
}else if(typeof buf.buffer.slice==='function'){

return buf.buffer.slice(buf.byteOffset,buf.byteOffset+buf.byteLength);
}
}

if(Buffer.isBuffer(buf)){


var arrayCopy=new Uint8Array(buf.length);
var len=buf.length;
for(var i=0;i<len;i++){
arrayCopy[i]=buf[i];
}
return arrayCopy.buffer;
}else{
throw new Error('Argument must be a Buffer');
}
};

},{"5":5}],78:[function(require,module,exports){





















'use strict';

var punycode=require(59);
var util=require(79);

exports.parse=urlParse;
exports.resolve=urlResolve;
exports.resolveObject=urlResolveObject;
exports.format=urlFormat;

exports.Url=Url;

function Url(){
this.protocol=null;
this.slashes=null;
this.auth=null;
this.host=null;
this.port=null;
this.hostname=null;
this.hash=null;
this.search=null;
this.query=null;
this.pathname=null;
this.path=null;
this.href=null;
}





var protocolPattern=/^([a-z0-9.+-]+:)/i,
portPattern=/:[0-9]*$/,


simplePathPattern=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,



delims=['<','>','"','`',' ','\r','\n','\t'],


unwise=['{','}','|','\\','^','`'].concat(delims),


autoEscape=['\''].concat(unwise),




nonHostChars=['%','/','?',';','#'].concat(autoEscape),
hostEndingChars=['/','?','#'],
hostnameMaxLen=255,
hostnamePartPattern=/^[+a-z0-9A-Z_-]{0,63}$/,
hostnamePartStart=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,

unsafeProtocol={
'javascript':true,
'javascript:':true},


hostlessProtocol={
'javascript':true,
'javascript:':true},


slashedProtocol={
'http':true,
'https':true,
'ftp':true,
'gopher':true,
'file':true,
'http:':true,
'https:':true,
'ftp:':true,
'gopher:':true,
'file:':true},

querystring=require(63);

function urlParse(url,parseQueryString,slashesDenoteHost){
if(url&&util.isObject(url)&&url instanceof Url)return url;

var u=new Url();
u.parse(url,parseQueryString,slashesDenoteHost);
return u;
}

Url.prototype.parse=function(url,parseQueryString,slashesDenoteHost){
if(!util.isString(url)){
throw new TypeError("Parameter 'url' must be a string, not "+(typeof url==="undefined"?"undefined":_typeof2(url)));
}




var queryIndex=url.indexOf('?'),
splitter=
queryIndex!==-1&&queryIndex<url.indexOf('#')?'?':'#',
uSplit=url.split(splitter),
slashRegex=/\\/g;
uSplit[0]=uSplit[0].replace(slashRegex,'/');
url=uSplit.join(splitter);

var rest=url;



rest=rest.trim();

if(!slashesDenoteHost&&url.split('#').length===1){

var simplePath=simplePathPattern.exec(rest);
if(simplePath){
this.path=rest;
this.href=rest;
this.pathname=simplePath[1];
if(simplePath[2]){
this.search=simplePath[2];
if(parseQueryString){
this.query=querystring.parse(this.search.substr(1));
}else{
this.query=this.search.substr(1);
}
}else if(parseQueryString){
this.search='';
this.query={};
}
return this;
}
}

var proto=protocolPattern.exec(rest);
if(proto){
proto=proto[0];
var lowerProto=proto.toLowerCase();
this.protocol=lowerProto;
rest=rest.substr(proto.length);
}





if(slashesDenoteHost||proto||rest.match(/^\/\/[^@\/]+@[^@\/]+/)){
var slashes=rest.substr(0,2)==='//';
if(slashes&&!(proto&&hostlessProtocol[proto])){
rest=rest.substr(2);
this.slashes=true;
}
}

if(!hostlessProtocol[proto]&&(
slashes||proto&&!slashedProtocol[proto])){

















var hostEnd=-1;
for(var i=0;i<hostEndingChars.length;i++){
var hec=rest.indexOf(hostEndingChars[i]);
if(hec!==-1&&(hostEnd===-1||hec<hostEnd))
hostEnd=hec;
}



var auth,atSign;
if(hostEnd===-1){

atSign=rest.lastIndexOf('@');
}else{


atSign=rest.lastIndexOf('@',hostEnd);
}



if(atSign!==-1){
auth=rest.slice(0,atSign);
rest=rest.slice(atSign+1);
this.auth=decodeURIComponent(auth);
}


hostEnd=-1;
for(var i=0;i<nonHostChars.length;i++){
var hec=rest.indexOf(nonHostChars[i]);
if(hec!==-1&&(hostEnd===-1||hec<hostEnd))
hostEnd=hec;
}

if(hostEnd===-1)
hostEnd=rest.length;

this.host=rest.slice(0,hostEnd);
rest=rest.slice(hostEnd);


this.parseHost();



this.hostname=this.hostname||'';



var ipv6Hostname=this.hostname[0]==='['&&
this.hostname[this.hostname.length-1]===']';


if(!ipv6Hostname){
var hostparts=this.hostname.split(/\./);
for(var i=0,l=hostparts.length;i<l;i++){
var part=hostparts[i];
if(!part)continue;
if(!part.match(hostnamePartPattern)){
var newpart='';
for(var j=0,k=part.length;j<k;j++){
if(part.charCodeAt(j)>127){



newpart+='x';
}else{
newpart+=part[j];
}
}

if(!newpart.match(hostnamePartPattern)){
var validParts=hostparts.slice(0,i);
var notHost=hostparts.slice(i+1);
var bit=part.match(hostnamePartStart);
if(bit){
validParts.push(bit[1]);
notHost.unshift(bit[2]);
}
if(notHost.length){
rest='/'+notHost.join('.')+rest;
}
this.hostname=validParts.join('.');
break;
}
}
}
}

if(this.hostname.length>hostnameMaxLen){
this.hostname='';
}else{

this.hostname=this.hostname.toLowerCase();
}

if(!ipv6Hostname){




this.hostname=punycode.toASCII(this.hostname);
}

var p=this.port?':'+this.port:'';
var h=this.hostname||'';
this.host=h+p;
this.href+=this.host;



if(ipv6Hostname){
this.hostname=this.hostname.substr(1,this.hostname.length-2);
if(rest[0]!=='/'){
rest='/'+rest;
}
}
}



if(!unsafeProtocol[lowerProto]){




for(var i=0,l=autoEscape.length;i<l;i++){
var ae=autoEscape[i];
if(rest.indexOf(ae)===-1)
continue;
var esc=encodeURIComponent(ae);
if(esc===ae){
esc=escape(ae);
}
rest=rest.split(ae).join(esc);
}
}



var hash=rest.indexOf('#');
if(hash!==-1){

this.hash=rest.substr(hash);
rest=rest.slice(0,hash);
}
var qm=rest.indexOf('?');
if(qm!==-1){
this.search=rest.substr(qm);
this.query=rest.substr(qm+1);
if(parseQueryString){
this.query=querystring.parse(this.query);
}
rest=rest.slice(0,qm);
}else if(parseQueryString){

this.search='';
this.query={};
}
if(rest)this.pathname=rest;
if(slashedProtocol[lowerProto]&&
this.hostname&&!this.pathname){
this.pathname='/';
}


if(this.pathname||this.search){
var p=this.pathname||'';
var s=this.search||'';
this.path=p+s;
}


this.href=this.format();
return this;
};


function urlFormat(obj){




if(util.isString(obj))obj=urlParse(obj);
if(!(obj instanceof Url))return Url.prototype.format.call(obj);
return obj.format();
}

Url.prototype.format=function(){
var auth=this.auth||'';
if(auth){
auth=encodeURIComponent(auth);
auth=auth.replace(/%3A/i,':');
auth+='@';
}

var protocol=this.protocol||'',
pathname=this.pathname||'',
hash=this.hash||'',
host=false,
query='';

if(this.host){
host=auth+this.host;
}else if(this.hostname){
host=auth+(this.hostname.indexOf(':')===-1?
this.hostname:
'['+this.hostname+']');
if(this.port){
host+=':'+this.port;
}
}

if(this.query&&
util.isObject(this.query)&&
Object.keys(this.query).length){
query=querystring.stringify(this.query);
}

var search=this.search||query&&'?'+query||'';

if(protocol&&protocol.substr(-1)!==':')protocol+=':';



if(this.slashes||
(!protocol||slashedProtocol[protocol])&&host!==false){
host='//'+(host||'');
if(pathname&&pathname.charAt(0)!=='/')pathname='/'+pathname;
}else if(!host){
host='';
}

if(hash&&hash.charAt(0)!=='#')hash='#'+hash;
if(search&&search.charAt(0)!=='?')search='?'+search;

pathname=pathname.replace(/[?#]/g,function(match){
return encodeURIComponent(match);
});
search=search.replace('#','%23');

return protocol+host+pathname+search+hash;
};

function urlResolve(source,relative){
return urlParse(source,false,true).resolve(relative);
}

Url.prototype.resolve=function(relative){
return this.resolveObject(urlParse(relative,false,true)).format();
};

function urlResolveObject(source,relative){
if(!source)return relative;
return urlParse(source,false,true).resolveObject(relative);
}

Url.prototype.resolveObject=function(relative){
if(util.isString(relative)){
var rel=new Url();
rel.parse(relative,false,true);
relative=rel;
}

var result=new Url();
var tkeys=Object.keys(this);
for(var tk=0;tk<tkeys.length;tk++){
var tkey=tkeys[tk];
result[tkey]=this[tkey];
}



result.hash=relative.hash;


if(relative.href===''){
result.href=result.format();
return result;
}


if(relative.slashes&&!relative.protocol){

var rkeys=Object.keys(relative);
for(var rk=0;rk<rkeys.length;rk++){
var rkey=rkeys[rk];
if(rkey!=='protocol')
result[rkey]=relative[rkey];
}


if(slashedProtocol[result.protocol]&&
result.hostname&&!result.pathname){
result.path=result.pathname='/';
}

result.href=result.format();
return result;
}

if(relative.protocol&&relative.protocol!==result.protocol){








if(!slashedProtocol[relative.protocol]){
var keys=Object.keys(relative);
for(var v=0;v<keys.length;v++){
var k=keys[v];
result[k]=relative[k];
}
result.href=result.format();
return result;
}

result.protocol=relative.protocol;
if(!relative.host&&!hostlessProtocol[relative.protocol]){
var relPath=(relative.pathname||'').split('/');
while(relPath.length&&!(relative.host=relPath.shift())){}
if(!relative.host)relative.host='';
if(!relative.hostname)relative.hostname='';
if(relPath[0]!=='')relPath.unshift('');
if(relPath.length<2)relPath.unshift('');
result.pathname=relPath.join('/');
}else{
result.pathname=relative.pathname;
}
result.search=relative.search;
result.query=relative.query;
result.host=relative.host||'';
result.auth=relative.auth;
result.hostname=relative.hostname||relative.host;
result.port=relative.port;

if(result.pathname||result.search){
var p=result.pathname||'';
var s=result.search||'';
result.path=p+s;
}
result.slashes=result.slashes||relative.slashes;
result.href=result.format();
return result;
}

var isSourceAbs=result.pathname&&result.pathname.charAt(0)==='/',
isRelAbs=
relative.host||
relative.pathname&&relative.pathname.charAt(0)==='/',

mustEndAbs=isRelAbs||isSourceAbs||
result.host&&relative.pathname,
removeAllDots=mustEndAbs,
srcPath=result.pathname&&result.pathname.split('/')||[],
relPath=relative.pathname&&relative.pathname.split('/')||[],
psychotic=result.protocol&&!slashedProtocol[result.protocol];






if(psychotic){
result.hostname='';
result.port=null;
if(result.host){
if(srcPath[0]==='')srcPath[0]=result.host;else
srcPath.unshift(result.host);
}
result.host='';
if(relative.protocol){
relative.hostname=null;
relative.port=null;
if(relative.host){
if(relPath[0]==='')relPath[0]=relative.host;else
relPath.unshift(relative.host);
}
relative.host=null;
}
mustEndAbs=mustEndAbs&&(relPath[0]===''||srcPath[0]==='');
}

if(isRelAbs){

result.host=relative.host||relative.host===''?
relative.host:result.host;
result.hostname=relative.hostname||relative.hostname===''?
relative.hostname:result.hostname;
result.search=relative.search;
result.query=relative.query;
srcPath=relPath;

}else if(relPath.length){


if(!srcPath)srcPath=[];
srcPath.pop();
srcPath=srcPath.concat(relPath);
result.search=relative.search;
result.query=relative.query;
}else if(!util.isNullOrUndefined(relative.search)){



if(psychotic){
result.hostname=result.host=srcPath.shift();



var authInHost=result.host&&result.host.indexOf('@')>0?
result.host.split('@'):false;
if(authInHost){
result.auth=authInHost.shift();
result.host=result.hostname=authInHost.shift();
}
}
result.search=relative.search;
result.query=relative.query;

if(!util.isNull(result.pathname)||!util.isNull(result.search)){
result.path=(result.pathname?result.pathname:'')+(
result.search?result.search:'');
}
result.href=result.format();
return result;
}

if(!srcPath.length){


result.pathname=null;

if(result.search){
result.path='/'+result.search;
}else{
result.path=null;
}
result.href=result.format();
return result;
}




var last=srcPath.slice(-1)[0];
var hasTrailingSlash=
(result.host||relative.host||srcPath.length>1)&&(
last==='.'||last==='..')||last==='';



var up=0;
for(var i=srcPath.length;i>=0;i--){
last=srcPath[i];
if(last==='.'){
srcPath.splice(i,1);
}else if(last==='..'){
srcPath.splice(i,1);
up++;
}else if(up){
srcPath.splice(i,1);
up--;
}
}


if(!mustEndAbs&&!removeAllDots){
for(;up--;up){
srcPath.unshift('..');
}
}

if(mustEndAbs&&srcPath[0]!==''&&(
!srcPath[0]||srcPath[0].charAt(0)!=='/')){
srcPath.unshift('');
}

if(hasTrailingSlash&&srcPath.join('/').substr(-1)!=='/'){
srcPath.push('');
}

var isAbsolute=srcPath[0]===''||
srcPath[0]&&srcPath[0].charAt(0)==='/';


if(psychotic){
result.hostname=result.host=isAbsolute?'':
srcPath.length?srcPath.shift():'';



var authInHost=result.host&&result.host.indexOf('@')>0?
result.host.split('@'):false;
if(authInHost){
result.auth=authInHost.shift();
result.host=result.hostname=authInHost.shift();
}
}

mustEndAbs=mustEndAbs||result.host&&srcPath.length;

if(mustEndAbs&&!isAbsolute){
srcPath.unshift('');
}

if(!srcPath.length){
result.pathname=null;
result.path=null;
}else{
result.pathname=srcPath.join('/');
}


if(!util.isNull(result.pathname)||!util.isNull(result.search)){
result.path=(result.pathname?result.pathname:'')+(
result.search?result.search:'');
}
result.auth=relative.auth||result.auth;
result.slashes=result.slashes||relative.slashes;
result.href=result.format();
return result;
};

Url.prototype.parseHost=function(){
var host=this.host;
var port=portPattern.exec(host);
if(port){
port=port[0];
if(port!==':'){
this.port=port.substr(1);
}
host=host.substr(0,host.length-port.length);
}
if(host)this.hostname=host;
};

},{"59":59,"63":63,"79":79}],79:[function(require,module,exports){
'use strict';

module.exports={
isString:function isString(arg){
return typeof arg==='string';
},
isObject:function isObject(arg){
return(typeof arg==="undefined"?"undefined":_typeof2(arg))==='object'&&arg!==null;
},
isNull:function isNull(arg){
return arg===null;
},
isNullOrUndefined:function isNullOrUndefined(arg){
return arg==null;
}};


},{}],80:[function(require,module,exports){
(function(global){





module.exports=deprecate;



















function deprecate(fn,msg){
if(config('noDeprecation')){
return fn;
}

var warned=false;
function deprecated(){
if(!warned){
if(config('throwDeprecation')){
throw new Error(msg);
}else if(config('traceDeprecation')){
console.trace(msg);
}else{
console.warn(msg);
}
warned=true;
}
return fn.apply(this,arguments);
}

return deprecated;
}









function config(name){

try{
if(!global.localStorage)return false;
}catch(_){
return false;
}
var val=global.localStorage[name];
if(null==val)return false;
return String(val).toLowerCase()==='true';
}

}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{});
},{}],81:[function(require,module,exports){
module.exports=extend;

var hasOwnProperty=Object.prototype.hasOwnProperty;

function extend(){
var target={};

for(var i=0;i<arguments.length;i++){
var source=arguments[i];

for(var key in source){
if(hasOwnProperty.call(source,key)){
target[key]=source[key];
}
}
}

return target;
}

},{}],82:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Auth";


var _api=Playbasis.authApi={};







_api.auth=function()
{
return new Playbasis.Promise(function(resolve,reject){
http.postJsonAsync(helpers.createApiUrl(apiMethod),{api_key:Playbasis.env.global.apiKey,api_secret:Playbasis.env.global.apiSecret}).
then(function(result){

Playbasis.env.global.token=result.response.token;

resolve(result);
},function(e){reject(e);});
});
};







_api.renew=function()
{
return new Playbasis.Promise(function(resolve,reject){
http.postJsonAsync(helpers.createApiUrl(apiMethod+"/renew"),{api_key:Playbasis.env.global.apiKey,api_secret:Playbasis.env.global.apiSecret}).
then(function(result){

Playbasis.env.global.token=result.response.token;

resolve(result);
},function(e){reject(e);});
});
};
};
},{}],83:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var api=Playbasis.badgeApi={};












api.badgesInfo=function(options)
{

var tags=null;

if(options!=null){
if(options.tags!=null){
tags=options.tags;
}
}
return http.getJsonAsync(helpers.createApiUrl("Badges")+"&"+helpers.joinIfNotNullAsUrlParam("tags",tags));
};








api.badgeInfo=function(badgeId)
{
return http.getJsonAsync(helpers.createApiUrl("Badge",badgeId));
};
};
},{}],84:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var api=Playbasis.communicationApi={};













api.sendEmail=function(playerId,subject,message,templateId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,subject:subject,message:message,template_id:templateId};

return http.postJsonAsync(helpers.createApiUrl("Email/send"),obj);
};














api.sendEmailCoupon=function(playerId,refId,subject,message,templateId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,ref_id:refId,subject:subject,message:message,template_id:templateId};

return http.postJsonAsync(helpers.createApiUrl("Email/goods"),obj);
};













api.listRecentEmailSent=function(playerId,options)
{
var keys=["player_id","since"];
var dvalues=[playerId,null];

return http.getJsonAsync(helpers.createApiUrl("Email/recent")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};







api.listEmailTemplate=function()
{
return http.getJsonAsync(helpers.createApiUrl("Email/template"));
};













api.getProcessedEmailTemplate=function(templateId,options)
{
var keys=["player_id"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl("Email/template",templateId)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};










api.sendSMS=function(playerId,message,templateId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,message:message,template_id:templateId};

return http.postJsonAsync(helpers.createApiUrl("Sms/send"),obj);
};









api.sendSMSCoupon=function(playerId,refId,message,templateId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,ref_id:refId,message:message,template_id:templateId};

return http.postJsonAsync(helpers.createApiUrl("Sms/goods"),obj);
};













api.listRecentSMSSent=function(playerId,options)
{
var keys=["player_id","since"];
var dvalues=[playerId,null];

return http.getJsonAsync(helpers.createApiUrl("Sms/recent")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};







api.listSMSTemplate=function()
{
return http.getJsonAsync(helpers.createApiUrl("Sms/template"));
};













api.getProcessedSMSTemplate=function(templateId,options)
{
var keys=["player_id"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl("Sms/template",templateId)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};












api.registerDevice=function(playerId,deviceToken,deviceDescription,deviceName,osType)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,device_token:deviceToken,device_description:deviceDescription,device_name:deviceName,os_type:osType};

return http.postJsonAsync(helpers.createApiUrl("Push/deviceRegistration"),obj);
};











api.deregisterDevice=function(playerId,deviceToken)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,device_token:deviceToken};

return http.postJsonAsync(helpers.createApiUrl("Push/deviceDeRegistration"),obj);
};










api.sendPushNotification=function(playerId,message,templateId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,message:message,template_id:templateId};

return http.postJsonAsync(helpers.createApiUrl("Push/send"),obj);
};











api.sendPushNotificationCoupon=function(playerId,refId,message,templateId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,message:message,template_id:templateId};

return http.postJsonAsync(helpers.createApiUrl("Push/goods"),obj);
};













api.listRecentPushNotificationSent=function(playerId,options)
{
var keys=["player_id","since"];
var dvalues=[playerId,null];

return http.getJsonAsync(helpers.createApiUrl("Push/recent")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};







api.listPushNotificationTemplate=function()
{
return http.getJsonAsync(helpers.createApiUrl("Push/template"));
};













api.getProcessedPushNotificationTemplate=function(templateId,options)
{
var keys=["player_id"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl("Push/template",templateId)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};
};
},{}],85:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethodUrl="Content";


var api=Playbasis.contentApi={};


























api.retrieveContent=function(options)
{
var keys=["node_id","title","category","date_check","sort","order","offset","limit","full_html","pin","tags","status","player_id","only_new_content","only_new_feedback"];
var dvalues=[null,null,null,"true","title","asc",0,20,"false",null,null,null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};




















api.countContent=function(options)
{
var keys=["title","category","date_check","pin","tags","status","player_id","only_new_content","only_new_feedback"];
var dvalues=[null,null,"false",null,null,null,null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"count")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};

























api.createContent=function(title,summary,detail,options)
{
var obj={token:Playbasis.env.global.token,title:title,summary:summary,detail:detail};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["node_id","category","image","status","date_start","date_end","player_id","pin","tags","key","value"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"addContent"),combineObj);
};
























api.updateContent=function(nodeId,updates)
{
var obj={token:Playbasis.env.global.token};
var selectedOptionsObj=helpers.createObjectFromTarget(updates,["title","summary","detail","category","image","status","date_start","date_end","pin","tags","key","value"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,nodeId,"update"),obj);
};








api.deleteContent=function(nodeId)
{
var obj={token:Playbasis.env.global.token};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,nodeId,"delete"),obj);
};

















api.retrieveCategory=function(options)
{
var keys=["id","name","sort","order","offset","limit"];
var dvalues=[null,null,null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"category")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};








api.createCategory=function(name)
{
var obj={token:Playbasis.env.global.token,name:name};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"category","create"),obj);
};









api.updateCategory=function(id,name)
{
var obj={token:Playbasis.env.global.token,id:id,name:name};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"category","update"),obj);
};








api.deleteCategory=function(id)
{
var obj={token:Playbasis.env.global.token,id:id};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"category","delete"),obj);
};















api.likeContent=function(nodeId,playerId,options)
{
var obj={token:Playbasis.env.global.token};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["key","value"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,nodeId,"player",playerId,"like"),combineObj);
};















api.dislikeContent=function(nodeId,playerId,options)
{
var obj={token:Playbasis.env.global.token};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["key","value"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,nodeId,"player",playerId,"dislike"),combineObj);
};
















api.giveFeedbackContent=function(nodeId,playerId,feedback,options)
{
var obj={token:Playbasis.env.global.token,feedback:feedback};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["key","value"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,nodeId,"player",playerId,"feedback"),combineObj);
};
};
},{}],86:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Engine";


var api=Playbasis.engineApi={};













api.listRules=function(options)
{
var keys=["action","player_id"];
var dvalues=[null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"rules")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};













api.ruleDetail=function(ruleId,options)
{
var keys=["player_id"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"rule",ruleId)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};




















api.rule=function(action,playerId,options)
{
var obj={token:Playbasis.env.global.token,action:action,player_id:playerId};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["url","reward","quantity","rule_id","node_id","session_id"]);
var combinedObj=helpers.combineObjects(obj,selectedOptionsObj);


if(options!=null){
if(options.post_custom_params!=null){
combinedObj=helpers.combineObjects(combinedObj,options.post_custom_params);
}
}

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"rule"),combinedObj);
};
};
},{}],87:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Goods";


var api=Playbasis.goodsApi={};





















api.goodsListInfo=function(options)
{
var keys=["player_id","active_filter","name","date_start","date_end","offset","limit","tags","custom_param","not_custom_param"];
var defaultValues=[null,null,null,null,null,null,null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,defaultValues,options));
};





















api.goodsListInfoWithSelectedFields=function(options)
{
var keys=["player_id","selected_field","active_filter","date_start","date_end","offset","limit","tags","custom_param","not_custom_param"];
var defaultValues=[null,null,null,null,null,null,null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"field")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,defaultValues,options));
};













api.goodsInfo=function(goodsId,options)
{
var keys=["player_id"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,goodsId)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};














api.goodsGroupAvailable=function(playerId,group,options)
{
var keys=["player_id","group","amount"];
var dvalues=[playerId,group,null];

return http.getJsonAsync(helpers.createApiUrl("Redeem","goodsGroup")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};







api.sponsoredGoodsListInfo=function()
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"sponsor"));
};








api.sponsoredGoodsInfo=function(goodsId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"sponsor",goodsId));
};














api.sponsoredGoodsGroupAvailable=function(playerId,group,options)
{
var keys=["player_id","group","amount"];
var dvalues=[playerId,group,null];

return http.getJsonAsync(helpers.createApiUrl("Redeem","sponsorGroup")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};














api.verifyCoupon=function(goodsId,couponCode,options)
{
var keys=["goods_id","coupon_code","player_id"];
var dvalues=[goodsId,couponCode,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"couponVerify")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};










api.verifyCouponWithRedeem=function(goodsId,couponCode,playerId)
{
var postObj={token:Playbasis.env.global.token,goods_id:goodsId,coupon_code:couponCode,player_id:playerId};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"couponVerify"),postObj);
};
};
},{}],88:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethodUrl="Service";


var api=Playbasis.livefeedApi={};

















api.recentActivities=function(options)
{
var keys=["player_id","offset","limit","last_read_activity_id","mode","event_type"];
var dvalues=[null,0,20,null,"all",null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"recentActivities")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};








api.detailActivity=function(activityId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"detailActivityFeed",activityId));
};









api.likeActivity=function(activityId,playerId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"likeActivityFeed",activityId),obj);
};










api.commentActivity=function(activityId,playerId,message)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,message:message};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"commentActivityFeed",activityId),obj);
};
};
},{}],89:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Merchant";


var _api=Playbasis.merchantApi={};








_api.availableBranchForGoodsGroup=function(goodsGroup)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"availableBranchGoodsGroup")+helpers.appendAndJoinIfNotNullAsUrlParam("goods_group",goodsGroup));
};















_api.verifyCoupon=function(goodsGroup,couponCode,options)
{
var keys=["goods_group","coupon_code","pin_code","player_id"];
var dvalues=[goodsGroup,couponCode,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"goodsGroup","verify")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};















_api.redeemCoupon=function(goodsGroup,couponCode,options)
{
var postObj={token:Playbasis.env.global.token,goods_group:goodsGroup,coupon_code:couponCode};
var optionObj=helpers.createObjectFromTarget(options,["pin_code","player_id"]);
var combinedObj=helpers.combineObjects(postObj,optionObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"goodsGroup","redeem"),combinedObj);
};











_api.redeemGoods=function(goodsName,playerId,options)
{
var postObj={token:Playbasis.env.global.token,goods_name:goodsName,player_id:playerId};
var optionObj=helpers.createObjectFromTarget(options,["amount"]);
var combinedObj=helpers.combineObjects(postObj,optionObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"goods","redeem"),combinedObj);
};
};
},{}],90:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Player";


var _api=Playbasis.playerApi={};








_api.playerPublicInfo=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId));
};








_api.playerInfo=function(playerId)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId),{token:Playbasis.env.global.token});
};








_api.listPlayer=function(playerIdArray)
{
var playerIds=playerIdArray.join(",");

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"list"),{token:Playbasis.env.global.token,list_player_id:playerIds});
};








_api.playerDetailedPublicInfo=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"data","all"));
};








_api.playerDetailedInfo=function(playerId)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"data","all"),{token:Playbasis.env.global.token});
};








_api.listCustomFieldsOfPlayer=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"custom"));
};









_api.setCustomFieldOfPlayer=function(playerId,key,value)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"custom"),{token:Playbasis.env.global.token,key:key,value:value});
};


























_api.register=function(playerId,email,options)
{

var obj={token:Playbasis.env.global.token,username:playerId,email:email};


if(options!=null){
for(var k in options){

if(k!="token"&&
k!="username"&&
k!="email"){
obj[k]=options[k];
}
}
}

return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"register"),obj);
};














_api.referral=function(playerId,referralCode,options)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,referral_code:referralCode};


if(options!=null){
for(var k in options){

if(k!="token"&&
k!="player_id"&&
k!="referral_code"){
obj[k]=options[k];
}
}
}

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"referral"),obj);
};



























_api.update=function(playerId,updates)
{

var obj={token:Playbasis.env.global.token};
var selectiveUpdatesObj=helpers.createObjectFromTarget(updates,["username","email","image","phone_number","exp","level","facebook_id","twitter_id","password","first_name","last_name","gender","birth_date","device_id"]);
var combinedObj=helpers.combineObjects(obj,selectiveUpdatesObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"update"),combinedObj);
};








_api.resetPlayerPassword=function(email)
{
var postObj={token:Playbasis.env.global.token,email:email};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"password","email"),postObj);
};








_api.verifyPlayerEmail=function(playerId)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"email","verify"),{token:Playbasis.env.global.token});
};








_api.delete=function(playerId)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"delete"),{token:Playbasis.env.global.token});
};








_api.login=function(playerId)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"login"),{token:Playbasis.env.global.token});
};








_api.requestOTP=function(playerId)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,"auth",playerId,"requestOTPCode"),{token:Playbasis.env.global.token});
};









_api.requestOTPforSetupPhone=function(playerId,phoneNumber)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,"auth",playerId,"setupPhone"),{token:Playbasis.env.global.token,phone_number:phoneNumber});
};









_api.performOTPVerification=function(playerId,OTPcode)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,"auth",playerId,"verifyOTPCode"),{token:Playbasis.env.global.token,code:OTPcode});
};








_api.logout=function(playerId)
{
return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"logout"),{token:Playbasis.env.global.token});
};








_api.listActivePlayerSessions=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"sessions"));
};








_api.findPlayerBySession=function(sessionId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"session",sessionId));
};








_api.points=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"points"));
};









_api.point=function(playerId,pointName)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"point",pointName));
};
















_api.pointHistory=function(playerId,options)
{

var pointName=null;
var offset=0;
var limit=20;
var order="desc";

var keys=["point_name","offset","limit","order"];
var dvalues=[null,0,20,"desc"];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"point_history")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};









_api.actionTime=function(playerId,actionName)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"action",actionName,"time"));
};








_api.lastAction=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"action","time"));
};









_api.actionCount=function(playerId,actionName)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"action",actionName,"count"));
};








_api.level=function(level)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"level",level));
};







_api.levels=function()
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"levels"));
};













_api.badge=function(playerId,options)
{
var keys=["tags"];
var defaultValues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"badge")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,defaultValues,options));
};













_api.allBadges=function(playerId,options)
{
var keys=["tags"];
var defaultValues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"badgeAll")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,defaultValues,options));
};














_api.rank=function(rankBy,limit,options)
{
var keys=["mode"];
var dvalues=["all-time"];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"rank",rankBy,limit)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};











_api.ranks=function(limit,options)
{
var keys=["mode"];
var dvalues=["all-tiome"];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"ranks",limit)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};













_api.goods=function(playerId,options)
{
var keys=["tags","status"];
var dvalues=[null,"active"];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"goods")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};








_api.questOfPlayer=function(playerId,questId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"quest",questId)+"&player_id="+playerId);
};












_api.questListOfPlayer=function(playerId,options)
{
var keys=["player_id","tags"];
var dvalues=[playerId,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"quest")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};








_api.allQuestsOfPlayer=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"questAll",playerId));
};














_api.questRewardHistory=function(playerId,options)
{
var keys=["offset","limit"];
var dvalues=[0,50];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"quest_reward_history")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};















_api.deductReward=function(playerId,reward,amount,options)
{
var postObj={token:Playbasis.env.global.token,reward:reward,amount:amount};
var optionObj=helpers.createObjectFromTarget(options,["force"]);
var combinedObj=helpers.combineObjects(postObj,optionObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"deduct"),combinedObj);
};















_api.deductBadge=function(playerId,badge,amount,options)
{
var postObj={token:Playbasis.env.global.token,badge:badge,amount:amount};
var optionObj=helpers.createObjectFromTarget(options,["force"]);
var combinedObj=helpers.combineObjects(postObj,optionObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"deduct","badge"),combinedObj);
};












_api.giveGift=function(sentPlayerId,receivedPlayerId,giftId,type,amount)
{
var postObj={token:Playbasis.env.global.token,sent_player_id:sentPlayerId,received_player_id:receivedPlayerId,gift_id:giftId,type:type,amount:amount};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,sentPlayerId,"giveGift",type),postObj);
};








_api.playerReferralCode=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"code"));
};














_api.goodsCount=function(playerId,options)
{
var keys=["tags","status"];
var dvalues=[null,"active"];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,playerId,"goods/count")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};










_api.favoriteGoods=function(playerId,goodsId,status)
{
var postObj={token:Playbasis.env.global.token,goods_id:goodsId,status:status?"true":"false"};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,playerId,"goods","favorite"),postObj);
};
};
},{}],91:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Point";


var api=Playbasis.pointApi={};

















api.listCustomStatus=function(options)
{
var keys=["player_list","status","from","to","offset","limit"];
var defaultValues=[null,null,null,null,"0","20"];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"custom","list")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,defaultValues,options));
};








api.retrieveTransactionCustomPoint=function(txnId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"custom","transaction")+helpers.appendAndJoinIfNotNullAsUrlParam("transaction_id",txnId));
};













api.approveTransactionCustomPoint=function(txnList,options)
{
var obj={token:Playbasis.env.global.token,transaction_list:txnList,approve:"true"};


if(options!=null){
if(options.approve!=null){
obj.approve=options.approve;
}
}

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"custom","approval"),obj);
};












api.retrieveRemainingPoints=function(options)
{
var keys=["name"];
var defaultValues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"custom","remaining")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,defaultValues,options));
};
};
},{}],92:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Quest";


var api=Playbasis.questApi={};












api.questListInfo=function(options)
{
var keys=["tags"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethod)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};








api.questInfo=function(questId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,questId));
};









api.missionInfo=function(questId,missionId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,questId,"mission",missionId));
};








api.questListAvailableForPlayer=function(playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,"available")+helpers.appendAndJoinIfNotNullAsUrlParam("player_id",playerId));
};









api.questAvailableForPlayer=function(questId,playerId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethod,questId,"available")+helpers.appendAndJoinIfNotNullAsUrlParam("player_id",playerId));
};









api.joinQuest=function(questId,playerId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,questId,"join"),obj);
};








api.joinAllQuests=function(playerId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"joinAll"),obj);
};









api.cancelQuest=function(questId,playerId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,questId,"cancel"),obj);
};














api.resetQuest=function(playerId,options)
{
var obj={token:Playbasis.env.global.token,player_id:playerId};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["quest_id"]);
var combinedObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"reset"),combineObj);
};

















api.questLeaderboard=function(questId,options)
{
var keys=["quest_id","completion_element_id","player_id","offset","limit","status"];
var dvalues=[questId,null,null,0,20,"all"];

return http.getJsonAsync(helpers.createApiUrl(apiMethod,"leader")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};
};
},{}],93:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethodUrl="Quiz";


var api=Playbasis.quizApi={};














api.listOfActiveQuizzes=function(options)
{
var keys=["player_id","type","tags"];
var dvalues=[null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"list")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};













api.detailOfQuiz=function(quizId,options)
{
var keys=["player_id"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,quizId,"detail")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};














api.randomQuizForPlayer=function(playerId,options)
{
var keys=["player_id","type","tags"];
var dvalues=[playerId,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"random")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};









api.listQuizDone=function(playerId,limit)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"player",playerId,limit));
};









api.listPendingQuiz=function(playerId,limit)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"player",playerId,"pending",limit));
};















api.getQuestionFromQuiz=function(quizId,playerId,options)
{
var keys=["player_id","question_id","random"];
var dvalues=[playerId,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,quizId,"question")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};















api.getQuestionFromQuiz_resetTimeStamp=function(quizId,playerId,options)
{
var obj={token:Playbasis.env.global.token,player_id:playerId};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["question_id","random"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,quizId,"question"),combineObj);
};











api.answerQuestion=function(quizId,playerId,questionId,optionId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,question_id:questionId,option_id:optionId};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,quizId,"answer"),obj);
};









api.rankPlayersByScore=function(quizId,limit)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,quizId,"rank",limit));
};








api.quizStatistics=function(quizId)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,quizId,"stat"));
};









api.resetQuiz=function(playerId,quizId)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,quiz_id:quizId};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"reset"),obj);
};
};
},{}],94:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethod="Redeem";


var api=Playbasis.redeemApi={};














api.redeem=function(goodsId,playerId,options)
{
var obj={token:Playbasis.env.global.token,goods_id:goodsId,player_id:playerId};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["amount"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"goods"),combineObj);
};














api.redeemGoodsGroup=function(playerId,group,options)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,group:group};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["amount"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"goodsGroup"),combineObj);
};










api.redeemVerify=function(goodsGroup,couponCode,pinCode)
{
var obj={token:Playbasis.env.global.token,goods_group:goodsGroup,coupon_code:couponCode,pin_code:pinCode};

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"goodsGroup","verify"),obj);
};














api.redeemSponsor=function(goodsId,playerId,options)
{
var obj={token:Playbasis.env.global.token,goods_id:goodsId,player_id:playerId};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["amount"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"sponsor"),combineObj);
};














api.redeemSponsoredGoodsGroup=function(playerId,group,options)
{
var obj={token:Playbasis.env.global.token,player_id:playerId,group:group};
var selectedOptionsObj=helpers.createObjectFromTarget(options,["amount"]);
var combineObj=helpers.combineObjects(obj,selectedOptionsObj);

return http.postJsonAsync(helpers.createApiUrl(apiMethod,"sponsorGroup"),combineObj);
};
};
},{}],95:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethodUrl="Service";


var api=Playbasis.serviceApi={};














api.recentPoint=function(options)
{
var keys=["point_name","offset","limit"];
var dvalues=[null,0,20];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"recent_point")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};








api.resetPoint=function(pointName)
{
var obj={token:Playbasis.env.global.token,point_name:pointName};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"reset_point"),obj);
};
};
},{}],96:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var http=Playbasis.http;
var helpers=Playbasis.helpers;


var apiMethodUrl="StoreOrg";


var api=Playbasis.storeOrganizeApi={};

















api.listOrganizations=function(options)
{
var keys=["id","search","sort","order","offset","limit"];
var dvalues=[null,null,"name","asc",0,20];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"organizes")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};


















api.listNodes=function(options)
{
var keys=["id","organize_id","parent_id","search","sort","order","offset","limit"];
var dvalues=[null,null,null,null,"name","asc",0,20];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};









api.addPlayerToNode=function(nodeId,playerId)
{
var obj={token:Playbasis.env.global.token};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"addPlayer",playerId),obj);
};









api.removePlayerFromNode=function(nodeId,playerId)
{
var obj={token:Playbasis.env.global.token};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"removePlayer",playerId),obj);
};










api.setPlayerRole=function(nodeId,playerId,role)
{
var obj={token:Playbasis.env.global.token,role:role};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"setPlayerRole",playerId),obj);
};










api.unsetPlayerRole=function(nodeId,playerId,role)
{
var obj={token:Playbasis.env.global.token,role:role};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"unsetPlayerRole",playerId),obj);
};













api.listPlayerFromNode=function(nodeId,options)
{
var keys=["role"];
var dvalues=[null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"players",nodeId)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};




















api.peerLeaderboard=function(nodeId,rankBy,options)
{
var keys=["page","limit","under_org","role","player_id","month","year"];
var dvalues=[0,20,"false",null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"rankPeer",nodeId,rankBy)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};




















api.peerLeaderboardByAction=function(nodeId,action,parameter,options)
{
var keys=["role","page","limit","player_id","month","year"];
var dvalues=[null,0,20,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"rankPeerByAccAction",nodeId,action,parameter)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};









api.findChildNodes=function(nodeId,layer)
{
return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"getChildNode",layer));
};
















api.saleReport=function(nodeId,options)
{
var keys=["month","year","action","parameter"];
var dvalues=[null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"saleReport")+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};

















api.saleHistory=function(nodeId,count,options)
{
var keys=["month","year","action","parameter"];
var dvalues=[null,null,null,null];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"saleHistory",count)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};



















api.saleBoard=function(nodeId,layer,options)
{
var keys=["month","year","action","parameter","page","limit"];
var dvalues=[null,null,null,null,0,20];

return http.getJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"saleBoard",layer)+helpers.appendAndJoinIfNotNullAsUrlParam2(keys,dvalues,options));
};









api.addContentToNode=function(nodeId,contentNodeId)
{
var obj={token:Playbasis.env.global.token};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"addContent",contentNodeId),obj);
};









api.removeContentFromNode=function(nodeId,contentNodeId)
{
var obj={token:Playbasis.env.global.token};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"removeContent",contentNodeId),obj);
};










api.setContentRole=function(nodeId,contentNodeId,role)
{
var obj={token:Playbasis.env.global.token,role:role};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"setContentRole",contentNodeId),obj);
};










api.unsetContentRole=function(nodeId,contentNodeId,role)
{
var obj={token:Playbasis.env.global.token,role:role};

return http.postJsonAsync(helpers.createApiUrl(apiMethodUrl,"nodes",nodeId,"unsetContentRole",contentNodeId),obj);
};
};
},{}],97:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){

Playbasis.const={};







Playbasis.const.errorCode={
internetConnectionIssue:99999,




InvalidToken:900,


RequestExceeded:901,


TokenRequired:902,


ParameterMissing:903,


InternalError:800,


CannotSentEmail:801,


AllEmailsInBlacklist:802,


EmailAlreadyInBlacklist:803,


EmailNotInBlacklist:804,


UnknownSNSMessageType:805,


UnknownNotificationMessage:806,


CannotVerifyPaypalIPN:807,


InvalidPaypalIPN:808,


InvalidApiKeyOrSecret:1,


AccessDenied:2,


LimitExceeded:3,


UserNotExist:200,


UserAlreadyExist:201,


TooManyUsers:202,


UserOrRewardNotExist:203,


UserIdInvalid:204,


UserPhoneInvalid:205,


RewardForUserNotExist:206,


RewardForUserNotEnough:207,


EmailIsAlreadyUsed:216,


ActionNotFound:301,


RewardNotFound:401,


GoodsNotFound:501,


OverLimitRedeem:601,


QuestAlreadyJoined:701,


QuestAlreadyFinished:702,


QuestNotEnoughPermissionToJoinQuest:703,


NotYetJoinQuest:704,


QuestJoinOrCancelNotFound:705,


QuizNotFound:1001,


QuizQuestionNotFound:1002,


QuizOptionNotFound:1003,


QuizQuestionAlreadyCompleted:1004};

};
},{}],98:[function(require,module,exports){
'use strict';

module.exports=function(){


var Playbasis=function Playbasis(){
var me=this;

return me;
};


Playbasis.static={
defaults:{
global:{
baseUrl:"https://api.pbapp.net",
baseAsyncUrl:"https://api.pbapp.net/async/call"}}};





Playbasis.env={
global:{
baseUrl:Playbasis.static.defaults.global.baseUrl,
baseAsyncUrl:Playbasis.static.defaults.global.baseAsyncUrl,
apiKey:null,
apiSecret:null,
token:null}};




Playbasis.Promise=require(2);


Playbasis.Playbasis=new Playbasis();

return Playbasis;
};
},{"2":2}],99:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var builder=Playbasis.builder={};

var finalSettingObj={
baseUrl:Playbasis.static.defaults.global.baseUrl,
baseAsyncUrl:Playbasis.static.defaults.global.baseAsyncUrl,
apiKey:null,
apiSecret:null};









builder.setApiKey=function(apiKey)
{
finalSettingObj.apiKey=apiKey;
return builder;
};








builder.setApiSecret=function(apiSecret)
{
finalSettingObj.apiSecret=apiSecret;
return builder;
};








builder.setBaseUrl=function(baseUrl)
{
finalSettingObj.baseUrl=baseUrl;
return builder;
};








builder.setBaseAsyncUrl=function(baseAsyncUrl)
{
finalSettingObj.baseAsyncUrl=baseAsyncUrl;
return builder;
};






builder.build=function()
{

Playbasis.env.global.baseUrl=finalSettingObj.baseUrl;
Playbasis.env.global.baseAsyncUrl=finalSettingObj.baseAsyncUrl;
Playbasis.env.global.apiKey=finalSettingObj.apiKey;
Playbasis.env.global.apiSecret=finalSettingObj.apiSecret;
};
};
},{}],100:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var helpers=Playbasis.helpers={};









helpers.joinParams=function(paramKvp)
{
if(paramKvp==null)
return"";

var encodedParams="";
var params=Object.keys(paramKvp);
var count=params.length;

for(var i=0;i<count;i++)
{
encodedParams+=encodeURIComponent(params[i])+"="+encodeURIComponent(paramKvp[params[i]]);

if(i<count-1)
encodedParams+="&";
}

return encodedParams;
};








helpers.joinIfNotNullAsUrlParam=function(param)
{

if(arguments.length==0||arguments.length%2!=0)
throw"number of argument cannot be 0, and must be multiple of 2";

var result="";


for(var i=0;i<arguments.length;i+=2){
var key=arguments[i];
var value=arguments[i+1];


if(key!=null&&value!=null){


if(i!=0){
result+="&";
}

result+=encodeURIComponent(key)+"="+encodeURIComponent(value);
}
}

return result;
};








helpers.appendAndJoinIfNotNullAsUrlParam=function(param)
{

if(arguments.length==0||arguments.length%2!=0)
throw"number of argument cannot be 0, and must be multiple of 2";

var result="";


for(var i=0;i<arguments.length;i+=2){
var key=arguments[i];
var value=arguments[i+1];


if(key!=null&&value!=null){
result+="&";
result+=encodeURIComponent(key)+"="+encodeURIComponent(value);
}
}

return result;
};










helpers.appendAndJoinIfNotNullAsUrlParam2=function(keys,defaultValues,inputObj)
{
var result="";

for(var i=0;i<keys.length;i++){
var key=keys[i];
var value=defaultValues[i];


if(inputObj!=null){
if(inputObj[key]!=null){
value=inputObj[key];
}
}

if(key!=null&&value!=null){
result+="&";
result+=encodeURIComponent(key)+"="+encodeURIComponent(value);
}
}

return result;
};












helpers.createObjectFromTarget=function(obj,keysLimit)
{
var retObj={};


if(obj==null)
return retObj;

var keys=Object.keys(obj);

for(var i=0;i<keys.length;i++){
var key=keys[i];
var value=obj[key];


if(key!=null&&value!=null){

if(keysLimit!=null){
if(keysLimit.indexOf(key)!=-1){
retObj[key]=value;
}
}else

{
retObj[key]=value;
}
}
}

return retObj;
};











helpers.combineObjects=function(objA,objB)
{
var retObj={};


if(objA==null&&objB==null)
return retObj;


if(objA==null){
retObj=objB;
return retObj;
}else
if(objB==null){
retObj=objA;
return retObj;
}


var keys=Object.keys(objB);
retObj=objA;

for(var i=0;i<keys.length;i++){
var key=keys[i];
var value=objB[key];

if(key!=null&&value!=null){
retObj[key]=value;
}
}

return retObj;
};










helpers.createApiUrl=function(method,param)
{
var options=[];

for(var i=1;i<arguments.length;i++){
options.push(arguments[i]);
}

if(options&&options.length>0){
var optionsString=options.join("/");
return Playbasis.env.global.baseUrl+"/"+method+"/"+optionsString+"?api_key="+Playbasis.env.global.apiKey;
}else
{
return Playbasis.env.global.baseUrl+"/"+method+"?api_key="+Playbasis.env.global.apiKey;
}
};
};
},{}],101:[function(require,module,exports){
(function(Buffer){
'use strict';





module.exports=function(Playbasis){


var helpers=Playbasis.helpers;


var http=Playbasis.http={};


var OperationalError=Playbasis.Promise.OperationalError;


var _priv={};


_priv.isRelateToInternetConnectionIssue=function(errorMsg){

if(errorMsg.search("XHR error")>-1||errorMsg.search("Failed to fetch")>-1){
return true;
}else
{
return false;
}
};








http.getJsonAsync=function(url)
{
return new Playbasis.Promise(function(resolve,reject){


var lib=url.search('https')!=-1?require(9):require(72);


var dataChunks=[];


var request=lib.get(url,function(response){

if(response.statusCode!=200){

var error=new OperationalError("Failed to load page, status code: "+response.statusCode);

error.code=response.statusCode;
error.isApiLevel=false;
return reject(error);
}


response.on('data',function(chunk){
dataChunks.push(chunk);
});


response.on('end',function(){


var d=dataChunks.join('');


if(d==null){
return reject(new OperationalError("Failed on api response. Response is null"));
}


var json=null;
try{

json=JSON.parse(d);
}
catch(e){
return reject(new OperationalError("Failed on parsing JSON response message. Error: "+e.message));
}


var errorCode=parseInt(json.error_code);
if(errorCode==0){

return resolve(json);
}else
{

var error=new OperationalError("Failed on response message. Error code: "+errorCode+" with "+json.message);

error.code=errorCode;
error.isApiLevel=true;
return reject(error);
}
});


response.on('error',function(e){return reject(new OperationalError(e.message));});
});

request.on('error',function(e){

if(_priv.isRelateToInternetConnectionIssue(e.message)){
var error=new OperationalError("Request error. "+e.message);
error.code=Playbasis.const.errorCode.internetConnectionIssue;
return reject(error);
}else
{
return reject(new OperationalError("Request error. "+e.message));
}
});
});
};









http.postJsonAsync=function(url,postDataKvp)
{
return new Playbasis.Promise(function(resolve,reject){


var lib=null;
var isHttps=true;
if(url.search('https')!=-1){
lib=require(9);
isHttps=true;
}else
{
lib=require(72);
isHttps=false;
}


var encodedDataParams="";
if(postDataKvp!=null){
var keys=Object.keys(postDataKvp);
var count=keys.length;

for(var i=0;i<count;i++)
{

var key=keys[i];
var value=postDataKvp[keys[i]];


if(key!=null&&value!=null){


if(i!=0){
encodedDataParams+="&";
}

encodedDataParams+=encodeURIComponent(key)+"="+encodeURIComponent(value);
}
}
}


var noPrefixUrl=isHttps?url.substring(8):url.substring(7);

var firstSlashPos=noPrefixUrl.indexOf("/");
var baseUrl=noPrefixUrl.substring(0,firstSlashPos);
var pathUrl="/"+noPrefixUrl.substring(firstSlashPos+1);



var postOptions={
hostname:baseUrl,
path:pathUrl,
port:isHttps?443:80,
method:'POST',
headers:{
'Content-Type':'application/x-www-form-urlencoded',
'Content-Length':Buffer.byteLength(encodedDataParams)}};




var dataChunks=[];


var request=lib.request(postOptions,function(response){

if(response.statusCode!=200){

var error=new OperationalError("Failed to load page, status code: "+response.statusCode);

error.code=response.statusCode;
error.isApiLevel=false;
return reject(error);
}

response.setEncoding('utf8');


response.on('data',function(chunk){
dataChunks.push(chunk);
});


response.on('end',function(){


var d=dataChunks.join('');


if(d==null){
return reject(new OperationalError("Failed on api response. Response is null"));
}


var json=null;
try{

json=JSON.parse(d);
}
catch(e){
return reject(new OperationalError("Failed on parsing JSON response message. Error: "+e.message));
}


var errorCode=parseInt(json.error_code);
if(errorCode==0){

return resolve(json);
}else
{




if(errorCode==900||errorCode==902){



http.postJsonAsync(helpers.createApiUrl("Auth"),{api_key:Playbasis.env.global.apiKey,api_secret:Playbasis.env.global.apiSecret}).
then(function(result){

Playbasis.env.global.token=result.response.token;


postDataKvp.token=Playbasis.env.global.token;
http.postJsonAsync(url,postDataKvp).
then(function(_r){
return resolve(_r);
},function(_e){
return reject(_e);
});
},function(e){

return reject(e);
});
}else

{

var error=new OperationalError("Failed on response message. Error code: "+errorCode+" with "+json.message);

error.code=errorCode;
error.isApiLevel=true;
return reject(error);
}
}
});


response.on('error',function(e){return reject(new OperationalError(e.message));});
});

request.on('error',function(e){


if(_priv.isRelateToInternetConnectionIssue(e.message)){
var error=new OperationalError("Request error. "+e.message);
error.code=Playbasis.const.errorCode.internetConnectionIssue;
return reject(error);
}else
{
return reject(new OperationalError("Request error. "+e.message));
}
});


request.write(encodedDataParams);
request.end();
});
};
};
}).call(this,require(5).Buffer);
},{"5":5,"72":72,"9":9}],102:[function(require,module,exports){




var Playbasis=require(98)();


require(97)(Playbasis);


require(100)(Playbasis);
require(99)(Playbasis);


require(101)(Playbasis);


require(82)(Playbasis);
require(90)(Playbasis);
require(83)(Playbasis);
require(87)(Playbasis);
require(89)(Playbasis);
require(86)(Playbasis);
require(92)(Playbasis);
require(94)(Playbasis);
require(84)(Playbasis);
require(88)(Playbasis);
require(95)(Playbasis);
require(96)(Playbasis);
require(85)(Playbasis);
require(93)(Playbasis);
require(91)(Playbasis);


require(103)(Playbasis);


require(105)(Playbasis);
require(104)(Playbasis);

module.exports=Playbasis;

var isBrowser=new Function("try {return this===window;}catch(e){ return false;}");
if(isBrowser()){
window.Playbasis=Playbasis;
}
},{"100":100,"101":101,"103":103,"104":104,"105":105,"82":82,"83":83,"84":84,"85":85,"86":86,"87":87,"88":88,"89":89,"90":90,"91":91,"92":92,"93":93,"94":94,"95":95,"96":96,"97":97,"98":98,"99":99}],103:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var util=Playbasis.util={};


var _suffixUrl=function _suffixUrl(url,favored){
var components=url.split(".");
var fileName=components[0];
if(favored=="80x80"){
fileName+="-80x80";
}else
if(favored=="240x240"){
fileName+="-240x240";
}

return fileName+"."+components[1];
};









util.getThumbnailURL=function(imageUrl,favored)
{
var components=imageUrl.split("/");
components[components.length-1]=_suffixUrl(components[components.length-1],favored);
var finalUrl=components[0];
var isUpdatedDataComponent=false;

for(var i=1;i<components.length;i++){

if(!isUpdatedDataComponent&&components[i]=="data"){
isUpdatedDataComponent=true;
components[i]="cache/data";
}
finalUrl+="/"+components[i];
}

return finalUrl;
};
};
},{}],104:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var _vendorJSBarCode=require(14);

var bc=Playbasis.barCode={};






























bc.generate=function(targetElement,text,options)
{
if(options==null){
_vendorJSBarCode(targetElement,text);
}else
{
_vendorJSBarCode(targetElement,text,options);
}
};
};
},{"14":14}],105:[function(require,module,exports){
'use strict';





module.exports=function(Playbasis){


var _vendorQrCode=require(60);

var qr=Playbasis.qrCode={};















qr.generate=function(targetContainer,text,options)
{
var typeNumber=4;
var errorCorrectionLevel='L';
var size='medium';


if(options!=null){
if(options.type!=null){
if(typeof options.type==="number"){
typeNumber=options.type;
}
}

if(options.error_correction_level!=null){
if(typeof options.error_correction_level==="string"){
errorCorrectionLevel=options.error_correction_level;
}
}

if(options.size!=null){
if(typeof options.size==="string"){
size=options.size;
}
}
}

var sizeNum=4;
if(size=='small'){
sizeNum=2;
}else
if(size=='large'){
sizeNum=7;
}

var qr=_vendorQrCode(typeNumber,errorCorrectionLevel);
qr.addData(text);
qr.make();
var imgTagStr=qr.createImgTag(sizeNum);


document.getElementById(targetContainer).innerHTML=imgTagStr;
};
};
},{"60":60}]},{},[102])(102);
});