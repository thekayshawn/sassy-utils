import SassyError from './SassyError'

/**
 * Calculates the discounted value from a number based on the passed discount.
 *
 * @param {number} value The value to be discounted.
 * @param {number} discount The percentage of discount to apply. 10 for 10%
 */
export const getDiscounted = (value: number, discount: number) =>
  value - (value * discount) / 100

/**
 * Remove the discount from a value.
 *
 * The general formula to remove the discount goes like this:
 * Original Value = Discounted Value / 1 - discount
 *
 * @param value The discounted value.
 * @param discount The decimal discount value, smaller than 1.
 *
 * @return {number} The original value without the discount.
 */
export const getWithoutDiscount = (value: number, discount: number): number =>
  value / (1 - discount)

/**
 * Remove the percentage-discount from a value.
 *
 * The general formula to remove the discount goes like this:
 * Original Value = Discounted Value / 1 - discount
 *
 * @param value The discounted value.
 * @param discount The percentage-discount value, 10 for 10%.
 *
 * @param {number}.
 */
export const getWithoutPercentDiscount = (value: number, discount: number) =>
  value / (1 - discount / 100)

/**
 * Whether an entity is an object and has at least one entry.
 * @return {boolean}
 *
 * @see https://stackoverflow.com/a/32108184/14716989
 */
export const isValidObject = (entity: unknown): boolean =>
  !!entity &&
  Object.keys(entity).length > 0 &&
  Object.getPrototypeOf(entity) === Object.prototype

/**
 * Capitalize a word's first letter.
 * @returns {string}
 */
export const getCapitalizedWord = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1)

/**
 * Capitalize all words of a sentence or a clause.
 * @returns {string}
 */
export const getCapitalized = (clause: string): string => {
  return clause
    .split(' ')
    .map((word) => getCapitalizedWord(word))
    .join(' ')
}

export const isMobile = () =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

/**
 * Checks if an entity is numeric or not, doesn't check it's type.
 *
 * @see https://stackoverflow.com/a/24457420
 *
 * @returns {boolean}
 */
export const isNumeric = (entity: unknown): boolean =>
  /^-?\d+$/.test(entity as string)

/**
 * Strictly checks if a value is a number or not. Checks it's type as well.
 *
 * @returns {boolean}
 */
export const isStrictlyNumeric = (entity: unknown): boolean =>
  typeof entity === 'number' && isNumeric(entity)

/**
 * Generates a formData instance based on the key-value
 * pairs of an object.
 *
 * @returns {FormData}
 */
export function getFormDataFromObject(foo: Record<string, string>): FormData {
  if (!isValidObject(foo)) {
    throw new SassyError(
      "The object passed to getFormDataFromObject wasn't a valid object"
    )
  }

  const formData = new FormData()

  Object.entries(foo).forEach(([key, value]) => formData.append(key, value))

  return formData
}

/**
 * Converts a string into a kebab-cased slug.
 * @returns {string}
 */
export const getSlugified = (string: string): string => {
  return string.toLowerCase().trim().replaceAll(' ', '-')
}

/**
 * Download a resource from a URL.
 */
export function downloadResource(url: string, name = 'sassy-file') {
  if (!url) {
    console.warn(
      `${SassyError.getPrototype()} Missing parameter 'url' in downloadResource function!`
    )
    return
  }

  const link = document.createElement('a')

  link.setAttribute('href', url)
  link.setAttribute('download', name)
  link.setAttribute('target', '_blank')
  link.setAttribute('rel', 'noreferrer')

  document.body.appendChild(link)

  link.click()
  link.remove()
}

/**
 * Get a heading that's semantically next to the current heading you're at.
 *
 * @returns {HTMLHeadingTag | "div"}
 */
export function getSemanticHeadingTag(currentHeading = 'div'): string {
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  // Fallback for a wrong element.
  if (!headings.includes(currentHeading)) return currentHeading

  // A div is what you need if you're already at h6.
  if (currentHeading === 'h6') return 'div'

  // The heading next to the current one.
  return headings[
    1 + headings.findIndex((heading) => currentHeading === heading)
  ]
}
