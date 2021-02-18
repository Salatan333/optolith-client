// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var ListH$OptolithClient = require("./ListH.bs.js");
var Function$OptolithClient = require("./Function.bs.js");

function fromLeft(def, x) {
  if (x.tag) {
    return def;
  } else {
    return x[0];
  }
}

function fromRight(def, x) {
  if (x.tag) {
    return x[0];
  } else {
    return def;
  }
}

function fromEither(x) {
  return x[0];
}

function fromLeft$prime(x) {
  if (x.tag) {
    return Pervasives.invalid_arg("fromLeft': Cannot extract a Left value out of a Right");
  } else {
    return x[0];
  }
}

function fromRight$prime(x) {
  if (x.tag) {
    return x[0];
  } else {
    return Pervasives.invalid_arg("fromLeft': Cannot extract a Right value out of a Left");
  }
}

function eitherToMaybe(x) {
  if (x.tag) {
    return /* Just */[x[0]];
  } else {
    return /* Nothing */0;
  }
}

function maybeToEither(left, x) {
  if (x) {
    return /* Right */Block.__(1, [x[0]]);
  } else {
    return /* Left */Block.__(0, [left]);
  }
}

function maybeToEither$prime(left, x) {
  if (x) {
    return /* Right */Block.__(1, [x[0]]);
  } else {
    return /* Left */Block.__(0, [Curry._1(left, undefined)]);
  }
}

var Extra = {
  fromLeft: fromLeft,
  fromRight: fromRight,
  fromEither: fromEither,
  fromLeft$prime: fromLeft$prime,
  fromRight$prime: fromRight$prime,
  eitherToMaybe: eitherToMaybe,
  maybeToEither: maybeToEither,
  maybeToEither$prime: maybeToEither$prime
};

function $less$$great(f, x) {
  if (x.tag) {
    return /* Right */Block.__(1, [Curry._1(f, x[0])]);
  } else {
    return /* Left */Block.__(0, [x[0]]);
  }
}

var Functor = {
  $less$$great: $less$$great
};

function bimap(fLeft, fRight, x) {
  if (x.tag) {
    return /* Right */Block.__(1, [Curry._1(fRight, x[0])]);
  } else {
    return /* Left */Block.__(0, [Curry._1(fLeft, x[0])]);
  }
}

function first(f, x) {
  if (x.tag) {
    return /* Right */Block.__(1, [x[0]]);
  } else {
    return /* Left */Block.__(0, [Curry._1(f, x[0])]);
  }
}

var Bifunctor = {
  bimap: bimap,
  first: first,
  second: $less$$great
};

function $less$star$great(f, x) {
  if (f.tag) {
    return $less$$great(f[0], x);
  } else {
    return /* Left */Block.__(0, [f[0]]);
  }
}

var Applicative = {
  $less$star$great: $less$star$great
};

function $great$great$eq(x, f) {
  if (x.tag) {
    return Curry._1(f, x[0]);
  } else {
    return /* Left */Block.__(0, [x[0]]);
  }
}

function $eq$less$less(f, mx) {
  return $great$great$eq(mx, f);
}

function $great$great(x, y) {
  return $great$great$eq(x, (function (param) {
                return Function$OptolithClient.$$const(y, param);
              }));
}

function $great$eq$great(f, g, x) {
  return $great$great$eq(Curry._1(f, x), g);
}

function join(x) {
  return $great$great$eq(x, Function$OptolithClient.id);
}

function liftM2(f, mx, my) {
  return $great$great$eq(mx, (function (x) {
                return $less$$great(Curry._1(f, x), my);
              }));
}

function liftM3(f, mx, my, mz) {
  return $great$great$eq(mx, (function (x) {
                return $great$great$eq(my, (function (y) {
                              return $less$$great(Curry._2(f, x, y), mz);
                            }));
              }));
}

function liftM4(f, mx, my, mz, ma) {
  return $great$great$eq(mx, (function (x) {
                return $great$great$eq(my, (function (y) {
                              return $great$great$eq(mz, (function (z) {
                                            return $less$$great(Curry._3(f, x, y, z), ma);
                                          }));
                            }));
              }));
}

