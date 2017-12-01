/* eslint-disable no-restricted-properties */

/** normalize
 * This lets us translate a value from one scale to another.
 *
 * @param value - Our initial value to translate
 * @param min - the current minimum value possible
 * @param max - the current maximum value possible
 * @param scaleMin - the min value of the scale we're translating to
 * @param scaleMax - the max value of the scale we're translating to
 *
 * @returns the value on its new scale
 */
export function normalize(
  value: number,
  min: number,
  max: number,
  scaleMin = 0,
  scaleMax = 1,
) {
  // If the `min` and `max` are the same value, it means our dataset is flat.
  // For now, let's assume that flat data should be aligned to the bottom.
  if (min === max) {
    return scaleMin;
  }

  return scaleMin + (value - min) * (scaleMax - scaleMin) / (max - min);
}

export interface Point {
  x: number;
  y: number;
}

/** moveTo
 * the coordinate that lies at a midpoint between 2 lines, based on the radius
 *
 * @param to - Our initial point
 * @param to.x - The x value of our initial point
 * @param to.y - The y value of our initial point
 * @param from - Our final point
 * @param from.x - The x value of our final point
 * @param from.y - The y value of our final point
 * @param radius - The distance away from the final point
 *
 * @returns an object holding the x/y coordinates of the midpoint.
 */
export function moveTo(to: Point, from: Point, radius: number): Point {
  const vector = { x: to.x - from.x, y: to.y - from.y };
  const length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  const unitVector = { x: vector.x / length, y: vector.y / length };

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius,
  };
}

/** getDistanceBetween
 * Simple formula derived from pythagoras to calculate the distance between
 * 2 points on a plane.
 *
 * @param p1 - Our initial point
 * @param p1.x - The x value of our initial point
 * @param p1.y - The y value of our initial point
 * @param p2 - Our final point
 * @param p2.x - The x value of our final point
 * @param p2.y - The y value of our final point
 *
 * @returns {Number} the distance between the points.
 */
export const getDistanceBetween = (p1: Point, p2: Point) =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

/** checkForCollinearPoints
 * Figure out if the midpoint fits perfectly on a line between the two others.
 *
 * @param p1 - Our initial point
 * @param p1.x - The x value of our initial point
 * @param p1.y - The y value of our initial point
 * @param p2 - Our mid-point
 * @param p2.x - The x value of our mid-point
 * @param p2.y - The y value of our mid-point
 * @param p3 - Our final point
 * @param p3.x - The x value of our final point
 * @param p3.y - The y value of our final point

 * @returns whether or not p2 sits on the line between p1 and p3.
 */
export const checkForCollinearPoints = (p1: Point, p2: Point, p3: Point) =>
  (p1.y - p2.y) * (p1.x - p3.x) === (p1.y - p3.y) * (p1.x - p2.x);
