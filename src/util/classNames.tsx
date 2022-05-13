const classNames = (className: (string | undefined)[])=>{
  return className.filter(Boolean).join(' ').trim()
}

export default classNames