var Monad = {
  $great$great$eq: $great$great$eq,
  $eq$less$less: $eq$less$less,
  $great$great: $great$great,
  $great$eq$great: $great$eq$great,
  join: join,
  liftM2: liftM2,
  liftM3: liftM3,
  liftM4: liftM4
};

function foldr(f, init, mx) {
  if (mx.tag) {
    return Curry._2(f, mx[0], init);
  } else {
    return init;
  }
}

function foldl(f, init, mx) {
  if (mx.tag) {
    return Curry._2(f, init, mx[0]);
  } else {
    return init;
  }
}

function toList(mx) {
  if (mx.tag) {
    return /* :: */[
            mx[0],
            /* [] */0
          ];
  } else {
    return /* [] */0;
  }
}

function length(mx) {
  if (mx.tag) {
    return 1;
  } else {
    return 0;
  }
}

function elem(e, mx) {
  if (mx.tag) {
    return e === mx[0];
  } else {
    return false;
  }
}

function sum(mx) {
  if (mx.tag) {
    return mx[0];
  } else {
    return 0;
  }
}

function product(mx) {
  if (mx.tag) {
    return mx[0];
  } else {
    return 1;
  }
}

function concat(mxs) {
  if (mxs.tag) {
    return mxs[0];
  } else {
    return /* [] */0;
  }
}

function concatMap(f, mx) {
  if (mx.tag) {
    return Curry._1(f, mx[0]);
  } else {
    return /* [] */0;
  }
}

function con(mx) {
  if (mx.tag) {
    return mx[0];
  } else {
    return true;
  }
}

function dis(mx) {
  if (mx.tag) {
    return mx[0];
  } else {
    return false;
  }
}

function any(pred, mx) {
  if (mx.tag) {
    return Curry._1(pred, mx[0]);
  } else {
    return false;
  }
}

function all(pred, mx) {
  if (mx.tag) {
    return Curry._1(pred, mx[0]);
  } else {
    return true;
  }
}

function notElem(e, mx) {
  return !elem(e, mx);
}

function find(pred, mx) {
  if (!mx.tag) {
    return /* Nothing */0;
  }
  var x = mx[0];
  if (Curry._1(pred, x)) {
    return /* Just */[x];
  } else {
    return /* Nothing */0;
  }
}

var Foldable = {
  foldr: foldr,
  foldl: foldl,
  toList: toList,
  length: length,
  elem: elem,
  sum: sum,
  product: product,
  concat: concat,
  concatMap: concatMap,
  con: con,
  dis: dis,
  any: any,
  all: all,
  notElem: notElem,
  find: find
};

function either(fLeft, fRight, x) {
  if (x.tag) {
    return Curry._1(fRight, x[0]);
  } else {
    return Curry._1(fLeft, x[0]);
  }
}

function lefts(xs) {
  return ListH$OptolithClient.Foldable.foldr((function (x, acc) {
                if (x.tag) {
                  return acc;
                } else {
                  return /* :: */[
                          x[0],
                          acc
                        ];
                }
              }), /* [] */0, xs);
}

function rights(xs) {
  return ListH$OptolithClient.Foldable.foldr((function (x, acc) {
                if (x.tag) {
                  return /* :: */[
                          x[0],
                          acc
                        ];
                } else {
                  return acc;
                }
              }), /* [] */0, xs);
}

function partitionEithers(xs) {
  return ListH$OptolithClient.Foldable.foldr((function (x, param) {
                var rs = param[1];
                var ls = param[0];
                if (x.tag) {
                  return /* tuple */[
                          ls,
                          /* :: */[
                            x[0],
                            rs
                          ]
                        ];
                } else {
                  return /* tuple */[
                          /* :: */[
                            x[0],
                            ls
                          ],
                          rs
                        ];
                }
              }), /* tuple */[
              /* [] */0,
              /* [] */0
            ], xs);
}

exports.Extra = Extra;
exports.Functor = Functor;
exports.Bifunctor = Bifunctor;
exports.Applicative = Applicative;
exports.Monad = Monad;
exports.Foldable = Foldable;
exports.either = either;
exports.lefts = lefts;
exports.rights = rights;
exports.partitionEithers = partitionEithers;
/* No side effect */
