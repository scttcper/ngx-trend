import { normalize } from '../helpers/math.helpers';

export function normalizeDataset(
  data: number[],
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
): Array<{ x: number; y: number }> {
  // For the X axis, we want to normalize it based on its index in the array.
  // For the Y axis, we want to normalize it based on the element's value.
  //
  // X axis is easy: just evenly-space each item in the array.
  // For the Y axis, we first need to find the min and max of our array,
  // and then normalize those values between 0 and 1.
  const boundariesX = { min: 0, max: data.length - 1 };
  const boundariesY = { min: Math.min(...data), max: Math.max(...data) };

  const normalizedData = data.map((point, index) => ({
    x: normalize(index, boundariesX.min, boundariesX.max, minX, maxX),
    y: normalize(point, boundariesY.min, boundariesY.max, minY, maxY),
  }));

  // According to the SVG spec, paths with a height/width of `0` can't have
  // linear gradients applied. This means that our lines are invisible when
  // the dataset is flat (eg. [0, 0, 0, 0]).
  //
  // The hacky solution is to apply a very slight offset to the first point of
  // the dataset. As ugly as it is, it's the best solution we can find (there
  // are ways within the SVG spec of changing it, but not without causing
  // breaking changes).
  if (boundariesY.min === boundariesY.max) {
    normalizedData[0].y += 0.0001;
  }

  return normalizedData;
}
