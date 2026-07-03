import { SPEAKERS } from "../js/domains/speakers/speakers.data.js";
import { AMPLIFIERS } from "../js/domains/amplifiers/amplifiers.data.js";
import { amplifiersSchema, AMP_MFR } from "../js/domains/amplifiers/amplifiers.schema.js";
import { passes, sortItems } from "../js/core/filter-engine.js";
import { cardHTML as ampCardHTML, modalBodyHTML as ampModalBodyHTML } from "../js/domains/amplifiers/amplifiers.view.js";
import { registerSpeakers, registerAmplifiers, resolveAmpIdForModel, findAmplifierById, findSpeakerById } from "../js/relationships/cross-ref.js";
import { createState } from "../js/core/state.js";

registerSpeakers(SPEAKERS);
registerAmplifiers(AMPLIFIERS);

// v1.1: L-Acoustics 앰프를 LA12X/LA4X/LA7.16/LA2Xi/LA1-16i(구) 5개에서
// 상세 스펙의 LA1.16i(신) 1개로 교체 — 1(la) + 4(db) = 5개.
console.log("Test1 (5 amplifiers loaded):", AMPLIFIERS.length === 5 ? "PASS" : "FAIL", `(${AMPLIFIERS.length})`);

// Test2: every amp id is unique
const ids = AMPLIFIERS.map(a => a.id);
console.log("Test2 (unique amp IDs):", new Set(ids).size === ids.length ? "PASS" : "FAIL");

// Test3: every speaker's relations.ampIds resolve to a real amplifier
let allResolve = true;
SPEAKERS.forEach(s => {
  (s.relations.ampIds || []).forEach(aid => {
    if (!findAmplifierById(aid)) { allResolve = false; console.log("  MISSING:", aid, "referenced by", s.id); }
  });
});
console.log("Test3 (all speaker ampIds resolve):", allResolve ? "PASS" : "FAIL");

// Test4: every amplifier's relations.speakerIds resolve to a real speaker
let allResolve2 = true;
AMPLIFIERS.forEach(a => {
  a.relations.speakerIds.forEach(sid => {
    if (!findSpeakerById(sid)) { allResolve2 = false; console.log("  MISSING:", sid, "referenced by", a.id); }
  });
});
console.log("Test4 (all amp speakerIds resolve):", allResolve2 ? "PASS" : "FAIL");

// Test5: resolveAmpIdForModel handles the merged "D40 / D80 / D90 / 40D" case
const resolved = resolveAmpIdForModel("db", "D40 / D80 / D90 / 40D");
console.log("Test5 (merged model resolves to D40):", resolved === "amp-db-d40" ? "PASS" : "FAIL", `(got: ${resolved})`);

// Test6: resolveAmpIdForModel normal case (v1.1: LA12X 대신 신규 표준 LA1.16i)
const resolved2 = resolveAmpIdForModel("la", "LA1.16i");
console.log("Test6 (normal model resolves):", resolved2 === "amp-la-la1dot16i" ? "PASS" : "FAIL", `(got: ${resolved2})`);

// Test7: cross-ref symmetry - if speaker S lists amp A, then amp A must list speaker S
let symmetric = true;
SPEAKERS.forEach(s => {
  (s.relations.ampIds || []).forEach(aid => {
    const amp = findAmplifierById(aid);
    if (amp && !amp.relations.speakerIds.includes(s.id)) {
      symmetric = false;
      console.log("  ASYMMETRIC:", s.id, "-> ", aid, "but amp doesn't list speaker back");
    }
  });
});
console.log("Test7 (relations are symmetric):", symmetric ? "PASS" : "FAIL");

// Test8: amp filter/search works
const state = createState();
state.q = "d&b";
let view = AMPLIFIERS.filter(a => passes(a, state, amplifiersSchema));
console.log("Test8 (search 'd&b' amps):", view.length === 4 && view.every(a => a.mfr === "db") ? "PASS" : "FAIL", `(${view.length} results)`);

// Test9: cardHTML + modalBodyHTML render without throwing
const html = ampCardHTML(AMPLIFIERS[0]);
console.log("Test9 (ampCardHTML renders):", html.includes(`data-id="${AMPLIFIERS[0].id}"`) ? "PASS" : "FAIL");
const { body } = ampModalBodyHTML(AMPLIFIERS[0], (sid) => findSpeakerById(sid)?.name || sid);
console.log("Test10 (ampModalBodyHTML renders + has speaker chips):", body.includes('data-speaker-id') ? "PASS" : "FAIL");

// Test11: CCL8's amp click resolves (special merged-model case) end to end
const ccl8 = SPEAKERS.find(s => s.id === "spk-db-ccl8");
console.log("Test11 (CCL8 exists and has 1 amp entry):", ccl8 && ccl8.amps.length === 1 ? "PASS" : "FAIL");
const ccl8AmpId = resolveAmpIdForModel(ccl8.mk, ccl8.amps[0].model);
console.log("Test12 (CCL8 amp row is now clickable):", ccl8AmpId !== null ? "PASS" : "FAIL", `(resolved to: ${ccl8AmpId})`);
