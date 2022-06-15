const scopedClassMaker = (prefix: string) => {
  return function linkClass(name?: string) {
    return [prefix, name].filter(Boolean).join("-");
  };
};

export {scopedClassMaker}