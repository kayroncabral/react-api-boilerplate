const isCPF = (value) => /\d{11}$/.test(value) && value.length === 11

export { isCPF }
