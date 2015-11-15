export default function appendIfNotExists(array, target) {
  let index = array.indexOf(target);

  if (index !== -1) {
    return false;
  }

  array.push(target);

  return true;
}
