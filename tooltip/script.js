const tagStyles = {
  fontWeight: 'bold',
  color: 'hsl(0deg 0% 10%)',
};
const classStyles = {
  color: 'violet',
}
const appliedStyles = {
  ...tagStyles,
  ...classStyles,
}

console.log(appliedStyles)