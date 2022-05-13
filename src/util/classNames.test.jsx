import classNames from './classNames'

describe('测试传入一个字符', () => {
  it('接收一个className ', () => {
    const result = classNames(['a']);
    expect(result).toEqual('a')
  });
  it('接收两个className', () => {
    const result = classNames(['a','b']);
    expect(result).toBe('a b')
  });
  it('接收三个className', () => {
    const result = classNames(['a','b',undefined]);
    expect(result).toBe('a b')
  });
  it('传中文', () => {
    const result = classNames(['','中文',false]);
    expect(result).toBe('中文')
  });
});