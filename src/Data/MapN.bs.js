// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_int = require("bs-platform/lib/js/js_int.js");
var Caml_obj = require("bs-platform/lib/js/caml_obj.js");
var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Maybe$OptolithClient = require("./Maybe.bs.js");
var Either$OptolithClient = require("./Either.bs.js");
var Function$OptolithClient = require("./Function.bs.js");

function entries(x) {
  return Array.from(x.entries());
}

function keys(x) {
  return Array.from(x.keys());
}

function values(x) {
  return Array.from(x.values());
}

var Native = {
  entries: entries,
  keys: keys,
  values: values
};

function foldr(f, initial, mp) {
  return Array.from(mp.entries()).reduceRight((function (acc, param) {
                return Curry._2(f, param[1], acc);
              }), initial);
}

function foldl(f, initial, mp) {
  return Array.from(mp.entries()).reduce((function (acc, param) {
                return Curry._2(f, acc, param[1]);
              }), initial);
}

function toList(mp) {
  return $$Array.to_list(Array.from(mp.entries()));
}

function $$null(mp) {
  return mp.size() === 0;
}

function length(prim) {
  return prim.size();
}

function elem(e, mp) {
  return Array.from(mp.values()).some((function (x) {
                return Caml_obj.caml_equal(x, e);
              }));
}

function sum(mp) {
  return foldr((function (prim, prim$1) {
                return prim + prim$1 | 0;
              }), 0, mp);
}

function product(mp) {
  return foldr(Caml_int32.imul, 1, mp);
}

function maximum(mp) {
  return foldr((function (prim, prim$1) {
                return Math.max(prim, prim$1);
              }), Js_int.min, mp);
}

function minimum(mp) {
  return foldr((function (prim, prim$1) {
                return Math.min(prim, prim$1);
              }), Js_int.max, mp);
}

function concat(mp) {
  return foldl(List.append, /* [] */0, mp);
}

function concatMap(f, mp) {
  return new Map(Array.from(mp.entries()).reduce((function (acc, param) {
                    var x = Curry._1(f, param[1]);
                    return Array.from(x.entries()).concat(acc);
                  }), []));
}

function con(mp) {
  return Array.from(mp.values()).every(Function$OptolithClient.id);
}

function dis(mp) {
  return Array.from(mp.values()).some(Function$OptolithClient.id);
}

function any(pred, mp) {
  return Array.from(mp.values()).some(Curry.__1(pred));
}

function all(pred, mp) {
  return Array.from(mp.values()).every(Curry.__1(pred));
}

function notElem(e, mp) {
  return !elem(e, mp);
}

function find(pred, mp) {
  return Maybe$OptolithClient.optionToMaybe(Caml_option.undefined_to_opt(Array.from(mp.values()).find(Curry.__1(pred))));
}

var Foldable = {
  foldr: foldr,
  foldl: foldl,
  toList: toList,
  $$null: $$null,
  length: length,
  elem: elem,
  sum: sum,
  product: product,
  maximum: maximum,
  minimum: minimum,
  concat: concat,
  concatMap: concatMap,
  con: con,
  dis: dis,
  any: any,
  all: all,
  notElem: notElem,
  find: find
};

function mapMEitherHelper(f, xs) {
  if (!xs) {
    return /* Right */Block.__(1, [/* [] */0]);
  }
  var match = xs[0];
  var new_value = Curry._1(f, match[1]);
  if (!new_value.tag) {
    return /* Left */Block.__(0, [new_value[0]]);
  }
  var zs = mapMEitherHelper(f, xs[1]);
  if (zs.tag) {
    return /* Right */Block.__(1, [/* :: */[
                /* tuple */[
                  match[0],
                  new_value[0]
                ],
                zs[0]
              ]]);
  } else {
    return /* Left */Block.__(0, [zs[0]]);
  }
}

function mapMEither(f, mp) {
  return Either$OptolithClient.Functor.$less$$great((function (xs) {
                return new Map($$Array.of_list(xs));
              }), mapMEitherHelper(f, $$Array.to_list(Array.from(mp.entries()))));
}

var Traversable = {
  mapMEither: mapMEither
};

function size(prim) {
  return prim.size();
}

function member(key, mp) {
  return Array.from(mp.keys()).some((function (k) {
                return Caml_obj.caml_equal(k, key);
              }));
}

function notMember(key, mp) {
  return !Array.from(mp.keys()).some((function (k) {
                return Caml_obj.caml_equal(k, key);
              }));
}

function lookup(key, mp) {
  return Maybe$OptolithClient.Functor.$less$$great((function (prim) {
                return prim[1];
              }), Maybe$OptolithClient.optionToMaybe(Caml_option.undefined_to_opt(Array.from(mp.entries()).find((function (param) {
                            return Caml_obj.caml_equal(param[0], key);
                          })))));
}

function findWithDefault(def, key, mp) {
  return Maybe$OptolithClient.fromMaybe(def, lookup(key, mp));
}

exports.Native = Native;
exports.Foldable = Foldable;
exports.Traversable = Traversable;
exports.size = size;
exports.member = member;
exports.notMember = notMember;
exports.lookup = lookup;
exports.findWithDefault = findWithDefault;
/* No side effect */