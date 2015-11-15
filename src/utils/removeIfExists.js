export default function removeIfExists(array, target) {
  let index = array.indexOf(target);

  if (index === -1) {
    return false;
  }

  array.splice(index, 1);

  return true;
}
