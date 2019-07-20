/**
 * 타임아웃 프로미스 리턴
 * @param {Number} ms 타임아웃을 진행할 기간 (밀리초)
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
