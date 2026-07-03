/**
 * @module core/dom
 * 모든 도메인이 공유하는 소형 DOM/유틸 헬퍼.
 */

/**
 * querySelector 단축 헬퍼.
 * @param {string} s CSS 셀렉터
 * @param {ParentNode} [root=document] 탐색 루트
 * @returns {Element|null}
 */
export const $ = (s, root = document) => root.querySelector(s);

/**
 * querySelectorAll 단축 헬퍼 (배열 반환).
 * @param {string} s CSS 셀렉터
 * @param {ParentNode} [root=document] 탐색 루트
 * @returns {Element[]}
 */
export const $all = (s, root = document) => [...root.querySelectorAll(s)];

/**
 * HTML 이스케이프 — 템플릿 문자열에 데이터 값을 넣기 전 반드시 통과시킬 것.
 * @param {*} s 원본 값 (null/undefined 는 빈 문자열)
 * @returns {string}
 */
export const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/**
 * 배열 중복 제거 (원본 순서 유지).
 * @param {Array} a
 * @returns {Array}
 */
export const uniq = (a) => [...new Set(a)];
