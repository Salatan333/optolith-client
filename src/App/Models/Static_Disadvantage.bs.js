// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Int$OptolithClient = require("../../Data/Int.bs.js");
var Maybe$OptolithClient = require("../../Data/Maybe.bs.js");
var IntMap$OptolithClient = require("../../Data/IntMap.bs.js");
var Yaml_Zip$OptolithClient = require("../Utilities/Yaml_Zip.bs.js");
var JsonStrict$OptolithClient = require("../Utilities/JsonStrict.bs.js");
var Static_Erratum$OptolithClient = require("./Static_Erratum.bs.js");
var Static_Advantage$OptolithClient = require("./Static_Advantage.bs.js");
var Static_SourceRef$OptolithClient = require("./Static_SourceRef.bs.js");
var Static_SelectOption$OptolithClient = require("./Static_SelectOption.bs.js");
var Static_Prerequisites$OptolithClient = require("./Static_Prerequisites.bs.js");

function tL10n(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          name: Json_decode.field("name", Json_decode.string, json),
          nameInWiki: JsonStrict$OptolithClient.optionalField("nameInWiki", Json_decode.string, json),
          rules: Json_decode.field("rules", Json_decode.string, json),
          selectOptions: JsonStrict$OptolithClient.optionalField("selectOptions", (function (param) {
                  return Json_decode.list(Static_SelectOption$OptolithClient.Decode.tL10n, param);
                }), json),
          input: JsonStrict$OptolithClient.optionalField("input", Json_decode.string, json),
          range: JsonStrict$OptolithClient.optionalField("range", Json_decode.string, json),
          actions: JsonStrict$OptolithClient.optionalField("actions", Json_decode.string, json),
          prerequisites: JsonStrict$OptolithClient.optionalField("prerequisites", Json_decode.string, json),
          prerequisitesIndex: JsonStrict$OptolithClient.optionalField("prerequisitesIndex", Static_Prerequisites$OptolithClient.Decode.tIndexWithLevelL10n, json),
          prerequisitesStart: JsonStrict$OptolithClient.optionalField("prerequisitesStart", Json_decode.string, json),
          prerequisitesEnd: JsonStrict$OptolithClient.optionalField("prerequisitesEnd", Json_decode.string, json),
          apValue: JsonStrict$OptolithClient.optionalField("apValue", Json_decode.string, json),
          apValueAppend: JsonStrict$OptolithClient.optionalField("apValueAppend", Json_decode.string, json),
          src: Json_decode.field("src", Static_SourceRef$OptolithClient.Decode.list, json),
          errata: Json_decode.field("errata", Static_Erratum$OptolithClient.Decode.list, json)
        };
}

var cost = Static_Advantage$OptolithClient.Decode.cost;

function tUniv(json) {
  return {
          id: Json_decode.field("id", Json_decode.$$int, json),
          cost: JsonStrict$OptolithClient.optionalField("cost", cost, json),
          noMaxAPInfluence: JsonStrict$OptolithClient.optionalField("noMaxAPInfluence", Json_decode.bool, json),
          isExclusiveToArcaneSpellworks: JsonStrict$OptolithClient.optionalField("isExclusiveToArcaneSpellworks", Json_decode.bool, json),
          levels: JsonStrict$OptolithClient.optionalField("levels", Json_decode.$$int, json),
          max: JsonStrict$OptolithClient.optionalField("max", Json_decode.$$int, json),
          selectOptionCategories: JsonStrict$OptolithClient.optionalField("selectOptionCategories", (function (param) {
                  return Json_decode.list(Static_SelectOption$OptolithClient.Decode.categoryWithGroups, param);
                }), json),
          selectOptions: JsonStrict$OptolithClient.optionalField("selectOptions", (function (param) {
                  return Json_decode.list(Static_SelectOption$OptolithClient.Decode.tUniv, param);
                }), json),
          prerequisites: Static_Prerequisites$OptolithClient.Decode.tWithLevelDisAdv(json),
          prerequisitesIndex: JsonStrict$OptolithClient.optionalField("prerequisitesIndex", Static_Prerequisites$OptolithClient.Decode.tIndexWithLevelUniv, json),
          gr: Json_decode.field("gr", Json_decode.$$int, json)
        };
}

function t(blessings, cantrips, combatTechniques, liturgicalChants, skills, spells, univ, l10n) {
  return /* tuple */[
          univ.id,
          {
            id: univ.id,
            name: l10n.name,
            nameInWiki: l10n.nameInWiki,
            noMaxAPInfluence: Maybe$OptolithClient.fromMaybe(false, univ.noMaxAPInfluence),
            isExclusiveToArcaneSpellworks: Maybe$OptolithClient.fromMaybe(false, univ.isExclusiveToArcaneSpellworks),
            levels: univ.levels,
            max: univ.max,
            rules: l10n.rules,
            selectOptions: Static_SelectOption$OptolithClient.Decode.mergeSelectOptions(l10n.selectOptions, univ.selectOptions, Static_SelectOption$OptolithClient.Decode.resolveCategories(blessings, cantrips, combatTechniques, liturgicalChants, skills, spells, univ.selectOptionCategories)),
            input: l10n.input,
            range: l10n.range,
            actions: l10n.actions,
            prerequisites: univ.prerequisites,
            prerequisitesText: l10n.prerequisites,
            prerequisitesTextIndex: Static_Prerequisites$OptolithClient.Decode.tIndexWithLevel(univ.prerequisitesIndex, l10n.prerequisitesIndex),
            prerequisitesTextStart: l10n.prerequisitesStart,
            prerequisitesTextEnd: l10n.prerequisitesEnd,
            apValue: univ.cost,
            apValueText: l10n.apValue,
            apValueTextAppend: l10n.apValueAppend,
            gr: univ.gr,
            src: l10n.src,
            errata: l10n.errata
          }
        ];
}

function all(blessings, cantrips, combatTechniques, liturgicalChants, skills, spells, yamlData) {
  return Curry._1(IntMap$OptolithClient.fromList, Yaml_Zip$OptolithClient.zipBy(Int$OptolithClient.show, (function (param, param$1) {
                    return t(blessings, cantrips, combatTechniques, liturgicalChants, skills, spells, param, param$1);
                  }), (function (x) {
                    return x.id;
                  }), (function (x) {
                    return x.id;
                  }), Json_decode.list(tUniv, yamlData.disadvantagesUniv), Json_decode.list(tL10n, yamlData.disadvantagesL10n)));
}

var Decode = {
  tL10n: tL10n,
  cost: cost,
  tUniv: tUniv,
  t: t,
  all: all
};

exports.Decode = Decode;
/* IntMap-OptolithClient Not a pure module */